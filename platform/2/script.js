// ===============================================
// SERVICE DATA CONFIGURATION
// ===============================================
const servicesData = {
    instagram: {
        "Followers Non-Drop": [
            { id: 101, type: "custom", name: "Instagram Non-Drop Followers", pricePer1000: 80, min: 100, max: 100000, refill: "30 Days Refill", drop: "Non-Drop", quality: "Real Profiles", speed: "10K/Day", description: "High quality non-drop Instagram followers. Enter custom quantity." }
        ],
        "Followers": [
            { id: 102, name: "1K Followers", price: 50, badge: "Starter", badgeClass: "badge-demo", min: 1000, max: 1000, refill: "Lifetime", drop: "Low Drop", quality: "Standard", speed: "Fast", description: "1K Instagram followers package." },
            { id: 103, name: "2K Followers", price: 90, min: 2000, max: 2000, refill: "Lifetime", drop: "Low Drop", quality: "Standard", speed: "Fast", description: "2K Instagram followers package." },
            { id: 104, name: "3K Followers", price: 129, badge: "⭐ Popular", badgeClass: "badge-popular", min: 3000, max: 3000, refill: "Lifetime", drop: "Low Drop", quality: "Standard", speed: "Fast", description: "3K Instagram followers package." },
            { id: 105, name: "4K Followers", price: 165, min: 4000, max: 4000, refill: "Lifetime", drop: "Low Drop", quality: "Standard", speed: "Fast", description: "4K Instagram followers package." },
            { id: 106, name: "5K Followers", price: 199, badge: "🔥 Best Value", badgeClass: "badge-best", min: 5000, max: 5000, refill: "Lifetime", drop: "Low Drop", quality: "High Quality", speed: "Fast", description: "5K Instagram followers package." },
            { id: 107, name: "6K Followers", price: 239, min: 6000, max: 6000, refill: "Lifetime", drop: "Low Drop", quality: "High Quality", speed: "Fast", description: "6K Instagram followers package." },
            { id: 108, name: "7K Followers", price: 279, min: 7000, max: 7000, refill: "Lifetime", drop: "Low Drop", quality: "High Quality", speed: "Fast", description: "7K Instagram followers package." },
            { id: 109, name: "8K Followers", price: 319, min: 8000, max: 8000, refill: "Lifetime", drop: "Low Drop", quality: "High Quality", speed: "Fast", description: "8K Instagram followers package." },
            { id: 110, name: "9K Followers", price: 359, min: 9000, max: 9000, refill: "Lifetime", drop: "Low Drop", quality: "High Quality", speed: "Fast", description: "9K Instagram followers package." },
            { id: 111, name: "10K Followers", price: 399, badge: "👑 Most Popular", badgeClass: "badge-best", min: 10000, max: 10000, refill: "Lifetime", drop: "Non-Drop", quality: "HQ Premium", speed: "Super Fast", description: "10K Premium Instagram followers package." }
        ],
        "Likes Lifetime": [
            { id: 112, name: "100 Likes", price: 15, badge: "Starter", badgeClass: "badge-demo", min: 100, max: 100, refill: "Lifetime", drop: "Zero Drop", quality: "Real", speed: "Instant", description: "100 Instagram Likes." },
            { id: 113, name: "500 Likes", price: 25, badge: "Real", badgeClass: "badge-real", min: 500, max: 500, refill: "Lifetime", drop: "Zero Drop", quality: "Real", speed: "Instant", description: "500 Instagram Likes." },
            { id: 114, name: "1K Likes", price: 30, badge: "Fast", badgeClass: "badge-popular", min: 1000, max: 1000, refill: "Lifetime", drop: "Zero Drop", quality: "Real", speed: "Instant", description: "1K Instagram Likes." },
            { id: 115, name: "3K Likes", price: 69, badge: "⭐ Popular", badgeClass: "badge-popular", min: 3000, max: 3000, refill: "Lifetime", drop: "Zero Drop", quality: "Real", speed: "Instant", description: "3K Instagram Likes." },
            { id: 116, name: "5K Likes", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best", min: 5000, max: 5000, refill: "Lifetime", drop: "Zero Drop", quality: "Real", speed: "Instant", description: "5K Instagram Likes." },
            { id: 117, name: "10K Likes", price: 179, badge: "👑 Most Popular", badgeClass: "badge-best", min: 10000, max: 10000, refill: "Lifetime", drop: "Zero Drop", quality: "Real", speed: "Instant", description: "10K Instagram Likes." }
        ],
        "Reels / Video Views": [
            { id: 118, name: "1K Views", price: 10, badge: "DEMO", badgeClass: "badge-demo", min: 1000, max: 1000, refill: "N/A", drop: "Non-Drop", quality: "Standard", speed: "Instant", description: "1K Reel Views." },
            { id: 119, name: "5K Views", price: 20, badge: "STARTER", badgeClass: "badge-real", min: 5000, max: 5000, refill: "N/A", drop: "Non-Drop", quality: "Standard", speed: "Instant", description: "5K Reel Views." },
            { id: 120, name: "10K Views", price: 30, badge: "BEST VALUE", badgeClass: "badge-best", min: 10000, max: 10000, refill: "N/A", drop: "Non-Drop", quality: "High Retention", speed: "Instant", description: "10K Reel Views." },
            { id: 121, name: "20K Views", price: 40, badge: "POPULAR", badgeClass: "badge-popular", min: 20000, max: 20000, refill: "N/A", drop: "Non-Drop", quality: "High Retention", speed: "Instant", description: "20K Reel Views." },
            { id: 122, name: "50K Views", price: 70, badge: "RECOMMENDED", badgeClass: "badge-best", min: 50000, max: 50000, refill: "N/A", drop: "Non-Drop", quality: "High Retention", speed: "Instant", description: "50K Reel Views." },
            { id: 123, name: "100K Views", price: 99, badge: "🔥 BEST SELLER", badgeClass: "badge-best", min: 100000, max: 100000, refill: "N/A", drop: "Non-Drop", quality: "High Retention", speed: "Ultra Fast", description: "100K Reel Views." },
            { id: 124, name: "500K Views", price: 299, badge: "👑 MOST POPULAR", badgeClass: "badge-best", min: 500000, max: 500000, refill: "N/A", drop: "Non-Drop", quality: "High Retention", speed: "Ultra Fast", description: "500K Reel Views." },
            { id: 125, name: "1M Views", price: 499, badge: "💥 MEGA DEAL", badgeClass: "badge-best", min: 1000000, max: 1000000, refill: "N/A", drop: "Non-Drop", quality: "High Retention", speed: "Ultra Fast", description: "1M Reel Views Mega Package." }
        ],
        "Comments Lifetime": [
            { id: 126, name: "50 Comments", price: 15, badge: "Starter", badgeClass: "badge-demo", min: 50, max: 50, refill: "Lifetime", drop: "Zero Drop", quality: "Real Accounts", speed: "Fast", description: "50 Comments." },
            { id: 127, name: "100 Comments", price: 20, badge: "Real", badgeClass: "badge-real", min: 100, max: 100, refill: "Lifetime", drop: "Zero Drop", quality: "Real Accounts", speed: "Fast", description: "100 Comments." },
            { id: 128, name: "500 Comments", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular", min: 500, max: 500, refill: "Lifetime", drop: "Zero Drop", quality: "Real Accounts", speed: "Fast", description: "500 Comments." },
            { id: 129, name: "1K Comments", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best", min: 1000, max: 1000, refill: "Lifetime", drop: "Zero Drop", quality: "Real Accounts", speed: "Fast", description: "1K Comments." }
        ],
        "Repost Lifetime": [
            { id: 130, name: "50 Reposts", price: 15, badge: "Starter", badgeClass: "badge-demo", min: 50, max: 50, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "50 Reposts." },
            { id: 131, name: "100 Reposts", price: 20, badge: "Real", badgeClass: "badge-real", min: 100, max: 100, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "100 Reposts." },
            { id: 132, name: "500 Reposts", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular", min: 500, max: 500, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "500 Reposts." },
            { id: 133, name: "1K Reposts", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best", min: 1000, max: 1000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "1K Reposts." },
            { id: 134, name: "3K Reposts", price: 249, badge: "👑 Most Popular", badgeClass: "badge-best", min: 3000, max: 3000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "3K Reposts." }
        ],
        "Shares Lifetime": [
            { id: 135, name: "100 Shares", price: 10, badge: "Starter", badgeClass: "badge-demo", min: 100, max: 100, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "100 Shares." },
            { id: 136, name: "1K Shares", price: 30, badge: "Fast", badgeClass: "badge-popular", min: 1000, max: 1000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "1K Shares." },
            { id: 137, name: "5K Shares", price: 69, badge: "🔥 Best Value", badgeClass: "badge-best", min: 5000, max: 5000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "5K Shares." },
            { id: 138, name: "10K Shares", price: 99, badge: "👑 Most Popular", badgeClass: "badge-best", min: 10000, max: 10000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Fast", description: "10K Shares." }
        ]
    },
    facebook: {
        "Facebook Followers": [
            { id: 201, type: "custom", name: "Facebook Followers", pricePer1000: 49, min: 100, max: 50000, refill: "30 Days Refill", drop: "Low Drop", quality: "Real Profiles", speed: "2K/Day", description: "Facebook Page or Profile Followers." }
        ],
        "Likes Non-Drop": [
            { id: 202, name: "100 Likes", price: 10, badge: "STARTER", badgeClass: "badge-demo", min: 100, max: 100, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Instant", description: "100 Facebook Likes." },
            { id: 203, name: "500 Likes", price: 25, badge: "REAL", badgeClass: "badge-real", min: 500, max: 500, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Instant", description: "500 Facebook Likes." },
            { id: 204, name: "1K Likes", price: 39, badge: "FAST", badgeClass: "badge-popular", min: 1000, max: 1000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Instant", description: "1K Facebook Likes." },
            { id: 205, name: "3K Likes", price: 69, badge: "⭐ POPULAR", badgeClass: "badge-popular", min: 3000, max: 3000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Instant", description: "3K Facebook Likes." },
            { id: 206, name: "5K Likes", price: 99, badge: "🔥 BEST VALUE", badgeClass: "badge-best", min: 5000, max: 5000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Instant", description: "5K Facebook Likes." },
            { id: 207, name: "10K Likes", price: 179, badge: "👑 MOST POPULAR", badgeClass: "badge-best", min: 10000, max: 10000, refill: "Lifetime", drop: "Non-Drop", quality: "Real", speed: "Instant", description: "10K Facebook Likes." }
        ],
        "Reels / Video Views": [
            { id: 208, name: "1K Views", price: 10, badge: "STARTER", badgeClass: "badge-demo", min: 1000, max: 1000, refill: "N/A", drop: "Non-Drop", quality: "Standard", speed: "Fast", description: "1K Video Views." },
            { id: 209, name: "3K Views", price: 25, min: 3000, max: 3000, refill: "N/A", drop: "Non-Drop", quality: "Standard", speed: "Fast", description: "3K Video Views." },
            { id: 210, name: "5K Views", price: 35, badge: "⭐ POPULAR", badgeClass: "badge-popular", min: 5000, max: 5000, refill: "N/A", drop: "Non-Drop", quality: "Standard", speed: "Fast", description: "5K Video Views." },
            { id: 211, name: "10K Views", price: 60, min: 10000, max: 10000, refill: "N/A", drop: "Non-Drop", quality: "Standard", speed: "Fast", description: "10K Video Views." },
            { id: 212, name: "50K Views", price: 249, badge: "🔥 BEST VALUE", badgeClass: "badge-best", min: 50000, max: 50000, refill: "N/A", drop: "Non-Drop", quality: "High Quality", speed: "Ultra Fast", description: "50K Video Views." },
            { id: 213, name: "100K Views", price: 449, badge: "👑 MOST POPULAR", badgeClass: "badge-best", min: 100000, max: 100000, refill: "N/A", drop: "Non-Drop", quality: "High Quality", speed: "Ultra Fast", description: "100K Video Views." }
        ]
    }
};

let currentPlatform = 'instagram';

// Dark / Light Theme Functions
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.className = savedTheme;
    updateThemeUI(savedTheme);
}

function toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
        updateThemeUI('light-theme');
    } else {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
        updateThemeUI('dark-theme');
    }
}

function updateThemeUI(theme) {
    const isDark = theme === 'dark-theme';
    const iconClass = isDark ? 'fa-moon' : 'fa-sun';
    const text = isDark ? 'Dark Mode' : 'Light Mode';

    const themeIcon = document.getElementById('themeIcon');
    const headerThemeIcon = document.getElementById('headerThemeIcon');
    const themeText = document.getElementById('themeText');

    if(themeIcon) themeIcon.className = `fa-solid ${iconClass}`;
    if(headerThemeIcon) headerThemeIcon.className = `fa-solid ${iconClass}`;
    if(themeText) themeText.innerText = text;
}

// Sidebar Drawer Control
function openSidebar() {
    document.getElementById('leftSidebar').classList.add('active');
    document.getElementById('sidebarOverlay').classList.add('active');
}

function closeSidebar() {
    document.getElementById('leftSidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
}

// Switch Platform
function switchPlatform(platform) {
    currentPlatform = platform;
    document.getElementById('tab-instagram').classList.toggle('active', platform === 'instagram');
    document.getElementById('tab-facebook').classList.toggle('active', platform === 'facebook');
    loadCategories();
}

function loadCategories() {
    const catSelect = document.getElementById('categorySelect');
    catSelect.innerHTML = '';
    const categories = Object.keys(servicesData[currentPlatform] || {});

    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        catSelect.appendChild(opt);
    });

    loadServices();
}

function loadServices() {
    const cat = document.getElementById('categorySelect').value;
    const servSelect = document.getElementById('serviceSelect');
    servSelect.innerHTML = '';

    const services = (servicesData[currentPlatform] && servicesData[currentPlatform][cat]) || [];
    services.forEach((s, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        
        // Display badge in select option if present
        let displayName = s.name;
        if(s.badge) {
            displayName += ` [${s.badge}]`;
        }
        
        opt.textContent = displayName;
        servSelect.appendChild(opt);
    });

    updateDetails();
}

function getActiveService() {
    const cat = document.getElementById('categorySelect').value;
    const idx = document.getElementById('serviceSelect').value;
    return servicesData[currentPlatform]?.[cat]?.[idx];
}

function updateDetails() {
    const s = getActiveService();
    if(!s) return;

    const qtyInput = document.getElementById('quantity');

    document.getElementById('dName').textContent = s.name;
    document.getElementById('dRefill').textContent = s.refill || 'Lifetime';
    document.getElementById('dDrop').textContent = s.drop || 'Non-Drop';
    document.getElementById('dQuality').textContent = s.quality || 'High Quality';
    document.getElementById('dSpeed').textContent = s.speed || 'Fast';
    document.getElementById('dDesc').textContent = s.description || 'No description available.';

    // Check if Custom or Fixed Price Package
    if(s.type === "custom") {
        document.getElementById('dPrice').textContent = `₹${s.pricePer1000.toFixed(2)} per 1K`;
        document.getElementById('minMaxText').textContent = `Min: ${s.min} | Max: ${s.max.toLocaleString()}`;
        qtyInput.readOnly = false;
        qtyInput.value = s.min;
    } else {
        document.getElementById('dPrice').textContent = `₹${s.price.toFixed(2)} (Fixed)`;
        document.getElementById('minMaxText').textContent = `Fixed Package: ${s.min} Quantity`;
        qtyInput.value = s.min;
        qtyInput.readOnly = true; // Block manual typing for fixed packages
    }

    calculateTotal();
}

function calculateTotal() {
    const s = getActiveService();
    if(!s) return;

    const qtyInput = document.getElementById('quantity');
    let qty = parseInt(qtyInput.value) || 0;

    let total = 0;
    if(s.type === "custom") {
        total = (qty / 1000) * s.pricePer1000;
    } else {
        total = s.price; // Fixed package price
    }

    document.getElementById('totalPrice').textContent = `₹${total.toFixed(2)}`;
}

function placeOrder() {
    const link = document.getElementById('targetLink').value.trim();
    const service = getActiveService();
    const qty = parseInt(document.getElementById('quantity').value) || 0;
    
    // মোট টাকা হিসাব
    let total = 0;
    if (service.type === "custom") {
        total = (qty / 1000) * service.pricePer1000;
    } else {
        total = service.price;
    }

    if (!link) {
        alert('Please enter a target link or username!');
        return;
    }

    if (total <= 0) {
        alert('Invalid order amount!');
        return;
    }

    // পেমেন্টের জন্য অর্ডারের ডাটা LocalStorage এ সেভ করা হচ্ছে
    const orderData = {
        serviceName: service.name,
        link: link,
        quantity: qty,
        amount: total.toFixed(2)
    };

    localStorage.setItem('pendingOrder', JSON.stringify(orderData));

    // Checkout পেজে পাঠানো হচ্ছে
    window.location.href = "https://rajsmmpanel.in/platform/2/checkout";
}
