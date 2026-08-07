// RSS 2.0 feed 的组装逻辑,两个语言的 endpoint 共用(src/pages/rss.xml.ts 和
// src/pages/en/rss.xml.ts)。
//
// 为什么手写而不是用 @astrojs/rss:输出就是这几十行 XML,而这个仓库对国内可达性
// 很敏感(见 fetch-fonts.mjs),能少一个依赖就少一个。
//
// **条目必须有真实日期。** 没有 pubDate 的 feed 在阅读器里会全部挤在「刚刚」,
// 排序也失效。所以:
//   - works 用它自己的 `updated`(YYYY-MM,补成当月 1 号)
//   - guides / tutorials 用 frontmatter 的 `updated`(由 git 首次提交日期回填,
//     不是编的),没填的条目直接不进 feed —— 宁可少一条,不要假日期。
//   - gallery 不进 feed:它没有日期,也没有单独的页面可链。
import { SITE } from '../data/site.js';
import { UI } from '../data/ui.js';
import { getWorks, getGuides, getTutorials } from './content.js';
import { localizePath, ROUTES } from './i18n.js';

const esc = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** 'YYYY-MM' 或 'YYYY-MM-DD' → RFC 822;解析不了就返回 null(该条目不进 feed)。 */
function rfc822(value) {
  if (!value) return null;
  const m = String(value).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +(m[3] || 1)));
  return Number.isNaN(d.getTime()) ? null : d.toUTCString();
}

const abs = (path) => new URL(path, SITE.url).href;

export async function buildFeed(lang) {
  const ui = UI[lang];
  const [works, guides, tutorials] = await Promise.all([
    getWorks(lang), getGuides(lang), getTutorials(lang),
  ]);

  const items = [];

  for (const w of works) {
    const date = rfc822(w.updated);
    if (!date) continue;
    items.push({
      title: `${ui.nav.works} · ${w.title}`,
      // 作品没有详情页,所以指向作者自己的发布页 —— 那才是读者真正想去的地方。
      // 没有外链的就退回作品列表。guid 用稳定 id,不受链接变化影响。
      link: w.link || abs(localizePath(lang, ROUTES.works)),
      guid: `work:${w.id}`,
      guidIsPermaLink: false,
      desc: w.desc,
      date,
    });
  }

  const push = (list, route, kicker) => {
    for (const x of list) {
      const date = rfc822(x.updated);
      if (!date) continue;
      const url = abs(localizePath(lang, `${route}/${x.slug}`));
      items.push({ title: `${kicker} · ${x.title}`, link: url, guid: url, guidIsPermaLink: true, desc: x.summary, date });
    }
  };
  push(guides, ROUTES.start, ui.nav.start);
  push(tutorials, ROUTES.tutorials, ui.nav.tutorials);

  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  const self = abs(localizePath(lang, '/rss.xml'));
  const home = abs(localizePath(lang, ROUTES.home));
  const body = items.map((it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${esc(it.link)}</link>
      <guid isPermaLink="${it.guidIsPermaLink}">${esc(it.guid)}</guid>
      <description>${esc(it.desc)}</description>
      <pubDate>${it.date}</pubDate>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(ui.feed.title)}</title>
    <link>${esc(home)}</link>
    <description>${esc(ui.feed.desc)}</description>
    <language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>
    <atom:link href="${esc(self)}" rel="self" type="application/rss+xml" />
${body}
  </channel>
</rss>
`;
}
