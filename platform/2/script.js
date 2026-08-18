// =========================================================
// AUTO-INJECT CSS FOR CLEAN POPUP DISPLAY & COLOR CONTRAST
// =========================================================
(function injectCheckoutStyles() {
    if (document.getElementById("checkoutCustomStyles")) return;
    const style = document.createElement("style");
    style.id = "checkoutCustomStyles";
    style.innerHTML = `
        /* Overlay Modal Container */
        .raj-modal-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: rgba(15, 23, 42, 0.85) !important;
            backdrop-filter: blur(5px) !important;
            z-index: 999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 15px !important;
            box-sizing: border-box !important;
        }

        /* Modal Box */
        .raj-modal-card {
            background: #ffffff !important;
            width: 100% !important;
            max-width: 400px !important;
            border-radius: 16px !important;
            padding: 20px !important;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3) !important;
            color: #0f172a !important;
            font-family: system-ui, -apple-system, sans-serif !important;
            box-sizing: border-box !important;
        }

        /* Input Controls Fix */
        .raj-input {
            width: 100% !important;
            padding: 12px !important;
            border: 2px solid #cbd5e1 !important;
            border-radius: 8px !important;
            background-color: #ffffff !important;
            color: #0f172a !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            margin-top: 6px !important;
            margin-bottom: 12px !important;
            outline: none !important;
            box-sizing: border-box !important;
        }

        .raj-input:focus {
            border-color: #a855f7 !important;
        }

        /* QR Code Container */
        .raj-qr-box {
            background: #f8fafc !important;
            border: 2px dashed #a855f7 !important;
            border-radius: 12px !important;
            padding: 12px !important;
            text-align: center !important;
            margin-bottom: 15px !important;
        }

        /* Dynamic WhatsApp Button */
        .raj-btn-wa {
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
            color: #ffffff !important;
            font-size: 16px !important;
            font-weight: bold !important;
            width: 100% !important;
            padding: 14px !important;
            border: none !important;
            border-radius: 10px !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3) !important;
        }
    `;
    document.head.appendChild(style);
})();

// ==========================================
// DATA ARCHITECTURE (INSTAGRAM & FACEBOOK ONLY)
// ==========================================
const serviceData = {
    instagram: {
        "Followers Non-Drop": [
            { name: "Instagram Non-Drop Followers ♻️ Lifetime Refill", pricePer1000: 80 }
        ],
        "Likes Non-Drop": [
            { name: "Instagram Real Likes ⚡ Instant Start", pricePer1000: 30 }
        ],
        "Reels / Video Views": [
            { name: "Instagram Reels Views 🚀 Fast Speed", pricePer1000: 15 }
        ]
    },
    facebook: {
        "Page / Profile Followers": [
            { name: "Facebook Page/Profile Followers ♻️ Lifetime Refill", pricePer1000: 49 }
        ],
        "Post Likes": [
            { name: "Facebook Post Likes 👍 Non-Drop", pricePer1000: 70 }
        ]
    }
};

let currentPlatform = "instagram";
let currentCategory = "";
let selectedService = null;

// ==========================================
// INIT & EVENT HANDLERS
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
    // Hide YouTube & TikTok Buttons if present
    const btnYt = document.getElementById("btnYt");
    const btnTt = document.getElementById("btnTt");
    if (btnYt) btnYt.style.display = "none";
    if (btnTt) btnTt.style.display = "none";

    // Setup Custom Quantity Input Listener
    const qtyInput = document.getElementById("customQtyInput") || document.querySelector("input[type='number']");
    if (qtyInput) {
        qtyInput.addEventListener("input", calculatePrice);
    }

    switchPlatform("instagram");
});

function switchPlatform(platform) {
    currentPlatform = platform;
    const categories = Object.keys(serviceData[platform] || {});
    currentCategory = categories[0] || "";

    renderCategoryOptions(categories);
}

function renderCategoryOptions(categories) {
    const catSelect = document.getElementById("categorySelect") || document.querySelectorAll("select")[0];
    if (!catSelect) return;

    catSelect.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join("");
    catSelect.onchange = (e) => {
        currentCategory = e.target.value;
        renderServiceOptions();
    };

    renderServiceOptions();
}

function renderServiceOptions() {
    const srvSelect = document.getElementById("serviceSelect") || document.querySelectorAll("select")[1];
    if (!srvSelect) return;

    const services = serviceData[currentPlatform][currentCategory] || [];
    srvSelect.innerHTML = services.map((s, idx) => `<option value="${idx}">${s.name}</option>`).join("");
    
    selectedService = services[0] || null;
    srvSelect.onchange = (e) => {
        selectedService = services[e.target.value];
        calculatePrice();
    };

    calculatePrice();
}

function calculatePrice() {
    const qtyInput = document.getElementById("customQtyInput") || document.querySelector("input[type='number']");
    const priceDisplay = document.getElementById("calculatedPrice") || document.querySelector(".price-text");
    
    if (!qtyInput || !selectedService) return;

    const qty = parseInt(qtyInput.value) || 0;
    
    if (qty >= 100) {
        const total = ((qty / 1000) * selectedService.pricePer1000).toFixed(2);
        if (priceDisplay) priceDisplay.innerText = "₹" + total;
    } else {
        if (priceDisplay) priceDisplay.innerText = "₹0.00";
    }
}

// ==========================================
// DYNAMIC POPUP CHECKOUT & WHATSAPP DISPATCH
// ==========================================
function openCheckout() {
    const qtyInput = document.getElementById("customQtyInput") || document.querySelector("input[type='number']");
    const linkInput = document.getElementById("targetLinkInput") || document.querySelector("input[type='text']");

    const qty = parseInt(qtyInput ? qtyInput.value : 0);
    const link = linkInput ? linkInput.value.trim() : "";

    if (!qty || qty < 100) {
        alert("⚠️ Minimum Quantity 100 required!");
        return;
    }

    if (!link) {
        alert("⚠️ Please enter a valid Target Link or Username!");
        return;
    }

    const totalAmount = ((qty / 1000) * selectedService.pricePer1000).toFixed(2);
    
    // Stable UPI QR Generation API
    const upiId = "rajpanel@axl";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}%26pn=RajPanel%26am=${totalAmount}%26cu=INR`;

    let modal = document.getElementById("rajCheckoutModal");
    if (modal) modal.remove();

    modal = document.createElement("div");
    modal.id = "rajCheckoutModal";
    modal.className = "raj-modal-overlay";
    modal.innerHTML = `
        <div class="raj-modal-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                <h3 style="margin:0; font-size: 18px; color:#0f172a;">Checkout Payment</h3>
                <span onclick="closeCheckout()" style="font-size:24px; font-weight:bold; cursor:pointer; color:#64748b;">&times;</span>
            </div>

            <div class="raj-qr-box">
                <div style="font-size:12px; font-weight:bold; color:#9333ea; margin-bottom:8px;">SCAN TO PAY VIA ANY UPI APP</div>
                <img src="${qrUrl}" alt="Scan QR Code" style="width:150px; height:150px; border-radius:8px; border:1px solid #e2e8f0; background:#fff;">
                <div style="font-size: 16px; font-weight: 800; color: #16a34a; margin-top: 8px;">Total Pay: ₹${totalAmount} INR</div>
            </div>

            <div>
                <label style="font-size:12px; font-weight:bold; color:#334155;">Transaction ID / UTR Number <span style="color:red;">*</span></label>
                <input type="text" id="rajUtxInput" class="raj-input" placeholder="Enter 12-digit UTR ID">
            </div>

            <button type="button" class="raj-btn-wa" onclick="submitToWhatsApp('${selectedService.name}', ${qty}, '${totalAmount}', '${link}')">
                Confirm Your Order
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeCheckout() {
    const modal = document.getElementById("rajCheckoutModal");
    if (modal) modal.remove();
}

function submitToWhatsApp(serviceName, qty, price, link) {
    const utrInput = document.getElementById("rajUtxInput");
    const utrVal = utrInput ? utrInput.value.trim() : "";

    if (!utrVal) {
        alert("⚠️ Please enter your UTR / Transaction ID after paying!");
        return;
    }

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const myWhatsAppNumber = "919239628344";

    const textMessage = 
        `🚀 *NEW ORDER RECEIVED* 🚀\n\n` +
        `🆔 *Order ID:* #${orderId}\n` +
        `📌 *Platform:* ${currentPlatform.toUpperCase()}\n` +
        `🛠️ *Service:* ${serviceName}\n` +
        `🔢 *Quantity:* ${qty}\n` +
        `💰 *Total Paid:* ₹${price}\n` +
        `🔗 *Target Link:* ${link}\n` +
        `🧾 *UTR / Txn ID:* ${utrVal}`;

    const waLink = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodeURIComponent(textMessage)}`;

    window.open(waLink, "_blank");
    closeCheckout();
}
