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

        @media screen and (max-width: 768px) {
            /* 2. Checkout Ultra-Compact Vertical Height */
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
            #checkoutPage p, #checkoutPage label { 
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
// NAVIGATION FIX FOR LOGIN / CREATE ACCOUNT
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
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

const serviceData = {
    instagram: {
        "Followers Non-Drop": [
            {
                type: "custom",
                name: "Instagram Followers [High Quality] 100% Non-Drop -500K+ Per Day- 10 Minutes Start",
                providerId: 1192,
                pricePer1000: 80
            }
        ],
        "Followers": [
            { name: "200 Followers", price: 20, badge: "Starter", badgeClass: "badge-demo" },
            { name: "1K Followers", price: 50 },
            { name: "2K Followers", price: 90 },
            { name: "3K Followers", price: 129, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "4K Followers", price: 165 },
            { name: "5K Followers", price: 199, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "6K Followers", price: 239 },
            { name: "7K Followers", price: 279 },
            { name: "8K Followers", price: 319 },
            { name: "9K Followers", price: 359 },
            { name: "10K Followers", price: 399, badge: "🎁 BUY 10K + GET 2K FREE", badgeClass: "badge-super" }
        ],
        "Likes Non-Drop": [
            { providerId: 675, name: "100 Likes", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { providerId: 675, name: "500 Likes", price: 25 },
            { providerId: 675, name: "1K Likes", price: 30, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { providerId: 675, name: "3K Likes", price: 69 },
            { providerId: 675, name: "5K Likes", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { providerId: 675, name: "10K Likes", price: 179, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "REAL Reels / Video Views Non-Drop": [
            { providerId: 853, name: "1K Views", price: 5, badge: "DEMO", badgeClass: "badge-demo", desc: "Indian views premium quality" },
            { providerId: 853, name: "5K Views", price: 9, desc: "Indian views premium quality" },
            { providerId: 853, name: "10K Views", price: 15, badge: "BEST VALUE", badgeClass: "badge-best", desc: "Indian views premium quality" },
            { providerId: 853, name: "20K Views", price: 25, desc: "Indian views premium quality" },
            { providerId: 853, name: "50K Views", price: 55, desc: "Indian views premium quality" },
            { providerId: 853, name: "100K Views", price: 99, badge: "🔥 BEST SELLER", badgeClass: "badge-best", desc: "Indian views premium quality" },
            { providerId: 853, name: "500K Views", price: 299, desc: "Indian views premium quality" },
            { providerId: 853, name: "1M Views", price: 499, badge: "💥 MEGA DEAL", badgeClass: "badge-best", desc: "Indian views premium quality" }
        ],
        "REAL Photo / Post Views Non-Drop": [
            { providerId: 1030, name: "1K Views", price: 10, badge: "🎯 Demo", badgeClass: "badge-demo", desc: "High quality Indian views" },
            { providerId: 1030, name: "3K Views", price: 15, desc: "High quality Indian views" },
            { providerId: 1030, name: "5K Views", price: 25, desc: "High quality Indian views" },
            { providerId: 1030, name: "10K Views", price: 40, badge: "🔥 Best Value", badgeClass: "badge-best", desc: "High quality Indian views" },
            { providerId: 1030, name: "30K Views", price: 79, desc: "High quality Indian views" },
            { providerId: 1030, name: "50K Views", price: 119, desc: "High quality Indian views" },
            { providerId: 1030, name: "100K Views", price: 220, badge: "👑 Most Popular", badgeClass: "badge-best", desc: "High quality Indian views" }
        ],
        "REAL Comments Non-Drop": [
            { providerId: 31, name: "50 Comments", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { providerId: 31, name: "100 Comments", price: 20 },
            { providerId: 31, name: "500 Comments", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { providerId: 31, name: "1K Comments", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" }
        ],
        "REAL Repost Non-Drop": [
            { providerId: 505, name: "50 Reposts", price: 15, badge: "Starter", badgeClass: "badge-demo", desc: "Indian repost high premium quality" },
            { providerId: 505, name: "100 Reposts", price: 20, desc: "Indian repost high premium quality" },
            { providerId: 505, name: "500 Reposts", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular", desc: "Indian repost high premium quality" },
            { providerId: 505, name: "1K Reposts", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best", desc: "Indian repost high premium quality" },
            { providerId: 505, name: "3K Reposts", price: 249, badge: "👑 Most Popular", badgeClass: "badge-best", desc: "Indian repost high premium quality" }
        ],
        "REAL Shares Non-Drop": [
            { providerId: 50, name: "100 Shares", price: 5, badge: "Starter", badgeClass: "badge-demo", desc: "Premium quality Indian share" },
            { providerId: 50, name: "1K Shares", price: 30, desc: "Premium quality Indian share" },
            { providerId: 50, name: "5K Shares", price: 69, badge: "🔥 Best Value", badgeClass: "badge-best", desc: "Premium quality Indian share" },
            { providerId: 50, name: "10K Shares", price: 99, badge: "👑 Most Popular", badgeClass: "badge-best", desc: "Premium quality Indian share" }
        ],
        "🔥 Reels Combo Service": [
            {
                name: "Reels Viral Package",
                price: 99,
                badge: "10% OFF",
                badgeClass: "badge-best",
                subtitle: "First delivery Indian high quality",
                features: [
                    "👁️ Reels Views — 12,000",
                    "❤️ Reels Likes — 2,000",
                    "💬 Reels Comments — 50",
                    "💾 Post / Reels Save — 500",
                    "🔄 Post / Reels Shares — 1,000",
                    "♻️ Reels Reposts — 100"
                ],
                placeholder: "Reel/Video Link (Account Must be Public)"
            },
            {
                name: "Reels Viral Package",
                price: 199,
                badge: "20% OFF",
                badgeClass: "badge-best",
                subtitle: "First delivery Indian high quality",
                features: [
                    "👁️ Reels Views — 30,000",
                    "❤️ Reels Likes — 4,000",
                    "💬 Reels Comments — 100",
                    "💾 Post / Reels Save — 1,000",
                    "🔄 Post / Reels Shares — 3,000",
                    "♻️ Reels Reposts — 250"
                ],
                placeholder: "Reel/Video Link (Account Must be Public)"
            },
            {
                name: "Reels Viral Package",
                price: 299,
                badge: "30% OFF",
                badgeClass: "badge-best",
                subtitle: "First delivery Indian high quality",
                features: [
                    "👁️ Reels Views — 50,000",
                    "❤️ Reels Likes — 8,000",
                    "💬 Reels Comments — 300",
                    "💾 Post / Reels Save — 1,500",
                    "🔄 Post / Reels Shares — 5,000",
                    "♻️ Reels Reposts — 400"
                ],
                placeholder: "Reel/Video Link (Account Must be Public)"
            },
            {
                name: "Reels Viral Package",
                price: 399,
                badge: "40% OFF",
                badgeClass: "badge-best",
                subtitle: "First delivery Indian high quality",
                features: [
                    "👁️ Reels Views — 70,000",
                    "❤️ Reels Likes — 11,000",
                    "💬 Reels Comments — 400",
                    "💾 Post / Reels Save — 2,000",
                    "🔄 Post / Reels Shares — 8,000",
                    "♻️ Reels Reposts — 600"
                ],
                placeholder: "Reel/Video Link (Account Must be Public)"
            },
            {
                name: "Reels Viral Package",
                price: 499,
                badge: "50% OFF",
                badgeClass: "badge-best",
                subtitle: "First delivery Indian high quality",
                features: [
                    "👁️ Reels Views — 100,000",
                    "❤️ Reels Likes — 18,000",
                    "💬 Reels Comments — 600",
                    "💾 Post / Reels Save — 2,500",
                    "🔄 Post / Reels Shares — 15,000",
                    "♻️ Reels Reposts — 800"
                ],
                placeholder: "Reel/Video Link (Account Must be Public)"
            }
        ]
    },
    facebook: {
        "Facebook Followers": [
            { type: "custom", name: "Facebook Followers", pricePer1000: 49 }
        ],
        "Likes Non-Drop": [
            { name: "100 Likes", price: 10, badge: "STARTER", badgeClass: "badge-demo" },
            { name: "500 Likes", price: 25 },
            { name: "1K Likes", price: 39, badge: "⭐ POPULAR", badgeClass: "badge-popular" },
            { name: "3K Likes", price: 69 },
            { name: "5K Likes", price: 99, badge: "🔥 BEST VALUE", badgeClass: "badge-best" },
            { name: "10K Likes", price: 179, badge: "👑 MOST POPULAR", badgeClass: "badge-best" }
        ],
        "Reels / Video Views Non-Drop": [
            { name: "1K Views", price: 10, badge: "STARTER", badgeClass: "badge-demo" },
            { name: "3K Views", price: 25 },
            { name: "5K Views", price: 35, badge: "⭐ POPULAR", badgeClass: "badge-popular" },
            { name: "10K Views", price: 60 },
            { name: "50K Views", price: 249, badge: "🔥 BEST VALUE", badgeClass: "badge-best" },
            { name: "100K Views", price: 449, badge: "👑 MOST POPULAR", badgeClass: "badge-best" }
        ],
        "POST / VIDEO Comments Non-Drop": [
            { name: "50 Comments", price: 10 },
            { name: "100 Comments", price: 15 },
            { name: "300 Comments", price: 25, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "500 Comments", price: 39, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "1K Comments", price: 60 },
            { name: "2K Comments", price: 110, badge: "🏆 Best Deal", badgeClass: "badge-best" },
            { name: "5K Comments", price: 260, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "POST / VIDEO Shares Non-Drop": [
            { name: "100 Shares", price: 15 },
            { name: "1K Shares", price: 25 },
            { name: "5K Shares", price: 59, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "10K Shares", price: 89, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "20K Shares", price: 149, badge: "🏆 Best Deal", badgeClass: "badge-best" },
            { name: "100K Shares", price: 399, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ]
    },
    youtube: {
        "YouTube Likes — Non Drop": [
            { name: "100 Real Likes", price: 49, desc: "Indian Real Active High Quality" },
            { name: "500 Real Likes", price: 149, desc: "Indian Real Active High Quality" },
            { name: "1K Real Likes", price: 249, desc: "Indian Real Active High Quality" },
            { name: "3K Real Likes", price: 499, desc: "Indian Real Active High Quality" },
            { name: "5K Real Likes", price: 949, desc: "Indian Real Active High Quality" }
        ],
        "YT Shorts / Video Views Non-Drop": [
            { name: "100 Short Video Views", price: 49, desc: "Indian High Quality" },
            { name: "500 Short Video Views", price: 90, desc: "Indian High Quality" },
            { name: "1K Short Video Views", price: 179, desc: "Indian High Quality" },
            { name: "3K Short Video Views", price: 449, desc: "Indian High Quality" },
            { name: "5K Short Video Views", price: 749, desc: "Indian High Quality" },
            { name: "7K Short Video Views", price: 999, desc: "Indian High Quality" },
            { name: "10K Short Video Views", price: 1499, desc: "Indian High Quality" }
        ],
        "YT Live Stream Views Non-Drop": [
            { name: "1K Live Stream Views — 15 Mins", price: 25, desc: "Live Views for 15 Minutes" },
            { name: "1K Live Stream Views — 30 Mins", price: 40, desc: "Live Views for 30 Minutes" },
            { name: "1K Live Stream Views — 60 Mins", price: 70, desc: "Live Views for 60 Minutes" },
            { name: "1K Live Stream Views — 90 Mins", price: 99, desc: "Live Views for 90 Minutes" }
        ],
        "YouTube Subscribe — Non Drop": [
            { name: "100 Subscribers", price: 249, desc: "High Quality Indian Subscribers" },
            { name: "500 Subscribers", price: 1199, desc: "High Quality Indian Subscribers" },
            { name: "1K Subscribers", price: 2349, desc: "High Quality Indian Subscribers" }
        ]
    },
    tiktok: {
        "TikTok Followers": [
            { name: "100 TikTok Followers", price: 20, desc: "90 Days Refill" },
            { name: "500 TikTok Followers", price: 90, desc: "90 Days Refill" },
            { name: "1K TikTok Followers", price: 179, desc: "90 Days Refill" },
            { name: "5K TikTok Followers", price: 799, desc: "90 Days Refill" },
            { name: "10K TikTok Followers", price: 1599, desc: "90 Days Refill" }
        ],
        "TikTok Likes Non-Drop": [
            { name: "100 TikTok Likes", price: 10, desc: "Lifetime Auto Refill" },
            { name: "500 TikTok Likes", price: 40, desc: "Lifetime Auto Refill" },
            { name: "1K TikTok Likes", price: 75, desc: "Lifetime Auto Refill" },
            { name: "3K TikTok Likes", price: 199, desc: "Lifetime Auto Refill" },
            { name: "5K TikTok Likes", price: 349, desc: "Lifetime Auto Refill" }
        ],
        "TikTok Views Non-Drop": [
            { name: "100 TikTok Video Views", price: 9, desc: "High Quality Real Views • Lifetime Refill" },
            { name: "500 TikTok Video Views", price: 20, desc: "High Quality Real Views • Lifetime Refill" },
            { name: "1K TikTok Video Views", price: 35, desc: "High Quality Real Views • Lifetime Refill" },
            { name: "5K TikTok Video Views", price: 119, desc: "High Quality Real Views • Lifetime Refill" },
            { name: "10K TikTok Video Views", price: 249, desc: "High Quality Real Views • Lifetime Refill" }
        ]
    }
};

// Global Application State
let currentPlatform = "instagram";
let currentCategory = "";
let selectedPackage = null;
let currentCheckoutData = {};

window.onload = function () {
    switchPlatform("instagram");
};

window.addEventListener('popstate', function () {
    const checkoutPage = document.getElementById("checkoutPage");
    if (checkoutPage && (checkoutPage.style.display === "block" || !checkoutPage.classList.contains("hidden"))) {
        closeCheckoutUI();
    }
});

function switchPlatform(platform) {
    currentPlatform = platform;
    selectedPackage = null;

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
    if (categories.length === 0) return;
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
    selectedPackage = null;

    const packages = serviceData[currentPlatform]?.[currentCategory] || [];
    const iconClassMap = {
        facebook: "fa-facebook",
        youtube: "fa-youtube",
        tiktok: "fa-tiktok",
        instagram: "fa-instagram"
    };
    const iconClass = iconClassMap[currentPlatform] || "fa-instagram";

    packages.forEach((pkg) => {
        if (pkg.type === "custom") {
            const customDiv = document.createElement("div");
            customDiv.className = "custom-card";

            customDiv.innerHTML = `
                <div style="margin-bottom: 8px;">
                    <strong class="custom-title" style="color: #a855f7; font-size: 13px;">
                        ${pkg.name} (Custom Qty)
                    </strong>
                    <p style="font-size: 10px; color: #94a3b8;">
                        Rate: ₹${pkg.pricePer1000 || 0} per 1000 Qty
                    </p>
                </div>

                <div class="input-box">
                    <input
                        type="number"
                        id="customQtyInput"
                        placeholder="Min 100 (e.g. 1000)"
                        min="100"
                        oninput="calculateCustomPrice('${pkg.name}', ${pkg.pricePer1000 || 0}, ${pkg.providerId || "null"})"
                    >
                </div>

                <div style="font-size: 11px; color: #ef4444; margin-top: 4px; display: none;" id="customMinWarning">
                    ⚠️ Minimum Quantity is 100!
                </div>

                <div style="font-size: 12px; font-weight: 800; color: #22c55e; margin-top: 5px;" id="customPriceDisplay">
                    Total: ₹<span id="customCalcPrice">0.00</span> INR
                </div>

                <button class="action-btn" style="margin-top: 10px; width: 100%; padding: 8px; background: #22c55e; color: #fff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;" onclick="openCheckoutFromCustom()">
                    Proceed to Payment
                </button>
            `;

            packageList.appendChild(customDiv);
        } else if (currentCategory === "🔥 Reels Combo Service") {
            const card = document.createElement("div");
            card.className = "pkg-card";
            card.style.cssText = "display: flex; flex-direction: column; align-items: stretch; padding: 16px; margin-bottom: 12px; background: #fff5f7; border: 1px solid rgba(236, 72, 153, 0.2); border-radius: 12px; backdrop-filter: blur(10px);";

            card.onclick = function () {
                const platformCap = currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1);
                openCheckoutForFixed(
                    platformCap,
                    currentCategory,
                    pkg.name + " — ₹" + pkg.price,
                    1,
                    pkg.price,
                    pkg.badge || 'Popular'
                );
            };

            let featuresHtml = "";
            if (pkg.features && pkg.features.length) {
                featuresHtml = `<div style="margin: 10px 0; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #475569;">`;
                pkg.features.forEach(feat => {
                    featuresHtml += `<div>${feat}</div>`;
                });
                featuresHtml += `</div>`;
            }

            const comboSubText = pkg.subtitle ? pkg.subtitle : "⚡ Fast Delivery • Premium Quality";

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="pkg-icon" style="width: 36px; height: 36px; background: rgba(168, 85, 247, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #a855f7;">
                            <i class="fa-brands ${iconClass}"></i>
                        </div>
                        <div>
                            <div class="pkg-title" style="font-weight: 700; font-size: 15px; color: #1e293b;">
                                ${pkg.name}
                            </div>
                            <span class="pkg-sub" style="font-size: 11px; color: #64748b;">
                                ${comboSubText}
                            </span>
                        </div>
                    </div>
                    <div>
                        ${pkg.badge ? `<span class="pkg-badge ${pkg.badgeClass || "badge-popular"}" style="background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%); color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 800;">${pkg.badge}</span>` : ""}
                    </div>
                </div>

                ${featuresHtml}

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid rgba(0, 0, 0, 0.08); padding-top: 8px;">
                    <div style="font-size: 16px; font-weight: 800; color: #16a34a;">
                        ₹${pkg.price}
                    </div>
                    <button style="background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%); color: #fff; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer;">
                        Order This Combo →
                    </button>
                </div>
            `;

            packageList.appendChild(card);
        } else {
            const card = document.createElement("div");
            card.className = "pkg-card";

            card.onclick = function () {
                const qty = extractQuantity(pkg.name);
                const platformCap = currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1);
                openCheckoutForFixed(
                    platformCap,
                    currentCategory,
                    pkg.name,
                    qty,
                    pkg.price,
                    pkg.badge || 'Popular'
                );
            };

            const subtitleText = pkg.desc ? pkg.desc : "⚡ Fast Delivery • Premium Quality";

            card.innerHTML = `
                <div class="pkg-left">
                    <div class="pkg-icon">
                        <i class="fa-brands ${iconClass}"></i>
                    </div>

                    <div class="pkg-info">
                        <div class="pkg-title">
                            ${pkg.name}
                            ${pkg.badge ? `<span class="pkg-badge ${pkg.badgeClass || "badge-popular"}">${pkg.badge}</span>` : ""}
                        </div>
                        <span class="pkg-sub">
                            ${subtitleText}
                        </span>
                    </div>
                </div>

                <div class="pkg-price-btn">
                    ₹${pkg.price}
                </div>
            `;

            packageList.appendChild(card);
        }
    });
}

function calculateCustomPrice(serviceName, ratePer1000, providerId) {
    const qtyInput = document.getElementById("customQtyInput");
    const qty = parseInt(qtyInput ? qtyInput.value : 0) || 0;
    const calcPriceSpan = document.getElementById("customCalcPrice");
    const minWarning = document.getElementById("customMinWarning");

    if (qty > 0 && qty < 100) {
        if (minWarning) minWarning.style.display = "block";
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
        selectedPackage = null;
    } else if (qty >= 100) {
        if (minWarning) minWarning.style.display = "none";
        const total = (qty / 1000) * ratePer1000;
        if (calcPriceSpan) calcPriceSpan.innerText = total.toFixed(2);

        selectedPackage = {
            name: `${qty.toLocaleString()} ${serviceName}`,
            price: total,
            providerId: providerId,
            quantity: qty,
            category: currentCategory
        };
    } else {
        if (minWarning) minWarning.style.display = "none";
        if (calcPriceSpan) calcPriceSpan.innerText = "0.00";
        selectedPackage = null;
    }
}

function extractQuantity(name) {
    const text = name.toUpperCase().replace(/,/g, "");
    const match = text.match(/(\d+(?:\.\d+)?)\s*(M|K)?/);
    if (!match) return 0;

    let number = parseFloat(match[1]);
    const unit = match[2];

    if (unit === "K") number = number * 1000;
    else if (unit === "M") number = number * 1000000;

    return Math.floor(number);
}

function getLinkConfig(platform, category) {
    const p = (platform || "").toLowerCase();
    const c = (category || "").toLowerCase();

    if (c.includes("reels combo service")) {
        return {
            label: "Reel/Video Link (Account Must be Public)",
            placeholder: "Reel/Video Link (Account Must be Public)"
        };
    }

    if (p === "youtube") {
        if (c.includes("subscribe")) {
            return {
                label: "YouTube Channel/Profile Link",
                placeholder: "https://www.youtube.com/@channelname"
            };
        } else if (c.includes("live")) {
            return {
                label: "YouTube Live Stream Link",
                placeholder: "https://www.youtube.com/watch?v=xxxxxx"
            };
        } else {
            return {
                label: "YouTube Video/Short Link",
                placeholder: "https://www.youtube.com/watch?v=xxxxxx"
            };
        }
    } else if (p === "tiktok") {
        if (c.includes("followers")) {
            return {
                label: "TikTok Profile Link",
                placeholder: "https://www.tiktok.com/@username"
            };
        } else {
            return {
                label: "TikTok Video Link",
                placeholder: "https://www.tiktok.com/@username/video/xxxxxx"
            };
        }
    } else if (p === "instagram") {
        if (c.includes("followers")) {
            return {
                label: "Profile Link (Account Must be Public)",
                placeholder: "https://instagram.com/your_username"
            };
        } else if (c.includes("reels") || c.includes("video")) {
            return {
                label: "Reel / Video Link",
                placeholder: "https://www.instagram.com/reel/xxxxxx"
            };
        } else {
            return {
                label: "Post / Reel Link",
                placeholder: "https://www.instagram.com/p/xxxxxx"
            };
        }
    } else if (p === "facebook") {
        if (c.includes("followers")) {
            return {
                label: "Profile / Page Link (Must be Public)",
                placeholder: "https://facebook.com/your_page_or_profile"
            };
        } else {
            return {
                label: "Post / Video Link",
                placeholder: "https://facebook.com/permalink.php?story_fbid=..."
            };
        }
    }

    return {
        label: "Profile Link (Account Must be Public)",
        placeholder: "https://instagram.com/your_username"
    };
}

function calculateDynamicPriceForQty(platformKey, categoryKey, totalQty, baseUnitQty, baseUnitPrice) {
    const platformData = serviceData[platformKey.toLowerCase()];
    if (!platformData || !platformData[categoryKey]) {
        return (totalQty / baseUnitQty) * baseUnitPrice;
    }

    const availablePackages = platformData[categoryKey]
        .filter(p => !p.type) 
        .map(p => ({
            qty: extractQuantity(p.name),
            price: p.price
        }))
        .filter(p => p.qty > 0)
        .sort((a, b) => b.qty - a.qty); 

    const exactMatch = availablePackages.find(p => p.qty === totalQty);
    if (exactMatch) {
        return exactMatch.price;
    }

    let remaining = totalQty;
    let totalPrice = 0;

    for (let pkg of availablePackages) {
        if (remaining >= pkg.qty) {
            let count = Math.floor(remaining / pkg.qty);
            totalPrice += count * pkg.price;
            remaining = remaining % pkg.qty;
        }
    }

    if (remaining > 0) {
        let smallestPkg = availablePackages[availablePackages.length - 1];
        if (smallestPkg) {
            totalPrice += (remaining / smallestPkg.qty) * smallestPkg.price;
        } else {
            totalPrice += (remaining / baseUnitQty) * baseUnitPrice;
        }
    }

    return totalPrice;
}

function openCheckoutForFixed(platform, serviceName, packageName, quantity, price, badge) {
    currentCheckoutData = {
        platform: platform,
        serviceName: serviceName,
        packageName: packageName,
        baseQuantity: quantity,
        quantity: quantity,
        basePrice: price,
        price: price,
        multiplier: 1,
        badge: badge || 'Popular'
    };

    showCheckoutOverlay();
}

function openCheckoutFromCustom() {
    const qtyInput = document.getElementById("customQtyInput");
    const qty = parseFloat(qtyInput ? qtyInput.value : 0);

    if (!qty || qty < 100) {
        alert("Minimum order quantity is 100!");
        return;
    }

    const calculatedPriceText = document.getElementById("customCalcPrice");
    const price = parseFloat(calculatedPriceText ? calculatedPriceText.innerText : 0);

    const platformCap = currentPlatform.charAt(0).toUpperCase() + currentPlatform.slice(1);

    currentCheckoutData = {
        platform: platformCap,
        serviceName: currentCategory,
        packageName: `${qty.toLocaleString()} Custom Qty`,
        baseQuantity: qty,
        quantity: qty,
        basePrice: price,
        price: price,
        multiplier: 1,
        badge: "Custom"
    };

    showCheckoutOverlay();
}

function updateCheckoutQuantityDisplay() {
    const d = currentCheckoutData;
    if (!d || !d.baseQuantity) return;
    
    d.quantity = d.baseQuantity * d.multiplier;

    d.price = calculateDynamicPriceForQty(
        d.platform,
        d.serviceName,
        d.quantity,
        d.baseQuantity,
        d.basePrice
    );

    const qtyCountDisplay = document.getElementById("checkoutQtyCount");
    if (qtyCountDisplay) qtyCountDisplay.innerText = d.multiplier;

    const unitsText = document.getElementById("checkoutUnitsText");
    if (unitsText) unitsText.innerText = `${d.quantity.toLocaleString()} Package`;

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

function triggerUpiPay(appType) {
    const d = currentCheckoutData;
    const upiId = "rajpanel@axl";
    const amount = d.price ? d.price.toFixed(2) : "0.00";
    const name = "RajSocialPanel";
    const note = encodeURIComponent(d.packageName || "Social Boost Service");

    let deepLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;

    if (appType === "paytm") {
        deepLink = `paytmmp://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    } else if (appType === "gpay") {
        deepLink = `tez://upi/pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    } else if (appType === "phonepe") {
        deepLink = `phonepe://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    }

    window.location.href = deepLink;

    setTimeout(() => {
        if (!document.hidden) {
            window.location.href = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
        }
    }, 1200);
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

    const priceCard = priceEl ? priceEl.parentElement : null;
    if (priceCard) {
        const subSpans = priceCard.querySelectorAll("span");
        if (subSpans && subSpans.length) {
            subSpans.forEach(s => {
                if (s.id !== "checkoutPriceText" && s.id !== "checkoutQtyCount") {
                    s.innerText = "You Pay";
                }
            });
        }
    }

    const allSummaryElements = document.querySelectorAll(".order-summary-box, #orderSummaryBox, [class*='summary']");
    allSummaryElements.forEach(el => {
        el.style.display = "none";
    });

    const linkConfig = getLinkConfig(d.platform, d.serviceName);
    const linkLabel = document.getElementById("checkoutLinkLabel");
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
        if (btnBinance) btnBinance.classList.add("active");
        if (btnUpi) btnUpi.classList.remove("active");
        if (viewBinance) viewBinance.classList.remove("hidden");
        if (viewUpi) viewUpi.classList.add("hidden");
    }
}

// Check standard URL validity
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Function to validate and process Profile Link / Username for Instagram
function processProfileOrLink(input, platform) {
    const trimmed = (input || "").trim();
    if (!trimmed) {
        return { isValid: false, message: "Please enter your Social Media Link or Username!" };
    }

    const isInsta = (platform || "").toLowerCase() === "instagram";

    if (isInsta) {
        const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/;
        const instaUrlRegex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]{1,30}\/?(\?.*)?$/i;

        // If user entered a plain username
        if (usernameRegex.test(trimmed)) {
            return {
                isValid: true,
                url: `https://www.instagram.com/${trimmed}`
            };
        }

        // If user entered a valid Instagram profile URL
        if (instaUrlRegex.test(trimmed)) {
            return {
                isValid: true,
                url: trimmed
            };
        }

        // Other Instagram URLs (Reels/Posts) or general HTTP URLs
        if (isValidUrl(trimmed) && trimmed.toLowerCase().includes("instagram.com")) {
            return {
                isValid: true,
                url: trimmed
            };
        }

        return {
            isValid: false,
            message: "Please enter a valid Instagram username or Instagram profile URL!"
        };
    } else {
        // Validation for other platforms
        if (!isValidUrl(trimmed) && !trimmed.includes("http")) {
            return {
                isValid: false,
                message: "Please enter a valid URL (starting with http:// or https://)"
            };
        }
        return {
            isValid: true,
            url: trimmed
        };
    }
}

function submitOrderToWhatsApp() {
    const linkInput = document.getElementById("checkoutLinkInput");
    const txnInput = document.getElementById("checkoutTxnId");

    const rawLink = linkInput ? linkInput.value.trim() : "";
    const txnId = txnInput ? txnInput.value.trim() : "";

    const validation = processProfileOrLink(rawLink, currentCheckoutData.platform);
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
    const newOrder = {
        orderId: orderIdVal,
        serviceName: `${currentCheckoutData.platform} - ${currentCheckoutData.serviceName} (${currentCheckoutData.packageName})`,
        link: link,
        quantity: currentCheckoutData.quantity || 0,
        amount: currentCheckoutData.price ? currentCheckoutData.price.toFixed(2) : "0.00",
        orderTimeEpoch: Date.now(),
        status: 'Pending',
        userIdentifier: userIdentifier
    };

    const existingOrders = JSON.parse(localStorage.getItem('raj_smm_orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('raj_smm_orders', JSON.stringify(existingOrders));

    const isUpi = document.getElementById("btnTabUpi") ? document.getElementById("btnTabUpi").classList.contains("active") : true;
    const payMethod = isUpi ? "UPI QR Code" : "Binance Pay";
    const whatsappNumber = "919239628344";

    const d = currentCheckoutData;

    const formattedMessage = 
        `🚀 *NEW ORDER SUBMITTED* 🚀\n\n` +
        `🆔 *Order ID:* #${orderIdVal}\n` +
        `📌 *Social Media:* ${d.platform || ''}\n` +
        `🛠️ *Service Name:* ${d.serviceName || ''}\n` +
        `📦 *Package:* ${d.packageName || ''}\n` +
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

    if (
        currentPlatform === "instagram" &&
        currentCategory === "Followers Non-Drop" &&
        deferredPrompt
    ) {
        installContainer.style.display = "block";
    } else {
        installContainer.style.display = "none";
    }
}

const installBtn = document.getElementById("installBtn");
if (installBtn) {
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            toggleInstallButton();
        }
    });
}

window.addEventListener("appinstalled", () => {
    const installContainer = document.getElementById("installContainer");
    if (installContainer) {
        installContainer.style.display = "none";
    }
    deferredPrompt = null;
});

async function submitOrderWithWallet() {
    const linkInput = document.getElementById("checkoutLinkInput");
    const walletBtn = document.getElementById("submitWalletBtn");
    const rawLink = linkInput ? linkInput.value.trim() : "";
    const orderAmount = currentCheckoutData.price;

    const validation = processProfileOrLink(rawLink, currentCheckoutData.platform);
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    const link = validation.url;

    if (typeof firebase === 'undefined' || !firebase.auth) {
        alert("Authentication system unavailable.");
        return;
    }

    const auth = firebase.auth();
    const user = auth.currentUser;
    if (!user) {
        alert("Please login to use Wallet System.");
        return;
    }

    if (walletBtn) walletBtn.disabled = true;

    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);

    try {
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) throw new Error("User account not found!");

            const userData = userDoc.data();
            const balance = userData.walletBalance || 0;

            if (balance < orderAmount) {
                throw new Error("Insufficient Wallet Balance. Please Add Funds first.");
            }

            transaction.update(userRef, {
                walletBalance: balance - orderAmount,
                totalSpent: (userData.totalSpent || 0) + orderAmount
            });

            const txRef = db.collection('walletTransactions').doc();
            transaction.set(txRef, {
                uid: user.uid,
                type: 'DEBIT',
                amount: orderAmount,
                description: `Order: ${currentCheckoutData.packageName}`,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        alert("Order placed successfully using Wallet Balance!");
        closeCheckoutUI();

    } catch (error) {
        alert("Error: " + (error.message || error));
    } finally {
        if (walletBtn) walletBtn.disabled = false;
    }
}
