# onurb-site

The onurb project home page. Jekyll, served by GitHub Pages. No build step, no
node_modules, no CI - push to `main` and GitHub rebuilds it.

## First-time setup

1. Create a GitHub repo (`onurb-site`, or `<username>.github.io` for the bare
   domain) and push this folder to it.
2. Open **Settings -> Pages**, set *Source* to **Deploy from a branch**, branch
   `main`, folder `/ (root)`.
3. Edit the three marked lines in `_config.yml`:
   - `url` - `https://<your-username>.github.io`
   - `baseurl` - `/onurb-site`, or `""` if the repo is `<username>.github.io`
   - `github_repo` and `download_url`

The site is live a minute or so after the first push.

## Adding a news post

Create `_posts/YYYY-MM-DD-some-slug.md`:

```markdown
---
title: "Build 0.4 is out"
date: 2026-10-01
image: /assets/img/screens/build-04.png   # optional
---

First paragraph shows up as the excerpt on the home page.

<!--more-->

The rest of the post.
```

It appears on `/news/` and as the top card on the home page automatically.

## Adding a screenshot

1. Full-size image -> `assets/img/screens/`
2. Roughly 600px wide copy -> `assets/img/thumbs/` (optional; skip it and the
   full-size file is used for the thumbnail too)
3. Add an entry at the top of `_data/gallery.yml`

```yaml
- file:    /assets/img/screens/my-shot.png
  thumb:   /assets/img/thumbs/my-shot.png
  caption: "What it shows"
  date:    "2026-10-01"
```

Any image that is missing falls back to `assets/img/placeholder.svg`, so the
layout never breaks while you are still collecting shots.

## Adding a video

Add the YouTube id (the part after `v=`) to the top of `_data/videos.yml`:

```yaml
- youtube_id: "abcdefghijk"
  title: "Route 133 end to end"
  date:  "2026-10-01"
```

The thumbnail is pulled from YouTube; the player only loads when someone
clicks, so no YouTube request is made on page load.

## Changing the look

Everything is in `assets/css/main.css`. The Midtown Madness 2 palette is the
block of CSS variables at the top - change those and the whole site follows.

The reusable pieces:

| Class | What it is |
|---|---|
| `.win` + `.win-t` + `.win-b` | Windows 95 style titled panel |
| `.btn` / `.btn.alt` | Beveled orange / navy button |
| `.grid` / `.grid.two` | Responsive card grid, one column on a phone |
| `.thumb` | Gallery or video card |
| `.shot` | Wrapper that puts a play triangle over a thumbnail |
| `.hero` | Full-width image with caption overlay |
| `.stamp` | Small amber date tag |
| `.table-wrap` | Wrap any `<table>` in this so it scrolls instead of the page |

The layout is fluid: `clamp()` for type and spacing, `auto-fit` grids for the
nav and the card rows, `aspect-ratio` for thumbnails. It holds from 320px up,
and stops growing at 860px because a fixed centre column is the look. Four
breakpoints (760 / 520 / 380 / 1400px) plus a print stylesheet are at the
bottom of the file.

## Previewing locally (optional)

Not required - you can edit and push. But if you want it:

```sh
gem install bundler
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000/onurb-site/
```

## Files

```
_config.yml        site title, nav, tagline, ticker text, links
_data/             gallery.yml, videos.yml - the content you edit most
_layouts/          default (frame), page, post
_posts/            one markdown file per news item
assets/css/        main.css - the whole design
assets/js/         site.js - lightbox, video embeds, visitor counter
assets/img/        screens/, thumbs/, placeholder.svg, favicon.svg
index.md           home page
about.md news.md gallery.md videos.md
404.html
```
