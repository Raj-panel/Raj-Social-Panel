// ===============================================
// SERVICE DATA CONFIGURATION (এখানে পরবর্তীতে Price পরিবর্তন করবেন)
// ===============================================
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
      },
      {
        id: 102,
        name: "Instagram Followers [Instant]",
        pricePer1k: 0.00,
        min: 500,
        max: 100000,
        refill: "60 Days Refill",
        drop: "Zero Drop",
        quality: "HQ Premium",
        speed: "Instant",
        description: "Instant delivery followers for fast growth."
      }
    ],
    "Instagram Likes": [
      {
        id: 103,
        name: "Instagram Likes [Real Users]",
        pricePer1k: 0.00,
        min: 50,
        max: 20000,
        refill: "No Refill",
        drop: "Non Drop",
        quality: "Active Users",
        speed: "Super Fast",
        description: "Instant high-quality likes on your posts."
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
        quality: "High Retention",
        speed: "100K/Hour",
        description: "Boost video/reel ranking rapidly."
      }
    ],
    "Instagram Comments": [
      {
        id: 105,
        name: "Instagram Custom Comments",
        pricePer1k: 0.00,
        min: 10,
        max: 500,
        refill: "N/A",
        drop: "No Drop",
        quality: "Custom Text",
        speed: "Fast",
        description: "Provide your own custom comments."
      }
    ],
    "Instagram Shares": [
      {
        id: 106,
        name: "Instagram Post Shares",
        pricePer1k: 0.00,
        min: 100,
        max: 10000,
        refill: "N/A",
        drop: "No Drop",
        quality: "Real Accounts",
        speed: "Fast",
        description: "Increase content reach and explore visibility."
      }
    ],
    "Instagram Repost": [
      {
        id: 107,
        name: "Instagram Content Repost",
        pricePer1k: 0.00,
        min: 10,
        max: 200,
        refill: "N/A",
        drop: "No Drop",
        quality: "Organic",
        speed: "1-2 Hours",
        description: "Get real users to share/repost your content."
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
    ],
    "Facebook Likes": [
      {
        id: 202,
        name: "Facebook Post Likes / Reactions",
        pricePer1k: 0.00,
        min: 100,
        max: 20000,
        refill: "No Refill",
        drop: "Non Drop",
        quality: "Mixed Reactions",
        speed: "Instant",
        description: "Post reactions including Like, Love, etc."
      }
    ],
    "Facebook Views": [
      {
        id: 203,
        name: "Facebook Video Views",
        pricePer1k: 0.00,
        min: 1000,
        max: 500000,
        refill: "Non Drop",
        drop: "Zero Drop",
        quality: "Monetizable",
        speed: "50K/Day",
        description: "Safe views for video watch time."
      }
    ],
    "Facebook Comments": [
      {
        id: 204,
        name: "Facebook Custom Comments",
        pricePer1k: 0.00,
        min: 10,
        max: 500,
        refill: "N/A",
        drop: "No Drop",
        quality: "Positive English",
        speed: "Natural",
        description: "Custom comments on posts/photos."
      }
    ]
  }
};

let currentPlatform = 'instagram';

function switchPlatform(platform) {
  currentPlatform = platform;
  document.getElementById('tab-instagram').classList.toggle('active', platform === 'instagram');
  document.getElementById('tab-facebook').classList.toggle('active', platform === 'facebook');
  loadCategories();
}

function loadCategories() {
  const catSelect = document.getElementById('categorySelect');
  catSelect.innerHTML = '';
  const categories = Object.keys(servicesData[currentPlatform]);

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

  const services = servicesData[currentPlatform][cat] || [];
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
  return servicesData[currentPlatform][cat][idx];
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
  alert('Order placed successfully (Demo mode)!');
}

// Sidebar Functions
function openSidebar() {
  document.getElementById('leftSidebar').classList.add('active');
  document.getElementById('sidebarOverlay').classList.add('active');
}

function closeSidebar() {
  document.getElementById('leftSidebar').classList.remove('active');
  document.getElementById('sidebarOverlay').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', loadCategories);
