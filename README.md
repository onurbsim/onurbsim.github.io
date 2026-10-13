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
  world:   omsi
  date:    "2026-10-01"
```

`world` files the shot under one of the gallery's subsection tabs. The ids
live in `_data/worlds.yml` - `omsi`, `mm2`, `vicecity`, `osm` - and that file
is also where you add a new world or change the order of the tabs. A shot with
no `world` only shows up under "All". The tabs are revealed by `site.js`, so
with JavaScript off the gallery is simply one list of every shot. Each one has
its own address too: `/gallery/#mm2` opens that world.

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

Everything is in `assets/css/main.css`. The site wears the program's own
"Midtown" interface (the default in-game look, after Midtown Madness 2's front
end): night blue with a cyan grid, glowing double frames, royal-blue buttons,
orange for what is selected or next, yellow for values and links, and an
abstract city sunset down the right of the backdrop. The palette is the block
of CSS variables at the top, the same colours as `mm2ui::k*` in the program's
`src/core/ui_mm2.h` - change those and the whole site follows.

Faces: **Farringdon Bold** for the logo and the big titles only (`h2`),
served from `assets/fonts/` (SIL OFL 1.1, licence in
`assets/fonts/OFL-Farringdon.txt`). It is Latin only and has no `+`; a
missing character falls back to Noto Sans. **Noto Sans** for everything that
is read, from Google Fonts (linked in `_layouts/default.html`). The cursors in
`assets/img/cursors/` are the program's own.

The reusable pieces:

| Class | What it is |
|---|---|
| `.win` + `.win-t` + `.win-b` | Titled panel: royal title bar with an orange rule, navy ruled ground, cyan frame and glow |
| `.btn` / `.btn.alt` | MM2 arrow button: orange pointing right (go) / royal pointing left (back) |
| `.grid` / `.grid.two` | Responsive card grid, one column on a phone |
| `.thumb` | Gallery or video card - a framed grid panel |
| `.tabs` + `.tab` | Row of subsection tabs above the gallery grid |
| `.shot` | Wrapper that puts a play arrowhead over a thumbnail |
| `.hero` | Full-width image with caption overlay |
| `.stamp` | Small orange slanted date tag |
| `.note` / `blockquote` | MM2's black plate, yellow text |
| `.meter` | The program's slanted, striped progress bar |
| `.table-wrap` | Wrap any `<table>` in this so it scrolls instead of the page |

The layout is fluid: `clamp()` for type and spacing, `auto-fit` grids for the
nav and the card rows, `aspect-ratio` for thumbnails. It holds from 320px up,
and stops growing at 860px because a fixed centre column is the look. The
sunset band beside the column appears from 1180px; on a phone it shrinks to a
sliver at the banner's edge. Breakpoints (760 / 520 / 380 / 1180 / 1400px), a
reduced-motion rule and a print stylesheet are at the bottom of the file.

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
_config.yml        site title, nav, tagline, links
_data/             gallery.yml, videos.yml - the content you edit most
                   worlds.yml - the gallery's subsection tabs
_layouts/          default (frame), page, post
_posts/            one markdown file per news item
assets/css/        main.css - the whole design
assets/fonts/      Farringdon-Bold.otf + its OFL licence
assets/js/         site.js - lightbox, gallery tabs, video embeds, visitor counter
assets/img/        screens/, thumbs/, favicon.svg, logo-128.png, cursors/
index.md           home page
about.md news.md gallery.md videos.md
404.html
```
