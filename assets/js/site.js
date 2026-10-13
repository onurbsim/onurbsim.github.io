/* ==========================================================================
   onurb site - all the JavaScript there is.
   No dependencies. Everything degrades to a working plain link if this
   file fails to load.
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Gallery lightbox
     Any <a data-lb href="full.png" data-cap="..."> opens in the overlay.
     ---------------------------------------------------------------------- */

  var lb = document.getElementById('lb');

  if (lb) {
    var lbImg = document.getElementById('lb-img');
    var lbCap = document.getElementById('lb-cap');

    var close = function () {
      lb.classList.remove('on');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
    };

    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-lb]');

      if (link) {
        e.preventDefault();
        lbImg.src = link.getAttribute('href');
        lbImg.alt = link.getAttribute('data-cap') || '';
        lbCap.textContent = link.getAttribute('data-cap') || '';
        lb.classList.add('on');
        lb.setAttribute('aria-hidden', 'false');
        return;
      }

      // click the backdrop or the X to dismiss
      if (e.target === lb || e.target.id === 'lb-x') close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ----------------------------------------------------------------------
     Gallery subsections
     One tab per world. The tabs are hidden in the markup and revealed here,
     so a visitor without JavaScript gets the whole gallery in one list
     instead of a row of buttons that do nothing. The choice is mirrored in
     the URL fragment, so /gallery/#mm2 opens that world's shots.
     ---------------------------------------------------------------------- */

  var gTabs = document.getElementById('g-tabs');
  var gGrid = document.getElementById('g-grid');

  if (gTabs && gGrid) {
    var gEmpty = document.getElementById('g-empty');
    var cards = gGrid.querySelectorAll('[data-world]');
    var btns = gTabs.querySelectorAll('[data-filter]');

    var pick = function (which) {
      var shown = 0;
      var i;

      for (i = 0; i < cards.length; i++) {
        var on = which === 'all' || cards[i].getAttribute('data-world') === which;
        cards[i].hidden = !on;
        if (on) shown++;
      }

      for (i = 0; i < btns.length; i++) {
        var sel = btns[i].getAttribute('data-filter') === which;
        btns[i].classList.toggle('on', sel);
        btns[i].setAttribute('aria-selected', sel ? 'true' : 'false');
      }

      if (gEmpty) gEmpty.hidden = shown > 0;
    };

    gTabs.hidden = false;

    gTabs.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-filter]');
      if (!btn) return;

      var which = btn.getAttribute('data-filter');
      pick(which);

      if (history.replaceState) {
        history.replaceState(null, '',
          which === 'all' ? location.pathname : '#' + which);
      }
    });

    /* open on the world named in the fragment, if it is one of ours */
    var want = (location.hash || '').replace('#', '');
    var known = /^[a-z0-9-]+$/.test(want) &&
                gTabs.querySelector('[data-filter="' + want + '"]');

    pick(known ? want : 'all');
  }

  /* ----------------------------------------------------------------------
     Video thumbnails: swap in the YouTube player on click, so no YouTube
     request is made until a visitor actually asks for one.
     ---------------------------------------------------------------------- */

  document.addEventListener('click', function (e) {
    var card = e.target.closest('[data-yt]');
    if (!card) return;

    e.preventDefault();

    var frame = document.createElement('iframe');
    frame.width = '100%';
    frame.height = '260';
    frame.style.border = '0';
    frame.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    frame.src = 'https://www.youtube-nocookie.com/embed/' +
                card.getAttribute('data-yt') + '?autoplay=1&rel=0';

    card.parentNode.replaceChild(frame, card);
  });

  /* ----------------------------------------------------------------------
     Banner city lights - the out-of-focus lights of the program's backdrop
     (assets/shaders/ui_backdrop.frag): a lattice of cells, about a third
     of them lit, each light at its own spot in its cell, twinkling on its
     own phase, fading in down the lower half and the whole row drifting
     left. The shader's lattice is 14 cells to a full screen's height; on a
     banner this short that is a 2 px grain, so here the lattice is coarser
     and the lights larger and brighter. The clock is the wall clock, so
     the lights carry on where they were from page to page.
     ---------------------------------------------------------------------- */

  var lights = document.querySelector('#banner .lights');

  if (lights && lights.getContext) {
    var ctx = lights.getContext('2d');
    var still = window.matchMedia &&
                matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ROWS = 10;                        /* cells to the banner's height */
    var shown = true;
    var last = 0;

    var fract = function (x) { return x - Math.floor(x); };

    /* the shader's hash(), on a cell and an offset added to both axes */
    var hash = function (x, y, k) {
      x = fract((x + k) * 123.34);
      y = fract((y + k) * 456.21);
      var d = x * (x + 45.32) + y * (y + 45.32);
      return fract((x + d) * (y + d));
    };

    var smooth = function (a, b, x) {
      x = Math.min(Math.max((x - a) / (b - a), 0), 1);
      return x * x * (3 - 2 * x);
    };

    var draw = function (now) {
      var dpr = window.devicePixelRatio || 1;
      var w = Math.round(lights.clientWidth * dpr);
      var h = Math.round(lights.clientHeight * dpr);
      if (!w || !h) return;
      if (lights.width !== w || lights.height !== h) {
        lights.width = w;
        lights.height = h;
      }

      var t = (now / 1000) % 100000;
      var c = h / ROWS;                   /* one cell, device pixels */
      var drift = t * 0.06;               /* cells */

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (var j = Math.floor(ROWS * 0.45); j < ROWS; j++) {
        for (var i = Math.floor(drift); i <= Math.ceil(drift + w / c); i++) {
          if (hash(i, j, 3) < 0.62) continue;

          var x = (i + hash(i, j, 0) * 0.6 + 0.2 - drift) * c;
          var y = (j + hash(i, j, 7) * 0.6 + 0.2) * c;
          var tw = 0.55 + 0.45 * Math.sin(t * (0.5 + hash(i, j, 9)) +
                                          hash(i, j, 0) * 6.28);
          var a = 0.8 * tw * smooth(0.5, 0.9, y / h);
          if (a <= 0) continue;

          var g = ctx.createRadialGradient(x, y, 0.06 * c, x, y, 0.3 * c);
          g.addColorStop(0, 'rgba(255,199,122,' + a + ')');
          g.addColorStop(0.5, 'rgba(255,199,122,' + a / 2 + ')');
          g.addColorStop(1, 'rgba(255,199,122,0)');
          ctx.fillStyle = g;
          ctx.fillRect(x - 0.3 * c, y - 0.3 * c, 0.6 * c, 0.6 * c);
        }
      }
    };

    /* about 30 frames a second is plenty for something this slow, and
       nothing at all while the banner is scrolled away */
    var tick = function () {
      var now = Date.now();
      if (shown && now - last > 33) {
        last = now;
        draw(now);
      }
      requestAnimationFrame(tick);
    };

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (es) {
        shown = es[0].isIntersecting;
      }).observe(lights);
    }

    window.addEventListener('resize', function () { draw(Date.now()); });

    if (still) draw(Date.now());
    else requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------------------
     Visitor counter.
     GitHub Pages has no server, so the count lives in the free Abacus API
     (namespace and key come from _config.yml). A visit is counted once per
     browser session; other page views in that session just read the number.
     Local previews never count. If the API is down the counter stays hidden.
     ---------------------------------------------------------------------- */

  var hits = document.getElementById('hits');

  if (hits && window.fetch) {
    var api = 'https://abacus.jasoncameron.dev/';
    var path = encodeURIComponent(hits.getAttribute('data-ns')) + '/' +
               encodeURIComponent(hits.getAttribute('data-key'));
    var seen = false;

    try {
      seen = sessionStorage.getItem('onurb-counted') === '1';
    } catch (err) {
      /* blocked storage - treat as a new session */
    }

    var count = hits.getAttribute('data-count') === '1' && !seen;

    fetch(api + (count ? 'hit/' : 'get/') + path)
      .then(function (res) {
        /* 404 = no visits recorded yet, which is a fine answer */
        if (res.status === 404) return { value: 0 };
        if (!res.ok) throw new Error('counter ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (typeof data.value !== 'number') return;

        if (count) {
          try { sessionStorage.setItem('onurb-counted', '1'); } catch (err) {}
        }

        hits.textContent = String(data.value).padStart(6, '0');
        document.getElementById('hits-box').hidden = false;
      })
      .catch(function () {
        /* offline, blocked or rate-limited - leave the counter hidden */
      });
  }
}());
