import type { APIRoute } from 'astro';
import { SITE } from '../data/site.js';

// robots.txt generated from the single source of truth (SITE.url), so the
// domain never has to be edited in two places.
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap-index.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
