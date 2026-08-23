// --- 1. Authentication & Session Management System ---

function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userMobile = localStorage.getItem("userMobile") || "User";

  const authMenuItem = document.getElementById("authMenuItem");
  const addFundsMenuItem = document.getElementById("addFundsMenuItem");
  const headerLoginBtn = document.getElementById("headerLoginBtn");

  if (isLoggedIn) {
    // সাইডবার মেনু আপডেট
    if (authMenuItem) {
      authMenuItem.innerHTML = `<a href="javascript:void(0)" onclick="logoutUser()" style="color: #ff4d4d;">🚪 Logout (${userMobile})</a>`;
    }
    if (addFundsMenuItem) {
      addFundsMenuItem.style.display = "block";
      addFundsMenuItem.innerHTML = `<a href="/add-funds/">💳 Add Funds</a>`;
    }
    // লগইন করা থাকলে হেডার থেকে 'Login' বাটন সম্পূর্ণ লুকিয়ে ফেলা হবে
    if (headerLoginBtn) {
      headerLoginBtn.style.display = "none";
    }
  } else {
    // লগইন করা না থাকলে ডিফল্ট অবস্থা
    if (authMenuItem) {
      authMenuItem.innerHTML = `<a href="/login/">🔐 Login / Create Account</a>`;
    }
    if (addFundsMenuItem) {
      addFundsMenuItem.style.display = "none";
    }
    if (headerLoginBtn) {
      headerLoginBtn.style.display = "block";
      headerLoginBtn.innerText = "Login";
      headerLoginBtn.href = "/login/";
    }
  }

  // প্রটেক্টেড পেজ সিকিউরিটি চেক
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

document.addEventListener("DOMContentLoaded", function () {
  checkAuthStatus();
});
