# public/images/

把网站用到的图片放在这个文件夹里,然后在数据文件里按 `/images/文件名` 引用:

- **作品封面** → 对应 `src/content/works/<id>.yaml` 里加 `cover: '/images/pack.jpg'`
- **截图画廊** → 对应 `src/content/gallery/<id>.yaml` 里加 `cover: '/images/shot1.jpg'`

放在 `public/` 下的文件会原样发布到网站根路径(`public/images/shot1.jpg` → `/images/shot1.jpg`),不需要 import。没填图的地方会显示带提示文字的占位框,不影响构建。
