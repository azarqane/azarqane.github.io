/**
 * theme.js — Gestion du thème clair / sombre
 * Lecture du localStorage, toggle, mise à jour de l'icône et du tooltip.
 */
export function initTheme() {
  const root    = document.documentElement;
  const themeBtn = document.querySelector('[data-theme-toggle]');
  let current   = root.getAttribute('data-theme') || 'dark';

  /* ── Mise à jour de l'icône selon le thème ── */
  function setIcon(t) {
    if (!themeBtn) return;
    themeBtn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    themeBtn.setAttribute('aria-label', 'Basculer vers le thème ' + (t === 'dark' ? 'clair' : 'sombre'));
  }

  setIcon(current);

  /* ── Toggle au clic ── */
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      current = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      localStorage.setItem('theme', current);
      setIcon(current);

      // Masquer le tooltip si visible
      const tooltip = document.getElementById('themeTooltip');
      if (tooltip && tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
        localStorage.setItem('themeTooltipSeen', 'true');
      }
    });
  }

  /* ── Tooltip "Changer le thème ici !" (affiché une seule fois) ── */
  const tooltip = document.getElementById('themeTooltip');
  if (tooltip && !localStorage.getItem('themeTooltipSeen')) {
    setTimeout(function () {
      tooltip.classList.add('show');
      setTimeout(function () {
        tooltip.classList.remove('show');
        localStorage.setItem('themeTooltipSeen', 'true');
      }, 5000); // Disparaît après 5 s
    }, 1500); // Attend 1,5 s après le chargement
  }
}
