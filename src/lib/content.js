// Content resolvers — now backed by Astro Content Collections (src/content/*).
// Given a locale, they flatten each YAML entry's bilingual data into
// ready-to-render objects. These functions are async because getCollection is.
import { getCollection } from 'astro:content';
import { UI } from '../data/ui.js';
import { TYPE } from '../data/work-types.js';
import { SERVER_TYPE } from '../data/server-types.js';
import { LINK_PLATFORM } from '../data/link-platforms.js';

// The official AssettoCN publisher identity. Authors/works with this id get an
// "official" badge + logo avatar, and official works are pinned to the top.
export const OFFICIAL_ID = 'acn';

/** Inline style for an author's avatar swatch. `data` is the entry's frontmatter. */
export function avatarCss(data, size = 'sm') {
  const s = size === 'lg' ? '104px' : '64px';
  const fs = size === 'lg' ? '42px' : '26px';
  return `width:${s}; height:${s}; flex:none; border-radius:50%; background: var(${data.tint}); color: var(${data.ink}); display:grid; place-items:center; font-family: var(--font-heading); font-size:${fs}; position:relative; z-index:1;`;
}

const byOrder = (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0);
const allAuthors = async () => (await getCollection('authors')).sort(byOrder);
const allWorks = async () => (await getCollection('works')).sort(byOrder);

/** Resolve one work entry into a localized, render-ready object. */
function resolveWorkEntry(entry, lang, authorsById) {
  const w = entry.data;
  const tm = TYPE[w.type];
  const ui = UI[lang];
  const author = authorsById.get(w.authorId);
  return {
    id: entry.id,
    authorId: w.authorId,
    type: w.type,
    version: w.version,
    updated: w.updated,
    cover: w.cover,
    link: w.link,
    title: w.title[lang],
    desc: w.desc[lang],
    typeLabel: tm.label[lang],
    tagClass: tm.tag,
    official: w.authorId === OFFICIAL_ID,
    authorName: author ? author.data.name[lang] : '',
    coverId: 'cover-' + entry.id,
    coverPlaceholder: tm.label[lang] + ' · ' + ui.coverHint,
  };
}

/** Resolve one author entry into a localized, render-ready object. */
function resolveAuthorEntry(entry, lang, works) {
  const a = entry.data;
  const count = works.filter((w) => w.data.authorId === entry.id).length;
  return {
    id: entry.id,
    initials: a.initials,
    tint: a.tint,
    ink: a.ink,
    avatar: a.avatar,                // optional photo; monogram is the fallback
    name: a.name[lang],
    handle: a.handle,
    bio: a.bio[lang],
    skills: a.skills[lang],
    // 外链按平台解析:platform → 图标 + 默认显示名;label 仅覆盖显示名(other 用)。
    links: a.links.map((lk) => {
      const p = LINK_PLATFORM[lk.platform] ?? LINK_PLATFORM.other;
      return { platform: lk.platform, url: lk.url, icon: p.icon, label: lk.label || p.label[lang] };
    }),
    official: entry.id === OFFICIAL_ID,
    workCount: count,
    avatarStyle: avatarCss(a, 'sm'),
    avatarStyleLg: avatarCss(a, 'lg'),
  };
}

export async function getAuthors(lang) {
  const [authors, works] = await Promise.all([allAuthors(), allWorks()]);
  return authors.map((a) => resolveAuthorEntry(a, lang, works));
}

export async function getAuthor(id, lang) {
  const [authors, works] = await Promise.all([allAuthors(), allWorks()]);
  const entry = authors.find((a) => a.id === id);
  return entry ? resolveAuthorEntry(entry, lang, works) : null;
}

export async function getWorks(lang) {
  const [works, authors] = await Promise.all([allWorks(), allAuthors()]);
  const byId = new Map(authors.map((a) => [a.id, a]));
  // Official works are pinned to the top; within each group `order` is preserved
  // (Array.prototype.sort is stable).
  return works
    .map((w) => resolveWorkEntry(w, lang, byId))
    .sort((a, b) => (b.official ? 1 : 0) - (a.official ? 1 : 0));
}

export async function worksByAuthor(id, lang) {
  const [works, authors] = await Promise.all([allWorks(), allAuthors()]);
  const byId = new Map(authors.map((a) => [a.id, a]));
  return works.filter((w) => w.data.authorId === id).map((w) => resolveWorkEntry(w, lang, byId));
}

/** All author ids — for getStaticPaths. */
export async function authorIds() {
  const authors = await allAuthors();
  return authors.map((a) => a.id);
}

// 入门指南:id 形如 'zh/install-game' —— 前段是语言,其余是 slug(中/英同 slug 配成一页)。
const guideLang = (id) => id.split('/')[0];
const guideSlug = (id) => id.split('/').slice(1).join('/');

/** Guides for one locale, ordered — meta only (no rendered body). */
export async function getGuides(lang) {
  const list = (await getCollection('guides')).filter((g) => guideLang(g.id) === lang);
  return list
    .map((g) => ({ slug: guideSlug(g.id), title: g.data.title, summary: g.data.summary, order: g.data.order ?? 0, draft: g.data.draft }))
    .sort((a, b) => a.order - b.order);
}

/** The collection entry for one guide (pass to render()); null if missing. */
export async function getGuideEntry(slug, lang) {
  const list = await getCollection('guides');
  return list.find((g) => guideLang(g.id) === lang && guideSlug(g.id) === slug) || null;
}

/** Slugs present in a locale — for getStaticPaths (only builds what exists). */
export async function guideSlugs(lang) {
  const list = await getCollection('guides');
  return [...new Set(list.filter((g) => guideLang(g.id) === lang).map((g) => guideSlug(g.id)))];
}

/** Servers, resolved for the given locale (status/labels computed here). */
// "ip:port" → Content Manager one-click join URL (opens CM via the acmanager:// handler).
// Returns null when the address isn't a plain ip:port, so the card just shows the raw address.
function cmJoinUrl(address) {
  const m = String(address || '').match(/^\s*([\d.]+):(\d+)\s*$/);
  return m ? `https://acstuff.ru/s/q:race/online/join?ip=${m[1]}&httpPort=${m[2]}` : null;
}

export async function getServers(lang) {
  const ui = UI[lang];
  const list = (await getCollection('servers')).sort(byOrder);
  return list.map((e) => {
    const s = e.data;
    const online = s.online;
    const tm = SERVER_TYPE[s.type];
    return {
      id: e.id,
      type: s.type,                    // raw key — exposed as data-type for filtering
      typeLabel: tm.label[lang],
      typeTag: tm.tag,
      name: s.name[lang],
      region: s.region[lang],
      mode: s.mode[lang],
      // 静态容量文案(不再显示实时人数/延迟——无法从静态站保持真实)。
      capacityLabel: lang === 'zh' ? `最多 ${s.max} 人` : `up to ${s.max}`,
      homepage: s.homepage,
      address: s.address,
      // 由 ip:port 生成 Content Manager 一键加入链接(acstuff → acmanager:// 协议)
      joinUrl: cmJoinUrl(s.address),
      online,
      // 在线/离线为维护者在 yaml 手动标注,状态点颜色。
      statusColor: online ? '#33d17a' : 'var(--color-neutral-600)',
      statusLabel: online ? ui.serversPage.online : ui.serversPage.offline,
    };
  });
}

/** Gallery screenshots, resolved for the given locale. */
export async function getGallery(lang) {
  const list = (await getCollection('gallery')).sort(byOrder);
  return list.map((e) => {
    const s = e.data;
    return {
      id: e.id,
      ratio: s.ratio,
      by: s.by,
      cover: s.cover,
      title: s.title[lang],
      coverPlaceholder: s.title[lang],
    };
  });
}

/** Filter tabs for the works page: 'all' + every type key (static, no I/O). */
/** Home hero telemetry: real counts derived from the collections; 0-count items hidden.
 *  Auto-updates as content grows — no mock numbers. */
export async function getHomeStats(lang) {
  const [authors, works, servers, gallery] = await Promise.all([
    getCollection('authors'),
    getCollection('works'),
    getCollection('servers'),
    getCollection('gallery'),
  ]);
  const L = {
    zh: { authors: '社区作者', works: '收录作品', servers: '收录服务器', gallery: '社区截图' },
    en: { authors: 'Authors', works: 'Works', servers: 'Servers', gallery: 'Screenshots' },
  }[lang];
  return [
    { n: authors.length, l: L.authors },
    { n: works.length, l: L.works },
    { n: servers.length, l: L.servers },
    { n: gallery.length, l: L.gallery },
  ].filter((s) => s.n > 0).map((s) => ({ n: String(s.n), l: s.l }));
}

export function workFilters(lang, works) {
  const ui = UI[lang];
  // 只展示当前确有作品的类型,避免出现点开为空的筛选标签(如暂无地图作品时不显示「地图」)。
  const used = works ? new Set(works.map((w) => w.type)) : null;
  const keys = Object.keys(TYPE).filter((k) => !used || used.has(k));
  return [
    { key: 'all', label: ui.filterAll },
    ...keys.map((k) => ({ key: k, label: TYPE[k].label[lang] })),
  ];
}

/** Filter tabs for the servers page: 'all' + every server-type key. */
export function serverFilters(lang, servers) {
  const ui = UI[lang];
  // 同 workFilters:只展示当前有服务器的类别,空类别不显示死标签。
  const used = servers ? new Set(servers.map((s) => s.type)) : null;
  const keys = Object.keys(SERVER_TYPE).filter((k) => !used || used.has(k));
  return [
    { key: 'all', label: ui.filterAll },
    ...keys.map((k) => ({ key: k, label: SERVER_TYPE[k].label[lang] })),
  ];
}
