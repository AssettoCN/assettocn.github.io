// All user-facing UI copy, keyed by locale. Ported from the prototype.
import { SITE } from './site.js';

export const UI = {
  zh: {
    langLabel: 'EN',
    nav: { authors: '作者', works: '作品', servers: '服务器', gallery: '截图', docs: '文档' },
    hero: {
      kicker: 'ASSETTO CORSA · 中文社区', title: '神力科莎中文社区',
      sub: 'AssettoCN 是聚集国内 modder 与玩家的中文社区。我们链接创作者、沉淀 AC 相关的资料与文档,帮你找到值得关注的作者与作品。',
      ctaPrimary: '浏览作品', ctaSecondary: '认识作者',
    },
    scrollHint: '向下滚动',
    pillars: {
      title: '社区在做什么',
      p1t: '链接创作者', p1b: '汇聚国内 modder 与玩家,集中展示作者与作品,帮你找到并关注喜欢的创作者。',
      p2t: '沉淀资料与文档', p2b: '整理 AC 相关的教程、文档与资料,从入门安装到进阶制作都能查到 —— 我们不直接托管 mod。',
      p3t: '交流与共建', p3b: '分享经验、参与讨论,与作者直接交流,一起把中文社区做得更好。',
    },
    join: { title: '成为社区的一部分', sub: '无论你是想找作者、查资料,还是分享自己的作品,都欢迎加入 AssettoCN。', ctaA: '认识作者', ctaB: '浏览作品', docs: '文档中心' },
    featured: { title: '精选作品', more: '查看全部' },
    authorsPage: { title: '社区作者', sub: '认识这些为 ACN 持续创作的 modder,点开可查看完整介绍与作品。', submit: '申请入驻' },
    worksPage: { title: '社区作品', sub: '由 ACN 社区创作与整理 —— 车辆、地图、工具、教程与文档资料,帮你更好地上手 Assetto Corsa。可按类型筛选。', submit: '投稿作品' },
    serversPage: {
      title: '服务器列表', sub: '社区收录的各家 Assetto Corsa 服务器,可按玩法(围场 / 漂移 / 山路 / 漫游)筛选,点击即可获取接入信息。运营自己的服务器?也欢迎申请收录。',
      connect: '接入信息', join: '一键接入(CM)', homepage: '主页', apply: '申请收录服务器', online: '在线', offline: '离线',
    },
    galleryPage: { title: '截图画廊', sub: '社区玩家投稿的游戏截图 —— 分享你镜头下的神力科莎。', submit: '投稿截图', by: '投稿者' },
    detail: {
      back: '返回作者列表', aboutTitle: '关于', linksTitle: '链接', worksTitle: 'TA 的作品',
      statsWorks: '作品',
      worksUnit: '个作品', view: '查看',
    },
    filterAll: '全部',
    official: '官方',
    footerLinks: {
      blurb: '神力科莎中文社区 —— 链接创作者,沉淀 AC 资料与文档。',
      cols: [
        { title: '社区', links: [
          { label: '关于 ACN', href: '#' },
          { label: '作者列表', href: '#' },
          { label: '社区作品', href: '#' },
          { label: '加入我们', href: '#' },
        ] },
        { title: '资料', links: [
          { label: '文档中心', href: SITE.docsUrl },
          { label: '动态交流', href: SITE.discussionsUrl },
        ] },
        { title: '关注', links: [
          { label: 'Bilibili', href: '#' },
          { label: 'QQ 群', href: '#' },
          { label: 'Discord', href: '#' },
          { label: 'GitHub', href: '#' },
        ] },
      ],
    },
    footer: 'AssettoCN · 由社区驱动 · 仅作原型演示',
    viewLabel: '查看', coverHint: '封面',
    commentsTitle: '留言',
  },
  en: {
    langLabel: '中',
    nav: { authors: 'Authors', works: 'Works', servers: 'Servers', gallery: 'Shots', docs: 'Docs' },
    hero: {
      kicker: 'ASSETTO CORSA · CN COMMUNITY', title: 'The Assetto Corsa community, in Chinese',
      sub: 'AssettoCN is a Chinese community of Assetto Corsa modders and players. We connect creators and collect AC resources and docs to help you find authors and work worth following.',
      ctaPrimary: 'Browse works', ctaSecondary: 'Meet the authors',
    },
    scrollHint: 'Scroll',
    pillars: {
      title: 'What the community does',
      p1t: 'Connect creators', p1b: 'We gather modders and players and showcase authors and their work, so you can find and follow the creators you like.',
      p2t: 'Resources & docs', p2b: 'Curated Assetto Corsa tutorials, docs and references — from first install to advanced creation. We don’t host mods directly.',
      p3t: 'Community & co-building', p3b: 'Share experience, join discussions and talk to authors directly — building a better Chinese community together.',
    },
    join: { title: 'Become part of the community', sub: 'Whether you are here to find authors, look up resources, or share your own work — you are welcome in AssettoCN.', ctaA: 'Meet the authors', ctaB: 'Browse works', docs: 'Docs' },
    featured: { title: 'Featured works', more: 'See all' },
    authorsPage: { title: 'Community authors', sub: 'Meet the modders building for ACN. Open a card for the full profile and catalogue.', submit: 'Apply as author' },
    worksPage: { title: 'Community works', sub: 'Created and curated by the ACN community — vehicles, maps, tools, guides and documentation to help you get the most out of Assetto Corsa. Filter by type.', submit: 'Submit a work' },
    serversPage: {
      title: 'Server list', sub: 'Assetto Corsa servers listed by the community — filter by discipline (circuit / drift / touge / cruise) and click for connection details. Running your own? You are welcome to apply.',
      connect: 'Connection info', join: 'Join via CM', homepage: 'Homepage', apply: 'Apply to list a server', online: 'Online', offline: 'Offline',
    },
    galleryPage: { title: 'Screenshot gallery', sub: 'Screenshots submitted by community players — share your view of Assetto Corsa.', submit: 'Submit a shot', by: 'by' },
    detail: {
      back: 'Back to authors', aboutTitle: 'About', linksTitle: 'Links', worksTitle: 'Their works',
      statsWorks: 'Works',
      worksUnit: 'works', view: 'View',
    },
    filterAll: 'All',
    official: 'Official',
    footerLinks: {
      blurb: 'The Assetto Corsa Chinese community — connecting creators and collecting AC resources.',
      cols: [
        { title: 'Community', links: [
          { label: 'About ACN', href: '#' },
          { label: 'Authors', href: '#' },
          { label: 'Works', href: '#' },
          { label: 'Join us', href: '#' },
        ] },
        { title: 'Resources', links: [
          { label: 'Docs', href: SITE.docsUrl },
          { label: 'Discussions', href: SITE.discussionsUrl },
        ] },
        { title: 'Follow', links: [
          { label: 'Bilibili', href: '#' },
          { label: 'QQ group', href: '#' },
          { label: 'Discord', href: '#' },
          { label: 'GitHub', href: '#' },
        ] },
      ],
    },
    footer: 'AssettoCN · Community-driven · Prototype demo only',
    viewLabel: 'View', coverHint: 'cover',
    commentsTitle: 'Comments',
  },
};
