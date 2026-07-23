// Prices in INR per 1000 quantity
const serviceData = {
    instagram: [
        { name: "Instagram Followers", pricePer1000: 80 },
        { name: "Instagram Likes (Non Drop)", pricePer1000: 30 },
        { name: "Instagram Reels Views", pricePer1000: 10 },
        { name: "Instagram Custom Report", pricePer1000: 150 }
    ],
    facebook: [
        { name: "Facebook Non Drop Follow", pricePer1000: 49 },
        { name: "Facebook Non Drop Like", pricePer1000: 39 },
        { name: "Facebook Reels / Videos Views", pricePer1000: 10 }
    ]
};

// Update service options based on selected platform
function updateServices() {
    const platform = document.getElementById("platform").value;
    const serviceSelect = document.getElementById("service");
    
    serviceSelect.innerHTML = '<option value="">-- Select Service --</option>';

    if (platform && serviceData[platform]) {
        serviceData[platform].forEach((item, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.text = `${item.name} - ₹${item.pricePer1000} / 1K`;
            serviceSelect.appendChild(option);
        });
    }
    calculatePrice();
}

// Calculate price dynamically with Minimum ₹10 Order condition
function calculatePrice() {
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const quantity = document.getElementById("quantity").value || 0;
    const priceText = document.getElementById("totalPrice");

    if (platform && serviceIndex !== "" && quantity > 0) {
        const pricePer1000 = serviceData[platform][serviceIndex].pricePer1000;
        const totalPrice = (quantity / 1000) * pricePer1000;
        priceText.innerText = totalPrice.toFixed(2);
    } else {
        priceText.innerText = "0";
    }
}

// Generate dynamic QR Code and Payment Card
function generateOrder() {
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const link = document.getElementById("link").value;
    const quantity = document.getElementById("quantity").value;
    const totalPriceText = document.getElementById("totalPrice").innerText;
    const totalPrice = parseFloat(totalPriceText);

    if (!platform || serviceIndex === "" || !link || quantity <= 0) {
        alert("Please fill in all details correctly!");
        return;
    }

    // ⚠️ Minimum Order Validation (Minimum ₹10 required)
    if (totalPrice < 10) {
        alert("⚠️ Minimum order amount is ₹10 INR. Please increase the quantity to place the order.");
        return;
    }

    const serviceName = serviceData[platform][serviceIndex].name;

    // YOUR ACTUAL UPI ID
    const upiId = "Saheb.68@ptyes"; 
    const payeeName = "Raj Social Panel";

    // Dynamic UPI QR Code Generation
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

    document.getElementById("qrCodeImg").src = qrApi;
    document.getElementById("paymentCard").style.display = "block";

    // Smooth scroll to payment section
    document.getElementById("paymentCard").scrollIntoView({ behavior: 'smooth' });
}

// Submit Order with UTR via WhatsApp
function confirmPaymentWithUTR() {
    const utr = document.getElementById("utrNumber").value;
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const link = document.getElementById("link").value;
    const quantity = document.getElementById("quantity").value;
    const totalPrice = document.getElementById("totalPrice").innerText;

    if (!utr || utr.length < 10) {
        alert("Please enter a valid 12-Digit UTR / Transaction ID!");
        return;
    }

    const serviceName = serviceData[platform][serviceIndex].name;

    const waMsg = `🚀 *NEW ORDER PLACED*%0A%0A` +
                  `*Service:* ${serviceName}%0A` +
                  `*Target Link:* ${link}%0A` +
                  `*Quantity:* ${quantity}%0A` +
                  `*Amount Paid:* ₹${totalPrice} INR%0A` +
                  `*UTR / Payment ID:* ${utr}%0A%0A` +
                  `Please check payment and complete the order.`;

    window.open(`https://wa.me/919337028344?text=${waMsg}`, '_blank');
}

// Auto-Increment Counter (Starts exactly from 10, increases by 1 per minute)
function startMinuteCounter() {
    const baseOrders = 10;
    const baseCompleted = 9;

    const startTimeKey = "raj_panel_start_time_v2"; 
    let startTime = localStorage.getItem(startTimeKey);

    if (!startTime) {
        startTime = Date.now();
        localStorage.setItem(startTimeKey, startTime);
    }

    function updateDisplay() {
        const now = Date.now();
        const minutesPassed = Math.floor((now - startTime) / (1000 * 60));

        const total = baseOrders + minutesPassed;
        const success = baseCompleted + minutesPassed;

        if (document.getElementById("totalOrders")) {
            document.getElementById("totalOrders").innerText = total.toLocaleString('en-IN');
            document.getElementById("completedOrders").innerText = success.toLocaleString('en-IN');
        }
    }

    updateDisplay();
    setInterval(updateDisplay, 1000);
}

// Page load event
window.onload = function() {
    startMinuteCounter();
};
