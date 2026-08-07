---
order: 1
category: modding
title: '游戏根目录详解'
summary: '根目录里每个文件夹分别放什么 —— 装 mod 和排查问题时的地图。'
draft: false
updated: '2026-08-07'
sourceName: 'AssettoCN 文档(社区整理)'
---
根目录是神力科莎的安装主目录，存放核心文件，大多数 MOD 也需要安装于此。了解如何访问和理解该目录对 MOD 安装和故障排除很重要。

## 找到根目录

在 Steam 中，打开游戏库并找到神力科莎。点击设置齿轮，选择 `管理 > 浏览本地文件`。

![Steam 菜单显示如何浏览本地文件](/images/guides/install-game-root-folder.png)

<aside class="cx cx--tip">

<span class="cx__t">提示</span>

可在文件资源管理器中右键根目录，选择“固定到快速访问”，便于后续安装 MOD。

</aside>

## 文件夹概览

### `/apps/`

存放所有用户应用。Lua 应用轻量，通常比 Python 应用更快。

---

### `/cache/`

缓存存放游戏临时数据，用于缩短加载时间并避免重复计算，包括：AI 路径、Lua 脚本、车辆数据、赛道数据、树木数据、远程资源等。

<aside class="cx cx--info">

<span class="cx__t">信息</span>

游戏会在需要时重建缓存文件，因此损坏或需要刷新过期数据时可安全删除该文件夹。

</aside>

---

### `/cfg/`

以 `.ini` 文件存储各种游戏设置，启动时初始化。多数可在 Content Manager 中设置。

---

### `/content/`

存放所有车辆、赛道、字体、车手模型等资源。游戏主要内容存储于此。

安装大多数 MOD 时，文件放在其命名子文件夹中以便被检测并正确加载。

---

### `/crash_logs/`

仅在通过 Steam 启动时使用。Content Manager 使用独立日志系统，日志保存在用户文件夹的 `Documents/Assetto Corsa/logs`，该文件夹可忽略。

---

### `/extension/`

存放与 CSP 相关的内容。非原版文件夹；存在即表示已安装过 CSP。包括 Lua SDK、背景、后追相机、配置文件、SFX、VAO 补丁、WFX 等。

---

### `/launcher/`

原始 JavaScript 启动器所需文件，`AssettoCorsa.exe` 在此启动 `acs.exe`。

---

### `/sdk/`

为 MOD 作者提供工具和资源，如创建车辆和赛道 MOD 的 `ksEditor`。

---

### `/server/`

运行多人服务器所需：可执行文件、配置文件、赛道与车辆数据、日志。用于自托管服务器。

---

### `/system/`

存放 VR 和 Python 的 `x86`/`x64` 库，以及其他内部设置（位于 `system/cfg` 和 `data/surface.ini` 等默认数据）。

---
