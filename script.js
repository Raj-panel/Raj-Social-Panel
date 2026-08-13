@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

body {
    background: #fdf2f8;
    background-image: radial-gradient(circle at 10% 10%, rgba(244, 114, 182, 0.15) 0%, transparent 40%),
                      radial-gradient(circle at 90% 90%, rgba(192, 132, 252, 0.15) 0%, transparent 40%);
    color: #1e293b;
    min-height: 100vh;
    padding: 8px; /* ১০px থেকে কমিয়ে ৮px করা হলো */
    display: flex;
    justify-content: center;
}

.main-wrapper {
    width: 100%;
    max-width: 440px;
}

/* Support Header */
.hero-actions {
    display: flex;
    gap: 6px; /* ১০px থেকে কমিয়ে ৬px করা হলো */
    justify-content: center;
    margin-bottom: 8px; /* ১২px থেকে কমিয়ে ৮px করা হলো */
}

.glass-btn {
    padding: 6px 12px; /* ৮px 14px থেকে কমানো হয়েছে */
    border-radius: 10px;
    font-size: 10px; /* ১১px থেকে ১০px করা হয়েছে */
    font-weight: 700;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.btn-telegram { border: 1px solid rgba(56, 189, 248, 0.4); color: #0284c7; }
.btn-whatsapp { border: 1px solid rgba(34, 197, 94, 0.4); color: #16a34a; }

/* Platform Switcher Container */
.platform-switch-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px; /* ৬px থেকে কমিয়ে ৪px করা হয়েছে */
    background: #ffffff;
    padding: 2px; /* ৩px থেকে কমিয়ে ২px করা হয়েছে */
    border-radius: 12px;
    margin-bottom: 8px; /* ১০px থেকে কমিয়ে ৮px করা হয়েছে */
    box-shadow: 0 4px 12px rgba(236, 72, 153, 0.06);
}

.platform-btn {
    flex: 1 1 calc(50% - 4px);
    padding: 5px 8px; /* ৬px ১০px থেকে কমানো হয়েছে */
    border: none;
    border-radius: 8px;
    font-weight: 800;
    font-size: 11px; /* ১২px থেকে ১১px করা হয়েছে */
    background: transparent;
    color: #64748b;
    cursor: pointer;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.platform-btn.active {
    background: linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 3px 10px rgba(217, 70, 239, 0.25);
}

/* Hero Status Banner */
.hero-banner {
    background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
    border-radius: 14px;
    padding: 8px 10px 4px 10px; /* প্যাডিং আরও সংকুচিত করা হলো */
    color: #ffffff;
    margin-bottom: 8px; /* ১০px থেকে কমিয়ে ৮px করা হয়েছে */
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(236, 72, 153, 0.15);
}

.hero-top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
}

.hero-logo-box {
    width: 24px; /* ২৮px থেকে কমানো হলো */
    height: 24px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    backdrop-filter: blur(5px);
}

.provider-badge {
    background: rgba(255, 255, 255, 0.25);
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 8px; /* ৯px থেকে কমানো হলো */
    font-weight: 800;
    backdrop-filter: blur(5px);
}

.hero-banner h2 { font-size: 15px; font-weight: 800; margin-bottom: 1px; } /* ১৭px থেকে ১৫px */
.hero-sub { font-size: 9px; opacity: 0.9; margin-bottom: 4px; } /* ১০px থেকে ৯px */

.hero-stats-grid { 
    display: flex; 
    gap: 4px; /* ৬px থেকে কমিয়ে ৪px করা হয়েছে */
    margin-bottom: 0px;
}

.stat-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 4px 2px; /* ৬px ৪px থেকে কমানো হয়েছে */
    text-align: center;
}

.stat-icon { font-size: 9px; display: block; margin-bottom: 1px; }
.stat-num { font-size: 11px; font-weight: 800; display: block; }
.stat-lbl { font-size: 7.5px; opacity: 0.8; }

/* Scrollable Horizontal Category Tabs */
.category-tabs-wrapper {
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: 10px; /* ১৪px থেকে কমিয়ে ১০px করা হয়েছে */
    padding-bottom: 2px;
    scrollbar-width: none;
}

.category-tabs-wrapper::-webkit-scrollbar { display: none; }

.category-tabs { display: inline-flex; gap: 6px; }

.cat-tab {
    padding: 6px 12px; /* ৮px ১৬px থেকে কমানো হয়েছে */
    background: #ffffff;
    border: 1px solid #f1f5f9;
    border-radius: 16px;
    font-size: 11px; /* ১২px থেকে কমানো হয়েছে */
    font-weight: 700;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.cat-tab.active {
    background: linear-gradient(135deg, #a855f7, #ec4899);
    color: #ffffff;
    border-color: transparent;
    box-shadow: 0 3px 10px rgba(168, 85, 247, 0.25);
}

/* Service Package Cards */
.package-list-container {
    display: flex;
    flex-direction: column;
    gap: 8px; /* ১০px থেকে কমিয়ে ৮px করা হয়েছে */
    margin-bottom: 12px;
}

.pkg-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 10px 12px; /* ১২px ১৪px থেকে কমানো হয়েছে */
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #fae8ff;
    box-shadow: 0 2px 8px rgba(244, 114, 182, 0.04);
    cursor: pointer;
    transition: all 0.2s;
}

.pkg-card:hover, .pkg-card.selected {
    border-color: #d946ef;
    background: #fdf4ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(217, 70, 239, 0.12);
}

.pkg-left { display: flex; align-items: center; gap: 10px; }

.pkg-icon {
    width: 32px; /* ৩৮px থেকে কমানো হয়েছে */
    height: 32px;
    background: linear-gradient(135deg, #f43f5e, #a855f7);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
}

.pkg-info { display: flex; flex-direction: column; }

.pkg-title {
    font-size: 12px; /* ১৩px থেকে ১২px করা হয়েছে */
    font-weight: 800;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 4px;
}

.pkg-sub { font-size: 9.5px; color: #94a3b8; margin-top: 1px; }

.pkg-badge {
    font-size: 8px;
    padding: 2px 5px;
    border-radius: 6px;
    color: #fff;
    font-weight: 800;
}

.badge-popular { background: linear-gradient(90deg, #3b82f6, #8b5cf6); }
.badge-best { background: linear-gradient(90deg, #f59e0b, #ef4444); }
.badge-demo { background: #94a3b8; }
.badge-real { background: #6366f1; }

.pkg-price-btn {
    background: linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%);
    color: #fff;
    font-weight: 800;
    font-size: 11px; /* ১২px থেকে ১১px করা হয়েছে */
    padding: 5px 12px;
    border-radius: 14px;
}

.custom-card {
    background: #ffffff;
    border: 1px solid #d946ef;
    border-radius: 14px;
    padding: 10px 12px;
}

.input-box { margin-bottom: 8px; }

.input-box label {
    display: block;
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    margin-bottom: 3px;
}

input {
    width: 100%;
    padding: 9px 10px; /* ১১px ১২px থেকে কমানো হয়েছে */
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 12px;
    outline: none;
    color: #0f172a;
}

input:focus { border-color: #d946ef; background: #ffffff; }

/* Checkout Section (In-page) */
.checkout-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.05);
    margin-bottom: 12px;
    border: 1px solid #fae8ff;
}

.checkout-header h3 { font-size: 13px; color: #0f172a; margin-bottom: 8px; }

.order-summary-pill {
    background: #fdf4ff;
    border: 1px dashed #d946ef;
    padding: 8px;
    border-radius: 8px;
    font-size: 11px;
    color: #a855f7;
    text-align: center;
    margin-bottom: 10px;
}

.action-btn {
    width: 100%;
    padding: 10px;
    background: linear-gradient(135deg, #d946ef, #8b5cf6);
    color: #fff;
    font-weight: 800;
    font-size: 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
}

/* Payment Switch Tabs */
.pay-toggle-tabs { display: flex; gap: 6px; margin: 10px 0; }

.pay-tab {
    flex: 1;
    padding: 6px;
    background: #f1f5f9;
    border: none;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    cursor: pointer;
}

.pay-tab.active { background: #a855f7; color: #fff; }

.qr-box {
    text-align: center;
    background: #f8fafc;
    padding: 10px;
    border-radius: 10px;
}

.qr-box img {
    width: 140px; /* ১৭০px থেকে কমিয়ে ১৪০px করা হয়েছে */
    height: 140px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.qr-sub { font-size: 9.5px; color: #64748b; margin-top: 4px; }

/* Binance Box */
.binance-info-card {
    background: #fefce8;
    border: 1px solid #fef08a;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
}

.usdt-badge {
    display: inline-block;
    background: #eab308;
    color: #fff;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 11px;
    margin-top: 2px;
}

.crypto-details-box {
    margin-top: 8px;
    font-size: 10px;
    text-align: left;
    background: #fff;
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid #fef08a;
}

.crypto-details-box p {
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.copy-btn {
    background: #e2e8f0;
    border: none;
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 9px;
    cursor: pointer;
}

.whatsapp-submit-btn {
    width: 100%;
    padding: 10px;
    background: #22c55e;
    color: #fff;
    font-weight: 800;
    font-size: 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.margin-top-15 { margin-top: 10px; }

.footer-note {
    text-align: center;
    font-size: 9.5px;
    color: #94a3b8;
    margin-bottom: 12px;
}

.badge-super{
    background: linear-gradient(90deg,#ff9800,#ff4081);
    color:#fff;
    font-weight:800;
    animation:pulseBadge 1.8s infinite;
}

@keyframes pulseBadge{
    0%{transform:scale(1);}
    50%{transform:scale(1.03);}
    100%{transform:scale(1);}
}

/* ===== SUPER COMBO CARD ===== */
.pkg-card.super-combo{
    border:2px solid #ff9800;
    background:linear-gradient(135deg,#fff8e1,#fff0f7);
    box-shadow:0 6px 16px rgba(255,152,0,.15);
    position:relative;
}

.pkg-card.super-combo::before{
    content:"🔥 BEST OFFER";
    position:absolute;
    top:-8px;
    right:12px;
    background:linear-gradient(90deg,#ff9800,#ff4081);
    color:#fff;
    font-size:9px;
    font-weight:800;
    padding:3px 8px;
    border-radius:16px;
}

.combo-free{
    margin-top:4px;
    font-size:10px;
    font-weight:800;
    color:#16a34a;
}

/* ===== PWA Install UI ===== */
.panel-heading{
 text-align:center;
 font-size:24px; /* ৩২px থেকে কমিয়ে ২৪px করা হলো */
 font-weight:800;
 color:#8b5cf6;
 margin:4px 0 8px;
 letter-spacing:0.5px;
}
#installContainer{
 display:none;
 text-align:center;
 margin:0 0 10px; /* মার্জিন কমিয়ে সংকুচিত করা হলো */
}
.install-btn{
 border:none;
 border-radius:999px;
 padding:10px 22px; /* ১৪px ২৮px থেকে কমানো হলো */
 background:linear-gradient(135deg,#3b82f6,#8b5cf6);
 color:#fff;
 font-size:13px; /* ১৬px থেকে কমানো হলো */
 font-weight:800;
 cursor:pointer;
 box-shadow:0 6px 14px rgba(59,130,246,.2);
 transition:.25s;
}
.install-btn:hover{
 transform:translateY(-1px);
}
.install-btn i{margin-right:6px;}


/* ==================================================
    NEW PAYMENT PAGE / CHECKOUT OVERLAY STYLES
   ================================================== */
.checkout-page-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #faf5ff;
  background-image: radial-gradient(circle at 50% 0%, rgba(217, 70, 239, 0.12) 0%, transparent 60%);
  z-index: 999999;
  overflow-y: auto;
  box-sizing: border-box;
  animation: slideInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.checkout-page-overlay.hidden {
  display: none !important;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.checkout-content {
  max-width: 440px;
  margin: 0 auto;
  padding: 14px 12px 30px 12px;
}

.checkout-nav {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.back-btn {
  background: #ffffff;
  border: 1.5px solid #c084fc;
  color: #6b21a8;
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(192, 132, 252, 0.2);
}

.checkout-heading-text {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 800;
  color: #2e1065;
  margin-right: 40px;
}

.premium-service-card {
  background: linear-gradient(135deg, #4f46e5 0%, #a855f7 50%, #ec4899 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 8px 25px rgba(217, 70, 239, 0.3);
  margin-bottom: 14px;
  color: #fff;
}

.card-top-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.platform-badge-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
}

.card-info h4 {
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  margin: 0;
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pkg-name-badge {
  font-size: 10px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
}

.popular-badge {
  background: #facc15;
  color: #000;
  font-size: 8px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 8px;
  text-transform: uppercase;
}

.units-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8px;
}

.price-text {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-text small {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

/* Input Fields inside Checkout */
.checkout-input-group {
  margin-bottom: 12px;
  text-align: left;
}

.checkout-input-group label {
  display: block;
  font-size: 11px;
  color: #4c1d95;
  font-weight: 700;
  margin-bottom: 4px;
}

.checkout-input-group input {
  width: 100%;
  padding: 10px 12px;
  background: #ffffff;
  border: 1.5px solid #c084fc;
  border-radius: 10px;
  color: #0f172a;
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(192, 132, 252, 0.1);
}

.checkout-input-group input:focus {
  border-color: #d946ef;
  box-shadow: 0 0 14px rgba(217, 70, 239, 0.25);
}

/* Payment Switch Tabs */
.pay-toggle-tabs {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.pay-tab {
  flex: 1;
  padding: 8px;
  background: #ffffff;
  border: 1.5px solid #c084fc;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  color: #6b21a8;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(192, 132, 252, 0.1);
}

.pay-tab.active {
  background: linear-gradient(135deg, #d946ef, #8b5cf6);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 0 12px rgba(217, 70, 239, 0.3);
}

/* Payment View Box (QR / UPI Section) */
.payment-view-box {
  background: #ffffff;
  border: 1.5px solid #c084fc;
  border-radius: 16px;
  padding: 12px;
  text-align: center;
  margin-top: 10px;
  box-shadow: 0 0 15px rgba(192, 132, 252, 0.15);
}

.payment-view-box.hidden {
  display: none;
}

.scan-title {
  display: none !important;
}

.qr-wrapper {
  display: inline-block;
  padding: 8px;
  background: #ffffff;
  border: 1.5px solid #d8b4fe;
  border-radius: 14px;
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.2);
  margin: 4px 0 8px 0;
}

.qr-wrapper img {
  width: 140px; /* কমানো হয়েছে */
  height: 140px;
  border-radius: 8px;
  display: block;
}

.qr-sub {
  font-size: 10px;
  color: #64748b;
  margin-bottom: 10px;
}

.pay-app-btn {
  display: inline-block;
  margin-top: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  text-decoration: none;
}

.upi-icons-row {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 8px;
}

.upi-chip {
  background: #ffffff;
  border: 1px solid #c084fc;
  color: #475569;
  font-size: 9.5px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
  box-shadow: 0 0 6px rgba(192, 132, 252, 0.1);
}

.binance-nick-box {
  border: 1px solid #fef08a;
  background: #fefce8;
  padding: 8px;
  border-radius: 8px;
  margin: 8px 0;
  font-size: 10px;
  color: #854d0e;
}

.usdt-badge-box span {
  background: #eab308;
  color: #fff;
  font-weight: 800;
  padding: 3px 12px;
  border-radius: 16px;
  font-size: 11px;
  display: inline-block;
}

.margin-top-20 {
  margin-top: 14px;
}

.notice-yellow-box {
  background: #fffbeb;
  border: 1.5px solid #fde047;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  margin: 12px 0;
  font-size: 10px;
  color: #b45309;
  line-height: 1.3;
  font-weight: 600;
  box-shadow: 0 0 10px rgba(253, 224, 71, 0.2);
}

.whatsapp-submit-btn {
  width: 100%;
  background: #22c55e;
  color: #fff;
  border: none;
  padding: 11px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.whatsapp-submit-btn:active {
  transform: scale(0.98);
}

/* AUTOMATIC SYSTEM DARK MODE DETECTION */
@media (prefers-color-scheme: dark) {
  body {
    background: #0f172a !important;
    background-image: radial-gradient(circle at 10% 10%, rgba(217, 70, 239, 0.15) 0%, transparent 40%),
                      radial-gradient(circle at 90% 90%, rgba(139, 92, 246, 0.15) 0%, transparent 40%) !important;
    color: #f1f5f9 !important;
  }

  .glass-btn, 
  .platform-switch-container, 
  .cat-tab, 
  .pkg-card, 
  .custom-card, 
  .checkout-card, 
  .payment-view-box, 
  .qr-wrapper, 
  .back-btn, 
  .pay-tab, 
  .upi-chip, 
  .crypto-details-box {
    background-color: #1e293b !important;
    border-color: #334155 !important;
    color: #f1f5f9 !important;
  }

  .pkg-card:hover, .pkg-card.selected {
    background-color: #2a1b3d !important;
    border-color: #d946ef !important;
  }

  .pkg-title, .checkout-heading-text, .checkout-header h3, label {
    color: #f8fafc !important;
  }

  .pkg-sub, .qr-sub, .footer-note {
    color: #94a3b8 !important;
  }

  .platform-btn {
    color: #94a3b8;
  }

  input {
    background-color: #0f172a !important;
    border-color: #334155 !important;
    color: #ffffff !important;
  }

  input:focus {
    border-color: #d946ef !important;
    background-color: #1e293b !important;
  }

  .checkout-page-overlay {
    background-color: #0f172a !important;
    background-image: radial-gradient(circle at 50% 0%, rgba(217, 70, 239, 0.15) 0%, transparent 60%) !important;
  }

  .notice-yellow-box {
    background-color: #271e05 !important;
    border-color: #854d0e !important;
    color: #fef08a !important;
  }

  .binance-nick-box {
    background-color: #271e05 !important;
    border-color: #854d0e !important;
    color: #fef08a !important;
  }

  .order-summary-pill {
    background-color: #2a1b3d !important;
    border-color: #d946ef !important;
    color: #e9d5ff !important;
  }

  .pay-app-btn {
    background-color: #0f172a !important;
    border-color: #334155 !important;
    color: #cbd5e1 !important;
  }
}

/* Auth Modal Modern Dark Theme CSS */
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.auth-modal-overlay.hidden {
  display: none !important;
}

.auth-modal-box {
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 18px 16px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  color: #f8fafc;
}

.auth-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
}

.auth-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.auth-sub {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 14px;
}

.auth-input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
  text-align: left;
}

.auth-input-group label {
  font-size: 11px;
  font-weight: 600;
  color: #cbd5e1;
}

.phone-input-wrapper {
  display: flex;
  align-items: center;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  overflow: hidden;
}

.country-code {
  padding: 10px;
  background: #1e293b;
  color: #a855f7;
  font-weight: 700;
  font-size: 12px;
  border-right: 1px solid #334155;
}

.phone-input-wrapper input, .auth-input-group input {
  width: 100%;
  padding: 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #ffffff;
  font-size: 12px;
  outline: none;
}

.phone-input-wrapper input {
  border: none;
  border-radius: 0;
}

.auth-extra-row {
  text-align: right;
  margin-bottom: 10px;
}

.forgot-link {
  color: #a855f7;
  font-size: 11px;
  text-decoration: none;
}

.auth-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  margin-top: 6px;
}

.auth-btn.secondary-btn {
  background: #334155;
  color: #f8fafc;
}

.auth-switch-text {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 10px;
  text-align: center;
}

.auth-switch-text a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 700;
}

.margin-top-10 { margin-top: 8px; }

/* =================================================_
   RAJ-SMM-PANEL: AUTHENTICATION PAGES UI & THEME
   ================================================= */

:root {
  --auth-bg-light: #f8fafc;
  --auth-card-bg-light: #ffffff;
  --auth-text-primary-light: #1e293b;
  --auth-text-secondary-light: #64748b;
  --auth-input-bg-light: #f1f5f9;
  --auth-input-border-light: #cbd5e1;
  --auth-input-focus-light: #6366f1;
  --auth-border-light: #e2e8f0;
  
  --auth-bg-dark: #0f172a;
  --auth-card-bg-dark: #1e293b;
  --auth-text-primary-dark: #f8fafc;
  --auth-text-secondary-dark: #94a3b8;
  --auth-input-bg-dark: #0f172a;
  --auth-input-border-light-dark: #334155;
  --auth-input-focus-dark: #818cf8;
  --auth-border-dark: #334155;

  --primary-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  --primary-gradient-hover: linear-gradient(135deg, #4f46e5 0%, #9333ea 100%);
}

/* Base Body Styles for Auth Pages */
body.auth-page {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Wrapper Layout */
.auth-container {
  width: 100%;
  max-width: 440px;
  padding: 12px;
  box-sizing: border-box;
}

/* Auth Card Styles */
.auth-card {
  border-radius: 14px;
  padding: 20px 16px;
  box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
}

/* Headings & Texts */
.auth-card h2 {
  margin-top: 0;
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.auth-card p.auth-subtitle {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 12px;
  text-align: center;
}

/* Form Groups */
.auth-form-group {
  margin-bottom: 12px;
}

.auth-form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 11px;
  font-weight: 600;
}

/* Input Fields */
.auth-form-group input,
.auth-form-group select {
  width: 100%;
  padding: 10px 12px;
  font-size: 12px;
  border-radius: 6px;
  border: 1px solid;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

/* Buttons */
.auth-btn {
  width: 100%;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: var(--primary-gradient);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.1s ease;
  margin-top: 6px;
  box-sizing: border-box;
}

.auth-btn:hover {
  background: var(--primary-gradient-hover);
}

.auth-btn:active {
  transform: scale(0.98);
}

/* Links & Extra Actions */
.auth-links {
  margin-top: 14px;
  text-align: center;
  font-size: 12px;
}

.auth-links a {
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.auth-links a:hover {
  text-decoration: underline;
}

.auth-footer-text {
  margin-top: 12px;
  text-align: center;
  font-size: 11px;
}

/* AUTO DEVICE THEME SWITCHING */
@media (prefers-color-scheme: light) {
  body.auth-page {
    background-color: var(--auth-bg-light);
    color: var(--auth-text-primary-light);
  }

  .auth-card {
    background-color: var(--auth-card-bg-light);
    border: 1px solid var(--auth-border-light);
  }

  .auth-card h2 {
    color: var(--auth-text-primary-light);
  }

  .auth-card p.auth-subtitle {
    color: var(--auth-text-secondary-light);
  }

  .auth-form-group label {
    color: var(--auth-text-primary-light);
  }

  .auth-form-group input {
    background-color: var(--auth-input-bg-light);
    border-color: var(--auth-input-border-light);
    color: var(--auth-text-primary-light);
  }

  .auth-form-group input:focus {
    border-color: var(--auth-input-focus-light);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  .auth-links a, .auth-footer-text a {
    color: #6366f1;
  }

  .auth-footer-text {
    color: var(--auth-text-secondary-light);
  }
}

@media (prefers-color-scheme: dark) {
  body.auth-page {
    background-color: var(--auth-bg-dark);
    color: var(--auth-text-primary-dark);
  }

  .auth-card {
    background-color: var(--auth-card-bg-dark);
    border: 1px solid var(--auth-border-dark);
  }

  .auth-card h2 {
    color: var(--auth-text-primary-dark);
  }

  .auth-card p.auth-subtitle {
    color: var(--auth-text-secondary-dark);
  }

  .auth-form-group label {
    color: var(--auth-text-primary-dark);
  }

  .auth-form-group input {
    background-color: var(--auth-input-bg-dark);
    border-color: var(--auth-input-border-light-dark);
    color: var(--auth-text-primary-dark);
  }

  .auth-form-group input:focus {
    border-color: var(--auth-input-focus-dark);
    box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
  }

  .auth-links a, .auth-footer-text a {
    color: #818cf8;
  }

  .auth-footer-text {
    color: var(--auth-text-secondary-dark);
  }
}

/* MOBILE RESPONSIVENESS */
@media screen and (max-width: 480px) {
  .auth-container {
    padding: 8px;
  }
  
  .auth-card {
    padding: 16px 12px;
    border-radius: 10px;
  }

  body.auth-page {
    align-items: flex-start;
    padding-top: 10px;
  }
}
