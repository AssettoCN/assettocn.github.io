# src/content/gallery/

社区截图投稿落在这里,一张图一个 `<id>.yaml`。字段定义见 `src/content.config.ts` 的
`gallery` 集合。通常不用手写:在站上点「投稿截图」→ 走 `.github/ISSUE_TEMPLATE/
gallery-submission.yml` 表单 → Action 自动在这里生成 yaml 并开 PR,合并即上线。

手写的话长这样:

```yaml
order: 1
ratio: '1600/900'        # 卡片宽高比,masonry 靠它排版;写实际像素最省事
by: 'sql'                # 作者;不详就留空字符串
title:
  zh: 纽北日落
  en: Sunset at the Ring
cover: '/images/gallery/nordschleife-sunset.jpg'
car: 'Porsche 911 GT3 RS'          # 以下三项可选,都参与画廊页搜索框的匹配
track: 'Shutoko Revival Project'
ppfilter: 'C13'
```

`car` / `track` / `ppfilter` 是专有名词,中英一致,所以**不做双语**——只有 `title`
是双语的。三项都会拼进 `search` 字段(见 `lib/content.js` 的 `getGallery`),画廊页
的筛选框按它做纯前端匹配。

**图片先压再进仓库。** 原图动辄几 MB 甚至十几 MB,而画廊卡最宽也就 ~500px。走投稿
流水线的会被 `scripts/optimize-images.mjs` 自动收口(gallery 预算 1600px / 500KB);
手动加的话自己跑一遍那个脚本。

这个目录空着也不会构建失败——列表页会显示空状态,首页的截图板块整段不渲染
(见 `src/components/pages/HomePage.astro`)。

> 本文件是 Markdown,不匹配集合的 `**/*.yaml`,所以不会被当成一条内容。
