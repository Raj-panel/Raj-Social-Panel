import { db } from "../firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Session Keys & Security Config
const ADMIN_SESSION_KEY = "raj_admin_active_session";

// ⚠️ এটি আপনার সিক্রেট সিকিউরিটি কী (আপনি প্রয়োজনমতো পরিবর্তন করতে পারেন)
const ADMIN_SECRET_KEY = "AIzaSyCQPiYwDQ7uxi-adcZavlnkYLLPSCA7hu4";

document.addEventListener("DOMContentLoaded", () => {
  // ড্যাশবোর্ড বা অন্যান্য সিকিউর পেজে থাকলে সেশন অটোমেটিক চেক করবে
  if (window.location.pathname.includes("/admin/dashboard.html")) {
    checkAdminAuthGuard();
  }
  
  // লগইন পেজে থাকলে যদি অলরেডি লগইন থাকে তবে ড্যাশবোর্ডে রিডাইরেক্ট করবে
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
 * ১. অ্যাডমিন লগইন প্রসেসিং ফাংশন
 */
window.handleAdminLogin = async function() {
  const mobileInput = document.getElementById("adminMobile");
  const passwordInput = document.getElementById("adminPassword");
  const secretKeyInput = document.getElementById("adminSecretKey");
  const loginBtn = document.getElementById("adminLoginBtn");

  const mobile = mobileInput ? mobileInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";
  const secretKey = secretKeyInput ? secretKeyInput.value.trim() : "";

  // Validation Check
  if (!mobile || !password || !secretKey) {
    showAlert("সবগুলো ফিল্ড সঠিকভাবে পুরণ করুন।", "error");
    return;
  }

  if (mobile.length !== 10) {
    showAlert("সঠিক ১০ ডিজিটের মোবাইল নম্বর দিন।", "error");
    return;
  }

  // Secret Key Check
  if (secretKey !== ADMIN_SECRET_KEY) {
    showAlert("ভুল সিক্রেট সিকিউরিটি কী (Admin Key)!", "error");
    return;
  }

  try {
    setLoadingState(true);

    // Firestore থেকে ইউজার ডাটা চেক
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      showAlert("এই নম্বরে কোনো অ্যাকাউন্ট খুঁজে পাওয়া যায়নি!", "error");
      setLoadingState(false);
      return;
    }

    const userData = userDoc.data();

    // Password & Admin Role Check
    if (userData.password === password) {
      // সেশন ডাটা তৈরি
      const adminSession = {
        name: userData.name || "Admin",
        mobile: userData.mobile,
        role: "admin",
        isAdmin: true,
        loggedInAt: new Date().toISOString()
      };

      // LocalStorage-এ সিকিউর সেশন সেভ
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));

      showAlert("লগইন সফল হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    } else {
      showAlert("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।", "error");
      setLoadingState(false);
    }

  } catch (error) {
    console.error("Admin Login Error:", error);
    showAlert("লগইন করতে সমস্যা হয়েছে: " + error.message, "error");
    setLoadingState(false);
  }
};

/**
 * ২. সিকিউরিটি গার্ড চেক (Dashboard Protected Route)
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
  alert("অ্যাডমিন এক্সেস প্রয়োজন! দয়া করে লগইন করুন।");
  window.location.href = "index.html";
}

/**
 * ৩. অ্যাডমিন লগআউট হ্যান্ডলার
 */
window.handleAdminLogout = function() {
  if (confirm("আপনি কি অ্যাডমিন প্যানেল থেকে লগআউট করতে চান?")) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    window.location.href = "index.html";
  }
};

/**
 * UI Helper Functions
 */
function showAlert(message, type) {
  const alertBox = document.getElementById("loginAlert");
  if (!alertBox) return;

  alertBox.className = `alert-box ${type}`;
  alertBox.innerText = message;
  alertBox.style.display = "block";
}

function setLoadingState(isLoading) {
  const loginBtn = document.getElementById("adminLoginBtn");
  if (!loginBtn) return;

  if (isLoading) {
    loginBtn.disabled = true;
    loginBtn.innerText = "যাচাই করা হচ্ছে...";
    loginBtn.style.opacity = "0.7";
  } else {
    loginBtn.disabled = false;
    loginBtn.innerText = "লগইন করুন ➔";
    loginBtn.style.opacity = "1";
  }
}
