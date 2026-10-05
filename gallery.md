---
layout: default
title: Gallery
permalink: /gallery/
---

<div class="win">
  <b class="win-t">Screenshot gallery</b>
  <div class="win-b">

    <p style="font-size:11px; color:#4d6076;">
      Click a shot to view it full size.
    </p>

    {%- comment -%}
      The subsection tabs are a convenience, not the page: they are revealed
      by site.js, so with no JavaScript every shot is simply listed at once.
    {%- endcomment -%}
    <div class="tabs" id="g-tabs" role="tablist" aria-label="Worlds" hidden>
      <button type="button" class="tab on" role="tab" aria-selected="true"
              data-filter="all">All <span class="n">({{ site.data.gallery | size }})</span></button>
      {%- for world in site.data.worlds %}
      {%- assign n = site.data.gallery | where: "world", world.id | size %}
      <button type="button" class="tab" role="tab" aria-selected="false"
              data-filter="{{ world.id }}">{{ world.label }} <span class="n">({{ n }})</span></button>
      {%- endfor %}
    </div>

    <div class="grid" id="g-grid">
      {%- for shot in site.data.gallery %}
      {%- if shot.file %}
      <a class="thumb" href="{{ shot.file | relative_url }}"
         data-world="{{ shot.world }}"
         data-lb data-cap="{{ shot.caption | escape }}">
        <img src="{{ shot.thumb | default: shot.file | relative_url }}"
             alt="{{ shot.caption | escape }}" loading="lazy"
             onerror="this.outerHTML='<span class=blank></span>'">
      {%- else %}
      <div class="thumb" data-world="{{ shot.world }}">
        <span class="blank"></span>
      {%- endif %}
        <span class="t">{{ shot.caption }}</span>
        {%- if shot.date %}<span class="d">{{ shot.date }}</span>{% endif %}
      {%- if shot.file %}</a>{% else %}</div>{% endif %}
      {%- else %}
      <p>No screenshots yet.</p>
      {%- endfor %}
    </div>

    <p class="g-empty" id="g-empty" hidden>No screenshots from this world yet.</p>

  </div>
</div>

<div id="lb" aria-hidden="true">
  <span class="x" id="lb-x" role="button" tabindex="0">X</span>
  <figure>
    <img id="lb-img" src="" alt="">
    <figcaption id="lb-cap"></figcaption>
  </figure>
</div>
