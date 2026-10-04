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
