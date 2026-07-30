// ┌─────────────────────────────────────────────────────────────────────────┐
// │ 站点级配置 —— 全站通用设置。首页专属的 Hero 图 / 统计数字见 home.js。       │
// └─────────────────────────────────────────────────────────────────────────┘
export const SITE = {
  // 正式域名。astro.config.mjs 的 site、robots.txt、以及每个页面的
  // canonical / hreflang / Open Graph 链接都会自动读取这里。
  // 组织站 assettocn.github.io 发布在根路径。将来上自定义域名只改这一行
  // (再加 public/CNAME),repo 不用动。
  url: 'https://assettocn.github.io',

  // GitHub 仓库(格式 'owner/repo')。填了之后,各列表页的投稿按钮会跳到
  // GitHub Issue 表单(见 .github/ISSUE_TEMPLATE/*.yml),投稿经 Action 自动
  // 转成待审核的 PR。留空则按钮保持普通占位状态。
  repo: 'AssettoCN/assettocn.github.io',
};

/** GitHub「新建 issue(用某个模板)」链接;未配置 repo 时返回 null。 */
export function issueFormUrl(template) {
  return SITE.repo ? `https://github.com/${SITE.repo}/issues/new?template=${template}` : null;
}
