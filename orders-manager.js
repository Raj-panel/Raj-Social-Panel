/**
 * Orders Manager - Handles Local Storage persistence and time-based status automation.
 */

const ORDER_STORAGE_KEY = 'user_local_orders';

/**
 * Saves a new order to Local Storage.
 * @param {Object} orderData - Details from the successful checkout.
 */
function saveNewOrder(orderData) {
    const orders = getAllOrders();
    
    const newOrder = {
        orderId: orderData.orderId || 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        serviceName: orderData.serviceName,
        link: orderData.link,
        quantity: orderData.quantity,
        amount: orderData.amount,
        dateTime: new Date().toLocaleString(),
        createdTimestamp: Date.now()
    };

    orders.unshift(newOrder);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
}

/**
 * Retrieves all orders from Local Storage, calculating their current status dynamically.
 * Updated Rule:
 * - Pending: < 5 minutes
 * - Processing: >= 5 minutes AND < 60 minutes (1 hour)
 * - Completed: >= 60 minutes
 */
function getAllOrders() {
    const data = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!data) return [];
    
    try {
        const orders = JSON.parse(data);
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
    } catch (e) {
        console.error("Error parsing orders from Local Storage", e);
        return [];
    }
}
