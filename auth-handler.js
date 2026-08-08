import { db } from "./firebase-config.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// LocalStorage Session Key
const SESSION_KEY = "raj_smm_user_session";

// Check Session on Page Load (Runs across website pages)
document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
  initPageSpecificAuth();
});

function checkUserSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (sessionData) {
    try {
      const user = JSON.parse(sessionData);
      updateSidebarForLoggedInUser(user.name, user.mobile);
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
      updateSidebarForLoggedOutUser();
    }
  } else {
    updateSidebarForLoggedOutUser();
  }
}

function updateSidebarForLoggedInUser(name, mobile) {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (!sidebarMenu) return;

  let loginItem = sidebarMenu.querySelector("li:first-child");
  if (loginItem) {
    loginItem.innerHTML = `<a href="#" onclick="handleLogout(); return false;" style="color: #ef4444;">🚪 Logout (${name || mobile})</a>`;
  }
}

function updateSidebarForLoggedOutUser() {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (!sidebarMenu) return;

  let loginItem = sidebarMenu.querySelector("li:first-child");
  if (loginItem) {
    loginItem.innerHTML = `<a href="/login/" onclick="closeSidebar();">🔐 Login / Create Account</a>`;
  }
}

// Page-specific initializations to avoid errors on pages without forms
function initPageSpecificAuth() {
  const currentPath = window.location.pathname;

  // Auto-fill mobile if redirected from signup/reset
  const urlParams = new URLSearchParams(window.location.search);
  const prefillMobile = urlParams.get('mobile');

  if (currentPath.includes('/login/') || currentPath === '/login') {
    const loginMobileInput = document.getElementById("loginMobile");
    if (loginMobileInput && prefillMobile) {
      loginMobileInput.value = prefillMobile;
    }
  }
}

// 1. CREATE ACCOUNT
window.handleSignUp = async function() {
  const nameEl = document.getElementById("signupName");
  const mobileEl = document.getElementById("signupMobile");
  const passwordEl = document.getElementById("signupPassword");
  const confirmPasswordEl = document.getElementById("signupConfirmPassword");

  if (!nameEl || !mobileEl || !passwordEl || !confirmPasswordEl) return;

  const name = nameEl.value.trim();
  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;

  if (!name || !mobile || !password || !confirmPassword) {
    return alert("Please fill in all fields.");
  }

  if (mobile.length !== 10) {
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
    window.location.href = `/login/?mobile=${mobile}`;
  } catch (error) {
    alert("Error creating account: " + error.message);
  }
};

// 2. LOGIN
window.handleLogin = async function() {
  const mobileEl = document.getElementById("loginMobile");
  const passwordEl = document.getElementById("loginPassword");

  if (!mobileEl || !passwordEl) return;

  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;

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

      alert("Login successful!");
      window.location.href = "/";
    } else {
      alert("Invalid Mobile Number or Password.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

// 3. FORGOT PASSWORD / RESET PASSWORD
window.handleResetPassword = async function() {
  const mobileEl = document.getElementById("forgotMobile");
  const passwordEl = document.getElementById("forgotPassword");
  const confirmPasswordEl = document.getElementById("forgotConfirmPassword");

  if (!mobileEl || !passwordEl || !confirmPasswordEl) return;

  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;

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
    window.location.href = `/login/?mobile=${mobile}`;
  } catch (error) {
    alert("Password reset failed: " + error.message);
  }
};

// 4. LOGOUT
window.handleLogout = function() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem(SESSION_KEY);
    alert("Logged out successfully.");
    window.location.href = "/";
  }
};
