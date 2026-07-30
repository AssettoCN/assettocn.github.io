# AssettoCN — Architecture Overview (`context.md`)

Community site for **AssettoCN**, the Assetto Corsa Chinese community.
Built with **Astro** (static output) from a Claude Design `.dc.html` prototype
(`AssettoCN 主页.dc.html`). Bilingual (zh default / en), fully static, SEO-first,
with a **light/dark theme toggle**.

## Entry Points
- `npm run dev` — dev server (`astro dev`)
- `npm run build` — static build to `dist/` (**24 pages** + sitemap)
- `npm run preview` — serve the built `dist/`
- `astro.config.mjs` — site config + **i18n** (`zh` default at root, `en` under `/en`, `prefixDefaultLocale:false`)

## Routes (page → file)
| URL (zh) | URL (en) | File |
|---|---|---|
| `/` | `/en/` | `src/pages/index.astro`, `src/pages/en/index.astro` |
| `/authors` | `/en/authors` | `src/pages/authors/index.astro` (+ `en/`) |
| `/authors/:id` | `/en/authors/:id` | `src/pages/authors/[id].astro` (+ `en/`) — `getStaticPaths` over `authorIds()` |
| `/works` | `/en/works` | `src/pages/works/index.astro` (+ `en/`) |
| `/servers` | `/en/servers` | `src/pages/servers/index.astro` (+ `en/`) |
| `/gallery` | `/en/gallery` | `src/pages/gallery/index.astro` (+ `en/`) |

Each page file is a thin wrapper: it sets locale + SEO metadata and renders a
page-content component from `src/components/pages/`. The original prototype was a
single client-side SPA with a `page`/`authorId` state machine; that state is now
expressed as **real routes** for crawlability and shareable URLs.

## Home = single-page landing
The prototype's home is a scroll-snapping one-pager. It's reproduced as
`HomePage.astro`, which stacks six full-viewport bands:
1. **Hero** (`Hero.astro`) — poster wordmark **AssettoCN** (red `CN`), kicker,
   tagline + two CTAs, a **telemetry strip** of the `HOME.stats`, scroll hint.
   Purely typographic — the design dropped the old hero screenshot/brand image.
2. **01 · Mission** (`Pillars.astro`) — three numbered cards.
3. **02 · Authors** (`AuthorsPreview.astro`) — first 3 authors, links to `/authors`.
4. **03 · Servers** (`ServersPreview.astro`) — first 3 servers (capacity bars),
   links to `/servers`.
5. **04 · Gallery** (`GalleryPreview.astro`) — first 5 shots, links to `/gallery`.
6. **05 · Join** (`JoinCta.astro`) — gradient panel + quick links (servers,
   gallery, docs, wiki).
Sections 02–04 share `SectionHead.astro` (index + eyebrow + title + "more →").
Scroll-snap is enabled only on the home route via `snap` → `data-snap` on `<html>`.

## Module Architecture
- `src/layouts/BaseLayout.astro` — `<head>` (title, description, canonical,
  `hreflang` alternates, OG tags, favicon) + `Nav` + `<slot>` + `Footer`.
  Also hosts two `is:inline` scripts: a **no-flash theme** script in `<head>`
  (sets `data-theme` + adds `.js` before paint) and a **scroll-reveal**
  `IntersectionObserver` at end of `<body>` (`[data-reveal]` → `.is-in`).
  Props: `lang`, `section`, `path` (canonical/locale-agnostic), `title`,
  `description`, `snap`.
- `src/components/pages/` — one component per route: `HomePage`, `AuthorsPage`,
  `AuthorDetailPage`, `WorksPage`, `ServersPage`, `GalleryPage`.
- `src/components/` — presentational building blocks:
  - `Nav.astro` — sticky bar; 5 links + **theme toggle** (`data-theme-toggle`,
    inline script flips `data-theme` + persists to `localStorage['acn-theme']`)
    + language toggle **link** to the same page in the other locale.
  - `Hero.astro` — poster home hero + telemetry strip (reads `HOME.stats`).
  - `Pillars`, `AuthorsPreview`, `ServersPreview`, `GalleryPreview`, `JoinCta`,
    `SectionHead` — the home landing bands (see above).
  - `WorkRow.astro` — horizontal work card; carries `data-type` for filtering.
  - `AuthorCard.astro` — author card; `preview` prop = home variant (no footer).
  - `ServerCard.astro` — server card w/ status dot + capacity bar; `preview`
    prop hides the connect button (home preview vs. full `/servers`).
  - `ImageSlot.astro` — styled placeholder when empty, real `<img>` when `src` set.
  - `Icon.astro` — inline SVG icon set (incl. `sun`/`moon` for the toggle).
  - `BrandMark.astro` — the real 4-polygon AssettoCN logo (two-tone: ink + AC red).

## Data Flow
1. **Content** (authors, works, servers, gallery) lives in **Astro Content
   Collections**: one YAML file per record under `src/content/{authors,works,
   servers,gallery}/*.yaml`. The filename is the entry `id` (and, for authors,
   the URL slug). Schemas in `src/content.config.ts` (Zod) validate every field
   at build time — a missing/mistyped field fails the build and names the file +
   field. Bilingual fields are `{ zh, en }` objects. Because collection order
   isn't guaranteed, every schema has an `order` field used for sorting.
2. **Config / copy** stays in `src/data/`: `ui.js` (all UI strings + footer),
   `home.js` (home telemetry `stats`, bilingual), `site.js` (domain),
   `work-types.js` (`TYPE` = category labels + tag classes; also the source of
   the `type` enum in the works schema).
3. `src/lib/content.js` **resolves** collection entries for a given `lang` into
   render-ready objects: `getAuthors`, `getAuthor`, `getWorks`, `worksByAuthor`,
   `authorIds`, `getServers` (computes `statusColor`/`pct`/labels/`btnCls`),
   `getGallery`, `workFilters`, `avatarCss`. Most are **async** (`getCollection`).
4. `src/lib/i18n.js` — locale helpers (`LOCALES`, `DEFAULT_LOCALE`,
   `localizePath`, `otherLocale`, `ROUTES` incl. `servers`/`gallery`).
5. Page files `await` the resolvers at build time; components receive plain
   objects. `getStaticPaths` for author detail pages awaits `authorIds()`.

## Configuration
- `src/content.config.ts` — Content Collections + Zod schemas for `authors`,
  `works`, `servers`, `gallery` (loaded via the `glob` loader). Build-time
  validation lives here.
- `src/data/work-types.js` — `TYPE` map; its keys are the `type` enum used by the
  works schema and the works-page filter.
- `src/data/site.js` — **single source** for the site `url` (domain).
  `astro.config.mjs` and the `robots.txt` endpoint both import `SITE.url`.
- `src/data/home.js` — home telemetry `stats` (bilingual). No hero image config
  anymore — the redesigned hero is text-only.
- `astro.config.mjs` — `site: SITE.url` (absolute canonical/OG/hreflang) + i18n
  + the **`@astrojs/sitemap`** integration (with an `i18n` map `zh→zh-Hans`,
  `en→en`) that emits `sitemap-index.xml` + `sitemap-0.xml` with per-URL hreflang.
- `src/pages/robots.txt.ts` — generates `/robots.txt` from `SITE.url` (its
  `Sitemap:` line points at the sitemap the integration above produces).
- `src/styles/global.css` — the single stylesheet, layered like the prototype:
  (1) Organic tokens → (2) **Assetto Corsa retheme** (white ground, near-black
  ink, `#e2001a` red) → **(2b) dark theme** under `html[data-theme='dark']` →
  (3) Organic component classes. Also holds the shared home-section scaffolding
  (`.home-sec`, `.home-inner`), the scroll-snap hook (`html[data-snap]`), and the
  reveal states (`.js [data-reveal]`). Component layout lives in scoped `<style>`.

## Core Logic Notes
- **Theming**: light is the default (`:root`); dark overrides the color tokens
  under `html[data-theme='dark']`. The `<head>` script applies the saved/system
  theme before first paint (no flash); the Nav button flips + persists it.
- **Official content**: `OFFICIAL_ID = 'acn'` in `lib/content.js`. The author
  `acn` (`src/content/authors/acn.yaml`) is the official publisher; any author or
  work with that id gets an "official" badge + logo avatar, and official works
  are pinned to the top of `/works`. Public work submissions are blocked from
  using `authorId: acn`.
- **Missing images**: `ImageSlot` renders a real `<img>` when `cover` is set,
  else a deterministic **generative cover** — a tinted block (avatar palette,
  theme-aware) with a big monogram + label, seeded by the title. So cover-less
  works/shots read as intentional varied cards, never broken images. Author
  avatars are always generated monograms (or the logo, for official), never
  photos.
- **i18n without duplication**: page bodies live in shared `pages/` components;
  only thin per-locale route files differ. `path` is always the canonical
  (no-`/en`) path so `hreflang` + the language toggle resolve both locales.
- **Works filter** (`WorksPage.astro`): all works are server-rendered (SEO +
  no-JS fallback); a small inline script toggles visibility by `data-type`.
- **Progressive enhancement**: scroll-snap, reveal animations and the theme
  toggle all no-op gracefully without JS (content stays visible; reduced-motion
  disables snap + reveal).
- **Responsive**: the prototype was a fixed canvas; breakpoints collapse the
  hero/grids and stack rows for real devices.

## Submission automation (`.github/`)
Content submissions use GitHub as a zero-backend pipeline for **four kinds**
(gallery / server / author / work). Each has an **Issue Form**
(`.github/ISSUE_TEMPLATE/<kind>-submission.yml`); one **workflow**
(`.github/workflows/content-submission.yml`) dispatches by label to a single
generic script (`.github/scripts/issue-to-content.mjs`) that parses the issue,
downloads any image (gallery/work) into `public/images/<dir>/`, writes the
`src/content/<dir>/<id>.yaml`, and opens a PR via `peter-evans/create-pull-request`.
Merging the PR is the moderation step. Works are validated against existing
authors. Each list page's submit/apply button links to its form when `SITE.repo`
is set (`issueFormUrl()` in `src/data/site.js`). See `.github/README.md` for setup.

## Adding / Editing Content
See **`EDITING.md`** for the full "change X → edit file Y" table. In short:
- New author → `src/content/authors/<id>.yaml` (detail page auto-generated).
- New work → `src/content/works/<id>.yaml` (`authorId` must match an author file).
- New server → `src/content/servers/<id>.yaml`; new shot → `src/content/gallery/<id>.yaml`.
- UI strings / footer → `src/data/ui.js`. Home stats → `src/data/home.js`.
- Domain → `src/data/site.js`. Theme colors → `src/styles/global.css`.
