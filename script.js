<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Raj SMM Panel - Premium Social Media Services</title>
    <!-- Font Awesome Pro icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- Header Navigation -->
    <header class="navbar">
        <div class="nav-container">
            <div class="logo">
                <i class="fa-solid fa-bolt logo-icon"></i>
                <span>RAJ <span class="highlight">SMM</span></span>
            </div>
            <div class="nav-actions">
                <div class="wallet-badge" id="walletDisplay">
                    <i class="fa-solid fa-wallet"></i>
                    <span id="walletBalance">৳ 0.00</span>
                </div>
                <button class="icon-btn" id="pwaInstallBtn" style="display: none;" title="Install App">
                    <i class="fa-solid fa-download"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="main-layout">
        
        <!-- Platforms Grid Section (2x2 Layout) -->
        <section class="platform-section">
            <h2 class="section-title">Select Platform</h2>
            <div class="platform-grid">
                <!-- Row 1: Instagram & Facebook -->
                <button class="platform-card active" data-platform="instagram">
                    <div class="platform-icon insta-bg">
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                    <span>Instagram</span>
                </button>

                <button class="platform-card" data-platform="facebook">
                    <div class="platform-icon fb-bg">
                        <i class="fa-brands fa-facebook-f"></i>
                    </div>
                    <span>Facebook</span>
                </button>

                <!-- Row 2: YouTube & TikTok -->
                <button class="platform-card" data-platform="youtube">
                    <div class="platform-icon yt-bg">
                        <i class="fa-brands fa-youtube"></i>
                    </div>
                    <span>YouTube</span>
                </button>

                <button class="platform-card" data-platform="tiktok">
                    <div class="platform-icon tt-bg">
                        <i class="fa-brands fa-tiktok"></i>
                    </div>
                    <span>TikTok</span>
                </button>
            </div>
        </section>

        <!-- Main Banner Section (Positioned Below Platform Grid) -->
        <section class="banner-section">
            <div class="banner-card">
                <div class="banner-content">
                    <span class="badge">SPECIAL OFFER</span>
                    <h3>Boost Your Social Presence Instant & Real</h3>
                    <p>Get up to 20% discount on bulk orders today!</p>
                </div>
            </div>
        </section>

        <!-- Category Selector -->
        <section class="selector-section">
            <label for="categorySelect" class="input-label">Select Category</label>
            <div class="select-wrapper">
                <i class="fa-solid fa-layer-group select-icon"></i>
                <select id="categorySelect" class="custom-select">
                    <!-- Dynamic categories will load here via JavaScript -->
                </select>
                <i class="fa-solid fa-chevron-down arrow-icon"></i>
            </div>
        </section>

        <!-- Service Selector -->
        <section class="selector-section">
            <label for="serviceSelect" class="input-label">Select Service</label>
            <div class="select-wrapper">
                <i class="fa-solid fa-list-check select-icon"></i>
                <select id="serviceSelect" class="custom-select">
                    <!-- Dynamic services will load here via JavaScript -->
                </select>
                <i class="fa-solid fa-chevron-down arrow-icon"></i>
            </div>
        </section>

        <!-- Dynamic Form Fields -->
        <section class="form-section">
            <!-- Target Link Input -->
            <div class="input-group">
                <label for="targetLink" class="input-label">Link / Username</label>
                <div class="input-wrapper">
                    <i class="fa-solid fa-link input-icon"></i>
                    <input type="text" id="targetLink" placeholder="Paste link or username here..." required>
                </div>
            </div>

            <!-- Quantity Input -->
            <div class="input-group" id="quantityGroup">
                <label for="quantityInput" class="input-label">Quantity</label>
                <div class="input-wrapper">
                    <i class="fa-solid fa-hashtag input-icon"></i>
                    <input type="number" id="quantityInput" placeholder="Min: 100 - Max: 10000">
                </div>
                <small class="hint-text" id="quantityHint">Minimum quantity: 100</small>
            </div>

            <!-- Total Price Calculation -->
            <div class="price-box">
                <div class="price-info">
                    <span>Total Charge:</span>
                    <span class="price-amount" id="totalPrice">৳ 0.00</span>
                </div>
                <div class="discount-tag" id="discountBadge" style="display: none;">Discount Applied!</div>
            </div>

            <!-- Submit Order Button -->
            <button id="orderBtn" class="primary-btn">
                <i class="fa-solid fa-paper-plane"></i> Place Order Now
            </button>
        </section>

    </main>

    <!-- Checkout Modal Overlay -->
    <div id="checkoutModal" class="modal-overlay">
        <div class="modal-card">
            <div class="modal-header">
                <h3>Order Confirmation</h3>
                <button class="close-btn" id="closeModal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="order-summary">
                    <p><strong>Platform:</strong> <span id="summaryPlatform">-</span></p>
                    <p><strong>Service:</strong> <span id="summaryService">-</span></p>
                    <p><strong>Target:</strong> <span id="summaryLink">-</span></p>
                    <p><strong>Quantity:</strong> <span id="summaryQty">-</span></p>
                    <p class="summary-price"><strong>Total Amount:</strong> <span id="summaryAmount">৳ 0.00</span></p>
                </div>

                <div class="payment-tabs">
                    <button class="tab-btn active" data-method="upi">UPI / QR Code</button>
                    <button class="tab-btn" data-method="binance">Binance Pay</button>
                    <button class="tab-btn" data-method="wallet">Wallet</button>
                </div>

                <!-- UPI Payment Section -->
                <div id="upiPayment" class="payment-method-content active">
                    <p class="pay-instruction">Scan QR or Click button to Pay via UPI App</p>
                    <div class="qr-container">
                        <img id="upiQrCode" src="" alt="UPI QR Code">
                    </div>
                    <a id="upiPayBtn" href="#" class="upi-btn">
                        <i class="fa-solid fa-mobile-screen-button"></i> Pay via UPI App
                    </a>
                </div>

                <!-- Binance Payment Section -->
                <div id="binancePayment" class="payment-method-content">
                    <p class="pay-instruction">Send USDT (BEP20 / TRC20) to Pay ID:</p>
                    <div class="binance-box">
                        <span id="binanceId">839201948</span>
                        <button id="copyBinanceId"><i class="fa-solid fa-copy"></i> Copy</button>
                    </div>
                </div>

                <!-- Wallet Payment Section -->
                <div id="walletPayment" class="payment-method-content">
                    <p class="pay-instruction">Pay directly from your Raj SMM Panel account wallet balance.</p>
                    <div class="wallet-pay-info">
                        <span>Current Balance:</span>
                        <strong id="modalWalletBalance">৳ 0.00</strong>
                    </div>
                </div>

                <!-- Transaction Verification -->
                <div class="input-group m-top">
                    <label for="txnIdInput" class="input-label">Transaction ID / UTR / Order Proof</label>
                    <div class="input-wrapper">
                        <i class="fa-solid fa-receipt input-icon"></i>
                        <input type="text" id="txnIdInput" placeholder="Enter Transaction ID after payment">
                    </div>
                </div>

                <button id="confirmOrderBtn" class="confirm-btn">
                    <i class="fa-brands fa-whatsapp"></i> Confirm & Submit Order
                </button>
            </div>
        </div>
    </div>

    <!-- Custom Script -->
    <script src="script.js"></script>
</body>
</html>
