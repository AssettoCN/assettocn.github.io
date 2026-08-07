// Generates public/og.png — the social share card (Open Graph / Twitter).
//
// WHY a generator and not a hand-made image: the card is pure brand — the logo
// polygons from BrandMark.astro plus the wordmark in Caprasimo, on the warm
// paper ground. Those values live in src/styles/global.css and the component;
// regenerating beats re-exporting from a design tool when the palette moves.
//
// The card is LATIN-ONLY on purpose. Rendering CJK would mean shipping a Noto
// Sans SC download (megabytes) for one line, and it isn't needed: og:title and
// og:description already carry the Chinese copy from src/data/ui.js — the image
// is the visual, the text around it is localised.
//
// Fonts: librsvg (inside sharp) finds fonts through fontconfig, which normally
// means installing them system-wide. Instead this fetches the TTFs into a
// gitignored .cache/ and points fontconfig there via FONTCONFIG_FILE, so the
// script touches nothing outside the repo. That env var has to be set before
// sharp loads, hence the dynamic import at the bottom.
//
// Run from repo root:  node scripts/gen-og.mjs
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = 'public/og.png';
const CACHE = '.cache/og-fonts';
const UA_TTF = 'Mozilla/4.0';      // an old UA makes Google Fonts serve ttf, not woff2
const W = 1200;
const H = 630;

// Brand values — mirror src/styles/global.css (light theme) and BrandMark.astro.
const BG = '#f6f4f1';
const INK = '#16130f';
const RED = '#e2001a';
const MUTED = '#6b665f';

/** Resolve a family's ttf URL from the Google Fonts CSS, then cache it locally. */
async function fetchTtf(family, file) {
  const path = `${CACHE}/${file}`;
  if (existsSync(path)) return path;
  const css = await (await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    { headers: { 'User-Agent': UA_TTF } },
  )).text();
  const url = css.match(/https:\/\/[^)]*\.ttf/)?.[0];
  if (!url) throw new Error(`no ttf url for ${family} — did the Google Fonts API change?`);
  const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA_TTF } })).arrayBuffer());
  mkdirSync(CACHE, { recursive: true });
  writeFileSync(path, buf);
  console.log(`  cached ${file} (${(buf.length / 1024).toFixed(0)}KB)`);
  return path;
}

await fetchTtf('Caprasimo', 'Caprasimo.ttf');
await fetchTtf('Figtree:wght@600', 'Figtree.ttf');

// Minimal fontconfig pointing only at our cache — no system font install.
const confPath = `${CACHE}/fonts.conf`;
writeFileSync(confPath, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${resolve(CACHE)}</dir>
  <cachedir>${resolve(CACHE, 'fc-cache')}</cachedir>
</fontconfig>
`);
process.env.FONTCONFIG_FILE = resolve(confPath);

// The logo, lifted verbatim from src/components/BrandMark.astro (viewBox
// 1054.97x640.76). Used twice: as a large bleed watermark and as the mark itself.
const logo = (fill, accent) => `
  <polygon fill="${fill}" points="0.5 473.62 0.5 639.58 277.27 369.96 277.27 513.45 406.97 383.75 406.97 74.81 0.5 473.62" />
  <polygon fill="${accent}" points="662.8 0 439.14 217.79 439.14 367.41 662.8 148.34 662.8 0" />
  <polygon fill="${accent}" points="439.14 403.66 563.73 279.07 563.73 334.73 817.52 85.02 817.52 234.13 541.27 511.92 439.14 511.92 439.14 403.66" />
  <polygon fill="${fill}" points="817.52 268.34 698.29 387.58 698.29 602.81 1054.97 247.92 1054.97 93.19 817.52 328.6 817.52 268.34" />`;

// Watermark: same trick as the site hero — the mark bleeding off the lower right
// at low opacity, so the card reads as brand furniture rather than a pasted logo.
const WM = 900;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <g transform="translate(${W - WM + 250} ${H - (WM * 640.76 / 1054.97) + 120}) scale(${WM / 1054.97})" opacity="0.055">
    ${logo(INK, INK)}
  </g>

  <g transform="translate(80 96) scale(${150 / 1054.97})">${logo(INK, RED)}</g>

  <text x="80" y="300" font-family="Figtree" font-weight="600" font-size="26"
        letter-spacing="3.4" fill="${RED}">ASSETTO CORSA</text>

  <text x="80" y="430" font-family="Caprasimo" font-size="118" fill="${INK}"
        >Assetto<tspan fill="${RED}">CN</tspan></text>

  <text x="80" y="492" font-family="Figtree" font-weight="600" font-size="30" fill="${MUTED}"
        >Modders, works, servers and guides — in one place.</text>

  <rect x="80" y="545" width="54" height="4" fill="${RED}"/>
  <text x="80" y="590" font-family="Figtree" font-weight="600" font-size="22" fill="${MUTED}"
        >assettocn.github.io</text>
</svg>`;

const { default: sharp } = await import('sharp');
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
const { size } = await import('node:fs').then((m) => m.statSync(OUT));
console.log(`  ${OUT}  ${W}x${H}  ${(size / 1024).toFixed(0)}KB`);
