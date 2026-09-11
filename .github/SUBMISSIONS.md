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
   触发 `workflows/content-submission.yml`(只处理**开着的** issue;合并关闭后再编辑不会重跑)。
3. 工作流按标签判断类型,跑 `scripts/issue-to-content.mjs`:解析表单、
   (gallery/work)下载图片进 `public/images/<dir>/`、生成内容 YAML。
4. 仓库根目录的 `scripts/optimize-images.mjs` 压图,本目录的 `scripts/pr-body.mjs` 写 PR 描述:字段表、图片预览,
   以及自动检查出的问题(标签像一句话没拆开、纯文本外链、压完仍超预算的图、待核实身份)。
5. `peter-evans/create-pull-request` 开 PR,在原 issue 回帖 PR 链接(结果和上一条回帖相同就不再重复发);
   issue 标题还是表单默认的「[Work] 」之类时,改成解析出的名称。
6. 维护者**审核合并 = 通过**(squash,一条投稿在 main 上只留一个提交,分支自动删除);
   网站按新内容重建,内容上线,原 issue 关闭。

一个脚本 + 一个工作流 + 每类一个表单;新增字段只改脚本里对应 kind 的 builder。

## 约定

- `id`:gallery/server/work = 英文标题(或名称)slug + issue 号(唯一,不会覆盖);
  author = handle 的 slug(作者 id 就是 `/authors/<id>` 的 URL,保持干净;与已有作者
  同名即为更新该作者)。
- `order` = `1000 + issue 号`,永远排在预置数据之后;维护者可在合并前改 PR 里的值。
  更新已有作者时沿用它原来的 `order` 和 `tint` / `ink`。
- **账号归属 `owners`**:作者和作品 YAML 里记着投稿人的 GitHub 账号(页面上不显示)。
  - 更新已有作者:投稿账号在该作者 `owners` 里才算已核实;否则照开 PR,但标题标 ⚠️、
    打 `needs-verification` 标签、PR 描述写明原因。维护者确认是本人再合并,合并后该账号
    会加入 `owners`。
  - 投稿作品:投稿账号不在所挂作者的 `owners` 里同样标待核实;确认后如需关联,手动把账号
    加进作者的 `owners`。
  - 组织成员(维护者)代人投稿不标待核实,也不会被记进 `owners`。
  - `owners` 为空(维护者手工收录的作者)= 任何人来改都要核实。
- **作品必须挂在已收录的作者名下**:脚本会检查 `src/content/authors/<authorId>.yaml`
  是否存在,不存在则不开 PR、改为在 issue 里提示先投稿作者。
- 服务器收录默认 `online: true`;作者头像底色自动分配。
- 截图的 `ratio` 按图片实际宽高自动算(约成最简比,如 `16/9`),不让投稿者选:画廊卡片按它定高、
  图片 `object-fit: cover`,比例不对会被裁。`car` / `track` / `ppfilter` 选填,都参与画廊搜索。
- 字段靠「表单标题里的关键词」匹配(如中文名需同时含「名称」和「中文」),
  改表单 label 时保留这些关键词即可。
- 图片只收 GitHub 附件(`github.com/user-attachments/…`),按文件头只放行 PNG / JPG / WebP、
  最大 10MB;外站链接、其他格式或下载失败都不开 PR,改为在 issue 里提示重新上传。

## 启用前的设置(一次性)

1. **先建这 4 个标签**(名字必须一模一样):`gallery-submission`、`server-submission`、
   `author-submission`、`work-submission`。**GitHub 不会自动创建**表单里不存在的标签,
   缺了标签,表单开的 issue 不会被打标 → 工作流 `if` 不匹配 → 整个 run 显示 **Skipped**。
   ```bash
   gh label create gallery-submission -c FFB000
   gh label create server-submission  -c 00A0FF
   gh label create author-submission  -c 8B5CF6
   gh label create work-submission    -c 22C55E
   gh label create needs-verification -c D93F0B -d "投稿账号与作者归属不符,合并前需核实身份"
   ```
   (或网页:Issues → Labels → New label。)标签建好后,**新**从表单开的 issue 会
   自动带标签;要对某个 issue 重新触发,**编辑一下该 issue**(工作流监听 `edited`)。
2. **允许 Action 开 PR**:仓库 Settings → Actions → General → Workflow permissions,勾选
   **“Allow GitHub Actions to create and approve pull requests”**,否则 Action 无权开 PR。
   > 若此项**灰色不可勾**,是被**组织**策略锁住了:去 Organization → Settings → Actions →
   > General 里开(需组织 Owner)。或改用 PAT / GitHub App token 传给 create-pull-request 绕过。
3. **合并方式**:Settings → General → Pull Requests 里取消「Allow merge commits」、保留 squash
   (和 rebase),并勾选「Automatically delete head branches」。bot 的 PR 只有一个提交,squash 后
   main 上的提交信息就是 `work: add <id> (closes #N) (#PR)`,已合并的 `submission/*` 分支自动删掉。
   ```bash
   gh api -X PATCH repos/AssettoCN/assettocn.github.io -F allow_merge_commit=false -F delete_branch_on_merge=true
   ```
4. `src/data/site.js` 的 `repo` 需填成 `'owner/repo'`(本仓库已填
   `AssettoCN/assettocn.github.io`),四个投稿按钮才会指向 Issue 表单;留空则按钮保持占位状态。
5. 投稿**强制需要 GitHub 账号**(拖图上传 / 提 issue 都要登录)——这是设计上的门槛。
