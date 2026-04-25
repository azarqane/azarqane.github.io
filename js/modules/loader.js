/**
 * loader.js — Injection des partials HTML via fetch()
 *
 * Charge chaque section depuis partials/ et l'injecte dans le placeholder
 * correspondant dans index.html.
 * Compatible GitHub Pages (même domaine, pas de CORS).
 */

/**
 * Charge un partial HTML et l'injecte dans un élément cible.
 * @param {string} url   — chemin vers le fichier partial
 * @param {string} id    — id de l'élément placeholder dans le DOM
 */
async function loadPartial(url, id) {
  const target = document.getElementById(id);
  if (!target) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
    target.innerHTML = await res.text();
  } catch (err) {
    console.error('[loader] Impossible de charger', url, err);
  }
}

/**
 * Charge tous les partials en parallèle puis initialise les modules JS.
 * @param {Function} onReady — callback appelé une fois tous les partials injectés
 */
export async function loadPartials(onReady) {
  await Promise.all([
    loadPartial('partials/hero.html',         'partial-hero'),
    loadPartial('partials/about-skills.html', 'partial-about-skills'),
    loadPartial('partials/projects.html',     'partial-projects'),
    loadPartial('partials/contact.html',      'partial-contact'),
  ]);
  // Initialiser Mermaid après injection (les .mermaid sont maintenant dans le DOM)
  if (typeof window.mermaid !== 'undefined') {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
    window.mermaid.run();
  }

  if (typeof onReady === 'function') onReady();
}
