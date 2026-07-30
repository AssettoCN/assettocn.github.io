// Generic "submission issue → content entry" engine.
//
// Reads env KIND (gallery|server|author|work) + ISSUE_BODY + ISSUE_NUMBER,
// parses the matching Issue Form, (for gallery/work) downloads the attached
// image into public/images/<dir>/, writes the content YAML under
// src/content/<dir>/<id>.yaml, and reports back via GITHUB_OUTPUT:
//   status=ok|error, kind, id, path, title, message
//
// Field values are located by AND-matching distinctive tokens against each
// form heading (e.g. name_zh needs both '名称' and '中文'), so bilingual labels
// disambiguate cleanly and small wording tweaks are tolerated.
import { writeFileSync, mkdirSync, appendFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const KIND = (process.env.KIND || '').trim();
const body = process.env.ISSUE_BODY || '';
const issueNumber = parseInt(process.env.ISSUE_NUMBER || '0', 10);

/* ── output / error helpers ─────────────────────────────────────────────── */
function setOutput(key, value) {
  const out = process.env.GITHUB_OUTPUT;
  const v = value == null ? '' : String(value);
  if (!out) { console.log(`${key}=${v}`); return; }
  const d = `__EOF_${key}_${Math.abs(hash(v))}__`;
  appendFileSync(out, `${key}<<${d}\n${v}\n${d}\n`);
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }
function fail(message) {
  setOutput('status', 'error');
  setOutput('kind', KIND);
  setOutput('message', message);
  console.error(message);
  process.exit(0); // soft-fail: let the workflow comment the reason
}

/* ── parsing helpers ────────────────────────────────────────────────────── */
const sections = body
  .split(/(?:^|\n)###\s+/)
  .map((s) => s.trim())
  .filter(Boolean)
  .map((sec) => {
    const nl = sec.indexOf('\n');
    const heading = (nl === -1 ? sec : sec.slice(0, nl)).replace(/^#+\s*/, '').trim();
    let value = (nl === -1 ? '' : sec.slice(nl + 1)).trim();
    if (value === '_No response_') value = '';
    return { headingLower: heading.toLowerCase(), value };
  });

/** Value of the field whose heading contains ALL given tokens (case-insensitive). */
function field(...tokens) {
  const toks = tokens.map((t) => t.toLowerCase());
  const s = sections.find((sec) => toks.every((t) => sec.headingLower.includes(t)));
  return s ? s.value.trim() : '';
}

const q = (s) => JSON.stringify(String(s)); // safe YAML double-quoted scalar
const slugify = (s, fallback) =>
  (String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || fallback);
const firstChar = (s) => Array.from(String(s).trim())[0] || '?';
const splitList = (s) => String(s).split(/[,,、\n]+/).map((x) => x.trim()).filter(Boolean);
const currentMonth = () => new Date().toISOString().slice(0, 7);

/** Extract the first image URL from a textarea value (markdown / <img> / bare). */
function imageUrlFrom(value) {
  const v = value || '';
  return (
    (v.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/) || [])[1] ||
    (v.match(/<img[^>]+src="([^"]+)"/i) || [])[1] ||
    (v.match(/(https?:\/\/\S+\.(?:png|jpe?g|gif|webp))/i) || [])[1] ||
    (v.match(/(https?:\/\/\S+)/) || [])[1] ||
    ''
  ).trim();
}

const EXT_BY_TYPE = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp' };
/** Download `url` into public/images/<dir>/<id>.<ext>; fall back to the remote URL. */
async function downloadImage(url, dir, id) {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const type = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    const urlExt = (url.split('?')[0].match(/\.([a-z0-9]{3,4})$/i) || [])[1];
    const ext = EXT_BY_TYPE[type] || (urlExt ? urlExt.toLowerCase() : 'png');
    const path = `public/images/${dir}/${id}.${ext}`;
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
    return `/images/${dir}/${id}.${ext}`;
  } catch (e) {
    console.warn(`image download failed (${e.message}); using remote URL`);
    return url;
  }
}

/** Map a server-category dropdown value (e.g. "漂移 Drift") to a SERVER_TYPE key.
 *  Keep keys in sync with src/data/server-types.js. Defaults to 'circuit'. */
function serverTypeFrom(text) {
  const t = String(text).toLowerCase();
  if (/漂移|drift/.test(t)) return 'drift';
  if (/山路|山道|秋名|touge/.test(t)) return 'touge';
  if (/漫游|巡航|自由|cruise|roam/.test(t)) return 'cruise';
  return 'circuit'; // 围场:竞速/排位/耐力/新手等默认归此
}

const AVATAR_PALETTE = [
  ['--color-accent-2-300', '--color-accent-2-900'],
  ['--color-accent-300', '--color-accent-900'],
  ['--color-accent-2-200', '--color-accent-2-900'],
  ['--color-accent-200', '--color-accent-900'],
  ['--color-neutral-300', '--color-neutral-900'],
];

const order = 1000 + issueNumber; // always sorts after the seeded records

/* ── per-kind builders. Each returns { id, dir, yaml, title } (async). ───── */
const BUILDERS = {
  async gallery() {
    const titleZh = field('标题', '中文') || field('中文');
    const titleEn = field('title', 'english') || field('english');
    let by = field('handle') || field('投稿者');
    if (!titleZh || !titleEn) fail('缺少标题(中文或英文)。 / Missing title (zh or en).');
    if (!by) fail('缺少投稿者 handle。 / Missing submitter handle.');
    if (!by.startsWith('@')) by = '@' + by;
    const ALLOWED = ['4/3', '1/1', '3/4', '16/9'];
    let ratio = field('ratio') || field('比例');
    if (!ALLOWED.includes(ratio)) ratio = '4/3';
    const url = imageUrlFrom(field('screenshot') || field('截图'));
    if (!url) fail('没找到截图,请把图片拖进「截图」框上传。 / No screenshot image found.');
    const id = `${slugify(titleEn, 'shot')}-${issueNumber}`;
    const cover = await downloadImage(url, 'gallery', id);
    const yaml =
      `order: ${order}\n` +
      `ratio: ${q(ratio)}\n` +
      `by: ${q(by)}\n` +
      `title:\n  zh: ${q(titleZh)}\n  en: ${q(titleEn)}\n` +
      `cover: ${q(cover)}\n`;
    return { id, dir: 'gallery', yaml, title: `${titleZh} / ${titleEn}` };
  },

  async server() {
    const nameZh = field('名称', '中文'), nameEn = field('name', 'english');
    const regionZh = field('区域', '中文'), regionEn = field('region', 'english');
    const modeZh = field('模式', '中文'), modeEn = field('mode', 'english');
    const maxRaw = field('max') || field('最大');
    if (!nameZh || !nameEn) fail('缺少服务器名称(中/英)。 / Missing server name.');
    if (!regionZh || !regionEn) fail('缺少区域(中/英)。 / Missing region.');
    if (!modeZh || !modeEn) fail('缺少模式(中/英)。 / Missing mode.');
    const max = parseInt(maxRaw, 10);
    if (!Number.isFinite(max) || max <= 0) fail('最大人数需要是一个正整数。 / Max players must be a positive number.');
    const type = serverTypeFrom(field('类型') || field('category') || field('分类'));
    const id = `${slugify(nameEn, 'server')}-${issueNumber}`;
    const yaml =
      `order: ${order}\n` +
      `type: ${q(type)}\n` +
      `name:\n  zh: ${q(nameZh)}\n  en: ${q(nameEn)}\n` +
      `region:\n  zh: ${q(regionZh)}\n  en: ${q(regionEn)}\n` +
      `mode:\n  zh: ${q(modeZh)}\n  en: ${q(modeEn)}\n` +
      `players: 0\n` +
      `max: ${max}\n` +
      `ping: ${q('—')}\n` +
      `online: true\n`;
    return { id, dir: 'servers', yaml, title: `${nameZh} / ${nameEn}` };
  },

  async author() {
    const nameZh = field('名字', '中文'), nameEn = field('name', 'english');
    let handle = field('handle');
    const skillsZh = splitList(field('擅长', '中文')), skillsEn = splitList(field('skills', 'english'));
    const bioZh = field('简介', '中文'), bioEn = field('bio', 'english');
    if (!nameZh || !nameEn) fail('缺少作者名字(中/英)。 / Missing author name.');
    if (!handle) fail('缺少作者 handle。 / Missing handle.');
    if (!bioZh || !bioEn) fail('缺少简介(中/英)。 / Missing bio.');
    if (!handle.startsWith('@')) handle = '@' + handle;
    const initials = firstChar(field('initials') || field('头像文字') || nameZh);
    const [tint, ink] = AVATAR_PALETTE[issueNumber % AVATAR_PALETTE.length];
    const id = slugify(handle.replace(/^@/, ''), `author-${issueNumber}`);
    // 可选头像图:传了就下载到 public/images/authors/;没传留空 → 前端回退到字母头像
    const avatarUrl = imageUrlFrom(field('头像图片') || field('avatar', 'image'));
    const avatar = avatarUrl ? await downloadImage(avatarUrl, 'authors', id) : '';
    // links textarea: one "Label | URL" per line
    const links = String(field('外链') || field('links'))
      .split('\n').map((l) => l.trim()).filter(Boolean)
      .map((l) => { const i = l.indexOf('|'); return i === -1 ? { label: l, url: '#' } : { label: l.slice(0, i).trim(), url: l.slice(i + 1).trim() || '#' }; })
      .filter((x) => x.label);
    const listBlock = (k, arr) => `${k}:\n  zh:\n${arr.zh.map((x) => `    - ${q(x)}`).join('\n') || '    []'}\n  en:\n${arr.en.map((x) => `    - ${q(x)}`).join('\n') || '    []'}\n`;
    let yaml =
      `order: ${order}\n` +
      `initials: ${q(initials)}\n` +
      `tint: ${q(tint)}\n` +
      `ink: ${q(ink)}\n` +
      (avatar ? `avatar: ${q(avatar)}\n` : '') +
      `name:\n  zh: ${q(nameZh)}\n  en: ${q(nameEn)}\n` +
      `handle: ${q(handle)}\n` +
      listBlock('skills', { zh: skillsZh, en: skillsEn }) +
      `bio:\n  zh: ${q(bioZh)}\n  en: ${q(bioEn)}\n`;
    if (links.length) yaml += `links:\n` + links.map((l) => `  - { label: ${q(l.label)}, url: ${q(l.url)} }`).join('\n') + '\n';
    const note = existsSync(`src/content/authors/${id}.yaml`) ? ` ⚠️ 覆盖已存在的作者 ${id}` : '';
    return { id, dir: 'authors', yaml, title: `${nameZh} / ${nameEn}${note}` };
  },

  async work() {
    const TYPES = ['tool', 'app', 'guide', 'doc', 'data'];
    let authorId = slugify((field('作者') || field('author')).replace(/^@/, ''), '');
    const type = (field('type') || field('类型')).trim().toLowerCase();
    const version = field('version') || field('版本');
    const titleZh = field('标题', '中文'), titleEn = field('title', 'english');
    const descZh = field('描述', '中文'), descEn = field('description', 'english');
    if (!authorId) fail('缺少作者 id/handle。 / Missing author id.');
    if (authorId === 'acn') fail('官方作品(acn)请由维护者直接添加,不接受公开投稿。 / Official works must be added by maintainers.');
    if (!existsSync(`src/content/authors/${authorId}.yaml`)) fail(`找不到作者 "${authorId}"。请先投稿该作者,或填写已存在的作者 id/handle。 / Unknown author "${authorId}".`);
    if (!TYPES.includes(type)) fail(`类型需为:${TYPES.join(' / ')}。 / type must be one of ${TYPES.join(', ')}.`);
    if (!version) fail('缺少版本。 / Missing version.');
    if (!titleZh || !titleEn) fail('缺少标题(中/英)。 / Missing title.');
    if (!descZh || !descEn) fail('缺少描述(中/英)。 / Missing description.');
    const id = `${slugify(titleEn, 'work')}-${issueNumber}`;
    const coverUrl = imageUrlFrom(field('封面') || field('cover'));
    const cover = coverUrl ? await downloadImage(coverUrl, 'works', id) : '';
    let yaml =
      `order: ${order}\n` +
      `authorId: ${q(authorId)}\n` +
      `type: ${q(type)}\n` +
      `version: ${q(version)}\n` +
      `updated: ${q(currentMonth())}\n` +
      `downloads: ${q('—')}\n` +
      `title:\n  zh: ${q(titleZh)}\n  en: ${q(titleEn)}\n` +
      `desc:\n  zh: ${q(descZh)}\n  en: ${q(descEn)}\n`;
    if (cover) yaml += `cover: ${q(cover)}\n`;
    return { id, dir: 'works', yaml, title: `${titleZh} / ${titleEn}` };
  },
};

/* ── main ───────────────────────────────────────────────────────────────── */
const build = BUILDERS[KIND];
if (!build) fail(`未知投稿类型 KIND="${KIND}"。`);

const { id, dir, yaml, title } = await build();
const path = `src/content/${dir}/${id}.yaml`;
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, yaml);

setOutput('status', 'ok');
setOutput('kind', KIND);
setOutput('id', id);
setOutput('path', path);
setOutput('title', title);
console.log(`Wrote ${path}\n${yaml}`);
