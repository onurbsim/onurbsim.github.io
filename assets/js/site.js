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
     Cosmetic: it counts this browser's own visits, in localStorage. There is
     no server here, so a real shared counter is not possible without an
     external service - and that would be one more thing to maintain.
     ---------------------------------------------------------------------- */

  var hits = document.getElementById('hits');

  if (hits) {
    var n = 1;

    try {
      n = (parseInt(localStorage.getItem('onurb-hits'), 10) || 0) + 1;
      localStorage.setItem('onurb-hits', String(n));
    } catch (err) {
      /* private window, blocked storage - just show 1 */
    }

    hits.textContent = String(n + 1336).padStart(6, '0');
  }
}());
