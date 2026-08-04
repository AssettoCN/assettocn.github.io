// 作者外链平台清单 —— 单一事实来源(schema 校验 / 图标 / 显示名 / 投稿识别都取这里)。
// 增删平台只改这一处:key 会进 content.config.ts 的 platform 枚举,icon 对应
// src/components/Icon.astro 里的图标名,match 是投稿时按域名自动识别平台用的正则。
// 作者只填自己有的平台,作者页只渲染填了的那几个,所以这里多留几个没坏处。
export const LINK_PLATFORM = {
  bilibili: { label: { zh: 'Bilibili',    en: 'Bilibili'    }, icon: 'bilibili', match: [/bilibili\.com/, /b23\.tv/] },
  afdian:   { label: { zh: '爱发电',       en: 'Afdian'      }, icon: 'heart',    match: [/afdian\.(com|net)/] },
  weibo:    { label: { zh: '微博',         en: 'Weibo'       }, icon: 'chat',     match: [/weibo\.(com|cn)/] },
  qq:       { label: { zh: 'QQ 群',        en: 'QQ Group'    }, icon: 'qq',       match: [/qq\.com/] },
  youtube:  { label: { zh: 'YouTube',      en: 'YouTube'     }, icon: 'youtube',  match: [/youtube\.com/, /youtu\.be/] },
  patreon:  { label: { zh: 'Patreon',      en: 'Patreon'     }, icon: 'patreon',  match: [/patreon\.com/] },
  x:        { label: { zh: 'X (Twitter)',  en: 'X (Twitter)' }, icon: 'x',        match: [/twitter\.com/, /x\.com/] },
  discord:  { label: { zh: 'Discord',      en: 'Discord'     }, icon: 'discord',  match: [/discord\.(gg|com)/] },
  github:   { label: { zh: 'GitHub',       en: 'GitHub'      }, icon: 'github',   match: [/github\.com/] },
  website:  { label: { zh: '个人主页',     en: 'Website'     }, icon: 'globe',    match: [] },
  other:    { label: { zh: '链接',         en: 'Link'        }, icon: 'external', match: [] },
};

/** URL → platform key,按域名识别;识别不到返回 'other'。 */
export function platformFromUrl(url) {
  const u = String(url || '');
  for (const [key, p] of Object.entries(LINK_PLATFORM)) {
    if (p.match.some((re) => re.test(u))) return key;
  }
  return 'other';
}
