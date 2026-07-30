// 服务器分类 → 标签文案(中/英) + 标签样式类。
// content.config.ts 用这里的键做 servers 的 `type` 字段的合法取值校验;服务器页
// 顶部的筛选按钮、卡片上的分类徽标也都由它自动生成。增删分类只改这一处。
export const SERVER_TYPE = {
  circuit: { label: { zh: '围场', en: 'Circuit' }, tag: 'tag-accent' },
  drift:   { label: { zh: '漂移', en: 'Drift' },   tag: 'tag-accent-2' },
  touge:   { label: { zh: '山路', en: 'Touge' },   tag: 'tag-neutral' },
  cruise:  { label: { zh: '漫游', en: 'Cruise' },  tag: 'tag-accent-2' },
};
