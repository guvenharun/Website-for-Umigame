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
      setTimeout(finish, 4600);
      splash.addEventListener('click', finish);
      document.addEventListener('keydown', finish);
    }
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
