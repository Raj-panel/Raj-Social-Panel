// =========================================================
// SERVICE DATA WITH INDIVIDUAL PRICES AND AVERAGE TIMES
// =========================================================
const serviceData = {
    instagram: {
        "Instagram Followers — Working Service": [
            { 
                id: "1220", 
                name: "1220 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄 - ₹65.358", 
                pricePer1000: 65.358, 
                avgTime: "10 Minutes" 
            },
            { 
                id: "1221", 
                name: "1221 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄 - ₹67.929", 
                pricePer1000: 67.929, 
                avgTime: "10 Minutes" 
            },
            { 
                id: "1222", 
                name: "1222 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄 - ₹70.501", 
                pricePer1000: 70.501, 
                avgTime: "10 Minutes" 
            },
            { 
                id: "1223", 
                name: "1223 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️ - ₹73.072", 
                pricePer1000: 73.072, 
                avgTime: "10 Minutes" 
            }
        ],
        "Instagram followers Non-Drop": [
            { 
                id: "1072", 
                name: "1072 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - No Refill 🔄 - ₹67.929", 
                pricePer1000: 67.929, 
                avgTime: "2 Minutes" 
            },
            { 
                id: "1073", 
                name: "1073 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 30D Refill 🔄 - ₹73.072", 
                pricePer1000: 73.072, 
                avgTime: "2 Minutes" 
            },
            { 
                id: "1074", 
                name: "1074 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 60D Refill 🔄 - ₹75.644", 
                pricePer1000: 75.644, 
                avgTime: "2 Minutes" 
            },
            { 
                id: "1075", 
                name: "1075 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 90D Refill 🔄 - ₹78.215", 
                pricePer1000: 78.215, 
                avgTime: "2 Minutes" 
            },
            { 
                id: "1076", 
                name: "1076 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 365D Refill 🔄 - ₹79.858", 
                pricePer1000: 79.858, 
                avgTime: "2 Minutes" 
            },
            { 
                id: "1077", 
                name: "1077 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - Lifetime Refill ♻️ - ₹83.358", 
                pricePer1000: 83.358, 
                avgTime: "2 Minutes" 
            }
        ]
    }
};

let currentPlatform = "instagram";
let currentCheckoutData = {};

// =========================================================
// DOM CONTENT LOADED & INITIAL BINDINGS
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Load of Category Dropdown
    loadCategories();

    // 2. Category Dropdown Listener
    const catSelect = getCategoryDropdown();
    if (catSelect) {
        catSelect.addEventListener("change", function () {
            loadServices(this.value);
        });
    }

    // 3. Service Dropdown Listener
    const servSelect = getServiceDropdown();
    if (servSelect) {
        servSelect.addEventListener("change", function () {
            onServiceChange();
        });
    }

    // 4. Quantity Input Listener for Instant Total Price Calculation
    const qtyInput = getQuantityInput();
    if (qtyInput) {
        qtyInput.addEventListener("input", calculateTotalPrice);
        qtyInput.addEventListener("keyup", calculateTotalPrice);
    }

    // 5. Submit / Proceed Button Listener
    const submitBtn = document.querySelector("button[type='submit']") || document.querySelector(".submit-btn") || document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();
            proceedToCheckout();
        });
    }
});

// Helper functions to fetch elements safely
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
// DROPDOWN LOADERS & DYNAMIC updates
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
        opt.textContent = service.name; // Full Name including price tag (₹)
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
        // Update Dynamic Average Time Text
        updateAverageTimeDisplay(service.avgTime);
        // Calculate Total Price
        calculateTotalPrice();
    }
}

function updateAverageTimeDisplay(timeStr) {
    // Search for element showing Average Time
    const allDivs = document.querySelectorAll("div, p, span, h4");
    allDivs.forEach(el => {
        if (el.children.length === 0 && el.innerText && el.innerText.includes("Average Time:")) {
            el.innerHTML = `⚡ Average Time: <b>${timeStr}</b>`;
        }
    });
}

function calculateTotalPrice() {
    const catSelect = getCategoryDropdown();
    const servSelect = getServiceDropdown();
    const qtyInput = getQuantityInput();

    if (!catSelect || !servSelect) return;

    const catName = catSelect.value;
    const servIndex = servSelect.value;
    const qty = parseFloat(qtyInput ? qtyInput.value : 0) || 0;

    const services = serviceData[currentPlatform]?.[catName] || [];
    const service = services[servIndex];

    if (service) {
        const totalAmount = (qty / 1000) * service.pricePer1000;
        
        // Find Total Amount / Charge element and display price
        const priceDisplays = document.querySelectorAll("#totalPrice, #charge, .total-price, #totalAmount");
        if (priceDisplays.length > 0) {
            priceDisplays.forEach(el => {
                if (el.tagName === "INPUT") {
                    el.value = `₹${totalAmount.toFixed(2)}`;
                } else {
                    el.innerText = `₹${totalAmount.toFixed(2)}`;
                }
            });
        } else {
            // Fallback if ID is missing in HTML
            const priceBox = document.querySelector(".price-box") || document.querySelector("[class*='price']");
            if (priceBox) {
                priceBox.innerText = `Total Charge: ₹${totalAmount.toFixed(2)}`;
            }
        }
    }
}

// =========================================================
// CHECKOUT & PROCEED TO PAYMENT LOGIC
// =========================================================
function proceedToCheckout() {
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

    if (!qty || qty < 1) {
        alert("Please enter a valid Quantity!");
        return;
    }

    const service = serviceData[currentPlatform][category][serviceIndex];
    const totalAmount = (qty / 1000) * service.pricePer1000;

    // Build WhatsApp Order Message directly
    const whatsappNumber = "919239628344";
    const formattedMessage = 
        `🚀 *NEW INSTAGRAM ORDER* 🚀\n\n` +
        `📌 *Platform:* Instagram\n` +
        `📂 *Category:* ${category}\n` +
        `🛠️ *Service:* ${service.name}\n` +
        `🔢 *Quantity:* ${qty.toLocaleString()}\n` +
        `💰 *Total Price:* ₹${totalAmount.toFixed(2)}\n` +
        `⚡ *Avg Time:* ${service.avgTime}\n` +
        `🔗 *Link:* ${link}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`;
    
    // Open WhatsApp
    window.open(waUrl, "_blank");
}
