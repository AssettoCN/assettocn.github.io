---
order: 1
category: hardware
title: 'VR 指南'
summary: '在 CSP 下把 VR 跑起来并调到可用画质:头显设置、分辨率与重投影、视频与 CSP 预设、OpenXR 工具链。'
draft: true
sourceName: 'AssettoCN 文档(社区整理)'
---
> **说明**
> 如需进一步帮助或想要反馈游戏问题，请加入 [`Custom Shaders Patch Discord`](https://discord.gg/zN4XtmZ4Jf)，并在 [`virtual-reality-talk`](https://discord.com/channels/453595061788344330/615211984639754260) 频道发言。
>
> 本指南旨在帮助你完成基础 VR 设置，并微调参数以获得最佳体验。  
> 还涵盖了 OpenComposite 与 OpenXR Toolkit 的使用。  
> 本指南以 Content Manager 与 Custom Shaders Patch 为前提，不适用于原版（Vanilla）Assetto Corsa。
> <br> **特别感谢 ItsRaptyyy 允许我们引用他的指南**

> **提示**
> 大多数人只需阅读到“视频设置”即可，后续涵盖更多深入设置，可能并非人人需要。

## 1. 前置条件

<aside class="cx cx--info">

<span class="cx__t">说明</span>

- Assetto Corsa v1.16.3/4（仅 64 位），通过 Steam 安装。
- Content Manager 最新版本。
- 除非另有说明，确保使用 Custom Shaders Patch 最新版本。
- Pure 最新版本（可在 VR 中提供最佳画质）。

</aside>

## 2. 基础 VR 设置

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<aside class="cx cx--tip">

<span class="cx__t">提示</span>

点击与你头显品牌对应的标题展开说明，只需使用其中一种方法即可。

</aside>

<details>
<summary>Oculus / Meta</summary>

<details>
<summary>**Oculus（简单设置）**</summary>

这是最简单、也是多数用户推荐的方法。

1. 确保你已成功设置 Quest Link 或 Air Link，并让头显连接到电脑 —— [教程](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)  
1.1 如果你使用的是 Oculus Rift（S），只需确保头显已连接且在 Oculus App 中显示即可。
2. 在 Oculus App 中进入 **Settings > General**，启用 “Unknown sources”，并在 “OpenXR Runtime” 旁点击 “Set Oculus as active”（若按钮为灰色则无需操作）。
3. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “Oculus Rift”。

**此方法不需要 SteamVR。**

</details>

<details>
<summary>**OpenComposite（性能最佳）**</summary>

体验与原生 Oculus 类似，但可以使用 OpenXR Toolkit。  
可带来更好的性能表现。  
更适合高级用户。

1. 确保你已成功设置 Quest Link 或 Air Link 并连接到电脑 —— [教程](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)  
   1.1 如果你使用的是 Oculus Rift（S），只需确保头显已连接并在 Oculus App 中显示。
2. 在 Oculus App 中进入 **Settings > General**，启用 “Unknown sources”，并在 “OpenXR Runtime” 旁点击 “Set Oculus as active”（若按钮为灰色则无需操作）。
3. 安装 OpenComposite，[操作步骤](#_7-opencomposite-and-openxr-toolkit)。
4. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

使用该方法后，可进一步了解 [OpenXR Toolkit](#_7-opencomposite-and-openxr-toolkit)。

</details>

<details>
<summary>**Virtual Desktop**</summary>

Virtual Desktop 有潜力提供更佳体验，但这是一款付费软件。

1. 在 Oculus / Meta 商店购买 Virtual Desktop（不要在 Steam 购买）。
2. 按照 Virtual Desktop 的说明连接头显到电脑（无需 Quest / Air Link）。
3. 打开 Virtual Desktop Streamer，在设置中将 OpenXR runtime 设为 VirtualDesktopXR (VDXR)。
4. 安装 OpenComposite，[操作步骤](#_7-opencomposite-and-openxr-toolkit)。
5. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

</details>

<details>
<summary>**SteamVR**</summary>

一般不推荐使用。

1. 确保你已成功设置 Quest Link 或 Air Link 并连接电脑 —— [教程](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)  
1.1 如果你使用的是 Oculus Rift（S），只需确保头显已连接并在 Oculus App 中显示。
2. 从 Steam 安装并设置 SteamVR。
3. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

</details>

<details>
<summary>Oculus / Meta 补充说明与故障排查 {open}</summary>

- 如果你使用 USB 线并通过 Quest Link（有线）连接，请在 Oculus Debug Tool 中将编码码率设为 500 Mbps 或更高。更多信息：[Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/)。
- 若无线使用头显时游戏出现卡顿：你的路由器可能无法满足高带宽需求，通常表现为网络延迟较高。可在 [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/) 中降低码率，或将其设为 0（自动码率）。
- 使用 USB-C 时，请确保头显以 USB 3 而非 USB 2 速度运行（速度应大约 1.5Gbps 或更高）。如即便使用新线材与 USB 3 接口仍显示为 USB 2，可恢复头显出厂设置以解决问题。

</details>

</details>

<details>
<summary>SteamVR 头显（Vive、Index、Bigscreen Beyond）</summary>

<details>
<summary>**原生 SteamVR** {open}</summary>

1. 确保头显已连接电脑。
2. 从 Steam 安装并设置 SteamVR。
3. 某些头显可能需要额外驱动或工具以正常工作，请按照厂商提供的说明进行设置。
4. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

</details>

</details>

<details>
<summary>Windows Mixed Reality 头显</summary>

<details>
<summary>**使用 Oasis SteamVR 驱动（推荐）** {open}</summary>

- 1. 确保头显已连接电脑。
- 2. [安装 Windows Mixed Reality 的 Oasis 驱动](https://store.steampowered.com/app/3824490/Oasis_Driver_for_Windows_Mixed_Reality/)。
- 3. [按照 Oasis 驱动说明操作](https://github.com/mbucchia/Oasis-Driver-for-Windows-Mixed-Reality/wiki#hello-and-welcome-to-the-oasis-driver-for-windows-mixed-reality-documentation)。
- 4. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

<details>
<summary>**使用 OpenComposite**</summary>

<aside class="cx cx--warning">

<span class="cx__t">仅当 Oasis SteamVR 驱动对你无效时再使用此方案。</span>

5. 确保头显已连接电脑。
6. 从 Microsoft Store 安装并设置 Windows Mixed Reality。
7. 从 Microsoft Store 安装并设置 OpenXR Tools for Windows Mixed Reality。
8. 若看见 “Set as active runtime” 按钮，请点击它。
9. [安装 OpenComposite](#_7-opencomposite-and-openxr-toolkit)。
10. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。  
    使用此方法也可以了解 [OpenXR Toolkit](#_7-opencomposite-and-openxr-toolkit)。

</aside>

<details>
<summary>Pimax 头显</summary>

<details>
<summary>**使用 OpenComposite（推荐）**</summary>

1. 确保头显已连接电脑。
2. [安装并设置 Pimax Play](https://pimax.com/pages/downloads-manuals)。
3. [在 Pimax Play 中将 OpenXR Runtime 设置为 Pimax OpenXR](https://pimax.com/blogs/blogs/how-to-use-pimax-openxr)。
4. [安装 OpenComposite](#_7-opencomposite-and-openxr-toolkit)。
5. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

使用该方法同样可以了解 [OpenXR Toolkit](#_7-opencomposite-and-openxr-toolkit)。

</details>

<details>
<summary>**使用 SteamVR**</summary>

1. 确保头显已连接电脑。
2. [安装并设置 Pimax Play](https://pimax.com/pages/downloads-manuals)。
3. 从 Steam 安装并设置 SteamVR。
4. 在 Content Manager 中前往 **Settings > Assetto Corsa > Video**，将 “Rendering Mode” 设置为 “OpenVR”。

</details>

</details>

</details>

## 3. 分辨率与重投影（Reprojection）

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<details>
<summary>分辨率</summary>

与显示器不同，VR 头显不存在“原生分辨率”，因为 [桶形畸变](https://github.com/user-attachments/assets/cc384ebe-96b5-4272-a26b-cf7a3eb14afe)会降低画面中心细节。为了抵消该影响，需要进行超级采样（提升渲染分辨率）。  
重要的是在性能允许的情况下尽量提高分辨率。  
建议先使用 100% 或 1.0 倍分辨率（也称为 Render Scale），再根据画质与性能需要调整。  
在部分头显（如 Pimax）上，100% 就是非常高的分辨率，可能需要降低以保证性能。

<aside class="cx cx--info">

<span class="cx__t">**Oculus / Meta**</span>

可在 Oculus App（Settings > Graphics Preference > Render Resolution）或 [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/) 中，通过 Pixels Per Display Pixel Override 调整。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Steam VR**</span>

可在 SteamVR 设置 > Video > Render resolution（设为 Custom）中调整。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Windows Mixed Reality**</span>

可在 OpenXR Tools for Windows Mixed Reality 中调整（Custom Render Scale）。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Pimax**</span>

可在 Pimax Play 软件中调整（Render Quality）。

</aside>

<aside class="cx cx--warning">

<span class="cx__t">注意</span>

Content Manager 中 **Settings > Assetto Corsa > Video** 的 Resolution 不会影响 VR 分辨率。

</aside>

</details>

<details>
<summary>重投影（Reprojection）</summary>

重投影通过减少实际渲染帧数并推算中间帧，实现平滑体验，本质上类似于帧生成。  
例如：在 90Hz 头显下，电脑只需渲染 45 FPS，其余帧由重投影生成。  
然而，重投影可能导致画面伪影、输入延迟或启停切换时出现卡顿。

<aside class="cx cx--info">

<span class="cx__t">**Oculus / Meta**</span>

可在 [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/) 中，通过 “PC Asynchronous Spacewarp” 设置（需注意 Debug Tool 有时可能忽略该设置）。  
替代方案：下载 [此压缩包](https://github.com/Raptyyy/rapty_ac_vr_guide/raw/refs/heads/main/resources/oculus%20asw%20enable%20disable%20registry.zip)，运行 “oculus disable asw.reg” 以关闭 ASW，或运行 “oculus enable asw.reg” 以开启。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Steam VR**</span>

可在 SteamVR 设置（Video > Motion Smoothing）中设置。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Windows Mixed Reality**</span>

可在 OpenXR Tools for Windows Mixed Reality 中设置（Motion Reprojection Rate）。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Pimax**</span>

可在 Pimax Play 软件中设置（Smart Smoothing）。

</aside>

<aside class="cx cx--info">

<span class="cx__t">说明</span>

任何使用 OpenComposite 并启用 OpenXR Toolkit 的头显，也可以直接在 OpenXR Toolkit 中调整分辨率与重投影。

</aside>

</details>

</aside>

## 4. 视频与 CSP 预设

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<aside class="cx cx--warning">

<span class="cx__t">注意</span>

请在 Content Manager 中为 Video 与 Custom Shaders Patch 保存当前设置的预设！

</aside>

<details>
<summary>视频预设</summary>

如果你不想阅读下面的详细内容，可以尝试以下预设，找出适合自己的方案。以下预设由 [Raptyyy](https://github.com/Raptyyy) 制作，可根据需求继续调整。  
请务必再次确认 **Rendering Mode** 是否与你的头显设置匹配！

- 高性能： [链接](https://acstuff.club/s/lW4B)（若仍需性能，可关闭 Post Processing）
- 均衡： [链接](https://acstuff.club/s/oFw)
- 高画质： [链接](https://acstuff.club/s/hPvJ)（若想要最佳画质，请选择优质后期处理滤镜）

<aside class="cx cx--tip">

<span class="cx__t">提示</span>

VR 中无需使用帧率限制器，因为帧率会自动锁定到头显刷新率。启用 FPS 限制器反而可能造成性能问题。

</aside>

</details>

<details>
<summary>CSP 预设</summary>

这些预设主要作为个人偏好的基础。先尝试预设，再按需调整。

- 高性能 - [链接](https://acstuff.club/s/Ozx3)（为提升性能，禁用了大量模块）
- 均衡 - [链接](https://acstuff.club/s/PaP3)
- 高画质 - [链接](https://acstuff.club/s/J0Je)

<aside class="cx cx--warning">

<span class="cx__t">注意</span>

这些预设中未启用 Foveated Rendering / Nvidia VRS，相关说明见 [Foveated Rendering 章节](#_5-什么是-foveated-rendering-注视点渲染)。

</aside>

</details>

</aside>

## 5. 什么是 Foveated Rendering（注视点渲染）

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<aside class="cx cx--warning">

<span class="cx__t">注意</span>

请注意：由于 Assetto Corsa 是 DirectX 11 游戏，Foveated Rendering 仅适用于 Nvidia 16xx、20xx、30xx、40xx 系列或更新的显卡。

</aside>

Foveated Rendering 通过降低画面外围区域的渲染分辨率来提升性能，如下图所示。  
这与 VR 头显的成像特点相符，因为只有镜片中心区域在对焦范围内能清晰显示。  
Foveated Rendering 是 VR 中提升 GPU 性能的最有效手段之一，强烈推荐使用。  
部分带眼动追踪的头显可支持动态 Foveated Rendering（未来会提供更多信息）。

![Foveated Rendering](/images/guides/vr-foveated-rendering.jpg)

<aside class="cx cx--tip">

<span class="cx__t">提示</span>

对于使用大甜点区（sweet spot）的 Pancake 镜片头显（如 Quest 3 或 Pico 4），Foveated Rendering 的视觉差异会更明显，建议将中心区域设得更大。

</aside>

<aside class="cx cx--info">

<span class="cx__t">**开启 Foveated Rendering 的方式（仅选择一种）：**</span>

- 在 Custom Shaders Patch 中启用 `Nvidia VRS`，[详见](#_4-视频与-csp-预设)（推荐大多数用户使用）。
- 若使用 OpenComposite，可在 `OpenXR Toolkit` 中启用 `Foveated Rendering`，[详见](#_7-opencomposite-and-openxr-toolkit)（提供更多自定义选项，适合高级用户）。
- 对于 Pimax 用户，可在 `Pimax Play` 中启用 `Foveated Rendering`（设置更便捷，但自定义程度低于 OpenXR Toolkit）。

</aside>

</aside>

## 6. 视频 / CSP 设置详解

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<details>
<summary>视频设置</summary>

以下内容涵盖 Content Manager > Settings > Video 中的全部选项。

<aside class="cx cx--info">

<span class="cx__t">说明</span>

在 Content Manager > Video 中，大部分选项旁都有 **`!`** 图标，可查看设定说明与性能影响。

</aside>

<details>
<summary>分辨率与帧率</summary>

- **Rendering Mode**：应根据前文头显设置章节选择正确模式。
- **Fullscreen**：在 VR 下启用后可略微提升性能，推荐 `启用`，但非必需。
- **Resolution**：仅影响桌面窗口大小，对 VR 画质无影响。
- **Virtual synchronization**：无需启用，保持 `Disabled`。
- **Limit framerate**：VR 中已有头显刷新率限制，保持 `Disabled`。

</details>

<details>
<summary>Quality（质量）</summary>

- **MSAA**：多重采样抗锯齿，能显著改善远景锯齿与闪烁。推荐 `2x` 或 `4x`，`8x` 性能开销较大。
- **Anisotropic Filtering**：各向异性过滤，建议 `16x`，几乎无性能损失。
- **World details**：调整赛道对象数量（取决于赛道是否支持），视需求设置。可在游戏内 “View & Video Settings” 应用中调整。
- **Shadows resolution**：阴影分辨率，影响阴影锐利度。推荐基础值 `1024x1024`，若性能允许可提高。
- **Smoke generation**：控制烟雾量，可按需调整。建议使用 CSP 的烟雾（Custom Shaders Patch > Particles FX > New smoke and dust）。

</details>

<details>
<summary>Reflections（反射）</summary>

- **Reflection Resolution**：反射清晰度。推荐从 `512x512` 起步。
- **Rendering frequency**：反射刷新频率。推荐 `two faces per frame`，更高刷新率收益不大，且影响性能；不要设置为 Static，否则会与 Pure 产生问题。
- **Rendering distance**：反射渲染距离，对性能影响不明显，可设为 `至少 1000m`。

</details>

<details>
<summary>Post-Processing（后期处理）</summary>

- **Enable post-processing effects**：开关整体后期处理。可显著提升画面，但性能损耗较大。大多数 PC 可保持 `Enabled`，若在高负载服务器可 `Disabled`。
- **Overall Quality**：后期处理分辨率，`High` 是性能与画质的平衡点，也可设为 `Maximum`。
- **Glare Quality**：炫光质量，`High` 或 `Maximum` 皆可。
- **Depth of field**：景深效果，仅在回放生效，不关注可设为 `Off`。
- **Motion blur**：VR 不建议使用，设为 `Off`。
- **Saturation**：色彩饱和度，保持 `100%`，如需微调请在 Pure 内操作。
- **Heat shimmering**：热浪扭曲效果，按需开关。
- **Sunrays**：太阳光束 / 上帝光，按需开关。
- **FXAA**：抗锯齿技巧，需保持 `Enabled`，以便某些 CSP 功能正常运行（对 VR 画质无影响）。

</details>

<details>
<summary>Mirrors（后视镜）</summary>

- **Mirror resolution**：后视镜清晰度。较高分辨率会降低性能，推荐 `256x1024` 起步。
- **High quality**：启用后可增加镜中效果与渲染距离（从 400m 提高到 800m），建议 `Enabled`。

</details>

<details>
<summary>Oculus（仅影响 Oculus / Meta 头显）</summary>

- **Pixels per display**：与 Oculus App 中的分辨率缩放相同，可按需调整。
- **Mirror texture**：在桌面窗口显示 VR 视角，建议 `Enabled`。

</details>

<details>
<summary>System（系统）</summary>

**不建议修改此处设置，作用有限且可能引发问题。**

</details>

</details>

<details>
<summary>CSP 设置</summary>

以下内容涵盖 Content Manager > Settings > Custom Shaders Patch 中与 VR 性能相关的选项。

<aside class="cx cx--info">

<span class="cx__t">说明</span>

并非所有 CSP 项目都会在此讨论，只挑选与 VR 性能相关的部分。

</aside>

<details>
<summary>General Patch Settings</summary>

- **Audio > Decompress Samples**：建议 `Enabled`，用更多内存换取更低 CPU 负担。
- **New KN5 loader**：建议 `Enabled`，可降低 RAM / VRAM 占用。

</details>

<details>
<summary>CPU optimizations</summary>

- **Flatten nodes**：保持 `Enabled`。
- **Chunks optimization**：缓解 CPU 负载。建议设为 `Advanced`，如出现屏幕变黑等问题再降为 `Basic`。
- **Limit audio for other cars**：若电脑较慢，设为 `Always`。
- **Apply Hyperthreading fix**：强烈推荐 `Enabled`，对支持 HT / SMT 的 CPU 有益。可能不适用于 4 或 2 核 CPU。（需 CSP 0.2.7 / 0.2.8 preview 或更新）

</details>

<details>
<summary>GPU optimizations:</summary>

- **Optimize meshes some more**：建议 `Enabled`，降低 GPU 负载。
- **Deduplicate meshes**：建议 `Enabled`，减少 VRAM 占用。
- **Upgrade AC textures**：建议 `Enabled`，可提升加载速度、降低 VRAM 占用，但会占用更多磁盘空间（一般不超过 5GB）。
- **Deduplicate textures**：可能降低 VRAM 占用，但也可能引发图形问题或崩溃，谨慎使用；多数情况下建议 `Disabled`。

</details>

<details>
<summary>Extra FX</summary>

Extra FX 在 VR 中无效，如不使用可保持 `Disabled`。

</details>

<details>
<summary>GUI</summary>

- **New driver tags**：推荐 `Enabled`，可在 VR 中显示车手姓名，非常实用。
- **Font Scale**：若难以看清文字，可调至 `125%` 或更高。

</details>

<details>
<summary>Graphics Adjustments</summary>

- **AMD FidelityFX SuperResolution（FSR）**：一种上采样方案，低端 PC 可用以提升性能，或通过 OpenXR Toolkit 访问。
<br>
<br>
**LOD 设置：**

- **Force low-res drivers for other cars in first person view**：建议 `Enabled`，提升性能。
- **Multiplier for car LODs**：控制车辆 LOD 切换距离。降低可提升性能，但近距离画质下降。可设为 `75%`。
- **Multiplier for track LODs**：与赛道相关，建议不要低于 `80%`，避免问题。
- **Multiplier for trees LODs**：与 3D 树木相关。若不在意 3D 树，可设为 `0%`（强制 2D），否则保持 `100%`。
- **Add extra collider-based LODs for distant cars**：为缺少 LOD 的车辆生成低质量 LOD，在密集服务器（如 VDC）中很有用，建议 `Enabled`。将 “Limit LODless cars” 设为 5 ~ 10 以获得最佳性能。
<br>
<br>

- **Post processing antialiasing**：设为 `Disabled`，后期抗锯齿在 VR 中无效（若未来有变化会更新说明）。
- **Accessible color buffer > Full resolution for better quality**：设为 `Disabled`，可微幅提升性能。
- **Draw grooves over track, but before dynamic entities**：可能提升性能，但在部分赛道上会导致镜面或透视问题，谨慎使用。

</details>

<details>
<summary>Lighting FX</summary>

- **Cars casting lights**：建议降低至 `5`，在密集大厅中能显著降低性能消耗。
- **Disable mirroring in first person view**：建议 `Enabled`，稍微提升性能。
- **Enable lighting in reflections**：建议 `Disabled`，减少性能消耗。

</details>

<details>
<summary>Neck FX</summary>

与性能无关，但可提升沉浸感或舒适度，以下为常见脚本：
- [AC Head Physics](https://www.overtake.gg/downloads/ac-head-physics.68266)，效果更华丽，动作更多。
- [NeckFX LUA script](https://www.overtake.gg/downloads/neckfx-lua-script-vr-stabilize.65087)，较基础、偏稳定。

</details>

<details>
<summary>Smart Mirror</summary>

- **Custom render distance**：若视频设置中启用了 High Quality mirrors，建议 `Enabled` 并将距离设为 400m，以提升性能。
- **Real mirrors**：强烈推荐在 VR 中启用，可根据头部运动变化视角，并允许通过 “Car Mirrors” 应用调整镜面（需先在游戏中安装 “App Shelf”）。
  - **Active**：`Enabled`
  - **Alter FOV**：根据距离自动调整镜面视角，可按需设置，个人习惯为 `Disabled`
  - **Refresh rate per frame**：建议 `Update single reflection per frame`，可提升性能；若低刷新率头显会显得卡顿，可适当提高。

</details>

<details>
<summary>Weather FX</summary>

- **Weather style**：建议设为 `Pure Gamma` 或 `Pure LCS`。目前推荐 `Pure Gamma`，性能更佳；`Pure LCS` 画面更好但可能引发问题。
- **Replace YEBIS with lightweight alternative**：较轻量的后期处理实现，可节省 CPU / GPU 资源，建议 `Enabled`。但不兼容某些滤镜（如 C13），也可能导致眩光过强。
- **Automatically guess white reference point**：会在使用 Pure 时让 UI 变得很亮，建议 `Disabled`。

</details>

<details>
<summary>Mode Tweaks VR:</summary>

- **确保扩展（Active）已启用**
- **Single Pass Stereo**：强烈推荐 `Enabled`，特别是 CPU 性能不足时。将双眼渲染合并为一次完成，大幅减轻 CPU 负担。但可能影响部分 Pure 着色器。
- **Single YEBIS pass**：可选 `Enabled`，一次对双眼执行后期处理，提升性能。但可能让炫光效果略显异常。

</details>

<details>
<summary>Nvidia VRS</summary>

又称 [Foveated Rendering](#_5-什么是-foveated-rendering-注视点渲染)，仅适用于 Nvidia GPU。若要使用 Nvidia VRS（需启用 Single Pass Stereo）：
- **Nvidia VRS**：`Enabled`
- **VRS preset**：`Custom`
- **VRS rate**：`High performance`；若极需性能可设为 `Highest performance`，但画面差异更明显。
- **VRS detailed area**：`Balanced`；如使用 Quest 3 或 Pico 4，可设为 `Wide` 减少可见的分辨率差异。  
  你也可以尝试预设中的选项，看看是否更适合。
  
**你可以使用 VR Tweaks 应用在游戏内实时调整这些设置（以及更多内容）：[`VR Tweaks`](https://www.overtake.gg/downloads/vr-tweaks.76283/)**

- **Corners masking optimization**：建议 `Enabled`。也称 Hidden Area Mesh，可避免渲染镜片遮挡区域，提高效率。如你不喜欢 VR 画面（PC 窗口）中的黑色边缘，可关闭。
- **Custom VR HUD rendering**：与性能无关，但推荐 `Enabled`，能让 HUD 在 VR 中表现更好。HUD 的调节可借助上述 VR Tweaks 应用。

</details>

</details>

</aside>

## 7. OpenComposite 与 OpenXR Toolkit

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<details>
<summary>OpenComposite</summary>

- 将 OpenVR 游戏转换为 OpenXR，从而在大多数头显上无需 SteamVR（SteamVR 头显除外），强烈推荐追求高性能的用户使用。
- 在 Rift、Quest、Pimax、WMR 等头显上，SteamVR 只是额外层，增加资源占用却无实际帮助。
- 当你使用 Virtual Desktop 搭配 VDXR 时，OpenComposite 同样适用，[详情](https://github.com/mbucchia/VirtualDesktop-OpenXR/wiki)。

<aside class="cx cx--danger">

<span class="cx__t">警告</span>

对本身依赖 SteamVR 的头显（Vive、Index、Beyond）使用 OpenComposite 时，仍无法绕过 SteamVR（头显本身需要它）。不过这样可以访问 OpenXR Toolkit。
  
Pico 独立头显没有原生 OpenXR runtime，如需绕过 SteamVR，需使用 Virtual Desktop + VDXR + OpenComposite。

</aside>

<details>
<summary>安装 OpenComposite:</summary>

1. 从以下任意链接下载 OpenComposite DLL：  
   A. [此仓库](https://github.com/Raptyyy/rapty_ac_vr_guide/raw/refs/heads/main/resources/openvr_api.dll)  
   B. [OpenComposite 镜像](https://znix.xyz/OpenComposite/download.php?arch=x64&branch=openxr)
2. 确保文件名为 “openvr_api.dll”（如不是请重命名）。
3. 将文件放入 **steamapps\common\assettocorsa\system\x64**，若提示覆盖请选择覆盖。
4. 在 **Content Manager > Settings > Video** 中将 “Rendering Mode” 设置为 “OpenVR”。
5. 确保你的头显正在使用其原生 OpenXR runtime（或 Virtual Desktop 的 VDXR），而非 SteamVR 的 runtime。

</details>

<aside class="cx cx--warning">

<span class="cx__t">注意</span>

如使用 OpenComposite 时遇到问题，可下载 [原始 DLL](https://github.com/Raptyyy/rapty_ac_vr_guide/raw/refs/heads/main/resources/openvr_api.dll.og)，将其重命名为 “openvr_api.dll”，放回同目录覆盖即可恢复。

</aside>

</details>

<details>
<summary>OpenXR Toolkit</summary>

- 使用 OpenComposite 后，可进一步利用 OpenXR Toolkit，获得额外功能（上采样、注视点渲染、世界比例、视野调整等）。[更多介绍](https://mbucchia.github.io/OpenXR-Toolkit/features.html)  
- [**下载 OpenXR Toolkit**](https://mbucchia.github.io/OpenXR-Toolkit/#downloads)  
- 默认情况下，可通过 Ctrl + F1~F4 操控屏幕菜单，你也可以在 OpenXR Toolkit Companion App 中自定义，[说明](https://mbucchia.github.io/OpenXR-Toolkit/#basic-usage)

<details>
<summary>Toolkit 推荐设置</summary>

- 上采样设为 `FSR`：若需要更多性能，降低比例即可提升性能但画质受损。若想提高清晰度可设为 `CAS` 并使用 70%~100% 强度调整锐化。
- Foveated Rendering 设为 `Preset - Quality - Balanced`：作为起点，再按需调整；`Custom` 可进一步精细调节。
- 外观（Appearance）选项中的 `World Scale` 可解决物体比例失真问题。
- 若佩戴眼镜，可尝试降低 `Field of View (FOV)`，既不会损失性能，又能提升画质。

</details>

</details>

</aside>

## 8. 其他补充

<aside class="cx cx--info">

<span class="cx__t">说明</span>

<aside class="cx cx--info">

<span class="cx__t">Virtual Desktop & Pimax 用户</span>

CSOCSO 撰写了另一份指南，针对 Virtual Desktop 与 Pimax 用户提供了更多细节。可在 [此处查看](https://docs.google.com/document/d/1q-taJt5q9oKWPuCB63rbAC6ZzlZMxqjworgpc10ETDE/edit?tab=t.0)。

</aside>

<details>
<summary>性能</summary>

VR 性能最关键的是保持稳定的帧率。尽可能利用 GPU 资源提升头显分辨率或画质，同时保留足够余量避免帧率波动。可使用游戏内的 Render Stats、SteamVR 性能图、OpenXR Toolkit 高级叠加层或 GPU-Z 等工具监控 GPU / CPU 使用率，按需调整。

部分系统中启用 HAGS（硬件加速 GPU 调度）可能带来性能问题（特别是 Windows 10 或使用 OBS 时），可在 Windows 设置 > 系统 > 显示 > 图形设置中调整，或在开始菜单搜索 “GPU”。修改后需重启系统。

</details>

<details>
<summary>头显调节</summary>

若头显支持 `IPD（瞳距）` 调节，请正确设置以获得最佳画质与真实比例。可参考 [此文档](https://www.vive.com/us/support/vive-xr/category_howto/how-can-i-find-my-ipd.html) 了解测量方法。大多数人约在 60mm ~ 70mm 区间。

若你是近视 / 远视并佩戴眼镜或隐形眼镜，VR 中同样需要佩戴以保持清晰。

视野（Field of View）对 VR 沉浸感影响很大。基本原则是：眼睛越靠近镜片，FOV 越大（受头显自身限制）。佩戴眼镜的用户通常需在 FOV 与舒适度间取舍。

</details>

<details>
<summary>Nvidia 控制面板优化</summary>

<details>
<summary>各向异性过滤</summary>

在 Nvidia 控制面板中设置各向异性过滤可提升纹理质量。参考下图设置：  
<img src="https://github.com/user-attachments/assets/58802765-659f-497d-81f7-e9fd0489795f" width="600">  

</details>

<details>
<summary>MFAA（多帧采样抗锯齿）</summary>

[MFAA](https://www.nvidia.com/en-us/geforce/news/multi-frame-sampled-anti-aliasing-delivers-better-performance-and-superior-image-quality/) 通过在时间与空间维度交错抗锯齿样本来提升 MSAA 的效果。  
4xMFAA（2xMSAA + MFAA）性能消耗与 2xMSAA 相同，但抗锯齿效果等同 4xMSAA。  
需确保在 **Content Manager > Settings > MSAA** 中设置至少 2x MSAA。  
<img src="https://github.com/user-attachments/assets/ea28aeec-ca77-4f4c-b614-32174566e79c" width="600">

</details>

</details>

<details>
<summary>其他优化项</summary>

- 使用覆盖层（如 Discord、Steam、Nvidia）可能会降低 VR 性能，建议在使用 VR 时关闭。
- 在部分程序（Steam、Discord、Spotify 等）开启硬件加速也可能影响性能并额外占用 VRAM，建议关闭硬件加速。

</details>

</aside>

## 9. 进阶调整

<aside class="cx cx--danger">

<span class="cx__t">警告</span>

以下调优仅建议在你了解其作用且知道如何回退的情况下使用，不适合大多数人。

<details>
<summary>CPU Affinity</summary>

#### 在多 CCD AMD CPU（12 或 16 核）上只使用一个 CCD

1. 安装并打开 [Process Lasso](https://bitsum.com/)。
2. 运行 Assetto Corsa（建议窗口模式）。
3. 在 Process Lasso 中找到 acs.exe，右键 > CPU Affinity > Always > Select CPU Affinity。
4. 仅勾选前半部分 CPU 核心（CCD0）。
5. 点击 OK。
6. 让 Process Lasso 随系统启动，在顶部菜单选择 Options > General > Startup options。

若不想使用 Process Lasso，也可选择 [Process Governor](https://github.com/SystemXFiles/process-governor)。

<aside class="cx cx--info">

<span class="cx__t">说明</span>

若要撤销，按第 3 步操作并选择 None，随后禁用 Process Lasso 开机自启。

</aside>

使用不同亲和性设置的性能差异示例（重点观察 0.2% 与 1% 低帧）：  
![CPU Affinity](/images/guides/vr-cpu-affinity.png)  

</details>

<details>
<summary>Nvidia ReBar</summary>

[可在此了解 Nvidia ReBar](https://www.rockpapershotgun.com/what-is-resizable-bar-and-should-you-use-it)。  
确保系统支持并启用 Resizable Bar，具体可参考上文链接。

1. 下载 [Nvidia Profile Inspector](https://github.com/Orbmu2k/nvidiaProfileInspector/releases)。
2. 在 Profiles 下搜索 Assetto Corsa 并选择。
3. 在 5 - Common 中找到 rBAR，将 Feature 设置为 “Enabled”，Size Limit 填入 0x0000000012C00000。
4. 点击右上角 “Apply changes”。

<aside class="cx cx--info">

<span class="cx__t">说明</span>

若需恢复默认，将 rBAR - Feature 设为 “Disabled”，再点击 Apply changes。

</aside>

启用 ReBar 后的性能对比（基准为未启用 ReBar，0x0000000012C00000 约等于 300MB）：  
![Nvidia ReBar](/images/guides/vr-nvidia-rebar.png)  

</details>

</aside>

</details>

</details>

</aside>
