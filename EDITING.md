# 编辑指南 · 改哪里对应哪个文件

数据分两类:

- **内容(作者 / 作品)** → `src/content/` 下,**一条一个 YAML 文件**,带字段校验。
- **配置 / 界面文案** → `src/data/` 下的几个文件。

改完运行 `npm run dev` 实时预览,或 `npm run build` 生成 `dist/`。
**写错或漏字段会在构建时直接报错,并指出是哪个文件、哪个字段**(例如:
`works → xxx data does not match schema. title.en: Required`),不会悄悄出错。

## 速查表

| 我想改… | 改这里 |
|---|---|
| **某个作者(名字/简介/技能/外链/头像色)** | `src/content/authors/<id>.yaml`(一人一个文件) |
| **新增作者** | 在 `src/content/authors/` 新建一个 `.yaml`,文件名就是作者 id(也是详情页 URL);详情页自动生成 |
| **作者外链地址** | 该作者 yaml 里 `links` 的 `url`(把 `'#'` 换成真链接,填了会自动新开标签页) |
| **某个作品(标题/类型/版本/下载量/评分/描述)** | `src/content/works/<id>.yaml`(一件一个文件) |
| **新增作品** | 在 `src/content/works/` 新建一个 `.yaml`;`authorId` 要等于某个作者的文件名 |
| **官方出品(ACN 自己的作品)** | 把该作品的 `authorId` 设为 `acn`(官方作者见 `src/content/authors/acn.yaml`)——自动加红色「官方」徽标、Logo 头像,并在作品页置顶。官方作品只由维护者直接加 yaml,不走公开投稿 |
| **作品封面图** | 该作品 yaml 里加 `cover: '/images/xxx.jpg'`(图片放 `public/images/`) |
| **作品分类(工具/应用/教程/文档/资料)** | `src/data/work-types.js`(改这里会同步影响 schema 校验和作品页筛选按钮) |
| **某个服务器(名称/区域/模式/人数/延迟/在线)** | `src/content/servers/<id>.yaml`(一台一个文件;`online:false` 会显示离线并禁用接入按钮) |
| **新增服务器** | 在 `src/content/servers/` 新建一个 `.yaml` |
| **某张截图(标题/投稿人/比例/图片)** | `src/content/gallery/<id>.yaml`(`ratio` 如 `'16/9'`,`cover` 可选) |
| **新增截图** | 在 `src/content/gallery/` 新建一个 `.yaml` |
| **界面文案(导航/首页各板块/按钮/页脚,中+英)** | `src/data/ui.js` |
| **首页 Hero 下方的统计条(现为 5 个)** | `src/data/home.js` → `stats`(中/英各一份,`n`=数字 `l`=说明,增删个数两语言保持一致)。新版 Hero 是纯文字海报式,不再有大图配置 |
| **域名** | `src/data/site.js` → `url`(一处生效:astro 配置、robots、canonical/hreflang) |
| **主题色 / 品牌红 / 字体 / 深色主题** | `src/styles/global.css`(浅色见第 2 段「AC retheme」;深色见第 2b 段 `html[data-theme='dark']`) |

## 新增一个作者(示例)

新建 `src/content/authors/newbie.yaml`:

```yaml
order: 7                       # 列表里的排序
initials: 新                    # 头像上的字
tint: '--color-accent-300'     # 头像底色(用 global.css 里的颜色变量名)
ink:  '--color-accent-900'     # 头像字色
name:   { zh: 新人, en: Newbie }
handle: '@newbie'
skills:
  zh: [建模, 贴图]
  en: [Modeling, Texturing]
bio:
  zh: >-
    这里写中文简介,可以很长,会自动折行。
  en: >-
    English bio goes here.
links:
  - { label: GitHub, url: 'https://github.com/...' }
```

保存后 `/authors/newbie` 详情页会自动出现。**中英双语字段(name/skills/bio)两种语言都要填**,漏了构建会报错。

## 新增一个作品(示例)

新建 `src/content/works/my-tool.yaml`:

```yaml
order: 10
authorId: newbie              # 必须等于某个作者的文件名
type: tool                    # tool | app | guide | doc | data
version: 'v1.0'
updated: '2026-08'
downloads: '1.2k'             # 没有就填 '—'
rating: '4.8'
title: { zh: 我的工具, en: My Tool }
desc:
  zh: >-
    工具的中文说明。
  en: >-
    English description.
# cover: '/images/my-tool.jpg'   # 可选:作品封面
```

## 加图片的固定套路

1. 图片丢进 `public/images/`(例如 `my-tool.jpg`、`shot1.jpg`)。
2. 在数据里引用为 `/images/文件名`:作品封面 → 对应作品 yaml 的 `cover`;
   截图 → 对应 `src/content/gallery/<id>.yaml` 的 `cover`。
3. 没填图的地方显示占位框(带提示文字),不影响构建。

## 深色主题

网站支持浅色 / 深色两套主题,导航栏有一个太阳/月亮切换按钮。首次访问按系统
偏好自动选择,之后记住在浏览器本地(`localStorage` 的 `acn-theme`)。两套配色都在
`src/styles/global.css`:浅色是第 2 段「AC retheme」,深色是第 2b 段
`html[data-theme='dark']`,改颜色改这两处即可。

## 投稿自动化(GitHub Issue → 自动 PR)

截图 / 服务器 / 作者 / 作品四类内容都能让访客通过 GitHub 投稿:在对应页面点投稿按钮
→ 填一个 Issue 表单 → GitHub Action 自动转成对应的 `src/content/**/<id>.yaml`
(截图/作品还会下载图片),并开一个待审核 PR,你合并即上线。启用只需在
`src/data/site.js` 填 `repo: 'owner/repo'`,并在仓库设置里允许 Actions 创建 PR。
投稿强制需要 GitHub 账号。细节见 **`.github/README.md`**。

## 双语约定

- 中文是默认语言,在根路径(`/`、`/authors`、`/works`);英文在 `/en` 下。
- 凡是 `{ zh: …, en: … }` 结构的字段,两种语言都要填;右上角"EN/中"按钮
  在两种语言的同一页面间跳转。

## 关于 Twilio 短信

`README` 里提到的 Twilio 短信**跟本网站无关**,是你全局 CLAUDE.md 配置里的
"任务完成给手机发短信提醒"协议。本环境的 Twilio 凭据是占位符,会失败,可忽略,
或填真实凭据 / 从全局配置删掉那段。
