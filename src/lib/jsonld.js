// schema.org 结构化数据。BaseLayout 接一个 `jsonLd` prop,页面用这里的构造函数
// 生成对象;BaseLayout 负责序列化成 <script type="application/ld+json">。
//
// 只标**页面上真实存在**的东西 —— 结构化数据里写页面上没有的内容,搜索引擎会当
// 作垃圾处理,弊大于利。所以:
//   - 作者页 → Person(名字、简介、头像、外链都在页面上)
//   - 指南 / 教程 → Article(有标题、摘要、日期、正文)
//   - 首页 → Organization + WebSite
//   - 四类详情页 → 再叠一层 BreadcrumbList(页面上有真实可见的返回上级链接)
//   - 常见问题 → 再叠一层 FAQPage(正文本身就是问答结构,由 faqJsonLd 自行判定)
//   - 作品页 → CreativeWork(作品有了独立页面之后才成立,见 workJsonLd)
import { SITE } from '../data/site.js';
import { UI } from '../data/ui.js';
import { localizePath, ROUTES } from './i18n.js';

const abs = (path) => new URL(path, SITE.url).href;

/**
 * 页面自身(或同语言的另一页)的绝对 URL。**凡是指向本站页面的 url 都得走这里** ——
 * 各构造函数收到的 `url` 都是 canonical、不带 `/en` 的路径,直接 `abs()` 会让英文页的
 * 结构化数据指回中文页,和该页 `<link rel="canonical">` 自相矛盾(等于告诉搜索引擎
 * 这个实体不在当前这一页上)。站点级的资源(og.png、站点根)不受影响,照旧用 `abs`。
 */
const absFor = (lang, path) => abs(localizePath(lang, path));

/** 全站共用的发布方标识,被其它类型作为 publisher/author 引用。 */
export function organization() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#org`,
    name: 'AssettoCN',
    url: SITE.url,
    logo: abs('/og.png'),
    sameAs: [SITE.social.bilibili, SITE.social.github].filter(Boolean),
  };
}

/** 首页:站点本体 + 发布方。 */
export function homeJsonLd({ lang, description }) {
  return [
    { '@context': 'https://schema.org', ...organization() },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: 'AssettoCN',
      description,
      inLanguage: lang === 'zh' ? 'zh-Hans' : 'en',
      publisher: { '@id': `${SITE.url}/#org` },
    },
  ];
}

/** 作者详情页。`author` 是 lib/content.js 解析过的对象。 */
export function personJsonLd({ author, url, lang }) {
  const sameAs = author.links.map((l) => l.url).filter((u) => u && u !== '#');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    alternateName: author.handle || undefined,
    description: author.bio || undefined,
    url: absFor(lang, url),
    image: author.avatar ? abs(author.avatar) : undefined,
    // 页面上确实列了他们的作品数,knowsAbout 用技能标签(也在页面上)
    knowsAbout: author.skills?.length ? author.skills : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    inLanguage: lang === 'zh' ? 'zh-Hans' : 'en',
  };
}

/** 入门指南 / 教程正文页。`section` 可选(教程用它带分类名)。 */
export function articleJsonLd({ title, description, url, lang, datePublished, section = undefined }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absFor(lang, url),
    mainEntityOfPage: absFor(lang, url),
    inLanguage: lang === 'zh' ? 'zh-Hans' : 'en',
    articleSection: section || undefined,
    datePublished: datePublished || undefined,
    dateModified: datePublished || undefined,
    author: { '@id': `${SITE.url}/#org` },
    publisher: { '@id': `${SITE.url}/#org` },
  };
}

/** 作品详情页。有独立 URL 之后 CreativeWork 才成立(此前作品没有页面,故不标)。 */
export function workJsonLd({ work, author, url, lang }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description: work.desc,
    url: absFor(lang, url),
    mainEntityOfPage: absFor(lang, url),
    inLanguage: lang === 'zh' ? 'zh-Hans' : 'en',
    genre: work.typeLabel,
    // 作品的实际发布地在作者自己的渠道,不在本站 —— 如实标注。
    sameAs: work.link || undefined,
    image: work.cover ? abs(work.cover) : undefined,
    author: author ? { '@type': 'Person', name: author.name, url: absFor(lang, ROUTES.author(author.id)) } : undefined,
    // 只有 YYYY-MM 精度,补成当月 1 号;schema.org 接受 ISO 日期。
    dateModified: /^\d{4}-\d{2}$/.test(work.updated) ? `${work.updated}-01` : undefined,
    isAccessibleForFree: true,
    publisher: { '@id': `${SITE.url}/#org` },
  };
}

/**
 * 详情页面包屑:首页 → 所属列表页 → 当前页。
 *
 * 四类详情页(入门指南 / 教程 / 作者 / 作品)上都有一条**真实可见**的返回上级链接
 * (`← 入门指南`、`← 进阶教程`、`返回作品列表`…),层级也和 URL 一致 —— 所以这条链
 * 是页面上确实有的东西,不是为了 SEO 编出来的。
 *
 * `section` 取 `ROUTES` 与 `UI[lang].nav` 共有的键('start' | 'tutorials' |
 * 'authors' | 'works'),中间那级的名字直接用顶栏那个词,和用户看到的一致。
 * `url` 是 canonical(不带 `/en`)路径,和 BaseLayout 的 `path` 同一个值。
 */
export function breadcrumbJsonLd({ lang, section, name, url }) {
  const trail = [
    { name: 'AssettoCN', path: ROUTES.home },
    { name: UI[lang].nav[section], path: ROUTES[section] },
    { name, path: url },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: absFor(lang, step.path),
    })),
  };
}

/** Markdown 行内标记 → 纯文本(FAQPage 的 answer 只要文字,给 HTML 反而容易被判违规)。 */
function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')           // 代码块整段丢掉
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')     // 图片
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // 链接只留文字
    .replace(/[*_`]/g, '')                    // 粗体 / 斜体 / 行内代码标记
    .split('\n')
    .map((line) => line.replace(/^\s*(?:[-*+]|\d+\.)\s+/, '').trim())  // 列表符号
    .filter(Boolean)
    .join(' ')
    .trim();
}

/**
 * 常见问题页 → FAQPage。传 `entry.body`(原始 Markdown)。
 *
 * **自判定,不认 slug**:只有当正文是「## 问句」+ 回答重复至少两轮、且**每个**二级
 * 标题都以问号结尾时才输出,否则返回 null(页面照常只有 Article)。这样既不用在
 * 路由里写死 `slug === 'faq'`,也不会给普通指南误标 —— 依然是「页面上真是问答才标」。
 *
 * ⚠ Google 从 2023 年起把 FAQ 富媒体结果收窄到少数权威站点,这里基本不会变成搜索
 *   结果里的折叠问答;实际收益在 Bing / 百度和语义理解那一侧。
 */
export function faqJsonLd({ body, url, lang }) {
  const sections = [];
  let current = null;
  for (const line of String(body || '').split('\n')) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      if (current) sections.push(current);
      current = { q: heading[1], a: [] };
    } else if (current) {
      current.a.push(line);
    }
  }
  if (current) sections.push(current);

  const qa = sections.map(({ q, a }) => ({ q: plainText(q), a: plainText(a.join('\n')) }));
  const isFaq = qa.length >= 2 && qa.every(({ q, a }) => a && /[??]$/.test(q));
  if (!isFaq) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: absFor(lang, url),
    inLanguage: lang === 'zh' ? 'zh-Hans' : 'en',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** 递归去掉 undefined —— JSON-LD 里出现 null/undefined 会被校验器判为错误。 */
export function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0))
        .map(([k, v]) => [k, clean(v)]),
    );
  }
  return value;
}
