/**
 * modal.js — Lightbox pour les images zoomables
 * Gère l'ouverture, la fermeture (clic fond, bouton ×, Escape).
 */
export function initModal() {
  const modal      = document.getElementById('image-modal');
  const modalImg   = document.getElementById('modal-img');
  const captionEl  = document.getElementById('modal-caption');
  const closeBtn   = document.querySelector('.modal-close');
  let lastFocusedElement = null;

  if (!modal || !modalImg) return;

  /* ── Ouvrir la lightbox sur un clic d'image zoomable ── */
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('zoomable')) {
      lastFocusedElement = document.activeElement;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      modalImg.alt = e.target.alt;
      modal.classList.add('show');
      modalImg.src = e.target.src;
      if (captionEl) captionEl.textContent = e.target.alt;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }
  });

  /* ── Fermer la lightbox ── */
  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function () { modal.hidden = true; }, 300);
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Clic sur le fond (en dehors de l'image)
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.classList.contains('modal-close')) {
      closeModal();
    }
  });

  // Touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}
