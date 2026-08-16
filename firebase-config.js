// Firebase SDK Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQPiYwDQ7uxi-adcZavlnkYLLPSCA7hu4",
  authDomain: "raj-smm-panel-193ca.firebaseapp.com",
  projectId: "raj-smm-panel-193ca",
  storageBucket: "raj-smm-panel-193ca.firebasestorage.app",
  messagingSenderId: "418522080714",
  appId: "1:418522080714:web:2206d41977b751c89a1b33",
  measurementId: "G-1J8G5W5D7Y"
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Keep user logged in session
auth.settings.appVerificationDisabledForTesting = false;
