// Dynamic Services Loader from Firestore for Customer Site
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Existing Firebase Config (Replace apiKey, messagingSenderId, and appId with your real credentials from Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_FIREBASE_API_KEY",
    authDomain: "rajsmmpanel.firebaseapp.com",
    projectId: "rajsmmpanel",
    storageBucket: "rajsmmpanel.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch Active Services Live
export function listenToActiveServices(callback) {
    const q = query(
        collection(db, "services"),
        where("status", "==", "Active"),
        orderBy("displayOrder", "asc")
    );

    onSnapshot(q, (snapshot) => {
        const activeServices = [];
        snapshot.forEach((doc) => {
            activeServices.push({ id: doc.id, ...doc.data() });
        });
        if (typeof callback === 'function') {
            callback(activeServices);
        }
    }, (error) => {
        console.error("Error fetching active services:", error);
    });
}
