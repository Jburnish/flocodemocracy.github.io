/**
 * FloCo Democracy – script.js
 * Minimal, accessible JavaScript for site interactions.
 */

(function () {
  'use strict';

  /* ── Mobile navigation toggle ─────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isOpen));
      this.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      primaryNav.classList.toggle('is-open', !isOpen);
    });

    // Close nav when a link is clicked (single-page navigation)
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        primaryNav.classList.remove('is-open');
      });
    });

    // Close nav on Escape key (WCAG 2.1 SC 1.4.13)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        primaryNav.classList.remove('is-open');
        navToggle.focus();
      }
    });

    // Close nav when focus leaves the nav area
    document.addEventListener('focusin', function (e) {
      if (
        primaryNav.classList.contains('is-open') &&
        !primaryNav.contains(e.target) &&
        e.target !== navToggle
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        primaryNav.classList.remove('is-open');
      }
    });
  }

  /* ── Dynamic copyright year ───────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Smooth scroll for anchor links ──────────────────────── */
  // Native CSS scroll-behavior handles this; JS fallback for
  // browsers that don't support it and haven't disabled motion.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Move focus to the section for keyboard / SR users
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          target.focus({ preventScroll: true });
        }
      });
    });
  }
})();
