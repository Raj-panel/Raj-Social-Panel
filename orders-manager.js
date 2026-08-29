async function loadUserOrders(userId, platformName) {
    try {
        const url = `https://raj-social-panel-backend-qfwd.vercel.app/api/orders/user/${userId}?platform=${platformName}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            renderOrdersTable(data.orders);
        }
    } catch (error) {
        console.error("Error fetching user orders:", error);
    }
}

function renderOrdersTable(orders) {
    const container = document.getElementById("orders-list-container");
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders found.</p>";
        return;
    }

    let html = `<table class="orders-table">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Service</th>
                <th>Link</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>`;

    orders.forEach(order => {
        html += `
            <tr>
                <td>${order.internalOrderId}</td>
                <td>${order.serviceName}</td>
                <td><a href="${order.link}" target="_blank">Link</a></td>
                <td>${order.quantity}</td>
                <td>₹${order.amount}</td>
                <td><span class="status-badge ${order.orderStatus.toLowerCase()}">${order.orderStatus}</span></td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}
