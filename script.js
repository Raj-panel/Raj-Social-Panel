// ==========================================
// DATA: SOCIAL MEDIA PACKAGES DATABASE
// ==========================================
const packagesData = {
    instagram: [
        { id: "IG_100", name: "1,000 Instagram Followers", price: 10.00, quantity: 1000, category: "Followers", providerId: "PROV_IG_1" },
        { id: "IG_250", name: "2,500 Instagram Followers", price: 22.00, quantity: 2500, category: "Followers", providerId: "PROV_IG_1" },
        { id: "IG_500", name: "5,000 Instagram Likes", price: 15.00, quantity: 5000, category: "Likes", providerId: "PROV_IG_2" }
    ],
    youtube: [
        { id: "YT_100", name: "1,000 YouTube Views", price: 12.00, quantity: 1000, category: "Views", providerId: "PROV_YT_1" },
        { id: "YT_500", name: "500 YouTube Subscribers", price: 35.00, quantity: 500, category: "Subscribers", providerId: "PROV_YT_2" }
    ],
    facebook: [
        { id: "FB_100", name: "1,000 Facebook Page Likes", price: 18.00, quantity: 1000, category: "Likes", providerId: "PROV_FB_1" },
        { id: "FB_500", name: "5,000 Facebook Post Likes", price: 20.00, quantity: 5000, category: "Post Likes", providerId: "PROV_FB_2" }
    ],
    tiktok: [
        { id: "TK_100", name: "1,000 TikTok Followers", price: 14.00, quantity: 1000, category: "Followers", providerId: "PROV_TK_1" },
        { id: "TK_500", name: "10,000 TikTok Views", price: 8.00, quantity: 10000, category: "Views", providerId: "PROV_TK_2" }
    ]
};

// ==========================================
// GLOBALS & STATE
// ==========================================
let currentPlatform = "instagram";
let selectedPackage = null;
let currentPaymentMethod = "UPI";

// Load default packages on startup
document.addEventListener("DOMContentLoaded", () => {
    loadPackages(currentPlatform);
});

// ==========================================
// PLATFORM & PACKAGE RENDER LOGIC
// ==========================================
function switchPlatform(platform, buttonElement) {
    currentPlatform = platform;
    selectedPackage = null;

    // Update active tab styling
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    buttonElement.classList.add("active");

    // Reset summary UI
    document.getElementById("summaryName").innerText = "None";
    document.getElementById("summaryPrice").innerText = "$0.00";

    // Load new platform packages
    loadPackages(platform);
}

function loadPackages(platform) {
    const packageContainer = document.getElementById("packageList");
    packageContainer.innerHTML = "";

    const list = packagesData[platform] || [];

    list.forEach(pkg => {
        const card = document.createElement("div");
        card.className = "package-card";
        card.onclick = () => selectPackage(card, pkg);

        card.innerHTML = `
            <h4>${pkg.name}</h4>
            <p class="price">$${pkg.price.toFixed(2)}</p>
        `;
        packageContainer.appendChild(card);
    });
}

function selectPackage(element, packageObj) {
    // Remove active class from all package cards
    document.querySelectorAll(".package-card").forEach(card => card.classList.remove("selected"));

    // Set selected class to clicked element
    element.classList.add("selected");

    // Set state
    selectedPackage = packageObj;

    // Update summary interface
    document.getElementById("summaryName").innerText = packageObj.name;
    document.getElementById("summaryPrice").innerText = `$${packageObj.price.toFixed(2)}`;
}

// ==========================================
// PAYMENT & ORDER CONFIRMATION LOGIC
// ==========================================
function confirmPaymentWithUTR() {
    const utrInput = document.getElementById("utrNumber");
    const linkInput = document.getElementById("link");

    const utr = utrInput ? utrInput.value.trim() : "";
    const link = linkInput ? linkInput.value.trim() : "";

    // Validation 1: Target Link
    if (!link) {
        alert("Please enter your target link or URL!");
        return;
    }

    // Validation 2: Package Selection
    if (!selectedPackage) {
        alert("Please select a package first!");
        return;
    }

    // Validation 3: UTR / Transaction ID
    if (!utr || utr.length < 5) {
        alert("Please enter a valid UTR or Transaction ID!");
        return;
    }

    // Prepare Payload
    const orderPayload = {
        platform: currentPlatform,
        category: selectedPackage.category,
        packageName: selectedPackage.name,
        quantity: selectedPackage.quantity,
        price: selectedPackage.price.toFixed(2),
        providerId: selectedPackage.providerId || null,
        targetLink: link,
        paymentMethod: currentPaymentMethod,
        transactionId: utr
    };

    // Send Payload to Backend
    fetch("/api/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderPayload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment submitted successfully! Your order is being processed.");
            location.reload();
        } else {
            alert("Order submission failed: " + (data.message || "Please try again."));
        }
    })
    .catch(error => {
        console.error("Order processing error:", error);
        alert("Payment details received! We will verify and process your order shortly.");
    });
}
