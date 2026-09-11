// public/images/ 下每个目录的图片预算。scripts/optimize-images.mjs 按它压图,
// .github/scripts/pr-body.mjs 在投稿 PR 里标出压完仍超预算的图。
// maxPx 是长边上限,maxKB 是「超过就值得重编码」的软阈值
// (尺寸已达标但文件仍然过大的图 —— 通常是质量拉满导出的 —— 也会被处理)。
export const BUDGET = {
  authors: { maxPx: 400, maxKB: 60 },   // 头像最大渲染 104px;400 已是现有约定的 2x+
  gallery: { maxPx: 1600, maxKB: 500 }, // 截图会被点开看,留足分辨率
  works: { maxPx: 1200, maxKB: 300 },   // 作品封面只做卡片图
  guides: { maxPx: 1200, maxKB: 250 },  // 指南配图是界面截图,正文栏最宽 ~720px
};
