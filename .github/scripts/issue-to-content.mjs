// Generic "submission issue → content entry" engine.
//
// Reads env KIND (gallery|server|author|work) + ISSUE_BODY + ISSUE_NUMBER
// (+ ISSUE_AUTHOR / ISSUE_AUTHOR_ASSOCIATION for ownership checks),
// parses the matching Issue Form, (for gallery/work) downloads the attached
// image into public/images/<dir>/, writes the content YAML under
// src/content/<dir>/<id>.yaml, and reports back via GITHUB_OUTPUT:
//   status=ok|error, kind, id, path, title, message, notice, labels
//
// Field values are located by AND-matching distinctive tokens against each
// form heading (e.g. name_zh needs both '名称' and '中文'), so bilingual labels
// disambiguate cleanly and small wording tweaks are tolerated.
import { writeFileSync, mkdirSync, appendFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';

const KIND = (process.env.KIND || '').trim();
const body = process.env.ISSUE_BODY || '';
const issueNumber = parseInt(process.env.ISSUE_NUMBER || '0', 10);
const issueAuthor = (process.env.ISSUE_AUTHOR || '').trim(); // 开 issue 的 GitHub 账号
// OWNER / MEMBER = 组织成员,即维护者:代人投稿不标待核实,也不把自己记进 owners。
const byMaintainer = /^(?:OWNER|MEMBER)$/.test((process.env.ISSUE_AUTHOR_ASSOCIATION || '').trim());

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
// 列表分隔:半角逗号、全角逗号「，」、顿号「、」、半/全角分号、换行。字符用 \u 转义写 ——
// 以前这里本想写全角逗号,实际是两个半角逗号(肉眼看不出),中文技能整串不拆,成了一个长标签。
const splitList = (s) => String(s).split(/[,\uFF0C\u3001;\uFF1B\n]+/).map((x) => x.trim()).filter(Boolean);
const currentMonth = () => new Date().toISOString().slice(0, 7);

// 作者外链平台识别(与 src/data/link-platforms.js 保持一致)——用于「其他链接」里
// 每行 "名称 | 链接" 的自动归类:先按名称,再按域名,都不中则 other。
const LINK_DOMAINS = [
  ['bilibili', [/bilibili\.com/i, /b23\.tv/i]],
  ['afdian', [/afdian\.(com|net)/i]],
  ['weibo', [/weibo\.(com|cn)/i]],
  ['qq', [/qq\.com/i]],
  ['youtube', [/youtube\.com/i, /youtu\.be/i]],
  ['patreon', [/patreon\.com/i]],
  ['x', [/twitter\.com/i, /(?:\/\/|\.)x\.com/i]],
  ['discord', [/discord\.(gg|com)/i]],
  ['github', [/github\.com/i]],
];
const LINK_NAMES = {
  bilibili: 'bilibili', 'b站': 'bilibili', '哔哩哔哩': 'bilibili',
  afdian: 'afdian', '爱发电': 'afdian',
  weibo: 'weibo', '微博': 'weibo',
  qq: 'qq', 'qq群': 'qq',
  youtube: 'youtube', '油管': 'youtube',
  patreon: 'patreon',
  x: 'x', twitter: 'x', '推特': 'x',
  discord: 'discord', github: 'github',
  website: 'website', '个人主页': 'website', 官网: 'website', 主页: 'website',
};
function detectPlatform(name, url) {
  const n = String(name || '').trim().toLowerCase().replace(/\s+/g, '');
  if (LINK_NAMES[n]) return LINK_NAMES[n];
  for (const [key, res] of LINK_DOMAINS) if (res.some((re) => re.test(url))) return key;
  return 'other';
}

/* ── URL 规范化 ─────────────────────────────────────────────────────────── */
// 入库前去掉的追踪参数:B 站网页 / App 分享会带 spm_id_from、vd_source(关联分享者账号)等,
// 和链接指向的内容无关。只删这些已知参数,其余查询参数原样保留。
const TRACKING_PARAM = /^(?:spm_id_from|vd_source|from_spmid|share_(?:source|medium|plat|session_id|tag|from)|unique_k|utm_[a-z_]+)$/i;
function cleanUrl(raw) {
  let url;
  try { url = new URL(raw); } catch { return raw; }
  const drop = [...url.searchParams.keys()].filter((k) => TRACKING_PARAM.test(k));
  if (!drop.length) return raw; // 没有要删的就原样返回,不让 URL 序列化改写字符串
  for (const k of drop) url.searchParams.delete(k);
  return url.toString();
}

/** 从一段文字里取出第一个 http(s) 网址并去掉追踪参数。兼容 B 站 App 的分享文案
 *  「【标题-哔哩哔哩】 https://b23.tv/xxx」;没写协议但形如 space.bilibili.com/123 的补上 https://。
 *  取不到返回 ''(群号、「QQ群123」这类纯文字不会被当成网址)。 */
function extractUrl(text) {
  const t = String(text || '').trim();
  const m = t.match(/https?:\/\/[^\s<>"'()\uFF08\uFF09\u3010\u3011\u300C\u300D]+/i);
  if (m) return cleanUrl(m[0].replace(/[.,;:!?\uFF0C\u3002\uFF1B\uFF1A\uFF01\uFF1F\u3001]+$/, ''));
  if (/^[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:[/?#]\S*)?$/i.test(t)) return cleanUrl(`https://${t}`);
  return '';
}

/** QQ 群:加群链接或纯群号二选一。链接 → { url };群号 → { text }(作者页显示为点击复制的群号)。
 *  群号前允许带字,如「QQ群1108776355」「群号:555433599」。两样都不是返回 null。 */
function qqEntry(value) {
  const url = extractUrl(value);
  if (url) return { platform: 'qq', url };
  const num = String(value).match(/\d{5,12}/);
  return num ? { platform: 'qq', text: num[0] } : null;
}

/* ── 已有条目与归属 ─────────────────────────────────────────────────────── */
// 脚本零依赖,不引 YAML 库:只读顶层的 `key: 标量` 和 owners 列表。兼容 bot 生成的
// 双引号写法,以及手写数据的单引号 / 无引号 / 块列表写法。
function unquote(v) {
  const s = String(v).trim();
  const dq = s.match(/^"((?:[^"\\]|\\.)*)"/); // 只取引号内,后面可能跟 # 注释
  if (dq) { try { return JSON.parse(`"${dq[1]}"`); } catch { return dq[1]; } }
  const sq = s.match(/^'((?:[^']|'')*)'/);
  if (sq) return sq[1].replace(/''/g, "'");
  return s.replace(/\s+#.*$/, '');
}
function readEntry(path) {
  if (!existsSync(path)) return null;
  const text = readFileSync(path, 'utf8');
  const scalar = (key) => { const m = text.match(new RegExp(`^${key}:[ \\t]*(\\S.*)$`, 'm')); return m ? unquote(m[1]) : ''; };
  const flow = text.match(/^owners:[ \t]*\[(.*)\][ \t]*$/m);
  const block = text.match(/^owners:[ \t]*\r?\n((?:[ \t]+-[ \t]*\S.*(?:\r?\n|$))+)/m);
  const owners = flow ? flow[1].split(',')
    : block ? block[1].split(/\r?\n/).map((l) => l.replace(/^[ \t]*-[ \t]*/, ''))
    : [];
  return { scalar, owners: owners.map(unquote).filter(Boolean) };
}
// owners = 能直接通过投稿更新这条记录的 GitHub 账号(不区分大小写);空 = 只有维护者能确认。
const ownsIt = (owners) => Boolean(issueAuthor) && owners.some((o) => o.toLowerCase() === issueAuthor.toLowerCase());
const loginList = (owners) => (owners.length ? owners.map((o) => `\`${o}\``).join('、') : '暂无');
const ownersYaml = (owners) => (owners.length ? `owners: ${JSON.stringify(owners)}\n` : '');

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

/* ── 图片下载 ───────────────────────────────────────────────────────────── */
// 下载的图会进 public/images/,在 assetto.cn 域名下公开访问,所以:
// - 只收 GitHub 附件(拖进 issue 输入框上传生成的链接),不替任意外站抓文件;
// - 按文件头认格式,只放行 png / jpg / webp(和 optimize-images.mjs 能处理的一致),
//   不看 Content-Type 和链接后缀 —— 以前一个 .svg / .html 链接会原样存进来;
// - 下载失败直接报错。以前是退回引用远程链接,但附件链接会跳到带时效签名的地址,迟早失效。
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // GitHub 图片附件本身的上限也是 10MB
const IMAGE_EXTS = ['png', 'jpg', 'webp'];
const isGitHubAttachment = (u) =>
  u.protocol === 'https:' &&
  ((u.hostname === 'github.com' && u.pathname.startsWith('/user-attachments/assets/')) ||
    /^(?:private-)?user-images\.githubusercontent\.com$/.test(u.hostname));
function sniffImage(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'png';
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (buf.length >= 12 && buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') return 'webp';
  return '';
}

/** 下载投稿图到 public/images/<dir>/<id>.<ext>,返回站内路径;不合规直接 fail(label 是表单里的字段名)。 */
async function downloadImage(raw, dir, id, label) {
  let url = null;
  try { url = new URL(raw); } catch { /* 下面统一报错 */ }
  if (!url || !isGitHubAttachment(url)) {
    fail(`「${label}」请把图片直接拖进输入框上传(会生成 github.com/user-attachments/… 的链接),不接受外站图片链接。 / "${label}": drag the image into the field to upload it — external image links are not accepted.`);
  }
  let res, buf;
  try {
    res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const host = new URL(res.url || url).hostname; // 跳转后的地址也必须还在 GitHub
    if (host !== 'github.com' && !host.endsWith('.githubusercontent.com')) throw new Error(`redirected to ${host}`);
  } catch (e) {
    fail(`「${label}」图片下载失败(${e.message}),请重新上传后编辑本 issue 再试。 / "${label}": image download failed (${e.message}).`);
  }
  const tooBig = `「${label}」图片超过 10MB,请压缩后重新上传。 / "${label}": the image is larger than 10MB.`;
  if (Number(res.headers.get('content-length')) > MAX_IMAGE_BYTES) fail(tooBig);
  try { buf = Buffer.from(await res.arrayBuffer()); } catch (e) {
    fail(`「${label}」图片下载失败(${e.message}),请重新上传后编辑本 issue 再试。 / "${label}": image download failed (${e.message}).`);
  }
  if (buf.length > MAX_IMAGE_BYTES) fail(tooBig);
  const ext = sniffImage(buf);
  if (!ext) fail(`「${label}」只支持 PNG / JPG / WebP 图片。 / "${label}": only PNG, JPG or WebP images are accepted.`);
  const path = `public/images/${dir}/${id}.${ext}`;
  mkdirSync(dirname(path), { recursive: true });
  // 同一 id 换了格式重传(作者更新头像时 jpg → png)要删掉旧文件,否则旧图一直留在仓库里。
  for (const other of IMAGE_EXTS) if (other !== ext) rmSync(`public/images/${dir}/${id}.${other}`, { force: true });
  writeFileSync(path, buf);
  return `/images/${dir}/${id}.${ext}`;
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
    const cover = await downloadImage(url, 'gallery', id, '截图 Screenshot');
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
    // 两类:接入地址(ip:port 纯文本)与主页(URL)。
    const address = (field('接入地址') || field('地址') || field('address')).split(/\s/)[0].trim();
    const homepage = extractUrl(field('主页') || field('介绍') || field('homepage'));
    const id = `${slugify(nameEn, 'server')}-${issueNumber}`;
    let yaml =
      `order: ${order}\n` +
      `type: ${q(type)}\n` +
      `name:\n  zh: ${q(nameZh)}\n  en: ${q(nameEn)}\n` +
      `region:\n  zh: ${q(regionZh)}\n  en: ${q(regionEn)}\n` +
      `mode:\n  zh: ${q(modeZh)}\n  en: ${q(modeEn)}\n` +
      `max: ${max}\n` +
      `online: true\n`;
    if (homepage) yaml += `homepage: ${q(homepage)}\n`;
    if (address) yaml += `address: ${q(address)}\n`;
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
    const id = slugify(handle.replace(/^@/, ''), `author-${issueNumber}`);
    if (id === 'acn') fail('官方账号(acn)由维护者直接维护,不接受公开投稿。 / The official acn profile is maintained directly.');
    // 同 handle 即更新已有作者。只有它 owners 里的账号(或维护者)提交才算已核实;
    // 否则照样开 PR,但打 needs-verification 标签,维护者确认是本人再合并 —— 合并即把
    // 投稿账号加进 owners,之后用它更新不用再核实。表单之外的字段(order 排序、
    // tint/ink 配色)沿用旧值:#30 更新资料时 order 从 11 变成 1030,作者被挤到了列表末尾。
    const existing = readEntry(`src/content/authors/${id}.yaml`);
    const verified = !existing || byMaintainer || ownsIt(existing.owners);
    const owners = existing ? [...existing.owners] : [];
    if (issueAuthor && !byMaintainer && !ownsIt(owners)) owners.push(issueAuthor);
    const oldOrder = existing ? parseInt(existing.scalar('order'), 10) : NaN;
    const [newTint, newInk] = AVATAR_PALETTE[issueNumber % AVATAR_PALETTE.length];
    const tint = (existing && existing.scalar('tint')) || newTint;
    const ink = (existing && existing.scalar('ink')) || newInk;
    // 可选头像图:传了就下载到 public/images/authors/;没传留空 → 前端回退到字母头像
    const avatarUrl = imageUrlFrom(field('头像图片') || field('avatar', 'image'));
    const avatar = avatarUrl ? await downloadImage(avatarUrl, 'authors', id, '头像图片 Avatar') : '';
    // 外链:每个平台一个专属输入框(平台由填哪个框决定,投稿人无需写平台名);
    // 「其他链接」textarea 每行 "名称 | 链接",按名称/域名归类。
    // 每条外链二选一:url(http/https 网址)或 text(纯文本,如 QQ 群号),schema 里同样校验。
    const links = [];
    const addUrlField = (platform, token, label) => {
      const raw = field(token);
      if (!raw) return;
      const url = extractUrl(raw);
      if (!url) fail(`「${label}」需要填网址(http/https 开头),现在填的是:${raw} / "${label}" must be a URL.`);
      links.push({ platform, url });
    };
    addUrlField('bilibili', 'bilibili', 'Bilibili');
    addUrlField('afdian', 'afdian', '爱发电 Afdian');
    addUrlField('weibo', 'weibo', '微博 Weibo');
    const qqRaw = field('qq');
    if (qqRaw) {
      const qq = qqEntry(qqRaw);
      if (!qq) fail(`「QQ 群」请填加群链接或群号,现在填的是:${qqRaw} / "QQ Group" must be an invite link or a group number.`);
      links.push(qq);
    }
    addUrlField('youtube', 'youtube', 'YouTube');
    addUrlField('patreon', 'patreon', 'Patreon');
    addUrlField('x', 'twitter', 'X (Twitter)');
    addUrlField('discord', 'discord', 'Discord');
    addUrlField('github', 'github', 'GitHub');
    addUrlField('website', 'website', '个人主页 Website');
    for (const line of String(field('其他链接') || field('other', 'links')).split('\n')) {
      const t = line.trim();
      if (!t) continue;
      const bar = t.search(/[|\uFF5C]/);
      let nm = bar === -1 ? '' : t.slice(0, bar).trim();
      let rest = (bar === -1 ? t : t.slice(bar + 1)).trim();
      if (!rest) continue;
      const url = extractUrl(rest);
      if (url) {
        const platform = detectPlatform(nm, url);
        links.push(platform === 'other' && nm ? { platform, url, label: nm } : { platform, url });
        continue;
      }
      // 没有网址:收成纯文本条目(个人 QQ 号、微信号等),作者页显示为点击复制的文字。
      // 没用「|」时按「名称:值」拆,如 "Personal QQ Account : 2381097483"。
      if (!nm) {
        const m = rest.match(/^(.+?)\s*[:\uFF1A]\s*(.+)$/);
        if (m) { nm = m[1].trim(); rest = m[2].trim(); }
      }
      if (nm && detectPlatform(nm, '') === 'qq') {
        const qq = qqEntry(rest);
        if (qq) { links.push(qq); continue; }
      }
      if (!nm) fail(`「其他链接」这一行没有网址,也没写名称:${t}。请写成「名称 | 链接」。 / Other links: "${t}" has no URL and no name — use "Name | URL".`);
      links.push({ platform: 'other', label: nm, text: rest });
    }
    const listBlock = (k, arr) => `${k}:\n  zh:\n${arr.zh.map((x) => `    - ${q(x)}`).join('\n') || '    []'}\n  en:\n${arr.en.map((x) => `    - ${q(x)}`).join('\n') || '    []'}\n`;
    let yaml =
      `order: ${Number.isFinite(oldOrder) ? oldOrder : order}\n` +
      ownersYaml(owners) +
      `initials: ${q(initials)}\n` +
      `tint: ${q(tint)}\n` +
      `ink: ${q(ink)}\n` +
      (avatar ? `avatar: ${q(avatar)}\n` : '') +
      `name:\n  zh: ${q(nameZh)}\n  en: ${q(nameEn)}\n` +
      `handle: ${q(handle)}\n` +
      listBlock('skills', { zh: skillsZh, en: skillsEn }) +
      `bio:\n  zh: ${q(bioZh)}\n  en: ${q(bioEn)}\n`;
    const linkYaml = (l) => `  - { platform: ${l.platform}, ${l.url ? `url: ${q(l.url)}` : `text: ${q(l.text)}`}${l.label ? `, label: ${q(l.label)}` : ''} }`;
    if (links.length) yaml += `links:\n` + links.map(linkYaml).join('\n') + '\n';
    const note = !existing ? '' : verified ? ` (更新作者 ${id})` : ` ⚠️ 待核实:覆盖作者 ${id}`;
    const notice = verified ? '' :
      `⚠️ **待核实身份**:这条投稿会覆盖已有作者 \`${id}\`,但投稿账号 \`${issueAuthor || '未知'}\` 不在它的 owners 里(现有:${loginList(existing.owners)})。` +
      `维护者确认是作者本人后再合并;合并后该账号会加入 owners,以后用它更新无需再核实。`;
    return { id, dir: 'authors', yaml, title: `${nameZh} / ${nameEn}${note}`, notice };
  },

  async work() {
    const TYPES = ['vehicle', 'map', 'tool', 'app', 'guide', 'doc', 'data']; // 与 src/data/work-types.js 保持一致
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
    // 作品挂在谁名下由投稿人自己填,所以同样核对账号:不在该作者 owners 里的标待核实。
    // 作品 PR 不改作者文件,确认是本人后要把账号加进作者 owners 需维护者手动补。
    const authorOwners = readEntry(`src/content/authors/${authorId}.yaml`).owners;
    const verified = byMaintainer || ownsIt(authorOwners);
    const coverUrl = imageUrlFrom(field('封面') || field('cover'));
    const cover = coverUrl ? await downloadImage(coverUrl, 'works', id, '封面 Cover') : '';
    // 可选外链:作品卡上的「查看」按钮。取第一个 URL,没有则留空。
    const link = extractUrl(field('作品链接') || field('work link') || field('链接') || field('link'));
    let yaml =
      `order: ${order}\n` +
      ownersYaml(issueAuthor && !byMaintainer ? [issueAuthor] : []) +
      `authorId: ${q(authorId)}\n` +
      `type: ${q(type)}\n` +
      `version: ${q(version)}\n` +
      `updated: ${q(currentMonth())}\n` +
      `title:\n  zh: ${q(titleZh)}\n  en: ${q(titleEn)}\n` +
      `desc:\n  zh: ${q(descZh)}\n  en: ${q(descEn)}\n`;
    if (cover) yaml += `cover: ${q(cover)}\n`;
    if (link) yaml += `link: ${q(link)}\n`;
    const notice = verified ? '' :
      `⚠️ **待核实身份**:作品挂在作者 \`${authorId}\` 名下,但投稿账号 \`${issueAuthor || '未知'}\` 不在该作者的 owners 里(现有:${loginList(authorOwners)})。` +
      `维护者确认是作者本人后再合并;确认后可顺手把该账号加进 \`src/content/authors/${authorId}.yaml\` 的 owners。`;
    return { id, dir: 'works', yaml, title: `${titleZh} / ${titleEn}${verified ? '' : ' ⚠️ 待核实'}`, notice };
  },
};

/* ── main ───────────────────────────────────────────────────────────────── */
const build = BUILDERS[KIND];
if (!build) fail(`未知投稿类型 KIND="${KIND}"。`);

const { id, dir, yaml, title, notice = '' } = await build();
const path = `src/content/${dir}/${id}.yaml`;
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, yaml);

setOutput('status', 'ok');
setOutput('kind', KIND);
setOutput('id', id);
setOutput('path', path);
setOutput('title', title);
setOutput('notice', notice);
setOutput('labels', [`${KIND}-submission`, ...(notice ? ['needs-verification'] : [])].join(','));
console.log(`Wrote ${path}\n${yaml}`);
