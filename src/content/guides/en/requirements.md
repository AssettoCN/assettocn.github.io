---
order: 1
title: System & software requirements
summary: Check your PC can run the game, and install the few runtimes almost every mod depends on.
draft: true
---

## Game version

Assetto Corsa on **Steam, v1.16.3 / 1.16.4 (64-bit only)**. That's the baseline the whole modding ecosystem targets — CM, CSP and the vast majority of mods assume it.

## Hardware

The official requirements, for the **stock** game:

| | |
| --- | --- |
| OS | Windows 10 or newer |
| CPU | AMD six-core / Intel quad-core |
| RAM | 8 GB |
| GPU | DirectX 11 capable (e.g. AMD Radeon 290X, NVIDIA GeForce GTX 970) |
| DirectX | Version 11 |
| Storage | 30 GB free |
| Network | Broadband connection |

> Those are **stock** figures. Once you add mods — high-detail car models, large tracks, CSP's visual effects — the real demand on GPU and memory climbs well past this table.

## Software

These are effectively prerequisites for modding. Installing them up front saves a lot of "won't launch / crashes / missing DLL" debugging later:

| Program | What it's for |
| --- | --- |
| [7-Zip](https://www.7-zip.org/) | Extracting `.zip` / `.rar` / `.7z` archives — mods ship as archives |
| [VCRedist all-in-one](https://github.com/abbodi1406/vcredist/releases) | Installs every Visual C++ runtime in one go |
| [DirectX End-User Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=35) | The legacy DirectX runtimes Assetto Corsa needs |
| [.NET Framework 4.5.2](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net452) | Runtime for .NET applications such as Content Manager |

## On a gamepad

For a **PS4 / PS5 controller** you'll need [DS4Windows](https://github.com/Ryochan7/DS4Windows/releases) to present it as an Xbox pad:

1. Download the latest `DS4Windows_x64.zip`
2. Extract it to its own folder
3. Run `DS4Windows.exe` and leave it running in the background

Xbox controllers work out of the box — no extra software.

## On a wheel

**Install your wheel's firmware / driver first.** Search for `brand model wheel firmware` (for example "Moza R12 wheel firmware").

- Logitech users: **G HUB must stay open the whole time you play** — closing it drops force feedback.
- After flashing firmware, **remap every button again** in Content Manager.

Detailed wheel tuning comes later, in **Wheel & gamepad setup**.

## Next

Requirements sorted — on to **Buying and installing the game**.
