/* ==================================================
   PLATFORM PAGE FUNCTIONALITY & CONNECTOR
   ================================================== */

// Open Left Sidebar Drawer (Reusing existing menu logic)
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

// Close Left Sidebar Drawer
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

// Handle Browser Back Button for Sidebar Close
window.addEventListener("popstate", function (event) {
  const sidebar = document.getElementById("leftSidebar");
  if (sidebar && sidebar.classList.contains("active")) {
    closeSidebar(false);
  }
});

// Option 1 Handler: 100% Real Organic Service
function handleOrganicService() {
  // Directly redirects to existing website main page / services section
  window.location.href = "../index.html#services";
}

// Option 2 Handler: Superfast Premium Quality Service
function handlePremiumService() {
  // Opens 3D Glass Coming Soon Popup
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

// Future Service Category Connection Structure
const REAL_ORGANIC_SERVICES = {
  enabled: true,
  targetUrl: "../index.html#services"
};

const PREMIUM_QUALITY_SERVICES = {
  enabled: false,
  targetUrl: null
};
