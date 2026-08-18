// =========================================================
// PERMANENT LAYOUT LOCK & COLOR FIX
// =========================================================
(function injectPermanentCss() {
    if (document.getElementById("fixedLayoutCss")) return;
    const style = document.createElement("style");
    style.id = "fixedLayoutCss";
    style.innerHTML = `
        /* Main Styling & Color Fixes */
        body {
            background-color: #f8fafc !important;
            color: #0f172a !important;
            font-family: system-ui, -apple-system, sans-serif !important;
        }

        /* Fixed Input & Select Boxes Contrast */
        select, input[type="text"], input[type="number"] {
            width: 100% !important;
            padding: 10px 12px !important;
            border-radius: 8px !important;
            border: 1px solid #cbd5e1 !important;
            background-color: #ffffff !important;
            color: #0f172a !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            box-sizing: border-box !important;
            outline: none !important;
        }

        label {
            font-size: 13px !important;
            font-weight: 700 !important;
            color: #334155 !important;
            margin-bottom: 6px !important;
            display: block !important;
        }

        /* Hero Banner & Service Box Styling */
        .service-card {
            background: #ffffff !important;
            border: 1px solid rgba(168, 85, 247, 0.2) !important;
            border-radius: 12px !important;
            padding: 16px !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05) !important;
            margin-top: 15px !important;
        }

        .service-desc-box {
            background: #f1f5f9 !important;
            border: 1px dashed #a855f7 !important;
            border-radius: 10px !important;
            padding: 12px !important;
            margin-top: 12px !important;
            color: #1e293b !important;
            font-size: 13px !important;
            line-height: 1.5 !important;
        }

        .service-desc-box span {
            color: #9333ea !important;
            font-weight: bold !important;
        }

        /* Action Buttons */
        .action-btn {
            background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%) !important;
            color: #ffffff !important;
            font-weight: bold !important;
            padding: 12px !important;
            border-radius: 8px !important;
            border: none !important;
            width: 100% !important;
            font-size: 15px !important;
            cursor: pointer !important;
            margin-top: 15px !important;
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3) !important;
        }

        .action-btn:hover {
            opacity: 0.95 !important;
        }

        /* Checkout Overlay Style */
        #checkoutPage {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(15, 23, 42, 0.8) !important;
            backdrop-filter: blur(4px) !important;
            z-index: 99999 !important;
            overflow-y: auto !important;
            padding: 20px 10px !important;
            box-sizing: border-box !important;
        }

        .checkout-modal {
            background: #ffffff !important;
            max-width: 450px !important;
            margin: 20px auto !important;
            border-radius: 16px !important;
            padding: 20px !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
})();

// ==========================================
// SERVICE DATA (INSTAGRAM & FACEBOOK ONLY)
// ==========================================
const serviceData = {
    instagram: {
        "Followers Non-Drop": [
            { name: "Instagram Non-Drop Followers ♻️ Lifetime Refill", pricePer1000: 80, desc: "High quality non-drop Instagram followers. Start time: 10 mins." }
        ],
        "Likes Non-Drop": [
            { name: "Instagram Real Likes ⚡ Instant Start", pricePer1000: 30, desc: "High quality Instagram likes. Fast delivery." }
        ],
        "Reels / Video Views": [
            { name: "Instagram Reels Views 🚀 Fast Speed", pricePer1000: 15, desc: "Real views from active profiles. Life-time guaranteed." }
        ]
    },
    facebook: {
        "Page / Profile Followers": [
            { name: "Facebook Page/Profile Followers ♻️ Lifetime Refill", pricePer1000: 49, desc: "High quality FB followers. Daily speed 100K+." }
        ],
        "Post Likes": [
            { name: "Facebook Post Likes 👍 Non-Drop", pricePer1000: 70, desc: "Real Indian & Global active post likes." }
        ]
    }
};

let currentPlatform = "instagram";
let currentCategory = "";
let selectedService = null;

window.onload = function () {
    switchPlatform("instagram");
};

function switchPlatform(platform) {
    currentPlatform = platform;
    
    // Toggle active state for tab buttons
    const btnInsta = document.getElementById("btnInsta");
    const btnFb = document.getElementById("btnFb");
    const btnYt = document.getElementById("btnYt");
    const btnTt = document.getElementById("btnTt");

    if (btnInsta) btnInsta.classList.toggle("active", platform === "instagram");
    if (btnFb) btnFb.classList.toggle("active", platform === "facebook");
    
    // Hide YouTube & TikTok buttons if present in DOM
    if (btnYt) btnYt.style.display = "none";
    if (btnTt) btnTt.style.display = "none";

    renderCategories();
}

function renderCategories() {
    const categorySelect = document.getElementById("categorySelect") || createSelectElements().categorySelect;
    categorySelect.innerHTML = "";

    const categories = Object.keys(serviceData[currentPlatform] || {});
    categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.innerText = cat;
        categorySelect.appendChild(opt);
    });

    currentCategory = categories[0] || "";
    categorySelect.onchange = function() {
        currentCategory = this.value;
        renderServices();
    };

    renderServices();
}

function renderServices() {
    const serviceSelect = document.getElementById("serviceSelect") || createSelectElements().serviceSelect;
    serviceSelect.innerHTML = "";

    const services = serviceData[currentPlatform]?.[currentCategory] || [];
    services.forEach((srv, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.innerText = srv.name;
        serviceSelect.appendChild(opt);
    });

    selectedService = services[0] || null;
    serviceSelect.onchange = function() {
        selectedService = services[this.value];
        updateServiceDetails();
    };

    updateServiceDetails();
}

function updateServiceDetails() {
    const descBox = document.getElementById("serviceDescBox");
    if (!descBox || !selectedService) return;

    descBox.innerHTML = `
        <div style="font-size: 14px; font-weight: bold; color: #a855f7; margin-bottom: 6px;">
            ${selectedService.name}
        </div>
        <div>Price: <span>₹${selectedService.pricePer1000}</span> per 1,000</div>
        <div style="margin-top: 4px; color: #64748b; font-size: 12px;">${selectedService.desc}</div>
    `;

    calculatePrice();
}

function calculatePrice() {
    const qtyInput = document.getElementById("customQtyInput");
    const minWarn = document.getElementById("customMinWarning");
    const calcPriceText = document.getElementById("calculatedPrice");

    const qty = parseInt(qtyInput ? qtyInput.value : 0) || 0;

    if (qty > 0 && qty < 100) {
        if (minWarn) minWarn.style.display = "block";
        if (calcPriceText) calcPriceText.innerText = "0.00";
    } else if (qty >= 100 && selectedService) {
        if (minWarn) minWarn.style.display = "none";
        const totalPrice = (qty / 1000) * selectedService.pricePer1000;
        if (calcPriceText) calcPriceText.innerText = totalPrice.toFixed(2);
    } else {
        if (minWarn) minWarn.style.display = "none";
        if (calcPriceText) calcPriceText.innerText = "0.00";
    }
}

// Helper to handle missing HTML elements dynamically
function createSelectElements() {
    return {
        categorySelect: document.getElementById("categorySelect"),
        serviceSelect: document.getElementById("serviceSelect")
    };
}

// ==========================================
// CHECKOUT & WHATSAPP INTEGRATION
// ==========================================
function openCheckout() {
    const qtyInput = document.getElementById("customQtyInput");
    const targetLinkInput = document.getElementById("targetLinkInput");
    const qty = parseInt(qtyInput ? qtyInput.value : 0);
    const link = targetLinkInput ? targetLinkInput.value.trim() : "";

    if (!qty || qty < 100) {
        alert("⚠️ Minimum Quantity 100 required!");
        return;
    }

    if (!link) {
        alert("⚠️ Please enter valid Target Link / Username!");
        return;
    }

    const totalPrice = ((qty / 1000) * selectedService.pricePer1000).toFixed(2);

    const upiId = "rajpanel@axl";
    const upiUrl = `upi://pay?pa=${upiId}&pn=RajSocialPanel&am=${totalPrice}&cu=INR&tn=${encodeURIComponent(selectedService.name)}`;
    const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=8&data=${encodeURIComponent(upiUrl)}`;

    let checkoutPage = document.getElementById("checkoutPage");
    if (!checkoutPage) {
        checkoutPage = document.createElement("div");
        checkoutPage.id = "checkoutPage";
        document.body.appendChild(checkoutPage);
    }

    checkoutPage.innerHTML = `
        <div class="checkout-modal">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 12px;">
                <h3 style="margin: 0; font-size: 16px; color: #0f172a;">Checkout Payment</h3>
                <span onclick="closeCheckout()" style="font-size: 20px; font-weight: bold; cursor: pointer; color: #64748b;">&times;</span>
            </div>

            <div style="text-align: center; margin-bottom: 12px;">
                <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #9333ea; text-transform: uppercase;">SCAN QR CODE TO PAY</h4>
                <img src="${qrImageSrc}" alt="UPI QR Code" style="width: 140px; height: 140px; border-radius: 8px; border: 1px solid #cbd5e1; padding: 4px;">
                <div style="font-size: 15px; font-weight: 800; color: #16a34a; margin-top: 6px;">Total Amount: ₹${totalPrice} INR</div>
            </div>

            <div style="margin-bottom: 12px;">
                <label>Transaction ID / UTR Number *</label>
                <input type="text" id="checkoutTxnId" placeholder="Enter 12-digit UTR/Txn ID">
            </div>

            <button class="action-btn" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;" onclick="confirmOrderWhatsApp('${selectedService.name}', '${qty}', '${totalPrice}', '${link}')">
                Confirm Your Order
            </button>
        </div>
    `;

    checkoutPage.style.display = "block";
}

function closeCheckout() {
    const checkoutPage = document.getElementById("checkoutPage");
    if (checkoutPage) checkoutPage.style.display = "none";
}

function confirmOrderWhatsApp(serviceName, qty, price, link) {
    const txnInput = document.getElementById("checkoutTxnId");
    const txnId = txnInput ? txnInput.value.trim() : "";

    if (!txnId) {
        alert("⚠️ Please enter Transaction ID / UTR Number after payment!");
        return;
    }

    const orderIdVal = Math.floor(100000 + Math.random() * 900000);
    const whatsappNumber = "919239628344";

    const formattedMessage = 
        `🚀 *NEW ORDER SUBMITTED* 🚀\n\n` +
        `🆔 *Order ID:* #${orderIdVal}\n` +
        `📌 *Platform:* ${currentPlatform.toUpperCase()}\n` +
        `🛠️ *Service:* ${serviceName}\n` +
        `🔢 *Quantity:* ${parseInt(qty).toLocaleString()}\n` +
        `💰 *Total Paid:* ₹${price}\n` +
        `🔗 *Target Link:* ${link}\n` +
        `🧾 *UTR / Txn ID:* ${txnId}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`;

    window.open(waUrl, "_blank");
    closeCheckout();
}
