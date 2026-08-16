// Dynamic Services Loader from Firestore for Customer Site
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Actual Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCQPiYwDQ7uxi-adcZavlnkYLLPSCA7hu4",
    authDomain: "raj-smm-panel-193ca.firebaseapp.com",
    projectId: "raj-smm-panel-193ca",
    storageBucket: "raj-smm-panel-193ca.firebasestorage.app",
    messagingSenderId: "418522080714",
    appId: "1:418522080714:web:2206d41977b751c89a1b33",
    measurementId: "G-1J8G5W5D7Y"
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
