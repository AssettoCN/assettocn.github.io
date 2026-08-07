# src/content/gallery/

社区截图投稿落在这里,一张图一个 `<id>.yaml`。字段定义见 `src/content.config.ts` 的
`gallery` 集合。通常不用手写:在站上点「投稿截图」→ 走 `.github/ISSUE_TEMPLATE/
gallery-submission.yml` 表单 → Action 自动在这里生成 yaml 并开 PR,合并即上线。

手写的话长这样:

```yaml
order: 1
ratio: '16/9'            # 卡片宽高比,masonry 靠它排版
by: '@某人'
title:
  zh: 纽北日落
  en: Sunset at the Ring
cover: '/images/shots/nordschleife-sunset.jpg'
```

这个目录空着也不会构建失败——列表页会显示空状态,首页的截图板块整段不渲染
(见 `src/components/pages/HomePage.astro`)。构建时 Astro 会提示这个集合为空
(`[WARN] No files found matching "**/*.yaml"`),属实,收到第一条投稿就没了。
但这个 README 要留着:目录本身不存在时警告会更难看(`base directory does not exist`)。

> 本文件是 Markdown,不匹配集合的 `**/*.yaml`,所以不会被当成一条内容。
