/**
 * modal.js — Lightbox pour les images zoomables
 * Gère l'ouverture, la fermeture (clic fond, bouton ×, Escape).
 */
export function initModal() {
  const modal      = document.getElementById('image-modal');
  const modalImg   = document.getElementById('modal-img');
  const captionEl  = document.getElementById('modal-caption');
  const closeBtn   = document.querySelector('.modal-close');

  if (!modal || !modalImg) return;

  /* ── Ouvrir la lightbox sur un clic d'image zoomable ── */
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('zoomable')) {
      modal.classList.add('show');
      modalImg.src = e.target.src;
      if (captionEl) captionEl.innerHTML = e.target.alt;
      document.body.style.overflow = 'hidden';
    }
  });

  /* ── Fermer la lightbox ── */
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
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
