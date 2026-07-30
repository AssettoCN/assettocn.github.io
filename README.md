# AssettoCN 主页 · Assetto Corsa 中文社区

Homepage for the **AssettoCN** community, implemented from the Claude Design
prototype `AssettoCN 主页.dc.html`. Static **Astro** site, bilingual (中文默认 /
English under `/en`), SEO-first with real routes and `hreflang` alternates.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

```bash
npm run build      # static output → dist/ (22 pages)
npm run preview    # serve the built site
```

Requires Node 18.20.8+ / 20.3+ / 22+ (Node 20.19+ silences a transitive engine warning).

## What's inside

- **Pages** — a single-page **home** landing (poster hero + telemetry strip,
  then mission / authors / servers / gallery preview bands + a join CTA), plus
  full routes: authors list, per-author detail (`/authors/:id`), works list with
  type filter, servers list, gallery — each in both `zh` (root) and `en` (`/en/…`).
- **Language toggle** navigates between the two locales (real URLs, not a
  client-only state flip).
- **Light / dark theme** — a nav toggle flips `data-theme` on `<html>`; the
  choice is remembered (`localStorage['acn-theme']`) and applied before first
  paint (no flash). Both palettes live in `src/styles/global.css`.
- **Theme** — the Organic design system retimed to Assetto Corsa (white ground,
  near-black ink, AC red `#e2001a`), with a matching dark palette.

## Project layout

```
src/
  content/     authors/*.yaml, works/*.yaml, servers/*.yaml, gallery/*.yaml
               — content, one file per record (validated)
  content.config.ts                            — collection schemas (Zod)
  data/        ui.js (UI strings), home.js (telemetry stats),
               site.js (domain), work-types.js (categories)
  lib/         content.js (async resolvers), i18n.js (locale helpers)
  layouts/     BaseLayout.astro               — <head> + theme/reveal scripts + chrome
  components/  Nav, Hero, Pillars, AuthorsPreview, ServersPreview,
               GalleryPreview, JoinCta, SectionHead, WorkRow, AuthorCard,
               ServerCard, ImageSlot, Icon, BrandMark
    pages/     HomePage, AuthorsPage, AuthorDetailPage, WorksPage,
               ServersPage, GalleryPage
  pages/       route files (zh at root, en under /en); robots.txt.ts
  styles/      global.css
public/        favicon.svg, images/
```

See `context.md` for the full architecture and data flow.

## Adding content

Content lives in **Astro Content Collections** — one YAML file per record,
validated at build time (a bad/missing field fails the build and names it).
See **`EDITING.md`** for the full "change X → edit file Y" guide.

- **Author** → add `src/content/authors/<id>.yaml`; the detail page
  (`/authors/<id>`) is generated automatically.
- **Work** → add `src/content/works/<id>.yaml`; `authorId` must match an
  author's filename.
- **Server** → add `src/content/servers/<id>.yaml`; **shot** → add
  `src/content/gallery/<id>.yaml`.
- **Real images** → drop in `public/images/`, then reference `/images/<file>`
  (work covers via each work's `cover` field; gallery shots via each shot's
  `cover`). Empty slots render a labelled placeholder.

## Notes

- Content is demo data ported from the design prototype (`footer`: “prototype
  demo only”). The community does not host mods; it links creators and curates
  resources — reflected throughout the copy.
- Consider adding `@astrojs/sitemap` for an auto `sitemap-index.xml`
  (already referenced by the generated `/robots.txt`, see `src/pages/robots.txt.ts`).
