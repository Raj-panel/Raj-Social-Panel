// Dynamic Services Loader from Firestore for Customer Site
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let app;
if (!getApps().length) {
    app = initializeApp({
        projectId: "rajsmmpanel",
        authDomain: "rajsmmpanel.firebaseapp.com",
        storageBucket: "rajsmmpanel.appspot.com"
    });
} else {
    app = getApps()[0];
}

const db = getFirestore(app);

// Fetch Active Services Live
export function listenToActiveServices(callback) {
    const servicesRef = collection(db, "services");

    onSnapshot(servicesRef, (snapshot) => {
        const activeServices = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.status === "Active") {
                activeServices.push({ id: doc.id, ...data });
            }
        });
        
        // Sort in memory by displayOrder
        activeServices.sort((a, b) => (Number(a.displayOrder) || 1) - (Number(b.displayOrder) || 1));

        if (typeof callback === 'function') {
            callback(activeServices);
        }
    }, (error) => {
        console.error("Error fetching active services:", error);
    });
}
