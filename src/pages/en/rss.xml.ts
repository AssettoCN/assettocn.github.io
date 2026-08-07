import type { APIRoute } from 'astro';
import { buildFeed } from '../../lib/feed.js';

export const GET: APIRoute = async () =>
  new Response(await buildFeed('en'), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
