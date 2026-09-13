---
layout: default
title: Home
# The big picture at the top of the home page. Drop a file in
# assets/img/screens/ and point hero_image at it.
hero_image: /assets/img/screens/hero.png
hero_caption: "Driving an OMSI 2 map in the onurb engine."
---

<div class="hero">
  <img src="{{ page.hero_image | relative_url }}" alt="onurb screenshot"
       onerror="this.src='{{ '/assets/img/placeholder.svg' | relative_url }}'">
  <span class="cap">{{ page.hero_caption }}</span>
</div>

<p style="text-align:center; margin:16px 0 22px;">
  <a class="btn" href="{{ site.download_url }}">DOWNLOAD LATEST BUILD</a>
  <a class="btn alt" href="{{ site.github_repo }}">SOURCE CODE</a>
</p>

<div class="win">
  <b class="win-t">WHAT IS ONURB?</b>
  <div class="win-b">
    <p>{{ site.description }}</p>
    <p>
      It is free, it is open source, and it runs the buses, maps and scenery
      objects you already own. Nothing is re-authored and nothing is bundled -
      onurb reads the original files from your own installation.
    </p>
    <p><a href="{{ '/about/' | relative_url }}">Read the full story &raquo;</a></p>
  </div>
</div>

<div class="win">
  <b class="win-t">LATEST NEWS</b>
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
  <b class="win-t">SCREENSHOTS</b>
  <div class="win-b">
    <div class="grid">
      {%- for shot in site.data.gallery limit: 4 %}
      <a class="thumb" href="{{ '/gallery/' | relative_url }}">
        <img src="{{ shot.thumb | default: shot.file | relative_url }}" alt="{{ shot.caption }}"
             onerror="this.src='{{ '/assets/img/placeholder.svg' | relative_url }}'">
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
  <b class="win-t">LATEST VIDEO</b>
  <div class="win-b">
    <a class="thumb" href="{{ '/videos/' | relative_url }}">
      <span class="shot">
        <img src="https://img.youtube.com/vi/{{ vid.youtube_id }}/hqdefault.jpg" alt="{{ vid.title }}">
      </span>
      <span class="t">{{ vid.title }}</span>
      <span class="d">{{ vid.date }}</span>
    </a>
    <p style="margin-top:12px;"><a href="{{ '/videos/' | relative_url }}">All videos &raquo;</a></p>
  </div>
</div>
{%- endif %}
