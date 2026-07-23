* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: #0f172a;
    color: #f8fafc;
    min-height: 100vh;
    padding-bottom: 40px;
    position: relative;
    overflow-x: hidden;
}

/* Vibrant Glow Background */
.background-glow {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(168,85,247,0.3) 50%, rgba(0,0,0,0) 70%);
    filter: blur(80px);
    z-index: -1;
}

header {
    text-align: center;
    padding: 40px 20px 20px;
}

.logo {
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(135deg, #38bdf8, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    letter-spacing: 1.5px;
}

.tagline {
    font-size: 13px;
    color: #94a3b8;
    margin-top: 5px;
    margin-bottom: 20px;
}

.support-buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.btn {
    padding: 10px 20px;
    border-radius: 30px;
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 13px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn:hover {
    transform: translateY(-2px);
}

.telegram {
    background: linear-gradient(135deg, #0088cc, #00aaff);
}

.whatsapp {
    background: linear-gradient(135deg, #25d366, #128c7e);
}

.whatsapp-pay {
    background: linear-gradient(135deg, #25d366, #128c7e);
    display: block;
    text-align: center;
    margin-top: 15px;
    padding: 14px;
    font-size: 15px;
}

.container {
    max-width: 480px;
    margin: 20px auto;
    padding: 0 15px;
}

/* Modern Glassmorphic Card */
.glass {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.card h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 18px;
    color: #f1f5f9;
    display: flex;
    align-items: center;
    gap: 10px;
}

.step-num {
    background: #38bdf8;
    color: #0f172a;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
}

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-size: 13px;
    color: #cbd5e1;
    margin-bottom: 6px;
    font-weight: 500;
}

select, input {
    width: 100%;
    padding: 12px 14px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    outline: none;
    transition: border 0.3s ease;
}

select:focus, input:focus {
    border-color: #38bdf8;
}

select option {
    background: #1e293b;
    color: #fff;
}

.price-box {
    margin-top: 20px;
    padding: 15px;
    background: rgba(56, 189, 248, 0.1);
    border: 1px dashed rgba(56, 189, 248, 0.4);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price-label {
    font-size: 14px;
    color: #94a3b8;
}

.price-val {
    font-size: 22px;
    font-weight: 700;
    color: #38bdf8;
}

.submit-btn {
    width: 100%;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
    border: none;
    padding: 14px;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
}

.pay-subtext {
    font-size: 13px;
    color: #94a3b8;
    margin-bottom: 15px;
}

.qr-container {
    text-align: center;
    background: #ffffff;
    padding: 15px;
    border-radius: 12px;
    display: inline-block;
    margin: 10px auto;
    width: 100%;
}

.qr-container img {
    width: 180px;
    height: 180px;
}

.pay-note {
    font-size: 12px;
    color: #fbbf24;
    margin-top: 15px;
    line-height: 1.4;
}

footer {
    text-align: center;
    font-size: 12px;
    color: #64748b;
    margin-top: 20px;
}
