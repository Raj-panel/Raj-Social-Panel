// Service Rates configured for calculation
// Note: pricePer1000 holds price per 1000 items, display text shows per 100 rate as requested
const serviceData = {
    instagram: [
        { name: "Instagram Followers", pricePer1000: 80, displayText: "Instagram Followers - ₹80 / 1K" },
        { name: "Instagram Likes (Non Drop)", pricePer1000: 30, displayText: "Instagram Likes (Non Drop) - ₹30 / 1K" },
        { name: "Instagram Reels Views", pricePer1000: 10, displayText: "Instagram Reels Views - ₹10 / 1K" },
        { name: "Instagram Report Lifetime", pricePer1000: 100, displayText: "Instagram Report Lifetime - ₹10 / 100" },
        { name: "Instagram Non Drop Comment", pricePer1000: 150, displayText: "Instagram Non Drop Comment - ₹15 / 100" },
        { name: "Instagram Post Save Lifetime", pricePer1000: 100, displayText: "Instagram Post Save Lifetime - ₹10 / 100" }
    ],
    facebook: [
        { name: "Facebook Non Drop Follow", pricePer1000: 49, displayText: "Facebook Non Drop Follow - ₹49 / 1K" },
        { name: "Facebook Non Drop Like", pricePer1000: 39, displayText: "Facebook Non Drop Like - ₹39 / 1K" },
        { name: "Facebook Reels / Videos Views", pricePer1000: 10, displayText: "Facebook Reels / Videos Views - ₹10 / 1K" }
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

// Global Fixed-Time Based Order Counter
function startGlobalCounter() {
    const baseOrders = 500; // প্রাথমিক বেস সংখ্যা
    const baseCompleted = 492;

    // একটি নির্দিষ্ট অতীত সময়কে (Fixed Anchor Point) ধরে নেওয়া হলো
    // জানুয়ারি ১, ২০২৬ তারিখ থেকে মিনিট পাওয়ার জন্য হিসাব
    const fixedStartTime = new Date("2026-01-01T00:00:00Z").getTime();

    function updateDisplay() {
        const now = Date.now();
        // ১ জানুয়ারি ২০২৬ এর পর থেকে কত মিনিট পার হয়েছে
        const minutesPassed = Math.floor((now - fixedStartTime) / (1000 * 60));

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
