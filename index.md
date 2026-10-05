---
layout: default
title: Home
# The big picture at the top of the home page. Drop a file in
# assets/img/screens/ and point hero_image at it. Empty = a plain colour block.
hero_image: 
hero_caption: "Driving an OMSI 2 map in the onurb engine."
---

<div class="hero">
  {%- if page.hero_image %}
  <img src="{{ page.hero_image | relative_url }}" alt="onurb screenshot"
       onerror="this.outerHTML='<span class=blank></span>'">
  {%- else %}
  <span class="blank"></span>
  {%- endif %}
  <span class="cap">{{ page.hero_caption }}</span>
</div>

<p style="text-align:center; margin:16px 0 22px;">
  {%- if site.download_url != "" %}
  <a class="btn" href="{{ site.download_url }}">Download version {{ site.release.version }}</a>
  {%- else %}
  <span class="btn soon">Version {{ site.release.version }} - coming {{ site.release.date }}</span>
  {%- endif %}
</p>

<div class="win">
  <b class="win-t">What is onurb?</b>
  <div class="win-b">
    <p>{{ site.description }}</p>
    <p>
      It runs the buses, maps and scenery objects you already have - the
      OMSI 2 defaults and the add-ons and mods made by its community. Nothing
      from OMSI 2, Midtown Madness 2 or Vice City is re-authored or bundled -
      onurb reads the original files from your own installation, and not a
      single line of any game's code is reused.
    </p>
    <p>
      The newest world is a driveable city built from OpenStreetMap and
      other open geospatial data, with Rio de Janeiro as the pilot. You bring
      the vehicle, from OMSI 2 or Midtown Madness 2.
    </p>
    <p>
      Next on the list: Midtown Madness 1 and GTA: San Andreas.
    </p>
    <p><a href="{{ '/about/' | relative_url }}">Read the full story &raquo;</a></p>
  </div>
</div>

<div class="win">
  <b class="win-t">Latest news</b>
  <div class="win-b">
    {%- for post in site.posts limit: 3 %}
    <div class="newsitem">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p><span class="stamp">{{ post.date | date: "%d %b %Y" }}</span></p>
      <p>{{ post.excerpt | strip_html | truncate: 180 }}</p>
    </div>
    {%- else %}
    <p>No news yet. Check back soon.</p>
    {%- endfor %}
    <p><a href="{{ '/news/' | relative_url }}">All news &raquo;</a></p>
  </div>
</div>

<div class="win">
  <b class="win-t">Screenshots</b>
  <div class="win-b">
    <div class="grid">
      {%- for shot in site.data.gallery limit: 4 %}
      <a class="thumb" href="{{ '/gallery/' | relative_url }}">
        {%- if shot.file %}
        <img src="{{ shot.thumb | default: shot.file | relative_url }}" alt="{{ shot.caption }}"
             onerror="this.outerHTML='<span class=blank></span>'">
        {%- else %}
        <span class="blank"></span>
        {%- endif %}
        <span class="t">{{ shot.caption }}</span>
      </a>
      {%- endfor %}
    </div>
    <p style="margin-top:12px;"><a href="{{ '/gallery/' | relative_url }}">Full gallery &raquo;</a></p>
  </div>
</div>

{%- assign vid = site.data.videos | first %}
{%- if vid %}
<div class="win">
  <b class="win-t">Latest video</b>
  <div class="win-b">
    <a class="thumb" href="{{ '/videos/' | relative_url }}">
      {%- if vid.youtube_id %}
      <span class="shot">
        <img src="https://img.youtube.com/vi/{{ vid.youtube_id }}/hqdefault.jpg" alt="{{ vid.title }}">
      </span>
      {%- else %}
      <span class="blank"></span>
      {%- endif %}
      <span class="t">{{ vid.title }}</span>
      <span class="d">{{ vid.date }}</span>
    </a>
    <p style="margin-top:12px;"><a href="{{ '/videos/' | relative_url }}">All videos &raquo;</a></p>
  </div>
</div>
{%- endif %}
