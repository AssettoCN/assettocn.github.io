import type { APIRoute } from 'astro';
import { buildFeed } from '../lib/feed.js';

// 中文 feed。英文在 src/pages/en/rss.xml.ts,两边共用 lib/feed.js。
export const GET: APIRoute = async () =>
  new Response(await buildFeed('zh'), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
