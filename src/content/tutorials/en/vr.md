---
order: 1
category: hardware
title: 'VR Guide'
summary: 'Get VR running under CSP and dial in usable image quality: headset setup, resolution and reprojection, video and CSP presets, and the OpenXR toolchain.'
draft: true
updated: '2026-08-07'
sourceName: 'AssettoCN docs (community)'
---
> **Note**
> For further help or to report a game issue, join the [`Custom Shaders Patch Discord`](https://discord.gg/zN4XtmZ4Jf) and post in the [`virtual-reality-talk`](https://discord.com/channels/453595061788344330/615211984639754260) channel.
>
> This guide is meant to help you get through the basic VR setup and fine-tune the parameters for the best experience.  
> It also covers the use of OpenComposite and OpenXR Toolkit.  
> This guide assumes Content Manager and Custom Shaders Patch; it does not apply to vanilla Assetto Corsa.
> <br> **Special thanks to ItsRaptyyy for letting us reference his guide**

> **Tip**
> Most people only need to read up to "Video settings"; the sections after that cover deeper settings that not everyone needs.

## 1. Prerequisites

<aside class="cx cx--info">

<span class="cx__t">Info</span>

- Assetto Corsa v1.16.3/4 (64-bit only), installed via Steam.
- The latest version of Content Manager.
- Unless stated otherwise, make sure you're on the latest Custom Shaders Patch.
- The latest Pure (gives the best image quality in VR).

</aside>

## 2. Basic VR setup

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<aside class="cx cx--tip">

<span class="cx__t">Tip</span>

Click the heading matching your headset brand to expand its instructions; you only need to use one of the methods.

</aside>

<details>
<summary>Oculus / Meta</summary>

<details>
<summary>**Oculus (simple setup)**</summary>

This is the simplest method, and the one recommended for most users.

1. Make sure you've successfully set up Quest Link or Air Link and connected the headset to your PC — [tutorial](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)  
1.1 If you're on an Oculus Rift (S), just make sure the headset is connected and shows up in the Oculus App.
2. In the Oculus App, go to **Settings > General**, enable "Unknown sources", and next to "OpenXR Runtime" click "Set Oculus as active" (nothing to do if the button is greyed out).
3. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "Oculus Rift".

**This method does not require SteamVR.**

</details>

<details>
<summary>**OpenComposite (best performance)**</summary>

The experience is similar to native Oculus, but you can use OpenXR Toolkit.  
It can deliver better performance.  
Better suited to advanced users.

1. Make sure you've successfully set up Quest Link or Air Link and connected the headset to your PC — [tutorial](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)  
   1.1 If you're on an Oculus Rift (S), just make sure the headset is connected and shows up in the Oculus App.
2. In the Oculus App, go to **Settings > General**, enable "Unknown sources", and next to "OpenXR Runtime" click "Set Oculus as active" (nothing to do if the button is greyed out).
3. Install OpenComposite, [steps](#7-opencomposite-and-openxr-toolkit).
4. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

After using this method, read more about [OpenXR Toolkit](#7-opencomposite-and-openxr-toolkit).

</details>

<details>
<summary>**Virtual Desktop**</summary>

Virtual Desktop has the potential for a better experience, but it's paid software.

1. Buy Virtual Desktop from the Oculus / Meta store (not on Steam).
2. Follow Virtual Desktop's instructions to connect the headset to your PC (no Quest / Air Link needed).
3. Open Virtual Desktop Streamer and set the OpenXR runtime to VirtualDesktopXR (VDXR) in its settings.
4. Install OpenComposite, [steps](#7-opencomposite-and-openxr-toolkit).
5. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

</details>

<details>
<summary>**SteamVR**</summary>

Generally not recommended.

1. Make sure you've successfully set up Quest Link or Air Link and connected the headset to your PC — [tutorial](https://www.meta.com/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)  
1.1 If you're on an Oculus Rift (S), just make sure the headset is connected and shows up in the Oculus App.
2. Install and set up SteamVR from Steam.
3. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

</details>

<details>
<summary>Oculus / Meta extra notes and troubleshooting {open}</summary>

- If you connect over USB with Quest Link (wired), set the encoding bitrate to 500 Mbps or higher in the Oculus Debug Tool. More info: [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/).
- If the game stutters when using the headset wirelessly: your router may not meet the high bandwidth demand, usually showing up as high network latency. Lower the bitrate in the [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/), or set it to 0 (automatic bitrate).
- When using USB-C, make sure the headset runs at USB 3 rather than USB 2 speed (roughly 1.5 Gbps or higher). If it still shows as USB 2 even with a new cable and a USB 3 port, a factory reset of the headset can fix it.

</details>

</details>

<details>
<summary>SteamVR headsets (Vive, Index, Bigscreen Beyond)</summary>

<details>
<summary>**Native SteamVR** {open}</summary>

1. Make sure the headset is connected to your PC.
2. Install and set up SteamVR from Steam.
3. Some headsets may need extra drivers or tools to work correctly; follow the manufacturer's instructions.
4. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

</details>

</details>

<details>
<summary>Windows Mixed Reality headsets</summary>

<details>
<summary>**Using the Oasis SteamVR driver (recommended)** {open}</summary>

- 1. Make sure the headset is connected to your PC.
- 2. [Install the Oasis driver for Windows Mixed Reality](https://store.steampowered.com/app/3824490/Oasis_Driver_for_Windows_Mixed_Reality/).
- 3. [Follow the Oasis driver instructions](https://github.com/mbucchia/Oasis-Driver-for-Windows-Mixed-Reality/wiki#hello-and-welcome-to-the-oasis-driver-for-windows-mixed-reality-documentation).
- 4. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

<details>
<summary>**Using OpenComposite**</summary>

<aside class="cx cx--warning">

<span class="cx__t">Only use this option if the Oasis SteamVR driver doesn't work for you.</span>

5. Make sure the headset is connected to your PC.
6. Install and set up Windows Mixed Reality from the Microsoft Store.
7. Install and set up OpenXR Tools for Windows Mixed Reality from the Microsoft Store.
8. If you see a "Set as active runtime" button, click it.
9. [Install OpenComposite](#7-opencomposite-and-openxr-toolkit).
10. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".  
    With this method you can also explore [OpenXR Toolkit](#7-opencomposite-and-openxr-toolkit).

</aside>

<details>
<summary>Pimax headsets</summary>

<details>
<summary>**Using OpenComposite (recommended)**</summary>

1. Make sure the headset is connected to your PC.
2. [Install and set up Pimax Play](https://pimax.com/pages/downloads-manuals).
3. [Set the OpenXR Runtime to Pimax OpenXR in Pimax Play](https://pimax.com/blogs/blogs/how-to-use-pimax-openxr).
4. [Install OpenComposite](#7-opencomposite-and-openxr-toolkit).
5. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

With this method you can also explore [OpenXR Toolkit](#7-opencomposite-and-openxr-toolkit).

</details>

<details>
<summary>**Using SteamVR**</summary>

1. Make sure the headset is connected to your PC.
2. [Install and set up Pimax Play](https://pimax.com/pages/downloads-manuals).
3. Install and set up SteamVR from Steam.
4. In Content Manager, go to **Settings > Assetto Corsa > Video** and set "Rendering Mode" to "OpenVR".

</details>

</details>

</details>

## 3. Resolution and reprojection

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<details>
<summary>Resolution</summary>

Unlike a monitor, a VR headset has no "native resolution", because [barrel distortion](https://github.com/user-attachments/assets/cc384ebe-96b5-4272-a26b-cf7a3eb14afe) reduces detail in the centre of the image. To counter this you need supersampling (raising the render resolution).  
The key is to push the resolution as high as performance allows.  
Start at 100% or 1.0× resolution (also called Render Scale), then adjust for image quality and performance.  
On some headsets (e.g. Pimax) 100% is already a very high resolution and may need lowering for performance.

<aside class="cx cx--info">

<span class="cx__t">**Oculus / Meta**</span>

Adjust in the Oculus App (Settings > Graphics Preference > Render Resolution), or via Pixels Per Display Pixel Override in the [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/).

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Steam VR**</span>

Adjust in SteamVR settings > Video > Render resolution (set to Custom).

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Windows Mixed Reality**</span>

Adjust in OpenXR Tools for Windows Mixed Reality (Custom Render Scale).

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Pimax**</span>

Adjust in the Pimax Play software (Render Quality).

</aside>

<aside class="cx cx--warning">

<span class="cx__t">Note</span>

The Resolution under **Settings > Assetto Corsa > Video** in Content Manager does not affect VR resolution.

</aside>

</details>

<details>
<summary>Reprojection</summary>

Reprojection smooths the experience by rendering fewer real frames and extrapolating the ones in between — essentially like frame generation.  
For example: on a 90 Hz headset the PC only needs to render 45 FPS, and reprojection generates the rest.  
However, reprojection can cause artifacts, input latency, or stutter when it switches on and off.

<aside class="cx cx--info">

<span class="cx__t">**Oculus / Meta**</span>

Set via "PC Asynchronous Spacewarp" in the [Oculus Debug Tool](https://smartglasseshub.com/oculus-debug-tool/) (note the Debug Tool sometimes ignores this setting).  
Alternative: download [this archive](https://github.com/Raptyyy/rapty_ac_vr_guide/raw/refs/heads/main/resources/oculus%20asw%20enable%20disable%20registry.zip), run "oculus disable asw.reg" to turn ASW off, or "oculus enable asw.reg" to turn it on.

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Steam VR**</span>

Set in SteamVR settings (Video > Motion Smoothing).

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Windows Mixed Reality**</span>

Set in OpenXR Tools for Windows Mixed Reality (Motion Reprojection Rate).

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Pimax**</span>

Set in the Pimax Play software (Smart Smoothing).

</aside>

<aside class="cx cx--info">

<span class="cx__t">Info</span>

Any headset using OpenComposite with OpenXR Toolkit enabled can also adjust resolution and reprojection directly in OpenXR Toolkit.

</aside>

</details>

</aside>

## 4. Video and CSP Presets

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<aside class="cx cx--warning">

<span class="cx__t">Note</span>

Save a preset of your current Video and Custom Shaders Patch settings in Content Manager!

</aside>

<details>
<summary>Video presets</summary>

If you'd rather not read the detailed sections below, try these presets and find what works for you. They're made by [Raptyyy](https://github.com/Raptyyy) and can be tweaked to taste.  
Be sure to double-check that **Rendering Mode** matches your headset setup!

- High performance: [link](https://acstuff.club/s/lW4B) (if you still need performance, turn off Post Processing)
- Balanced: [link](https://acstuff.club/s/oFw)
- High quality: [link](https://acstuff.club/s/hPvJ) (for the best image quality, choose a high-quality post-processing filter)

<aside class="cx cx--tip">

<span class="cx__t">Tip</span>

You don't need a framerate limiter in VR, since the framerate locks to the headset's refresh rate automatically. Enabling an FPS limiter can actually cause performance problems.

</aside>

</details>

<details>
<summary>CSP presets</summary>

These presets are mainly a starting point for personal preference. Try them first, then adjust as needed.

- High performance - [link](https://acstuff.club/s/Ozx3) (many modules are disabled for performance)
- Balanced - [link](https://acstuff.club/s/PaP3)
- High quality - [link](https://acstuff.club/s/J0Je)

<aside class="cx cx--warning">

<span class="cx__t">Note</span>

Foveated Rendering / Nvidia VRS is not enabled in these presets; see the [Foveated Rendering section](#5-what-is-foveated-rendering).

</aside>

</details>

</aside>

## 5. What is Foveated Rendering

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<aside class="cx cx--warning">

<span class="cx__t">Note</span>

Note: because Assetto Corsa is a DirectX 11 game, Foveated Rendering only works on Nvidia 16xx, 20xx, 30xx, 40xx series or newer GPUs.

</aside>

Foveated Rendering improves performance by lowering the render resolution in the peripheral areas of the image, as shown below.  
This matches how VR headsets work, since only the centre of the lens is in focus and shows clearly.  
Foveated Rendering is one of the most effective ways to boost GPU performance in VR, and is strongly recommended.  
Some headsets with eye tracking can support dynamic Foveated Rendering (more information in the future).

![Foveated Rendering](/images/guides/vr-foveated-rendering.jpg)

<aside class="cx cx--tip">

<span class="cx__t">Tip</span>

On pancake-lens headsets with a large sweet spot (e.g. Quest 3 or Pico 4), the visual difference from Foveated Rendering is more noticeable, so set a larger central area.

</aside>

<aside class="cx cx--info">

<span class="cx__t">**Ways to enable Foveated Rendering (choose only one):**</span>

- Enable `Nvidia VRS` in Custom Shaders Patch, [see](#4-video-and-csp-presets) (recommended for most users).
- If using OpenComposite, enable `Foveated Rendering` in `OpenXR Toolkit`, [see](#7-opencomposite-and-openxr-toolkit) (more customization options, for advanced users).
- Pimax users can enable `Foveated Rendering` in `Pimax Play` (easier to set up, but less customizable than OpenXR Toolkit).

</aside>

</aside>

## 6. Video / CSP settings in detail

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<details>
<summary>Video settings</summary>

The following covers all the options under Content Manager > Settings > Video.

<aside class="cx cx--info">

<span class="cx__t">Info</span>

In Content Manager > Video, most options have a **`!`** icon next to them that explains the setting and its performance impact.

</aside>

<details>
<summary>Resolution and framerate</summary>

- **Rendering Mode**: choose the correct mode based on the headset setup section above.
- **Fullscreen**: enabling it gives a slight performance gain in VR; recommended `Enabled`, but not required.
- **Resolution**: only affects the desktop window size; no effect on VR image quality.
- **Virtual synchronization**: not needed, leave `Disabled`.
- **Limit framerate**: the headset refresh rate already caps it in VR, leave `Disabled`.

</details>

<details>
<summary>Quality</summary>

- **MSAA**: multisample anti-aliasing; noticeably reduces aliasing and shimmering in the distance. Recommended `2x` or `4x`; `8x` is costly.
- **Anisotropic Filtering**: recommended `16x`, almost no performance cost.
- **World details**: adjusts the number of track objects (depends on track support); set to taste. Adjustable in-game via the "View & Video Settings" app.
- **Shadows resolution**: affects shadow sharpness. Recommended baseline `1024x1024`; raise it if performance allows.
- **Smoke generation**: controls the amount of smoke; adjust as needed. Prefer CSP smoke (Custom Shaders Patch > Particles FX > New smoke and dust).

</details>

<details>
<summary>Reflections</summary>

- **Reflection Resolution**: reflection clarity. Recommended starting at `512x512`.
- **Rendering frequency**: reflection refresh rate. Recommended `two faces per frame`; higher rates give little benefit and hurt performance. Do not set it to Static, or it will cause problems with Pure.
- **Rendering distance**: reflection render distance; little performance impact, set to `at least 1000m`.

</details>

<details>
<summary>Post-Processing</summary>

- **Enable post-processing effects**: master switch for post-processing. Noticeably improves visuals but is costly. Most PCs can leave it `Enabled`; on heavy servers you can set `Disabled`.
- **Overall Quality**: post-processing resolution. `High` is the balance point between performance and quality; you can also use `Maximum`.
- **Glare Quality**: `High` or `Maximum` are both fine.
- **Depth of field**: only applies in replays; set to `Off` if you don't care about it.
- **Motion blur**: not recommended in VR, set to `Off`.
- **Saturation**: keep at `100%`; fine-tune inside Pure if needed.
- **Heat shimmering**: heat-haze distortion; toggle as you like.
- **Sunrays**: sun rays / god rays; toggle as you like.
- **FXAA**: keep `Enabled` so certain CSP features work correctly (no effect on VR image quality).

</details>

<details>
<summary>Mirrors</summary>

- **Mirror resolution**: mirror clarity. Higher resolutions cost performance; recommended starting at `256x1024`.
- **High quality**: adds in-mirror effects and increases render distance (from 400m to 800m); recommended `Enabled`.

</details>

<details>
<summary>Oculus (affects Oculus / Meta headsets only)</summary>

- **Pixels per display**: the same as the resolution scaling in the Oculus App; adjust as needed.
- **Mirror texture**: shows the VR view in the desktop window; recommended `Enabled`.

</details>

<details>
<summary>System</summary>

**Changing these settings is not recommended — they do little and can cause problems.**

</details>

</details>

<details>
<summary>CSP settings</summary>

The following covers the options under Content Manager > Settings > Custom Shaders Patch that relate to VR performance.

<aside class="cx cx--info">

<span class="cx__t">Info</span>

Not every CSP item is discussed here — only the parts relevant to VR performance.

</aside>

<details>
<summary>General Patch Settings</summary>

- **Audio > Decompress Samples**: recommended `Enabled`; trades more memory for lower CPU load.
- **New KN5 loader**: recommended `Enabled`; lowers RAM / VRAM usage.

</details>

<details>
<summary>CPU optimizations</summary>

- **Flatten nodes**: leave `Enabled`.
- **Chunks optimization**: eases CPU load. Recommended `Advanced`; drop to `Basic` if you get issues like a black screen.
- **Limit audio for other cars**: set to `Always` if your PC is slow.
- **Apply Hyperthreading fix**: strongly recommended `Enabled`; helps CPUs with HT / SMT. May not apply to 4- or 2-core CPUs. (Requires CSP 0.2.7 / 0.2.8 preview or newer)

</details>

<details>
<summary>GPU optimizations:</summary>

- **Optimize meshes some more**: recommended `Enabled`; lowers GPU load.
- **Deduplicate meshes**: recommended `Enabled`; reduces VRAM usage.
- **Upgrade AC textures**: recommended `Enabled`; improves load times and lowers VRAM usage, but uses more disk space (usually under 5GB).
- **Deduplicate textures**: may lower VRAM usage, but can cause graphical issues or crashes; use with caution — in most cases recommended `Disabled`.

</details>

<details>
<summary>Extra FX</summary>

Extra FX has no effect in VR; leave it `Disabled` if you don't use it.

</details>

<details>
<summary>GUI</summary>

- **New driver tags**: recommended `Enabled`; shows driver names in VR, very handy.
- **Font Scale**: raise to `125%` or higher if text is hard to read.

</details>

<details>
<summary>Graphics Adjustments</summary>

- **AMD FidelityFX SuperResolution (FSR)**: an upsampling option; useful on low-end PCs for performance, or accessible via OpenXR Toolkit.
<br>
<br>
**LOD settings:**

- **Force low-res drivers for other cars in first person view**: recommended `Enabled`; improves performance.
- **Multiplier for car LODs**: controls the distance at which car LODs switch. Lowering it improves performance but reduces close-up quality. Can be set to `75%`.
- **Multiplier for track LODs**: for tracks; don't go below `80%` to avoid problems.
- **Multiplier for trees LODs**: for 3D trees. If you don't care about 3D trees, set `0%` (forces 2D); otherwise keep `100%`.
- **Add extra collider-based LODs for distant cars**: generates low-quality LODs for cars that lack them; very useful on dense servers (e.g. VDC), recommended `Enabled`. Set "Limit LODless cars" to 5–10 for best performance.
<br>
<br>

- **Post processing antialiasing**: set `Disabled`; post-process AA has no effect in VR (this note will be updated if that changes).
- **Accessible color buffer > Full resolution for better quality**: set `Disabled` for a small performance gain.
- **Draw grooves over track, but before dynamic entities**: may improve performance, but causes mirror or perspective issues on some tracks; use with caution.

</details>

<details>
<summary>Lighting FX</summary>

- **Cars casting lights**: recommended lowering to `5`; significantly reduces cost in dense lobbies.
- **Disable mirroring in first person view**: recommended `Enabled`; a small performance gain.
- **Enable lighting in reflections**: recommended `Disabled`; reduces cost.

</details>

<details>
<summary>Neck FX</summary>

Not performance-related, but can improve immersion or comfort. Common scripts:
- [AC Head Physics](https://www.overtake.gg/downloads/ac-head-physics.68266) — flashier, with more movement.
- [NeckFX LUA script](https://www.overtake.gg/downloads/neckfx-lua-script-vr-stabilize.65087) — more basic and stable.

</details>

<details>
<summary>Smart Mirror</summary>

- **Custom render distance**: if High Quality mirrors is enabled in Video settings, recommended `Enabled` with distance set to 400m for performance.
- **Real mirrors**: strongly recommended in VR; the view changes with head movement, and you can adjust mirrors via the "Car Mirrors" app (install "App Shelf" in-game first).
  - **Active**: `Enabled`
  - **Alter FOV**: automatically adjusts the mirror view by distance; set to taste, personally `Disabled`
  - **Refresh rate per frame**: recommended `Update single reflection per frame` for performance; raise it a bit if it looks choppy on a low-refresh headset.

</details>

<details>
<summary>Weather FX</summary>

- **Weather style**: recommended `Pure Gamma` or `Pure LCS`. Currently `Pure Gamma` is recommended for better performance; `Pure LCS` looks better but can cause issues.
- **Replace YEBIS with lightweight alternative**: a lighter post-processing implementation that saves CPU / GPU; recommended `Enabled`. But it's incompatible with some filters (e.g. C13) and can make glare too strong.
- **Automatically guess white reference point**: makes the UI very bright when using Pure; recommended `Disabled`.

</details>

<details>
<summary>Mode Tweaks VR:</summary>

- **Make sure the extension (Active) is enabled**
- **Single Pass Stereo**: strongly recommended `Enabled`, especially when CPU-limited. It merges rendering for both eyes into a single pass, greatly reducing CPU load. May affect some Pure shaders.
- **Single YEBIS pass**: optionally `Enabled`; runs post-processing once for both eyes to improve performance. May make glare look slightly off.

</details>

<details>
<summary>Nvidia VRS</summary>

Also known as [Foveated Rendering](#5-what-is-foveated-rendering), Nvidia GPUs only. To use Nvidia VRS (requires Single Pass Stereo enabled):
- **Nvidia VRS**: `Enabled`
- **VRS preset**: `Custom`
- **VRS rate**: `High performance`; if you really need performance set `Highest performance`, but the visual difference is more noticeable.
- **VRS detailed area**: `Balanced`; on Quest 3 or Pico 4 you can set `Wide` to reduce the visible resolution difference.  
  You can also try the preset options to see what suits you better.
  
**You can adjust these settings (and more) in-game in real time with the VR Tweaks app: [`VR Tweaks`](https://www.overtake.gg/downloads/vr-tweaks.76283/)**

- **Corners masking optimization**: recommended `Enabled`. Also called Hidden Area Mesh; it avoids rendering the area hidden by the lenses, improving efficiency. Turn it off if you don't like the black edges in the VR image (PC window).
- **Custom VR HUD rendering**: not performance-related, but recommended `Enabled`; makes the HUD work better in VR. Adjust the HUD with the VR Tweaks app mentioned above.

</details>

</details>

</aside>

## 7. OpenComposite and OpenXR Toolkit

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<details>
<summary>OpenComposite</summary>

- Converts OpenVR games to OpenXR, so that most headsets don't need SteamVR (except SteamVR headsets); strongly recommended for users chasing performance.
- On Rift, Quest, Pimax, WMR and similar headsets, SteamVR is just an extra layer that adds overhead without helping.
- When using Virtual Desktop with VDXR, OpenComposite also applies, [details](https://github.com/mbucchia/VirtualDesktop-OpenXR/wiki).

<aside class="cx cx--danger">

<span class="cx__t">Warning</span>

Using OpenComposite on headsets that inherently rely on SteamVR (Vive, Index, Beyond) still can't bypass SteamVR (the headset itself needs it). It does, however, give you access to OpenXR Toolkit.
  
Standalone Pico headsets have no native OpenXR runtime; to bypass SteamVR you need Virtual Desktop + VDXR + OpenComposite.

</aside>

<details>
<summary>Installing OpenComposite:</summary>

1. Download the OpenComposite DLL from either link:  
   A. [this repo](https://github.com/Raptyyy/rapty_ac_vr_guide/raw/refs/heads/main/resources/openvr_api.dll)  
   B. [OpenComposite mirror](https://znix.xyz/OpenComposite/download.php?arch=x64&branch=openxr)
2. Make sure the file is named "openvr_api.dll" (rename it if not).
3. Place the file in **steamapps\common\assettocorsa\system\x64**, and choose to overwrite if prompted.
4. In **Content Manager > Settings > Video**, set "Rendering Mode" to "OpenVR".
5. Make sure your headset is using its native OpenXR runtime (or Virtual Desktop's VDXR), not SteamVR's runtime.

</details>

<aside class="cx cx--warning">

<span class="cx__t">Note</span>

If you run into problems with OpenComposite, download the [original DLL](https://github.com/Raptyyy/rapty_ac_vr_guide/raw/refs/heads/main/resources/openvr_api.dll.og), rename it to "openvr_api.dll", and put it back in the same folder (overwrite) to restore.

</aside>

</details>

<details>
<summary>OpenXR Toolkit</summary>

- After using OpenComposite, you can take advantage of OpenXR Toolkit for extra features (upsampling, foveated rendering, world scale, FOV adjustment, etc.). [More info](https://mbucchia.github.io/OpenXR-Toolkit/features.html)  
- [**Download OpenXR Toolkit**](https://mbucchia.github.io/OpenXR-Toolkit/#downloads)  
- By default you control the on-screen menu with Ctrl + F1–F4; you can also customize this in the OpenXR Toolkit Companion App, [instructions](https://mbucchia.github.io/OpenXR-Toolkit/#basic-usage)

<details>
<summary>Recommended Toolkit settings</summary>

- Set upsampling to `FSR`: lower the ratio for more performance at the cost of quality. For more sharpness, use `CAS` and tune sharpening at 70%–100% strength.
- Set Foveated Rendering to `Preset - Quality - Balanced` as a starting point, then adjust; `Custom` allows finer tuning.
- The `World Scale` option under Appearance can fix distorted object scale.
- If you wear glasses, try lowering `Field of View (FOV)` — no performance loss, and better image quality.

</details>

</details>

</aside>

## 8. Extras

<aside class="cx cx--info">

<span class="cx__t">Info</span>

<aside class="cx cx--info">

<span class="cx__t">Virtual Desktop & Pimax users</span>

CSOCSO wrote another guide with more detail for Virtual Desktop and Pimax users. Read it [here](https://docs.google.com/document/d/1q-taJt5q9oKWPuCB63rbAC6ZzlZMxqjworgpc10ETDE/edit?tab=t.0).

</aside>

<details>
<summary>Performance</summary>

The most important thing for VR performance is a stable framerate. Use as much of the GPU as you can to raise headset resolution or quality, while keeping enough headroom to avoid framerate swings. Monitor GPU / CPU usage with in-game Render Stats, the SteamVR performance graph, the OpenXR Toolkit advanced overlay, or tools like GPU-Z, and adjust as needed.

On some systems, enabling HAGS (Hardware-Accelerated GPU Scheduling) can cause performance problems (especially on Windows 10 or when using OBS). Toggle it in Windows Settings > System > Display > Graphics settings, or search "GPU" in the Start menu. A restart is required after changing it.

</details>

<details>
<summary>Headset adjustment</summary>

If your headset supports `IPD (interpupillary distance)` adjustment, set it correctly for the best image quality and realistic scale. See [this document](https://www.vive.com/us/support/vive-xr/category_howto/how-can-i-find-my-ipd.html) for how to measure it. Most people fall in the 60mm–70mm range.

If you're near- or far-sighted and wear glasses or contacts, you'll need them in VR too to stay sharp.

Field of View greatly affects VR immersion. The basic rule: the closer your eyes are to the lenses, the larger the FOV (within the headset's own limits). Glasses wearers usually have to trade off FOV against comfort.

</details>

<details>
<summary>Nvidia Control Panel tweaks</summary>

<details>
<summary>Anisotropic filtering</summary>

Setting anisotropic filtering in the Nvidia Control Panel improves texture quality. Use the settings shown below:  
<img src="https://github.com/user-attachments/assets/58802765-659f-497d-81f7-e9fd0489795f" width="600">  

</details>

<details>
<summary>MFAA (Multi-Frame Sampled Anti-Aliasing)</summary>

[MFAA](https://www.nvidia.com/en-us/geforce/news/multi-frame-sampled-anti-aliasing-delivers-better-performance-and-superior-image-quality/) improves on MSAA by interleaving anti-aliasing samples across time and space.  
4xMFAA (2xMSAA + MFAA) costs the same as 2xMSAA but looks like 4xMSAA.  
Make sure to set at least 2x MSAA under **Content Manager > Settings > MSAA**.  
<img src="https://github.com/user-attachments/assets/ea28aeec-ca77-4f4c-b614-32174566e79c" width="600">

</details>

</details>

<details>
<summary>Other tweaks</summary>

- Overlays (Discord, Steam, Nvidia) can lower VR performance; turn them off while using VR.
- Hardware acceleration in some apps (Steam, Discord, Spotify, etc.) can also hurt performance and use extra VRAM; turn hardware acceleration off.

</details>

</aside>

## 9. Advanced tuning

<aside class="cx cx--danger">

<span class="cx__t">Warning</span>

The tweaks below are only recommended if you understand what they do and how to undo them; they're not for most people.

<details>
<summary>CPU Affinity</summary>

#### Use only one CCD on multi-CCD AMD CPUs (12 or 16 cores)

1. Install and open [Process Lasso](https://bitsum.com/).
2. Run Assetto Corsa (windowed mode recommended).
3. Find acs.exe in Process Lasso, right-click > CPU Affinity > Always > Select CPU Affinity.
4. Tick only the first half of the CPU cores (CCD0).
5. Click OK.
6. Have Process Lasso start with the system: top menu > Options > General > Startup options.

If you'd rather not use Process Lasso, there's also [Process Governor](https://github.com/SystemXFiles/process-governor).

<aside class="cx cx--info">

<span class="cx__t">Info</span>

To undo, repeat step 3 and choose None, then disable Process Lasso's autostart.

</aside>

Example of the performance difference with different affinity settings (focus on the 0.2% and 1% lows):  
![CPU Affinity](/images/guides/vr-cpu-affinity.png)  

</details>

<details>
<summary>Nvidia ReBar</summary>

[Read about Nvidia ReBar here](https://www.rockpapershotgun.com/what-is-resizable-bar-and-should-you-use-it).  
Make sure your system supports and has Resizable Bar enabled; see the link above.

1. Download [Nvidia Profile Inspector](https://github.com/Orbmu2k/nvidiaProfileInspector/releases).
2. Search for Assetto Corsa under Profiles and select it.
3. Under 5 - Common, find rBAR, set Feature to "Enabled", and enter 0x0000000012C00000 in Size Limit.
4. Click "Apply changes" in the top right.

<aside class="cx cx--info">

<span class="cx__t">Info</span>

To restore defaults, set rBAR - Feature to "Disabled" and click Apply changes.

</aside>

Performance comparison with ReBar enabled (baseline is ReBar disabled; 0x0000000012C00000 is roughly 300MB):  
![Nvidia ReBar](/images/guides/vr-nvidia-rebar.png)  

</details>

</aside>
