// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/data/site.js';

import sitemap from '@astrojs/sitemap';

// AssettoCN — community site. Chinese is the default locale (served at the
// site root, no prefix); English is served under /en. This gives both
// languages real, crawlable URLs instead of a client-only toggle.
// The domain lives in one place: src/data/site.js (SITE.url).
export default defineConfig({
  site: SITE.url,

  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // sitemap:自动生成 sitemap-index.xml + 分片(robots.txt 已引用)。
  // i18n 选项让每个 URL 在 sitemap 里也带上中英 hreflang 对应,语言代码
  // 与页面 <head> 里的 alternate 保持一致(zh → zh-Hans,en → en)。
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-Hans',
          en: 'en',
        },
      },
    }),
  ],
});