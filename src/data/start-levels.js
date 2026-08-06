// 入门闯关每一关的难度(1–3 颗点)与预计用时(分钟),按指南 slug 关联。
// 新增一篇入门指南时在这里补一行;缺省为难度 1 / 10 分钟。改这一处即可,与正文无关。
export const LEVEL_META = {
  'install-game':        { difficulty: 1, minutes: 15 },
  'content-manager-csp': { difficulty: 2, minutes: 20 },
  'install-mods':        { difficulty: 2, minutes: 15 },
  'join-servers':        { difficulty: 1, minutes: 10 },
  'wheel-setup':         { difficulty: 2, minutes: 15 },
  'faq':                 { difficulty: 1, minutes: 8 },
};

export const levelMeta = (slug) => LEVEL_META[slug] || { difficulty: 1, minutes: 10 };
