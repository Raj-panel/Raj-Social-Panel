// Services Data
const servicesData = {
  instagram: {
    "Instagram Followers": [
      {
        id: 101,
        name: "Instagram Followers [High Quality]",
        pricePer1k: 0.00,
        min: 100,
        max: 50000,
        refill: "30 Days Refill",
        drop: "Low Drop",
        quality: "Real Profiles",
        speed: "10K/Day",
        description: "High quality Instagram followers with non-drop guarantee."
      }
    ]
  },
  facebook: {
    "Facebook Followers": [
      {
        id: 201,
        name: "Facebook Page Followers",
        pricePer1k: 0.00,
        min: 100,
        max: 50000,
        refill: "30 Days Refill",
        drop: "Low Drop",
        quality: "Real Profiles",
        speed: "2K/Day",
        description: "High quality page followers and likes."
      }
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
