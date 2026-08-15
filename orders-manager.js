/**
 * Orders Manager - Handles Secure Guest Ownership, Account Claiming, 
 * Firestore Persistence, and Dynamic Status Calculations.
 */

import { db } from "./firebase-config.js";
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  writeBatch 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const ORDER_STORAGE_KEY = 'user_local_orders';
const GUEST_DEVICE_KEY = 'raj_smm_guest_device_id';
const SESSION_KEY = "raj_smm_user_session";

/**
 * Gets or creates a securely generated random guest device identifier.
 * Uses Crypto API to prevent predictability.
 */
export function getGuestDeviceId() {
  let guestId = localStorage.getItem(GUEST_DEVICE_KEY);
  if (!guestId) {
    const array = new Uint8Array(24);
    window.crypto.getRandomValues(array);
    guestId = 'gdev_' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    localStorage.setItem(GUEST_DEVICE_KEY, guestId);
  }
  return guestId;
}

/**
 * Gets currently logged in user mobile from session, or null if guest.
 */
export function getCurrentUserMobile() {
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;
  try {
    const user = JSON.parse(sessionData);
    return user.mobile || null;
  } catch (e) {
    return null;
  }
}

/**
 * Calculates dynamic order status according to requirements:
 * - Pending: < 5 minutes
 * - Processing: >= 5 minutes AND < 60 minutes
 * - Complete: >= 60 minutes
 */
export function calculateOrderStatus(createdTimestamp) {
  const elapsedMinutes = (Date.now() - Number(createdTimestamp)) / (1000 * 60);
  if (elapsedMinutes >= 60) {
    return 'Complete';
  } else if (elapsedMinutes >= 5) {
    return 'Processing';
  }
  return 'Pending';
}

/**
 * Saves a new order to Firestore and Local Storage.
 */
export async function saveNewOrder(orderData) {
  const guestDeviceId = getGuestDeviceId();
  const userMobile = getCurrentUserMobile();
  const isAccount = Boolean(userMobile);

  const orderIdStr = String(orderData.orderId || Math.floor(100000 + Math.random() * 900000));
  const createdTimestamp = orderData.createdTimestamp || Date.now();

  const record = {
    orderId: orderIdStr,
    serviceName: orderData.serviceName || '',
    link: orderData.link || '',
    quantity: Number(orderData.quantity) || 0,
    amount: String(orderData.amount || '0.00'),
    dateTime: orderData.dateTime || new Date().toLocaleString(),
    createdTimestamp: createdTimestamp,
    ownerType: isAccount ? 'account' : 'guest',
    guestDeviceId: guestDeviceId,
    userMobile: isAccount ? userMobile : ''
  };

  // 1. Save to Local Storage
  const localOrders = getLocalOrdersRaw();
  const existingIdx = localOrders.findIndex(o => String(o.orderId) === orderIdStr);
  if (existingIdx >= 0) {
    localOrders[existingIdx] = record;
  } else {
    localOrders.unshift(record);
  }
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(localOrders));

  // 2. Sync to Firestore
  try {
    const orderDocRef = doc(db, 'orders', orderIdStr);
    await setDoc(orderDocRef, record, { merge: true });
  } catch (err) {
    console.error("Firestore order save error:", err);
  }

  return record;
}

/**
 * Helper to get raw local orders.
 */
function getLocalOrdersRaw() {
  const data = localStorage.getItem(ORDER_STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

/**
 * Retrieves all valid orders for the current user/device with calculated status.
 */
export async function getAllOrders() {
  const guestDeviceId = getGuestDeviceId();
  const userMobile = getCurrentUserMobile();

  let fetchedOrders = [];

  try {
    const ordersRef = collection(db, 'orders');
    let q;

    if (userMobile) {
      q = query(ordersRef, where('userMobile', '==', userMobile));
    } else {
      q = query(ordersRef, where('guestDeviceId', '==', guestDeviceId), where('ownerType', '==', 'guest'));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnap) => {
      fetchedOrders.push(docSnap.data());
    });
  } catch (err) {
    console.warn("Using local order fallback:", err);
    fetchedOrders = getLocalOrdersRaw().filter(o => {
      if (userMobile) {
        return o.userMobile === userMobile || (o.guestDeviceId === guestDeviceId && o.ownerType === 'guest');
      } else {
        return o.guestDeviceId === guestDeviceId && o.ownerType === 'guest';
      }
    });
  }

  // Update local storage cache
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(fetchedOrders));

  // Apply dynamic status calculation
  return fetchedOrders.map(order => ({
    ...order,
    status: calculateOrderStatus(order.createdTimestamp)
  })).sort((a, b) => b.createdTimestamp - a.createdTimestamp);
}

/**
 * Claims guest orders created on this browser/device and links them to the logged-in user account.
 */
export async function claimGuestOrdersToAccount(userMobile) {
  if (!userMobile) return;

  const guestDeviceId = getGuestDeviceId();

  // 1. Update Local Storage records
  const localOrders = getLocalOrdersRaw();
  let updatedLocal = false;

  localOrders.forEach(order => {
    if (order.guestDeviceId === guestDeviceId && order.ownerType === 'guest') {
      order.ownerType = 'account';
      order.userMobile = userMobile;
      updatedLocal = true;
    }
  });

  if (updatedLocal) {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(localOrders));
  }

  // 2. Query and update Firestore records in batch
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef, 
      where('guestDeviceId', '==', guestDeviceId), 
      where('ownerType', '==', 'guest')
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const batch = writeBatch(db);
      querySnapshot.forEach((docSnap) => {
        batch.update(docSnap.ref, {
          ownerType: 'account',
          userMobile: userMobile
        });
      });
      await batch.commit();
    }
  } catch (err) {
    console.error("Error claiming guest orders in Firestore:", err);
  }
}

// Window global bindings for legacy inline compatibility
window.saveNewOrder = saveNewOrder;
window.getAllOrders = getAllOrders;
window.claimGuestOrdersToAccount = claimGuestOrdersToAccount;
window.getGuestDeviceId = getGuestDeviceId;
