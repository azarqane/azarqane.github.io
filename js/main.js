/**
 * main.js — Point d'entrée JavaScript (ES Module)
 *
 * 1. Charge les partials HTML via fetch() (loader.js)
 * 2. Initialise tous les modules une fois le DOM prêt
 *
 * Le defer est implicite avec type="module" : le DOM est prêt
 * au moment de l'exécution, pas besoin de DOMContentLoaded.
 */

import { loadPartials }   from './modules/loader.js?v=20260426b';
import { initTheme }      from './modules/theme.js?v=20260426b';
import { initNavbar }     from './modules/navbar.js?v=20260426b';
import { initTypewriter } from './modules/typewriter.js?v=20260426b';
import { initAnimations } from './modules/animations.js?v=20260426b';
import { initProjects }   from './modules/projects.js?v=20260426d';
import { initModal }      from './modules/modal.js?v=20260426b';

/* ── Charger les partials puis initialiser tous les modules ── */
loadPartials(function onReady() {
  initTheme();
  initNavbar();
  initTypewriter();
  initAnimations();
  initProjects();
  initModal();
});
