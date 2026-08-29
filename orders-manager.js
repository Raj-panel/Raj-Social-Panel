/**
 * Orders Manager - Handles Local Storage, Firestore Sync, Wallet Deductions & Automated Status
 */

const ORDER_STORAGE_KEY = 'user_local_orders';

/**
 * Saves a new order to Local Storage and syncs status.
 * @param {Object} orderData - Details from the successful checkout.
 */
function saveNewOrder(orderData) {
    const orders = getRawOrdersFromStorage();
    
    const newOrder = {
        orderId: orderData.orderId || 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        serviceName: orderData.serviceName || 'Social Media Service',
        link: orderData.link || '',
        quantity: orderData.quantity || 1,
        amount: orderData.amount || 0,
        platform: orderData.platform || 'General',
        dateTime: new Date().toLocaleString(),
        createdTimestamp: Date.now()
    };

    orders.unshift(newOrder);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    return newOrder;
}

/**
 * Helper to get raw stored orders.
 */
function getRawOrdersFromStorage() {
    const data = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("Error reading Local Storage", e);
        return [];
    }
}

/**
 * Retrieves all orders from Local Storage, calculating their current status dynamically.
 * Rule:
 * - Pending: < 5 minutes
 * - Processing: >= 5 minutes AND < 60 minutes (1 hour)
 * - Completed: >= 60 minutes
 */
function getAllOrders() {
    const orders = getRawOrdersFromStorage();
    const currentTime = Date.now();

    return orders.map(order => {
        const elapsedMinutes = (currentTime - order.createdTimestamp) / (1000 * 60);
        let status = 'Pending';

        if (elapsedMinutes >= 60) {
            status = 'Completed';
        } else if (elapsedMinutes >= 5) {
            status = 'Processing';
        }

        return { ...order, status };
    });
}

/**
 * Main Order Submission Handler linked to Wallet and Checkout
 */
async function submitOrderWithWallet() {
    const linkInput = document.getElementById('checkoutLinkInput');
    const txnInput = document.getElementById('checkoutTxnId');
    const submitBtn = document.getElementById('submitWalletBtn');

    const link = linkInput ? linkInput.value.trim() : '';
    const txnId = txnInput ? txnInput.value.trim() : '';

    if (!link) {
        alert("Please enter a valid link.");
        return;
    }

    if (!txnId) {
        alert("Please enter Transaction ID / UTR number.");
        return;
    }

    // Disable button during processing
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Processing Order...";
    }

    try {
        const serviceTitle = document.getElementById('checkoutServiceTitle')?.innerText || 'Service';
        const pkgBadge = document.getElementById('checkoutPkgBadgeName')?.innerText || '';
        const priceText = document.getElementById('checkoutPriceText')?.innerText || '0';
        const platformIcon = document.body.getAttribute('data-platform') || 'instagram';

        const orderData = {
            orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            serviceName: `${serviceTitle} (${pkgBadge})`,
            link: link,
            txnId: txnId,
            quantity: 1,
            amount: parseFloat(priceText),
            platform: platformIcon
        };

        // Save order locally
        saveNewOrder(orderData);

        // Firebase Sync Handler Call (If auth-handler module is active)
        if (typeof window.processFirestoreWalletOrder === 'function') {
            await window.processFirestoreWalletOrder(orderData);
        }

        alert(`✅ Order Placed Successfully!\nOrder ID: ${orderData.orderId}`);

        // Reset inputs & close checkout view
        if (linkInput) linkInput.value = '';
        if (txnInput) txnInput.value = '';
        if (typeof closeCheckout === 'function') {
            closeCheckout();
        }

    } catch (error) {
        console.error("Order process error:", error);
        alert("An error occurred while placing the order. Please try again.");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Confirm your order";
        }
    }
}

/**
 * Compatibility Alias for Legacy HTML Trigger
 */
function submitOrderToWhatsApp() {
    submitOrderWithWallet();
}
