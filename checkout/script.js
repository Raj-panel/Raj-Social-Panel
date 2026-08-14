// Functionality to switch payment tab (UPI vs Binance)
function switchCheckoutPayment(method) {
  const upiView = document.getElementById('checkoutUpiView');
  const binanceView = document.getElementById('checkoutBinanceView');
  const btnUpi = document.getElementById('btnTabUpi');
  const btnBinance = document.getElementById('btnTabBinance');
  const txnLabel = document.getElementById('txnLabel');
  const txnInput = document.getElementById('checkoutTxnId');

  if (method === 'binance') {
    if (upiView) upiView.classList.add('hidden');
    if (binanceView) binanceView.classList.remove('hidden');
    if (btnUpi) btnUpi.classList.remove('active');
    if (btnBinance) btnBinance.classList.add('active');
    
    if (txnLabel) txnLabel.innerText = "Enter Binance TxID / Order ID:";
    if (txnInput) txnInput.placeholder = "e.g. 21893XXXXXXXXXX (Binance TxID)";
  } else {
    if (binanceView) binanceView.classList.add('hidden');
    if (upiView) upiView.classList.remove('hidden');
    if (btnBinance) btnBinance.classList.remove('active');
    if (btnUpi) btnUpi.classList.add('active');
    
    if (txnLabel) txnLabel.innerText = "Enter 12-Digit UPI UTR / Ref No:";
    if (txnInput) txnInput.placeholder = "e.g. 4029XXXXXXXXXX (12-Digit UTR)";
  }
}

// Functionality to go back from checkout
function closeCheckout() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '../';
  }
}

// Theme Application
function applyPlatformTheme(platform) {
  if (!platform) return;
  const p = platform.toLowerCase();
  document.body.setAttribute('data-platform', p);
}

// WhatsApp Order Submission Hook
function submitOrderToWhatsApp() {
  const linkInput = document.getElementById('checkoutLinkInput');
  const txnInput = document.getElementById('checkoutTxnId');

  const linkValue = linkInput ? linkInput.value.trim() : '';
  const txnValue = txnInput ? txnInput.value.trim() : '';

  if (!linkValue) {
    alert('Please enter your target link.');
    return;
  }

  if (!txnValue) {
    alert('Please enter your UTR / Transaction ID.');
    return;
  }

  // Preserve existing main submitOrderToWhatsApp logic if defined globally in script.js
  if (typeof window.executeWhatsAppSubmit === 'function') {
    window.executeWhatsAppSubmit();
  } else {
    const phoneNumber = "919239628344";
    const msg = `New Order Request:\nLink: ${linkValue}\nTxn ID/UTR: ${txnValue}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}

// Initial setup on document ready
document.addEventListener("DOMContentLoaded", function () {
  applyPlatformTheme('instagram');
});
