// --- 1. Authenticaton & Session Management System ---

// ইউজার লগইন স্টেট পরীক্ষা করার ফাংশন
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userMobile = localStorage.getItem("userMobile") || "User";

  const authMenuItem = document.getElementById("authMenuItem");
  const addFundsMenuItem = document.getElementById("addFundsMenuItem");
  const headerLoginBtnContainer = document.getElementById("headerLoginBtnContainer");

  // সাইডবার মেনু এবং হেডার লগইন বাটন আপডেট করা
  if (isLoggedIn) {
    if (authMenuItem) {
      authMenuItem.innerHTML = `<a href="javascript:void(0)" onclick="logoutUser()" style="color: #ff4d4d;">🚪 Logout (${userMobile})</a>`;
    }
    if (addFundsMenuItem) {
      addFundsMenuItem.style.display = "block";
      addFundsMenuItem.innerHTML = `<a href="/add-funds/">💳 Add Funds</a>`;
    }
    // লগইন করা থাকলে হেডার বারের লগইন বাটনটি হাইড হয়ে যাবে
    if (headerLoginBtnContainer) {
      headerLoginBtnContainer.style.display = "none";
    }
  } else {
    if (authMenuItem) {
      authMenuItem.innerHTML = `<a href="/login/">🔐 Login / Create Account</a>`;
    }
    if (addFundsMenuItem) {
      addFundsMenuItem.style.display = "none";
    }
    // লগইন না করা থাকলে হেডার বারের লগইন বাটনটি শো করবে
    if (headerLoginBtnContainer) {
      headerLoginBtnContainer.style.display = "block";
    }
  }

  // যদি সংরক্ষিত/লগইন-প্রয়োজনীয় পেজে লগইন ছাড়া ঢুকতে চায়, তবে /login/-এ রিডাইরেক্ট করবে
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
  // ১. সেশন স্ট্যাটাস চেক
  checkAuthStatus();

  // ২. Premium Quality Followers কার্ড ক্লিক হ্যান্ডলিং
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
```[cite: 2]
