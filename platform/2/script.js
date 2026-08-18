// ===============================================
// SERVICE DATA CONFIGURATION (আপনি এখানে এডিট করবেন)
// ===============================================
const servicesData = {
    instagram: {
        "Instagram Followers": [
            {
                id: 101,
                name: "Instagram Followers [Real & Active]",
                pricePer1k: 0.00, // Price in ₹
                min: 100,
                max: 100000,
                refill: "30 Days Refill",
                drop: "Low Drop (1-3%)",
                quality: "High Quality Real",
                speed: "10K - 20K/Day",
                description: "High quality Instagram followers. Start time: 0-1 Hour. Guaranteed non-drop or 30 days refill provided."
            },
            {
                id: 102,
                name: "Instagram Followers [Targeted]",
                pricePer1k: 0.00,
                min: 500,
                max: 50000,
                refill: "60 Days Refill",
                drop: "No Drop",
                quality: "Premium HQ",
                speed: "5K/Day",
                description: "Targeted active followers for organic profile enhancement."
            }
        ],
        "Instagram Likes": [
            {
                id: 103,
                name: "Instagram Instant Likes",
                pricePer1k: 0.00,
                min: 50,
                max: 50000,
                refill: "No Refill Needed",
                drop: "Zero Drop",
                quality: "Real User",
                speed: "Instant",
                description: "Instant delivery on post. High retention likes."
            }
        ],
        "Instagram Views": [
            {
                id: 104,
                name: "Instagram Reel Views",
                pricePer1k: 0.00,
                min: 1000,
                max: 1000000,
                refill: "Auto Refill",
                drop: "Non Drop",
                quality: "Real Impressions",
                speed: "100K/Hour",
                description: "Boost your reel reach fast with high impressions."
            }
        ],
        "Instagram Comments": [
            {
                id: 105,
                name: "Instagram Custom Comments",
                pricePer1k: 0.00,
                min: 10,
                max: 1000,
                refill: "N/A",
                drop: "No Drop",
                quality: "Custom Written",
                speed: "100/Hour",
                description: "Custom relevant comments for higher engagement."
            }
        ],
        "Instagram Shares": [
            {
                id: 106,
                name: "Instagram Post & Reel Shares",
                pricePer1k: 0.00,
                min: 100,
                max: 10000,
                refill: "N/A",
                drop: "Non Drop",
                quality: "Real Accounts",
                speed: "Fast",
                description: "Helps post to reach viral explore page."
            }
        ],
        "Instagram Repost": [
            {
                id: 107,
                name: "Instagram Story & Post Repost",
                pricePer1k: 0.00,
                min: 10,
                max: 500,
                refill: "N/A",
                drop: "Non Drop",
                quality: "Organic Real",
                speed: "1-2 Hours",
                description: "Get real users to repost your content."
            }
        ]
    },
    facebook: {
        "Facebook Followers": [
            {
                id: 201,
                name: "Facebook Page Followers / Likes",
                pricePer1k: 0.00,
                min: 100,
                max: 50000,
                refill: "30 Days Refill",
                drop: "Low Drop",
                quality: "Real Accounts",
                speed: "2K/Day",
                description: "Boost your official page presence."
            }
        ],
        "Facebook Likes": [
            {
                id: 202,
                name: "Facebook Post Reaction Likes",
                pricePer1k: 0.00,
                min: 100,
                max: 20000,
                refill: "No Refill",
                drop: "Non Drop",
                quality: "Mix Reactions",
                speed: "Instant",
                description: "Instant post reactions (Like, Love, Wow)."
            }
        ],
        "Facebook Views": [
            {
                id: 203,
                name: "Facebook Video 3-Sec Views",
                pricePer1k: 0.00,
                min: 1000,
                max: 500000,
                refill: "Non-Drop",
                drop: "Zero Drop",
                quality: "Monetizable",
                speed: "50K/Day",
                description: "Safe for page watch time and monetization."
            }
        ],
        "Facebook Comments": [
            {
                id: 204,
                name: "Facebook Random Comments",
                pricePer1k: 0.00,
                min: 10,
                max: 500,
                refill: "N/A",
                drop: "No Drop",
                quality: "Positive English",
                speed: "Natural",
                description: "Natural positive comments."
            }
        ]
    }
};

let activePlatform = 'instagram';

// Platform Switcher
function switchPlatform(platform) {
    activePlatform = platform;
    
    // UI Button state update
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    loadCategories();
}

// Load Categories
function loadCategories() {
    const categorySelect = document.getElementById('categorySelect');
    categorySelect.innerHTML = '';

    const categories = Object.keys(servicesData[activePlatform]);
    
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });

    loadServices();
}

// Load Services under Category
function loadServices() {
    const category = document.getElementById('categorySelect').value;
    const serviceSelect = document.getElementById('serviceSelect');
    serviceSelect.innerHTML = '';

    const services = servicesData[activePlatform][category] || [];

    services.forEach((service, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
    });

    updateServiceDetails();
}

// Get Selected Service
function getSelectedService() {
    const category = document.getElementById('categorySelect').value;
    const serviceIndex = document.getElementById('serviceSelect').value;
    return servicesData[activePlatform][category][serviceIndex];
}

// Update UI Details Box
function updateServiceDetails() {
    const service = getSelectedService();
    if (!service) return;

    document.getElementById('detailName').textContent = service.name;
    document.getElementById('detailPrice').textContent = `₹${service.pricePer1k.toFixed(2)}`;
    document.getElementById('detailRefill').textContent = service.refill;
    document.getElementById('detailDrop').textContent = service.drop;
    document.getElementById('detailQuality').textContent = service.quality;
    document.getElementById('detailSpeed').textContent = service.speed;
    document.getElementById('detailDescription').textContent = service.description;

    document.getElementById('minMaxInfo').textContent = `Min: ${service.min} | Max: ${service.max.toLocaleString()}`;
    
    // Default Quantity
    document.getElementById('quantity').value = service.min;
    calculateTotal();
}

// Calculate Total Price
function calculateTotal() {
    const service = getSelectedService();
    if (!service) return;

    const qty = parseInt(document.getElementById('quantity').value) || 0;
    const total = (qty / 1000) * service.pricePer1k;

    document.getElementById('totalPrice').textContent = `₹${total.toFixed(2)}`;
}

// Order Submission (Mock)
function submitOrder() {
    const link = document.getElementById('targetLink').value;
    const qty = document.getElementById('quantity').value;
    
    if(!link) {
        alert("Please enter a valid link/username.");
        return;
    }

    alert(`Order Placed!\nService: ${getSelectedService().name}\nQuantity: ${qty}\nTarget: ${link}`);
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
});
