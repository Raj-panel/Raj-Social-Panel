// Global State Variables
let currentPlatform = 'instagram';
let calculatedPrice = 0;

// All Platform & Service Data
const platformData = {
  instagram: {
    title: "Instagram Boost",
    icon: "fa-brands fa-instagram",
    linkPlaceholder: "Link Instagram profile",
    categories: {
      "working": {
        name: "Instagram Followers | Working Refill 🔄",
        services: [
          { id: "1220", name: "1220 - Instagram Followers | 60D Refill 🔄", rate: 65.358 },
          { id: "1221", name: "1221 - Instagram Followers | 90D Refill 🔄", rate: 67.929 },
          { id: "1222", name: "1222 - Instagram Followers | 365D Refill 🔄", rate: 70.501 }
        ]
      },
      "nondrop": {
        name: "Instagram Followers | Non Drop ♻️",
        services: [
          { id: "1072", name: "1072 - Instagram Followers | Non Drop - No Refill 🔄", rate: 67.929 },
          { id: "1073", name: "1073 - Instagram Followers | Non Drop - 30D Refill 🔄", rate: 73.072 }
        ]
      }
    }
  },
  facebook: {
    title: "Facebook Boost",
    icon: "fa-brands fa-facebook",
    linkPlaceholder: "Link Facebook page or profile",
    categories: {
      "fb_followers": {
        name: "Facebook Page Followers / Likes 👍",
        services: [
          { id: "201", name: "201 - Facebook Page Followers | Real - Instant", rate: 85.00 },
          { id: "202", name: "202 - Facebook Profile Followers | Non Drop 30D", rate: 90.50 }
        ]
      }
    }
  },
  youtube: {
    title: "YouTube Boost",
    icon: "fa-brands fa-youtube",
    linkPlaceholder: "Link YouTube channel or video",
    categories: {
      "yt_subs": {
        name: "YouTube Subscribers 🔴",
        services: [
          { id: "301", name: "301 - YouTube Subscribers | Non Drop - Speed 500/Day", rate: 250.00 },
          { id: "302", name: "302 - YouTube Views | High Retention", rate: 110.00 }
        ]
      }
    }
  },
  tiktok: {
    title: "TikTok Boost",
    icon: "fa-brands fa-tiktok",
    linkPlaceholder: "Link TikTok account or video",
    categories: {
      "tiktok_followers": {
        name: "TikTok Followers / Likes ♪",
        services: [
          { id: "401", name: "401 - TikTok Followers | Fast Delivery", rate: 120.00 },
          { id: "402", name: "402 - TikTok Video Likes | Instant", rate: 45.00 }
        ]
      }
    }
  }
};

// Platform Selection Logic
function selectPlatform(platform) {
  currentPlatform = platform;

  // Active Button Highlight
  document.querySelectorAll('.platform-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${platform}`).classList.add('active');

  // Update Banner Info
  const data = platformData[platform];
  document.getElementById('heroPlatformTitle').innerText = data.title;
  document.getElementById('heroPlatformIcon').innerHTML = `<i class="${data.icon}"></i>`;
  document.getElementById('checkoutPlatformIcon').innerHTML = `<i class="${data.icon}"></i>`;
  document.getElementById('linkLabel').innerText = data.linkPlaceholder;

  // Update Categories Dropdown
  const categorySelect = document.getElementById('categorySelect');
  categorySelect.innerHTML = "";
  
  for (let key in data.categories) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = data.categories[key].name;
    categorySelect.appendChild(option);
  }

  updateServices();
}

// Service Options Update
function updateServices() {
  const categoryKey = document.getElementById("categorySelect").value;
  const serviceSelect = document.getElementById("serviceSelect");
  serviceSelect.innerHTML = "";

  const services = platformData[currentPlatform].categories[categoryKey].services;

  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.id;
    option.setAttribute("data-rate", service.rate);
    option.textContent = `${service.name} - ₹${service.rate}`;
    serviceSelect.appendChild(option);
  });

  calculatePrice();
}

// Calculate Price Logic
function calculatePrice() {
  const serviceSelect = document.getElementById("serviceSelect");
  const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  if (!selectedOption) return;

  const ratePer1000 = parseFloat(selectedOption.getAttribute("data-rate"));
  const quantityInput = document.getElementById("mainQuantityInput").value;
  const quantity = parseInt(quantityInput) || 0;

  calculatedPrice = ((ratePer1000 / 1000) * quantity).toFixed(2);
  document.getElementById("totalPriceText").innerText = calculatedPrice;
}

// Checkout Navigation
function openCheckout() {
  const link = document.getElementById("mainLinkInput").value.trim();
  const quantityInput = document.getElementById("mainQuantityInput").value.trim();
  const quantity = parseInt(quantityInput);

  if (!link) {
    alert("Please enter link!");
    return;
  }

  if (!quantityInput || isNaN(quantity) || quantity < 100) {
    alert("Minimum order quantity is 100!");
    return;
  }

  const serviceSelect = document.getElementById("serviceSelect");
  const selectedText = serviceSelect.options[serviceSelect.selectedIndex].textContent;

  document.getElementById("checkoutServiceTitle").innerText = selectedText.split(' - ')[0];
  document.getElementById("checkoutPriceText").innerText = calculatedPrice;

  // UPI Dynamic QR Code
  const upiId = "rajpanel@upi";
  const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${upiId}%26am=${calculatedPrice}%26cu=INR`;
  document.getElementById("checkoutQrImg").src = qrApi;

  document.getElementById("checkoutPage").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkoutPage").classList.add("hidden");
}

// Left Sidebar Handlers
function openSidebar() {
  document.getElementById("leftSidebar").classList.add("active");
  document.getElementById("sidebarOverlay").classList.add("active");
}

function closeSidebar() {
  document.getElementById("leftSidebar").classList.remove("active");
  document.getElementById("sidebarOverlay").classList.remove("active");
}

// Payment View Switcher
function switchCheckoutPayment(method) {
  const upiView = document.getElementById('checkoutUpiView');
  const binanceView = document.getElementById('checkoutBinanceView');
  const btnUpi = document.getElementById('btnTabUpi');
  const btnBinance = document.getElementById('btnTabBinance');
  const txnLabel = document.getElementById('txnLabel');
  const txnInput = document.getElementById('checkoutTxnId');

  if (method === 'binance') {
    upiView.classList.add('hidden');
    binanceView.classList.remove('hidden');
    btnUpi.classList.remove('active');
    btnBinance.classList.add('active');
    
    txnLabel.innerText = "Enter Binance TxID / Order ID:";
    txnInput.placeholder = "e.g. 21893XXXXXXXXXX (Binance TxID)";
  } else {
    binanceView.classList.add('hidden');
    upiView.classList.remove('hidden');
    btnBinance.classList.remove('active');
    btnUpi.classList.add('active');
    
    txnLabel.innerText = "Enter 12-Digit UPI UTR / Ref No:";
    txnInput.placeholder = "e.g. 4029XXXXXXXXXX (12-Digit UTR)";
  }
}

// Order Submit to WhatsApp
function submitOrderToWhatsApp() {
  const link = document.getElementById("mainLinkInput").value.trim();
  const utr = document.getElementById("checkoutTxnId").value.trim();
  const service = document.getElementById("checkoutServiceTitle").innerText;
  const quantity = document.getElementById("mainQuantityInput").value;

  if (!utr) {
    alert("Please enter Transaction ID / UTR Number.");
    return;
  }

  const message = `New Order Details:\nPlatform: ${currentPlatform.toUpperCase()}\nService: ${service}\nQuantity: ${quantity}\nPrice: ₹${calculatedPrice}\nLink: ${link}\nUTR/TxID: ${utr}`;
  window.open("https://wa.me/919239628344?text=" + encodeURIComponent(message), "_blank");
}

// Auto Initialize Page
window.onload = function() {
  selectPlatform('instagram');
};
