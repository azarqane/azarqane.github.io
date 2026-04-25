/**
 * main.js — Point d'entrée JavaScript (ES Module)
 *
 * 1. Charge les partials HTML via fetch() (loader.js)
 * 2. Initialise tous les modules une fois le DOM prêt
 *
 * Le defer est implicite avec type="module" : le DOM est prêt
 * au moment de l'exécution, pas besoin de DOMContentLoaded.
 */

import { loadPartials }   from './modules/loader.js';
import { initTheme }      from './modules/theme.js';
import { initNavbar }     from './modules/navbar.js';
import { initTypewriter } from './modules/typewriter.js';
import { initAnimations } from './modules/animations.js';
import { initProjects }   from './modules/projects.js';
import { initModal }      from './modules/modal.js';

/* ── Charger les partials puis initialiser tous les modules ── */
loadPartials(function onReady() {
  initTheme();
  initNavbar();
  initTypewriter();
  initAnimations();
  initProjects();
  initModal();
});
