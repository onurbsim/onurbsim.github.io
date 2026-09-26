---
layout: page
title: About
permalink: /about/
---

## The short version

**onurb** is a simulator written in C++ as a personal project, with some
(maybe) very specific requirements of mine. Its foundation and prime directive
is to **drive OMSI 2 vehicles in several worlds**.

It follows OMSI 2's behaviour and loads the content you already have - maps,
buses, scenery objects, textures, scripts - without conversion, repacking or
re-authoring. That means not only the default maps and vehicles that ship with
OMSI 2, but also the add-ons and mods created by its community. OMSI 2's maps,
default and community-made, are the first of those worlds. The same
engine also loads and drives:

- **Midtown Madness 2** cities
- **GTA: Vice City**
- **Its own maps**, generated from OpenStreetMap and other open-source
  geospatial data. **Rio de Janeiro** is the pilot city.

Support for **Midtown Madness 1** and **GTA: San Andreas** is expected in the
future.

**onurb does not reuse a single line of code from any of these games.** It is
written from scratch; what it shares with them is their file formats and
behaviour, not their code.

Nothing from any of the games ships with onurb either. The engine points at
your own installation and reads it in place.

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

So: a new engine, the old files.

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
- MSYS2 UCRT64 / GCC on Windows
- Rendering on OpenGL, Vulkan and Direct3D 12
- NVIDIA DLSS on Direct3D 12
- VR through OpenXR - tested with a Meta Quest 3 over Virtual Desktop
- Dear ImGui for tools and debug interfaces

## Requirements

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

I'm **{{ site.author }}**, and onurb is my project. It is not my first time
inside OMSI:

- Developer of **OMSI Map Tools**
- Author of the **Tropical City** map
- Helped with the scripting of some OMSI buses
- Former staff member of the **AussieX** forum

## Release and source code

Version {{ site.release.version }} is planned for **{{ site.release.date }}**.
Follow the <a href="{{ '/news/' | relative_url }}">news page</a> for updates.

onurb is, first of all, a very personal project, and its source code is not
public. Opening it up is the intention for the future, but it is not
guaranteed and there is no date for it.
