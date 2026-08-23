import { db } from "./firebase-config.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const SESSION_KEY = "raj_smm_user_session";

document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
  initPageSpecificAuth();
  bindFormEvents(); // HTML inline event listener সমস্যা সমাধানের জন্য
});

// ১. সেশন পরীক্ষা এবং ডাইনামিক ইন্টারফেস আপডেট
function checkUserSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  const addFundsItem = document.getElementById("addFundsMenuItem");
  const currentPath = window.location.pathname;

  // ডান সাইডের মূল হেডার/নভবার লগইন বাটন (আইডি পরিবর্তন করে আপনার এইচটিএমএল অনুযায়ী দিতে পারেন, যেমন: topLoginBtn)
  const topLoginBtn = document.getElementById("topLoginBtn") || document.querySelector(".header-login-btn");

  if (sessionData) {
    try {
      const user = JSON.parse(sessionData);
      updateSidebarForLoggedInUser(user.name, user.mobile);
      
      // লগইন থাকলে ডান সাইডের লগইন অপশনটি হাইড করে দেওয়া হবে
      if (topLoginBtn) {
        topLoginBtn.style.setProperty("display", "none", "important");
      }

      if (addFundsItem) {
        addFundsItem.style.setProperty("display", "block", "important");
      }
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
      updateSidebarForLoggedOutUser();
      
      // লগআউট থাকলে ডান সাইডের লগইন অপশনটি শো করবে
      if (topLoginBtn) {
        topLoginBtn.style.setProperty("display", "block", "important");
      }

      if (addFundsItem) {
        addFundsItem.style.setProperty("display", "none", "important");
      }
      checkAccessProtection(currentPath, false);
    }
  } else {
    updateSidebarForLoggedOutUser();
    
    // লগআউট থাকলে ডান সাইডের লগইন অপশনটি শো করবে
    if (topLoginBtn) {
      topLoginBtn.style.setProperty("display", "block", "important");
    }

    if (addFundsItem) {
      addFundsItem.style.setProperty("display", "none", "important");
    }
    checkAccessProtection(currentPath, false);
  }
}

// ২. সুরক্ষিত পেজ চেক (সব প্ল্যাটফর্মে অ্যাক্সেস নিশ্চিত করতে)
function checkAccessProtection(currentPath, isLoggedIn) {
  // যেসব পেজে ঢুকতে লগইন বাধ্যতামূলক
  const protectedPaths = ['/add-funds', '/orders', '/platform/2'];
  const isProtected = protectedPaths.some(path => currentPath.includes(path));

  if (isProtected && !isLoggedIn) {
    alert("Please login first to access this page!");
    window.location.href = "/login/";
  }
}

function updateSidebarForLoggedInUser(name, mobile) {
  const authItem = document.getElementById("authMenuItem");
  if (!authItem) return;

  authItem.innerHTML = `<a href="#" id="dynamicLogoutBtn" style="color: #ef4444;">🚪 Logout (${name || mobile})</a>`;

  setTimeout(() => {
    const logoutBtn = document.getElementById("dynamicLogoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = function(e) {
        e.preventDefault();
        handleLogout();
      };
    }
  }, 50);
}

function updateSidebarForLoggedOutUser() {
  const authItem = document.getElementById("authMenuItem");
  if (!authItem) return;

  authItem.innerHTML = `<a href="/login/" onclick="closeSidebar();">🔐 Login / Create Account</a>`;
}

function initPageSpecificAuth() {
  const currentPath = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  const prefillMobile = urlParams.get('mobile');

  const sessionData = localStorage.getItem(SESSION_KEY);
  let isLoggedIn = false;
  if (sessionData) {
    try {
      JSON.parse(sessionData);
      isLoggedIn = true;
    } catch (e) {
      isLoggedIn = false;
    }
  }

  checkAccessProtection(currentPath, isLoggedIn);

  if (currentPath.includes('/login/') || currentPath === '/login') {
    // লগইন করা থাকলে সরাসরি হোমে নিয়ে যাবে
    if (isLoggedIn) {
      window.location.href = "/";
      return;
    }

    const loginMobileInput = document.getElementById("loginMobile");
    if (loginMobileInput && prefillMobile) {
      loginMobileInput.value = prefillMobile;
    }
  }
}

// ৩. Event Listeners অ্যাটাচ করার লজিক (Modules সমস্যার পারফেক্ট ফিক্স)
function bindFormEvents() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleLogin();
    });
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSignUp();
    });
  }

  const resetForm = document.getElementById("resetForm");
  if (resetForm) {
    resetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleResetPassword();
    });
  }
}

// 4. CREATE ACCOUNT
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

// 5. LOGIN
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
  } catch, (error) {
    alert("Login failed: " + error.message);
  }
};

// 6. RESET / FORGOT PASSWORD
window.handleResetPassword = async function() {
  const mobileEl = document.getElementById("resetMobile") || document.getElementById("forgotMobile") || document.getElementById("mobile");
  const passwordEl = document.getElementById("resetNewPassword") || document.getElementById("forgotPassword") || document.getElementById("newPassword");
  const confirmPasswordEl = document.getElementById("resetConfirmPassword") || document.getElementById("forgotConfirmPassword") || document.getElementById("confirmPassword");

  if (!mobileEl || !passwordEl || !confirmPasswordEl) {
    alert("Form elements not found! Please check HTML IDs.");
    return;
  }

  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;

  if (!mobile || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (mobile.length !== 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      alert("Mobile Number not registered.");
      return;
    }

    await updateDoc(userDocRef, { 
      password: password,
      updatedAt: new Date().toISOString()
    });

    alert("Password successfully updated! Redirecting to login...");
    setTimeout(() => {
      window.location.href = `/login/?mobile=${mobile}`;
    }, 1500);

  } catch (error) {
    console.error("Password reset error:", error);
    alert("Password reset failed: " + error.message);
  }
};

// 7. LOGOUT
window.handleLogout = function() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem(SESSION_KEY);
    alert("Logged out successfully.");
    window.location.href = "/login/";
  }
};
