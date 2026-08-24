---
order: 3
category: visuals
title: 'Pure Config Reference'
summary: 'A quick reference for every tab and setting in Pure Config — what each one does.'
draft: true
updated: '2026-08-07'
sourceName: 'AssettoCN docs (community)'
---
This page lists every feature in Pure Config, along with a description of each.

## Main tab

### Quality presets (ground fog)

| Property         | Low | Medium | High | Ultra |
| ---------------- | --- | ------ | ---- | ----- |
| Ground fog       | ❌  | ✅     | ✅   | ✅    |
| Quality          | ❌  | ✅     | ✅   | ✅    |
| Render distance  | ❌  | 🟠     | ✅   | ✅    |
| Car turbulence   | ❌  | ❌     | ❌   | ✅    |

### Pure checklist

Settings whose misconfiguration can break Pure features.

| Setting                                 | Description                                                                                     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Recommended CSP settings                | Settings that won't break Pure but may lower visual quality.                                    |
| Reset weatherFX system                  | Restarts the WeatherFX extension in Custom Shaders Patch; may fix visual problems.              |
| Reset to defaults                       | Resets all settings in Pure Config and the PurePP app to their defaults.                        |
| config.video_mode_separation            | Allows different Pure Config settings depending on the rendering mode chosen in Video settings. |
| config.track_specific_loading           | Allows different Pure Config settings depending on the track currently being played.            |
| config.track_specific_video_separation  | Allows different Pure Config settings depending on both the rendering mode and the track.       |

## AI tab

| Setting                       | Description                                                                                                         |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `AI_headlights.sun`           | Enables AI headlights when the sun angle is below the set value.                                                  |
| `AI_headlights.ambient_light` | Enables AI headlights when ambient light is below the set value.                                                 |
| `AI_headlights.CBE`           | Enables AI headlights when estimated cubemap brightness (essentially reflections) is below this value.           |
| `AI_headlights.fog`           | Enables AI headlights when fog density is above the set value.                                                    |
| `AI_headlights.rain`          | Enables AI headlights when rain intensity is above this value.                                                    |
| `Activate Headlight Control`  | Requires "automatically turn headlights on/off" under Content Manager → Settings → Custom Shaders Patch → WeatherFX. |

## Lighting tab

| Setting                                   | Description                                                                | Type/Range |
| ----------------------------------------- | ------------------------------------------------------------------------- | ---------- |
| `light.daylight_multiplier`               | Multiplier affecting the overall brightness of daylight                    | `0 .. 10`  |
| `light.sun.hue`                           | Dominant wavelength (colour) of all light sources                          | `±180`     |
| `light.sun.saturation`                    | Intensity of on-screen colours                                             | `0 .. 10`  |
| `light.sun.level`                         | Brightness of sunlight on all materials                                    | `0 .. 10`  |
| `light.sun.specular`                      | How strongly glossy materials reflect sunlight                             | `0 .. 10`  |
| `light.ambient_model_V2`                  | Whether Pure uses single ambient lighting or tiled ambient lighting        | `bool`     |
| `light.ambient.hue`                       | Dominant wavelength of ambient lighting                                    | `±180`     |
| `light.ambient.saturation`                | Intensity of the ambient lighting colour                                   | `0 .. 10`  |
| `light.ambient.level`                     | Overall brightness of ambient lighting                                     | `0 .. 10`  |
| `light.advanced_ambient_light`            | Appears very similar to the setting above                                  | `0 .. 10`  |
| `light.advanced_ambient_lightV2_sun`      | How much the sun influences ambient light brightness                       | `0 .. 10`  |
| `light.advanced_ambient_lightV2_skydomes` | How much the skydomes influence ambient light brightness                   | `0 .. 10`  |
| `light.advanced_ambient_lightV2_sky`      | How much the sky influences ambient light brightness                       | `0 .. 10`  |
| `light.advanced_ambient_lightV2_clouds`   | How much the clouds influence ambient light brightness                     | `0 .. 10`  |
| `light.advanced_ambient_lightV2_nlp`      | How much night light pollution influences ambient light brightness         | `0 .. 10`  |
| `light.advanced_ambient_lightV2_fog`      | How much fog influences ambient light brightness                           | `0 .. 10`  |
| `light.advanced_ambient_lightV2_vao_exp`  | How much VAO exposure influences ambient light brightness                  | `0 .. 10`  |
| `light.distant_ambient.hue`               | Dominant wavelength of ambient lighting                                    | `±180`     |
| `light.distant_ambient.saturation`        | Intensity of the distant ambient lighting colour                           | `0 .. 10`  |
| `light.distant_ambient.level`             | Brightness of distant ambient lighting                                     | `0 .. 10`  |
| `light.distant_ambient.distance`          | Distance of "distant" (lower = nearer)                                     | `0 .. 10`  |
| `light.directional_ambient.hue`           | Dominant wavelength of directional ambient lighting (most visible in shadow) | `±180`   |
| `light.directional_ambient.saturation`    | Intensity of directional ambient lighting colour (most visible in shadow)  | `0 .. 10`  |
| `light.directional_ambient.level`         | Overall brightness of directional ambient lighting (most visible in shadow) | `0 .. 10` |
| `shadows.presence`                        | Whether shadows render everywhere or only in genuinely shadowed areas       | `0 .. 1`   |
| `csp_lights.bounce`                       | How far CSP lights bounce before fading out                                | `0 .. 10`  |
| `csp_lights.emissive`                     | Brightness of CSP emissives (e.g. the centre of a street light)            | `0 .. 10`  |
| `csp_lights.displays`                     | Brightness of CSP displays (e.g. dashboards, tachometers)                  | `0 .. 10`  |
| `reflections.saturation`                  | Intensity of all reflection colours                                        | `0 .. 10`  |
| `reflections.level`                       | Overall brightness of all reflections                                      | `0 .. 10`  |
| `reflections.emissive_boost`              | Brightness of emissives in reflections (e.g. street lights)                | `0 .. 30`  |
| `vao.amount`                              | Amount of vertex array objects (more = darker shadows)                     | `0 .. 2`   |
| `vao.track_exponent`                      | Multiplier for vertex array objects on the track (more = darker track shadows) | `0 .. 2` |
| `vao.dynamic_exponent`                    | Same setting but dynamic; appears to modify distant and reflection shadows | `0 .. 2`   |
| `ui.white_reference_point`                | No obvious change                                                          | `0 .. 10`  |

## Night tab

| Setting                    | Description                            | Type/Range |
| -------------------------- | -------------------------------------- | ---------- |
| `nlp.level`                | Brightness of night light pollution    | `0 .. 10`  |
| `nlp.density`              | Density of night light pollution       | `0 .. 10`  |
| `nlp.lowest_ambient`       | Minimum ambient value for night light pollution | `0 .. 10` |
| `moon.light`               | Brightness of moonlight                | `0 .. 10`  |
| `moon.appearance`          | Displayed brightness of the moon       | `0 .. 10`  |
| `stars.appearance`         | Displayed brightness of the stars      | `0 .. 100` |
| `stars.dynamic_adaptation` | Enable dynamic adaptation of the stars | `bool`     |

## Sky tab

| Setting                   | Description                          | Type/Range |
| ------------------------- | ----------------------------------- | ---------- |
| `light.sky.hue`           | Dominant wavelength of the sky       | `±180`     |
| `light.sky.saturation`    | Intensity of the sky colour          | `0 .. 10`  |
| `light.sky.level`         | Brightness of the sky                | `0 .. 10`  |
| `sky.sun_disk.hue`        | Dominant wavelength of the sun's halo | `±180`    |
| `sky.sun_disk.saturation` | Intensity of the sun halo colour     | `0 .. 10`  |
| `sky.sun_disk.level`      | Brightness of the sun's halo         | `0 .. 10`  |
| `sun.sun_moon_size`       | Displayed size of the sun/moon       | `0 .. 10`  |

## Clouds tab

| Setting                            | Description                                                    | Type/Range  |
| ---------------------------------- | ------------------------------------------------------------- | ----------- |
| `clouds_render.method`             | 0 = 3D billboard clouds, 1 = 360° skydome                     | `0 .. 1`    |
| `default_16k`                      | The default set of skydomes provided by Pure                  | -           |
| `clouds2D.crossfade_time`          | How fast the skydome crossfades to the next                   | `1 .. 60`   |
| `clouds.2d.advanced_shadows`       | Invisible 3D clouds, but their shadows render                 | `bool`      |
| `clouds.2d.advanced_shadows_cover` | Account for the skydome's sun coverage when generating 3D clouds | `bool`   |
| `clouds.2d.advanced_shadows_speed` | Movement speed of the invisible 3D cloud shadows              | `0.1 .. 10` |
| `clouds2D.unload`                  | Unload skydomes when not in use (saves VRAM when enabled)     | `bool`      |
| `clouds2D.brightness`              | Displayed brightness of the skydome                           | `0 .. 10`   |
| `clouds2D.contrast`                | Contrast of the skydome                                       | `0 .. 10`   |

## Weather tab

| Setting                         | Description | Type/Range |
| ------------------------------- | ----------- | ---------- |
| `weather.use_weather_particles` | If enabled, rain turns to snow when the temperature is below 3°C. For "snow" and "sleet" weather, rain always shows as snow when weather particles are enabled | `bool` |
| `weather.snow.size`             | Size of snow | `0 .. 10`  |
| `weather.ash.size`              | Size of ash  | `0 .. 10`  |

## Shaders tab

**Ground fog**

| Setting                              | Description                                     | Type/Range   |
| ------------------------------------ | ----------------------------------------------- | ------------ |
| `shaders.ground.active`              | Whether ground fog renders                       | `bool`       |
| `shaders.groundfog.Quality`          | Quality of the ground fog                        | `1 .. 4`     |
| `shaders.groundfog.Expand_width`     | Expand the width over which ground fog spawns    | `bool`       |
| `shaders.groundfog.Interpolate_near` | Interpolate ground fog close to the camera       | `bool`       |
| `shaders.groundfog.Render_distance`  | Render distance of the ground fog                | `0.25 .. 10` |
| `shaders.groundfog.Size`             | Size of the ground fog billboards                | `0.25 .. 5`  |
| `shaders.groundfog.Scale`            | Scale of the ground fog                          | `0.1 .. 5`   |
| `shaders.groundfog.Structure`        | Structure of the ground fog                      | `0.1 .. 5`   |
| `shaders.groundfog.Gain`             | Amount of ground fog                             | `0 .. 10`    |
| `shaders.groundfog.Nearby_fadeout`   | Fade-out of nearby ground fog                    | `0.1 .. 2`   |
| `shaders.groundfog.Sun_influence`    | Influence of the sun on ground fog               | `0 .. 1`     |
| `shaders.groundfog.Car_turbulences`  | Whether car aerodynamics affect ground fog       | `bool`       |
| `groundfog.amount`                   | Amount of ground fog                             | N/A          |
| `groundfog.subscribed`               | Whether ground fog is enabled/disabled           | `bool`       |
| `groundfog.total_billboards`         | Total number of ground fog billboards generated  | N/A          |
| `groundfog.visible_billboards`       | Number of visible ground fog billboards          | N/A          |

**Landscape**

| Setting                            | Description                                        | Type/Range |
| ---------------------------------- | ------------------------------------------------- | ---------- |
| `shaders.landscape.active`         | Whether the landscape shader is enabled (off-track) | `bool`   |
| `shaders.landscape.only_skyshader` | Don't disable, or it causes strange flickering      | `bool`   |
| `shaders.landscape.debug`          | Show landscape tiles and flash them red             | `bool`   |

**Lightning**

| Setting                                    | Description                                | Type/Range      |
| ------------------------------------------ | ------------------------------------------ | --------------- |
| `shaders.lightning.active`                 | Turn lightning on/off                       | `bool`          |
| `shaders.lightning.speed`                  | Speed of the lightning                      | `0 .. 1`        |
| `shaders.lightning.discharge_exponent`     | Intensity of the lightning pulse            | `1 .. 32`       |
| `shaders.lightning.discharge_ionisation`   | How far the lightning extends downward      | `0.1 .. 4`      |
| `shaders.lightning.maximum_flash_light`    | How bright the flash can get                | `0 .. 10`       |
| `shaders.lightning.bounced_light`          | How much the light bounces                  | `0 .. 10`       |
| `shaders.lightning.saturation`             | Intensity of the lightning colour           | `0 .. 10`       |
| `shaders.lightning.probability_multiplier` | Probability of lightning occurring          | `0.1 .. 10`     |
| `shaders.lightning.debug`                  | Enable debug mode                           | `bool`          |
| `shaders.lightning.phase`                  | Phase of the lightning                      | `0 .. 1`        |
| `shaders.lightning.direction`              | Direction of the lightning                  | `0 .. 360`      |
| `shaders.lightning.distance`               | Distance from the player                    | `0 .. 20.000`   |
| `shaders.lightning.height`                 | Height of the lightning                     | `400 .. 2.000`  |
| `shaders.lightning.size`                   | Size of the lightning                       | `100 .. 10.000` |
| `shaders.lightning.rotation`               | Rotation of the lightning                   | `0 .. 360`      |
| `shaders.lightning.variant`                | Shape of the lightning                      | `0 .. 1`        |
| `shaders.lightning.debug_flicker`          | Make it flicker                             | `bool`          |
| `shaders.lightning.debug_flicker_strength` | Strength of the flicker effect              | `0 .. 0.2`      |
| `shaders.lightning.debug_sequence`         | Step the lightning through its phases in order | `bool`       |

**Rain haze**

| Setting                   | Description             | Type/Range    |
| ------------------------- | ----------------------- | ------------- |
| `shaders.rainhaze.active` | Turn rain haze on/off    | `bool`        |
| `shaders.rainhaze.gain`   | Intensity of rain haze   | `0 .. 10`     |
| `rainhaze.amount`         | Total amount of rain haze | `0 .. 10.000` |
| `rainhaze.subscribed`     | Whether rain haze is enabled | `bool`     |

**Sun blinding (glare)**

| Setting                                   | Description                                                              | Type/Range       |
| ----------------------------------------- | ----------------------------------------------------------------------- | ---------------- |
| `shaders.sunblinding.active`              | Turn the shader on/off                                                   | `bool`           |
| `shaders.sunblinding.allow_control`       | Allow control by the PPFilter script                                    | `bool`           |
| `shaders.sunblinding.sensitivity`         | How strongly the glare/blinding effect responds to sun brightness       | `0 .. 2.000`     |
| `shaders.sunblinding.horizontal`          | Adjusts the horizontal spread or influence of the blinding effect       | `0 .. 1.000`     |
| `shaders.sunblinding.vertical`            | Controls the vertical spread of the effect                              | `0 .. 1.000`     |
| `shaders.sunblinding.low_angle_slope`     | Defines how effect intensity changes as the sun nears the horizon       | `0 .. 1.000`     |
| `shaders.sunblinding.time_up`             | Time for the effect to fade in (seconds)                                | `0.01 .. 10.000` |
| `shaders.sunblinding.time_down`           | Time for the effect to fade out (seconds)                               | `0.01 .. 10.000` |
| `shaders.sunblinding.cover`               | Simple screen overlay                                                   | `0 .. 2.000`     |
| `shaders.sunblinding.blinding`            | Simple screen overlay                                                   | `0 .. 2.000`     |
| `shaders.sunblinding.iris`                | Darkens the whole view                                                  | `0 .. 2.000`     |
| `shaders.sunblinding.star_opacity`        | Controls the intensity of the star effect                              | `0 .. 2.000`     |
| `shaders.sunblinding.star_size`           | Size of the star effect                                                | `0 .. 2.000`     |
| `shaders.sunblinding.star_blur`           | Adjusts how soft or sharp the star rays are                            | `0 .. 2.000`     |
| `shaders.sunblinding.star_style`          | -                                                                       | `0 .. 2.000`     |
| `shaders.sunblinding.star_adapt_coverage` | -                                                                       | `0 .. 2.000`     |
| `shaders.sunblinding.star_cover_damping`  | Smooths the transition as the star effect enters or leaves the camera view. | `0 .. 2.000` |
| `shaders.sunblinding.color`               | Saturation of the added rays                                           | `0 .. 2.000`     |
| `shaders.sunblinding.half_resolution`     | Render the glare shader at half resolution for performance             | `bool`           |
| `shaders.sunblinding.VR_tweak`            | -                                                                       | `bool`           |
| `shaders.sunblinding.debug`               | Enable debug mode for the glare shader                                 | `bool`           |

## Camera tab

| Setting                                       | Description | Type/Range |
| --------------------------------------------- | ----------- | ---------- |
| `camera.occlusion_control.adv_ambi_light`     | -           | `bool`     |
| `camera.occlusion_control.adv_fog_ambi_light` | -           | `bool`     |
| `camera.occlusion_control.exposure`           | -           | `bool`     |
| `camera.occlusion_control.overcast`           | -           | `bool`     |
| `camera.occlusion_control.vao`                | -           | `bool`     |

## Sound tab

| Setting                           | Description                    | Type/Range      |
| --------------------------------- | ------------------------------ | --------------- |
| `sound.wind_volume_interior`      | Volume of the specified sound   | `0 .. 1`        |
| `sound.wind_volume_exterior`      | Volume of the specified sound   | `0 .. 1`        |
| `sound.wind_volume_speed_damping` | Volume of the specified sound   | `0 .. 1`        |
| `sound.rain_volume_interior`      | Volume of the specified sound   | `0 .. 1`        |
| `sound.rain_volume_exterior`      | Volume of the specified sound   | `0 .. 1`        |
| `sound.rain_volume_speed_damping` | Volume of the specified sound   | `0 .. 1`        |
| `sound.damping_at_speed`          | Volume of the specified sound   | `0 .. 500 km/h` |
| `sound.rain_volume_extra_skid`    | Volume of the specified sound   | `0 .. 10`       |
| `sound.rain_volume_extra_wetness` | Volume of the specified sound   | `0 .. 10`       |
| `sound.rain_volume_extra_puddles` | Volume of the specified sound   | `0 .. 10`       |
| `sound.rain_volume_extra_gravel`  | Volume of the specified sound   | `0 .. 10`       |
| `sound.thunder_volume_interior`   | Volume of the specified sound   | `0 .. 1`        |
| `sound.thunder_volume_exterior`   | Volume of the specified sound   | `0 .. 1`        |

## Status tab

Shows status information related to Pure.

## Track tab

| Setting                    | Description                                             | Type/Range |
| -------------------------- | ------------------------------------------------------ | ---------- |
| `FOG_SHAPE`                | For small tracks; changes the shape of the fog billboards | `-1 .. 10` |
| `SMOG_MORNING`             | Average smog level in the morning                      | `0 .. 1`   |
| `SMOG_NOON`                | Average smog level at noon                             | `0 .. 1`   |
| `SMOG_EVENING`             | Average smog level in the evening                      | `0 .. 1`   |
| `SUN_DAWN`                 | Prevents specular reflections below this angle         | `±10`      |
| `SUN_DUSK`                 | Prevents specular reflections above this angle         | `±10`      |
| `HUMIDITY_OFFSET`          | Offset humidity by this amount                         | `0 .. 1`   |
| `HORIZON_OFFSET`           | Adjust the horizon by this amount                      | `±10`      |
| `MINIMUM_GLOW_EMISSIVES`   | Set the minimum value for glow emissives               | `0 .. 1`   |
| `TUNNEL_HELPER`            | Dims the sun, ambient and fog light inside tunnels     | `0 .. 1`   |
| `LANDSCAPE_USE`            | Activate the fake landscape                            | `bool`     |
| `LANDSCAPE_HUE`            | Dominant wavelength of the landscape                   | `±180`     |
| `LANDSCAPE_SATURATION`     | Intensity of the landscape colour                      | `0 .. 2`   |
| `LANDSCAPE_LEVEL`          | Brightness of the landscape                            | `0 .. 10`  |
| `LANDSCAPE_GAMMA`          | Gamma of the landscape                                 | `0 .. 4`   |
| `LANDSCAPE_DIFFUSE`        | Amount of light diffusion on the landscape             | `0 .. 1`   |
| `LANDSCAPE_AMBIENT`        | Ambient lighting level of the landscape                | `0 .. 1`   |
| `LANDSCAPE_HEIGHT`         | Height of the landscape                                | `±1.000`   |
| `LANDSCAPE_COVER_NEGATIVE` | No obvious difference                                  | `bool`     |
| `LANDSCAPE_SHIFT_X`        | Shift the landscape X coordinate by this amount        | `±5.000`   |
| `LANDSCAPE_SHIFT_Z`        | Shift the landscape Z coordinate by this amount        | `±5.000`   |
| `LANDSCAPE_FILES`          | Files the landscape will load/use                      | `table`    |

## Optimization + Debug tab

| Setting                  | Description | Type/Range |
| ------------------------ | ----------- | ---------- |
| `optimization.cpu_split` | -           | `bool`     |
| `debug.memory`           | -           | `bool`     |
| `debug.computation`      | -           | `bool`     |
| `debug.graphics`         | -           | `bool`     |
