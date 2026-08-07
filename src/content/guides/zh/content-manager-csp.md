---
order: 3
title: Content Manager 与 CSP
summary: 装上现代神力科莎的两件套 —— Content Manager(启动器 / 管理器)和 CSP(画质与功能补丁)。
draft: true
---

## 为什么要装

- **Content Manager(CM)**:第三方启动器,几乎取代原版界面 —— 管理车 / 赛道 / mod、联机进服、截图、调画质都靠它。
- **Custom Shaders Patch(CSP)**:给游戏加光影、天气、交通流等现代化功能。很多新 mod 和服务器**依赖 CSP** 才能正常跑。

## 一、装 Content Manager

从官网下载:**<https://acstuff.ru/app/>**

1. 解压压缩包,找到 `ContentManager.exe`。
2. 把它放到一个**固定的位置**(桌面或专门的文件夹都行),然后双击运行。

> **别把 `ContentManager.exe` 放进游戏根目录。** 放外面,Steam 校验游戏完整性时才不会误删它或出问题。

### 首次配置

- **根目录**:CM 会让你指定游戏安装目录。Steam 默认通常是
  `C:\Program Files (x86)\Steam\steamapps\common\assettocorsa` —— 找不到就按上一关的方法(右键游戏 → 管理 → 浏览本地文件)。
- **Steam ID**:CM 会自动识别,有提示确认一下即可。
- **插件**:可能提示装 7-Zip 集成之类的可选插件。基础功能用不到,但管理 mod 时方便。之后在 `设置 → Content Manager → 插件` 里随时增删。

### 免费版就够用

CM 分 **Lite(免费)** 和 **Full(捐赠解锁)**。

- **Lite** 已包含管理内容、驾驶、游戏设置等全部核心功能,**对绝大多数人足够**。
- **Full** 额外提供:预发布 / 实验性版本、在线服务器创建管理、自定义离线锦标赛、进阶 mod 工具(含定制展厅)、以及 CSP 里的动态天气。
  升级方式:捐赠后拿到密钥,在 `设置 → Content Manager → 通用` 点「更改」填入。

## 二、装 CSP

从官网下载:**<https://acstuff.club/patch/>**

下载下来的文件名长这样:

```
lights-patch-v0.X.XX.zip              ← 常规版本
lights-patch-v0.X.X-previewXXX-full.zip  ← 预览版(能开雨天)
```

### 两种装法

**手动安装(推荐)**

1. 把压缩包内容直接解压到**游戏根目录**,提示覆盖就允许。
2. **重启 Content Manager。**

**拖进 CM**

1. 打开 CM,把 `.zip` 拖进窗口。
2. CM 会提示安装,确认后等它装完。
3. 同样**重启 CM**。

> 装完 CSP 一定要重启 CM。否则 CSP 的设置面板可能加载不出来,或者显示的还是旧设置。

### 启用

`设置 → Custom Shaders Patch → General Patch Settings`,勾上最顶上那个复选框。左侧列表里是各个模块(WeatherFX、LightingFX、ExtraFX 等),按需开关。

没装过的话,这一页会直接告诉你「未安装」并给一个 Install 按钮:

![CM 的 Custom Shaders Patch 页面显示「未安装」,旁边是 Install 按钮](/images/guides/content-manager-csp-install.png)

### 选哪个版本

- **推荐版(recommended)** —— 下载页上标着的那个,稳定性和功能最平衡,**新手选它**。
- **预览版(preview)** —— 需要 Patreon,能提前用新功能、开雨天,部分最新 mod 也要求它。
- **有缺陷 / 未测试** —— 实验性构建,除非明确需要,别碰。

> **版本可以回退。** 新版出问题就按同样的方式装回旧版 `.zip`,CM 会覆盖现有文件。
>
> 另外,进某些服务器时会**要求特定 CSP 版本**,按需切换即可。

## 下一步

两件套就绪,就可以开始 **安装 mod** 了。
