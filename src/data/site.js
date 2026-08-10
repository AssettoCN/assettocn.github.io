// ┌─────────────────────────────────────────────────────────────────────────┐
// │ 站点级配置 —— 全站通用设置。首页统计数字现由真实收录数动态生成            │
// │ (见 lib/content.js 的 getHomeStats),不再有 home.js 里的手填数字。          │
// └─────────────────────────────────────────────────────────────────────────┘
export const SITE = {
  // 正式域名。astro.config.mjs 的 site、robots.txt、以及每个页面的
  // canonical / hreflang / Open Graph 链接都会自动读取这里。
  //
  // **必须是自定义域名 assetto.cn,不能写 assettocn.github.io。** 仓库虽然是组织站
  // (发布在根路径),但 Pages 已绑了自定义域名,github.io 那个地址现在**永久 301**
  // 跳到 assetto.cn —— 而 301 那一跳**不带** Access-Control-Allow-Origin。凡是以
  // CORS 方式取本站资源的第三方都会在跳转处失败,而不是跟着跳过去:
  //   - giscus 自定义主题(文档要求 ACAO)→ 主题取不到 → 评论区退化成全白
  //   - 部分社交抓取器不跟跳转 → og:image 分享无图
  // 换域名只改这一行(并同步 public/CNAME),repo 字段不用动(那是仓库名)。
  url: 'https://assetto.cn',

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

  // 搜索引擎站长验证串(全部可选,留空即不在 <head> 输出对应 meta,和 giscus 同套路)。
  // 到各站长平台添加 https://assetto.cn 后,选「HTML 标签」验证方式,把给的串填这里:
  //   baidu → <meta name="baidu-site-verification">(百度站长平台;国内受众优先做这个)
  //   bing  → <meta name="msvalidate.01">(Bing Webmaster Tools)
  // 验证通过后到平台里提交 sitemap 地址:https://assetto.cn/sitemap-index.xml
  verify: {
    baidu: '',
    bing: '',
  },

  // 访问统计(两个都可选、都是纯前端 snippet、留空不加载任何脚本、不拖构建)。
  //   ga4         → Google Analytics 4 测量 ID(形如 G-XXXXXXXXXX)。
  //                 ⚠ GA 在大陆被墙,只统计得到海外/翻墙访客,国内主力量它看不到 ——
  //                 所以必须再配一个国内的兜住主力受众。
  //   baiduTongji → 百度统计的站点 hash(即 hm.js? 后面那串),国内可达、零后端。
  analytics: {
    ga4: '',
    baiduTongji: '9928ca51458f3dac4d963412c2518095',
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
