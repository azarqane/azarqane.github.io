/**
 * navbar.js — Navbar scroll, hamburger mobile, lien actif
 */
export function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  let menuOpen    = false;

  /* ── Effet glassmorphism au scroll ── */
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Hamburger — ouverture / fermeture ── */
  function toggleMenu(open) {
    menuOpen = open;
    if (!hamburger || !mobileNav) return;

    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));

    if (open) {
      mobileNav.style.display = 'flex';
      requestAnimationFrame(function () { mobileNav.classList.add('open'); });
      document.body.style.overflow = 'hidden';
    } else {
      mobileNav.classList.remove('open');
      setTimeout(function () { mobileNav.style.display = 'none'; }, 350);
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () { toggleMenu(!menuOpen); });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { toggleMenu(false); });
    });
  }

  /* ── Lien actif à l'IntersectionObserver ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar__nav a');

  const sectionObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        const link = document.querySelector('.navbar__nav a[href="#' + entry.target.id + '"]');
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { sectionObs.observe(s); });
}
