import { db, auth } from "./firebase-config.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

const SESSION_KEY = "raj_smm_user_session";
let confirmationResultGlobal = null;

document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
  initPageSpecificAuth();
  initRecaptcha();
});

function checkUserSession() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  const addFundsItem = document.getElementById("addFundsMenuItem");
  const currentPath = window.location.pathname;

  if (sessionData) {
    try {
      const user = JSON.parse(sessionData);
      updateSidebarForLoggedInUser(user.name, user.mobile);
      
      if (addFundsItem) {
        addFundsItem.style.setProperty("display", "block", "important");
      }
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
      updateSidebarForLoggedOutUser();
      
      if (addFundsItem) {
        addFundsItem.style.setProperty("display", "none", "important");
      }
      checkAddFundsProtection(currentPath, false);
    }
  } else {
    updateSidebarForLoggedOutUser();
    
    if (addFundsItem) {
      addFundsItem.style.setProperty("display", "none", "important");
    }
    checkAddFundsProtection(currentPath, false);
  }
}

function checkAddFundsProtection(currentPath, isLoggedIn) {
  if (currentPath.includes('/add-funds') && !isLoggedIn) {
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

  checkAddFundsProtection(currentPath, isLoggedIn);

  if (currentPath.includes('/login/') || currentPath === '/login') {
    const loginMobileInput = document.getElementById("loginMobile");
    if (loginMobileInput && prefillMobile) {
      loginMobileInput.value = prefillMobile;
    }
  }
}

function initRecaptcha() {
  const container = document.getElementById("recaptcha-container");
  if (container && !window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          // Response expired
        }
      });
      window.recaptchaVerifier.render();
    } catch (e) {
      console.error("Recaptcha init error:", e);
    }
  }
}

// 1. CREATE ACCOUNT (No OTP)
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

// 2. LOGIN (No OTP)
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

// 3. FORGOT PASSWORD - STEP A: SEND OTP
window.handleSendOTP = async function() {
  const mobileEl = document.getElementById("resetMobile") || document.getElementById("forgotMobile") || document.getElementById("mobile");
  if (!mobileEl) {
    alert("Mobile input field not found!");
    return;
  }

  const mobile = mobileEl.value.trim();
  if (!mobile || mobile.length !== 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  try {
    // Check if user exists in Firestore first
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      alert("Mobile Number not registered.");
      return;
    }

    if (!window.recaptchaVerifier) {
      initRecaptcha();
    }

    const formattedPhoneNumber = "+91" + mobile; // Adjust country code if needed (+91 for India)
    const appVerifier = window.recaptchaVerifier;

    alert("Sending OTP, please complete reCAPTCHA if prompted...");
    
    confirmationResultGlobal = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
    alert("OTP sent successfully to your mobile number!");

  } catch (error) {
    console.error("SMS error:", error);
    alert("Failed to send OTP: " + error.message);
  }
};

// 3. FORGOT PASSWORD - STEP B: VERIFY OTP
window.handleVerifyOTP = async function() {
  const otpEl = document.getElementById("resetOtp") || document.getElementById("forgotOtp") || document.getElementById("otp");
  if (!otpEl) {
    alert("OTP input field not found!");
    return;
  }

  const otpCode = otpEl.value.trim();
  if (!otpCode || otpCode.length < 6) {
    alert("Please enter a valid OTP code.");
    return;
  }

  if (!confirmationResultGlobal) {
    alert("Please request OTP first by clicking Send OTP.");
    return;
  }

  try {
    await confirmationResultGlobal.confirm(otpCode);
    alert("OTP verified successfully! You can now enter your new password.");
    
    // Enable password fields and reset button if they were disabled
    const passwordEl = document.getElementById("resetNewPassword") || document.getElementById("forgotPassword") || document.getElementById("newPassword");
    const confirmPasswordEl = document.getElementById("resetConfirmPassword") || document.getElementById("forgotConfirmPassword") || document.getElementById("confirmPassword");
    
    if (passwordEl) passwordEl.removeAttribute("disabled");
    if (confirmPasswordEl) confirmPasswordEl.removeAttribute("disabled");

  } catch (error) {
    console.error("OTP verification error:", error);
    alert("Invalid OTP! Please enter the correct code.");
  }
};

// 3. FORGOT PASSWORD - STEP C: RESET PASSWORD
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

// 4. LOGOUT
window.handleLogout = function() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem(SESSION_KEY);
    alert("Logged out successfully.");
    window.location.href = "/";
  }
};
