import { auth, db } from "./firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Pseudo-email generator
const getPseudoEmail = (mobile) => `${mobile}@rajsmmpanel.in`;

export const registerUser = async (fullName, mobile, password) => {
    const email = getPseudoEmail(mobile);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        mobileNumber: mobile,
        createdAt: new Date()
    });
    return userCredential.user;
};

export const loginUser = async (mobile, password) => {
    const email = getPseudoEmail(mobile);
    return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => signOut(auth);

export const checkAuthState = (callback) => onAuthStateChanged(auth, callback);
