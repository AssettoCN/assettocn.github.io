// ┌─────────────────────────────────────────────────────────────────────────┐
// │ 站点级配置 —— 全站通用设置。首页统计数字现由真实收录数动态生成            │
// │ (见 lib/content.js 的 getHomeStats),不再有 home.js 里的手填数字。          │
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

  // 源码分支(「在 GitHub 上编辑此页」链接指向的分支)。默认主分支 main。
  branch: 'main',

  // 开发文档站(唯一跨站外链)。顶栏「文档 ↗」与页脚「文档中心」都读这里,
  // 将来文档收归 assetto.cn 子路径/子域时只改这一行。
  docsUrl: 'https://docs.assetto.cn',

  // 社区讨论区(GitHub Discussions)。页脚「动态交流」指向这里。链接确定,但**需先在
  // 仓库 Settings 里开启 Discussions** 才可访问(见 EDITING.md「启用评论」同一步)。
  discussionsUrl: 'https://github.com/AssettoCN/assettocn.github.io/discussions',

  // 社区外链单一来源(页脚「关注」和关于页共用,改一处即可)。
  social: {
    bilibili: 'https://space.bilibili.com/3833596',
    qqGroup: 'https://qm.qq.com/q/IAxQOpCGYM',
    github: 'https://github.com/AssettoCN',
  },

  // 评论(giscus,由 GitHub Discussions 驱动)。**repoId / categoryId 留空 = 整站不显示
  // 评论**:不渲染组件、不加载任何外部脚本、不影响构建。启用步骤见 EDITING.md
  // (仓库开 Discussions → 安装 giscus app → 建一个分类如 Comments → 到 giscus.app
  //  填入本仓库拿到 repo-id / category-id 贴到下面)。
  giscus: {
    repo: 'AssettoCN/assettocn.github.io',
    repoId: 'R_kgDOSAqXxw',
    category: 'Comments',
    categoryId: 'DIC_kwDOSAqXx84DCoqj',
  },
};

/** GitHub「新建 issue(用某个模板)」链接;未配置 repo 时返回 null。 */
export function issueFormUrl(template) {
  return SITE.repo ? `https://github.com/${SITE.repo}/issues/new?template=${template}` : null;
}

/** GitHub「在网页编辑器打开某个文件」链接(改完自动 fork + 开 PR,无写权限也能提);
 *  repoPath 为仓库内相对路径,如 'src/content/guides/zh/faq.md'。未配置 repo 时返回 null。 */
export function editUrl(repoPath) {
  return SITE.repo ? `https://github.com/${SITE.repo}/edit/${SITE.branch || 'main'}/${repoPath}` : null;
}
