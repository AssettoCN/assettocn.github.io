---
order: 1
title: 系统与软件依赖
summary: 装游戏之前先确认电脑跑得动,并装好那几个几乎所有 mod 都要用到的运行库。
draft: true
updated: '2026-08-07'
---

## 游戏版本

神力科莎需要 **Steam 版 v1.16.3 / 1.16.4(仅 64 位)**。这是整个 mod 生态的基准版本 —— CM、CSP 和绝大多数 mod 都按它来。

## 配置要求

以下是官方给出的**原版**配置要求:

| | |
| --- | --- |
| 操作系统 | Windows 10 及以上 |
| 处理器 | AMD 六核 / Intel 四核 |
| 内存 | 8 GB |
| 显卡 | 支持 DirectX 11(如 AMD Radeon 290X、NVIDIA GeForce GTX 970) |
| DirectX | 版本 11 |
| 存储 | 30 GB 可用空间 |
| 网络 | 宽带连接 |

> 这是**原版**的要求。装了 mod 之后,尤其是高精度车模、大型赛道和 CSP 的画面特效,对显卡和内存的需求会明显高于上表。

## 软件依赖

这几样几乎是装 mod 的前提,提前装好能省掉大量「打不开 / 闪退 / 缺 DLL」的排查:

| 程序 | 作用 |
| --- | --- |
| [7-Zip](https://www.7-zip.org/) | 解压 `.zip` / `.rar` / `.7z` 压缩包 —— mod 基本都是压缩包分发 |
| [VCRedist 合集安装器](https://github.com/abbodi1406/vcredist/releases) | 一键装齐所有 Visual C++ 运行库 |
| [DirectX 最终用户运行时](https://www.microsoft.com/en-us/download/details.aspx?id=35) | 神力科莎需要的 DirectX 旧版运行库 |
| [.NET Framework 4.5.2](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net452) | Content Manager 等 .NET 程序的运行环境 |

## 手柄玩家

用 **PS4 / PS5 手柄**的话,需要 [DS4Windows](https://github.com/Ryochan7/DS4Windows/releases) 把手柄映射成 Xbox 手柄:

1. 下载最新版 `DS4Windows_x64.zip`
2. 解压到一个单独的文件夹
3. 运行 `DS4Windows.exe`,保持后台开启

Xbox 手柄即插即用,不需要额外软件。

## 方向盘玩家

**必须先装厂商固件 / 驱动**,搜索 `品牌 型号 方向盘 固件` 即可(例如「Moza R12 方向盘固件」)。

- 罗技(Logitech)用户:**游戏全程 G HUB 必须保持开启**,关掉会丢力反馈。
- 固件装好后,记得到 Content Manager 里**重新映射一遍所有按键**。

方向盘的详细设置在后面的 **方向盘与手柄设置** 一关。

## 下一步

依赖齐了,去 **购买与安装游戏**。
