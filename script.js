/* ==========================================================================
   SparklePro Cleaning Services — page behaviour
   Sticky nav, mobile menu, scroll spy, before/after slider, lightbox,
   booking + contact form validation, reveals
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------ *
   * Sticky header shadow
   * ------------------------------------------------------------------ */
  var header = $('#siteHeader');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------ *
   * Mobile navigation
   * ------------------------------------------------------------------ */
  var toggle = $('#navToggle');
  var links  = $('#navLinks');

  var setMenu = function (open) {
    if (!toggle || !links) return;
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      setMenu(!links.classList.contains('is-open'));
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', function (e) {
      if (!links.classList.contains('is-open')) return;
      if (!links.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 780) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------ *
   * Scroll spy — highlight the current section in the nav
   * ------------------------------------------------------------------ */
  var navAnchors = $$('.nav__links > a:not(.btn)');
  var sections = navAnchors
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------------ *
   * Before / After comparison sliders
   * ------------------------------------------------------------------ */
  $$('.ba__frame').forEach(function (frame) {
    var after = frame.querySelector('.ba__img--after');
    var handle = frame.querySelector('.ba__handle');
    var range = frame.querySelector('.ba__range');
    if (!after || !range) return;

    var setPos = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      if (handle) handle.style.left = pct + '%';
      range.value = String(Math.round(pct));
      range.setAttribute('aria-valuenow', String(Math.round(pct)));
    };

    setPos(parseFloat(range.value) || 50);

    range.addEventListener('input', function () {
      setPos(parseFloat(range.value));
    });
  });

  /* ------------------------------------------------------------------ *
   * Gallery lightbox
   * ------------------------------------------------------------------ */
  var lightbox = $('#lightbox');
  var lightboxImg = $('#lightboxImg');
  var lightboxClose = $('#lightboxClose');
  var lastFocused = null;

  var openLightbox = function (btn) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = btn;
    lightboxImg.src = btn.dataset.src || btn.querySelector('img').src;
    var inner = btn.querySelector('img');
    lightboxImg.alt = inner ? inner.alt : '';
    lightbox.hidden = false;
    requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  };

  var closeLightbox = function () {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(function () {
      lightbox.hidden = true;
      lightboxImg.src = '';
    }, 220);
    if (lastFocused) lastFocused.focus();
  };

  $$('.gallery__item').forEach(function (btn) {
    btn.addEventListener('click', function () { openLightbox(btn); });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ------------------------------------------------------------------ *
   * Form validation (booking + contact)
   * ------------------------------------------------------------------ */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  var PHONE = /^[+]?[\d][\d\s\-()]{7,17}$/;

  var showError = function (input, message) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.toggle('is-invalid', Boolean(message));
    var slot = $('[data-error-for="' + input.id + '"]', field);
    if (slot) slot.textContent = message || '';
  };

  var validate = function (input) {
    var value = input.value.trim();

    if (!value) { showError(input, 'This field is required.'); return false; }
    if (input.type === 'email' && !EMAIL.test(value)) {
      showError(input, 'Enter a valid email address.'); return false;
    }
    if (input.type === 'tel' && !PHONE.test(value)) {
      showError(input, 'Enter a valid phone number.'); return false;
    }
    if (input.type === 'date') {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var picked = new Date(value + 'T00:00:00');
      if (isNaN(picked.getTime()) || picked < today) {
        showError(input, 'Please pick today or a future date.'); return false;
      }
    }
    if (input.tagName === 'TEXTAREA' && input.required && value.length < 10) {
      showError(input, 'Please add a few more details (10+ characters).'); return false;
    }
    showError(input, '');
    return true;
  };

  var initForm = function (form, onDone) {
    if (!form) return;
    var inputs = $$('input, select, textarea', form);

    inputs.forEach(function (input) {
      input.addEventListener('blur', function () {
        if (input.value.trim()) validate(input);
      });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('is-invalid')) validate(input);
      });
      input.addEventListener('change', function () {
        if (input.closest('.field').classList.contains('is-invalid')) validate(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstBad = null;
      inputs.forEach(function (input) {
        if (!validate(input) && !firstBad) firstBad = input;
      });

      if (firstBad) {
        firstBad.focus();
        return;
      }

      onDone();
      form.reset();
      inputs.forEach(function (input) { showError(input, ''); });
    });
  };

  initForm($('#bookingForm'), function () {
    var status = $('#bookStatus');
    if (status) status.textContent = 'Booking request received! We\u2019ll confirm your slot by call or WhatsApp shortly.';
  });

  initForm($('#contactForm'), function () {
    var status = $('#contactStatus');
    if (status) status.textContent = 'Thanks! Your enquiry has been received \u2014 we\u2019ll get back to you within one working day.';
  });

  /* ------------------------------------------------------------------ *
   * Reveal on scroll
   * ------------------------------------------------------------------ */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------------ *
   * Footer year
   * ------------------------------------------------------------------ */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
