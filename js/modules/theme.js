/**
 * theme.js — Thème clair uniquement (mode sombre supprimé)
 */
export function initTheme() {
  // Thème clair fixé — aucun toggle nécessaire
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.removeItem('theme');
}
