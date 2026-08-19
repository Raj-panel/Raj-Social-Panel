// =========================================================
// SERVICE DATA WITH ACCURATE AVERAGE TIMES
// =========================================================
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
    }
};

let currentPlatform = "instagram";
let currentOrderDetails = {};

// =========================================================
// INITIAL SETUP ON DOM LOAD
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
    injectCheckoutModalHtml();

    // Category Dropdown Event
    const catSelect = getCategoryDropdown();
    if (catSelect) {
        catSelect.addEventListener("change", function () {
            loadServices(this.value);
        });
    }

    // Service Dropdown Event
    const servSelect = getServiceDropdown();
    if (servSelect) {
        servSelect.addEventListener("change", function () {
            onServiceChange();
        });
    }

    // Quantity Input Config & Event
    const qtyInput = getQuantityInput();
    if (qtyInput) {
        qtyInput.value = ""; // Default Empty
        qtyInput.placeholder = "Minimum 100"; // Hidden placeholder
        qtyInput.addEventListener("input", function () {
            validateQuantityAndCalculate();
        });
    }

    // Submit / Proceed to Payment Button Event
    const submitBtn = document.querySelector("button[type='submit']") || document.querySelector(".submit-btn") || document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            openCheckoutPage();
        });
    }
});

// Helper Functions to find Elements
function getCategoryDropdown() {
    return document.getElementById("categorySelect") || document.querySelectorAll("select")[0];
}

function getServiceDropdown() {
    return document.getElementById("serviceSelect") || document.querySelectorAll("select")[1];
}

function getQuantityInput() {
    return document.getElementById("quantityInput") || document.querySelector("input[type='number']");
}

function getLinkInput() {
    return document.getElementById("linkInput") || document.querySelector("input[type='text']") || document.querySelector("input[placeholder*='http']");
}

// =========================================================
// DROPDOWN & DYNAMIC LOGIC
// =========================================================
function loadCategories() {
    const catSelect = getCategoryDropdown();
    if (!catSelect) return;

    catSelect.innerHTML = '<option value="" disabled selected>-- Select Category --</option>';
    const categories = Object.keys(serviceData[currentPlatform] || {});

    categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        catSelect.appendChild(opt);
    });

    if (categories.length > 0) {
        catSelect.value = categories[0];
        loadServices(categories[0]);
    }
}

function loadServices(categoryName) {
    const servSelect = getServiceDropdown();
    if (!servSelect) return;

    servSelect.innerHTML = '<option value="" disabled selected>-- Select Service --</option>';
    const services = serviceData[currentPlatform]?.[categoryName] || [];

    services.forEach((service, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = service.name;
        servSelect.appendChild(opt);
    });

    if (services.length > 0) {
        servSelect.value = "0";
        onServiceChange();
    }
}

function onServiceChange() {
    const catSelect = getCategoryDropdown();
    const servSelect = getServiceDropdown();
    if (!catSelect || !servSelect) return;

    const catName = catSelect.value;
    const servIndex = servSelect.value;
    const services = serviceData[currentPlatform]?.[catName] || [];
    const service = services[servIndex];

    if (service) {
        updateAverageTimeDisplay(service.avgTime);
        validateQuantityAndCalculate();
    }
}

function updateAverageTimeDisplay(timeStr) {
    const allDivs = document.querySelectorAll("div, p, span, h4");
    allDivs.forEach(el => {
        if (el.children.length === 0 && el.innerText && el.innerText.includes("Average Time:")) {
            el.innerHTML = `⚡ Average Time: <b>${timeStr}</b>`;
        }
    });
}

function validateQuantityAndCalculate() {
    const catSelect = getCategoryDropdown();
    const servSelect = getServiceDropdown();
    const qtyInput = getQuantityInput();
    if (!qtyInput) return;

    const val = qtyInput.value.trim();
    const qty = parseFloat(val);

    // Dynamic Red Border Validation if less than 100
    if (val !== "" && (isNaN(qty) || qty < 100)) {
        qtyInput.style.border = "2px solid #ef4444";
        qtyInput.style.color = "#ef4444";
    } else {
        qtyInput.style.border = "";
        qtyInput.style.color = "";
    }

    if (!catSelect || !servSelect || isNaN(qty) || qty < 100) {
        updatePriceDisplay(0);
        return;
    }

    const catName = catSelect.value;
    const servIndex = servSelect.value;
    const service = serviceData[currentPlatform]?.[catName]?.[servIndex];

    if (service) {
        const totalAmount = (qty / 1000) * service.pricePer1000;
        updatePriceDisplay(totalAmount);
    }
}

function updatePriceDisplay(amount) {
    const priceDisplays = document.querySelectorAll("#totalPrice, #charge, .total-price, #totalAmount");
    if (priceDisplays.length > 0) {
        priceDisplays.forEach(el => {
            if (el.tagName === "INPUT") {
                el.value = `₹${amount.toFixed(2)}`;
            } else {
                el.innerText = `₹${amount.toFixed(2)}`;
            }
        });
    }
}

// =========================================================
// NEW CHECKOUT MODAL PAGE & UPI QR GENERATOR
// =========================================================
function injectCheckoutModalHtml() {
    if (document.getElementById("checkoutModal")) return;

    const modal = document.createElement("div");
    modal.id = "checkoutModal";
    modal.style.cssText = `
        display: none; position: fixed; z-index: 99999; left: 0; top: 0; width: 100%; height: 100%;
        background-color: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);
        justify-content: center; align-items: center; padding: 15px; box-sizing: border-box;
    `;

    modal.innerHTML = `
        <div style="background: #ffffff; width: 100%; max-width: 420px; border-radius: 16px; padding: 20px; box-sizing: border-box; position: relative; font-family: sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-height: 90vh; overflow-y: auto;">
            <button onclick="closeCheckoutModal()" style="position: absolute; right: 15px; top: 15px; background: #f1f5f9; border: none; font-size: 20px; font-weight: bold; width: 32px; height: 32px; border-radius: 50%; cursor: pointer;">✕</button>
            
            <h2 style="text-align: center; margin-top: 0; margin-bottom: 12px; color: #a855f7; font-size: 20px; font-weight: 800; text-transform: uppercase;">CHECKOUT</h2>
            
            <!-- Service Summary Box -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; margin-bottom: 15px;">
                <p style="margin: 3px 0; font-size: 12px; color: #64748b;"><b>Category:</b> <span id="ckCategory" style="color:#0f172a;"></span></p>
                <p style="margin: 3px 0; font-size: 12px; color: #64748b;"><b>Service:</b> <span id="ckService" style="color:#0f172a;"></span></p>
                <p style="margin: 3px 0; font-size: 12px; color: #64748b;"><b>Quantity:</b> <span id="ckQty" style="color:#0f172a;"></span></p>
                <p style="margin: 3px 0; font-size: 14px; color: #22c55e; font-weight: bold;"><b>Total Amount:</b> ₹<span id="ckAmount"></span> INR</p>
            </div>

            <!-- UPI QR Code Section -->
            <div style="text-align: center; margin-bottom: 15px;">
                <p style="margin-bottom: 6px; font-size: 12px; font-weight: bold; color: #0f172a;">SCAN QR CODE TO PAY</p>
                <img id="ckQrCode" src="" alt="UPI QR Code" style="width: 160px; height: 160px; object-fit: contain; border: 2px solid #e2e8f0; border-radius: 10px; padding: 5px;">
                <p style="margin-top: 4px; font-size: 11px; color: #64748b;">UPI ID: <b>rajpanel@axl</b></p>
            </div>

            <!-- UTR Input Box -->
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-size: 12px; font-weight: bold; margin-bottom: 5px; color: #0f172a;">Enter UTR / Transaction ID:</label>
                <input type="text" id="ckUtrInput" placeholder="Enter 12-digit UTR Number" style="width: 100%; padding: 10px; font-size: 13px; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box; outline: none;">
            </div>

            <!-- Confirm Button -->
            <button onclick="confirmOrderToWhatsApp()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #ffffff; border: none; border-radius: 10px; font-size: 15px; font-weight: bold; cursor: pointer; transition: 0.2s;">
                Confirm Your Order
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}

function openCheckoutPage() {
    const catSelect = getCategoryDropdown();
    const servSelect = getServiceDropdown();
    const linkInput = getLinkInput();
    const qtyInput = getQuantityInput();

    const category = catSelect ? catSelect.value : "";
    const serviceIndex = servSelect ? servSelect.value : "";
    const link = linkInput ? linkInput.value.trim() : "";
    const qty = qtyInput ? parseFloat(qtyInput.value) : 0;

    if (!category || serviceIndex === "") {
        alert("Please select a Category and Service!");
        return;
    }

    if (!link) {
        alert("Please enter Instagram Profile Link or Username!");
        return;
    }

    if (isNaN(qty) || qty < 100) {
        alert("Minimum quantity must be 100 or more!");
        return;
    }

    const service = serviceData[currentPlatform][category][serviceIndex];
    const totalAmount = (qty / 1000) * service.pricePer1000;

    // Save Details
    currentOrderDetails = {
        category: category,
        serviceName: service.name,
        link: link,
        quantity: qty,
        amount: totalAmount.toFixed(2),
        avgTime: service.avgTime
    };

    // Populate Modal Elements
    document.getElementById("ckCategory").innerText = category;
    document.getElementById("ckService").innerText = service.name;
    document.getElementById("ckQty").innerText = qty.toLocaleString();
    document.getElementById("ckAmount").innerText = totalAmount.toFixed(2);
    document.getElementById("ckUtrInput").value = "";

    // Generate Dynamic UPI QR Code
    const upiId = "rajpanel@axl";
    const upiUrl = `upi://pay?pa=${upiId}&pn=RajSocialPanel&am=${totalAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(service.name)}`;
    const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
    document.getElementById("ckQrCode").src = qrApi;

    // Display Modal
    document.getElementById("checkoutModal").style.display = "flex";
}

function closeCheckoutModal() {
    const modal = document.getElementById("checkoutModal");
    if (modal) modal.style.display = "none";
}

function confirmOrderToWhatsApp() {
    const utrInput = document.getElementById("ckUtrInput");
    const utrVal = utrInput ? utrInput.value.trim() : "";

    if (!utrVal) {
        alert("Please enter the UTR / Transaction ID after payment!");
        return;
    }

    const d = currentOrderDetails;
    const whatsappNumber = "919239628344";

    const formattedMessage = 
        `🚀 *NEW CONFIRMED ORDER* 🚀\n\n` +
        `📂 *Category:* ${d.category}\n` +
        `🛠️ *Service:* ${d.serviceName}\n` +
        `🔢 *Quantity:* ${d.quantity.toLocaleString()}\n` +
        `💰 *Total Amount:* ₹${d.amount} INR\n` +
        `⚡ *Avg Time:* ${d.avgTime}\n` +
        `🔗 *Profile Link:* ${d.link}\n` +
        `🧾 *UTR / Txn ID:* ${utrVal}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`;
    
    closeCheckoutModal();
    window.open(waUrl, "_blank");
}
