---
layout: default
title: Videos
permalink: /videos/
---

<div class="win">
  <b class="win-t">Videos</b>
  <div class="win-b">

    <p style="font-size:11px; color:#4d6076;">
      Click a thumbnail to view the video.
    </p>

    <div class="grid two">
      {%- for vid in site.data.videos %}
      {%- if vid.youtube_id %}
      <a class="thumb" href="https://www.youtube.com/watch?v={{ vid.youtube_id }}"
         data-yt="{{ vid.youtube_id }}">
        <span class="shot">
          <img src="https://img.youtube.com/vi/{{ vid.youtube_id }}/hqdefault.jpg"
               alt="{{ vid.title | escape }}" loading="lazy">
        </span>
      {%- else %}
      <div class="thumb">
        <span class="blank"></span>
      {%- endif %}
        <span class="t">{{ vid.title }}</span>
        {%- if vid.date %}<span class="d">{{ vid.date }}</span>{% endif %}
      {%- if vid.youtube_id %}</a>{% else %}</div>{% endif %}
      {%- else %}
      <p>No videos yet.</p>
      {%- endfor %}
    </div>

  </div>
</div>
