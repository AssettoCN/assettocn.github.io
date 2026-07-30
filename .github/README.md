# `.github/` — 投稿自动化 / Submission automation

用 GitHub 当轻量后端,把「投稿」变成「提 Issue → 自动开 PR → 维护者合并上线」,
**零自建后端**。覆盖四类内容:

| 类型 | Issue 模板 | 生成 | 站内入口 |
|---|---|---|---|
| 截图 gallery | `ISSUE_TEMPLATE/gallery-submission.yml` | `src/content/gallery/<id>.yaml` + 下载图 | 截图页「投稿截图」 |
| 服务器 server | `ISSUE_TEMPLATE/server-submission.yml` | `src/content/servers/<id>.yaml` | 服务器页「申请收录」 |
| 作者 author | `ISSUE_TEMPLATE/author-submission.yml` | `src/content/authors/<id>.yaml` | 作者页「申请入驻」 |
| 作品 work | `ISSUE_TEMPLATE/work-submission.yml` | `src/content/works/<id>.yaml` + 可选封面 | 作品页「投稿作品」 |

## 流程

1. 访客在对应页面点投稿按钮 → 打开该类型的 GitHub Issue 表单,填字段
   (截图/封面直接拖进输入框上传)。
2. 提交后 issue 自动带上 `<kind>-submission` 标签 →
   触发 `workflows/content-submission.yml`。
3. 工作流按标签判断类型,跑 `scripts/issue-to-content.mjs`:解析表单、
   (gallery/work)下载图片进 `public/images/<dir>/`、生成内容 YAML。
4. `peter-evans/create-pull-request` 开 PR,并在原 issue 回帖 PR 链接。
5. 维护者**审核合并 = 通过**;网站按新内容重建,内容上线,原 issue 关闭。

一个脚本 + 一个工作流 + 每类一个表单;新增字段只改脚本里对应 kind 的 builder。

## 约定

- `id`:gallery/server/work = 英文标题(或名称)slug + issue 号(唯一,不会覆盖);
  author = handle 的 slug(作者 id 就是 `/authors/<id>` 的 URL,保持干净;若与已有
  作者重名,PR 会显示为「修改已有作者」并在标题标注 ⚠️,由维护者定夺)。
- `order` = `1000 + issue 号`,永远排在预置数据之后;维护者可在合并前改 PR 里的值。
- **作品必须挂在已收录的作者名下**:脚本会检查 `src/content/authors/<authorId>.yaml`
  是否存在,不存在则不开 PR、改为在 issue 里提示先投稿作者。
- 服务器收录默认 `online: true`、`players: 0`、`ping: '—'`;作者头像底色自动分配。
- 字段靠「表单标题里的关键词」匹配(如中文名需同时含「名称」和「中文」),
  改表单 label 时保留这些关键词即可。
- 图片下载失败时回退用远程链接,PR 仍会开。

## 启用前的设置(一次性)

1. **仓库 Settings → Actions → General → Workflow permissions**:勾选
   **“Allow GitHub Actions to create and approve pull requests”**,否则 Action 无权开 PR。
2. 在 `src/data/site.js` 把 `repo` 填成 `'owner/repo'`,四个投稿按钮才会指向 Issue 表单
   (留空则按钮保持普通占位状态)。
3. 投稿**强制需要 GitHub 账号**(拖图上传 / 提 issue 都要登录)——这是设计上的门槛。
