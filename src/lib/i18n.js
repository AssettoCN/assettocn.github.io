// Locale helpers. Chinese ('zh') is the default locale and lives at the site
// root; English ('en') lives under /en (see astro.config.mjs i18n settings).
export const LOCALES = /** @type {const} */ (['zh', 'en']);
export const DEFAULT_LOCALE = 'zh';

/** The opposite locale — used by the language toggle. */
export function otherLocale(lang) {
  return lang === 'zh' ? 'en' : 'zh';
}

/**
 * Turn a locale-agnostic canonical path (always starting with '/') into the
 * real URL for a given locale. zh keeps the bare path; en is prefixed with /en.
 *   localizePath('zh', '/authors')  -> '/authors'
 *   localizePath('en', '/authors')  -> '/en/authors'
 *   localizePath('en', '/')         -> '/en/'
 */
export function localizePath(lang, canonical) {
  if (lang === 'zh') return canonical;
  return canonical === '/' ? '/en/' : '/en' + canonical;
}

/** Canonical (locale-agnostic) paths for each route. */
export const ROUTES = {
  home: '/',
  start: '/start',
  tutorials: '/tutorials',
  authors: '/authors',
  works: '/works',
  servers: '/servers',
  gallery: '/gallery',
  about: '/about',
  author: (id) => `/authors/${id}`,
};
