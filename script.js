// Prices in INR per 1000 quantity
const serviceData = {
    instagram: [
        { name: "Instagram Followers", pricePer1000: 80 },
        { name: "Instagram Likes (Non Drop)", pricePer1000: 30 },
        { name: "Instagram Reels Views", pricePer1000: 10 },
        { name: "Instagram Custom Report", pricePer1000: 150 }
    ],
    facebook: [
        { name: "Facebook Page Followers", pricePer1000: 100 },
        { name: "Facebook Post Likes", pricePer1000: 40 }
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

// Generate dynamic QR Code and WhatsApp message
function generateOrder() {
    const platform = document.getElementById("platform").value;
    const serviceIndex = document.getElementById("service").value;
    const link = document.getElementById("link").value;
    const quantity = document.getElementById("quantity").value;
    const totalPrice = document.getElementById("totalPrice").innerText;

    if (!platform || serviceIndex === "" || !link || quantity <= 0) {
        alert("Please fill in all details correctly!");
        return;
    }

    const serviceName = serviceData[platform][serviceIndex].name;

    // REPLACE WITH YOUR ACTUAL UPI ID
    const upiId = "YOUR_UPI_ID@upi"; 
    const payeeName = "Raj Social Panel";

    // Dynamic UPI QR Code Generation
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

    document.getElementById("qrCodeImg").src = qrApi;
    document.getElementById("paymentCard").style.display = "block";

    // Format WhatsApp order message
    const waMsg = `Hello! I have placed an order on Raj Social Panel:%0A%0A` +
                  `*Service:* ${serviceName}%0A` +
                  `*Target Link:* ${link}%0A` +
                  `*Quantity:* ${quantity}%0A` +
                  `*Amount:* ₹${totalPrice} INR%0A%0A` +
                  `I will send the payment screenshot shortly.`;

    document.getElementById("waPayBtn").href = `https://wa.me/919337028344?text=${waMsg}`;
    
    // Smooth scroll to payment section
    document.getElementById("paymentCard").scrollIntoView({ behavior: 'smooth' });
}
