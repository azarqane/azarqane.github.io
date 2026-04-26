/**
 * projects.js — SPA projets : navigation grille / vue détail + tabs + auto-scroll
 */
export function initProjects() {
  const gridView = document.getElementById('project-grid-view');
  const projectViews = document.querySelectorAll('.project-view');
  const projectTriggers = document.querySelectorAll('.project-card--interactive[data-project-link]');
  const backButtons = document.querySelectorAll('[data-back-to-grid]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastTrigger = null;
  let autoScrollRequest = null;
  let autoScrollTimeout = null;
  let activeScrollContainer = null;

  function shouldAutoScroll() {
    return window.innerWidth > 900 && !prefersReducedMotion.matches;
  }

  function stopAutoScroll() {
    if (autoScrollTimeout) {
      clearTimeout(autoScrollTimeout);
      autoScrollTimeout = null;
    }

    if (autoScrollRequest) {
      cancelAnimationFrame(autoScrollRequest);
      autoScrollRequest = null;
    }

    activeScrollContainer = null;
  }

  function startAutoScroll(container) {
    if (!container || !shouldAutoScroll()) return;

    stopAutoScroll();
    activeScrollContainer = container;
    let currentPos = container.scrollTop;
    let lastTimestamp = 0;

    function step(timestamp) {
      if (activeScrollContainer !== container) return;

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const userIsInteracting = container.matches(':hover') || container.matches(':focus-within');
      if (!userIsInteracting) {
        currentPos += delta * 0.03;
        container.scrollTop = currentPos;
      } else {
        currentPos = container.scrollTop;
      }

      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 4;
      if (atBottom) {
        stopAutoScroll();
        return;
      }

      autoScrollRequest = requestAnimationFrame(step);
    }

    autoScrollRequest = requestAnimationFrame(step);
  }

  function queueAutoScroll(container, delay) {
    stopAutoScroll();
    if (!container || !shouldAutoScroll()) return;

    autoScrollTimeout = window.setTimeout(function () {
      container.scrollTop = 0;
      startAutoScroll(container);
    }, delay);
  }

  function setActiveView(nextView) {
    projectViews.forEach(function (view) {
      const isActive = view === nextView;
      view.classList.toggle('active', isActive);
      view.hidden = !isActive;
      view.setAttribute('aria-hidden', String(!isActive));
    });
  }

  function openProject(targetId, trigger) {
    const targetView = document.getElementById(targetId);
    if (!targetView || !gridView) return;

    lastTrigger = trigger || null;
    setActiveView(targetView);
    document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });

    const panelContainer = targetView.querySelector('.projects__panels');
    if (panelContainer) queueAutoScroll(panelContainer, 600);
  }

  function returnToGrid() {
    if (!gridView) return;
    stopAutoScroll();
    setActiveView(gridView);
    document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
    if (lastTrigger) lastTrigger.focus();
  }

  /* ── Clic sur une carte projet → afficher le détail ── */
  projectTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openProject(this.dataset.projectLink, this);
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(this.dataset.projectLink, this);
      }
    });
  });

  /* ── Bouton retour → revenir à la grille ── */
  backButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      returnToGrid();
    });
  });

  /* ── Tabs intérieurs des vues projets ── */
  document.querySelectorAll('.projects__layout').forEach(function (layout, layoutIndex) {
    const sidebar = layout.querySelector('.projects__sidebar');
    const tabs = Array.from(layout.querySelectorAll('.project-tab'));
    const panels = Array.from(layout.querySelectorAll('.project-panel'));
    const panelContainer = layout.querySelector('.projects__panels');

    if (!sidebar || !tabs.length || !panels.length) return;

    sidebar.setAttribute('role', 'tablist');
    sidebar.setAttribute('aria-orientation', window.innerWidth <= 900 ? 'horizontal' : 'vertical');

    function activateTab(tab, options) {
      const target = tab.dataset.target;
      const nextPanel = document.getElementById(target);
      if (!nextPanel) return;

      tabs.forEach(function (item, index) {
        const isActive = item === tab;
        if (!item.id) item.id = 'project-tab-' + layoutIndex + '-' + index;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
        item.setAttribute('tabindex', isActive ? '0' : '-1');
        item.setAttribute('aria-controls', item.dataset.target);
      });

      panels.forEach(function (panel) {
        const isActive = panel === nextPanel;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
      });

      if (panelContainer) queueAutoScroll(panelContainer, 150);
      if (options && options.focus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      const panel = document.getElementById(tab.dataset.target);
      if (!tab.id) tab.id = 'project-tab-' + layoutIndex + '-' + index;
      tab.setAttribute('aria-controls', tab.dataset.target);
      tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');

      if (panel) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tab.id);
        panel.hidden = !panel.classList.contains('active');
      }

      tab.addEventListener('click', function () {
        activateTab(this);
      });

      tab.addEventListener('keydown', function (event) {
        const currentIndex = tabs.indexOf(this);
        let nextIndex = currentIndex;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        if (nextIndex !== currentIndex) {
          event.preventDefault();
          activateTab(tabs[nextIndex], { focus: true });
        }
      });
    });
  });

  window.addEventListener('resize', function () {
    if (!shouldAutoScroll()) stopAutoScroll();
  });

  if (gridView) setActiveView(gridView);
}
