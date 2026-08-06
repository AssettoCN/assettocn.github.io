# AssettoCN — design foundation

This is a **foundation-only** design system: brand tokens, themes, fonts, and a small
CSS class idiom extracted from the AssettoCN site (`src/styles/global.css`). There is
**no interactive component bundle** — the source site is built with Astro, not React.
So: **author your own JSX/HTML and style it with the tokens and classes below.** Do not
try to import components from a bundle; there isn't one. Everything you build inherits
the brand automatically as long as `styles.css` is loaded.

## Setup

- **No provider, no framework, no build step.** The system is plain CSS custom
  properties. Load `styles.css` once at the root — that's the whole contract. Fonts
  (Caprasimo, Figtree) auto-load via its Google-Fonts `@import`.
- **Light is the default.** For dark mode, set `data-theme="dark"` on a root ancestor
  (the site sets it on `<html>`). Every token flips automatically — never hard-code a
  second dark palette.

## Styling idiom — use tokens, not raw values

Style **everything** through `var(--*)` tokens so light/dark and the AC-red brand stay
consistent. Real names:

| Family | Tokens |
|---|---|
| Surfaces | `--color-bg`, `--color-surface` |
| Text | `--color-text`, `--color-divider`, + class `.text-muted` |
| Brand | `--color-accent` (AC red `#e2001a`, both themes), `--color-accent-2` |
| Ramps | `--color-neutral-100…900`, `--color-accent-100…900`, `--color-accent-2-100…900` |
| Type | `--font-heading` (Caprasimo 400), `--font-body` (Figtree) |
| Spacing | `--space-1 2 3 4 6 8` (4.4→35.2px) |
| Radius | `--radius-sm md lg` (8/16/28px) |
| Shadow | `--shadow-sm md lg` (or classes `.elev-sm .elev-md .elev-lg`) |

Prefer the **semantic** token when one exists (`--color-bg`/`--color-surface`/`--color-text`/
`--color-accent`) over reaching into a ramp. AC red is the single brand accent — use it
for primary actions, links, kickers, and emphasis, sparingly.

### Class vocabulary (already in `styles.css`)

- Headings `h1`–`h6` are pre-styled with Caprasimo — just use the right level.
- **Buttons** — `.btn` + `.btn-primary` | `.btn-secondary` | `.btn-ghost`, `.btn-block`, `disabled`. Pill-shaped.
- **Cards** — `.card` + `.card-kicker` / `.card-title` / `.card-body` / `.card-meta`, add `.elev-md`.
- **Tags** — `.tag` + `.tag-accent` | `.tag-accent-2` | `.tag-neutral` | `.tag-outline`. Pills.
- **Nav** — `.nav` + `.nav-brand`.
- Page shell: `.shell` (max-width container), `.page-title`, `.page-sub`, `.fade-in`.

For your own layout glue, write plain CSS with the tokens above — don't invent a class
naming system; there's no utility framework here.

## Where the truth lives

Read `styles.css` (the full stylesheet) and `tokens/tokens.json` (every token value,
light + dark) before styling. Each foundation card has a `*.prompt.md` with usage.

## One idiomatic snippet

```html
<article class="card elev-md" style="max-width:280px">
  <div class="card-kicker">车辆 · Vehicle</div>
  <h3 class="card-title">GT3 整合包</h3>
  <p class="card-body">用 <code>--color-surface</code> 作底、<code>--color-accent</code> 作强调。</p>
  <div class="card-meta">
    <span class="tag tag-accent">v1.2</span>
    <a class="btn btn-primary" href="#">下载</a>
  </div>
</article>
```
