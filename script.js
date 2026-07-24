const serviceData = {
    instagram: {
        "Instagram Followers": [
            { type: "custom", name: "Instagram Followers", pricePer1000: 80 }
        ],
        "❤️ Instagram Likes": [
            { name: "100 Likes", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "500 Likes", price: 25, badge: "Real", badgeClass: "badge-real" },
            { name: "1K Likes", price: 30, badge: "Fast", badgeClass: "badge-popular" },
            { name: "2K Likes", price: 50, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "5K Likes", price: 99, badge: "🔥 Best Value", badgeClass: "badge-discount" },
            { name: "10K Likes", price: 179, badge: "👑 Most Popular", badgeClass: "badge-discount" }
        ],
        "💬 Instagram Comments": [
            { name: "50 Comments", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "100 Comments", price: 20, badge: "Real", badgeClass: "badge-real" },
            { name: "500 Comments", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "1K Comments", price: 99, badge: "🔥 Best Value", badgeClass: "badge-discount" }
        ],
        "🔄 Instagram Repost": [
            { name: "50 Reposts", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "100 Reposts", price: 20, badge: "Real", badgeClass: "badge-real" },
            { name: "500 Reposts", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "1K Reposts", price: 99, badge: "🔥 Best Value", badgeClass: "badge-discount" },
            { name: "3K Reposts", price: 249, badge: "👑 Most Popular", badgeClass: "badge-discount" }
        ],
        "🚀 Instagram Shares": [
            { name: "100 Shares", price: 10, badge: "Starter", badgeClass: "badge-demo" },
            { name: "1K Shares", price: 30, badge: "Fast", badgeClass: "badge-popular" },
            { name: "5K Shares", price: 69, badge: "🔥 Best Value", badgeClass: "badge-discount" },
            { name: "10K Shares", price: 99, badge: "👑 Most Popular", badgeClass: "badge-discount" }
        ],
        "🎬 Instagram Views": [
            { name: "1K Views", price: 10, badge: "Demo", badgeClass: "badge-demo" },
            { name: "5K Views", price: 20, badge: "Starter", badgeClass: "badge-real" },
            { name: "10K Views", price: 30, badge: "Best Value", badgeClass: "badge-discount" },
            { name: "20K Views", price: 40, badge: "Popular", badgeClass: "badge-popular" },
            { name: "50K Views", price: 70, badge: "Recommended", badgeClass: "badge-real" },
            { name: "100K Views", price: 99, badge: "🔥 Best Seller", badgeClass: "badge-discount" },
            { name: "500K Views", price: 299, badge: "👑 Most Popular", badgeClass: "badge-popular" },
            { name: "1M Views", price: 499, badge: "💥 Mega Deal", badgeClass: "badge-discount" }
        ]
    },
    facebook: {
        "Facebook Followers": [
            { type: "custom", name: "Facebook Followers", pricePer1000: 49 }
        ],
        "Facebook Video Views": [
            { name: "1K Facebook Views", price: 10, badge: "Demo", badgeClass: "badge-demo" },
            { name: "5K Facebook Views", price: 45, badge: "Popular", badgeClass: "badge-popular" }
        ]
    }
};

let selectedPackage = null;
let currentPaymentMethod = 'upi';

function updateCategories() {
    const platform = document.getElementById("platform").value;
    const catSelect = document.getElementById("serviceCategory");
    const packageSection = document.getElementById("packageSection");
    const orderDetailsSection = document.getElementById("orderDetailsSection");

    catSelect.innerHTML = '<option value="">-- Choose Category --</option>';
    packageSection.style.display = "none";
    orderDetailsSection.style.display = "none";

    if (platform && serviceData[platform]) {
        Object.keys(serviceData[platform]).forEach(cat => {
            let opt = document.createElement("option");
            opt.value = cat;
            opt.innerText = cat;
            catSelect.appendChild(opt);
        });
    }
}

function renderPackageCards() {
    const platform = document.getElementById("platform").value;
    const category = document.getElementById("serviceCategory").value;
    const packageSection = document.getElementById("packageSection");
    const packageList = document.getElementById("packageList");
    const orderDetailsSection = document.getElementById("orderDetailsSection");
    const linkInput = document.getElementById("link");

    packageList.innerHTML = "";
    orderDetailsSection.style.display = "none";
    selectedPackage = null;

    if (!platform || !category) {
        packageSection.style.display = "none";
        return;
    }

    if (platform === "instagram") {
        linkInput.placeholder = "https://instagram.com/your_username";
    } else {
        linkInput.placeholder = "https://facebook.com/your_profile_link";
    }

    const iconClass = platform === "instagram" ? "fa-instagram" : "fa-facebook";
    const packages = serviceData[platform][category];

    packages.forEach((pkg) => {
        if (pkg.type === "custom") {
            const customCard = document.createElement("div");
            customCard.className = "custom-qty-card";
            customCard.innerHTML = `
                <div style="margin-bottom: 10px;">
                    <strong style="color: #38bdf8;">${pkg.name}</strong>
                    <p style="font-size: 12px; color: #94a3b8;">Rate: ₹${pkg.pricePer1000} per 1000 Qty</p>
                </div>
                <div class="form-group">
                    <label>Enter Quantity:</label>
                    <input type="number" id="customQtyInput" placeholder="e.g. 1000" oninput="calculateCustomPrice(${pkg.pricePer1000})">
                </div>
                <div style="font-size: 15px; font-weight: bold; color: #4ade80;" id="customPriceDisplay">Total Amount: ₹0 INR</div>
            `;
            packageList.appendChild(customCard);
        } else {
            const card = document.createElement("div");
            card.className = "package-card";
            card.onclick = () => selectPackage(card, pkg, category);

            card.innerHTML = `
                <div class="pkg-left">
                    <div class="pkg-icon-box">
                        <i class="fa-brands ${iconClass}"></i>
                    </div>
                    <div class="pkg-details">
                        <div class="pkg-title-row">
                            <span class="pkg-name">${pkg.name}</span>
                            ${pkg.badge ? `<span class="badge ${pkg.badgeClass}">${pkg.badge}</span>` : ''}
                        </div>
                        <span class="pkg-speed">⚡ Instant Delivery • High Quality</span>
                    </div>
                </div>
                <div class="pkg-price-btn">₹${pkg.price}</div>
            `;
            packageList.appendChild(card);
        }
    });

    packageSection.style.display = "block";
}

function calculateCustomPrice(ratePer1000) {
    const qty = parseInt(document.getElementById("customQtyInput").value) || 0;
    const priceDisplay = document.getElementById("customPriceDisplay");
    const categoryName = document.getElementById("serviceCategory").value;

    if (qty > 0) {
        const total = (qty / 1000) * ratePer1000;
        priceDisplay.innerText = `Total Amount: ₹${total.toFixed(2)} INR`;
        
        selectedPackage = {
            name: `${qty} Followers`,
            price: total,
            category: categoryName
        };

        const summaryBox = document.getElementById("selectedSummary");
        summaryBox.innerHTML = `Selected: <strong>${qty} Followers</strong> ➔ <span style="color: #4ade80;">₹${total.toFixed(2)} INR</span>`;
        document.getElementById("orderDetailsSection").style.display = "block";
    } else {
        priceDisplay.innerText = `Total Amount: ₹0 INR`;
        document.getElementById("orderDetailsSection").style.display = "none";
        selectedPackage = null;
    }
}

function selectPackage(cardElement, pkgData, categoryName) {
    document.querySelectorAll(".package-card").forEach(c => c.classList.remove("selected"));
    cardElement.classList.add("selected");

    selectedPackage = { ...pkgData, category: categoryName };

    const summaryBox = document.getElementById("selectedSummary");
    summaryBox.innerHTML = `Selected: <strong>${pkgData.name}</strong> (${categoryName}) ➔ <span style="color: #4ade80;">₹${pkgData.price} INR</span>`;

    document.getElementById("orderDetailsSection").style.display = "block";
    document.getElementById("orderDetailsSection").scrollIntoView({ behavior: 'smooth' });
}

function generateOrder() {
    const link = document.getElementById("link").value.trim();

    if (!selectedPackage) {
        alert("Please select a package first!");
        return;
    }

    if (!link) {
        alert("Please enter target link / username!");
        return;
    }

    const totalPrice = selectedPackage.price;

    const upiId = "Saheb.68@ptyes"; 
    const payeeName = "Raj Social Panel";
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalPrice}&cu=INR`;
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;
    document.getElementById("qrCodeImg").src = qrApi;

    const usdtAmount = (totalPrice / 95).toFixed(2);
    document.getElementById("binanceUsdtDisplay").innerText = `$${usdtAmount} USDT`;

    document.getElementById("paymentCard").style.display = "block";
    switchPaymentMethod('upi');
    document.getElementById("paymentCard").scrollIntoView({ behavior: 'smooth' });
}

function switchPaymentMethod(method) {
    currentPaymentMethod = method;
    const upiView = document.getElementById("upiPaymentView");
    const binanceView = document.getElementById("binancePaymentView");
    const tabUpi = document.getElementById("tabUpi");
    const tabBinance = document.getElementById("tabBinance");
    const utrLabel = document.getElementById("utrLabel");
    const utrInput = document.getElementById("utrNumber");

    if (method === 'upi') {
        upiView.style.display = "block";
        binanceView.style.display = "none";
        tabUpi.classList.add("active");
        tabBinance.classList.remove("active");
        utrLabel.innerText = "Enter 12-Digit UPI UTR / Ref No:";
        utrInput.placeholder = "e.g. 4029XXXXXXXX (12-Digit UTR)";
    } else {
        upiView.style.display = "none";
        binanceView.style.display = "block";
        tabBinance.classList.add("active");
        tabUpi.classList.remove("active");
        utrLabel.innerText = "Transaction ID / Order ID:";
        utrInput.placeholder = "e.g. Enter Binance Order ID";
    }
}

function confirmPaymentWithUTR() {
    const utr = document.getElementById("utrNumber").value.trim();
    const link = document.getElementById("link").value.trim();

    if (!utr || utr.length < 6) {
        alert("Please enter a valid Transaction ID / UTR!");
        return;
    }

    const usdtAmount = (selectedPackage.price / 95).toFixed(2);

    const waMsg = `🚀 *NEW ORDER PLACED*%0A%0A` +
                  `*Category:* ${selectedPackage.category}%0A` +
                  `*Package:* ${selectedPackage.name}%0A` +
                  `*Target Link:* ${link}%0A` +
                  `*Amount Paid:* ₹${selectedPackage.price} INR ($${usdtAmount} USDT)%0A` +
                  `*Payment Mode:* ${currentPaymentMethod.toUpperCase()}%0A` +
                  `*Transaction ID / UTR:* ${utr}%0A%0A` +
                  `Please check payment and start processing!`;

    window.open(`https://wa.me/919337028344?text=${waMsg}`, '_blank');
}

// Global Live Counter starting at 2,99,784
function startGlobalCounter() {
    const baseStartDate = new Date("2026-01-01T00:00:00").getTime();
    const baseOrders = 299784; 
    const baseCompleted = 299734; 

    function updateDisplay() {
        const now = Date.now();
        const minutesPassed = Math.floor((now - baseStartDate) / (1000 * 60));
        if (document.getElementById("totalOrders")) {
            document.getElementById("totalOrders").innerText = (baseOrders + minutesPassed).toLocaleString('en-IN');
            document.getElementById("completedOrders").innerText = (baseCompleted + minutesPassed).toLocaleString('en-IN');
        }
    }
    updateDisplay();
    setInterval(updateDisplay, 1000);
}

window.onload = startGlobalCounter;
