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
window.openAuthModal = function(tab = 'login') {
  const overlay = document.getElementById("authModalOverlay");
  if (overlay) {
    overlay.classList.remove("hidden");
    window.switchAuthTab(tab);
  }
};

window.closeAuthModal = function() {
  const overlay = document.getElementById("authModalOverlay");
  if (overlay) {
    overlay.classList.add("hidden");
  }
};

window.switchAuthTab = function(tab) {
  const loginForm = document.getElementById("loginFormSection");
  const signupForm = document.getElementById("signupFormSection");
  const forgotForm = document.getElementById("forgotFormSection");

  if (loginForm) loginForm.classList.add("hidden");
  if (signupForm) signupForm.classList.add("hidden");
  if (forgotForm) forgotForm.classList.add("hidden");

  if (tab === 'login' && loginForm) loginForm.classList.remove("hidden");
  if (tab === 'signup' && signupForm) signupForm.classList.remove("hidden");
  if (tab === 'forgot' && forgotForm) forgotForm.classList.remove("hidden");
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
    loginItem.innerHTML = `<a href="#" <a href="/login/" onclick="closeSidebar()">
    🔐 Login / Create Account
</a>>🔐 Login / Create Account</a>`;
  }
}

// 1. CREATE ACCOUNT
window.handleSignUp = async function() {
  const name = document.getElementById("signupName").value.trim();
  const mobile = document.getElementById("signupMobile").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

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

    document.getElementById("signupName").value = "";
    document.getElementById("signupMobile").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("signupConfirmPassword").value = "";

    window.switchAuthTab('login');
    document.getElementById("loginMobile").value = mobile;
  } catch (error) {
    alert("Error creating account: " + error.message);
  }
};

// 2. LOGIN
window.handleLogin = async function() {
  const mobile = document.getElementById("loginMobile").value.trim();
  const password = document.getElementById("loginPassword").value;

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
  const mobile = document.getElementById("forgotMobile").value.trim();
  const password = document.getElementById("forgotPassword").value;
  const confirmPassword = document.getElementById("forgotConfirmPassword").value;

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

    document.getElementById("forgotMobile").value = "";
    document.getElementById("forgotPassword").value = "";
    document.getElementById("forgotConfirmPassword").value = "";

    window.switchAuthTab('login');
    document.getElementById("loginMobile").value = mobile;
  } catch (error) {
    alert("Password reset failed: " + error.message);
  }
};

// 4. LOGOUT
window.handleLogout = function() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem(SESSION_KEY);
    alert("Logged out successfully.");
    checkUserSession();
  }
};
