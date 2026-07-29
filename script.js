// State Variables
let currentPlatform = "instagram";
let currentCategory = "followers";
let selectedPackage = null;
let currentPaymentMethod = "upi";

// Package Database
const servicesData = {
    instagram: {
        followers: [
            { id: 101, name: "1,000 Followers", price: 99, badge: "popular", icon: "👥" },
            { id: 102, name: "5,000 Followers", price: 450, badge: "best", icon: "🔥" },
            { id: 103, name: "10,000 Followers", price: 850, badge: "real", icon: "⚡" }
        ],
        likes: [
            { id: 104, name: "1,000 Likes", price: 29, badge: "popular", icon: "❤️" },
            { id: 105, name: "5,000 Likes", price: 120, badge: "best", icon: "💖" }
        ],
        views: [
            { id: 106, name: "10,000 Reel Views", price: 49, badge: "popular", icon: "👁️" },
            { id: 107, name: "50,000 Reel Views", price: 199, badge: "best", icon: "🚀" }
        ]
    },
    facebook: {
        followers: [
            { id: 201, name: "1,000 Page Follower", price: 120, badge: "popular", icon: "👍" },
            { id: 202, name: "5,000 Page Follower", price: 550, badge: "best", icon: "🌟" }
        ],
        likes: [
            { id: 203, name: "1,000 Post Likes", price: 35, badge: "popular", icon: "👍" }
        ],
        views: [
            { id: 204, name: "10,000 Video Views", price: 60, badge: "popular", icon: "🎥" }
        ]
    }
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
});

// Platform Switching
function switchPlatform(platform, element) {
    currentPlatform = platform;
    document.querySelectorAll(".platform-btn").forEach(btn => btn.classList.remove("active"));
    element.classList.add("active");

    const platformIcon = document.getElementById("platformIcon");
    const platformTitle = document.getElementById("platformTitle");

    if (platform === "instagram") {
        platformIcon.innerText = "📸";
        platformTitle.innerText = "Instagram Booster";
    } else {
        platformIcon.innerText = "📘";
        platformTitle.innerText = "Facebook Booster";
    }

    loadCategories();
}

// Category Loader
function loadCategories() {
    const tabsContainer = document.getElementById("categoryTabs");
    tabsContainer.innerHTML = "";

    const categories = Object.keys(servicesData[currentPlatform]);
    currentCategory = categories[0];

    categories.forEach((cat, index) => {
        const btn = document.createElement("button");
        btn.className = `cat-tab ${index === 0 ? "active" : ""}`;
        btn.innerText = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.onclick = () => switchCategory(cat, btn);
        tabsContainer.appendChild(btn);
    });

    loadPackages();
}

// Switch Category
function switchCategory(category, element) {
    currentCategory = category;
    document.querySelectorAll(".cat-tab").forEach(tab => tab.classList.remove("active"));
    element.classList.add("active");
    loadPackages();
}

// Render Packages
function loadPackages() {
    const packageList = document.getElementById("packageList");
    packageList.innerHTML = "";
    selectedPackage = null;
    updateSummary();

    const packages = servicesData[currentPlatform][currentCategory] || [];

    packages.forEach(pkg => {
        const card = document.createElement("div");
        card.className = "pkg-card";
        card.onclick = () => selectPackage(pkg, card);

        let badgeHtml = "";
        if (pkg.badge === "popular") badgeHtml = `<span class="pkg-badge badge-popular">POPULAR</span>`;
        else if (pkg.badge === "best") badgeHtml = `<span class="pkg-badge badge-best">BEST VALUE</span>`;
        else if (pkg.badge === "real") badgeHtml = `<span class="pkg-badge badge-real">HIGH QUALITY</span>`;

        card.innerHTML = `
            <div class="pkg-left">
                <div class="pkg-icon">${pkg.icon}</div>
                <div class="pkg-info">
                    <div class="pkg-title">${pkg.name} ${badgeHtml}</div>
                    <div class="pkg-sub">Instant Delivery & High Retention</div>
                </div>
            </div>
            <div class="pkg-price-btn">₹${pkg.price}</div>
        `;

        packageList.appendChild(card);
    });
}

// Select Package
function selectPackage(pkg, cardElement) {
    document.querySelectorAll(".pkg-card").forEach(c => c.classList.remove("selected"));
    cardElement.classList.add("selected");

    selectedPackage = {
        name: pkg.name,
        price: pkg.price,
        category: currentCategory,
        providerId: pkg.id
    };

    updateSummary();
}

// Summary Updater
function updateSummary() {
    const summaryText = document.getElementById("summaryText");
    const usdtAmount = document.getElementById("usdtAmount");

    if (selectedPackage) {
        summaryText.innerHTML = `Selected: <strong>${selectedPackage.name}</strong> - Price: <strong>₹${selectedPackage.price} INR</strong>`;
        
        // Approximate INR to USDT conversion (1 USDT ~ 88 INR)
        const usdt = (selectedPackage.price / 88).toFixed(2);
        usdtAmount.innerText = `$${usdt} USDT`;
    } else {
        summaryText.innerText = "Please select a package above";
        usdtAmount.innerText = "$0.00 USDT";
    }
}

// Payment Section Toggle
function openPaymentSection() {
    const link = document.getElementById("link").value.trim();

    if (!selectedPackage) {
        alert("Please select a package first!");
        return;
    }

    if (!link) {
        alert("Please enter target link/username!");
        return;
    }

    document.getElementById("paymentSection").style.display = "block";
    document.getElementById("paymentSection").scrollIntoView({ behavior: "smooth" });
}

// Payment Method Switching (UPI / Crypto)
function switchPayment(type) {
    currentPaymentMethod = type;
    const upiTab = document.getElementById("upiTab");
    const cryptoTab = document.getElementById("cryptoTab");
    const upiBox = document.getElementById("upiBox");
    const cryptoBox = document.getElementById("cryptoBox");

    if (type === "upi") {
        upiTab.classList.add("active");
        cryptoTab.classList.remove("active");
        upiBox.style.display = "block";
        cryptoBox.style.display = "none";
    } else {
        cryptoTab.classList.add("active");
        upiTab.classList.remove("active");
        upiBox.style.display = "none";
        cryptoBox.style.display = "block";
    }
}

// Submit Order via WhatsApp
function confirmPaymentWithUTR() {
    const utr = document.getElementById("utrNumber").value.trim();
    const link = document.getElementById("link").value.trim();

    if (!utr || utr.length < 5) {
        alert("Please enter a valid UTR or Transaction ID!");
        return;
    }

    if (!selectedPackage) {
        alert("Please select a package first!");
        return;
    }

    const price = Number(selectedPackage.price).toFixed(2);
    const platformName = currentPlatform.toUpperCase();
    const paymentType = currentPaymentMethod === "upi" ? "UPI" : "Binance Pay / USDT";

    // Build WhatsApp Message
    let message = `🚀 *NEW ORDER PLACED* 🚀\n\n`;
    message += `📱 *Platform:* ${platformName}\n`;
    message += `📁 *Category:* ${selectedPackage.category}\n`;
    message += `📦 *Package:* ${selectedPackage.name}\n`;
    message += `💰 *Amount:* ₹${price} INR\n`;
    message += `🔗 *Target Link:* ${link}\n`;
    message += `💳 *Payment Method:* ${paymentType}\n`;
    message += `🧾 *UTR / TxID:* ${utr}\n`;

    if (selectedPackage.providerId) {
        message += `🆔 *Provider ID:* ${selectedPackage.providerId}\n`;
    }

    message += `\nPlease process this order as soon as possible. Thank you!`;

    const whatsappNumber = "919064287868";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
}

// Copy to Clipboard Helper
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}
