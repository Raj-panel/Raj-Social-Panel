document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const leftSidebar = document.getElementById("leftSidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");

  const organicServicesSection = document.getElementById("organicServicesSection");
  const premiumServicesSection = document.getElementById("premiumServicesSection");

  const comingSoonModal = document.getElementById("comingSoonModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalOkBtn = document.getElementById("modalOkBtn");

  const watchTutorialBtn = document.getElementById("watchTutorialBtn");
  const tutorialCard = document.getElementById("tutorialCard");

  /* ==================================================
     1. SIDEBAR MENU LOGIC (REUSING MAIN PANEL SYSTEM)
     ================================================== */
  function openSidebar() {
    if (leftSidebar && sidebarOverlay) {
      leftSidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    }
  }

  function closeSidebar() {
    if (leftSidebar && sidebarOverlay) {
      leftSidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);

  /* ==================================================
     2. FIRST OPTION: 100% REAL ORGANIC SERVICE
     Connects seamlessly to existing main website services
     ================================================== */
  if (organicServicesSection) {
    organicServicesSection.addEventListener("click", function () {
      window.location.href = "../#order";
    });
  }

  /* ==================================================
     3. SECOND OPTION: SUPER FAST PREMIUM QUALITY
     Opens the Coming Soon Modal
     ================================================== */
  function openComingSoonModal() {
    if (comingSoonModal) comingSoonModal.classList.add("active");
  }

  function closeComingSoonModal() {
    if (comingSoonModal) comingSoonModal.classList.remove("active");
  }

  if (premiumServicesSection) {
    premiumServicesSection.addEventListener("click", openComingSoonModal);
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeComingSoonModal);
  if (modalOkBtn) modalOkBtn.addEventListener("click", closeComingSoonModal);

  if (comingSoonModal) {
    comingSoonModal.addEventListener("click", function (e) {
      if (e.target === comingSoonModal) {
        closeComingSoonModal();
      }
    });
  }

  /* ==================================================
     4. TUTORIAL THUMBNAIL CLICK ACTION
     ================================================== */
  if (tutorialCard) {
    tutorialCard.addEventListener("click", function () {
      if (watchTutorialBtn) {
        window.open(watchTutorialBtn.href, "_blank");
      }
    });
  }
});
