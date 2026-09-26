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
