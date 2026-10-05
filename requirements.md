---
layout: page
title: System requirements
permalink: /requirements/
---

onurb runs the content of a game you already own. **You need your own
installed copy of OMSI 2** - nothing from it ships with onurb. A Steam
install is found automatically.

## Windows

<div class="table-wrap">
<table class="spec">
  <tr>
    <th></th>
    <th>Minimum<span class="tier">small &amp; medium OMSI maps, 1080p, reduced shadows</span></th>
    <th>Recommended<span class="tier">large maps, 1440p, high shadows, busy AI traffic</span></th>
  </tr>
  <tr>
    <th>System</th>
    <td>Windows 10 or 11, 64-bit</td>
    <td>Windows 10 or 11, 64-bit</td>
  </tr>
  <tr>
    <th>Processor</th>
    <td>4 cores with <b>AVX2</b> - Intel Core 4th generation (2013) or newer,
        AMD Ryzen or newer</td>
    <td>6 to 8 modern cores - Ryzen 5 5600 / Core i5-12400 or better</td>
  </tr>
  <tr>
    <th>Memory</th>
    <td>8 GB RAM</td>
    <td>16 GB RAM</td>
  </tr>
  <tr>
    <th>Graphics</th>
    <td><b>OpenGL 4.6</b> with current drivers, 2 GB video memory - roughly
        any NVIDIA, AMD or Intel GPU from 2016 onward</td>
    <td><b>Vulkan</b> or <b>Direct3D 12</b>, 6 to 8 GB video memory -
        GeForce RTX 3060 / Radeon RX 6600 or better</td>
  </tr>
  <tr>
    <th>Storage</th>
    <td>About 1 GB, plus your OMSI 2 installation</td>
    <td>An SSD, NVMe if possible - the world streams in while you drive</td>
  </tr>
</table>
</div>

<p class="note">
  <b>AVX2 is a hard limit.</b> On a processor without it onurb stops at
  start-up. The other minimum figures follow from what the engine needs. Very
  slow hardware has not been measured yet, so treat them as a guide.
</p>

## Measured on the test machine

Every performance figure about onurb comes from one machine:
**AMD Ryzen 7 7800X3D**, **NVIDIA GeForce RTX 4080**, 48 GB RAM, an NVMe SSD,
at **2560&times;1440**.

<div class="table-wrap">
<table class="bench">
  <tr><th>Scene</th><th>OpenGL</th><th>Vulkan</th><th>Direct3D 12</th></tr>
  <tr><td>London (OMSI 2)</td><td>389 fps</td><td>518-524 fps</td><td>520-534 fps</td></tr>
  <tr><td>Vice City street</td><td>290-294 fps</td><td>378-388 fps</td><td>369-373 fps</td></tr>
</table>
</div>

<div class="table-wrap">
<table class="bench">
  <tr><th>Map</th><th>Memory in use</th><th>Texture memory on the GPU</th></tr>
  <tr><td>London (OMSI 2)</td><td>about 2.0 GB</td><td>313 MB</td></tr>
  <tr><td>Grande Porto (OMSI 2)</td><td>about 3.1 GB</td><td>1.7 GB</td></tr>
  <tr><td>Rio de Janeiro metro area (OpenStreetMap)</td><td>about 7.3 GB</td><td>4.7 GB in total</td></tr>
</table>
</div>

<p class="note">
  OpenGL is the default. Vulkan and Direct3D 12 draw the same picture and are
  usually faster. Change it in <i>Options &gt; Settings... &gt; Graphics</i>.
</p>

## Optional extras

<dl class="extras">
  <dt>VR headsets</dt>
  <dd>
    Any OpenXR runtime on Windows. SteamVR and Virtual Desktop work with every
    graphics backend. Meta Quest Link and Air Link need Vulkan or Direct3D 12.
    Tested with a Meta Quest 3 over Virtual Desktop. A headset draws the scene
    twice at 72-90 Hz, so aim for the recommended GPU or better.
  </dd>

  <dt>NVIDIA DLSS</dt>
  <dd>
    A GeForce RTX card on Vulkan or Direct3D 12. You add the DLSS files from
    NVIDIA yourself. Frame generation needs an RTX 40 series or newer, and
    the 3&times; and 4&times; modes need an RTX 50 series.
  </dd>

  <dt>Wheels and controllers</dt>
  <dd>
    Force feedback on DirectInput wheels, tested with a MOZA R9 and a Logitech
    MOMO. Xbox-style gamepads get rumble. Your OMSI 2 key bindings are read as
    they are.
  </dd>

  <dt>OpenStreetMap worlds</dt>
  <dd>
    An internet connection the first time a region is downloaded. A large city
    needs <b>16 to 32 GB of RAM</b>, because building it for the first time
    peaks at around 10 GB, and <b>10 to 20 GB of disk</b> for its cache.
  </dd>

  <dt>Midtown Madness 2 and GTA: Vice City</dt>
  <dd>
    Your own installed copy of each game whose world you want to drive. You
    still drive an OMSI 2 bus there.
  </dd>
</dl>

## Linux and macOS <span class="stamp">experimental</span>

<ul>
  <li><b>Linux, x86_64:</b> a processor with AVX2, and OpenGL 4.6 (Mesa
      radeonsi or iris, or the NVIDIA driver) or Vulkan. Built on Ubuntu 24.04.
      Needs libcurl, zlib and, for Vulkan, libvulkan1.</li>
  <li><b>macOS:</b> Apple Silicon only, running on Vulkan through MoltenVK.
      macOS stops at OpenGL 4.1, which is too old for onurb.</li>
</ul>

<p class="note">
  Both builds compile and pass the automated tests. The macOS build has run on
  a real Apple M1 Pro and draws the world's terrain. Neither build has driven
  a real OMSI 2 map yet. Reports are welcome.
</p>
