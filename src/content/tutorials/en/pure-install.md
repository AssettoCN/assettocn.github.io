---
order: 1
category: visuals
title: 'Installing Pure'
summary: 'Pure is the weather and lighting extension for CSP, and a prerequisite for Pure Config and most PPFilters. Here is how to install and enable it.'
draft: false
sourceName: 'AssettoCN docs (community)'
---
Pure is a weather and graphics extension for **Assetto Corsa** and **Custom Shaders Patch (CSP)**, developed by Peter Boese. It brings improved lighting, realistic weather, shadows, reflections, and broad post-processing filter (PPFilter) support.

Pure is the key to the most realistic visuals CSP can produce.

## Prerequisites

- Assetto Corsa v1.16.3/4 on Steam (64-bit only)
- Something that can extract `.zip` archives
- The latest [Content Manager](/start/content-manager-csp), installed and configured
- The latest [CSP](/start/content-manager-csp), installed and working
- A [Peter Boese Patreon subscription](https://www.patreon.com/c/peterboese/posts), for access to current builds

<aside class="cx cx--warning">

<span class="cx__t">Missing something?</span>

If you're not sure your system is ready, start with the [system requirements](/start/requirements) guide.

</aside>

## Download

Pure is distributed only through Peter Boese's Patreon. Once subscribed, download the latest `.zip` from the posts.

[Go to Patreon](https://www.patreon.com/c/peterboese/posts)

<aside class="cx cx--info">

<span class="cx__t">Info</span>

Downloads are named like this:

```bash
Pure_X.XX Highres.zip
# where X.XX is the version number
```

</aside>

## Install

Pure must be installed manually — **do not install it through Content Manager.**

1. Find the downloaded `.zip` in your `Downloads` folder
2. Extract its contents directly into your [root folder](/tutorials/root-folder)
3. Allow it to overwrite files when prompted

<aside class="cx cx--info">

<span class="cx__t">Best practice</span>

Always restart Content Manager after installing Pure, or you may hit missing menu entries and weather configuration problems.

</aside>

## Enable it

Once Pure is installed:

1. Open Content Manager
2. Go to `Settings > Custom Shaders Patch`
3. Under `Extensions` in the left-hand list, click `WeatherFX`
4. Under `Weather style`, choose `Pure Gamma` or `Pure LCS`

<aside class="cx cx--warning">

<span class="cx__t">Single-player note</span>

When starting a single-player session, make sure `Weather controller` is set to `Pure` in the quick-race menu.

</aside>

## Versions

- Always run the latest Pure and the latest CSP
- Some Pure releases require a minimum CSP version — check the Patreon release notes before updating
- Mixing an outdated Pure with a new CSP (or the reverse) can cause missing features or visual glitches
