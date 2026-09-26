# onurbsim.github.io

The onurb project home page. Jekyll, served by GitHub Pages. No build step, no
node_modules, no CI - push to `main` and GitHub rebuilds it.

## First-time setup

1. The site is published at **https://onurbsim.github.io**. That needs a
   repository named exactly `onurbsim.github.io` owned by the GitHub
   organisation `onurbsim`. Push this folder to it.
2. Open **Settings -> Pages**, set *Source* to **Deploy from a branch**, branch
   `main`, folder `/ (root)`.
3. Check these in `_config.yml`:
   - `url` - `https://onurbsim.github.io`, with `baseurl` empty
   - `release` - next version number and when it is due
   - `download_url` - leave empty until a build is out; set it and the home
     page swaps the "coming" notice for a download button
   - `counter.namespace` - `onurbsim.github.io` (see *Visitor counter* below)

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

Leave `file` out and the card shows a plain colour block instead of a
picture; the same block appears if an image path is wrong. The layout never
breaks while you are still collecting shots. The home page hero works the
same way: leave `hero_image` empty in `index.md` for a plain block.

## Adding a video

Add the YouTube id (the part after `v=`) to the top of `_data/videos.yml`:

```yaml
- youtube_id: "abcdefghijk"
  title: "Route 133 end to end"
  date:  "2026-10-01"
```

The thumbnail is pulled from YouTube; the player only loads when someone
clicks, so no YouTube request is made on page load. An entry without a
`youtube_id` shows a plain colour block and is not clickable.

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

## Visitor counter

The footer counter uses the free [Abacus](https://jasoncameron.dev/abacus/)
API - no account, no key, works from a static GitHub Pages site. Each browser
session counts once. Only the live site (`JEKYLL_ENV=production`, which GitHub
Pages sets) counts visits; `jekyll serve` just reads the number. If the API is
unreachable the counter hides itself. Remove the `counter:` block from
`_config.yml` to drop it entirely.

## Previewing locally (optional)

Not required - you can edit and push. But if you want it:

```sh
gem install bundler
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000/
```

## Files

```
_config.yml        site title, nav, tagline, ticker text, links
_data/             gallery.yml, videos.yml - the content you edit most
_layouts/          default (frame), page, post
_posts/            one markdown file per news item
assets/css/        main.css - the whole design
assets/js/         site.js - lightbox, video embeds, visitor counter (Abacus API)
assets/img/        screens/, thumbs/, favicon.svg
index.md           home page
about.md news.md gallery.md videos.md
404.html
```
