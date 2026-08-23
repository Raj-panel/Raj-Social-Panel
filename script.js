// --- 1. Authenticaton & Session Management System ---

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userMobile = localStorage.getItem("userMobile") || "User";

  const authMenuItem = document.getElementById("authMenuItem");
  const addFundsMenuItem = document.getElementById("addFundsMenuItem");
  const headerLoginBtn = document.getElementById("headerLoginBtn");

  // সাইডবার মেনু এবং হেডার লগইন বাটনের লজিক হ্যান্ডেল করা
  if (isLoggedIn) {
    if (authMenuItem) {
      authMenuItem.innerHTML = `<a href="javascript:void(0)" onclick="logoutUser()" style="color: #ff4d4d;">🚪 Logout (${userMobile})</a>`;
    }
    if (addFundsMenuItem) {
      addFundsMenuItem.style.display = "block";
      addFundsMenuItem.innerHTML = `<a href="/add-funds/">💳 Add Funds</a>`;
    }
    if (headerLoginBtn) {
      headerLoginBtn.innerText = "Account";
      headerLoginBtn.href = "/orders/";
    }
  } else {
    if (authMenuItem) {
      authMenuItem.innerHTML = `<a href="/login/">🔐 Login / Create Account</a>`;
    }
    if (addFundsMenuItem) {
      addFundsMenuItem.style.display = "none";
    }
    if (headerLoginBtn) {
      headerLoginBtn.innerText = "Login";
      headerLoginBtn.href = "/login/";
    }
  }

  // প্রটেক্টেড পেজগুলোর সিকিউরিটি চেক
  const currentPath = window.location.pathname;
  const protectedPaths = ["/platform/", "/platform/2/", "/orders/"];
  const isProtected = protectedPaths.some((path) => currentPath.includes(path));

  if (isProtected && !isLoggedIn) {
    alert("Please login first to access this page!");
    window.location.href = "/login/";
  }
}

// লগআউট ফাংশন
function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userMobile");
  alert("Successfully logged out!");
  window.location.href = "/login/";
}

// --- 2. Navigation Drawer (Sidebar) Functions ---

function openSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebar && !sidebar.classList.contains("active")) {
    sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    history.pushState({ sidebarOpen: true }, "");
  }
}

function closeSidebar(fromUserAction = false) {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
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

// --- 3. Modals & Card Event Handlers ---

function openComingSoonModal() {
  const modal = document.getElementById("comingSoonModal");
  if (modal) modal.classList.add("active");
}

function closeComingSoonModal() {
  const modal = document.getElementById("comingSoonModal");
  if (modal) modal.classList.remove("active");
}

// Page DOM Init
document.addEventListener("DOMContentLoaded", function () {
  checkAuthStatus();

  const cards = document.querySelectorAll(
    ".glass-service-card, .service-card, .card"
  );
  cards.forEach((card) => {
    if (card.innerText.includes("Premium Quality Followers")) {
      card.style.cursor = "pointer";
      card.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "/platform/2/";
      });
    }
  });
});
