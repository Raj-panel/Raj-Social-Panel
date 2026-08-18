function openSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (!sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    
    history.pushState({ sidebarOpen: true }, '');
  }
}

function closeSidebar(fromUserAction = false) {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar.classList.contains("active")) {
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

function openComingSoonModal() {
  document.getElementById("comingSoonModal").classList.add("active");
}

function closeComingSoonModal() {
  document.getElementById("comingSoonModal").classList.remove("active");
}
