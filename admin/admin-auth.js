import { db } from "../firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Session Key
const ADMIN_SESSION_KEY = "AIzaSyCQPiYwDQ7uxi-adcZavlnkYLLPSCA7hu4";

document.addEventListener("DOMContentLoaded", () => {
  // Check session on protected routes (like dashboard.html)
  if (window.location.pathname.includes("/admin/dashboard.html")) {
    checkAdminAuthGuard();
  }
  
  // Auto-redirect to dashboard if already logged in when visiting login page
  if (window.location.pathname.includes("/admin/index.html") || window.location.pathname.endsWith("/admin/")) {
    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        if (session && session.isAdmin) {
          window.location.href = "dashboard.html";
        }
      } catch (e) {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    }
  }
});

/**
 * 1. Admin Login Function
 */
window.handleAdminLogin = async function() {
  const emailInput = document.getElementById("adminEmail");
  const passwordInput = document.getElementById("adminPassword");

  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const password = passwordInput ? passwordInput.value : "";

  // Validation Check
  if (!email || !password) {
    showAlert("Please fill in all fields correctly.", "error");
    return;
  }

  // Basic Email Format Check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address.", "error");
    return;
  }

  try {
    setLoadingState(true);

    // Query Firestore for user with matching email
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      showAlert("No admin account found with this email!", "error");
      setLoadingState(false);
      return;
    }

    let foundUser = null;
    querySnapshot.forEach((docSnap) => {
      foundUser = docSnap.data();
    });

    // Verify Password & Admin Access
    if (foundUser && foundUser.password === password) {
      
      // Save Active Session
      const adminSession = {
        name: foundUser.name || "Admin",
        email: foundUser.email,
        role: "admin",
        isAdmin: true,
        loggedInAt: new Date().toISOString()
      };

      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));

      showAlert("Login successful! Redirecting to dashboard...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    } else {
      showAlert("Incorrect password! Please try again.", "error");
      setLoadingState(false);
    }

  } catch (error) {
    console.error("Admin Login Error:", error);
    showAlert("Login failed: " + error.message, "error");
    setLoadingState(false);
  }
};

/**
 * 2. Route Guard Function for Dashboard
 */
function checkAdminAuthGuard() {
  const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);

  if (!sessionData) {
    redirectToLogin();
    return;
  }

  try {
    const session = JSON.parse(sessionData);
    if (!session || !session.isAdmin) {
      redirectToLogin();
    }
  } catch (e) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    redirectToLogin();
  }
}

function redirectToLogin() {
  alert("Admin access required! Please log in.");
  window.location.href = "index.html";
}

/**
 * 3. Logout Handler
 */
window.handleAdminLogout = function() {
  if (confirm("Are you sure you want to log out of the Admin Panel?")) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = "index.html";
  }
};

/**
 * Alert UI Helper
 */
function showAlert(message, type) {
  const alertBox = document.getElementById("loginAlert");
  if (!alertBox) return;

  alertBox.className = `alert-box ${type}`;
  alertBox.innerText = message;
  alertBox.style.display = "block";
}

/**
 * Button Loading State Helper
 */
function setLoadingState(isLoading) {
  const loginBtn = document.getElementById("adminLoginBtn");
  if (!loginBtn) return;

  if (isLoading) {
    loginBtn.disabled = true;
    loginBtn.innerText = "Authenticating...";
    loginBtn.style.opacity = "0.7";
  } else {
    loginBtn.disabled = false;
    loginBtn.innerText = "Login ➔";
    loginBtn.style.opacity = "1";
  }
}
