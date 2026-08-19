// =========================================================
// PERMANENT LAYOUT LOCK & CHECKOUT SCROLL OPTIMIZATION
// =========================================================
(function injectPermanentCss() {
    if (document.getElementById("fixedLayoutCss")) return;
    const style = document.createElement("style");
    style.id = "fixedLayoutCss";
    style.innerHTML = `
        /* 1. Adjusted Fixed Hero Banner Height */
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

        /* Fixed Install Container Position */
        #installContainer {
            margin-top: 50px !important;
            margin-bottom: 4px !important;
        }

        /* FIXED: Target Link & UTR Field Labels Color & Contrast for Light/Dark Mode */
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
            color: #0f172a !important; /* Always readable Dark Navy text for white/light backgrounds */
            text-shadow: 0 0 1px rgba(255, 255, 255, 0.8) !important;
        }

        /* Dark Mode Fallback */
        @media (prefers-color-scheme: dark) {
            #checkoutPage label[for="checkoutLinkInput"],
            #checkoutPage .target-input-label,
            #checkoutLinkLabel,
            #checkoutPage label[for="checkoutTxnId"],
            #checkoutPage .utr-label,
            #checkoutPage .input-box label {
                color: #f8fafc !important; /* Bright crisp text in native system dark mode */
                text-shadow: none !important;
            }
        }

        @media screen and (min-width: 768px) {
            #checkoutPage label[for="checkoutLinkInput"],
            #checkoutPage .target-input-label,
            #checkoutLinkLabel,
            #checkoutPage label[for="checkoutTxnId"],
            #checkoutPage .utr-label {
                font-size: 14px !important;
            }
        }

        @media screen and (max-width: 768px) {
            /* 2. Checkout Ultra-Compact Vertical Height */
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
});

// ==========================================
// SERVICE DATA CONFIGURATION
// ==========================================
const serviceData = {
    instagram: {
        "Followers": [
            { type: "custom", name: "Instagram Followers (20% Extra Less Drop)", pricePer1000: 1000 }
        ],
        "Likes Non-Drop": [
            { type: "custom", name: "Instagram Likes Non-Drop", pricePer1000: 1000 }
        ],
        "REAL Reels / Video Views Non-Drop": [
            { type: "custom", name: "Instagram REAL Reels / Video Views Non-Drop", pricePer1000: 1000 }
        ],
        "REAL Photo / Post Views Non-Drop": [
            { type: "custom", name: "Instagram REAL Photo / Post Views Non-Drop", pricePer1000: 1000 }
        ],
        "REAL Comments Non-Drop": [
            { type: "custom", name: "Instagram REAL Comments Non-Drop", pricePer1000: 1000 }
        ],
        "REAL Repost Non-Drop": [
            { type: "custom", name: "Instagram REAL Repost Non-Drop", pricePer1000: 1000 }
        ],
        "REAL Shares Non-Drop": [
            { type: "custom", name: "Instagram REAL Shares Non-Drop", pricePer1000: 1000 }
        ]
    },
    facebook: {
        "PAGE/PROFILE Followers": [
            { type: "custom", name: "Facebook Page/Profile Followers", pricePer1000: 40 }
        ],
        "Likes Life-Time Refill ♻️": [
            { type: "custom", name: "Facebook Likes Life-Time Refill", pricePer1000: 1000 }
        ],
        "Reels / Video Views Non-Drop": [
            { type: "custom", name: "Facebook Reels / Video Views Non-Drop", pricePer1000: 1000 }
        ],
        "POST / VIDEO Shares Non-Drop": [
            { type: "custom", name: "Facebook Post / Video Shares Non-Drop", pricePer1000: 1000 }
        ]
    },
    youtube: {
        "YouTube Likes — Non Drop": [
            { type: "custom", name: "YouTube Likes Non Drop", pricePer1000: 1000 }
        ],
        "YT Shorts / Video Views Non-Drop": [
            { type: "custom", name: "YouTube Shorts / Video Views Non-Drop", pricePer1000: 1000 }
        ],
        "YT Live Stream Views Non-Drop": [
            { type: "custom", name: "YouTube Live Stream Views Non-Drop", pricePer1000: 1000 }
        ],
        "YouTube Subscribe — Non Drop": [
            { type: "custom", name: "YouTube Subscribers Non Drop", pricePer1000: 1000 }
        ]
    },
    tiktok: {
        "TikTok Followers 30 Day Refill♻️": [
            { type: "custom", name: "TikTok Followers Premium", pricePer1000: 1000 }
        ],
        "TikTok Likes Non-Drop": [
            { type: "custom", name: "TikTok Likes Non-Drop", pricePer1000: 1000 }
        ],
        "TikTok Views Non-Drop": [
            { type: "custom", name: "TikTok Video Views Non-Drop", pricePer1000: 1000 }
        ],
        "TikTok Share — Lifetime Refill": [
            { type: "custom", name: "TikTok Shares Lifetime Refill", pricePer1000: 1000 }
        ],
        "TikTok Save — Lifetime Refill": [
            { type: "custom", name: "TikTok Saves Lifetime Refill", pricePer1000: 1000 }
        ]
    }
};

// Global Application State
let currentPlatform = "instagram";
let currentCategory = "";
let selectedPackage = null;
let currentCheckoutData = {};

window.onload = function () {
    switchPlatform("instagram");
};

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

        const inputId = `customQtyInput_${index}`;
        const priceDisplayId = `customCalcPrice_${index}`;
        const minWarningId = `customMinWarning_${index}`;

        const rate = pkg.pricePer1000 || 1000;

        customDiv.innerHTML = `
            <div style="margin-bottom: 8px;">
                <strong class="custom-title" style="color: #a855f7; font-size: 13px;">
                    ${pkg.name} (Enter Custom Qty)
                </strong>
                <p style="font-size: 10px; color: #94a3b8;">
                    Rate: ₹${rate} per 1000 Quantity
                </p>
            </div>

            <div class="input-box">
                <input
                    type="number"
                    id="${inputId}"
                    placeholder="Enter quantity (e.g. 1000)"
                    min="1"
                    oninput="calculateCustomPriceForInput('${pkg.name}', ${rate}, '${inputId}', '${priceDisplayId}', '${minWarningId}')"
                >
            </div>

            <div style="font-size: 11px; color: #ef4444; margin-top: 4px; display: none;" id="${minWarningId}">
                ⚠️ Minimum Quantity is 1!
            </div>

            <div style="font-size: 12px; font-weight: 800; color: #22c55e; margin-top: 5px;">
                Total: ₹<span id="${priceDisplayId}">0.00</span> INR
            </div>

            <button class="action-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #22c55e; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;" onclick="openCheckoutFromCustomInput('${inputId}', '${priceDisplayId}', ${rate})">
                Proceed to Payment
            </button>
        `;

        packageList.appendChild(customDiv);
    });
}

function calculateCustomPriceForInput(serviceName, ratePer1000, inputId, priceDisplayId, minWarningId) {
    const qtyInput = document.getElementById(inputId);
    const qty = parseInt(qtyInput ? qtyInput.value : 0) || 0;
    const calcPriceSpan = document.getElementById(priceDisplayId);
    const minWarning = document.getElementById(minWarningId);

    if (qty < 1 && qtyInput && qtyInput.value !== "") {
        if (minWarning) minWarning.style.display = "block";
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
        selectedPackage = null;
    } else if (qty >= 1) {
        if (minWarning) minWarning.style.display = "none";
        const total = (qty / 1000) * ratePer1000;
        if (calcPriceSpan) calcPriceSpan.innerText = total.toFixed(2);

        selectedPackage = {
            name: `${qty.toLocaleString()} ${serviceName}`,
            price: total,
            quantity: qty,
            category: currentCategory,
            ratePer1000: ratePer1000
        };
    } else {
        if (minWarning) minWarning.style.display = "none";
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
        selectedPackage = null;
    }
}

function openCheckoutFromCustomInput(inputId, priceDisplayId, ratePer1000) {
    const qtyInput = document.getElementById(inputId);
    const qty = parseFloat(qtyInput ? qtyInput.value : 0);

    if (!qty || qty < 1) {
        alert("Please enter a valid order quantity!");
        return;
    }

    const calculatedPriceText = document.getElementById(priceDisplayId);
    const price = parseFloat(calculatedPriceText ? calculatedPriceText.innerText : 0);

    const platformCap = currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1);

    currentCheckoutData = {
        platform: platformCap,
        serviceName: currentCategory,
        packageName: `${qty.toLocaleString()} Custom Qty`,
        baseQuantity: qty,
        quantity: qty,
        basePrice: price,
        price: price,
        ratePer1000: ratePer1000 || 1000,
        multiplier: 1,
        badge: "Custom"
    };

    showCheckoutOverlay();
}

function getLinkConfig(platform, category) {
    const p = (platform || "").toLowerCase();
    const c = (category || "").toLowerCase();

    if (p.includes("youtube") || c.includes("youtube") || c.includes("yt")) {
        if (c.includes("subscribe")) {
            return {
                label: "YouTube Channel Link or Handle",
                placeholder: "Enter YouTube channel link or @handle"
            };
        }
        return {
            label: "YouTube Video / Shorts Link",
            placeholder: "Enter YouTube video/Shorts link"
        };
    }

    if (p.includes("tiktok") || c.includes("tiktok")) {
        return {
            label: "TikTok Video Link or Username",
            placeholder: "Enter TikTok video link or username"
        };
    }

    if (p.includes("instagram") || c.includes("instagram") || c.includes("ig")) {
        if (c.includes("like")) {
            return {
                label: "Post / Reel Link",
                placeholder: "Enter Instagram post/reel link"
            };
        }
        if (c.includes("reel") || c.includes("view") || c.includes("video")) {
            return {
                label: "Instagram Reel / Video Link",
                placeholder: "Enter Instagram reel/video link"
            };
        }
        if (c.includes("follower") || c.includes("blue") || c.includes("verify") || c.includes("profile")) {
            return {
                label: "Instagram Profile Link",
                placeholder: "Enter Instagram username or profile link"
            };
        }
        return {
            label: "Instagram Post / Profile Link",
            placeholder: "Enter Instagram username or link"
        };
    }

    if (p.includes("facebook") || c.includes("facebook") || c.includes("fb")) {
        if (c.includes("follower") || c.includes("page")) {
            return {
                label: "Facebook Profile / Page Link",
                placeholder: "Enter Facebook profile or page link"
            };
        }
        return {
            label: "Facebook Post / Video Link",
            placeholder: "Enter Facebook post or video link"
        };
    }

    return {
        label: "Target Link or Username",
        placeholder: "Enter link or username"
    };
}

function updateCheckoutQuantityDisplay() {
    const d = currentCheckoutData;
    if (!d || !d.baseQuantity) return;

    d.quantity = d.baseQuantity * (d.multiplier || 1);
    const rate = d.ratePer1000 || 1000;
    d.price = (d.quantity / 1000) * rate;

    const qtyCountDisplay = document.getElementById("checkoutQtyCount");
    if (qtyCountDisplay) qtyCountDisplay.innerText = d.multiplier || 1;

    const unitsText = document.getElementById("checkoutUnitsText");
    if (unitsText) unitsText.innerText = `${d.quantity.toLocaleString()} Package`;

    const priceEl = document.getElementById("checkoutPriceText");
    if (priceEl) priceEl.innerText = `${d.price.toFixed(2)}`;

    const usdtEl = document.getElementById("checkoutUsdtAmount");
    if (usdtEl) {
        const usdt = (d.price / 88).toFixed(2);
        usdtEl.innerText = `$${usdt} USDT`;
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

    setTimeout(() => {
        if (!document.hidden) {
            window.location.href = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
        }
    }, 1200);
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

    let counterContainer = document.getElementById("checkoutQtyCounterBox");
    const priceEl = document.getElementById("checkoutPriceText");
    const priceParent = priceEl ? priceEl.parentElement : null;

    if (!counterContainer && priceParent) {
        counterContainer = document.createElement("div");
        counterContainer.id = "checkoutQtyCounterBox";
        counterContainer.style.cssText = "display: flex; align-items: center; background: rgba(255, 255, 255, 0.1); border-radius: 6px; padding: 1px 4px; gap: 6px; margin-left: auto;";
        
        counterContainer.innerHTML = `
            <button type="button" onclick="changeCheckoutMultiplier(-1)" style="background: rgba(255, 255, 255, 0.2); color: #fff; border: none; width: 30px; height: 30px; border-radius: 5px; font-weight: bold; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;">-</button>
            <span id="checkoutQtyCount" style="color: #fff; font-weight: bold; font-size: 16px; min-width: 22px; text-align: center;">1</span>
            <button type="button" onclick="changeCheckoutMultiplier(1)" style="background: rgba(255, 255, 255, 0.2); color: #fff; border: none; width: 30px; height: 30px; border-radius: 5px; font-weight: bold; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
        `;

        if (priceParent.style) {
            priceParent.style.display = "flex";
            priceParent.style.alignItems = "center";
            priceParent.style.justifyContent = "space-between";
        }
        priceParent.appendChild(counterContainer);
    }

    d.multiplier = 1;

    const upiView = document.getElementById("checkoutUpiView");
    const qrImg = document.getElementById("checkoutQrImg");
    if (upiView) {
        let scanHeading = document.getElementById("scanToPayHeading");
        if (!scanHeading) {
            scanHeading = document.createElement("h3");
            scanHeading.id = "scanToPayHeading";
            scanHeading.innerText = "SCAN TO PAY VIA UPI";
            scanHeading.style.cssText = "margin: 2px 0 2px 0 !important; font-size: 12px !important; font-weight: 800 !important; text-align: center !important; text-transform: uppercase !important; background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%) !important; -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; display: block !important; visibility: visible !important; opacity: 1 !important;";
        }
        if (qrImg && qrImg.parentElement === upiView) {
            upiView.insertBefore(scanHeading, qrImg);
        } else {
            upiView.prepend(scanHeading);
        }
    }

    updateCheckoutQuantityDisplay();

    const priceCard = priceEl ? priceEl.parentElement : null;
    if (priceCard) {
        const subSpans = priceCard.querySelectorAll("span");
        if (subSpans && subSpans.length) {
            subSpans.forEach(s => {
                if (s.id !== "checkoutPriceText" && s.id !== "checkoutQtyCount") {
                    s.innerText = "You Pay";
                }
            });
        }
    }

    const allSummaryElements = document.querySelectorAll(".order-summary-box, #orderSummaryBox, [class*='summary']");
    allSummaryElements.forEach(el => {
        el.style.display = "none";
    });

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
    
    const linkInput = document.getElementById("checkoutLinkInput");
    if (linkInput) linkInput.value = "";
    const txnInput = document.getElementById("checkoutTxnId");
    if (txnInput) txnInput.value = "";
    
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

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function processProfileOrLink(input, platform, serviceName) {
    const trimmed = (input || "").trim();
    if (!trimmed) {
        return { isValid: false, message: "Please enter target Profile Link or Username!" };
    }

    const pName = (platform || "").toLowerCase();
    const sName = (serviceName || "").toLowerCase();

    if (pName.includes("instagram")) {
        const cleanUsername = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
        
        if (sName.includes("follower") || sName.includes("blue") || sName.includes("verify") || sName.includes("profile")) {
            if (/^[a-zA-Z0-9._]{1,30}$/.test(cleanUsername)) {
                return {
                    isValid: true,
                    url: `https://www.instagram.com/${cleanUsername}`
                };
            }
            if (trimmed.toLowerCase().includes("instagram.com")) {
                return {
                    isValid: true,
                    url: trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
                };
            }
            return {
                isValid: true,
                url: trimmed
            };
        }

        if (trimmed.toLowerCase().includes("instagram.com") || isValidUrl(trimmed)) {
            return {
                isValid: true,
                url: trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
            };
        }

        return {
            isValid: true,
            url: trimmed
        };
    } else if (pName.includes("tiktok")) {
        const cleanUsername = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
        if (/^[a-zA-Z0-9._]{2,24}$/.test(cleanUsername)) {
            return {
                isValid: true,
                url: `https://www.tiktok.com/@${cleanUsername}`
            };
        }
        return {
            isValid: true,
            url: trimmed
        };
    }

    return {
        isValid: true,
        url: trimmed
    };
}

function submitOrderToWhatsApp() {
    const linkInput = document.getElementById("checkoutLinkInput");
    const txnInput = document.getElementById("checkoutTxnId");

    const rawLink = linkInput ? linkInput.value.trim() : "";
    const txnId = txnInput ? txnInput.value.trim() : "";

    const validation = processProfileOrLink(rawLink, currentCheckoutData.platform, currentCheckoutData.serviceName);
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    const link = validation.url;

    if (!txnId) {
        alert("Please enter Transaction ID / UTR number!");
        return;
    }

    const userIdentifier = (typeof window.firebaseUserUid !== 'undefined' && window.firebaseUserUid) 
        ? window.firebaseUserUid 
        : (() => {
            let bid = localStorage.getItem('raj_smm_browser_id');
            if (!bid) {
                bid = 'BID_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                localStorage.setItem('raj_smm_browser_id', bid);
            }
            return bid;
        })();

    const orderIdVal = Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
        orderId: orderIdVal,
        serviceName: `${currentCheckoutData.platform} - ${currentCheckoutData.serviceName} (${currentCheckoutData.packageName})`,
        link: link,
        quantity: currentCheckoutData.quantity || 0,
        amount: currentCheckoutData.price ? currentCheckoutData.price.toFixed(2) : "0.00",
        orderTimeEpoch: Date.now(),
        status: 'Pending',
        userIdentifier: userIdentifier
    };

    const existingOrders = JSON.parse(localStorage.getItem('raj_smm_orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('raj_smm_orders', JSON.stringify(existingOrders));

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
        `🔗 *Target Link:* ${link}\n` +
        `💳 *Payment Method:* ${payMethod}\n` +
        `🧾 *Transaction ID / UTR:* ${txnId}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`;

    window.open(waUrl, "_blank");
}

let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    toggleInstallButton();
});

function toggleInstallButton() {
    const installContainer = document.getElementById("installContainer");
    if (!installContainer) return;

    if (
        currentPlatform === "instagram" &&
        currentCategory === "Followers" &&
        deferredPrompt
    ) {
        installContainer.style.display = "block";
    } else {
        installContainer.style.display = "none";
    }
}

const installBtn = document.getElementById("installBtn");
if (installBtn) {
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            toggleInstallButton();
        }
    });
}

window.addEventListener("appinstalled", () => {
    const installContainer = document.getElementById("installContainer");
    if (installContainer) {
        installContainer.style.display = "none";
    }
    deferredPrompt = null;
});

async function submitOrderWithWallet() {
    const linkInput = document.getElementById("checkoutLinkInput");
    const walletBtn = document.getElementById("submitWalletBtn");
    const rawLink = linkInput ? linkInput.value.trim() : "";
    const orderAmount = currentCheckoutData.price;

    const validation = processProfileOrLink(rawLink, currentCheckoutData.platform, currentCheckoutData.serviceName);
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    const link = validation.url;

    if (typeof firebase === 'undefined' || !firebase.auth) {
        alert("Authentication system unavailable.");
        return;
    }

    const auth = firebase.auth();
    const user = auth.currentUser;
    if (!user) {
        alert("Please login to use Wallet System.");
        return;
    }

    if (walletBtn) walletBtn.disabled = true;

    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);

    try {
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) throw new Error("User account not found!");

            const userData = userDoc.data();
            const balance = userData.walletBalance || 0;

            if (balance < orderAmount) {
                throw new Error("Insufficient Wallet Balance. Please Add Funds first.");
            }

            transaction.update(userRef, {
                walletBalance: balance - orderAmount,
                totalSpent: (userData.totalSpent || 0) + orderAmount
            });

            const txRef = db.collection('walletTransactions').doc();
            transaction.set(txRef, {
                uid: user.uid,
                type: 'DEBIT',
                amount: orderAmount,
                description: `Order: ${currentCheckoutData.packageName}`,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        alert("Order placed successfully using Wallet Balance!");
        closeCheckoutUI();

    } catch (error) {
        alert("Error: " + (error.message || error));
    } finally {
        if (walletBtn) walletBtn.disabled = false;
    }
}
