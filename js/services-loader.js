// Dynamic Services Loader from Firestore for Customer Site
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Existing Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "rajsmmpanel.firebaseapp.com",
    projectId: "rajsmmpanel",
    storageBucket: "rajsmmpanel.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abc123def456"
};

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
