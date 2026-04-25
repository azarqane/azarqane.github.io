/**
 * projects.js — SPA projets : navigation grille / vue détail + tabs + auto-scroll
 */
export function initProjects() {
  const gridView    = document.getElementById('project-grid-view');
  const projectCards = document.querySelectorAll('.project-card');
  const backButtons  = document.querySelectorAll('[data-back-to-grid]');

  /* ── Auto-scroll doux du tabpanel ── */
  let autoScrollActive = false;
  let scrollRequest;
  let currentPos = 0;

  function startAutoScroll(container) {
    if (!container) return;
    cancelAnimationFrame(scrollRequest);
    autoScrollActive = true;
    currentPos = container.scrollTop;

    function step() {
      if (!autoScrollActive) return;

      // Ne défile pas si l'utilisateur survole le panneau
      if (!container.matches(':hover')) {
        currentPos += 0.8;
        container.scrollTop = currentPos;
      } else {
        currentPos = container.scrollTop;
      }

      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
      if (atBottom) {
        autoScrollActive = false;
      } else {
        scrollRequest = requestAnimationFrame(step);
      }
    }

    scrollRequest = requestAnimationFrame(step);
  }

  /* ── Clic sur une carte projet → afficher le détail ── */
  projectCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const targetId  = this.dataset.projectLink;
      const targetView = document.getElementById(targetId);
      if (!targetView || !gridView) return;

      gridView.classList.remove('active');
      targetView.classList.add('active');

      // Retour en haut de la section projets
      document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });

      // Démarrer l'auto-scroll sur le premier tabpanel actif
      const scrollArea = targetView.querySelector('.projects__layout [role="tabpanel"]');
      if (scrollArea) {
        scrollArea.scrollTop = 0;
        setTimeout(function () { startAutoScroll(scrollArea); }, 600);
      }
    });
  });

  /* ── Bouton retour → revenir à la grille ── */
  backButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const activeView = document.querySelector('.project-view.active:not(#project-grid-view)');
      if (activeView) {
        activeView.classList.remove('active');
        if (gridView) gridView.classList.add('active');
      }
    });
  });

  /* ── Tabs intérieurs des vues projets ── */
  const tabs = document.querySelectorAll('.project-tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.stopPropagation();

      const target     = this.dataset.target;
      const container  = this.closest('.projects__layout');
      if (!container) return;

      const scrollArea     = container.querySelector('[role="tabpanel"]');
      const siblingTabs    = container.querySelectorAll('.project-tab');
      const siblingPanels  = container.querySelectorAll('.project-panel');

      // Désactiver tous les tabs et panels
      siblingTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      siblingPanels.forEach(function (p) { p.classList.remove('active'); });

      // Activer le tab cliqué
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.add('active');
        if (scrollArea) {
          scrollArea.scrollTop = 0;
          setTimeout(function () { startAutoScroll(scrollArea); }, 150);
        }
      }
    });
  });
}
