/* Luminary Theme — script.js (vanilla JS) */
(function () {
  'use strict';

  /* ── Theme Toggle ──────────────────────────────────────────── */
  var THEME_KEY = 'luminary-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      var icon = btn.querySelector('.theme-icon');
      if (icon) {
        icon.innerHTML = theme === 'dark' ? sunSVG() : moonSVG();
      }
    }
  }

  function moonSVG() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function sunSVG() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* Apply saved theme */
    applyTheme(getTheme());

    /* Theme toggle button */
    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = getTheme();
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }

    /* ── Sticky Nav ────────────────────────────────────────── */
    var header = document.getElementById('site-nav');
    if (header) {
      function onScroll() {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ── Mobile Nav ────────────────────────────────────────── */
    var hamburger = document.querySelector('.nav-hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        document.body.classList.toggle('nav-open');
        var expanded = document.body.classList.contains('nav-open');
        hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    /* Close mobile nav on link click */
    var navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
      });
    });

    /* ── Search Toggle ─────────────────────────────────────── */
    var searchToggle = document.querySelector('.nav-search-toggle');
    var searchPanel = document.querySelector('.search-panel');
    var searchInput = document.getElementById('search-query');

    if (searchToggle && searchPanel) {
      searchToggle.addEventListener('click', function () {
        document.body.classList.toggle('search-active');
        if (document.body.classList.contains('search-active') && searchInput) {
          setTimeout(function () { searchInput.focus(); }, 50);
        }
      });

      /* Close search on Escape */
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('search-active')) {
          document.body.classList.remove('search-active');
        }
      });

      /* Close search on outside click */
      document.addEventListener('click', function (e) {
        if (
          document.body.classList.contains('search-active') &&
          !searchPanel.contains(e.target) &&
          !searchToggle.contains(e.target)
        ) {
          document.body.classList.remove('search-active');
        }
      });
    }

    /* ── Copy Code Button ──────────────────────────────────── */
    var copyButtons = document.querySelectorAll('.code-copy');
    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var block = btn.closest('.code-block');
        if (!block) return;
        var pre = block.querySelector('pre');
        if (!pre) return;
        var text = pre.innerText || pre.textContent || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopied(btn);
          }).catch(function () {
            fallbackCopy(text, btn);
          });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });

    function showCopied(btn) {
      var original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = '#a6e3a1';
      setTimeout(function () {
        btn.textContent = original;
        btn.style.color = '';
      }, 1800);
    }

    function fallbackCopy(text, btn) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand('copy'); showCopied(btn); } catch (e) {}
      document.body.removeChild(ta);
    }

    /* ── Tabs Shortcode ────────────────────────────────────── */
    var tabContainers = document.querySelectorAll('[data-tabs]');
    tabContainers.forEach(function (container) {
      var panels = container.querySelectorAll('.tab-panel');
      if (!panels.length) return;

      /* Build tab nav */
      var nav = document.createElement('div');
      nav.className = 'tabs-nav';

      panels.forEach(function (panel, idx) {
        var trigger = panel.querySelector('.tab-trigger');
        var content = panel.querySelector('.tab-content');
        if (!trigger || !content) return;

        var btn = document.createElement('button');
        btn.className = 'tab-button' + (idx === 0 ? ' active' : '');
        btn.textContent = trigger.textContent;
        btn.setAttribute('data-tab', idx);
        nav.appendChild(btn);

        /* Hide the original trigger */
        trigger.style.display = 'none';
        content.setAttribute('data-tab-index', idx);
        if (idx === 0) content.classList.add('active');
      });

      container.insertBefore(nav, container.firstChild);

      nav.addEventListener('click', function (e) {
        var btn = e.target.closest('.tab-button');
        if (!btn) return;
        var idx = btn.getAttribute('data-tab');

        nav.querySelectorAll('.tab-button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        container.querySelectorAll('.tab-content').forEach(function (c) {
          c.classList.toggle('active', c.getAttribute('data-tab-index') === idx);
        });
      });
    });

    /* ── Collapse Shortcode ────────────────────────────────── */
    var collapseTriggers = document.querySelectorAll('.collapse-trigger');
    collapseTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var wrapper = trigger.closest('.collapse-wrapper');
        if (wrapper) {
          wrapper.classList.toggle('open');
        }
      });
    });

    /* ── Mark current nav link active ─────────────────────── */
    var currentPath = window.location.pathname;
    var navAnchors = document.querySelectorAll('.nav-menu a');
    navAnchors.forEach(function (a) {
      if (a.getAttribute('href') && currentPath.indexOf(a.getAttribute('href')) === 0) {
        a.classList.add('active');
      }
    });

  }); /* end DOMContentLoaded */

})();
