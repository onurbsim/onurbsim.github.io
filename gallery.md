---
layout: default
title: Gallery
permalink: /gallery/
---

<div class="win">
  <b class="win-t">SCREENSHOT GALLERY</b>
  <div class="win-b">

    <p style="font-size:11px; color:#4d6076;">
      Click a shot to view it full size.
    </p>

    <div class="grid">
      {%- for shot in site.data.gallery %}
      <a class="thumb" href="{{ shot.file | relative_url }}"
         data-lb data-cap="{{ shot.caption | escape }}">
        <img src="{{ shot.thumb | default: shot.file | relative_url }}"
             alt="{{ shot.caption | escape }}" loading="lazy"
             onerror="this.src='{{ '/assets/img/placeholder.svg' | relative_url }}'">
        <span class="t">{{ shot.caption }}</span>
        {%- if shot.date %}<span class="d">{{ shot.date }}</span>{% endif %}
      </a>
      {%- else %}
      <p>No screenshots yet.</p>
      {%- endfor %}
    </div>

  </div>
</div>

<div id="lb" aria-hidden="true">
  <span class="x" id="lb-x" role="button" tabindex="0">X</span>
  <figure>
    <img id="lb-img" src="" alt="">
    <figcaption id="lb-cap"></figcaption>
  </figure>
</div>
