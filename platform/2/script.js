// =========================================================
// PERMANENT LAYOUT LOCK & CHECKOUT SCROLL OPTIMIZATION
// =========================================================
(function injectPermanentCss() {
    if (document.getElementById("fixedLayoutCss")) return;
    const style = document.createElement("style");
    style.id = "fixedLayoutCss";
    style.innerHTML = `
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
// SERVICE DATA STRUCTURE
// ==========================================
const serviceData = {
    instagram: {
        "Instagram Followers — Working Service": [
            { 
                id: "1220", 
                name: "1220 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄 - ₹65.358", 
                pricePer1000: 65.358,
                avgTime: "0–10 Minutes"
            },
            { 
                id: "1221", 
                name: "1221 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄 - ₹67.929", 
                pricePer1000: 67.929,
                avgTime: "0–10 Minutes"
            },
            { 
                id: "1222", 
                name: "1222 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄 - ₹70.501", 
                pricePer1000: 70.501,
                avgTime: "0–10 Minutes"
            },
            { 
                id: "1223", 
                name: "1223 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️ - ₹73.072", 
                pricePer1000: 73.072,
                avgTime: "0–10 Minutes"
            }
        ],
        "Instagram followers Non-Drop": [
            { 
                id: "1072", 
                name: "1072 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - No Refill 🔄 - ₹67.929", 
                pricePer1000: 67.929,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1073", 
                name: "1073 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 30D Refill 🔄 - ₹73.072", 
                pricePer1000: 73.072,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1074", 
                name: "1074 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 60D Refill 🔄 - ₹75.644", 
                pricePer1000: 75.644,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1075", 
                name: "1075 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 90D Refill 🔄 - ₹78.215", 
                pricePer1000: 78.215,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1076", 
                name: "1076 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 365D Refill 🔄 - ₹79.858", 
                pricePer1000: 79.858,
                avgTime: "0–2 Minutes"
            },
            { 
                id: "1077", 
                name: "1077 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - Lifetime Refill ♻️ - ₹83.358", 
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
    initDropdownEvents();
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

function initDropdownEvents() {
    const categorySelect = document.querySelector('select:has(option), select[id*="cat"], select[name*="cat"], select:first-of-type');
    const serviceSelect = document.querySelectorAll('select')[1];
    const qtyInput = document.querySelector('input[type="number"]');
    const proceedBtn = document.querySelector('button:contains("Proceed"), .action-btn, button[type="submit"], button');

    // Dynamic Elements Lookup Fallback
    const selects = document.querySelectorAll('select');
    if (selects.length >= 2) {
        selects[0].addEventListener('change', function () {
            currentCategory = this.value;
            populateServiceDropdown();
        });

        selects[1].addEventListener('change', function () {
            const index = parseInt(this.value);
            const services = serviceData[currentPlatform]?.[currentCategory] || [];
            selectedService = services[index];
            updateAvgTimeAndPrice();
        });
    }

    const inputQty = document.querySelector('input[type="number"]') || document.getElementById('customQtyInput');
    if (inputQty) {
        inputQty.addEventListener('input', calculatePrice);
    }

    const btnPay = document.querySelector('button[onclick*="Checkout"], .submit-btn, button:last-of-type');
    if (btnPay) {
        btnPay.onclick = openCheckoutUI;
    }
}

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

    populateCategoryDropdown();
}

function populateCategoryDropdown() {
    const selects = document.querySelectorAll('select');
    if (!selects || selects.length === 0) return;

    const categorySelect = selects[0];
    categorySelect.innerHTML = "";

    const categories = Object.keys(serviceData[currentPlatform] || {});

    if (categories.length === 0) {
        categorySelect.innerHTML = "<option value=''>No Categories Available</option>";
        populateServiceDropdown();
        return;
    }

    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.innerText = cat;
        categorySelect.appendChild(opt);
    });

    currentCategory = categories[0];
    categorySelect.value = currentCategory;
    populateServiceDropdown();
}

function populateServiceDropdown() {
    const selects = document.querySelectorAll('select');
    if (!selects || selects.length < 2) return;

    const serviceSelect = selects[1];
    serviceSelect.innerHTML = "";

    const services = serviceData[currentPlatform]?.[currentCategory] || [];

    if (services.length === 0) {
        serviceSelect.innerHTML = "<option value=''>No Services Available</option>";
        selectedService = null;
        updateAvgTimeAndPrice();
        return;
    }

    services.forEach((s, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.innerText = s.name;
        serviceSelect.appendChild(opt);
    });

    selectedService = services[0];
    serviceSelect.value = 0;
    updateAvgTimeAndPrice();
}

function updateAvgTimeAndPrice() {
    // Update Average Time UI
    const allTexts = document.querySelectorAll('div, span, p');
    allTexts.forEach(el => {
        if (el.children.length === 0 && el.innerText.includes('Average Time:')) {
            el.innerText = `⚡ Average Time: ${selectedService ? selectedService.avgTime : 'N/A'}`;
        }
    });

    calculatePrice();
}

function calculatePrice() {
    const qtyInput = document.querySelector('input[type="number"]') || document.getElementById("customQtyInput");
    const qty = parseInt(qtyInput ? qtyInput.value : 0) || 0;

    const priceTextEls = document.querySelectorAll('span, div, p, strong');
    let totalPrice = 0;

    if (selectedService && qty > 0) {
        totalPrice = (qty / 1000) * selectedService.pricePer1000;
    }

    priceTextEls.forEach(el => {
        if (el.innerText.includes('Total:') || el.innerText.includes('INR')) {
            el.innerText = `Total: ₹${totalPrice.toFixed(3)} INR`;
            el.style.color = "#22c55e";
            el.style.fontWeight = "bold";
        }
    });
}

function openCheckoutUI() {
    const qtyInput = document.querySelector('input[type="number"]');
    const qty = parseFloat(qtyInput ? qtyInput.value : 0);

    if (!qty || qty < 1) {
        alert("Please enter a valid quantity!");
        return;
    }

    if (!selectedService) {
        alert("Please select a valid service!");
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
    const linkInput = document.getElementById("checkoutLinkInput") || document.querySelector('input[type="text"]');

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

function submitOrderToWhatsApp() {
    const linkInput = document.getElementById("checkoutLinkInput") || document.querySelector('input[type="text"]');
    const txnInput = document.getElementById("checkoutTxnId");

    const rawLink = linkInput ? linkInput.value.trim() : "";
    const txnId = txnInput ? txnInput.value.trim() : "";

    if (!rawLink) {
        alert("Please enter target Profile Link or Username!");
        return;
    }

    if (!txnId) {
        alert("Please enter Transaction ID / UTR number!");
        return;
    }

    const orderIdVal = Math.floor(100000 + Math.random() * 900000);
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
        `🔗 *Target Link:* ${rawLink}\n` +
        `🧾 *Transaction ID / UTR:* ${txnId}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`;

    window.open(waUrl, "_blank");
}
