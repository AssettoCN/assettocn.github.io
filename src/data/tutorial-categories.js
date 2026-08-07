// 教程分类 → 标签文案(中/英)+ 列表页分组顺序。
// content.config.ts 用这里的键校验 tutorials 集合的 `category` 字段,
// /tutorials 列表页也按这里的顺序分组。增删分类只改这一处。
//
// 和「入门闯关」(guides 集合)的区别:闯关是线性的一条路(01→08,有进度),
// 教程是非线性的参考型内容,按主题归类,不排号、不计进度。
export const TUTORIAL_CATEGORY = {
  visuals: {
    label: { zh: '画质', en: 'Visuals' },
    desc: {
      zh: '光照、天气与后期处理 —— 把画面调到你想要的样子。',
      en: 'Lighting, weather and post-processing — getting the look you want.',
    },
    tag: 'tag-accent',
  },
  modding: {
    label: { zh: '模组', en: 'Modding' },
    desc: {
      zh: '文件结构与安装细节,排查「装了没反应」这类问题。',
      en: 'File layout and install details — for when something just doesn\'t show up.',
    },
    tag: 'tag-accent-2',
  },
  hardware: {
    label: { zh: '硬件', en: 'Hardware' },
    desc: {
      zh: 'VR、外设与性能调优。',
      en: 'VR, peripherals and performance tuning.',
    },
    tag: 'tag-neutral',
  },
};

/** 分类键的固定顺序(列表页分组顺序)。 */
export const CATEGORY_ORDER = Object.keys(TUTORIAL_CATEGORY);
