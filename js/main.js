(function () {
  'use strict';

  /* ── Theme toggle ────────────────────────────────────────── */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.setAttribute('title', label);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
    applyTheme(root.getAttribute('data-theme') || 'dark');
  }

  /* ── Navigation scroll state ─────────────────────────────── */
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const toggle = document.querySelector('.nav__toggle');
  const linksEl = document.querySelector('.nav__links');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────────── */
  if (toggle) {
    toggle.addEventListener('click', () => {
      linksEl.classList.toggle('open');
      toggle.setAttribute('aria-expanded', linksEl.classList.contains('open'));
    });
    navLinks.forEach((l) =>
      l.addEventListener('click', () => linksEl.classList.remove('open'))
    );
  }

  /* ── Intersection Observer — scroll reveals ──────────────── */
  const revealOpts = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, revealOpts);

  document
    .querySelectorAll('.reveal, .clinical-card, .skill-row, .timeline__item, .edu-card')
    .forEach((el) => revealObs.observe(el));

  /* ── Skill bar fill animation ────────────────────────────── */
  const skillObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const fill = entry.target.querySelector('.skill-row__fill');
        const pct = entry.target.dataset.level;
        if (fill && pct) fill.style.width = pct + '%';
        skillObs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('.skill-row').forEach((row) => skillObs.observe(row));

  /* ── Stagger clinical cards ──────────────────────────────── */
  document.querySelectorAll('.clinical-card').forEach((card, i) => {
    card.style.transitionDelay = i * 0.12 + 's';
  });

  document.querySelectorAll('.skill-row').forEach((row, i) => {
    row.style.transitionDelay = i * 0.08 + 's';
  });

  document.querySelectorAll('.timeline__item').forEach((item, i) => {
    item.style.transitionDelay = i * 0.15 + 's';
  });

  /* ── Smooth anchor offset ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ── Dossier download placeholder ──────────────────────── */
  const dossierBtn = document.getElementById('download-dossier');
  if (dossierBtn) {
    dossierBtn.addEventListener('click', () => {
      alert(
        'Official dossier will be available upon request.\n\nContact: pramit BHATE'
      );
    });
  }
})();
