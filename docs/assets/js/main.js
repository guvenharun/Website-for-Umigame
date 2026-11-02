(function () {
  'use strict';

  // ----- Intro screen (Home). The head script decides whether it plays (once per session). -----
  var splash = document.getElementById('splash');
  if (splash) {
    var root = document.documentElement;
    if (!root.classList.contains('splash-on')) {
      splash.remove();
    } else {
      var covered = document.querySelectorAll('.site-header, main, .site-footer');
      covered.forEach(function (el) { el.setAttribute('inert', ''); });
      var finished = false;
      var finish = function () {
        if (finished) return;
        finished = true;
        splash.classList.add('is-leaving');
        setTimeout(function () {
          splash.remove();
          root.classList.remove('splash-on');
          covered.forEach(function (el) { el.removeAttribute('inert'); });
        }, 750);
      };
      setTimeout(finish, 2400);
      splash.addEventListener('click', finish);
      document.addEventListener('keydown', finish);
    }
  }

  // ----- Screenshot lightbox (game pages) -----
  var gallery = document.querySelector('.gallery');
  if (gallery) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
    var box = null, img, count, current = 0, opener = null, startX = null;
    var show = function (i) {
      current = (i + items.length) % items.length;
      img.src = items[current].href;
      img.alt = items[current].querySelector('img').alt;
      count.textContent = (current + 1) + ' / ' + items.length;
      new Image().src = items[(current + 1) % items.length].href; // preload next
    };
    var close = function () {
      if (!box) return;
      box.remove(); box = null;
      document.documentElement.classList.remove('lightbox-open');
      document.removeEventListener('keydown', onKey);
      if (opener) opener.focus();
    };
    var onKey = function (e) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
      else if (e.key === 'Tab') { // keep focus inside the dialog
        var f = box.querySelectorAll('button'); var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    var btn = function (cls, label, text) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = cls; b.setAttribute('aria-label', label); b.textContent = text;
      return b;
    };
    var open = function (i) {
      opener = items[i];
      box = document.createElement('div');
      box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
      img = document.createElement('img'); img.className = 'lightbox-img';
      count = document.createElement('p'); count.className = 'lightbox-count'; count.setAttribute('aria-live', 'polite');
      var x = btn('lightbox-close', gallery.dataset.close, '\u00D7');
      var p = btn('lightbox-prev', gallery.dataset.prev, '\u2039');
      var n = btn('lightbox-next', gallery.dataset.next, '\u203A');
      x.addEventListener('click', close);
      p.addEventListener('click', function () { show(current - 1); });
      n.addEventListener('click', function () { show(current + 1); });
      box.addEventListener('click', function (e) { if (e.target === box) close(); });
      box.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
      box.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX; startX = null;
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      }, { passive: true });
      box.appendChild(img); box.appendChild(x); box.appendChild(p); box.appendChild(n); box.appendChild(count);
      document.body.appendChild(box);
      document.documentElement.classList.add('lightbox-open');
      document.addEventListener('keydown', onKey);
      show(i); x.focus();
    };
    items.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
  }

  // ----- Mobile navigation -----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function () { setOpen(false); });
  }

  // ----- Scroll reveal -----
  var targets = document.querySelectorAll('.section, .cta, .card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    // Only hide what is below the fold; anything already visible stays visible.
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal');
        io.observe(el);
      }
    });
  }
})();
