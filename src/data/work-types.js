// 作品分类 → 标签文案(中/英) + 标签样式类。
// content.config.ts 用这里的键做 `type` 字段的合法取值校验;作品页顶部的
// 筛选按钮也由它自动生成。增删分类只改这一处。
export const TYPE = {
  vehicle: { label: { zh: '车辆', en: 'Vehicle' }, tag: 'tag-accent' },
  map:     { label: { zh: '地图', en: 'Map' },     tag: 'tag-accent-2' },
  tool:    { label: { zh: '工具', en: 'Tool' },     tag: 'tag-accent' },
  app:     { label: { zh: '应用', en: 'App' },      tag: 'tag-neutral' },
  guide:   { label: { zh: '教程', en: 'Guide' },    tag: 'tag-accent-2' },
  doc:     { label: { zh: '文档', en: 'Docs' },     tag: 'tag-accent-2' },
  data:    { label: { zh: '资料', en: 'Resource' }, tag: 'tag-neutral' },
};
