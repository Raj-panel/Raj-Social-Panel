/* ============================================================
   PLATFORM PAGE DEDICATED GLASSMORPHISM STYLING
   ============================================================ */

:root {
  --platform-bg-light: linear-gradient(135deg, #fff5f8 0%, #f3e8ff 50%, #e0e7ff 100%);
  --platform-glass-bg: rgba(255, 255, 255, 0.45);
  --platform-glass-border: rgba(255, 255, 255, 0.75);
  --platform-text-dark: #1e1b4b;
  --platform-text-muted: #64748b;
  --platform-shadow: 0 15px 35px rgba(236, 72, 153, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05);
  --platform-pink-glow: rgba(244, 114, 182, 0.4);
}

body.dark-mode .platform-body,
body.dark .platform-body,
body[data-theme="dark"] .platform-body {
  --platform-bg-light: linear-gradient(135deg, #090d16 0%, #111827 50%, #1e1b4b 100%);
  --platform-glass-bg: rgba(15, 23, 42, 0.65);
  --platform-glass-border: rgba(255, 255, 255, 0.12);
  --platform-text-dark: #f8fafc;
  --platform-text-muted: #94a3b8;
  --platform-shadow: 0 15px 35px rgba(168, 85, 247, 0.25), 0 5px 15px rgba(0, 0, 0, 0.5);
  --platform-pink-glow: rgba(217, 70, 239, 0.5);
}

.platform-body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: var(--platform-bg-light);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: var(--platform-text-dark);
  box-sizing: border-box;
}

.platform-page {
  width: 100%;
  max-width: 440px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0 auto;
}

/* --- Top Navigation Header --- */
.platform-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.platform-hamburger-btn {
  background: var(--platform-glass-bg);
  border: 1px solid var(--platform-glass-border);
  color: var(--platform-text-dark);
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, background 0.2s ease;
}

.platform-hamburger-btn:active {
  transform: scale(0.95);
}

/* --- Main Hero Glass Card --- */
.platform-hero-card {
  position: relative;
  background: var(--platform-glass-bg);
  border: 1.5px solid var(--platform-glass-border);
  border-radius: 28px;
  padding: 30px 20px 25px 20px;
  text-align: center;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--platform-shadow);
  overflow: hidden;
}

.platform-hero-glow {
  position: absolute;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, var(--platform-pink-glow) 0%, rgba(255, 255, 255, 0) 70%);
  z-index: 0;
  pointer-events: none;
}

.platform-crown {
  font-size: 34px;
  color: #f59e0b;
  margin-bottom: -10px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(245, 158, 11, 0.5));
  animation: platformFloat 3s ease-in-out infinite;
}

@keyframes platformFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.platform-logo-3d {
  font-size: 80px;
  font-weight: 900;
  font-style: italic;
  line-height: 0.9;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, #d946ef 0%, #a855f7 40%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 8px 15px rgba(168, 85, 247, 0.4));
  letter-spacing: -1px;
}

.platform-sub-logo {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 2px;
  margin-top: 8px;
  color: #1e1b4b;
  position: relative;
  z-index: 1;
}

body.dark-mode .platform-sub-logo,
body.dark .platform-sub-logo {
  color: #f8fafc;
}

/* --- Social Icons Row --- */
.platform-social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
}

.platform-social-icon {
  height: 60px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.platform-social-icon:hover,
.platform-social-icon:active {
  transform: translateY(-4px) scale(1.03);
}

.platform-fb { background: linear-gradient(135deg, #1877f2 0%, #0052cc 100%); }
.platform-insta { background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); }
.platform-yt { background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%); }
.platform-tt { background: linear-gradient(135deg, #000000 0%, #25f4ee 50%, #fe2c55 100%); }

/* --- Clickable Service Cards --- */
.platform-services-container {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
}

.platform-service-card {
  background: var(--platform-glass-bg);
  border: 1.5px solid var(--platform-glass-border);
  border-radius: 20px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--platform-text-dark);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--platform-shadow);
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.platform-service-card:hover,
.platform-service-card:active {
  transform: translateY(-2px);
  border-color: rgba(236, 72, 153, 0.5);
}

.platform-card-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #ffffff;
  flex-shrink: 0;
}

.platform-organic-icon {
  background: linear-gradient(135deg, #f43f5e 0%, #fb7185 100%);
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.3);
}

.platform-hq-icon {
  background: linear-gradient(135deg, #d946ef 0%, #c084fc 100%);
  box-shadow: 0 4px 12px rgba(217, 70, 239, 0.3);
}

.platform-card-text {
  flex: 1;
}

.platform-card-title {
  font-weight: 700;
  font-size: 15px;
  line-height: 1.2;
}

.platform-card-subtitle {
  font-size: 12px;
  color: var(--platform-text-muted);
  margin-top: 3px;
}

.platform-card-arrow {
  font-size: 14px;
  color: var(--platform-text-muted);
}

/* --- Watch Tutorials Button --- */
.platform-tutorial-wrapper {
  margin-top: 6px;
  width: 100%;
}

.platform-tutorial-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: #ffffff !important;
  font-weight: 800;
  font-size: 14px;
  border-radius: 16px;
  text-decoration: none;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
  box-sizing: border-box;
  transition: transform 0.2s ease;
}

.platform-tutorial-btn:active {
  transform: scale(0.98);
}

/* --- Modal Popup (Coming Soon) --- */
.platform-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.platform-modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.platform-modal-card {
  background: var(--platform-glass-bg);
  border: 1.5px solid var(--platform-glass-border);
  border-radius: 24px;
  padding: 28px 22px;
  width: 100%;
  max-width: 320px;
  text-align: center;
  box-shadow: var(--platform-shadow);
  transform: scale(0.9);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.platform-modal-overlay.active .platform-modal-card {
  transform: scale(1);
}

.platform-modal-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.platform-modal-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--platform-text-dark);
}

.platform-modal-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin: 10px 0 14px 0;
}

.platform-modal-desc {
  font-size: 13px;
  color: var(--platform-text-muted);
  line-height: 1.5;
  margin: 0 0 18px 0;
}

.platform-modal-close-btn {
  background: var(--platform-text-dark);
  color: var(--platform-glass-bg);
  border: none;
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}
