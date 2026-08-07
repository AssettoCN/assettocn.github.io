---
order: 3
category: visuals
title: 'Pure Config 设置详解'
summary: 'Pure Config 里每个标签页、每项设置的含义速查。'
draft: true
sourceName: 'AssettoCN 文档(社区整理)'
---
本页面将列出 Pure Config 中包含的所有功能及其说明。

## 主标签页

### 质量预设（地面雾）

| 属性                    | 低 | 中 | 高  | 极高  |
| ----------------------- | --- | ------ | ----- | ---------- |
| 地面雾                   | ❌  | ✅     | ✅   | ✅        |
| 质量                     | ❌  | ✅     | ✅   | ✅        |
| 渲染距离             | ❌  | 🟠     | ✅   | ✅        |
| 车辆湍流             | ❌  | ❌     | ❌   | ✅        |

### Pure 检查清单

可能影响 Pure 功能的配置错误的设置。

| 设置                                | 描述                                                                                                        |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 推荐的 CSP 设置               | 不会破坏 Pure 但可能降低视觉质量的设置。                                                      |
| 重置 weatherFX 系统                 | 重启 Custom Shaders Patch 中的 WeatherFX 扩展，可能修复视觉问题。                             |
| 重置为默认值                      | 将 Pure Config 和 PurePP 应用中的所有设置重置为默认值。                                    |
| config.video_mode_separation           | 根据视频设置中选择的渲染模式，允许不同的 Pure Config 设置。                  |
| config.track_specific_loading          | 根据当前播放的赛道，允许不同的 Pure Config 设置。                               |
| config.track_specific_video_separation | 根据渲染模式和赛道，允许不同的 Pure Config 设置。                                  |

## AI 标签页

| 设置                       | 描述                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `AI_headlights.sun`           | 如果太阳角度低于设定值，则启用 AI 大灯。                                                                  |
| `AI_headlights.ambient_light` | 如果环境光照低于设定值，则启用 AI 大灯。                                                           |
| `AI_headlights.CBE`           | 如果估算的立方体贴图亮度（本质上是反射）低于此值，则启用 AI 大灯。                       |
| `AI_headlights.fog`           | 如果雾的密度高于设定值，则启用 AI 大灯。                                                                  |
| `AI_headlights.rain`          | 如果降雨强度高于此值，则启用 AI 大灯。                                                          |
| `Activate Headlight Control`  | 必须在 Content Manager -> 设置 -> Custom Shaders Patch -> WeatherFX 中启用"自动开启/关闭大灯"。 |

## 光照标签页

| 设置                                   | 描述                                                                                 | 类型/范围 |
| ------------------------------------- | ------------------------------------------------------------------------------------ | --------- |
| `light.daylight_multiplier`               | 影响日光整体亮度的倍数                                       | `0 .. 10`  |
| `light.sun.hue`                           | 所有光源的主导波长颜色                                                 | `±180`     |
| `light.sun.saturation`                    | 屏幕上颜色的强度                                                | `0 .. 10`  |
| `light.sun.level`                         | 阳光在所有材质上的亮度                                                 | `0 .. 10`  |
| `light.sun.specular`                      | 光滑材质反射阳光的强度                                             | `0 .. 10`  |
| `light.ambient_model_V2`                  | Pure 是否使用单一环境光照或平铺环境光照                   | `bool`     |
| `light.ambient.hue`                       | 环境光照的主导波长                                             | `±180`     |
| `light.ambient.saturation`                | 环境光照颜色的强度                                     | `0 .. 10`  |
| `light.ambient.level`                     | 环境光照的整体亮度                                                  | `0 .. 10`  |
| `light.advanced_ambient_light`            | 似乎与上述设置非常相似                                            | `0 .. 10`  |
| `light.advanced_ambient_lightV2_sun`      | 太阳影响环境光照亮度的程度                                 | `0 .. 10`  |
| `light.advanced_ambient_lightV2_skydomes` | 天空穹顶影响环境光照亮度的程度                                 | `0 .. 10`  |
| `light.advanced_ambient_lightV2_sky`      | 天空影响环境光照亮度的程度                                 | `0 .. 10`  |
| `light.advanced_ambient_lightV2_clouds`   | 云层影响环境光照亮度的程度                               | `0 .. 10`  |
| `light.advanced_ambient_lightV2_nlp`      | 夜间光污染影响环境光照亮度的程度               | `0 .. 10`  |
| `light.advanced_ambient_lightV2_fog`      | 雾影响环境光照亮度的程度                                 | `0 .. 10`  |
| `light.advanced_ambient_lightV2_vao_exp`  | VAO 曝光影响环境光照亮度的程度                        | `0 .. 10`  |
| `light.distant_ambient.hue`               | 环境光照的主导波长                                             | `±180`     |
| `light.distant_ambient.saturation`        | 远处环境光照颜色的强度                                       | `0 .. 10`  |
| `light.distant_ambient.level`             | 远处环境光照的亮度                                                      | `0 .. 10`  |
| `light.distant_ambient.distance`          | "远处"的距离（越低越近）                                          | `0 .. 10`  |
| `light.directional_ambient.hue`           | 方向性环境光照的主导波长（在阴影中最明显）        | `±180`     |
| `light.directional_ambient.saturation`    | 方向性环境光照颜色的强度（在阴影中最明显） | `0 .. 10`  |
| `light.directional_ambient.level`         | 方向性环境光照的整体亮度（在阴影中最明显）         | `0 .. 10`  |
| `shadows.presence`                        | 阴影是否在所有地方渲染或在实际阴影区域渲染                       | `0 .. 1`   |
| `csp_lights.bounce`                       | CSP 光线在淡出前弹跳的距离                                      | `0 .. 10`  |
| `csp_lights.emissive`                     | CSP 发光体的亮度（如路灯中心）                           | `0 .. 10`  |
| `csp_lights.displays`                     | CSP 显示屏的亮度（如仪表盘、转速表）                                    | `0 .. 10`  |
| `reflections.saturation`                  | 所有反射颜色的强度                                           | `0 .. 10`  |
| `reflections.level`                       | 所有反射的整体亮度                                                      | `0 .. 10`  |
| `reflections.emissive_boost`              | 发光体在反射中的亮度（如路灯）                    | `0 .. 30`  |
| `vao.amount`                              | 顶点数组对象的数量（越多 = 阴影越暗）                           | `0 .. 2`   |
| `vao.track_exponent`                      | 赛道上顶点数组对象的倍数（越多 = 赛道上阴影越暗）                     | `0 .. 2`   |
| `vao.dynamic_exponent`                    | 相同设置但为动态，似乎修改远处和反射阴影             | `0 .. 2`   |
| `ui.white_reference_point`                | 无明显变化                                                                       | `0 .. 10`  |

## 夜晚标签页

| 设置                    | 描述                                         | 类型/范围 |
| ---------------------- | ------------------------------------------- | --------- |
| `nlp.level`                | 夜间光污染的亮度             | `0 .. 10`  |
| `nlp.density`              | 夜间光污染的密度              | `0 .. 10`  |
| `nlp.lowest_ambient`       | 夜间光污染环境的最低值   | `0 .. 10`  |
| `moon.light`               | 月光的亮度                        | `0 .. 10`  |
| `moon.appearance`          | 月亮的显示亮度                     | `0 .. 10`  |
| `stars.appearance`         | 星星的显示亮度                    | `0 .. 100` |
| `stars.dynamic_adaptation` | 启用星星的动态适应                    | `bool`     |

## 天空标签页

| 设置                   | 描述                             | 类型/范围 |
| --------------------- | -------------------------------- | --------- |
| `light.sky.hue`           | 天空的主导波长      | `±180`     |
| `light.sky.saturation`    | 天空颜色的强度         | `0 .. 10`  |
| `light.sky.level`         | 天空的亮度                   | `0 .. 10`  |
| `sky.sun_disk.hue`        | 太阳光晕的主导波长  | `±180`     |
| `sky.sun_disk.saturation` | 太阳光晕颜色的强度 | `0 .. 10`  |
| `sky.sun_disk.level`      | 太阳光晕的亮度               | `0 .. 10`  |
| `sun.sun_moon_size`       | 太阳/月亮的显示大小      | `0 .. 10`  |

## 云层标签页

| 设置                            | 描述                                                   | 类型/范围  |
| ------------------------------ | ------------------------------------------------------ | ---------- |
| `clouds_render.method`             | 0 = 3D 广告牌云 1 = 360° 天空穹顶                      | `0 .. 1`    |
| `default_16k`                      | Pure 提供的默认天空穹顶集                      | -           |
| `clouds2D.crossfade_time`          | 天空穹顶交叉淡入下一个的速度      | `1 .. 60`   |
| `clouds.2d.advanced_shadows`       | 不可见的 3D 云，但它们的阴影会渲染             | `bool`      |
| `clouds.2d.advanced_shadows_cover` | 在制作 3D 云时考虑天空穹顶的太阳覆盖        | `bool`      |
| `clouds.2d.advanced_shadows_speed` | 不可见 3D 云阴影的移动速度     | `0.1 .. 10` |
| `clouds2D.unload`                  | 不使用时卸载天空穹顶（启用时节省显存） | `bool`      |
| `clouds2D.brightness`              | 天空穹顶的显示亮度                           | `0 .. 10`   |
| `clouds2D.contrast`                | 天空穹顶的对比度                            | `0 .. 10`   |

## 天气标签页

| 设置                         | 描述  | 类型/范围 |
| --------------------------- | ----- | --------- |
| `weather.use_weather_particles` | 如果启用，当气温低于 3°C 时，雨会变成雪。对于"雪"和"雨夹雪"天气，如果启用天气粒子，雨始终显示为雪                             | `bool`     |
| `weather.snow.size`             | 雪的尺寸 | `0 .. 10`  |
| `weather.ash.size`              | 灰烬的尺寸  | `0 .. 10`  |

## 着色器标签页

**地面雾**

| 设置                              | 描述                                            | 类型/范围   |
| --------------------------------- | ----------------------------------------------- | ----------- |
| `shaders.ground.active`              | 是否渲染地面雾                         | `bool`       |
| `shaders.groundfog.Quality`          | 地面雾的质量                          | `1 .. 4`     |
| `shaders.groundfog.Expand_width`     | 扩展地面雾生成的宽度           | `bool`       |
| `shaders.groundfog.Interpolate_near` | 在靠近相机的位置插值地面雾             | `bool`       |
| `shaders.groundfog.Render_distance`  | 地面雾的渲染距离                    | `0.25 .. 10` |
| `shaders.groundfog.Size`             | 地面雾广告牌的大小                 | `0.25 .. 5`  |
| `shaders.groundfog.Scale`            | 地面雾的缩放                             | `0.1 .. 5`   |
| `shaders.groundfog.Structure`        | 地面雾的结构                             | `0.1 .. 5`   |
| `shaders.groundfog.Gain`             | 地面雾的数量                            | `0 .. 10`    |
| `shaders.groundfog.Nearby_fadeout`   | 附近地面雾的淡出                        | `0.1 .. 2`   |
| `shaders.groundfog.Sun_influence`    | 太阳对地面雾的影响                             | `0 .. 1`     |
| `shaders.groundfog.Car_turbulences`  | 车辆空气动力学是否影响地面雾 | `bool`       |
| `groundfog.amount`                   | 地面雾的数量                         | N/A          |
| `groundfog.subscribed`               | 地面雾是否启用/禁用                   | `bool`       |
| `groundfog.total_billboards`         | 生成的地面雾广告牌总数     | N/A          |
| `groundfog.visible_billboards`       | 可见的地面雾广告牌数量    | N/A          |

**景观**

| 设置                            | 描述                                                | 类型/范围 |
| ------------------------------ | --------------------------------------------------- | --------- |
| `shaders.landscape.active`         | 景观着色器是否启用（在赛道外） | `bool`     |
| `shaders.landscape.only_skyshader` | 不要禁用，否则会导致奇怪的闪烁                 | `bool`     |
| `shaders.landscape.debug`          | 显示景观瓦片并将其闪烁为红色                 | `bool`     |

**闪电**

| 设置                                    | 描述                                         | 类型/范围      |
| -------------------------------------- | -------------------------------------------- | -------------- |
| `shaders.lightning.active`                 | 开启/关闭闪电                              | `bool`          |
| `shaders.lightning.speed`                  | 闪电的速度                    | `0 .. 1`        |
| `shaders.lightning.discharge_exponent`     | 闪电脉冲的强度                       | `1 .. 32`       |
| `shaders.lightning.discharge_ionisation`   | 闪电向下延伸的距离                     | `0.1 .. 4`      |
| `shaders.lightning.maximum_flash_light`    | 闪光可以达到的亮度                         | `0 .. 10`       |
| `shaders.lightning.bounced_light`          | 光的弹跳程度                      | `0 .. 10`       |
| `shaders.lightning.saturation`             | 闪电颜色的强度           | `0 .. 10`       |
| `shaders.lightning.probability_multiplier` | 闪电发生的概率                 | `0.1 .. 10`     |
| `shaders.lightning.debug`                  | 启用调试模式                                  | `bool`          |
| `shaders.lightning.phase`                  | 闪电的相位                   | `0 .. 1`        |
| `shaders.lightning.direction`              | 闪电的方向        | `0 .. 360`      |
| `shaders.lightning.distance`               | 与玩家的距离                        | `0 .. 20.000`   |
| `shaders.lightning.height`                 | 闪电的高度                        | `400 .. 2.000`  |
| `shaders.lightning.size`                   | 闪电的大小                            | `100 .. 10.000` |
| `shaders.lightning.rotation`               | 闪电的旋转                | `0 .. 360`      |
| `shaders.lightning.variant`                | 闪电的形状                   | `0 .. 1`        |
| `shaders.lightning.debug_flicker`          | 使其闪烁                                    | `bool`          |
| `shaders.lightning.debug_flicker_strength` | 闪烁效果的强度                 | `0 .. 0.2`      |
| `shaders.lightning.debug_sequence`         | 使闪电按顺序通过其各个阶段 | `bool`          |

**雨雾**

| 设置                   | 描述                 | 类型/范围    |
| --------------------- | -------------------- | ----------- |
| `shaders.rainhaze.active` | 开启/关闭雨雾      | `bool`        |
| `shaders.rainhaze.gain`   | 雨雾的强度 | `0 .. 10`     |
| `rainhaze.amount`         | 雨雾总量    | `0 .. 10.000` |
| `rainhaze.subscribed`     | 雨雾是否启用 | `bool`        |

**眩光**

| 设置                                   | 描述                                                                           | 类型/范围       |
| ------------------------------------- | ------------------------------------------------------------------------------ | --------------- |
| `shaders.sunblinding.active`              | 开启/关闭着色器                                                             | `bool`           |
| `shaders.sunblinding.allow_control`       | 允许 PPfilter 脚本控制                                                     | `bool`           |
| `shaders.sunblinding.sensitivity`         | 控制眩光或致盲效果对太阳亮度的反应强度     | `0 .. 2.000`     |
| `shaders.sunblinding.horizontal`          | 调整致盲效果的水平扩散或影响                     | `0 .. 1.000`     |
| `shaders.sunblinding.vertical`            | 控制效果的垂直扩散                                            | `0 .. 1.000`     |
| `shaders.sunblinding.low_angle_slope`     | 定义当太阳接近地平线时效果强度的变化方式             | `0 .. 1.000`     |
| `shaders.sunblinding.time_up`             | 效果淡入的时间（秒）                                           | `0.01 .. 10.000` |
| `shaders.sunblinding.time_down`           | 效果淡出的时间（秒）                                          | `0.01 .. 10.000` |
| `shaders.sunblinding.cover`               | 简单的屏幕叠加                                                               | `0 .. 2.000`     |
| `shaders.sunblinding.blinding`            | 简单的屏幕叠加                                                               | `0 .. 2.000`     |
| `shaders.sunblinding.iris`                | 使整个视图变暗                                                              | `0 .. 2.000`     |
| `shaders.sunblinding.star_opacity`        | 控制星星效果的强度                                               | `0 .. 2.000`     |
| `shaders.sunblinding.star_size`           | 星星效果的大小                                                            | `0 .. 2.000`     |
| `shaders.sunblinding.star_blur`           | 调整星星光线的柔和或锐利程度                                         | `0 .. 2.000`     |
| `shaders.sunblinding.star_style`          | -                                                                             | `0 .. 2.000`     |
| `shaders.sunblinding.star_adapt_coverage` | -                                                                             | `0 .. 2.000`     |
| `shaders.sunblinding.star_cover_damping`  | 平滑星星效果进入或离开相机视野时的过渡。 | `0 .. 2.000`     |
| `shaders.sunblinding.color`               | 添加光线的饱和度                                                     | `0 .. 2.000`     |
| `shaders.sunblinding.half_resolution`     | 以半分辨率渲染眩光着色器以提高性能              | `bool`           |
| `shaders.sunblinding.VR_tweak`            | -                                                                             | `bool`           |
| `shaders.sunblinding.debug`               | 启用眩光着色器的调试模式                                         | `bool`           |

## 相机标签页

| 设置                                       | 描述 | 类型/范围 |
| ----------------------------------------- | ---- | --------- |
| `camera.occlusion_control.adv_ambi_light`     | -           | `bool`     |
| `camera.occlusion_control.adv_fog_ambi_light` | -           | `bool`     |
| `camera.occlusion_control.exposure`           | -           | `bool`     |
| `camera.occlusion_control.overcast`           | -           | `bool`     |
| `camera.occlusion_control.vao`                | -           | `bool`     |

## 声音标签页

| 设置                           | 描述                       | 类型/范围      |
| ----------------------------- | -------------------------- | -------------- |
| `sound.wind_volume_interior`      | 指定声音的音量 | `0 .. 1`        |
| `sound.wind_volume_exterior`      | 指定声音的音量 | `0 .. 1`        |
| `sound.wind_volume_speed_damping` | 指定声音的音量 | `0 .. 1`        |
| `sound.rain_volume_interior`      | 指定声音的音量 | `0 .. 1`        |
| `sound.rain_volume_exterior`      | 指定声音的音量 | `0 .. 1`        |
| `sound.rain_volume_speed_damping` | 指定声音的音量 | `0 .. 1`        |
| `sound.damping_at_speed`          | 指定声音的音量 | `0 .. 500 km/h` |
| `sound.rain_volume_extra_skid`    | 指定声音的音量 | `0 .. 10`       |
| `sound.rain_volume_extra_wetness` | 指定声音的音量 | `0 .. 10`       |
| `sound.rain_volume_extra_puddles` | 指定声音的音量 | `0 .. 10`       |
| `sound.rain_volume_extra_gravel`  | 指定声音的音量 | `0 .. 10`       |
| `sound.thunder_volume_interior`   | 指定声音的音量 | `0 .. 1`        |
| `sound.thunder_volume_exterior`   | 指定声音的音量 | `0 .. 1`        |

## 状态标签页

展示与 Pure 相关的信息状态。

## 赛道标签页

| 设置                    | 描述                                                 | 类型/范围 |
| ---------------------- | ---------------------------------------------------- | --------- |
| `FOG_SHAPE`                | 适用于小赛道，改变雾广告牌的形状 | `-1 .. 10` |
| `SMOG_MORNING`             | 早晨的平均烟雾水平                              | `0 .. 1`   |
| `SMOG_NOON`                | 中午的平均烟雾水平                                 | `0 .. 1`   |
| `SMOG_EVENING`             | 傍晚的平均烟雾水平                              | `0 .. 1`   |
| `SUN_DAWN`                 | 防止镜面反射出现在此角度以下          | `±10`      |
| `SUN_DUSK`                 | 防止镜面反射出现在此角度以上          | `±10`      |
| `HUMIDITY_OFFSET`          | 按此数量偏移湿度                             | `0 .. 1`   |
| `HORIZON_OFFSET`           | 按此数量调整地平线                     | `±10`      |
| `MINIMUM_GLOW_EMISSIVES`   | 设置发光体的最小值                    | `0 .. 1`   |
| `TUNNEL_HELPER`            | 在隧道中调暗太阳、环境和雾光                  | `0 .. 1`   |
| `LANDSCAPE_USE`            | 激活假景观                                    | `bool`     |
| `LANDSCAPE_HUE`            | 景观的主导波长                            | `±180`     |
| `LANDSCAPE_SATURATION`     | 景观颜色的强度                               | `0 .. 2`   |
| `LANDSCAPE_LEVEL`          | 景观的亮度                                 | `0 .. 10`  |
| `LANDSCAPE_GAMMA`          | 景观的伽马值                                   | `0 .. 4`   |
| `LANDSCAPE_DIFFUSE`        | 景观上的光扩散量                         | `0 .. 1`   |
| `LANDSCAPE_AMBIENT`        | 景观的环境光照水平                            | `0 .. 1`   |
| `LANDSCAPE_HEIGHT`         | 景观的高度                                         | `±1.000`   |
| `LANDSCAPE_COVER_NEGATIVE` | 无明显差异                                       | `bool`     |
| `LANDSCAPE_SHIFT_X`        | 按此数量移动景观 X 坐标               | `±5.000`   |
| `LANDSCAPE_SHIFT_Z`        | 按此数量移动景观 Z 坐标               | `±5.000`   |
| `LANDSCAPE_FILES`          | 景观将加载/使用的文件                       | `table`    |

## 优化 + 调试标签页

| 设置                  | 描述 | 类型/范围 |
| -------------------- | ---- | --------- |
| `optimization.cpu_split` | -           | `bool`     |
| `debug.memory`           | -           | `bool`     |
| `debug.computation`      | -           | `bool`     |
| `debug.graphics`         | -           | `bool`     |
