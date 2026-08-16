import { db } from "../firebase-config.js";
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// Global Local Cache for Filtering
let allUsersCache = [];

document.addEventListener("DOMContentLoaded", () => {
  // ড্যাশবোর্ড লোড হওয়ার পর ডাটা আনা শুরু করবে
  if (window.location.pathname.includes("/admin/dashboard.html")) {
    loadDashboardData();
  }
});

/**
 * ১. ড্যাশবোর্ডের মূল ডাটা ও ইউজার লিস্ট লোড করার ফাংশন
 */
async function loadDashboardData() {
  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    allUsersCache = [];
    let totalBalance = 0;

    querySnapshot.forEach((docSnap) => {
      const userData = docSnap.data();
      allUsersCache.push(userData);

      // ব্যালেন্স যোগ করা (Number Conversion Guard)
      const balance = parseFloat(userData.walletBalance) || 0;
      totalBalance += balance;
    });

    // Stats UI Update
    updateStatsUI(allUsersCache.length, totalBalance);

    // Render Users Table
    renderUsersTable(allUsersCache);

  } catch (error) {
    console.error("Dashboard Data Fetch Error:", error);
    const tableBody = document.getElementById("usersTableBody");
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ef4444;">ডাটা লোড করতে সমস্যা হয়েছে: ${error.message}</td></tr>`;
    }
  }
}

/**
 * ২. ড্যাশবোর্ডের টপ স্ট্যাটস আপডেট
 */
function updateStatsUI(userCount, totalWalletBalance) {
  const usersCountEl = document.getElementById("totalUsersCount");
  const balanceEl = document.getElementById("totalWalletBalance");

  if (usersCountEl) usersCountEl.innerText = userCount;
  if (balanceEl) balanceEl.innerText = `₹${totalWalletBalance.toFixed(2)}`;
}

/**
 * ৩. ইউজার টেবিল রেন্ডার করা
 */
function renderUsersTable(usersList) {
  const tableBody = document.getElementById("usersTableBody");
  if (!tableBody) return;

  if (usersList.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">কোনো ব্যবহারকারী পাওয়া যায়নি।</td></tr>`;
    return;
  }

  let rowsHTML = "";
  usersList.forEach((user) => {
    const balance = parseFloat(user.walletBalance) || 0;
    const formattedDate = user.createdAt 
      ? new Date(user.createdAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' }) 
      : 'N/A';

    rowsHTML += `
      <tr>
        <td><strong>${escapeHTML(user.name || 'N/A')}</strong></td>
        <td><code>${escapeHTML(user.mobile || '')}</code></td>
        <td style="color: #10b981; font-weight: 600;">₹${balance.toFixed(2)}</td>
        <td style="color: var(--text-muted); font-size: 0.85rem;">${formattedDate}</td>
        <td>
          <button class="btn-action" onclick="window.promptUpdateWallet('${user.mobile}', '${escapeHTML(user.name || '')}', ${balance})">
            ✏️ ব্যালেন্স এডিট
          </button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = rowsHTML;
}

/**
 * ৪. ইউজার ফিল্টার / সার্চ ফাংশন
 */
window.filterUsersTable = function() {
  const searchInput = document.getElementById("userSearchInput");
  if (!searchInput) return;

  const searchTerm = searchInput.value.toLowerCase().trim();

  const filtered = allUsersCache.filter(user => {
    const nameStr = (user.name || "").toLowerCase();
    const mobileStr = (user.mobile || "").toLowerCase();
    return nameStr.includes(searchTerm) || mobileStr.includes(searchTerm);
  });

  renderUsersTable(filtered);
};

/**
 * ৫. ওয়ালেট ব্যালেন্স ম্যানুয়ালি আপডেট করার ফাংশন (Admin Action)
 */
window.promptUpdateWallet = async function(mobile, name, currentBalance) {
  const newBalanceStr = prompt(
    `[${name} - ${mobile}]\nবর্তমান ব্যালেন্স: ₹${currentBalance.toFixed(2)}\n\nনতুন ব্যালেন্স পরিমাণ লিখুন (টাকায়):`, 
    currentBalance
  );

  if (newBalanceStr === null) return; // Cancelled by admin

  const newBalance = parseFloat(newBalanceStr);

  if (isNaN(newBalance) || newBalance < 0) {
    alert("অনুগ্রহ করে একটি সঠিক ও বৈধ সংখ্যা লিখুন!");
    return;
  }

  try {
    const userDocRef = doc(db, "users", mobile);
    
    // Firestore-এ ব্যালেন্স আপডেট
    await updateDoc(userDocRef, {
      walletBalance: newBalance,
      lastUpdatedByAdmin: new Date().toISOString()
    });

    alert(`✅ ${name}-এর ওয়ালেট ব্যালেন্স সফলভাবে ₹${newBalance.toFixed(2)}-এ আপডেট করা হয়েছে!`);

    // রিফ্রেশ ছাড়া ডাটা আপডেট
    loadDashboardData();

  } catch (error) {
    console.error("Wallet Update Error:", error);
    alert("ব্যালেন্স আপডেট করতে ব্যর্থ হয়েছে: " + error.message);
  }
};

/**
 * Security XSS Helper
 */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
