---
layout: default
title: Videos
permalink: /videos/
---

<div class="win">
  <b class="win-t">VIDEOS</b>
  <div class="win-b">

    <p style="font-size:11px; color:#4d6076;">
      Click a thumbnail to load the player. Nothing from YouTube is loaded
      until you do.
    </p>

    <div class="grid two">
      {%- for vid in site.data.videos %}
      <a class="thumb play" href="https://www.youtube.com/watch?v={{ vid.youtube_id }}"
         data-yt="{{ vid.youtube_id }}">
        <img src="https://img.youtube.com/vi/{{ vid.youtube_id }}/hqdefault.jpg"
             alt="{{ vid.title | escape }}" loading="lazy">
        <span class="t">{{ vid.title }}</span>
        {%- if vid.date %}<span class="d">{{ vid.date }}</span>{% endif %}
      </a>
      {%- else %}
      <p>No videos yet.</p>
      {%- endfor %}
    </div>

  </div>
</div>
