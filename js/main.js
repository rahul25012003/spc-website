/* =====================================================================
   Suryapriya Constructions — Lean main.js
   No GSAP, no Lenis, no AOS, no Three.js, no custom cursor.
   Native scroll. Bulletproof. ~250 lines.
   ===================================================================== */
(function () {
  'use strict';
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader (clean fade-out) ---------- */
  var loader = document.getElementById('loader');
  var loaderFill = document.getElementById('loaderFill');
  function hideLoader() { if (loader) loader.classList.add('is-hidden'); }
  if (loader) {
    var t0 = Date.now();
    function step() {
      var t = Math.min((Date.now() - t0) / 600, 1);
      if (loaderFill) loaderFill.style.right = ((1 - t) * 100) + '%';
      if (t < 1) requestAnimationFrame(step);
      else setTimeout(hideLoader, 80);
    }
    requestAnimationFrame(step);
    setTimeout(hideLoader, 900); // hard cap
  }

  /* ---------- Nav scroll state + back-to-top ---------- */
  var nav = document.getElementById('nav');
  var totop = document.getElementById('totop');
  var sidedots = document.getElementById('sidedots');
  var sideDotsEls = document.querySelectorAll('.sidedots__dot');
  var spyLinks = document.querySelectorAll('[data-scroll-spy]');
  var spySections = Array.prototype.slice.call(spyLinks).map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  }).filter(Boolean);
  var sideSpyEls = Array.prototype.slice.call(sideDotsEls).map(function (d) {
    var id = d.getAttribute('data-section');
    return id === 'top' ? document.body : document.getElementById(id);
  }).filter(Boolean);
  var mtabsItems = document.querySelectorAll('.mtabs__item[href^="#"]');
  var mtabsSections = Array.prototype.slice.call(mtabsItems).map(function (a) {
    var href = a.getAttribute('href');
    return href === '#top' ? document.body : document.querySelector(href);
  }).filter(Boolean);

  var scrollProgress = document.getElementById('scrollProgress');
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 40);
    if (totop) totop.classList.toggle('is-visible', y > 500);
    if (sidedots) sidedots.classList.toggle('is-visible', y > 600);
    if (scrollProgress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }

    // Top nav scroll spy
    if (spySections.length) {
      var mid = y + 100;
      var current = spySections[0];
      spySections.forEach(function (s) { if (s.offsetTop <= mid) current = s; });
      spyLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id);
      });
    }
    // Side dots
    if (sideSpyEls.length) {
      var midV = y + window.innerHeight / 2;
      var activeI = 0;
      sideSpyEls.forEach(function (s, i) {
        var top = (s === document.body) ? 0 : s.offsetTop;
        if (top <= midV) activeI = i;
      });
      sideDotsEls.forEach(function (d, i) { d.classList.toggle('is-active', i === activeI); });
    }
    // Mobile bottom tabs
    if (mtabsSections.length) {
      var midM = y + window.innerHeight / 2;
      var activeM = 0;
      mtabsSections.forEach(function (s, i) {
        var top = (s === document.body) ? 0 : s.offsetTop;
        if (top <= midM) activeM = i;
      });
      mtabsItems.forEach(function (a, i) { a.classList.toggle('is-active', i === activeM); });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', function (e) {
      if (!mobileMenu.classList.contains('is-open')) return;
      if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) burger.click();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) burger.click();
    });
  }

  /* ---------- Smooth scroll with nav offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length <= 1) return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = (nav ? nav.offsetHeight : 80) + 20;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
  if (totop) totop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Year ---------- */
  var yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- Hero slideshow ---------- */
  var heroSlides = document.querySelectorAll('.hero__slide');
  if (heroSlides.length > 1 && !reducedMotion) {
    var heroIdx = 0;
    setInterval(function () {
      heroIdx = (heroIdx + 1) % heroSlides.length;
      heroSlides.forEach(function (s, i) { s.classList.toggle('is-active', i === heroIdx); });
    }, 6500);
  }

  /* ---------- Counters (bulletproof, no library) ---------- */
  function runCounter(el) {
    if (el.getAttribute('data-counted') === '1') return;
    el.setAttribute('data-counted', '1');
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var start = performance.now();
    var dur = 1400;
    (function step(now) {
      if (!now) now = performance.now();
      var t = Math.min((now - start) / dur, 1);
      var v = Math.round(target * (1 - Math.pow(1 - t, 3)));
      el.textContent = prefix + v + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    })();
  }
  var counterEls = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { runCounter(e.target); cObs.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '300px 0px' });
    counterEls.forEach(function (el) { cObs.observe(el); });
  }
  setTimeout(function () { counterEls.forEach(function (el) { if (el.getAttribute('data-counted') !== '1') runCounter(el); }); }, 800);

  /* ---------- Bar chart ---------- */
  function fireBar(b) {
    if (b.classList.contains('is-animated')) return;
    var t = b.getAttribute('data-target');
    if (t) b.style.setProperty('--target', t + '%');
    b.classList.add('is-animated');
  }
  var barEls = document.querySelectorAll('.chart__bar');
  if ('IntersectionObserver' in window) {
    var bObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { fireBar(e.target); bObs.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '200px 0px' });
    barEls.forEach(function (b) { bObs.observe(b); });
  }
  setTimeout(function () { barEls.forEach(fireBar); }, 900);

  /* ---------- Swiper ---------- */
  if (typeof Swiper !== 'undefined') {
    new Swiper('#featuredSwiper', {
      slidesPerView: 'auto',
      spaceBetween: 22,
      grabCursor: true,
      loop: true,
      speed: 600,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '#featNext', prevEl: '#featPrev' },
    });
  }

  /* ---------- Project list cards → open modal (instead of lightbox) ---------- */
  var caseStudyMap = {
    'sats-food':         'case-study-sats.html',
    'menzies-aviation':  'case-study-menzies.html',
    'hoskote-logistics': 'case-study-hoskote.html',
    'wildcraft':         'case-study-wildcraft.html',
    'rossell-techsys':   'case-study-rossell.html',
  };
  document.querySelectorAll('.projlist__grid .proj').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      var img = card.querySelector('.proj__img img');
      var badge = card.querySelector('.proj__badge');
      var h3 = card.querySelector('h3');
      var loc = card.querySelector('.proj__loc');
      var scope = card.querySelector('.proj__scope');
      var meta = card.querySelectorAll('.proj__meta span');
      var slug = '';
      if (img && img.src) {
        var m = img.src.match(/projects\/([a-z0-9-]+)-\d+\.jpg/i);
        if (m) slug = m[1];
      }
      var data = {
        name: h3 ? h3.textContent.trim() : '',
        tag: badge ? badge.textContent.replace(/\s+/g, ' ').trim() : '',
        location: loc ? loc.textContent.replace(/\s+/g, ' ').trim() : '',
        img: img ? img.src : '',
        area: meta[0] ? meta[0].textContent : '',
        value: meta[1] ? meta[1].textContent : '',
        duration: meta[2] ? meta[2].textContent : '',
        scope: scope ? scope.innerHTML : '',
        cs: caseStudyMap[slug] || ''
      };
      window.dispatchEvent(new CustomEvent('project:open', { detail: data }));
    });
    card.style.cursor = 'pointer';
  });

  /* ---------- Per-project galleries (multi-image lightbox groups) ---------- */
  var projGalleries = {
    'sats-food': 4, 'menzies-aviation': 4, 'hoskote-logistics': 2, 'wildcraft': 2,
    'sher-logistics': 4, 'tuv-sud': 3, 'peekay-steels': 4, 'british-biologicals': 2,
    'united-motors': 3, 'dishanand': 4, 'integra-micro': 4, 'imac-coach': 3, 'rmz': 2,
  };
  document.querySelectorAll('.proj.glightbox, .featured__card.glightbox').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var m = href.match(/images\/projects\/([a-z\-]+)-(\d+)\.jpg/);
    if (!m) return;
    var slug = m[1], count = projGalleries[slug];
    if (!count || count < 2) return;
    link.setAttribute('data-gallery', 'proj-' + slug);
    for (var i = 1; i <= count; i++) {
      var candidate = 'images/projects/' + slug + '-' + i + '.jpg';
      if (candidate === href) continue;
      var a = document.createElement('a');
      a.href = candidate;
      a.className = 'glightbox';
      a.setAttribute('data-gallery', 'proj-' + slug);
      a.style.display = 'none';
      link.parentNode.insertBefore(a, link.nextSibling);
    }
  });

  /* ---------- GLightbox ---------- */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }

  /* ---------- Before/After slider ---------- */
  var ba = document.getElementById('baSlider');
  if (ba) {
    var baHandle = ba.querySelector('.ba__handle');
    var baAfter = ba.querySelector('.ba__img--after');
    var dragging = false;
    function setPos(cx) {
      var r = ba.getBoundingClientRect();
      var pct = Math.max(0, Math.min(100, ((cx - r.left) / r.width) * 100));
      if (baHandle) baHandle.style.left = pct + '%';
      if (baAfter) baAfter.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    }
    ba.addEventListener('mousedown', function (e) { dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', function (e) { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', function () { dragging = false; });
    ba.addEventListener('touchstart', function (e) { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', function () { dragging = false; });
  }

  /* ---------- Form submit (toast instead of confetti) ---------- */
  var form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="name"]') || {}).value || '';
      var email = (form.querySelector('[name="email"]') || {}).value || '';
      var msg = (form.querySelector('[name="message"]') || {}).value || '';
      if (!name.trim() || !email.trim() || !msg.trim()) return;
      // Show toast
      var t = document.createElement('div');
      t.className = 'toast';
      t.innerHTML = '<i class="fa-solid fa-check"></i> Sent! We will be in touch within 24 hours.';
      document.body.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('is-visible'); });
      setTimeout(function () { t.classList.remove('is-visible'); setTimeout(function () { t.remove(); }, 400); }, 4000);
      form.reset();
    });
  }

  /* ---------- Image decoding hints ---------- */
  document.querySelectorAll('img').forEach(function (img) {
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    var isHero = img.closest('.hero, .hero__bg');
    if (!isHero && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  /* ---------- Service Worker ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
