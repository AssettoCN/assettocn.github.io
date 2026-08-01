// Content resolvers — now backed by Astro Content Collections (src/content/*).
// Given a locale, they flatten each YAML entry's bilingual data into
// ready-to-render objects. These functions are async because getCollection is.
import { getCollection } from 'astro:content';
import { UI } from '../data/ui.js';
import { TYPE } from '../data/work-types.js';
import { SERVER_TYPE } from '../data/server-types.js';

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
    downloads: w.downloads,
    rating: w.rating,
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
    dlLabel: ui.dlLabel,
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
    links: a.links,
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

/** Servers, resolved for the given locale (status/labels computed here). */
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
      ping: s.ping,
      online,
      statusTag: online ? 'tag-accent-2' : 'tag-neutral',
      // Solid colour used by the status dot + capacity bar (green when live).
      statusColor: online ? '#33d17a' : 'var(--color-neutral-600)',
      statusLabel: online ? ui.serversPage.online : ui.serversPage.offline,
      // Capacity fill for the progress bar, 0–100.
      pct: online ? Math.round((s.players / s.max) * 100) : 0,
      playersLabel: online ? `${s.players} / ${s.max}` : `0 / ${s.max}`,
      btnCls: online ? 'btn btn-secondary btn-block' : 'btn btn-ghost btn-block',
      disabled: !online,
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
export function serverFilters(lang) {
  const ui = UI[lang];
  return [
    { key: 'all', label: ui.filterAll },
    ...Object.keys(SERVER_TYPE).map((k) => ({ key: k, label: SERVER_TYPE[k].label[lang] })),
  ];
}
