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

        /* Target Link & UTR Field Labels Color & Contrast */
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
// SERVICE DATA STRUCTURE
// ==========================================
const serviceData = {
    instagram: {
        "Instagram Followers — Working Service": [
            { 
                id: "1220", 
                name: "1220 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄", 
                pricePer1000: 65.358,
                avgTime: "0–10 Minutes"
            },
            { 
                id: "1221", 
                name: "1221 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄", 
                pricePer1000: 67.929,
                avgTime: "0–10 Minutes"
            },
            { 
                id: "1222", 
                name: "1222 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄", 
                pricePer1000: 70.501,
                avgTime: "0–10 Minutes"
            },
            { 
                id: "1223", 
                name: "1223 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️", 
                pricePer1000: 73.072,
                avgTime: "0–10 Minutes"
            }
        ],
        "Instagram followers Non-Drop": [
            { 
                id: "1072", 
                name: "1072 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - No Refill 🔄", 
                pricePer1000: 67.929,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1073", 
                name: "1073 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 30D Refill 🔄", 
                pricePer1000: 73.072,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1074", 
                name: "1074 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 60D Refill 🔄", 
                pricePer1000: 75.644,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1075", 
                name: "1075 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 90D Refill 🔄", 
                pricePer1000: 78.215,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1076", 
                name: "1076 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 365D Refill 🔄", 
                pricePer1000: 79.858,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1077", 
                name: "1077 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - Lifetime Refill ♻️", 
                pricePer1000: 83.358,
                avgTime: "0–2 Minutes"
            }
        ]
    },
    facebook: {},
    youtube: {},
    tiktok: {}
};

// Global State
let currentPlatform = "instagram";
let currentCategory = "";
let selectedService = null;
let currentCheckoutData = {};

document.addEventListener("DOMContentLoaded", function () {
    switchPlatform("instagram");

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

window.addEventListener('popstate', function () {
    const checkoutPage = document.getElementById("checkoutPage");
    if (checkoutPage && (checkoutPage.style.display === "block" || !checkoutPage.classList.contains("hidden"))) {
        closeCheckoutUI();
    }
});

function switchPlatform(platform) {
    currentPlatform = platform;

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
    if (categories.length === 0) {
        const packageList = document.getElementById("packageList");
        if (packageList) packageList.innerHTML = "<p style='color:#94a3b8; font-size:12px;'>No services available in this section.</p>";
        return;
    }

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
    const services = serviceData[currentPlatform]?.[currentCategory] || [];

    if (services.length === 0) return;

    selectedService = services[0];

    // Card Container
    const cardDiv = document.createElement("div");
    cardDiv.className = "custom-card";
    cardDiv.style.cssText = "background: rgba(255,255,255,0.05); padding: 12px; border-radius: 10px; margin-top: 10px;";

    // Service Selector Box
    let selectOptionsHtml = services.map((s, i) => `<option value="${i}">${s.name}</option>`).join('');

    cardDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
            <label style="font-size: 11px; color: #94a3b8; display: block; margin-bottom: 4px; font-weight: bold;">Select Service:</label>
            <select id="serviceDropdownSelect" onchange="onServiceSelectChange(this.value)" style="width: 100%; padding: 8px; border-radius: 6px; background: #0f172a; color: #fff; border: 1px solid #334155; font-size: 11px; text-overflow: ellipsis; outline: none;">
                ${selectOptionsHtml}
            </select>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: 6px; margin-bottom: 10px;">
            <span style="font-size: 11px; color: #cbd5e1;">⚡ Average Time:</span>
            <span id="displayAvgTime" style="font-size: 11px; font-weight: bold; color: #a855f7;">${selectedService.avgTime}</span>
        </div>

        <div style="margin-bottom: 10px;">
            <label style="font-size: 11px; color: #94a3b8; display: block; margin-bottom: 4px; font-weight: bold;">Quantity:</label>
            <div class="input-box">
                <input
                    type="number"
                    id="customQtyInput"
                    placeholder="Enter quantity (e.g. 1000)"
                    min="1"
                    style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 12px; box-sizing: border-box;"
                    oninput="calculateCustomPrice()"
                >
            </div>
            <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">
                Rate: ₹<span id="displayServiceRate">${selectedService.pricePer1000}</span> per 1000 Qty
            </div>
        </div>

        <div style="font-size: 11px; color: #ef4444; margin-top: 4px; display: none;" id="customMinWarning">
            ⚠️ Minimum Quantity is 1!
        </div>

        <div style="font-size: 13px; font-weight: 800; color: #22c55e; margin-top: 8px;">
            Total Price: ₹<span id="customCalcPrice">0.00</span> INR
        </div>

        <button class="action-btn" style="margin-top: 12px; width: 100%; padding: 10px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 13px;" onclick="openCheckoutFromSelectedInput()">
            Proceed to Payment
        </button>
    `;

    packageList.appendChild(cardDiv);
}

function onServiceSelectChange(index) {
    const services = serviceData[currentPlatform]?.[currentCategory] || [];
    selectedService = services[index];

    if (!selectedService) return;

    const rateSpan = document.getElementById("displayServiceRate");
    const avgTimeSpan = document.getElementById("displayAvgTime");

    if (rateSpan) rateSpan.innerText = selectedService.pricePer1000;
    if (avgTimeSpan) avgTimeSpan.innerText = selectedService.avgTime;

    calculateCustomPrice();
}

function calculateCustomPrice() {
    if (!selectedService) return;

    const qtyInput = document.getElementById("customQtyInput");
    const qty = parseInt(qtyInput ? qtyInput.value : 0) || 0;
    const calcPriceSpan = document.getElementById("customCalcPrice");
    const minWarning = document.getElementById("customMinWarning");

    if (qty < 1 && qtyInput && qtyInput.value !== "") {
        if (minWarning) minWarning.style.display = "block";
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
    } else if (qty >= 1) {
        if (minWarning) minWarning.style.display = "none";
        const total = (qty / 1000) * selectedService.pricePer1000;
        if (calcPriceSpan) calcPriceSpan.innerText = total.toFixed(2);
    } else {
        if (minWarning) minWarning.style.display = "none";
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
    }
}

function openCheckoutFromSelectedInput() {
    const qtyInput = document.getElementById("customQtyInput");
    const qty = parseFloat(qtyInput ? qtyInput.value : 0);

    if (!qty || qty < 1) {
        alert("Please enter a valid order quantity!");
        return;
    }

    if (!selectedService) {
        alert("Please select a service first!");
        return;
    }

    const price = (qty / 1000) * selectedService.pricePer1000;
    const platformCap = currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1);

    currentCheckoutData = {
        platform: platformCap,
        serviceName: currentCategory,
        packageName: selectedService.name,
        baseQuantity: qty,
        quantity: qty,
        basePrice: price,
        price: price,
        multiplier: 1,
        badge: "Working"
    };

    showCheckoutOverlay();
}

function getLinkConfig(platform, category) {
    const p = (platform || "").toLowerCase();
    const c = (category || "").toLowerCase();

    if (p.includes("youtube") || c.includes("youtube") || c.includes("yt")) {
        if (c.includes("subscribe")) {
            return { label: "YouTube Channel Link or Handle", placeholder: "Enter YouTube channel link or @handle" };
        }
        return { label: "YouTube Video / Shorts Link", placeholder: "Enter YouTube video/Shorts link" };
    }

    if (p.includes("tiktok") || c.includes("tiktok")) {
        return { label: "TikTok Video Link or Username", placeholder: "Enter TikTok video link or username" };
    }

    if (p.includes("instagram") || c.includes("instagram") || c.includes("ig")) {
        if (c.includes("like")) {
            return { label: "Post / Reel Link", placeholder: "Enter Instagram post/reel link" };
        }
        if (c.includes("reel") || c.includes("view") || c.includes("video")) {
            return { label: "Instagram Reel / Video Link", placeholder: "Enter Instagram reel/video link" };
        }
        return { label: "Instagram Profile Link", placeholder: "Enter Instagram username or profile link" };
    }

    if (p.includes("facebook") || c.includes("facebook") || c.includes("fb")) {
        return { label: "Facebook Profile / Page Link", placeholder: "Enter Facebook profile or page link" };
    }

    return { label: "Target Link or Username", placeholder: "Enter link or username" };
}

function updateCheckoutQuantityDisplay() {
    const d = currentCheckoutData;
    if (!d || !d.baseQuantity) return;

    d.quantity = d.baseQuantity * (d.multiplier || 1);
    d.price = (d.basePrice || 0) * (d.multiplier || 1);

    const qtyCountDisplay = document.getElementById("checkoutQtyCount");
    if (qtyCountDisplay) qtyCountDisplay.innerText = d.multiplier || 1;

    const unitsText = document.getElementById("checkoutUnitsText");
    if (unitsText) unitsText.innerText = `${d.quantity.toLocaleString()} Quantity`;

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
        if (btnBinance) btnBinance.classList.remove("active");
        if (btnUpi) btnUpi.classList.remove("active");
        if (viewBinance) viewBinance.classList.remove("hidden");
        if (viewUpi) viewUpi.classList.add("hidden");
    }
}

function processProfileOrLink(input, platform, serviceName) {
    const trimmed = (input || "").trim();
    if (!trimmed) {
        return { isValid: false, message: "Please enter target Profile Link or Username!" };
    }
    return { isValid: true, url: trimmed };
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
    const isUpi = document.getElementById("btnTabUpi") ? document.getElementById("btnTabUpi").classList.contains("active") : true;
    const payMethod = isUpi ? "UPI QR Code" : "Binance Pay";
    const whatsappNumber = "919239628344";

    const d = currentCheckoutData;

    const formattedMessage = 
        `🚀 *NEW ORDER SUBMITTED PLATFORM 2* 🚀\n\n` +
        `🆔 *Order ID:* #${orderIdVal}\n` +
        `📌 *Social Media:* ${d.platform || ''}\n` +
        `🛠️ *Category Name:* ${d.serviceName || ''}\n` +
        `📦 *Selected Service:* ${d.packageName || ''}\n` +
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

    if (currentPlatform === "instagram" && deferredPrompt) {
        installContainer.style.display = "block";
    } else {
        installContainer.style.display = "none";
    }
}
