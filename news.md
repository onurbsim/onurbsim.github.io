---
layout: default
title: News
permalink: /news/
---

<div class="win news">
  <b class="win-t">News archive</b>
  <div class="win-b">

    {%- for post in site.posts %}
    <div class="newsitem">
      <p><span class="stamp">{{ post.date | date: "%d %b %Y" }}</span></p>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt | strip_html | truncate: 260 }}</p>
      <p><a href="{{ post.url | relative_url }}">Read more &raquo;</a></p>
    </div>
    {%- else %}
    <p>No news yet.</p>
    {%- endfor %}

    <hr>
    <p style="font-size:11px;">
      Subscribe with <a href="{{ '/feed.xml' | relative_url }}">RSS</a> - the old-fashioned but standard way.
    </p>

  </div>
</div>
