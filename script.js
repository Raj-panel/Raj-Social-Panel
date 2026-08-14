/* ==================================================
   RAJ-SMM-PANEL: FUNCTIONALITY & LOGIC
   ================================================== */

// Application State Variables
let currentPlatform = 'instagram';
let currentCategory = '';
let selectedPackage = null;
let currentCheckoutData = {
    platform: '',
    category: '',
    title: '',
    price: 0,
    unitPrice: 0,
    isCustom: false,
    quantity: 1,
    badge: ''
};

// Complete Service Database
const serviceData = {
    instagram: {
        categories: [
            { id: 'insta_followers', name: '👥 Followers' },
            { id: 'insta_likes', name: '❤️ Likes' },
            { id: 'insta_views', name: '👁️ Views/Reels' },
            { id: 'insta_combo', name: '🔥 Super Combos' }
        ],
        packages: {
            insta_followers: [
                { id: 'if_1', title: '1,000 Real Followers', price: 99, badge: 'Popular', isCustom: false, qty: 1000 },
                { id: 'if_2', title: '5,000 High Quality Followers', price: 449, badge: 'Best Offer', isCustom: false, qty: 5000 },
                { id: 'if_custom', title: 'Custom Followers Pack', unitPrice: 0.1, badge: 'Custom', isCustom: true }
            ],
            insta_likes: [
                { id: 'il_1', title: '1,000 Fast Likes', price: 29, badge: 'Instant', isCustom: false, qty: 1000 },
                { id: 'il_2', title: '5,000 Super Likes', price: 119, badge: 'Real', isCustom: false, qty: 5000 }
            ],
            insta_views: [
                { id: 'iv_1', title: '10,000 Reels Views', price: 19, badge: 'Viral', isCustom: false, qty: 10000 },
                { id: 'iv_2', title: '50,000 Viral Views', price: 79, badge: 'Best', isCustom: false, qty: 50000 }
            ],
            insta_combo: [
                { id: 'ic_super', title: '1,000 Followers + 1,000 Likes', price: 119, badge: 'SUPER COMBO', isSuperCombo: true, isCustom: false, qty: 1 }
            ]
        }
    },
    facebook: {
        categories: [
            { id: 'fb_followers', name: '👤 Page/Profile Followers' },
            { id: 'fb_likes', name: '👍 Post Likes' }
        ],
        packages: {
            fb_followers: [
                { id: 'ff_1', title: '1,000 Profile Followers', price: 149, badge: 'Safe', isCustom: false, qty: 1000 }
            ],
            fb_likes: [
                { id: 'fl_1', title: '1,000 Post Likes', price: 49, badge: 'Fast', isCustom: false, qty: 1000 }
            ]
        }
    },
    youtube: {
        categories: [
            { id: 'yt_subs', name: '🔴 Subscribers' },
            { id: 'yt_views', name: '▶️ Watch Views' }
        ],
        packages: {
            yt_subs: [
                { id: 'ys_1', title: '1,000 Non-Drop Subscribers', price: 499, badge: 'Guaranteed', isCustom: false, qty: 1000 }
            ],
            yt_views: [
                { id: 'yv_1', title: '1,000 High Retention Views', price: 89, badge: 'Safe', isCustom: false, qty: 1000 }
            ]
        }
    },
    tiktok: {
        categories: [
            { id: 'tt_followers', name: '🎵 Fans & Followers' },
            { id: 'tt_likes', name: '💖 Video Likes' }
        ],
        packages: {
            tt_followers: [
                { id: 'tf_1', title: '1,000 Active Followers', price: 199, badge: 'Popular', isCustom: false, qty: 1000 }
            ],
            tt_likes: [
                { id: 'tl_1', title: '1,000 Instant Likes', price: 69, badge: 'Fast', isCustom: false, qty: 1000 }
            ]
        }
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    switchPlatform('instagram');
});

// Platform Switcher Function
function switchPlatform(platform) {
    currentPlatform = platform;
    
    // Update HTML Root Data Attribute for Dynamic CSS Theme
    document.documentElement.setAttribute('data-platform', platform);

    // Update Buttons UI
    document.querySelectorAll('.platform-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeBtnMap = {
        'instagram': 'btnInsta',
        'facebook': 'btnFb',
        'youtube': 'btnYt',
        'tiktok': 'btnTt'
    };
    
    if (activeBtnMap[platform]) {
        document.getElementById(activeBtnMap[platform]).classList.add('active');
    }

    // Update Hero Banner Text & Icon
    const heroTitle = document.getElementById('heroTitle');
    const heroIcon = document.getElementById('heroLogoIcon');
    
    const titles = {
        instagram: 'Instagram Growth Services',
        facebook: 'Facebook Boost Services',
        youtube: 'YouTube Monetization Services',
        tiktok: 'TikTok Viral Services'
    };
    
    const icons = {
        instagram: '<i class="fa-brands fa-instagram"></i>',
        facebook: '<i class="fa-brands fa-facebook"></i>',
        youtube: '<i class="fa-brands fa-youtube"></i>',
        tiktok: '<i class="fa-brands fa-tiktok"></i>'
    };

    if (heroTitle) heroTitle.innerText = titles[platform];
    if (heroIcon) heroIcon.innerHTML = icons[platform];

    // Render Category Tabs
    renderCategoryTabs();
}

// Render Horizontal Category Tabs
function renderCategoryTabs() {
    const categoryTabsContainer = document.getElementById('categoryTabs');
    if (!categoryTabsContainer) return;

    categoryTabsContainer.innerHTML = '';
    const categories = serviceData[currentPlatform]?.categories || [];

    if (categories.length > 0) {
        currentCategory = categories[0].id;
        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `cat-tab ${index === 0 ? 'active' : ''}`;
            btn.innerText = cat.name;
            btn.onclick = () => {
                document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = cat.id;
                renderPackages();
            };
            categoryTabsContainer.appendChild(btn);
        });
    }

    renderPackages();
}

// Render Packages List for Selected Category
function renderPackages() {
    const packageListContainer = document.getElementById('packageList');
    if (!packageListContainer) return;

    packageListContainer.innerHTML = '';
    const packages = serviceData[currentPlatform]?.packages[currentCategory] || [];

    packages.forEach(pkg => {
        const card = document.createElement('div');
        
        // CSS Classes for Super Combo and Normal Cards
        card.className = `pkg-card ${pkg.isSuperCombo ? 'super-combo' : ''}`;
        
        const platformIcons = {
            instagram: 'fa-instagram',
            facebook: 'fa-facebook',
            youtube: 'fa-youtube',
            tiktok: 'fa-tiktok'
        };

        const iconClass = platformIcons[currentPlatform] || 'fa-bolt';

        card.innerHTML = `
            <div class="pkg-left">
                <div class="pkg-icon">
                    <i class="fa-brands ${iconClass}"></i>
                </div>
                <div class="pkg-info">
                    <div class="pkg-title">
                        ${pkg.title}
                        <span class="pkg-badge badge-popular">${pkg.badge}</span>
                    </div>
                    <span class="pkg-sub">High Quality • Instant Start</span>
                    ${pkg.isSuperCombo ? '<div class="combo-free">🎁 FREE Bonus Likes Included</div>' : ''}
                </div>
            </div>
            <div class="pkg-price-btn">
                ${pkg.isCustom ? 'Custom' : '₹' + pkg.price}
            </div>
        `;

        card.onclick = () => openCheckoutOverlay(pkg);
        packageListContainer.appendChild(card);
    });
}

// Open In-Page Overlay Checkout
function openCheckoutOverlay(pkg) {
    selectedPackage = pkg;
    currentCheckoutData = {
        platform: currentPlatform,
        category: currentCategory,
        title: pkg.title,
        price: pkg.isCustom ? 10 : pkg.price,
        unitPrice: pkg.unitPrice || 0,
        isCustom: pkg.isCustom,
        quantity: pkg.qty || 100,
        badge: pkg.badge
    };

    // Populate Checkout Header Data
    document.getElementById('checkoutServiceTitle').innerText = pkg.title;
    document.getElementById('checkoutPkgBadgeName').innerText = `${currentPlatform.toUpperCase()} Service`;
    document.getElementById('checkoutBadge').innerText = pkg.badge;

    const platformIcons = {
        instagram: '<i class="fa-brands fa-instagram"></i>',
        facebook: '<i class="fa-brands fa-facebook"></i>',
        youtube: '<i class="fa-brands fa-youtube"></i>',
        tiktok: '<i class="fa-brands fa-tiktok"></i>'
    };
    
    document.getElementById('checkoutPlatformIcon').innerHTML = platformIcons[currentPlatform];

    // Toggle Custom Qty Field
    const customQtyBox = document.getElementById('customQtyBox');
    if (pkg.isCustom) {
        customQtyBox.classList.remove('hidden');
        document.getElementById('customQtyInput').value = 100;
        updateCheckoutQuantityDisplay();
    } else {
        customQtyBox.classList.add('hidden');
        document.getElementById('checkoutUnitsText').innerText = `Quantity: ${pkg.qty} Units`;
        document.getElementById('checkoutPriceText').innerText = `₹${pkg.price}`;
        generateUpiQrCode(pkg.price);
    }

    // Unhide Overlay
    document.getElementById('checkoutPage').classList.remove('hidden');
}

// Close Checkout Overlay
function closeCheckoutOverlay() {
    document.getElementById('checkoutPage').classList.add('hidden');
}

// Update Dynamic Price on Custom Quantity Input
function updateCheckoutQuantityDisplay() {
    if (!currentCheckoutData.isCustom) return;

    const qtyInput = document.getElementById('customQtyInput');
    let qty = parseInt(qtyInput.value) || 0;

    if (qty < 10) qty = 10;

    const calculatedPrice = (qty * currentCheckoutData.unitPrice).toFixed(2);
    currentCheckoutData.price = calculatedPrice;
    currentCheckoutData.quantity = qty;

    document.getElementById('checkoutUnitsText').innerText = `Quantity: ${qty} Custom Units`;
    document.getElementById('checkoutPriceText').innerText = `₹${calculatedPrice}`;

    generateUpiQrCode(calculatedPrice);
}

// UPI Dynamic QR Generator
function generateUpiQrCode(amount) {
    const upiId = "rajsmmpanel@upi"; // Default Merchant UPI
    const name = "Raj SMM Panel";
    const upiString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
    
    const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;
    document.getElementById('checkoutQrImg').src = qrImgUrl;
}

// Switch Payment Method (UPI vs Binance)
function switchPaymentMethod(method) {
    document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('upiPayBox').classList.add('hidden');
    document.getElementById('binancePayBox').classList.add('hidden');

    if (method === 'upi') {
        document.getElementById('tabUpi').classList.add('active');
        document.getElementById('upiPayBox').classList.remove('hidden');
    } else {
        document.getElementById('tabBinance').classList.add('active');
        document.getElementById('binancePayBox').classList.remove('hidden');
    }
}

// Submit Order via WhatsApp Redirect
function submitOrderToWhatsApp() {
    const target = document.getElementById('targetInput').value.trim();
    if (!target) {
        alert('Please enter your Profile Link or Username!');
        return;
    }

    const adminPhoneNumber = "910000000000";
    const message = `🚀 *NEW ORDER PLACED* 🚀\n\n` +
        `• *Platform:* ${currentCheckoutData.platform.toUpperCase()}\n` +
        `• *Service:* ${currentCheckoutData.title}\n` +
        `• *Quantity:* ${currentCheckoutData.quantity}\n` +
        `• *Total Price:* ₹${currentCheckoutData.price}\n` +
        `• *Target Link:* ${target}\n\n` +
        `✅ *I have completed the payment. Please process my order!*`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${adminPhoneNumber}?text=${encodedMsg}`, '_blank');
}

// Auth Modal Functions
function openAuthModal() {
    document.getElementById('authModalOverlay').classList.remove('hidden');
}

function closeAuthModal() {
    document.getElementById('authModalOverlay').classList.add('hidden');
}

function handleAuthSubmit() {
    const phone = document.getElementById('authPhone').value;
    const pass = document.getElementById('authPassword').value;

    if (!phone || !pass) {
        alert('Please fill in all fields!');
        return;
    }

    alert('Logged in successfully!');
    closeAuthModal();
}
