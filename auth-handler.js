import { db } from "./firebase-config.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// LocalStorage Session Key
const SESSION_KEY = "raj_smm_user_session";

// Global Modal Functions bound to Window for HTML Onclick handlers
window.openAuthModal = function(tab = 'login', event = null) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const overlay = document.getElementById("authModalOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    overlay.style.display = "flex";
    window.switchAuthTab(tab);
  }
};

window.closeAuthModal = function() {
  const overlay = document.getElementById("authModalOverlay");
  if (overlay) {
    overlay.classList.add("hidden");
    overlay.style.display = "none";
  }
};

window.switchAuthTab = function(tab) {
  const loginForm = document.getElementById("loginFormSection");
  const signupForm = document.getElementById("signupFormSection");
  const forgotForm = document.getElementById("forgotFormSection");

  if (loginForm) {
    loginForm.classList.add("hidden");
    loginForm.style.display = "none";
  }
  if (signupForm) {
    signupForm.classList.add("hidden");
    signupForm.style.display = "none";
  }
  if (forgotForm) {
    forgotForm.classList.add("hidden");
    forgotForm.style.display = "none";
  }

  if (tab === 'login' && loginForm) {
    loginForm.classList.remove("hidden");
    loginForm.style.display = "block";
  }
  if (tab === 'signup' && signupForm) {
    signupForm.classList.remove("hidden");
    signupForm.style.display = "block";
  }
  if (tab === 'forgot' && forgotForm) {
    forgotForm.classList.remove("hidden");
    forgotForm.style.display = "block";
  }
};

// Check Session on Page Load
document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
});

function checkUserSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData) {
    try {
      const user = JSON.parse(sessionData);
      window.firebaseUserUid = user.mobile; // Sync user ID for orders
      updateSidebarForLoggedInUser(user.name, user.mobile);
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
      window.firebaseUserUid = null;
      updateSidebarForLoggedOutUser();
    }
  } else {
    window.firebaseUserUid = null;
    updateSidebarForLoggedOutUser();
  }
}

function updateSidebarForLoggedInUser(name, mobile) {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (!sidebarMenu) return;

  let loginItem = sidebarMenu.querySelector("li:first-child");
  if (loginItem) {
    loginItem.innerHTML = `<a href="javascript:void(0);" onclick="handleLogout()" style="color: #ef4444; font-weight: bold;">🚪 Logout (${name || mobile})</a>`;
  }
}

function updateSidebarForLoggedOutUser() {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (!sidebarMenu) return;

  let loginItem = sidebarMenu.querySelector("li:first-child");
  if (loginItem) {
    loginItem.innerHTML = `<a href="javascript:void(0);" onclick="openAuthModal('login', event); if(typeof closeSidebar === 'function') closeSidebar();">🔐 Login / Create Account</a>`;
  }
}

// 1. CREATE ACCOUNT
window.handleSignUp = async function() {
  const nameEl = document.getElementById("signupName");
  const mobileEl = document.getElementById("signupMobile");
  const passEl = document.getElementById("signupPassword");
  const confirmPassEl = document.getElementById("signupConfirmPassword");

  if (!nameEl || !mobileEl || !passEl || !confirmPassEl) return;

  const name = nameEl.value.trim();
  const mobile = mobileEl.value.trim();
  const password = passEl.value;
  const confirmPassword = confirmPassEl.value;

  if (!name || !mobile || !password || !confirmPassword) {
    return alert("Please fill in all fields.");
  }

  if (mobile.length !== 10 || isNaN(mobile)) {
    return alert("Please enter a valid 10-digit mobile number.");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match.");
  }

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return alert("Mobile Number already registered. Please login.");
    }

    const userData = {
      name: name,
      mobile: mobile,
      password: password,
      walletBalance: 0,
      createdAt: new Date().toISOString()
    };

    await setDoc(userDocRef, userData);

    alert("Account created successfully! Redirecting to login...");

    nameEl.value = "";
    mobileEl.value = "";
    passEl.value = "";
    confirmPassEl.value = "";

    window.switchAuthTab('login');
    const loginMobileEl = document.getElementById("loginMobile");
    if (loginMobileEl) loginMobileEl.value = mobile;
  } catch (error) {
    alert("Error creating account: " + error.message);
  }
};

// 2. LOGIN
window.handleLogin = async function() {
  const mobileEl = document.getElementById("loginMobile");
  const passEl = document.getElementById("loginPassword");

  if (!mobileEl || !passEl) return;

  const mobile = mobileEl.value.trim();
  const password = passEl.value;

  if (!mobile || !password) {
    return alert("Please enter both Mobile Number and Password.");
  }

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return alert("Invalid Mobile Number or Password.");
    }

    const userData = userDoc.data();

    if (userData.password === password) {
      const sessionObj = {
        name: userData.name,
        mobile: userData.mobile,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
      window.firebaseUserUid = userData.mobile;

      alert("Login successful!");
      window.closeAuthModal();
      checkUserSession();
    } else {
      alert("Invalid Mobile Number or Password.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

// 3. FORGOT PASSWORD
window.handleResetPassword = async function() {
  const mobileEl = document.getElementById("forgotMobile");
  const passEl = document.getElementById("forgotPassword");
  const confirmPassEl = document.getElementById("forgotConfirmPassword");

  if (!mobileEl || !passEl || !confirmPassEl) return;

  const mobile = mobileEl.value.trim();
  const password = passEl.value;
  const confirmPassword = confirmPassEl.value;

  if (!mobile || !password || !confirmPassword) {
    return alert("Please fill in all fields.");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match.");
  }

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return alert("Mobile Number not registered.");
    }

    await updateDoc(userDocRef, { password: password });

    alert("Password updated successfully! You can now log in with your new password.");

    mobileEl.value = "";
    passEl.value = "";
    confirmPassEl.value = "";

    window.switchAuthTab('login');
    const loginMobileEl = document.getElementById("loginMobile");
    if (loginMobileEl) loginMobileEl.value = mobile;
  } catch (error) {
    alert("Password reset failed: " + error.message);
  }
};

// 4. LOGOUT
window.handleLogout = function() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem(SESSION_KEY);
    window.firebaseUserUid = null;
    alert("Logged out successfully.");
    checkUserSession();
  }
};
