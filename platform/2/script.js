// =========================================================
// SERVICE DATA (ONLY INSTAGRAM CATEGORIES & SERVICES)
// =========================================================
const serviceData = {
    instagram: {
        "Instagram Followers — Working Service": [
            { id: "1220", name: "1220 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄", pricePer1000: 65.358 },
            { id: "1221", name: "1221 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄", pricePer1000: 67.929 },
            { id: "1222", name: "1222 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄", pricePer1000: 70.501 },
            { id: "1223", name: "1223 - Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️", pricePer1000: 73.072 }
        ],
        "Instagram followers Non-Drop": [
            { id: "1072", name: "1072 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - No Refill 🔄", pricePer1000: 67.929 },
            { id: "1073", name: "1073 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 30D Refill 🔄", pricePer1000: 73.072 },
            { id: "1074", name: "1074 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 60D Refill 🔄", pricePer1000: 75.644 },
            { id: "1075", name: "1075 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 90D Refill 🔄", pricePer1000: 78.215 },
            { id: "1076", name: "1076 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 365D Refill 🔄", pricePer1000: 79.858 },
            { id: "1077", name: "1077 - Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - Lifetime Refill ♻️", pricePer1000: 83.358 }
        ]
    }
};

let currentPlatform = "instagram";
let currentCheckoutData = {};

// =========================================================
// INITIALIZATION ON PAGE LOAD
// =========================================================
document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Load of Categories for Instagram
    loadCategories();

    // 2. Event Listener for Category Selection Change
    const categorySelect = getCategoryDropdown();
    if (categorySelect) {
        categorySelect.addEventListener("change", function () {
            loadServices(this.value);
        });
    }

    // 3. Event Listener for Service Selection Change
    const serviceSelect = getServiceDropdown();
    if (serviceSelect) {
        serviceSelect.addEventListener("change", function () {
            calculateTotalPrice();
        });
    }

    // 4. Quantity Input Event Listener
    const qtyInput = document.getElementById("quantityInput") || document.querySelector("input[type='number']");
    if (qtyInput) {
        qtyInput.addEventListener("input", calculateTotalPrice);
    }
});

// Helper functions to identify Dropdown elements flexibly
function getCategoryDropdown() {
    return document.getElementById("categorySelect") || document.querySelectorAll("select")[0];
}

function getServiceDropdown() {
    return document.getElementById("serviceSelect") || document.querySelectorAll("select")[1];
}

// =========================================================
// DYNAMIC DROPDOWN FILLING LOGIC
// =========================================================
function loadCategories() {
    const categorySelect = getCategoryDropdown();
    if (!categorySelect) return;

    categorySelect.innerHTML = '<option value="" disabled selected>-- Select Category --</option>';

    const categories = Object.keys(serviceData[currentPlatform] || {});
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    // Auto-select first category if available
    if (categories.length > 0) {
        categorySelect.value = categories[0];
        loadServices(categories[0]);
    }
}

function loadServices(categoryName) {
    const serviceSelect = getServiceDropdown();
    if (!serviceSelect) return;

    serviceSelect.innerHTML = '<option value="" disabled selected>-- Select Service --</option>';

    const services = serviceData[currentPlatform]?.[categoryName] || [];
    
    services.forEach((service, index) => {
        const option = document.createElement("option");
        option.value = index; // pass array index
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });

    // Auto-select first service if available
    if (services.length > 0) {
        serviceSelect.value = "0";
        calculateTotalPrice();
    }
}

function calculateTotalPrice() {
    const categorySelect = getCategoryDropdown();
    const serviceSelect = getServiceDropdown();
    const qtyInput = document.getElementById("quantityInput") || document.querySelector("input[type='number']");
    const priceDisplay = document.getElementById("totalPrice") || document.getElementById("charge");

    if (!categorySelect || !serviceSelect) return;

    const selectedCat = categorySelect.value;
    const serviceIndex = serviceSelect.value;
    const qty = parseFloat(qtyInput ? qtyInput.value : 1000) || 0;

    if (selectedCat && serviceIndex !== "" && serviceIndex !== null) {
        const service = serviceData[currentPlatform][selectedCat][serviceIndex];
        if (service) {
            const totalPrice = (qty / 1000) * service.pricePer1000;
            if (priceDisplay) {
                priceDisplay.innerText = totalPrice.toFixed(2);
            }
        }
    }
}

// Platform Switch Logic (If Top Icons Clicked)
function switchPlatform(platform) {
    currentPlatform = platform;
    loadCategories();
}

// =========================================================
// SUBMIT ORDER TO WHATSAPP / CHECKOUT LOGIC
// =========================================================
function submitOrder() {
    const categorySelect = getCategoryDropdown();
    const serviceSelect = getServiceDropdown();
    const linkInput = document.querySelector("input[type='text']") || document.getElementById("linkInput");
    const qtyInput = document.getElementById("quantityInput") || document.querySelector("input[type='number']");

    const category = categorySelect ? categorySelect.value : "";
    const serviceIndex = serviceSelect ? serviceSelect.value : "";
    const link = linkInput ? linkInput.value.trim() : "";
    const qty = qtyInput ? qtyInput.value : "";

    if (!category || serviceIndex === "") {
        alert("Please select a Category and Service!");
        return;
    }

    if (!link) {
        alert("Please enter Instagram Profile Link or Username!");
        return;
    }

    const service = serviceData[currentPlatform][category][serviceIndex];
    const price = ((parseFloat(qty) || 1000) / 1000) * service.pricePer1000;

    const whatsappNumber = "919239628344";
    const message = 
        `🚀 *NEW INSTAGRAM ORDER platform 2* 🚀\n\n` +
        `📂 *Category:* ${category}\n` +
        `🛠️ *Service:* ${service.name}\n` +
        `🔢 *Quantity:* ${qty}\n` +
        `💰 *Total Price:* ₹${price.toFixed(2)}\n` +
        `🔗 *Link:* ${link}`;

    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
}
