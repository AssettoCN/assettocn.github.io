// schema.org 结构化数据。BaseLayout 接一个 `jsonLd` prop,页面用这里的构造函数
// 生成对象;BaseLayout 负责序列化成 <script type="application/ld+json">。
//
// 只标**页面上真实存在**的东西 —— 结构化数据里写页面上没有的内容,搜索引擎会当
// 作垃圾处理,弊大于利。所以:
//   - 作者页 → Person(名字、简介、头像、外链都在页面上)
//   - 指南 / 教程 → Article(有标题、摘要、日期、正文)
//   - 首页 → Organization + WebSite
// 作品**没有**结构化数据:它们没有独立页面,而 CreativeWork 需要一个 URL 指过去。
import { SITE } from '../data/site.js';

const abs = (path) => new URL(path, SITE.url).href;

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
    url: abs(url),
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
    url: abs(url),
    mainEntityOfPage: abs(url),
    inLanguage: lang === 'zh' ? 'zh-Hans' : 'en',
    articleSection: section || undefined,
    datePublished: datePublished || undefined,
    dateModified: datePublished || undefined,
    author: { '@id': `${SITE.url}/#org` },
    publisher: { '@id': `${SITE.url}/#org` },
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
