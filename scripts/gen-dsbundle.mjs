// Generates the foundation-only Claude Design bundle for AssettoCN.
// Off-script (Astro site → no component library): we ship the brand FOUNDATION
// — tokens, themes, fonts, and the base class idiom from src/styles/global.css —
// plus preview cards + a conventions README. Run from repo root: node <this>.
import { writeFileSync, mkdirSync, readFileSync, cpSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';

const OUT = 'ds-bundle';
const w = (p, s) => { mkdirSync(dirname(`${OUT}/${p}`), { recursive: true }); writeFileSync(`${OUT}/${p}`, s); console.log('  ' + p); };

/* styles.css = the real stylesheet, verbatim. This IS the customer's foundation;
   every design the agent builds receives this file's @import closure. */
const globalCss = readFileSync('src/styles/global.css', 'utf8');
w('styles.css', globalCss);

/* tokens.json — machine-readable mirror of the token layers (agent reference). */
const tokens = {
  $meta: { name: 'AssettoCN', source: 'src/styles/global.css', themes: ['light', 'dark'],
    note: 'Light = "Assetto Corsa retheme" layer (warm paper ground, white cards, AC red). Dark = data-theme="dark".' },
  font: { heading: '"Caprasimo", system-ui, sans-serif', body: '"Figtree", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace', headingWeight: 400 },
  space: { '1': '4.4px', '2': '8.8px', '3': '13.2px', '4': '17.6px', '6': '26.4px', '8': '35.2px' },
  radius: { sm: '8px', md: '16px', lg: '28px', note: 'Cards use calc(--radius-lg*1.15); .btn and .tag are pills (999px).' },
  color: {
    light: {
      bg: '#f6f4f1', surface: '#ffffff', text: '#16130f', accent: '#e2001a', accent2: '#5c636a',
      divider: 'rgba(22, 19, 15, .12)',
      neutral: { 100: '#f2f0ee', 200: '#e7e4e0', 300: '#d8d4cf', 400: '#b8b3ac', 500: '#8f8a82', 600: '#6b665f', 700: '#4c4842', 800: '#302d29', 900: '#1a1815' },
      accentRamp: { 100: '#fde8ea', 200: '#fbc9ce', 300: '#f59aa3', 400: '#ec5462', 500: '#e2001a', 600: '#c40018', 700: '#9c0013', 800: '#6f000d', 900: '#4a0009' },
      accent2Ramp: { 100: '#eceef0', 200: '#dfe2e5', 300: '#c9ced3', 400: '#a7aeb5', 500: '#7c848c', 600: '#5c636a', 700: '#434850', 800: '#2b2f34', 900: '#191c1f' },
    },
    dark: {
      bg: '#0e0c0c', surface: '#161415', text: '#f2efec', accent: '#e2001a', accent2: '#868d96',
      divider: 'rgba(242, 239, 236, .13)',
      neutral: { 100: '#161415', 200: '#1f1d1e', 300: '#2b2829', 400: '#3d393b', 500: '#5c5759', 600: '#7d787a', 700: '#9e999b', 800: '#c4c0c1', 900: '#e7e4e4' },
      accentRamp: { 100: '#340a0d', 200: '#4d0d11', 300: '#6f131a', 400: '#9c1a24', 500: '#e2001a', 600: '#e6414c', 700: '#ef7079', 800: '#f6a3aa', 900: '#fcd4d8' },
      accent2Ramp: { 100: '#1a1c1e', 200: '#232629', 300: '#31353a', 400: '#454b52', 500: '#666d76', 600: '#868d96', 700: '#a6acb4', 800: '#c8ccd1', 900: '#e9ebee' },
    },
  },
  shadow: {
    light: { sm: '0 1px 2px rgba(22,19,15,.07)', md: '0 6px 20px rgba(22,19,15,.10)', lg: '0 24px 55px rgba(22,19,15,.14)' },
    dark: { sm: '0 1px 2px rgba(0,0,0,.5)', md: '0 6px 20px rgba(0,0,0,.55)', lg: '0 24px 55px rgba(0,0,0,.65)' },
  },
};
w('tokens/tokens.json', JSON.stringify(tokens, null, 2) + '\n');

/* Shared, self-contained preview CSS: fonts + light tokens on :root, dark tokens
   under .dark (so both themes render whether the app iframes or inlines the HTML),
   base element styles, and the .btn/.card/.tag/.nav class idiom + pill overrides. */
const SHARED = `@import url('https://fonts.googleapis.com/css2?family=Caprasimo:wght@400&family=Figtree:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
:root{
  --color-bg:#f6f4f1;--color-surface:#ffffff;--color-text:#16130f;--color-accent:#e2001a;--color-accent-2:#5c636a;
  --color-divider:rgba(22,19,15,.12);
  --color-neutral-100:#f2f0ee;--color-neutral-200:#e7e4e0;--color-neutral-300:#d8d4cf;--color-neutral-400:#b8b3ac;--color-neutral-500:#8f8a82;--color-neutral-600:#6b665f;--color-neutral-700:#4c4842;--color-neutral-800:#302d29;--color-neutral-900:#1a1815;
  --color-accent-100:#fde8ea;--color-accent-200:#fbc9ce;--color-accent-300:#f59aa3;--color-accent-400:#ec5462;--color-accent-500:#e2001a;--color-accent-600:#c40018;--color-accent-700:#9c0013;--color-accent-800:#6f000d;--color-accent-900:#4a0009;
  --color-accent-2-100:#eceef0;--color-accent-2-200:#dfe2e5;--color-accent-2-300:#c9ced3;--color-accent-2-400:#a7aeb5;--color-accent-2-500:#7c848c;--color-accent-2-600:#5c636a;--color-accent-2-700:#434850;--color-accent-2-800:#2b2f34;--color-accent-2-900:#191c1f;
  --font-heading:"Caprasimo",system-ui,sans-serif;--font-heading-weight:400;--font-body:"Figtree",system-ui,sans-serif;--font-mono:"JetBrains Mono",ui-monospace,monospace;
  --space-1:4.4px;--space-2:8.8px;--space-3:13.2px;--space-4:17.6px;--space-6:26.4px;--space-8:35.2px;
  --radius-sm:8px;--radius-md:16px;--radius-lg:28px;
  --shadow-sm:0 1px 2px rgba(20,20,25,.12);--shadow-md:0 3px 12px rgba(20,20,25,.14);--shadow-lg:0 16px 40px rgba(20,20,25,.20);
}
.dark{
  --color-bg:#0e0c0c;--color-surface:#161415;--color-text:#f2efec;--color-divider:rgba(242,239,236,.13);
  --color-neutral-100:#161415;--color-neutral-200:#1f1d1e;--color-neutral-300:#2b2829;--color-neutral-400:#3d393b;--color-neutral-500:#5c5759;--color-neutral-600:#7d787a;--color-neutral-700:#9e999b;--color-neutral-800:#c4c0c1;--color-neutral-900:#e7e4e4;
  --color-accent-100:#340a0d;--color-accent-200:#4d0d11;--color-accent-300:#6f131a;--color-accent-400:#9c1a24;--color-accent-500:#e2001a;--color-accent-600:#e6414c;--color-accent-700:#ef7079;--color-accent-800:#f6a3aa;--color-accent-900:#fcd4d8;
  --color-accent-2-100:#1a1c1e;--color-accent-2-200:#232629;--color-accent-2-300:#31353a;--color-accent-2-400:#454b52;--color-accent-2-500:#666d76;--color-accent-2-600:#868d96;--color-accent-2-700:#a6acb4;--color-accent-2-800:#c8ccd1;--color-accent-2-900:#e9ebee;
  --shadow-sm:0 1px 2px rgba(0,0,0,.5);--shadow-md:0 6px 20px rgba(0,0,0,.55);--shadow-lg:0 24px 55px rgba(0,0,0,.65);
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:var(--font-body);font-size:15px;line-height:1.55;background:#e9e9ec}
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading);font-weight:var(--font-heading-weight);line-height:1.12;letter-spacing:-.015em;margin:0 0 var(--space-2)}
h1{font-size:42px}h2{font-size:32px}h3{font-size:25px}h4{font-size:20px}h5{font-size:16px}h6{font-size:13px;letter-spacing:.08em;text-transform:uppercase}
p{margin:0 0 var(--space-3)}
a{color:var(--color-accent);text-underline-offset:3px}
.text-muted{color:color-mix(in srgb,var(--color-text) 55%,transparent)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;text-decoration:none;font-family:var(--font-heading);font-weight:var(--font-heading-weight);font-size:14px;line-height:1.2;color:var(--color-text);background:transparent;border:1px solid transparent;padding:var(--space-2) calc(var(--space-3)*1.2);border-radius:999px}
.btn:disabled{opacity:.45;cursor:not-allowed}
.btn-primary{background:var(--color-accent);color:#fff}.btn-primary:hover{background:var(--color-accent-600)}
.btn-secondary{border-color:var(--color-divider)}.btn-secondary:hover{background:color-mix(in srgb,var(--color-text) 7%,transparent)}
.btn-ghost{color:var(--color-accent);padding-inline:var(--space-1)}.btn-ghost:hover{background:color-mix(in srgb,var(--color-accent) 10%,transparent)}
.btn-block{width:100%}
.card{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-3);border-radius:calc(var(--radius-lg)*1.15);background:var(--color-surface)}
.card-kicker{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-accent)}
.card-title{font-family:var(--font-heading);font-weight:var(--font-heading-weight);font-size:17px;line-height:1.2}
.card-body{margin:0;font-size:13px;opacity:.8;flex:1}
.card-meta{display:flex;align-items:center;gap:6px;font-size:11px;color:color-mix(in srgb,var(--color-text) 50%,transparent)}
.elev-sm{box-shadow:var(--shadow-sm)}.elev-md{box-shadow:var(--shadow-md)}.elev-lg{box-shadow:var(--shadow-lg)}
.tag{display:inline-flex;align-items:center;font-size:11px;letter-spacing:.02em;padding:3px 10px;border-radius:999px}
.tag-accent{background:var(--color-accent-100);color:var(--color-accent-800)}
.tag-accent-2{background:var(--color-accent-2-100);color:var(--color-accent-2-800)}
.tag-neutral{background:var(--color-neutral-100);color:var(--color-neutral-800)}
.tag-outline{border:1px solid var(--color-accent);color:var(--color-accent)}
.nav{display:flex;align-items:center;gap:var(--space-4);padding:var(--space-3) var(--space-4)}
.nav-brand{font-family:var(--font-heading);font-weight:var(--font-heading-weight);font-size:18px;margin-right:auto}
.nav a{color:inherit;text-decoration:none;font-size:14px}.nav a:hover{color:var(--color-accent)}
/* preview scaffolding (not part of the DS) */
.dsx-wrap{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:14px}
@media(max-width:720px){.dsx-wrap{grid-template-columns:1fr}}
.dsx-stage{background:var(--color-bg);color:var(--color-text);border-radius:18px;padding:20px;box-shadow:var(--shadow-md)}
.dsx-label{font:600 11px var(--font-body);letter-spacing:.12em;text-transform:uppercase;color:color-mix(in srgb,var(--color-text) 45%,transparent);margin-bottom:14px}
.dsx-row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.dsx-ramp{display:grid;grid-template-columns:repeat(9,1fr);gap:0;border-radius:10px;overflow:hidden;margin:6px 0 14px}
.dsx-ramp span{height:34px;display:flex;align-items:flex-end;justify-content:center;font:600 9px var(--font-body);padding-bottom:2px}
.dsx-sw{display:flex;flex-direction:column;gap:4px;font:600 10px var(--font-body)}
.dsx-sw i{height:46px;border-radius:10px;border:1px solid var(--color-divider);display:block}
.dsx-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px}`;

const page = (title, bodyLight, bodyDark) => `<!-- @dsCard group="Foundation" -->
<!doctype html><html lang="zh"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · AssettoCN</title>
<style>${SHARED}</style></head>
<body><div class="dsx-wrap">
  <div class="dsx-stage"><div class="dsx-label">Light · 浅色</div>${bodyLight}</div>
  <div class="dsx-stage dark"><div class="dsx-label">Dark · 深色</div>${bodyDark}</div>
</div></body></html>`;

const ramp = (name, prefix) => `<div style="font:600 11px var(--font-body);margin-bottom:2px">${name}</div><div class="dsx-ramp">` +
  [100,200,300,400,500,600,700,800,900].map((s, i) => {
    const light = i < 4 ? 'var(--color-neutral-900)' : '#fff';
    return `<span style="background:var(${prefix}-${s});color:${light}">${s}</span>`;
  }).join('') + `</div>`;

const coreSwatches = `<div class="dsx-grid" style="margin-bottom:6px">
  <div class="dsx-sw"><i style="background:var(--color-bg)"></i>--color-bg</div>
  <div class="dsx-sw"><i style="background:var(--color-surface)"></i>--color-surface</div>
  <div class="dsx-sw"><i style="background:var(--color-text)"></i>--color-text</div>
  <div class="dsx-sw"><i style="background:var(--color-accent)"></i>--color-accent</div>
  <div class="dsx-sw"><i style="background:var(--color-accent-2)"></i>--color-accent-2</div>
</div>`;
const rampsBlock = coreSwatches + ramp('neutral', '--color-neutral') + ramp('accent (AC red)', '--color-accent') + ramp('accent-2', '--color-accent-2');
w('components/foundation/Colors/Colors.html', page('Colors', rampsBlock, rampsBlock));

const typeBlock = `<h1>神力科莎</h1><h2>Assetto Corsa</h2>
<h3>作者优先 · Authors first</h3>
<h6 style="color:var(--color-accent)">Kicker · 引导标签</h6>
<p>正文用 Figtree —— The quick brown fox。这段是 <b>--font-body</b>,用于全部正文、卡片描述与说明。</p>
<p class="text-muted">.text-muted 次要文本 · secondary copy</p>
<div class="dsx-row" style="font:600 12px var(--font-body);margin-top:10px">
  <span class="tag tag-neutral">heading: Caprasimo</span><span class="tag tag-neutral">body: Figtree</span>
</div>`;
w('components/foundation/Typography/Typography.html', page('Typography', typeBlock, typeBlock));

const tokBlock = `<div style="font:600 11px var(--font-body);margin-bottom:6px">Spacing --space-*</div>
${[['1','4.4'],['2','8.8'],['3','13.2'],['4','17.6'],['6','26.4'],['8','35.2']].map(([k,px]) =>
  `<div class="dsx-row" style="margin-bottom:5px"><code style="font:600 11px var(--font-body);width:64px">--space-${k}</code><span style="height:12px;width:${px}px;background:var(--color-accent);border-radius:3px"></span><span class="text-muted" style="font-size:11px">${px}px</span></div>`).join('')}
<div style="font:600 11px var(--font-body);margin:14px 0 6px">Radius --radius-*</div>
<div class="dsx-row">
  <div style="width:70px;height:46px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:var(--radius-sm)">sm</div>
  <div style="width:70px;height:46px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:var(--radius-md)">md</div>
  <div style="width:70px;height:46px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:var(--radius-lg)">lg</div>
</div>
<div style="font:600 11px var(--font-body);margin:14px 0 6px">Elevation --shadow-*</div>
<div class="dsx-row">
  <div class="elev-sm" style="width:70px;height:46px;background:var(--color-surface);border-radius:14px"></div>
  <div class="elev-md" style="width:70px;height:46px;background:var(--color-surface);border-radius:14px"></div>
  <div class="elev-lg" style="width:70px;height:46px;background:var(--color-surface);border-radius:14px"></div>
</div>`;
w('components/foundation/Tokens/Tokens.html', page('Tokens', tokBlock, tokBlock));

const btnBlock = `<div class="dsx-row" style="margin-bottom:12px">
  <button class="btn btn-primary">主要 Primary</button>
  <button class="btn btn-secondary">次要 Secondary</button>
  <button class="btn btn-ghost">Ghost ↗</button>
  <button class="btn btn-secondary" disabled>Disabled</button>
</div>
<button class="btn btn-primary btn-block">Block 全宽按钮</button>`;
w('components/foundation/Buttons/Buttons.html', page('Buttons', btnBlock, btnBlock));

const cardBlock = `<div class="card elev-md" style="max-width:260px">
  <div class="card-kicker">车辆 · Vehicle</div>
  <div class="card-title">GT3 整合包</div>
  <p class="card-body">卡片用 .card + .card-kicker/.card-title/.card-body/.card-meta,圆角来自 --radius-lg。</p>
  <div class="card-meta"><span class="tag tag-accent">v1.2</span><span>更新于 2026-08</span></div>
</div>`;
w('components/foundation/Cards/Cards.html', page('Cards', cardBlock, cardBlock));

const tagBlock = `<div class="dsx-row">
  <span class="tag tag-accent">tag-accent</span>
  <span class="tag tag-accent-2">tag-accent-2</span>
  <span class="tag tag-neutral">tag-neutral</span>
  <span class="tag tag-outline">tag-outline</span>
</div>`;
w('components/foundation/Tags/Tags.html', page('Tags', tagBlock, tagBlock));

/* per-card usage notes */
const prompt = (name, body) => w(`components/foundation/${name}/${name}.prompt.md`, body);
prompt('Colors', `# Colors\n\nSemantic tokens + three 100–900 ramps, defined in \`styles.css\` for light and (under \`data-theme="dark"\`) dark.\n\n- **Semantic:** \`var(--color-bg)\`, \`var(--color-surface)\`, \`var(--color-text)\`, \`var(--color-accent)\` (AC red \`#e2001a\` in both themes), \`var(--color-accent-2)\`, \`var(--color-divider)\`.\n- **Ramps:** \`var(--color-neutral-100..900)\`, \`var(--color-accent-100..900)\`, \`var(--color-accent-2-100..900)\`.\n\nAlways use the semantic token when one exists (backgrounds → \`--color-bg\`/\`--color-surface\`, text → \`--color-text\`, brand → \`--color-accent\`). Never hard-code hex — the tokens flip automatically in dark mode. AC red is the single brand accent; use it sparingly for emphasis, primary actions, and links.\n`);
prompt('Typography', `# Typography\n\nTwo families: **Caprasimo** for headings (\`var(--font-heading)\`, weight 400) and **Figtree** for body (\`var(--font-body)\`). Loaded via the Google Fonts \`@import\` at the top of \`styles.css\`.\n\n- Headings \`h1\`–\`h6\` are already wired to \`--font-heading\`: h1 42 / h2 32 / h3 25 / h4 20 / h5 16 / h6 13px (h6 is an uppercase kicker).\n- Body text uses Figtree at 15px/1.55. Secondary text → class \`.text-muted\`.\n- Don't introduce other fonts or weights — Caprasimo only ships 400.\n`);
prompt('Tokens', `# Spacing · Radius · Shadow\n\n- **Spacing** \`var(--space-1|2|3|4|6|8)\` = 4.4 / 8.8 / 13.2 / 17.6 / 26.4 / 35.2px. Use for padding, gap, margins.\n- **Radius** \`var(--radius-sm|md|lg)\` = 8 / 16 / 28px. Cards use \`calc(var(--radius-lg)*1.15)\`; \`.btn\` and \`.tag\` are full pills (999px).\n- **Elevation** classes \`.elev-sm|md|lg\` (or \`var(--shadow-sm|md|lg)\`) — reserve \`lg\` for overlays/hover.\n`);
prompt('Buttons', `# Buttons\n\nBase class \`.btn\` + one variant:\n\n- \`.btn.btn-primary\` — AC-red fill, white text. The main call-to-action; one per view.\n- \`.btn.btn-secondary\` — outlined (divider border). Neutral/secondary actions.\n- \`.btn.btn-ghost\` — text-only in AC red, for inline/tertiary actions and external links.\n- Add \`.btn-block\` for full width; \`disabled\` dims to 45%.\n\nButtons are pill-shaped and use the heading font. \`\`\`html\n<a class="btn btn-primary" href="#">立即进服</a>\n\`\`\`\n`);
prompt('Cards', `# Cards\n\n\`.card\` is a rounded surface (\`--color-surface\`, large radius). Compose with:\n\n- \`.card-kicker\` — tiny uppercase AC-red label\n- \`.card-title\` — heading-font title\n- \`.card-body\` — muted body copy (flex-grows)\n- \`.card-meta\` — bottom row for tags / timestamps\n- add \`.elev-sm|md|lg\` for shadow\n\n\`\`\`html\n<div class="card elev-md">\n  <div class="card-kicker">车辆 · Vehicle</div>\n  <div class="card-title">…</div>\n  <p class="card-body">…</p>\n  <div class="card-meta"><span class="tag tag-accent">v1.2</span></div>\n</div>\n\`\`\`\n`);
prompt('Tags', `# Tags\n\nSmall pill labels — \`.tag\` + one tone:\n\n- \`.tag-accent\` — AC-red tint (primary/type labels)\n- \`.tag-accent-2\` — cool grey tint\n- \`.tag-neutral\` — neutral tint\n- \`.tag-outline\` — AC-red outline, transparent fill\n\nUse for content types, versions, and status. Keep the label to a word or two.\n`);

console.log('done → ' + OUT);
