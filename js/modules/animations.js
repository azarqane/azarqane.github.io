/**
 * animations.js — Compteurs animés au scroll
 * Utilise IntersectionObserver pour déclencher l'animation
 * des éléments [data-count] quand ils entrent dans la fenêtre.
 */
export function initAnimations() {
  const counters = document.querySelectorAll('[data-count]');

  const counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const el       = entry.target;
      const target   = parseInt(el.dataset.count, 10);
      const suffix   = el.dataset.suffix || '';
      const duration = 1400;
      const stepTime = Math.max(Math.floor(duration / target), 16);
      let current    = 0;

      const timer = setInterval(function () {
        current++;
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, stepTime);

      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) { counterObs.observe(c); });
}
