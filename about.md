---
layout: page
title: About
permalink: /about/
---

## The short version

**onurb** is a bus simulator engine written from scratch in C++. It is built to
load the original **OMSI 2** content you already own - maps, buses, scenery
objects, textures, scripts - without conversion, repacking or re-authoring.
A second world format, **Midtown Madness 2**, loads and drives through the same
engine.

Nothing from either game ships with onurb. The engine points at your own
installation and reads it in place.

## Why

OMSI 2 is a remarkable simulator sitting on an aging engine: single-threaded,
32-bit, and hard to extend. The content around it - two decades of maps, buses
and objects made by its community - deserves an engine that can keep running it
on modern hardware.

So: a new engine, the old files.

## Status

<table>
  <tr><th>Area</th><th>State</th></tr>
  <tr><td>OMSI 2 map loading (tiles, terrain, splines)</td><td>Working</td></tr>
  <tr><td>Scenery objects and textures</td><td>Working</td></tr>
  <tr><td>Vehicle models and interiors</td><td>In progress</td></tr>
  <tr><td>Vehicle scripting / OMSI script VM</td><td>In progress</td></tr>
  <tr><td>Midtown Madness 2 world format</td><td>Working</td></tr>
  <tr><td>AI traffic and timetables</td><td>Planned</td></tr>
</table>

<p style="font-size:11px; color:#4d6076;">
Keep this table honest - it is the first thing anyone reads.
Edit it in <code>about.md</code>.
</p>

## Built with

- **C++**, CMake, Ninja
- MSYS2 UCRT64 / GCC on Windows
- OpenGL rendering, Dear ImGui for tools and debug interfaces

## Requirements

A legal copy of OMSI 2 (and, for the second world format, Midtown Madness 2).
onurb finds your installation automatically, or you can point it at one.

## Credits and legal

onurb is an independent, non-commercial project. It is not affiliated with,
endorsed by or connected to M-R Software, Aerosoft, Angel Studios or Microsoft.
OMSI 2 and Midtown Madness 2 are the property of their respective owners.

## Get involved

Code, bug reports and test maps are all welcome -
see the <a href="{{ site.github_repo }}">GitHub repository</a>.
