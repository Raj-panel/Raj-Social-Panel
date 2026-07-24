// Prices in INR - Format: Name | Qty | Price
const serviceData = {
    instagram: [
        { name: "Instagram Followers", pricePer1000: 80, qty: "1000 Qty", price: "₹80", displayText: "Instagram Followers — 1000 Qty — ₹80" },
        { name: "Instagram Likes (Non Drop)", pricePer1000: 30, qty: "1000 Qty", price: "₹30", displayText: "Instagram Likes (Non Drop) — 1000 Qty — ₹30" },
        { name: "Instagram Reels Views", pricePer1000: 10, qty: "1000 Qty", price: "₹10", displayText: "Instagram Reels Views — 1000 Qty — ₹10" },
        { name: "Instagram Report Lifetime", pricePer1000: 100, qty: "100 Qty", price: "₹10", displayText: "Instagram Report Lifetime — 100 Qty — ₹10" },
        { name: "Instagram Non Drop Comment", pricePer1000: 150, qty: "100 Qty", price: "₹15", displayText: "Instagram Non Drop Comment — 100 Qty — ₹15" },
        { name: "Instagram Post Save Lifetime", pricePer1000: 100, qty: "100 Qty", price: "₹10", displayText: "Instagram Post Save Lifetime — 100 Qty — ₹10" }
    ],
    facebook: [
        { name: "Facebook Non Drop Follow", pricePer1000: 49, qty: "1000 Qty", price: "₹49", displayText: "Facebook Non Drop Follow — 1000 Qty — ₹49" },
        { name: "Facebook Non Drop Like", pricePer1000: 39, qty: "1000 Qty", price: "₹39", displayText: "Facebook Non Drop Like — 1000 Qty — ₹39" },
        { name: "Facebook Reels / Videos Views", pricePer1000: 10, qty: "1000 Qty", price: "₹10", displayText: "Facebook Reels / Videos Views — 1000 Qty — ₹10" }
    ]
};

let currentPaymentMethod = 'upi';

// Switch Payment Method UI Smoothly
function switchPaymentMethod(method) {
    currentPaymentMethod = method;
    const upiView = document.getElementById("upiPaymentView");
    const binanceView = document.getElementById("binancePaymentView");
    const tabUpi = document.getElementById("tabUpi");
    const tabBinance = document.getElementById("tabBinance");
    const utrLabel = document.getElementById("utrLabel");
    const utrInput = document.getElementById("utrNumber");
    const payNoteText = document.getElementById("payNoteText");

    if (method === 'upi') {
        upiView.style.display = "block";
        binanceView.style.display = "none";
        tabUpi.style.background = "#38bdf8";
        tabUpi.style.color = "#000";
        tabBinance.style.background = "transparent";
        tabBinance.style.color = "#facc15";
        utrLabel.innerText = "Enter 12-Digit UPI UTR / Ref No:";
        utrInput.placeholder = "e.g. 4029XXXXXXXX (12-Digit UTR)";
        payNoteText.innerText = "⚠️ After payment, enter the Transaction ID / UTR above and click 'Submit Order on WhatsApp'.";
    } else {
        upiView.style.display = "none";
        binanceView.style.display = "block";
        tabBinance.style.background = "#facc15";
        tabBinance.style.color = "#000";
        tabUpi.style.background = "transparent";
        tabUpi.style.color = "#38bdf8";
        utrLabel.innerText = "Transaction ID / Order ID";
        utrInput.placeholder = "e.g. Enter Binance Transaction ID / Order ID";
        payNoteText.innerText = "Copy the order ID / Transaction ID";
    }
}

// Update service options based on selected platform
function updateServices() {
    const platform = document.getElementById("platform").value;
    const serviceSelect = document.getElementById("service");
    
    serviceSelect.innerHTML = '<option value="">-- Select Service --</option>';

    if (platform && serviceData[platform]) {
        serviceData[platform].forEach((item, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.text = item.displayText;
            serviceSelect.appendChild(option);
        });
    }
    calculatePrice();
}

// Calculate price dynamically
function calculatePrice() {
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const quantity = document.getElementById("quantity").value || 0;
    const priceText = document.getElementById("totalPrice");
    const rateDisplay = document.getElementById("activeRateDisplay");

    if (platform && serviceIndex !== "") {
        const selectedService = serviceData[platform][serviceIndex];
        
        if (rateDisplay) {
            rateDisplay.innerHTML = `<span style="color: #facc15;">${selectedService.name}</span> ➔ <span style="color: #38bdf8;">${selectedService.qty}</span> = <span style="color: #4ade80; font-size: 15px;">${selectedService.price}</span>`;
        }

        if (quantity > 0) {
            const pricePer1000 = selectedService.pricePer1000;
            const totalPrice = (quantity / 1000) * pricePer1000;
            priceText.innerText = totalPrice.toFixed(2);
        } else {
            priceText.innerText = "0";
        }
    } else {
        priceText.innerText = "0";
        if (rateDisplay) {
            rateDisplay.innerText = "-- Select a service to see rate --";
        }
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

    if (totalPrice < 10) {
        alert("⚠️ Minimum order amount is ₹10 INR. Please increase the quantity to place the order.");
        return;
    }

    // 1. UPI Dynamic QR Code Generation
    const upiId = "Saheb.68@ptyes"; 
    const payeeName = "Raj Social Panel";
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;
    document.getElementById("qrCodeImg").src = qrApi;

    // 2. Binance Static Original QR Code Image & Dynamic USDT Text ($1 = 95 INR)
    const usdtAmount = (totalPrice / 95).toFixed(2);
    document.getElementById("binanceUsdtDisplay").innerText = `$${usdtAmount} USDT`;

    // Use original uploaded static Binance QR code
    const binanceQrImg = document.getElementById("binanceQrCodeImg");
    if (binanceQrImg) {
        binanceQrImg.src = "./binance-qr.png";
    }

    // Display Payment Card
    document.getElementById("paymentCard").style.display = "block";

    // Default to UPI payment view
    switchPaymentMethod('upi');

    // Smooth scroll to payment section
    document.getElementById("paymentCard").scrollIntoView({ behavior: 'smooth' });
}

// Submit Order via WhatsApp
function confirmPaymentWithUTR() {
    const utr = document.getElementById("utrNumber").value;
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const link = document.getElementById("link").value;
    const quantity = document.getElementById("quantity").value;
    const totalPrice = document.getElementById("totalPrice").innerText;

    if (!utr || utr.length < 6) {
        alert("Please enter a valid Transaction ID / UTR!");
        return;
    }

    const serviceName = serviceData[platform][serviceIndex].name;
    const usdtAmount = (parseFloat(totalPrice) / 95).toFixed(2);

    const waMsg = `🚀 *NEW ORDER PLACED*%0A%0A` +
                  `*Service:* ${serviceName}%0A` +
                  `*Target Link:* ${link}%0A` +
                  `*Quantity:* ${quantity}%0A` +
                  `*Amount Paid:* ₹${totalPrice} INR ($${usdtAmount} USDT)%0A` +
                  `*Payment Mode:* ${currentPaymentMethod.toUpperCase()}%0A` +
                  `*Transaction ID / Order ID:* ${utr}%0A%0A` +
                  `Please check payment and complete the order.`;

    window.open(`https://wa.me/919337028344?text=${waMsg}`, '_blank');
}

// Global Date-Based Auto Counter
function startGlobalCounter() {
    const baseStartDate = new Date("2026-01-01T00:00:00").getTime();
    const baseOrders = 5240; 
    const baseCompleted = 5190; 

    function updateDisplay() {
        const now = Date.now();
        const minutesPassed = Math.floor((now - baseStartDate) / (1000 * 60));

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
    startGlobalCounter();
};
