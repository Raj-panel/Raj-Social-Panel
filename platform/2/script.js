// Services Data
const servicesData = {
    instagram: {
        "Followers Non-Drop": [
            { type: "custom", name: "Instagram Non-Drop Followers", pricePer1000: 80 }
        ],
        "Followers": [
            { name: "1K Followers", price: 50, badge: "Starter", badgeClass: "badge-demo" },
            { name: "2K Followers", price: 90 },
            { name: "3K Followers", price: 129, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "4K Followers", price: 165 },
            { name: "5K Followers", price: 199, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "6K Followers", price: 239 },
            { name: "7K Followers", price: 279 },
            { name: "8K Followers", price: 319 },
            { name: "9K Followers", price: 359 },
            { name: "10K Followers", price: 399, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "Likes Lifetime": [
            { name: "100 Likes", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "500 Likes", price: 25, badge: "Real", badgeClass: "badge-real" },
            { name: "1K Likes", price: 30, badge: "Fast", badgeClass: "badge-popular" },
            { name: "3K Likes", price: 69, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "5K Likes", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "10K Likes", price: 179, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "Reels / Video Views": [
            { name: "1K Views", price: 10, badge: "DEMO", badgeClass: "badge-demo" },
            { name: "5K Views", price: 20, badge: "STARTER", badgeClass: "badge-real" },
            { name: "10K Views", price: 30, badge: "BEST VALUE", badgeClass: "badge-best" },
            { name: "20K Views", price: 40, badge: "POPULAR", badgeClass: "badge-popular" },
            { name: "50K Views", price: 70, badge: "RECOMMENDED", badgeClass: "badge-best" },
            { name: "100K Views", price: 99, badge: "🔥 BEST SELLER", badgeClass: "badge-best" },
            { name: "500K Views", price: 299, badge: "👑 MOST POPULAR", badgeClass: "badge-best" },
            { name: "1M Views", price: 499, badge: "💥 MEGA DEAL", badgeClass: "badge-best" }
        ],
        "Comments Lifetime": [
            { name: "50 Comments", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "100 Comments", price: 20, badge: "Real", badgeClass: "badge-real" },
            { name: "500 Comments", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "1K Comments", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" }
        ],
        "Repost Lifetime": [
            { name: "50 Reposts", price: 15, badge: "Starter", badgeClass: "badge-demo" },
            { name: "100 Reposts", price: 20, badge: "Real", badgeClass: "badge-real" },
            { name: "500 Reposts", price: 59, badge: "⭐ Popular", badgeClass: "badge-popular" },
            { name: "1K Reposts", price: 99, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "3K Reposts", price: 249, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ],
        "Shares Lifetime": [
            { name: "100 Shares", price: 10, badge: "Starter", badgeClass: "badge-demo" },
            { name: "1K Shares", price: 30, badge: "Fast", badgeClass: "badge-popular" },
            { name: "5K Shares", price: 69, badge: "🔥 Best Value", badgeClass: "badge-best" },
            { name: "10K Shares", price: 99, badge: "👑 Most Popular", badgeClass: "badge-best" }
        ]
    },
    facebook: {
        "Facebook Followers": [
            { type: "custom", name: "Facebook Followers", pricePer1000: 49 }
        ],
        "Likes Non-Drop": [
            { name: "100 Likes", price: 10, badge: "STARTER", badgeClass: "badge-demo" },
            { name: "500 Likes", price: 25, badge: "REAL", badgeClass: "badge-real" },
            { name: "1K Likes", price: 39, badge: "FAST", badgeClass: "badge-popular" },
            { name: "3K Likes", price: 69, badge: "⭐ POPULAR", badgeClass: "badge-popular" },
            { name: "5K Likes", price: 99, badge: "🔥 BEST VALUE", badgeClass: "badge-best" },
            { name: "10K Likes", price: 179, badge: "👑 MOST POPULAR", badgeClass: "badge-best" }
        ],
        "Reels / Video Views": [
            { name: "1K Views", price: 10, badge: "STARTER", badgeClass: "badge-demo" },
            { name: "3K Views", price: 25 },
            { name: "5K Views", price: 35, badge: "⭐ POPULAR", badgeClass: "badge-popular" },
            { name: "10K Views", price: 60 },
            { name: "50K Views", price: 249, badge: "🔥 BEST VALUE", badgeClass: "badge-best" },
            { name: "100K Views", price: 449, badge: "👑 MOST POPULAR", badgeClass: "badge-best" }
        ]
    }
};

let currentPlatform = 'instagram';

// Dark / Light Theme Logic
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

// Platform Switcher
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
    opt.textContent = s.name;
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

  document.getElementById('dName').textContent = s.name;
  document.getElementById('dPrice').textContent = `₹${s.pricePer1k.toFixed(2)}`;
  document.getElementById('dRefill').textContent = s.refill;
  document.getElementById('dDrop').textContent = s.drop;
  document.getElementById('dQuality').textContent = s.quality;
  document.getElementById('dSpeed').textContent = s.speed;
  document.getElementById('dDesc').textContent = s.description;

  document.getElementById('minMaxText').textContent = `Min: ${s.min} | Max: ${s.max.toLocaleString()}`;
  document.getElementById('quantity').value = s.min;

  calculateTotal();
}

function calculateTotal() {
  const s = getActiveService();
  if(!s) return;

  const qty = parseInt(document.getElementById('quantity').value) || 0;
  const total = (qty / 1000) * s.pricePer1k;
  document.getElementById('totalPrice').textContent = `₹${total.toFixed(2)}`;
}

function placeOrder() {
  const link = document.getElementById('targetLink').value;
  if(!link) {
    alert('Please enter a target link!');
    return;
  }
  alert('Order placed successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCategories();
});
