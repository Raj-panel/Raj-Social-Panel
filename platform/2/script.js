// =========================================================
// PERMANENT LAYOUT LOCK & CHECKOUT SCROLL OPTIMIZATION
// =========================================================
(function injectPermanentCss() {
    if (document.getElementById("fixedLayoutCss")) return;
    const style = document.createElement("style");
    style.id = "fixedLayoutCss";
    style.innerHTML = `
        /* Fixed Hero Banner Height */
        .hero-banner, .hero-card, .instagram-boost-card {
            height: auto !important;
            min-height: 160px !important;
            max-height: 180px !important;
            padding: 12px 14px !important;
            box-sizing: border-box !important;
            overflow: visible !important;
        }
        .hero-banner .hero-title, .hero-card h1, .hero-card h2 {
            margin-top: 0px !important;
            margin-bottom: 2px !important;
            font-size: 18px !important;
        }
        .hero-banner p, .hero-card p {
            margin-bottom: 8px !important;
            font-size: 11px !important;
        }

        #installContainer {
            margin-top: 50px !important;
            margin-bottom: 4px !important;
        }

        #checkoutPage label[for="checkoutLinkInput"],
        #checkoutPage .target-input-label,
        #checkoutLinkLabel,
        #checkoutPage label[for="checkoutTxnId"],
        #checkoutPage .utr-label,
        #checkoutPage .input-box label {
            font-size: 13px !important;
            font-weight: 700 !important;
            line-height: 1.4 !important;
            margin-bottom: 4px !important;
            display: block !important;
            color: #0f172a !important;
            text-shadow: 0 0 1px rgba(255, 255, 255, 0.8) !important;
        }

        @media (prefers-color-scheme: dark) {
            #checkoutPage label[for="checkoutLinkInput"],
            #checkoutPage .target-input-label,
            #checkoutLinkLabel,
            #checkoutPage label[for="checkoutTxnId"],
            #checkoutPage .utr-label,
            #checkoutPage .input-box label {
                color: #f8fafc !important;
                text-shadow: none !important;
            }
        }

        @media screen and (max-width: 768px) {
            #checkoutPage { 
                padding: 4px 8px !important; 
                max-width: 440px !important; 
                margin: 0 auto !important;
                box-sizing: border-box !important;
            }
            #checkoutPage .checkout-card, #checkoutPage .card-box { 
                margin-bottom: 4px !important; 
                padding: 6px 8px !important; 
            }
            #checkoutPage .input-box { 
                margin-bottom: 4px !important; 
            }
            #checkoutPage input { 
                padding: 2px 6px !important; 
                font-size: 11px !important; 
                height: 36px !important; 
                color: #0f172a !important;
                background-color: #ffffff !important;
                border: 1px solid #cbd5e1 !important;
            }
            #checkoutUpiView { 
                padding: 0px !important; 
                margin-bottom: 2px !important; 
                text-align: center !important; 
            }
            #scanToPayHeading { 
                display: block !important; 
                visibility: visible !important; 
                opacity: 1 !important; 
                margin: 2px 0 2px 0 !important; 
                font-size: 12px !important; 
                font-weight: 800 !important; 
                text-align: center !important; 
                text-transform: uppercase !important; 
                background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%) !important; 
                -webkit-background-clip: text !important; 
                -webkit-text-fill-color: transparent !important; 
            }
            #checkoutUpiView img { 
                width: 140px !important; 
                height: 130px !important; 
                object-fit: contain !important; 
                margin: 4px auto !important; 
                padding: 4px !important; 
                border-radius: 8px !important; 
            }
            #checkoutBinanceView img {
                width: 150px !important;
                height: 160px !important;
                object-fit: contain !important;
                margin: 2px auto !important; 
                padding: 2px !important;
                border-radius: 10px !important;
            }
            .upi-app-btn-grid { 
                margin-top: 2px !important; 
                gap: 4px !important; 
            }
            #checkoutPage .payment-tabs { 
                margin-bottom: 2px !important; 
            }
            #checkoutPage .submit-btn { 
                padding: 2px !important; 
                height: 32px !important; 
                font-size: 12px !important; 
                margin-top: 4px !important; 
            }
            #checkoutPage p { 
                margin-bottom: 1px !important; 
                font-size: 9px !important; 
            }
            .warning-msg, [style*="background: rgba(234, 179, 8, 0.1)"] { 
                padding: 2px 4px !important; 
                font-size: 8.5px !important; 
                margin-bottom: 2px !important; 
            }
            #payViaUpiAppBtn { 
                display: none !important; 
            }
        }
    `;
    document.head.appendChild(style);
})();

// ==========================================
// NAVIGATION FIX FOR LOGIN / CREATE ACCOUNT
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (e) {
        const link = e.target.closest("a");
        if (link && !link.onclick) {
            const href = link.getAttribute("href");
            if (href && href !== "#" && !href.startsWith("javascript:")) {
                window.location.href = href;
            }
        }
    });
    // Initial Load
    switchPlatform("instagram");
});

// ==========================================
// ACCURATE SERVICE DATA
// ==========================================
const serviceData = {
    instagram: {
        "Working Service": [
            { name: "1220 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄", pricePer1000: 65.358, avgTime: "0–10 Minutes" },
            { name: "1221 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄", pricePer1000: 67.929, avgTime: "0–10 Minutes" },
            { name: "1222 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄", pricePer1000: 70.501, avgTime: "0–10 Minutes" },
            { name: "1223 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️", pricePer1000: 73.072, avgTime: "0–10 Minutes" }
        ],
        "Followers Non-Drop": [
            { name: "1072 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - No Refill 🔄", pricePer1000: 67.929, avgTime: "0–2 Minutes" },
            { name: "1073 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 30D Refill 🔄", pricePer1000: 73.072, avgTime: "0–2 Minutes" },
            { name: "1074 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 60D Refill 🔄", pricePer1000: 75.644, avgTime: "0–2 Minutes" },
            { name: "1075 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 90D Refill 🔄", pricePer1000: 78.215, avgTime: "0–2 Minutes" },
            { name: "1076 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 365D Refill 🔄", pricePer1000: 79.858, avgTime: "0–2 Minutes" },
            { name: "1077 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - Lifetime Refill ♻️", pricePer1000: 83.358, avgTime: "0–2 Minutes" }
        ]
    },
    facebook: {
        "PAGE/PROFILE Followers": [
            { name: "Facebook Page/Profile Followers", pricePer1000: 40, avgTime: "10–30 Minutes" }
        ],
        "Likes Life-Time Refill ♻️": [
            { name: "Facebook Likes Life-Time Refill", pricePer1000: 1000, avgTime: "5–15 Minutes" }
        ]
    },
    youtube: {
        "YouTube Subscribe — Non Drop": [
            { name: "YouTube Subscribers Non Drop", pricePer1000: 1000, avgTime: "1–2 Hours" }
        ]
    },
    tiktok: {
        "TikTok Followers 30 Day Refill♻️": [
            { name: "TikTok Followers Premium", pricePer1000: 1000, avgTime: "15–30 Minutes" }
        ]
    }
};

// Application State
let currentPlatform = "instagram";
let currentCategory = "";
let selectedPackage = null;
let currentCheckoutData = {};

window.addEventListener('popstate', function () {
    const checkoutPage = document.getElementById("checkoutPage");
    if (checkoutPage && (checkoutPage.style.display === "block" || !checkoutPage.classList.contains("hidden"))) {
        closeCheckoutUI();
    }
});

function switchPlatform(platform) {
    currentPlatform = platform;
    selectedPackage = null;

    const btnMap = {
        instagram: document.getElementById("btnInsta"),
        facebook: document.getElementById("btnFb"),
        youtube: document.getElementById("btnYt"),
        tiktok: document.getElementById("btnTt")
    };

    Object.keys(btnMap).forEach(p => {
        if (btnMap[p]) btnMap[p].classList.toggle("active", p === platform);
    });

    const heroTitle = document.getElementById("heroTitle");
    const heroLogoIcon = document.getElementById("heroLogoIcon");

    const platformConfigs = {
        instagram: { title: "Instagram Boost", icon: '<i class="fa-brands fa-instagram"></i>' },
        facebook: { title: "Facebook Boost", icon: '<i class="fa-brands fa-facebook"></i>' },
        youtube: { title: "YouTube Boost", icon: '<i class="fa-brands fa-youtube"></i>' },
        tiktok: { title: "TikTok Boost", icon: '<i class="fa-brands fa-tiktok"></i>' }
    };

    if (platformConfigs[platform]) {
        if (heroTitle) heroTitle.innerText = platformConfigs[platform].title;
        if (heroLogoIcon) heroLogoIcon.innerHTML = platformConfigs[platform].icon;
    }

    renderCategoryTabs();
    toggleInstallButton();
}

function renderCategoryTabs() {
    const tabsContainer = document.getElementById("categoryTabs");
    if (!tabsContainer) return;
    tabsContainer.innerHTML = "";

    const categories = Object.keys(serviceData[currentPlatform] || {});
    if (categories.length === 0) return;
    currentCategory = categories[0];

    categories.forEach((cat, index) => {
        const tabBtn = document.createElement("button");
        tabBtn.className = `cat-tab ${index === 0 ? "active" : ""}`;
        tabBtn.innerText = cat;

        tabBtn.onclick = function () {
            document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
            tabBtn.classList.add("active");
            currentCategory = cat;
            renderPackages();
            toggleInstallButton();
        };

        tabsContainer.appendChild(tabBtn);
    });

    renderPackages();
}

function renderPackages() {
    const packageList = document.getElementById("packageList");
    if (!packageList) return;

    packageList.innerHTML = "";
    selectedPackage = null;

    const packages = serviceData[currentPlatform]?.[currentCategory] || [];

    packages.forEach((pkg, index) => {
        const customDiv = document.createElement("div");
        customDiv.className = "custom-card";
        customDiv.style.cssText = "background: #1e293b; padding: 14px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #334155;";

        const inputId = `customQtyInput_${index}`;
        const priceDisplayId = `customCalcPrice_${index}`;
        const minWarningId = `customMinWarning_${index}`;

        customDiv.innerHTML = `
            <div style="margin-bottom: 8px;">
                <strong class="custom-title" style="color: #a855f7; font-size: 13px; display: block; line-height: 1.4;">
                    ${pkg.name}
                </strong>
                <p style="font-size: 11px; color: #94a3b8; margin: 4px 0 2px 0;">
                    Rate: <b style="color: #f8fafc;">₹${pkg.pricePer1000}</b> per 1000 Quantity
                </p>
                <p style="font-size: 11px; color: #38bdf8; margin: 0; font-weight: bold;">
                    ⚡ Average Time: <b>${pkg.avgTime || "0-10 Minutes"}</b>
                </p>
            </div>

            <div class="input-box" style="margin-top: 10px;">
                <input
                    type="number"
                    id="${inputId}"
                    placeholder="Minimum 100"
                    min="100"
                    style="width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #475569; background: #0f172a; color: #fff; font-size: 12px; outline: none;"
                    oninput="calculateCustomPriceForInput('${pkg.name.replace(/'/g, "\\'")}', ${pkg.pricePer1000}, '${inputId}', '${priceDisplayId}', '${minWarningId}')"
                >
            </div>

            <div style="font-size: 11px; color: #ef4444; margin-top: 4px; display: none; font-weight: bold;" id="${minWarningId}">
                ⚠️ Minimum Quantity is 100!
            </div>

            <div style="font-size: 13px; font-weight: 800; color: #22c55e; margin-top: 8px;">
                Total: ₹<span id="${priceDisplayId}">0.00</span> INR
            </div>

            <button class="action-btn" style="margin-top: 10px; width: 100%; padding: 10px; background: #22c55e; color: #fff; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px;" onclick="openCheckoutFromCustomInput('${inputId}', '${priceDisplayId}', '${pkg.name.replace(/'/g, "\\'")}', ${pkg.pricePer1000})">
                Proceed to Payment
            </button>
        `;

        packageList.appendChild(customDiv);
    });
}

function calculateCustomPriceForInput(serviceName, ratePer1000, inputId, priceDisplayId, minWarningId) {
    const qtyInput = document.getElementById(inputId);
    const valStr = qtyInput ? qtyInput.value.trim() : "";
    const qty = parseFloat(valStr) || 0;
    const calcPriceSpan = document.getElementById(priceDisplayId);
    const minWarning = document.getElementById(minWarningId);

    if (valStr !== "" && qty < 100) {
        if (minWarning) minWarning.style.display = "block";
        if (qtyInput) {
            qtyInput.style.borderColor = "#ef4444";
            qtyInput.style.color = "#ef4444";
        }
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
    } else if (qty >= 100) {
        if (minWarning) minWarning.style.display = "none";
        if (qtyInput) {
            qtyInput.style.borderColor = "#22c55e";
            qtyInput.style.color = "#ffffff";
        }
        const total = (qty / 1000) * ratePer1000;
        if (calcPriceSpan) calcPriceSpan.innerText = total.toFixed(2);
    } else {
        if (minWarning) minWarning.style.display = "none";
        if (qtyInput) {
            qtyInput.style.borderColor = "#475569";
            qtyInput.style.color = "#ffffff";
        }
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
    }
}

function openCheckoutFromCustomInput(inputId, priceDisplayId, serviceFullName, ratePer1000) {
    const qtyInput = document.getElementById(inputId);
    const qty = parseFloat(qtyInput ? qtyInput.value : 0);

    if (!qty || qty < 100) {
        alert("Minimum order quantity is 100!");
        return;
    }

    const price = (qty / 1000) * ratePer1000;
    const platformCap = currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1);

    currentCheckoutData = {
        platform: platformCap,
        serviceName: serviceFullName || currentCategory,
        packageName: `${qty.toLocaleString()} Quantity`,
        baseQuantity: qty,
        quantity: qty,
        basePrice: price,
        price: price,
        multiplier: 1,
        badge: "Custom"
    };

    showCheckoutOverlay();
}

function getLinkConfig(platform, category) {
    const p = (platform || "").toLowerCase();
    const c = (category || "").toLowerCase();

    if (p.includes("youtube") || c.includes("youtube")) {
        return { label: "YouTube Video / Channel Link", placeholder: "Enter YouTube link" };
    }
    if (p.includes("tiktok") || c.includes("tiktok")) {
        return { label: "TikTok Video Link / Username", placeholder: "Enter TikTok link" };
    }
    if (p.includes("facebook") || c.includes("facebook")) {
        return { label: "Facebook Page / Post Link", placeholder: "Enter Facebook link" };
    }
    return { label: "Instagram Profile / Post Link", placeholder: "Enter Instagram link or username" };
}

function updateCheckoutQuantityDisplay() {
    const d = currentCheckoutData;
    if (!d || !d.baseQuantity) return;

    d.quantity = d.baseQuantity * (d.multiplier || 1);
    const unitRate = (d.basePrice / d.baseQuantity);
    d.price = d.quantity * unitRate;

    const qtyCountDisplay = document.getElementById("checkoutQtyCount");
    if (qtyCountDisplay) qtyCountDisplay.innerText = d.multiplier || 1;

    const unitsText = document.getElementById("checkoutUnitsText");
    if (unitsText) unitsText.innerText = `${d.quantity.toLocaleString()} Quantity`;

    const priceEl = document.getElementById("checkoutPriceText");
    if (priceEl) priceEl.innerText = `${d.price.toFixed(2)}`;

    const usdtEl = document.getElementById("checkoutUsdtAmount");
    if (usdtEl) {
        usdtEl.innerText = `$${(d.price / 88).toFixed(2)} USDT`;
    }

    const upiId = "rajpanel@axl";
    const upiUrl = `upi://pay?pa=${upiId}&pn=RajSocialPanel&am=${d.price.toFixed(2)}&cu=INR&tn=${encodeURIComponent(d.packageName)}`;
    const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=8&data=${encodeURIComponent(upiUrl)}`;

    const qrImg = document.getElementById("checkoutQrImg");
    if (qrImg) {
        qrImg.src = qrImageSrc;
        qrImg.style.width = "110px";
        qrImg.style.height = "110px";
        qrImg.style.objectFit = "contain";
    }
}

function changeCheckoutMultiplier(delta) {
    if (!currentCheckoutData.multiplier) currentCheckoutData.multiplier = 1;
    let newMultiplier = currentCheckoutData.multiplier + delta;
    if (newMultiplier < 1) newMultiplier = 1;

    currentCheckoutData.multiplier = newMultiplier;
    updateCheckoutQuantityDisplay();
}

function showCheckoutOverlay() {
    const d = currentCheckoutData;
    history.pushState({ checkoutOpen: true }, "");

    const iconBox = document.getElementById("checkoutPlatformIcon");
    if (iconBox) {
        const pLower = (d.platform || "").toLowerCase();
        const iconClasses = {
            facebook: '<i class="fa-brands fa-facebook"></i>',
            youtube: '<i class="fa-brands fa-youtube"></i>',
            tiktok: '<i class="fa-brands fa-tiktok"></i>'
        };
        iconBox.innerHTML = iconClasses[pLower] || '<i class="fa-brands fa-instagram"></i>';
    }

    const titleEl = document.getElementById("checkoutServiceTitle");
    if (titleEl) titleEl.innerText = `${d.platform} - ${d.serviceName}`;

    const badgeNameEl = document.getElementById("checkoutPkgBadgeName");
    if (badgeNameEl) badgeNameEl.innerText = d.packageName;

    const badgeEl = document.getElementById("checkoutBadge");
    if (badgeEl) badgeEl.innerText = d.badge;

    updateCheckoutQuantityDisplay();

    const linkConfig = getLinkConfig(d.platform, d.serviceName);
    const linkLabel = document.getElementById("checkoutLinkLabel") || document.querySelector('label[for="checkoutLinkInput"]');
    const linkInput = document.getElementById("checkoutLinkInput");

    if (linkLabel) linkLabel.innerText = linkConfig.label;
    if (linkInput) {
        linkInput.value = "";
        linkInput.placeholder = linkConfig.placeholder;
    }

    const txnInput = document.getElementById("checkoutTxnId");
    if (txnInput) txnInput.value = "";

    const checkoutPage = document.getElementById("checkoutPage");
    if (checkoutPage) {
        checkoutPage.classList.remove("hidden");
        checkoutPage.style.display = "block";
        checkoutPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function closeCheckoutUI() {
    const checkoutPage = document.getElementById("checkoutPage");
    if (checkoutPage) {
        checkoutPage.classList.add("hidden");
        checkoutPage.style.display = "none";
    }
    currentCheckoutData = {}; 
}

function closeCheckout() {
    closeCheckoutUI();
    if (history.state && history.state.checkoutOpen) {
        history.back();
    }
}

function switchCheckoutPayment(type) {
    const btnUpi = document.getElementById("btnTabUpi");
    const btnBinance = document.getElementById("btnTabBinance");
    const viewUpi = document.getElementById("checkoutUpiView");
    const viewBinance = document.getElementById("checkoutBinanceView");

    if (type === 'upi') {
        if (btnUpi) btnUpi.classList.add("active");
        if (btnBinance) btnBinance.classList.remove("active");
        if (viewUpi) viewUpi.classList.remove("hidden");
        if (viewBinance) viewBinance.classList.add("hidden");
    } else {
        if (btnBinance) btnBinance.classList.add("active");
        if (btnUpi) btnUpi.classList.remove("active");
        if (viewBinance) viewBinance.classList.remove("hidden");
        if (viewUpi) viewUpi.classList.add("hidden");
    }
}

function triggerUpiPay(appType) {
    const d = currentCheckoutData;
    const upiId = "rajpanel@axl";
    const amount = d.price ? d.price.toFixed(2) : "0.00";
    const name = "RajSocialPanel";
    const note = encodeURIComponent(d.packageName || "Social Boost Service");

    let deepLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;

    if (appType === "paytm") {
        deepLink = `paytmmp://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    } else if (appType === "gpay") {
        deepLink = `tez://upi/pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    } else if (appType === "phonepe") {
        deepLink = `phonepe://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    }

    window.location.href = deepLink;
}

function submitOrderToWhatsApp() {
    const linkInput = document.getElementById("checkoutLinkInput");
    const txnInput = document.getElementById("checkoutTxnId");

    const rawLink = linkInput ? linkInput.value.trim() : "";
    const txnId = txnInput ? txnInput.value.trim() : "";

    if (!rawLink) {
        alert("Please enter target Link or Username!");
        return;
    }
    if (!txnId) {
        alert("Please enter Transaction ID / UTR number!");
        return;
    }

    const orderIdVal = Math.floor(100000 + Math.random() * 900000);
    const isUpi = document.getElementById("btnTabUpi") ? document.getElementById("btnTabUpi").classList.contains("active") : true;
    const payMethod = isUpi ? "UPI QR Code" : "Binance Pay";
    const whatsappNumber = "919239628344";

    const d = currentCheckoutData;

    const formattedMessage = 
        `🚀 *NEW ORDER SUBMITTED PLATFORM 2* 🚀\n\n` +
        `🆔 *Order ID:* #${orderIdVal}\n` +
        `📌 *Social Media:* ${d.platform || ''}\n` +
        `🛠️ *Service Name:* ${d.serviceName || ''}\n` +
        `📦 *Package:* ${d.packageName || ''}\n` +
        `🔢 *Total Quantity:* ${(d.quantity || 0).toLocaleString()}\n` +
        `💰 *Total Price:* ₹${(d.price || 0).toFixed(2)}\n` +
        `🔗 *Target Link:* ${rawLink}\n` +
        `💳 *Payment Method:* ${payMethod}\n` +
        `🧾 *Transaction ID / UTR:* ${txnId}`;

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`, "_blank");
}

function toggleInstallButton() {
    const installContainer = document.getElementById("installContainer");
    if (!installContainer) return;

    if (currentPlatform === "instagram" && currentCategory === "Followers Non-Drop" && window.deferredPrompt) {
        installContainer.style.display = "block";
    } else {
        installContainer.style.display = "none";
    }
}
