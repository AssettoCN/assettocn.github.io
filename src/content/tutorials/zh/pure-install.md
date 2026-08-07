---
order: 1
category: visuals
title: 'Pure 安装'
summary: 'Pure 是 CSP 的天气与光照增强,也是 Pure Config / PPFilter 的前提。这里是安装与启用步骤。'
draft: false
sourceName: 'AssettoCN 文档(社区整理)'
---
Pure 是 Peter Boese 为 **神力科莎** 和 **Custom Shaders Patch (CSP)** 开发的天气与图形增强。它提供增强的光照、真实天气、阴影、反射和广泛的后期处理滤镜（PPFilter）支持。

Pure 是获得最真实 CSP 视觉效果的关键。

## 依赖

- 通过 Steam 安装的神力科莎 v1.16.3/4（仅限 64 位）
- 支持解压 `.zip` 压缩包的工具
- 最新版 [Content Manager](/start/content-manager-csp) 已安装并配置
- 最新版 [CSP](/start/content-manager-csp) 已安装并正常工作
- [Peter Boese 的 Patreon 订阅](https://www.patreon.com/c/peterboese/posts)（用于访问最新构建版本）

<aside class="cx cx--warning">

<span class="cx__t">缺少依赖项？</span>

如果不确定系统是否已准备就绪，请先查看 [系统要求](/start/requirements) 指南。

</aside>

## 下载

Pure 仅通过 Peter Boese 的 Patreon 分发。订阅后，可从帖子中下载最新的 `.zip` 压缩包。

[前往 Patreon](https://www.patreon.com/c/peterboese/posts)

<aside class="cx cx--info">

<span class="cx__t">信息</span>

下载文件名格式如下：

```bash
Pure_X.XX Highres.zip
# 其中 X.XX 是版本号
```

</aside>

## 安装

Pure 必须手动安装，**不要通过 Content Manager 安装**。

1. 在 `下载` 文件夹中定位下载的 `.zip` 文件
2. 将内容直接解压到你的 [根目录](/tutorials/root-folder)
3. 如提示，允许覆盖文件

<aside class="cx cx--info">

<span class="cx__t">最佳实践</span>

安装 Pure 后务必重启 Content Manager，以避免缺少菜单项或天气配置问题。

</aside>

## 启用 Pure

安装 Pure 后：

1. 打开 Content Manager
2. 前往 `设置 > Custom Shaders Patch`
3. 在左侧列表的 `扩展` 下，点击 `WeatherFX`
4. 在 `天气样式` 下，选择 `Pure Gamma` 或 `Pure LCS`

<aside class="cx cx--warning">

<span class="cx__t">单人游戏提示</span>

启动单人游戏时，请确保在快速比赛菜单中将 `天气控制器` 设置为 `Pure`。

</aside>

## 版本信息

- 始终使用 Pure 和 CSP 的最新版本
- 部分 Pure 发布需要最低 CSP 版本，更新前请检查 Patreon 发布说明
- 将过时的 Pure 与新版 CSP 混用（或相反）可能导致功能缺失或图形异常
