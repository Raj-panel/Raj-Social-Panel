import { db, auth } from "./firebase-config.js";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const SESSION_KEY = "raj_smm_user_session";
let confirmationResultGlobal = null;

// Helper: Secure SHA-256 Hash Function (Password Encryption)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
  initPageSpecificAuth();
  setupRealtimeValidations();
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

// Setup real-time password length validation (< 6 chars)
function setupRealtimeValidations() {
  const signupPass = document.getElementById("signupPassword");
  if (signupPass) {
    signupPass.addEventListener("input", () => {
      const errEl = document.getElementById("passwordError");
      if (signupPass.value.length > 0 && signupPass.value.length < 6) {
        signupPass.classList.add("input-error");
        if (errEl) errEl.style.display = "block";
      } else {
        signupPass.classList.remove("input-error");
        if (errEl) errEl.style.display = "none";
      }
    });
  }

  const loginPass = document.getElementById("loginPassword");
  if (loginPass) {
    loginPass.addEventListener("input", () => {
      const errEl = document.getElementById("passwordError");
      if (loginPass.value.length > 0 && loginPass.value.length < 6) {
        loginPass.classList.add("input-error");
        if (errEl) errEl.style.display = "block";
      } else {
        loginPass.classList.remove("input-error");
        if (errEl) errEl.style.display = "none";
      }
    });
  }

  const resetPass = document.getElementById("resetNewPassword");
  if (resetPass) {
    resetPass.addEventListener("input", () => {
      const errEl = document.getElementById("resetNewPasswordError");
      if (resetPass.value.length > 0 && resetPass.value.length < 6) {
        resetPass.classList.add("input-error");
        if (errEl) errEl.style.display = "block";
      } else {
        resetPass.classList.remove("input-error");
        if (errEl) errEl.style.display = "none";
      }
    });
  }
}

// Helper to show error messages
function showGeneralError(msg) {
  const genErr = document.getElementById("generalError");
  if (genErr) {
    genErr.innerText = msg;
    genErr.style.display = "block";
  } else {
    alert(msg);
  }
}

function clearGeneralError() {
  const genErr = document.getElementById("generalError");
  if (genErr) {
    genErr.innerText = "";
    genErr.style.display = "none";
  }
}

// ========================================
// 1. CREATE ACCOUNT (NO OTP)
// ========================================
window.handleSignUp = async function() {
  clearGeneralError();
  const mobileEl = document.getElementById("signupMobile");
  const passwordEl = document.getElementById("signupPassword");
  const mobileError = document.getElementById("mobileError");
  const passwordError = document.getElementById("passwordError");

  if (!mobileEl || !passwordEl) return;

  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;
  let hasError = false;

  if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
    mobileEl.classList.add("input-error");
    if (mobileError) mobileError.style.display = "block";
    hasError = true;
  } else {
    mobileEl.classList.remove("input-error");
    if (mobileError) mobileError.style.display = "none";
  }

  if (password.length < 6) {
    passwordEl.classList.add("input-error");
    if (passwordError) passwordError.style.display = "block";
    hasError = true;
  } else {
    passwordEl.classList.remove("input-error");
    if (passwordError) passwordError.style.display = "none";
  }

  if (hasError) return;

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      showGeneralError("Mobile Number already registered. Please login.");
      return;
    }

    const hashedPassword = await hashPassword(password);

    const userData = {
      mobile: mobile,
      password: hashedPassword,
      walletBalance: 0,
      createdAt: new Date().toISOString()
    };

    await setDoc(userDocRef, userData);

    alert("Account created successfully!");
    window.location.href = `/login/?mobile=${mobile}`;
  } catch (error) {
    showGeneralError("Error creating account: " + error.message);
  }
};

// ========================================
// 2. LOGIN (NO OTP)
// ========================================
window.handleLogin = async function() {
  clearGeneralError();
  const mobileEl = document.getElementById("loginMobile");
  const passwordEl = document.getElementById("loginPassword");
  const mobileError = document.getElementById("mobileError");
  const passwordError = document.getElementById("passwordError");

  if (!mobileEl || !passwordEl) return;

  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;
  let hasError = false;

  if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
    mobileEl.classList.add("input-error");
    if (mobileError) mobileError.style.display = "block";
    hasError = true;
  } else {
    mobileEl.classList.remove("input-error");
    if (mobileError) mobileError.style.display = "none";
  }

  if (password.length < 6) {
    passwordEl.classList.add("input-error");
    if (passwordError) {
      passwordError.innerText = "Password must be at least 6 characters.";
      passwordError.style.display = "block";
    }
    hasError = true;
  } else {
    passwordEl.classList.remove("input-error");
    if (passwordError) passwordError.style.display = "none";
  }

  if (hasError) return;

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      showGeneralError("Invalid Mobile Number or Password.");
      return;
    }

    const userData = userDoc.data();
    const inputHashedPassword = await hashPassword(password);

    // Supports both SHA-256 hashed password and old legacy plaintext password fallback
    if (userData.password === inputHashedPassword || userData.password === password) {
      const sessionObj = {
        name: userData.name || mobile,
        mobile: userData.mobile,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));

      window.location.href = "/";
    } else {
      showGeneralError("Invalid Mobile Number or Password.");
    }
  } catch (error) {
    showGeneralError("Login failed: " + error.message);
  }
};

// ========================================
// 3. FORGOT PASSWORD (OTP FLOW)
// ========================================
window.handleSendOTP = async function() {
  clearGeneralError();
  const mobileEl = document.getElementById("resetMobile");
  const mobileError = document.getElementById("resetMobileError");
  if (!mobileEl) return;

  const mobile = mobileEl.value.trim();
  if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
    mobileEl.classList.add("input-error");
    if (mobileError) mobileError.style.display = "block";
    return;
  } else {
    mobileEl.classList.remove("input-error");
    if (mobileError) mobileError.style.display = "none";
  }

  try {
    const userDocRef = doc(db, "users", mobile);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      showGeneralError("Mobile Number is not registered.");
      return;
    }

    const phoneNumber = "+91" + mobile;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }

    const appVerifier = window.recaptchaVerifier;

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    confirmationResultGlobal = confirmationResult;

    document.getElementById("stepSendOtp").classList.remove("active");
    document.getElementById("stepVerifyOtp").classList.add("active");
    alert("OTP sent successfully to +91 " + mobile);

  } catch (error) {
    console.error("SMS Send Error:", error);

    if (window.recaptchaVerifier && typeof window.recaptchaVerifier.clear === 'function') {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    if (error.code === 'auth/invalid-phone-number') {
      showGeneralError("Invalid Phone Number format.");
    } else if (error.code === 'auth/captcha-check-failed') {
      showGeneralError("reCAPTCHA verification failed. Please try again.");
    } else if (error.code === 'auth/too-many-requests') {
      showGeneralError("Too many OTP requests. Please try again later.");
    } else {
      showGeneralError("Failed to send OTP: " + (error.message || "Unknown error"));
    }
  }
};

window.handleVerifyOTP = async function() {
  clearGeneralError();
  const otpInput = document.getElementById("otpInput");
  const otpError = document.getElementById("otpError");
  if (!otpInput) return;

  const otp = otpInput.value.trim();
  if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
    otpInput.classList.add("input-error");
    if (otpError) otpError.style.display = "block";
    return;
  } else {
    otpInput.classList.remove("input-error");
    if (otpError) otpError.style.display = "none";
  }

  try {
    await confirmationResultGlobal.confirm(otp);
    document.getElementById("stepVerifyOtp").classList.remove("active");
    document.getElementById("stepNewPassword").classList.add("active");
  } catch (error) {
    showGeneralError("Invalid OTP. Please try again.");
  }
};

window.handleResetPassword = async function() {
  clearGeneralError();
  const mobileEl = document.getElementById("resetMobile");
  const passwordEl = document.getElementById("resetNewPassword");
  const confirmPasswordEl = document.getElementById("resetConfirmPassword");
  const passErr = document.getElementById("resetNewPasswordError");
  const confirmErr = document.getElementById("resetConfirmPasswordError");

  if (!mobileEl || !passwordEl || !confirmPasswordEl) return;

  const mobile = mobileEl.value.trim();
  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;
  let hasError = false;

  if (password.length < 6) {
    passwordEl.classList.add("input-error");
    if (passErr) passErr.style.display = "block";
    hasError = true;
  } else {
    passwordEl.classList.remove("input-error");
    if (passErr) passErr.style.display = "none";
  }

  if (password !== confirmPassword) {
    confirmPasswordEl.classList.add("input-error");
    if (confirmErr) confirmErr.style.display = "block";
    hasError = true;
  } else {
    confirmPasswordEl.classList.remove("input-error");
    if (confirmErr) confirmErr.style.display = "none";
  }

  if (hasError) return;

  try {
    const userDocRef = doc(db, "users", mobile);
    const hashedPassword = await hashPassword(password);

    await updateDoc(userDocRef, { 
      password: hashedPassword,
      updatedAt: new Date().toISOString()
    });

    alert("Password successfully updated! Redirecting to login...");
    window.location.href = `/login/?mobile=${mobile}`;
  } catch (error) {
    showGeneralError("Password reset failed: " + error.message);
  }
};

// ========================================
// 4. LOGOUT
// ========================================
window.handleLogout = function() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem(SESSION_KEY);
    alert("Logged out successfully.");
    window.location.href = "/";
  }
};
