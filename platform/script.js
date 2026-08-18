/* ============================================================
   PLATFORM PAGE DEDICATED LOGIC & HANDLERS
   ============================================================ */

/**
 * Open High Quality Service Coming Soon Modal
 */
function openHqModal() {
  const modal = document.getElementById('hqModalOverlay');
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * Close High Quality Service Coming Soon Modal
 */
function closeHqModal(event) {
  if (event && event.target !== event.currentTarget) {
    return;
  }
  const modal = document.getElementById('hqModalOverlay');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Auto Theme Alignment with Host Website
 */
document.addEventListener('DOMContentLoaded', () => {
  // Synchronize dark mode class with system settings if not already synced by main script
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    if (!document.body.classList.contains('dark') && !document.body.classList.contains('dark-mode')) {
      document.body.classList.add('dark-mode');
    }
  }
});
