const serviceData = {
    instagram: {
        "Followers Non-Drop": [
            { type: "custom", name: "Instagram Non-Drop Followers", pricePer1000: 80 }
        ],
        "Followers": [
            { name: "1K Followers", price: 50, badge: "Starter", badgeClass: "badge-demo" },
            { name: "2K Followers", price: 90 },
            { name: "3K Followers", price: 129, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "4K Followers", price: 165 },
            { name: "5K Followers", price: 199, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "6K Followers", price: 239 },
            { name: "7K Followers", price: 279 },
            { name: "8K Followers", price: 319 },
            { name: "9K Followers", price: 359 },
            { name: "10K Followers", price: 399, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "Likes Lifetime": [
            { name: "100 Likes", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "500 Likes", price: 25, badge: "Real", badgeClass: "badge-real" },
            { name: "1K Likes", price: 30, badge: "Fast", badgeClass: "badge-popular" },
            { name: "3K Likes", price: 69, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "5K Likes", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "10K Likes", price: 179, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "Reels / Video Views": [
            { name: "1K Views", price: 10, badge: "DEMO", badgeClass: "badge-demo" },
            { name: "5K Views", price: 20, badge: "STARTER", badgeClass: "badge-real" },
            { name: "10K Views", price: 30, badge: "BEST VALUE", badgeClass: "badge-best" },
            { name: "20K Views", price: 40, badge: "POPULAR", badgeClass: "badge-popular" },
            { name: "50K Views", price: 70, badge: "RECOMMENDED", badgeClass: "badge-best" },
            { name: "100K Views", price: 99, badge: "🔥 BEST SELLER", badgeClass: "badge-best" },
            { name: "500K Views", price: 299, badge: "👑 MOST POPULAR", badgeClass: "badge-best" },
            { name: "1M Views", price: 499, badge: "💥 MEGA DEAL", badgeClass: "badge-best" }
        ],
        "Comments Lifetime": [
            { name: "50 Comments", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "100 Comments", price: 20, badge: "Real", badgeClass: "badge-real" },
            { name: "500 Comments", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "1K Comments", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" }
        ],
        "Repost Lifetime": [
            { name: "50 Reposts", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "100 Reposts", price: 20, badge: "Real", badgeClass: "badge-real" },
            { name: "500 Reposts", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "1K Reposts", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "3K Reposts", price: 249, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "Shares Lifetime": [
            { name: "100 Shares", price: 10, badge: "Starter", badgeClass: "badge-demo" },
            { name: "1K Shares", price: 30, badge: "Fast", badgeClass: "badge-popular" },
            { name: "5K Shares", price: 69, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "10K Shares", price: 99, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ]
    },
    facebook: {
        "Facebook Followers": [
            { type: "custom", name: "Facebook Followers", pricePer1000: 49 }
        ],
        "Likes Non-Drop": [
            { name: "100 Likes", price: 10, badge: "STARTER", badgeClass: "badge-demo" },
            { name: "500 Likes", price: 25, badge: "REAL", badgeClass: "badge-real" },
            { name: "1K Likes", price: 39, badge: "FAST", badgeClass: "badge-popular" },
            { name: "3K Likes", price: 69, badge: "⭐ POPULAR", badgeClass: "badge-popular" },
            { name: "5K Likes", price: 99, badge: "🔥 BEST VALUE", badgeClass: "badge-best" },
            { name: "10K Likes", price: 179, badge: "👑 MOST POPULAR", badgeClass: "badge-best" }
        ],
        "Reels / Video Views": [
            { name: "1K Views", price: 10, badge: "STARTER", badgeClass: "badge-demo" },
            { name: "3K Views", price: 25 },
            { name: "5K Views", price: 35, badge: "⭐ POPULAR", badgeClass: "badge-popular" },
            { name: "10K Views", price: 60 },
            { name: "50K Views", price: 249, badge: "🔥 BEST VALUE", badgeClass: "badge-best" },
            { name: "100K Views", price: 449, badge: "👑 MOST POPULAR", badgeClass: "badge-best" }
        ]
    }
};

let currentPlatform = 'instagram';
let currentCategory = '';
let selectedPackage = null;
let currentPaymentMethod = 'upi';

window.onload = function() {
    switchPlatform('instagram');
};

function switchPlatform(platform) {
    currentPlatform = platform;
    selectedPackage = null;
    document.getElementById("checkoutSection").style.display = "none";
    document.getElementById("paymentCard").style.display = "none";

    document.getElementById("btnInsta").classList.toggle("active", platform === 'instagram');
    document.getElementById("btnFb").classList.toggle("active", platform === 'facebook');

    const heroTitle = document.getElementById("heroTitle");
    const heroLogoIcon = document.getElementById("heroLogoIcon");
    const linkInputLabel = document.getElementById("linkInputLabel");
    const linkInput = document.getElementById("link");

    if (platform === 'instagram') {
        heroTitle.innerText = "Instagram Boost";
        heroLogoIcon.innerHTML = '<i class="fa-brands fa-instagram"></i>';
        linkInputLabel.innerText = "Enter Instagram Target Link / Username:";
        linkInput.placeholder = "https://instagram.com/your_username";
    } else {
        heroTitle.innerText = "Facebook Boost";
        heroLogoIcon.innerHTML = '<i class="fa-brands fa-facebook"></i>';
        linkInputLabel.innerText = "Enter Facebook Profile / Post Link:";
        linkInput.placeholder = "https://facebook.com/your_link";
    }

    renderCategoryTabs();
}

function renderCategoryTabs() {
    const tabsContainer = document.getElementById("categoryTabs");
    tabsContainer.innerHTML = "";

    const categories = Object.keys(serviceData[currentPlatform]);
    currentCategory = categories[0];

    categories.forEach((cat, index) => {
        const tabBtn = document.createElement("button");
        tabBtn.className = `cat-tab ${index === 0 ? 'active' : ''}`;
        tabBtn.innerText = cat;
        tabBtn.onclick = () => {
            document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
            tabBtn.classList.add("active");
            currentCategory = cat;
            renderPackages();
        };
        tabsContainer.appendChild(tabBtn);
    });

    renderPackages();
}

function renderPackages() {
    const packageList = document.getElementById("packageList");
    packageList.innerHTML = "";
    document.getElementById("checkoutSection").style.display = "none";
    document.getElementById("paymentCard").style.display = "none";
    selectedPackage = null;

    const packages = serviceData[currentPlatform][currentCategory];
    const iconClass = currentPlatform === 'instagram' ? 'fa-instagram' : 'fa-facebook';

    packages.forEach((pkg) => {
        if (pkg.type === "custom") {
            const customDiv = document.createElement("div");
            customDiv.className = "custom-card";
            customDiv.innerHTML = `
                <div style="margin-bottom: 8px;">
                    <strong style="color: #a855f7; font-size: 13px;">${pkg.name} (Custom Qty)</strong>
                    <p style="font-size: 10px; color: #94a3b8;">Rate: ₹${pkg.pricePer1000} per 1000 Qty</p>
                </div>
                <div class="input-box">
                    <input type="number" id="customQtyInput" placeholder="Enter Quantity (e.g. 1000)" oninput="calculateCustomPrice('${pkg.name}', ${pkg.pricePer1000})">
                </div>
                <div style="font-size: 12px; font-weight: 800; color: #22c55e;" id="customPriceDisplay">Total: ₹0.00 INR</div>
            `;
            packageList.appendChild(customDiv);
        } else {
            const card = document.createElement("div");
            card.className = "pkg-card";
            card.onclick = () => selectPackageCard(card, pkg);

            card.innerHTML = `
                <div class="pkg-left">
                    <div class="pkg-icon"><i class="fa-brands ${iconClass}"></i></div>
                    <div class="pkg-info">
                        <div class="pkg-title">
                            ${pkg.name}
                            ${pkg.badge ? `<span class="pkg-badge ${pkg.badgeClass || 'badge-popular'}">${pkg.badge}</span>` : ''}
                        </div>
                        <span class="pkg-sub">⚡ Instant Delivery • Premium Quality</span>
                    </div>
                </div>
                <div class="pkg-price-btn">₹${pkg.price}</div>
            `;
            packageList.appendChild(card);
        }
    });
}

function calculateCustomPrice(serviceName, ratePer1000) {
    const qty = parseInt(document.getElementById("customQtyInput").value) || 0;
    const priceDisplay = document.getElementById("customPriceDisplay");

    if (qty > 0) {
        const total = (qty / 1000) * ratePer1000;
        priceDisplay.innerText = `Total: ₹${total.toFixed(2)} INR`;
        
        selectedPackage = {
            name: `${qty} ${serviceName}`,
            price: total,
            category: currentCategory
        };

        showCheckoutSummary(`${qty} ${serviceName}`, total.toFixed(2));
    } else {
        priceDisplay.innerText = `Total: ₹0.00 INR`;
        document.getElementById("checkoutSection").style.display = "none";
        selectedPackage = null;
    }
}

function selectPackageCard(cardElement, pkgData) {
    document.querySelectorAll(".pkg-card").forEach(c => c.classList.remove("selected"));
    cardElement.classList.add("selected");

    selectedPackage = { ...pkgData, category: currentCategory };
    showCheckoutSummary(pkgData.name, Number(pkgData.price).toFixed(2));
}

function showCheckoutSummary(pkgName, price) {
    const summaryBox = document.getElementById("selectedSummary");
    summaryBox.innerHTML = `Selected: <strong>${pkgName}</strong> ➔ <span style="color: #22c55e; font-weight:800;">₹${price} INR</span>`;
    
    const checkoutSec = document.getElementById("checkoutSection");
    checkoutSec.style.display = "block";
    checkoutSec.scrollIntoView({ behavior: 'smooth' });
}

function generateOrder() {
    const link = document.getElementById("link").value.trim();

    if (!selectedPackage) {
        alert("Please select a package first!");
        return;
    }

    if (!link) {
        alert("Please enter target link or username!");
        return;
    }

    const totalPrice = Number(selectedPackage.price).toFixed(2);
    const upiId = "Saheb.68@ptyes"; 
    const payeeName = "Raj Social Panel";
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
    
    document.getElementById("qrCodeImg").src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

    // Calculate Binance USDT Amount ($1 = 96 INR)
    const usdtAmount = (selectedPackage.price / 96).toFixed(2);
    const usdtDisplay = document.getElementById("usdtAmountDisplay");
    if(usdtDisplay) {
        usdtDisplay.innerText = `$${usdtAmount} USDT`;
    }

    document.getElementById("paymentCard").style.display = "block";
    switchPaymentMethod('upi');
    document.getElementById("paymentCard").scrollIntoView({ behavior: 'smooth' });
}

function switchPaymentMethod(method) {
    currentPaymentMethod = method;
    document.getElementById("upiPaymentView").style.display = method === 'upi' ? "block" : "none";
    document.getElementById("binancePaymentView").style.display = method === 'binance' ? "block" : "none";

    document.getElementById("tabUpi").classList.toggle("active", method === 'upi');
    document.getElementById("tabBinance").classList.toggle("active", method === 'binance');

    const utrLabel = document.getElementById("utrLabel");
    const utrInput = document.getElementById("utrNumber");

    if (method === 'upi') {
        utrLabel.innerHTML = `<i class="fa-solid fa-receipt"></i> Enter 12-Digit UPI UTR / Ref No:`;
        utrInput.placeholder = "e.g. 4029XXXXXXXX (12-Digit UTR)";
    } else {
        utrLabel.innerHTML = `<i class="fa-solid fa-receipt"></i> Enter Binance TxID / Order ID:`;
        utrInput.placeholder = "e.g. 21893XXXXXXXX (Binance TxID)";
    }
}

function confirmPaymentWithUTR() {
    const utr = document.getElementById("utrNumber").value.trim();
    const link = document.getElementById("link").value.trim();

    if (!utr || utr.length < 5) {
        alert("Please enter a valid UTR or Transaction ID!");
        return;
    }

    const price = Number(selectedPackage.price).toFixed(2);
    const usdtPrice = (selectedPackage.price / 96).toFixed(2);

    let amountText = `₹${price} INR`;
    if(currentPaymentMethod === 'binance') {
        amountText = `$${usdtPrice} USDT (₹${price} INR)`;
    }

    const waMsg = `🚀 *NEW ORDER PLACED*%0A%0A` +
                  `*Platform:* ${currentPlatform.toUpperCase()}%0A` +
                  `*Category:* ${selectedPackage.category}%0A` +
                  `*Package:* ${selectedPackage.name}%0A` +
                  `*Target Link:* ${link}%0A` +
                  `*Amount Paid:* ${amountText}%0A` +
                  `*Payment Mode:* ${currentPaymentMethod.toUpperCase()}%0A` +
                  `*Transaction ID/UTR:* ${utr}%0A%0A` +
                  `Please start processing my order!`;

    window.open(`https://wa.me/919337028344?text=${waMsg}`, '_blank');
}
