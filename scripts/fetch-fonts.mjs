// Downloads the site's webfonts from Google Fonts into public/fonts/ so the
// site never has to reach fonts.googleapis.com at runtime.
//
// WHY: fonts.googleapis.com / fonts.gstatic.com are unreachable from mainland
// China — our entire audience. A CSS `@import` to a blocked host is also
// render-blocking, so those users waited out a TCP timeout and *then* lost the
// brand face anyway. Self-hosting fixes both.
//
// This script only fetches the *latin* + *latin-ext* subsets: the site's own
// copy is zh/en, Chinese text renders from the system stack, and unicode-range
// means an unused subset is never downloaded by the browser.
//
// Run from repo root:  node scripts/fetch-fonts.mjs
// It rewrites public/fonts/*.woff2 and src/styles/fonts.css. Both are committed
// — this runs when the font list changes, not at build time.
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';

const OUT = 'public/fonts';
const CSS_OUT = 'src/styles/fonts.css';
// Body + display faces: full latin / latin-ext, because they render arbitrary
// prose (guide bodies, author bios, work titles).
const SPEC = 'family=Caprasimo:wght@400&family=Figtree:wght@400;600;700';
// A modern desktop UA is required — Google serves woff2 only to browsers it
// recognises, and legacy UAs get ttf.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const KEEP = new Set(['latin', 'latin-ext']);

// JetBrains Mono is CHROME ONLY — section indices (`/ 01`), level badges
// (`LV 03`), the version·date meta line, the gallery count, the 404 code. It
// never renders prose: `.prose code` deliberately uses the system `ui-monospace`
// stack (see global.css), so guide code samples don't depend on this file.
//
// So we don't take Google's stock latin subset (30.7KB) — we ask for exactly the
// characters the UI can produce via the css2 `text=` parameter, which returns a
// purpose-built file. 70 glyphs ≈ 9.9KB, and latin-ext (another 11.4KB) drops
// entirely. Letters are included because the UI strings in ui.js include `LV`,
// `min`, `START` and `Read`.
//
// **Anything rendered in --font-mono must stay inside this set.** A character
// outside it silently falls back to the system mono mid-string, which looks
// broken. That is why user-supplied text (car / track names, which carry
// accents like Nürburgring) is NOT styled with --font-mono anywhere.
const MONO_SPEC = 'family=JetBrains+Mono:wght@400;500;700';
const MONO_TEXT = [
  '0123456789',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  " ·—–-./:,()+%#&'\"",
].join('');

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function fetchCss(query) {
  const res = await fetch(`https://fonts.googleapis.com/css2?${query}`, {
    headers: { 'User-Agent': UA },
  });
  if (!res.ok) throw new Error(`Google Fonts CSS ${res.status} for ${query}`);
  return res.text();
}

// Parse the returned CSS rather than hand-listing URLs: the hashed gstatic
// filenames change on every release. The stock response prefixes each block
// with a `/* subset */` comment; the `text=` response has no comment (there is
// only one subset — the one we asked for), hence the optional group and the
// `label` fallback.
function parseFaces(css, label) {
  const faces = [];
  const re = /(?:\/\*\s*([\w-]+)\s*\*\/\s*)?@font-face\s*\{([^}]+)\}/g;
  for (const [, subset, body] of css.matchAll(re)) {
    const name = subset ?? label;
    if (label === null && !KEEP.has(name)) continue;
    const pick = (k) => (body.match(new RegExp(`${k}:\\s*([^;]+);`)) || [])[1]?.trim();
    faces.push({
      subset: name,
      family: pick('font-family').replace(/['"]/g, ''),
      weight: pick('font-weight'),
      style: pick('font-style'),
      range: pick('unicode-range'),
      url: body.match(/url\((https:[^)]+)\)/)[1],
    });
  }
  return faces;
}

const faces = [
  ...parseFaces(await fetchCss(`${SPEC}&display=swap`), null),
  // `display=swap` is not honoured alongside `text=`, so font-display is set
  // when the CSS is written below (it is written for every face anyway).
  ...parseFaces(await fetchCss(`${MONO_SPEC}&text=${encodeURIComponent(MONO_TEXT)}`), 'ui'),
];
if (!faces.length) throw new Error('parsed 0 @font-face blocks — did the CSS format change?');

// Figtree and JetBrains Mono are variable fonts: Google points every requested
// weight at ONE file. Dedupe by URL so we store each file once.
mkdirSync(OUT, { recursive: true });
const fileFor = new Map();
for (const f of faces) {
  if (fileFor.has(f.url)) continue;
  const name = `${slug(f.family)}-${f.subset}.woff2`;
  const buf = Buffer.from(await (await fetch(f.url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  writeFileSync(`${OUT}/${name}`, buf);
  fileFor.set(f.url, name);
  console.log(`  ${name}  ${(buf.length / 1024).toFixed(1)}KB`);
}

// Drop woff2 files this run didn't produce. Everything in public/fonts/ comes
// from this script, so a leftover is always a stale subset from an earlier
// spec (e.g. the stock jetbrains-mono-latin* files this replaced) — it would
// otherwise sit in the repo and ship in the build, unreferenced.
const wanted = new Set(fileFor.values());
for (const stale of readdirSync(OUT).filter((n) => n.endsWith('.woff2') && !wanted.has(n))) {
  unlinkSync(`${OUT}/${stale}`);
  console.log(`  - removed stale ${stale}`);
}

// Mirror Google's own per-weight declarations (a discrete `font-weight` on a
// variable file pins that axis — synthesising bold instead would be wrong).
const block = faces.map((f) => `@font-face {
  font-family: '${f.family}';
  font-style: ${f.style};
  font-weight: ${f.weight};
  font-display: swap;
  src: url('/fonts/${fileFor.get(f.url)}') format('woff2');
  unicode-range: ${f.range};
}`).join('\n');

writeFileSync(CSS_OUT, `/* GENERATED by scripts/fetch-fonts.mjs — do not edit by hand.
   Self-hosted webfaces (see the script header for why we don't use the Google
   Fonts CDN). global.css @imports this with a relative path, so Vite inlines it
   at build time — no extra request. unicode-range means a browser only fetches
   the subsets a page actually uses.

   jetbrains-mono-ui.woff2 is NOT a standard Google subset: the mono face is UI
   chrome only, so it is cut to just the characters the chrome can render (see
   MONO_TEXT in the script). Its unicode-range below is therefore sparse — that
   is intentional, not a truncated file. */
${block}
`);

console.log(`\n${faces.length} faces / ${fileFor.size} files → ${CSS_OUT}`);
