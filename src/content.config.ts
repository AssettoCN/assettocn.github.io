import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TYPE } from './data/work-types.js';
import { SERVER_TYPE } from './data/server-types.js';

// 双语字段的通用 schema —— zh / en 都必须填,漏一个构建时会报错并指出文件。
const bilingual = z.object({ zh: z.string(), en: z.string() });
const bilingualList = z.object({ zh: z.array(z.string()), en: z.array(z.string()) });

// 作品分类的合法取值,直接取自 work-types.js,增删分类只改那一处。
const typeKeys = Object.keys(TYPE) as [string, ...string[]];
// 服务器分类的合法取值,取自 server-types.js。
const serverTypeKeys = Object.keys(SERVER_TYPE) as [string, ...string[]];

// 作者集合:src/content/authors/<id>.yaml —— 文件名即作者 id(详情页 URL)。
const authors = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/authors' }),
  schema: z.object({
    order: z.number().default(0),          // 列表显示顺序
    initials: z.string(),                  // 字母头像上的字
    tint: z.string(),                      // 字母头像底色(CSS 变量名)
    ink: z.string(),                       // 字母头像字色(CSS 变量名)
    avatar: z.string().optional(),         // 可选头像图 '/images/authors/xxx.jpg';留空用字母头像
    name: bilingual,
    handle: z.string(),
    dl: z.string().optional(),
    rating: z.string().optional(),
    skills: bilingualList,
    bio: bilingual,
    links: z
      .array(z.object({ label: z.string(), url: z.string().default('#') }))
      .default([]),
  }),
});

// 作品集合:src/content/works/<id>.yaml —— 文件名即作品 id。
const works = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/works' }),
  schema: z.object({
    order: z.number().default(0),
    authorId: z.string(),                  // 必须对应某个作者文件名
    type: z.enum(typeKeys),                // 工具/应用/教程/文档/资料
    version: z.string(),
    updated: z.string(),
    downloads: z.string().default('—'),
    rating: z.string().optional(),
    title: bilingual,
    desc: bilingual,
    cover: z.string().optional(),          // 封面图,填 '/images/xxx.jpg'
    link: z.string().optional(),           // 作品外链(B站/爱发电/网盘等),卡片显示「查看」按钮
  }),
});

// 服务器集合:src/content/servers/<id>.yaml
const servers = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/servers' }),
  schema: z.object({
    order: z.number().default(0),
    type: z.enum(serverTypeKeys),          // 围场/漂移/山路/漫游(见 server-types.js)
    name: bilingual,
    region: bilingual,
    mode: bilingual,                       // 细分玩法文案,自由文本
    max: z.number(),                       // 最大容量(静态,仅展示"最多 N 人")
    online: z.boolean().default(true),
    homepage: z.string().optional(),       // 介绍/主页(非接入地址),如 https://srp.udstu.com
    address: z.string().optional(),        // 实际接入地址 ip:port,如 120.26.18.63:8410
  }),
});

// 截图画廊集合:src/content/gallery/<id>.yaml
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/gallery' }),
  schema: z.object({
    order: z.number().default(0),
    ratio: z.string().default('4/3'),   // 卡片宽高比,如 '4/3' '1/1' '16/9'
    by: z.string(),                     // 投稿者(@handle)
    title: bilingual,
    cover: z.string().optional(),       // 截图,填 '/images/xxx.jpg'
  }),
});

export const collections = { authors, works, servers, gallery };
