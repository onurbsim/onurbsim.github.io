---
layout: page
title: About
permalink: /about/
---

## The short version

**onurb** is a simulator written in C++ as a personal project, with some
(maybe) very specific requirements of mine. Its foundation and prime directive
is to **drive OMSI 2 vehicles in several worlds**. This project started approximately 7 years ago and had its ups and downs, with different approaches tried throughout this time.

It follows OMSI 2's behaviour and loads the content you already have - maps,
buses, scenery objects, textures, scripts - without conversion, repacking or
re-authoring. That means not only the default maps and vehicles that ship with
OMSI 2, but also the add-ons and mods created by its community. OMSI 2's maps,
default and community-made, are the first of those worlds. The same
engine also loads and drives:

- **Midtown Madness 2** cities
- **GTA: Vice City**
- **Its own maps**, generated from OpenStreetMap and other open-source
  geospatial data. **Rio de Janeiro** is the pilot municipality, also including some further distant areas of the state of Rio.
- **Proton Bus Simulator** buses (encrypted models will not load to respect intellectual property of their respective authors).

Support for **Midtown Madness 1** and **GTA: San Andreas** is in ongoing development, but not ready for production.

**onurb does not reuse a single line of code from any of these games.** It is
written from scratch; what it shares with them is their file formats and
behaviour, not their code.

Nothing from any of the games ships with onurb either. The engine points at
your own installation and reads it in place.

I recently came to know that there are some very interesting projects that also recreated OMSI 2 environment, also featuring multiplayer features and improved graphics. For now, multiplayer is not on the roadmap. Also I'm not a graphics rendering expert, so you might feel that the graphics of onurb feels like old-style OMSI.

## Why

OMSI 2 is a remarkable simulator sitting on an aging engine: single-threaded,
32-bit, and hard to extend. The content around it - two decades of maps, buses
and objects made by its community - deserves an engine that can keep running it
on modern hardware.

Before onurb, I spent some time trying to adapt the OMSI 2 executable itself -
getting more out of multithreading and optimising its 3D rendering. I came to
the conclusion that it was a better investment to build a new project that
could consume those same assets.

I also explored building it on Unreal Engine or Unity, but came to the
conclusion that implementing an engine of its own made more sense.

## Status

<div class="table-wrap">
<table class="status">
  <tr><th>Area</th><th>Progress</th></tr>
  {%- for row in site.data.status %}
  <tr>
    <td>{{ row.area }}</td>
    <td>
      <span class="meter" role="progressbar" aria-label="{{ row.area }}"
            aria-valuemin="0" aria-valuemax="100" aria-valuenow="{{ row.progress }}">
        <span style="width: {{ row.progress }}%"></span>
      </span>
      <b class="pct">{{ row.progress }}%</b>
    </td>
  </tr>
  {%- endfor %}
</table>
</div>

## Built with

- **C++**, CMake, Ninja
- GCC - through MSYS2 UCRT64 on Windows, natively on Linux
- Runs on **Windows** and **Linux**, and possibly **macOS** as well
- Rendering on OpenGL and Vulkan, plus Direct3D 12 on Windows
- NVIDIA DLSS on Direct3D 12 (Windows)
- VR through OpenXR - tested with a Meta Quest 3 over Virtual Desktop
- Dear ImGui for tools and debug interfaces

### Third-party libraries

onurb stands on these open-source projects. Thank you to everyone behind them.

**Windows, graphics and VR**

- [GLFW](https://www.glfw.org/) - windows, input and the OpenGL context
- [glad](https://github.com/Dav1dde/glad) - OpenGL function loader
- [Vulkan-Headers](https://github.com/KhronosGroup/Vulkan-Headers) - Vulkan API headers
- [NVIDIA Streamline](https://github.com/NVIDIA-RTX/Streamline) - DLSS integration
- [OpenXR SDK](https://github.com/KhronosGroup/OpenXR-SDK) - VR headers and loader
- [glslang](https://github.com/KhronosGroup/glslang) - GLSL to SPIR-V shader compiler
- [SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross) - SPIR-V to HLSL, for Direct3D 12
- [GLM](https://github.com/g-truc/glm) - vector and matrix maths
- [stb_image](https://github.com/nothings/stb) - image loading
- [Dear ImGui](https://github.com/ocornut/imgui) - tools and debug interface

**Simulation**

- [Jolt Physics](https://github.com/jrouwe/JoltPhysics) - vehicle and terrain physics
- [Clipper2](https://github.com/AngusJohnson/Clipper2) - polygon operations for the OpenStreetMap world
- [miniaudio](https://miniaud.io/) - audio playback and mixing

**Data, network and text**

- [SQLite](https://sqlite.org/) - local database
- [zlib](https://zlib.net/) - decompression of game archives
- [libcurl](https://curl.se/libcurl/) - HTTPS requests (optional)
- [Noto fonts](https://fonts.google.com/noto) - interface text in many scripts

## Requirements

Windows or Linux - and possibly macOS as well.

A legal copy of each game whose world you want to drive: OMSI 2, Midtown
Madness 2 or GTA: Vice City. onurb finds your installation automatically, or
you can point it at one.

The OpenStreetMap-based maps need no game for the city itself, but you still
drive a vehicle from OMSI 2 or Midtown Madness 2, so one of those two is
required.

## Credits and legal

onurb is an independent, non-commercial project. It is not affiliated with,
endorsed by or connected to M-R Software, Aerosoft, Angel Studios, Microsoft,
Rockstar Games or Take-Two Interactive. OMSI 2, Midtown Madness,
Midtown Madness 2, Grand Theft Auto: Vice City and Grand Theft Auto: San Andreas
are the property of their respective owners.
onurb contains no code from any of them.

Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap
contributors</a>, available under the Open Database License (ODbL).

## About the author

I'm **{{ site.author }}** and I've worked in some OMSI projects in the past:

- Developer of **OMSI Map Tools**
- Author of the **Tropical City** map
- Helped with the scripting of some OMSI buses
- Former staff member of the **AussieX** forum

## Release and source code

Version {{ site.release.version }} is planned for **{{ site.release.date }}**.
Follow the <a href="{{ '/news/' | relative_url }}">news page</a> for updates.

onurb is, first of all, a very personal project, and its source code is not
public for now, since I'm still working on some specific aspects.
