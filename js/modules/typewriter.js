/**
 * typewriter.js — Effet machine à écrire sur le hero
 * Boucle infinie sur un tableau de mots avec effacement progressif.
 */
export function initTypewriter() {
  const tw    = document.getElementById('typewriter');
  if (!tw) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const words = [
    'Admin Sys & Réseaux',
    'Ingénieur DevOps',
    'Infrastructure Cloud',
    'Spécialiste Kubernetes',
    'Expert IaC'
  ];

  if (prefersReducedMotion) {
    tw.textContent = words[1];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting  = false;

  function type() {
    const word = words[wordIndex];

    if (deleting) {
      charIndex--;
      tw.textContent = word.substring(0, charIndex);
      if (charIndex === 0) {
        deleting   = false;
        wordIndex  = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    } else {
      charIndex++;
      tw.textContent = word.substring(0, charIndex);
      if (charIndex === word.length) {
        // Pause avant d'effacer
        setTimeout(function () { deleting = true; type(); }, 2200);
        return;
      }
      setTimeout(type, 75);
    }
  }

  type();
}
