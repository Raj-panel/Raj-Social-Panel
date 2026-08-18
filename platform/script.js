/* ==================================================
   PLATFORM PAGE INTERACTION & CONNECTOR SCRIPT
   ================================================== */

// Existing Menu Sidebar Drawer Logic Integration
function openSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar && !sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    history.pushState({ sidebarOpen: true }, '');
  }
}

function closeSidebar(fromUserAction = false) {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
    
    if (fromUserAction && history.state && history.state.sidebarOpen) {
      history.back();
    }
  }
}

window.addEventListener("popstate", function (event) {
  const sidebar = document.getElementById("leftSidebar");
  if (sidebar && sidebar.classList.contains("active")) {
    closeSidebar(false);
  }
});

// App Click Handler
function selectApp(platformName) {
  // Directs user to main site with selected platform
  window.location.href = "../index.html?platform=" + encodeURIComponent(platformName);
}

// Option 1 Logic: REAL_ORGANIC_SERVICES
function handleOrganicService() {
  // Connects directly to existing website services
  window.location.href = "../index.html#services";
}

// Option 2 Logic: PREMIUM_QUALITY_SERVICES
function handlePremiumService() {
  // Displays "COMING SOON" popup
  const modal = document.getElementById("comingSoonModal");
  if (modal) {
    modal.classList.add("active");
  }
}

// Close Modal Handler
function closeComingSoonModal(event) {
  if (!event || event.target.id === "comingSoonModal" || event.target.tagName === "BUTTON") {
    const modal = document.getElementById("comingSoonModal");
    if (modal) {
      modal.classList.remove("active");
    }
  }
}

// Future Extensibility Structure
const REAL_ORGANIC_SERVICES = {
  active: true,
  redirectUrl: "../index.html"
};

const PREMIUM_QUALITY_SERVICES = {
  active: false,
  launchMessage: "Coming Soon"
};
