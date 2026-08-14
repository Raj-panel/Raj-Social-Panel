/**
 * Orders Manager - Handles Local Storage persistence, Firestore sync, and time-based status automation.
 */

import { db } from "./firebase-config.js";
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const ORDER_STORAGE_KEY = 'user_local_orders';

/**
 * Get current Guest Session ID from LocalStorage
 */
function getGuestSessionId() {
    return localStorage.getItem('raj_smm_guest_session_id') || null;
}

/**
 * Get current logged in user mobile number
 */
function getLoggedInUserMobile() {
    const sessionData = localStorage.getItem("raj_smm_user_session");
    if (!sessionData) return null;
    try {
        const parsed = JSON.parse(sessionData);
        return parsed.mobile || null;
    } catch(e) {
        return null;
    }
}

/**
 * Saves a new order to Local Storage and Firestore.
 * @param {Object} orderData - Details from the successful checkout.
 */
export async function saveNewOrder(orderData) {
    const orders = getAllOrders();
    const guestSessionId = getGuestSessionId();
    const loggedInMobile = getLoggedInUserMobile();

    const newOrder = {
        orderId: orderData.orderId || Math.floor(100000 + Math.random() * 900000),
        serviceName: orderData.serviceName,
        link: orderData.link,
        quantity: orderData.quantity,
        amount: orderData.amount,
        dateTime: orderData.dateTime || new Date().toLocaleString(),
        createdTimestamp: orderData.createdTimestamp || Date.now(),
        ownerType: loggedInMobile ? "user" : "guest",
        userId: loggedInMobile || null,
        guestSessionId: guestSessionId,
        status: 'Pending'
    };

    orders.unshift(newOrder);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));

    try {
        await setDoc(doc(db, "orders", String(newOrder.orderId)), newOrder);
    } catch(e) {
        console.error("Firestore order save error:", e);
    }
}

window.saveOrderToFirestore = function(orderData) {
    saveNewOrder(orderData);
};

/**
 * Retrieves all orders for the current viewer (Guest Session ID or Logged-in Account).
 * Time-based status rules:
 * - Pending: < 5 minutes
 * - Processing: >= 5 minutes AND < 60 minutes
 * - Completed: >= 60 minutes
 */
export function getAllOrders() {
    const data = localStorage.getItem(ORDER_STORAGE_KEY);
    const loggedInMobile = getLoggedInUserMobile();
    const guestSessionId = getGuestSessionId();
    
    if (!data) return [];
    
    try {
        const orders = JSON.parse(data);
        const currentTime = Date.now();

        const filteredOrders = orders.filter(order => {
            if (loggedInMobile) {
                return order.ownerType === "user" && order.userId === loggedInMobile;
            } else {
                return order.ownerType === "guest" && order.guestSessionId === guestSessionId;
            }
        });

        return filteredOrders.map(order => {
            const elapsedMinutes = (currentTime - order.createdTimestamp) / (1000 * 60);
            let status = order.status || 'Pending';

            if (elapsedMinutes >= 60) {
                status = 'Completed';
            } else if (elapsedMinutes >= 5) {
                status = 'Processing';
            }

            return { ...order, status };
        });
    } catch (e) {
        console.error("Error parsing orders from Local Storage", e);
        return [];
    }
}

/**
 * Fetch latest claimed/user orders from Firestore on account login
 */
export async function syncUserOrdersFromFirestore() {
    const loggedInMobile = getLoggedInUserMobile();
    if (!loggedInMobile) return;

    try {
        const q = query(collection(db, "orders"), where("userId", "==", loggedInMobile), where("ownerType", "==", "user"));
        const querySnapshot = await getDocs(q);
        
        let localOrders = [];
        try {
            localOrders = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
        } catch(e) {}

        const existingMap = new Map();
        localOrders.forEach(o => existingMap.set(String(o.orderId), o));

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            existingMap.set(String(data.orderId), data);
        });

        const updatedOrders = Array.from(existingMap.values()).sort((a,b) => (b.createdTimestamp || 0) - (a.createdTimestamp || 0));
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
    } catch(e) {
        console.error("Error syncing orders from Firestore:", e);
    }
}

window.getAllOrders = getAllOrders;
window.syncUserOrdersFromFirestore = syncUserOrdersFromFirestore;
