// =========================================================
// PLATFORM PAGE FUNCTIONALITY & MENU LOGIC
// =========================================================

// Open Sidebar Navigation Menu
function openSidebar() {
    const sidebar = document.getElementById("leftSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (sidebar && overlay && !sidebar.classList.contains("active")) {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
        
        history.pushState({ sidebarOpen: true }, '');
    }
}

// Close Sidebar Navigation Menu
function closeSidebar(fromUserAction = false) {
    const sidebar = document.getElementById("leftSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    
    if (sidebar && overlay && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
        
        if (fromUserAction && history.state && history.state.sidebarOpen) {
            history.back();
        }
    }
}

// Handle Browser Back Button for Sidebar
window.addEventListener("popstate", function () {
    const sidebar = document.getElementById("leftSidebar");
    if (sidebar && sidebar.classList.contains("active")) {
        closeSidebar(false);
    }
});

// Navigate to Organic Services (Connected to Main Service Page)
function navigateToOrganicServices() {
    // Redirects to main page where existing service system resides
    window.location.href = "/";
}

// Coming Soon Modal Controls
function openComingSoonModal() {
    const modal = document.getElementById("comingSoonModal");
    if (modal) {
        modal.classList.add("active");
    }
}

function closeComingSoonModal() {
    const modal = document.getElementById("comingSoonModal");
    if (modal) {
        modal.classList.remove("active");
    }
}
