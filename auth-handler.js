import { auth, db } from "./firebase-config.js";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

let confirmationResult = null;
let currentUserData = null;

// UI Helpers
window.openAuthModal = (tab = 'login') => {
  document.getElementById("authModalOverlay").classList.remove("hidden");
  window.switchAuthTab(tab);
};

window.closeAuthModal = () => {
  document.getElementById("authModalOverlay").classList.add("hidden");
};

window.switchAuthTab = (tab) => {
  document.getElementById("loginFormSection").classList.add("hidden");
  document.getElementById("signupFormSection").classList.add("hidden");
  document.getElementById("forgotFormSection").classList.add("hidden");

  if (tab === 'login') document.getElementById("loginFormSection").classList.remove("hidden");
  if (tab === 'signup') document.getElementById("signupFormSection").classList.remove("hidden");
  if (tab === 'forgot') document.getElementById("forgotFormSection").classList.remove("hidden");
};

// Persistent Auth Observer
onAuthStateChanged(auth, async (user) => {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      currentUserData = userDoc.data();
      updateSidebarForLoggedInUser(currentUserData.mobile);
    }
  } else {
    currentUserData = null;
    updateSidebarForLoggedOutUser();
  }
});

function updateSidebarForLoggedInUser(mobile) {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (!sidebarMenu) return;

  let loginItem = sidebarMenu.querySelector("li:first-child");
  if (loginItem) {
    loginItem.innerHTML = `<a href="#" onclick="handleLogout(); return false;" style="color: #ef4444;">🚪 Logout (${mobile})</a>`;
  }
}

function updateSidebarForLoggedOutUser() {
  const sidebarMenu = document.querySelector(".sidebar-menu");
  if (!sidebarMenu) return;

  let loginItem = sidebarMenu.querySelector("li:first-child");
  if (loginItem) {
    loginItem.innerHTML = `<a href="#" onclick="openAuthModal('login'); return false;">🔐 Login / Sign Up</a>`;
  }
}

// Recaptcha Initializer
function setupRecaptcha(containerId) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': () => {}
    });
  }
}

// 1. SIGN UP
window.sendOtpForSignup = async () => {
  const mobile = document.getElementById("signupMobile").value.trim();
  if (mobile.length !== 10) return alert("Please enter a valid 10-digit mobile number.");

  const formattedPhone = "+91" + mobile;

  try {
    const userDoc = await getDoc(doc(db, "users_by_phone", mobile));
    if (userDoc.exists()) {
      return alert("This mobile number is already registered. Please login.");
    }

    setupRecaptcha('recaptcha-container-signup');
    confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
    document.getElementById("signupOtpBox").classList.remove("hidden");
    document.getElementById("btnSendOtpSignup").classList.add("hidden");
    alert("OTP sent successfully to " + formattedPhone);
  } catch (error) {
    alert("Error sending OTP: " + error.message);
  }
};

window.verifyOtpAndSignup = async () => {
  const otp = document.getElementById("signupOtp").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;
  const mobile = document.getElementById("signupMobile").value.trim();

  if (!otp || !password) return alert("Please fill all fields.");
  if (password !== confirmPassword) return alert("Passwords do not match.");

  try {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;

    // Save User Data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      mobile: mobile,
      password: password, // Ready for future features (Wallet, Orders, Profile)
      walletBalance: 0,
      createdAt: new Date().toISOString()
    });

    await setDoc(doc(db, "users_by_phone", mobile), { uid: user.uid });

    alert("Account created successfully!");
    closeAuthModal();
  } catch (error) {
    alert("Invalid OTP or Registration Failed: " + error.message);
  }
};

// 2. LOGIN
window.handleLogin = async () => {
  const mobile = document.getElementById("loginMobile").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!mobile || !password) return alert("Please fill all fields.");

  try {
    const phoneDoc = await getDoc(doc(db, "users_by_phone", mobile));
    if (!phoneDoc.exists()) {
      return alert("Mobile number not registered. Please Sign Up.");
    }

    const uid = phoneDoc.data().uid;
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists() && userDoc.data().password === password) {
      alert("Logged in successfully!");
      closeAuthModal();
      location.reload();
    } else {
      alert("Incorrect password.");
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

// 3. FORGOT PASSWORD
window.sendOtpForForgot = async () => {
  const mobile = document.getElementById("forgotMobile").value.trim();
  if (mobile.length !== 10) return alert("Please enter a valid 10-digit mobile number.");

  const formattedPhone = "+91" + mobile;

  try {
    const phoneDoc = await getDoc(doc(db, "users_by_phone", mobile));
    if (!phoneDoc.exists()) {
      return alert("This mobile number is not registered.");
    }

    setupRecaptcha('recaptcha-container-forgot');
    confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
    document.getElementById("forgotOtpBox").classList.remove("hidden");
    document.getElementById("btnSendOtpForgot").classList.add("hidden");
    alert("OTP sent to " + formattedPhone);
  } catch (error) {
    alert("Error sending OTP: " + error.message);
  }
};

window.verifyOtpAndResetPassword = async () => {
  const otp = document.getElementById("forgotOtp").value.trim();
  const password = document.getElementById("forgotPassword").value;
  const confirmPassword = document.getElementById("forgotConfirmPassword").value;
  const mobile = document.getElementById("forgotMobile").value.trim();

  if (!otp || !password) return alert("Please fill all fields.");
  if (password !== confirmPassword) return alert("Passwords do not match.");

  try {
    await confirmationResult.confirm(otp);
    const phoneDoc = await getDoc(doc(db, "users_by_phone", mobile));
    const uid = phoneDoc.data().uid;

    await updateDoc(doc(db, "users", uid), { password: password });

    alert("Password updated successfully! Please Login.");
    switchAuthTab('login');
  } catch (error) {
    alert("OTP Verification or Password Reset Failed: " + error.message);
  }
};

// 4. LOGOUT
window.handleLogout = async () => {
  if (confirm("Are you sure you want to logout?")) {
    await signOut(auth);
    location.reload();
  }
};
