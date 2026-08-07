---
order: 4
title: Installing mods (cars & tracks)
summary: Getting car and track mods into the game root folder correctly, and where to find mods worth installing.
draft: true
updated: '2026-08-04'
---

## Know the root folder first

Installing mods means putting files into the **game root folder** — the one from the previous level (`...\steamapps\common\assettocorsa`). These are the folders that matter:

| Folder | What goes in it |
| --- | --- |
| `content\cars\` | Cars |
| `content\tracks\` | Tracks |
| `apps\lua\`, `apps\python\` | App mods, split by script type |
| `extension\` | CSP-related content, commonly `config-ext` (Pure configs, filter script settings) |
| `system\cfg\` | Post-processing filter files and scripts |

> Right-click the root folder in Explorer and **Pin to Quick access** — you'll be back here often.

## Manual install (recommended)

**Installing by hand is more reliable than dragging into CM.** Content Manager can misplace files or break a mod outright; if a mod installed through CM is misbehaving, redo it manually — that overwrites the bad install.

The thing to check is **which level the archive was packed from**:

- The archive already contains a full path like `content\tracks\some_track\` → drag its contents straight into the **root folder** and merge.
- The archive only contains `some_track\` → put that inside `content\tracks\` yourself.

Same logic for cars. **One folder per mod** — don't mix files from different mods together.

## Dragging into Content Manager

The quick way: drag the archive onto the CM window and let it detect and install. This works fine for well-packaged mods, and they show up in CM's car / track lists afterwards.

But as above — if something doesn't appear, textures look wrong, or the track won't load, **redo it manually**.

## Where to find mods

- Browse the [authors](/authors) here — we list Chinese modders, and each profile links to where they actually publish (Bilibili, Afdian and so on).
- We **don't host mods**. We point you at the author's own release page, so you get the genuine, current version.

## Installed but not showing up?

Work through these in order:

1. **Wrong folder level** — by far the most common cause. Re-check the section above.
2. **Needs CSP** — many newer mods require it, sometimes a specific version.
3. **Needs official DLC** — some mods reuse car or track assets from paid DLC.
4. Stick to sources you trust; don't install files of unknown origin.

## Next

Cars sorted — now look at the tools the community actually runs, in **Recommended mods**.
