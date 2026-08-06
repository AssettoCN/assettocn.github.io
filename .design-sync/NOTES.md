# design-sync notes

## Shape: foundation-only (off-script)

This repo is an **Astro static site** (44 `.astro` components, no React/Preact, no
Storybook, no bundlable `dist/`). The standard converter can't run — `.astro`
components don't compile to runtime `window.<global>.*` React components, and
reimplementing them as React is out of scope ("ship what the customer built").

So we sync only the **brand foundation** from `src/styles/global.css`: tokens,
light/dark themes, fonts, and the `.btn`/`.card`/`.tag`/`.nav` class idiom. This makes
every design produced in Claude Design on-brand (AC red `#e2001a`, Figtree/Caprasimo,
correct spacing) even though it can't render the literal site components.

## Rebuild

```
node scripts/gen-dsbundle.mjs   # from repo root → writes ds-bundle/
```

The generator reads `src/styles/global.css` verbatim into `ds-bundle/styles.css`, so
**the source of truth stays global.css** — edit colors/fonts there, then re-run. The
inline preview CSS (the `SHARED` const in the generator) is a hand-mirrored copy of the
token values for the preview cards; if you change the palette in global.css, update
`SHARED` too (previews are self-contained so they render in the picker regardless of
how the app serves them).

## Deviations from the standard skill

- **No `_ds_bundle.js` / `.d.ts` / `.jsx`** — no component library to bundle.
- **No `_ds_sync.json` anchor** — off-script hand-authored; there's no converter to
  diff against, so next sync just re-runs the generator and re-uploads. This is the
  documented "honest omission" for an off-envelope repo.
- Preview cards are hand-authored HTML (self-contained), grouped under `Foundation`.

## Fonts

Loaded via the Google-Fonts `@import` at the top of `styles.css` (same as the live
site) — no local `fonts/` directory needed.
