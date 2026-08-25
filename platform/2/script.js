// Global State Variables
let currentPlatform = 'all';
let calculatedPrice = 0;

// Platform Icon SVG / Image Links
const platformLogos = {
  instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  facebook: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
  youtube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  tiktok: "https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg",
  telegram: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
  whatsapp: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
};

// Dynamic Helper: Auto Detect Logo based on category or service text name
function getLogoByText(text) {
  if (!text) return platformLogos.instagram;
  const lower = text.toLowerCase();
  
  if (lower.includes('telegram')) return platformLogos.telegram;
  if (lower.includes('facebook') || lower.includes('fb')) return platformLogos.facebook;
  if (lower.includes('youtube') || lower.includes('yt')) return platformLogos.youtube;
  if (lower.includes('tiktok')) return platformLogos.tiktok;
  if (lower.includes('whatsapp')) return platformLogos.whatsapp;
  if (lower.includes('instagram') || lower.includes('ig')) return platformLogos.instagram;
  
  // Default fallback if no match found
  return platformLogos[currentPlatform] || platformLogos.instagram;
}

// All Platform & Service Data
const platformData = {
  all: {
    title: "All Services",
    icon: "fa-solid fa-layer-group",
    linkPlaceholder: "Link profile / post / channel"
  },
  instagram: {
    title: "Instagram Boost",
    icon: "fa-brands fa-instagram",
    linkPlaceholder: "Link Instagram profile",
    categories: {
      "working": {
        name: "𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬- 𝐌𝐢𝐱 𝐒𝐞𝐫𝐯𝐢𝐜𝐞",
        services: [
          { id: "1220", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄", rate: 65.358, avgTime: "0–10 Min Start" },
          { id: "1221", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄", rate: 67.929, avgTime: "0–10 Min Start" },
          { id: "1222", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄", rate: 70.501, avgTime: "0–10 Min Start" },
          { id: "1223", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️", rate: 73.072, avgTime: "0–10 Min Start" },
        ]
      },
      "nondrop": {
        name: "𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐟𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬 [𝐍𝐨𝐧-𝐃𝐫𝐨𝐩]",
        services: [
          { id: "1072", name: "Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - No Refill 🔄", rate: 67.929, avgTime: "0–2 Min Start" },
          { id: "1073", name: "Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 30D Refill 🔄", rate: 73.072, avgTime: "0–2 Min Start" },
          { id: "1074", name: "Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 60D Refill 🔄", rate: 75.644, avgTime: "0–2 Min Start" },
          { id: "1075", name: "Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 90D Refill 🔄", rate: 78.215, avgTime: "0–2 Min Start" },
          { id: "1076", name: "Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - 365D Refill 🔄", rate: 79.858, avgTime: "0–2 Min Start" },
          { id: "1077", name: "Instagram Followers | 100% Real Accounts - Non Drop | 300K/Day - Max Unlimited | 0–2 Min Start - Lifetime Refill ♻️", rate: 83.358, avgTime: "0–2 Min Start" },
        ]
      },
      "Instagram like real profile": {
        name: "𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐋𝐢𝐤𝐞 𝐈𝐧𝐝𝐢𝐚 𝐦𝐢𝐱 𝐑𝐞𝐚𝐥 𝐩𝐫𝐨𝐟𝐢𝐥𝐞",
        services: [
          { id: "881", name: "Instagram Likes | Real Profiles | 100% Non Drop | 500K+ Per Day | 60 Days Refill♻️ | 0–10 Minutes Start", rate: 14.600, avgTime: "0–10 Minutes Start" },
          { id: "882", name: "Instagram Likes | Real Profiles | 100% Non Drop | 500K+ Per Day | 90 Days Refill♻️ | 0–10 Minutes Start", rate: 15.664, avgTime: "0–10 Minutes Start" },
          { id: "883", name: "Instagram Likes | Real Profiles | 100% Non Drop | 500K+ Per Day | 365 Days Refill♻️ | 0–10 Minutes Start", rate: 16.729, avgTime: "0–10 Minutes Start" },
          { id: "884", name: "Instagram Likes | Real Profiles ✓ | 100% Non Drop | 500K+ Per Day | Life Time Refill♻️ | 0–10 Minutes Start", rate: 20.600, avgTime: "0–10 Minutes Start" }
        ]
      },
      "🇮🇳 Instagram Repost- India high quality": {
        name: "🇮🇳 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐑𝐞𝐩𝐨𝐬𝐭- 𝐈𝐧𝐝𝐢𝐚 𝐡𝐢𝐠𝐡 𝐪𝐮𝐚𝐥𝐢𝐭𝐲",
        services: [
          { id: "2008", name: "Instagram Repost | Worldwide | Max 50K | 100% 🇮🇳 Real Accounts | 12–30 Min Start", rate: 60.94, avgTime: "12–30 Min Start" },
          { id: "2086", name: "🇮🇳 Instagram Repost | Worldwide | Max 100K | 100% 🇮🇳 Real Accounts | 12–30 Min Start", rate: 72.6832, avgTime: "12–30 Min Start" }
        ]
      },
      "🇮🇳 Instagram Shares - Premium Quality | Super Fast": {
        name: "𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐒𝐡𝐚𝐫𝐞𝐬- 🇮🇳𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐐𝐮𝐚𝐥𝐢𝐭𝐲",
        services: [
          { id: "121", name: "🇮🇳 Instagram Shares | Premium Quality | Max 1M | 100K/Day | SuperFast | 10–25 Min Start | Lifetime Refill ♻️", rate: 22.266, avgTime: "10–25 Min Start" },
          { id: "123", name: "🇮🇳 Instagram Shares | High Quality | Max 1M | 200K/Day | SuperFast | 10–30 Min Start | Lifetime Refill ♻️ | One Click Done", rate: 20.33, avgTime: "10–30 Min Start" }
        ]
      },
      "🇮🇳 Instagram Reels/ Video Views High Speed": {
        name: "🇮🇳 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐑𝐞𝐞𝐥𝐬/ 𝐕𝐢𝐝𝐞𝐨 𝐕𝐢𝐞𝐰𝐬 𝐇𝐢𝐠𝐡 𝐒𝐩𝐞𝐞𝐝",
        services: [
          { id: "2623", name: "🇮🇳Instagram Reels views [ Non-Drop] 500K/1M Days ULTRA FAST 0–5 Minutes Start Life-timeRefill♻️", rate: 2.10, avgTime: "0–5 Minutes Start" }
        ]
      },
      "🇮🇳Instagram Photo / post Views": {
        name: "🇮🇳𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦 𝐏𝐡𝐨𝐭𝐨 / 𝐩𝐨𝐬𝐭 𝐕𝐢𝐞𝐰𝐬",
        services: [
          { id: "1030", name: "🇮🇳Instagram Photo & Post Views | Photo + Post + Image   Impressions | Non Drop | 1M+ Per Day | 0–1 Minutes Start", rate: 15.286, avgTime: "0–1 Minutes Start" }
        ]
      }
    }
  },
  facebook: {
    title: "Facebook Boost",
    icon: "fa-brands fa-facebook",
    linkPlaceholder: "Link Facebook page or profile",
    categories: {
      "Facebook follower real account medium speed": {
        name: "𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐟𝐨𝐥𝐥𝐨𝐰𝐞𝐫 𝐌𝐢𝐱 𝐐𝐮𝐚𝐥𝐢𝐭𝐲[𝐍𝐨𝐧-𝐃𝐫𝐨𝐩]",
        services: [
          { id: "6207", name: "Facebook - Followers | 100K/Day - Max 100K | Real Accounts | Medium Speed | 0–30 Min Start | 90D Refill ♻️", rate: 40.4272, avgTime: "0–30 Min Start" },
          { id: "6208", name: "Facebook - Followers | 100K/Day - Max 100K | Real Accounts | Medium Speed | 0–30 Min Start | 365D Refill ♻️", rate: 43.0640, avgTime: "0–30 Min Start" },
          { id: "6209", name: "Facebook - Followers | 100K/Day - Max 100K | Real Accounts | Medium Speed | 0–30 Min Start | Lifetime Refill ♻️", rate: 54.7008, avgTime: "0–30 Min Start" },
          { id: "1226", name: "Facebook - Comments | 10K/Day - Max 50K", rate: 28.000, avgTime: "0–30 Min Start" },
        ]
      },
      "🇮🇳 Real Video Views Facebook - High Quality": {
        name: "🇮🇳 𝐑𝐞𝐚𝐥 𝐕𝐢𝐝𝐞𝐨 𝐕𝐢𝐞𝐰𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 - 𝐇𝐢𝐠𝐡 𝐐𝐮𝐚𝐥𝐢𝐭𝐲",
        services: [
          { id: "6581", name: "Facebook - Views | 50K/Day - Max 100K | Real High Quality | Instant | 0–30 Min Start | 90D Refill ♻️", rate: 13.2500, avgTime: "0–30 Min Start" },
          { id: "6582", name: "Facebook - Views | 50K/Day - Max 100K | Real High Quality | Instant | 0–30 Min Start | 365D Refill ♻️", rate: 15.4000, avgTime: "0–30 Min Start" },
          { id: "6583", name: "Facebook - Views | 50K/Day - Max 100K | Real High Quality | Instant | 0–30 Min Start | Lifetime Refill ♻️", rate: 17.5500, avgTime: "0–30 Min Start" }
        ]
      },
      "Facebook - Post Reactions mix | Cheapest Rate": {
        name: "𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 - 𝐏𝐨𝐬𝐭 𝐑𝐞𝐚𝐜𝐭𝐢𝐨𝐧𝐬 𝐦𝐢𝐱~ 𝐋𝐨𝐰 𝐑𝐚𝐭𝐞",
        services: [
          { id: "5507", name: "Facebook - Post Likes 👍 | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 20.5170, avgTime: "0–30 Min Start" },
          { id: "5508", name: "Facebook - Reaction | Love ❤️ | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 23.5170, avgTime: "0–30 Min Start" },
          { id: "5509", name: "Facebook - Reaction | Care 🥰 | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 22.5170, avgTime: "0–30 Min Start" },
          { id: "5510", name: "Facebook - Reaction | Wow 😮 | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 21.5170, avgTime: "0–30 Min Start" },
          { id: "5511", name: "Facebook - Reaction | Haha 😂 | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 20.5170, avgTime: "0–30 Min Start" },
          { id: "5512", name: "Facebook - Reaction | Sad 😢 | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 20.5170, avgTime: "0–30 Min Start" },
          { id: "5513", name: "Facebook - Reaction | Angry 😡 | 50K/Day - Max 100K | Worldwide | Instant | 0–30 Min Start | No Refill", rate: 20.5170, avgTime: "0–30 Min Start" }
        ]
      }
    }
  },
  youtube: {
    title: "YouTube Boost",
    icon: "fa-brands fa-youtube",
    linkPlaceholder: "Link YouTube channel or video",
    categories: {
      "YouTube Subscribers | No Guaranteed": {
        name: "𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐒𝐮𝐛𝐬𝐜𝐫𝐢𝐛𝐞𝐫𝐬 | 𝐍𝐨 𝐆𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐝",
        services: [
          { id: "69", name: "YouTube Subscribers | Low Quality | 50K+/Day | 0–5 Min Start | Fast | No Refill 🔄", rate: 36.429, avgTime: "0–5 Min Start" },
          { id: "950", name: "YouTube Subscribers | Low Quality | 100K+/Day | 0–5 Min Start | Ultra Cheapest | No Refill 🔄", rate: 70.149, avgTime: "0–5 Min Start" },
          { id: "951", name: "YouTube Subscribers | Low Quality | 500K+/Day | 0–5 Min Start | No Refill 🔄", rate: 76.345, avgTime: "0–5 Min Start" }
        ]
      },
      "YouTube Subscribers- 🇮🇳 Guaranteed ✅": {
        name: "𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐒𝐮𝐛𝐬𝐜𝐫𝐢𝐛𝐞𝐫𝐬- 🇮🇳 𝐆𝐮𝐚𝐫𝐚𝐧𝐭𝐞𝐞𝐝 ✅",
        services: [
          { id: "964", name: "YouTube Subscribers 🇮🇳 | High Quality | 100% Non Drop | 100+/Day | 0–15 Min Start ⚡ | Lifetime Refill ♻️", rate: 2541.601, avgTime: "0–15 Min Start" }
        ]
      },
      "YouTube Likes [Best Quality] — 🇮🇳 Premium": {
        name: "𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐋𝐢𝐤𝐞𝐬 [𝐁𝐞𝐬𝐭 𝐐𝐮𝐚𝐥𝐢𝐭𝐲] — 🇮🇳 𝐏𝐫𝐞𝐦𝐢𝐮𝐦",
        services: [
          { id: "2009", name: "YouTube Likes | Best Quality | Max 1M | Non Drop | Super Instant | 0–20 Min Start | 100K/Day | No Refill 🔄", rate: 49.8745, avgTime: "0–20 Min Start" },
          { id: "2010", name: "YouTube Likes | Best Quality | Max 1M | Non Drop | Super Instant | 0–20 Min Start | 100K/Day | 365D Refill 🔄", rate: 299.0462, avgTime: "0–20 Min Start" }
        ]
      },
      "YouTube Views 🇮🇳 {Shorts / Video} Non Drop": {
        name: "𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐕𝐢𝐞𝐰𝐬 🇮🇳 {𝐒𝐡𝐨𝐫𝐭𝐬 / 𝐕𝐢𝐝𝐞𝐨} 𝐍𝐨𝐧~𝐃𝐫𝐨𝐩",
        services: [
          { id: "815", name: "YouTube Shorts / Video Views | Max 100K | Non Drop 📉 | Lifetime Guaranteed ♻️ | 20K/Day 🚀 | 0–20 Min Start ⚡", rate: 199.24, avgTime: "0–20 Min Start" }
        ]
      }
    }
  },
  tiktok: {
    title: "TikTok Boost",
    icon: "fa-brands fa-tiktok",
    linkPlaceholder: "Link TikTok account or video",
    categories: {}
  },
  telegram: {
    title: "Telegram Boost",
    icon: "fa-brands fa-telegram",
    linkPlaceholder: "Link Telegram channel / group / post",
    categories: {
      "Telegram Members | High Quality": {
        name: "𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 [𝐍𝐨𝐧-𝐃𝐫𝐨𝐩]",
        services: [
          { id: "3001", name: "Telegram Channel/Group Members | Real Accounts | Non Drop | 50K/Day | 0–15 Min Start - Lifetime Refill ♻️", rate: 45.500, avgTime: "0–15 Min Start" },
          { id: "3002", name: "Telegram Channel Members | High Quality | Fast Delivery | 0–5 Min Start - 30D Refill 🔄", rate: 38.200, avgTime: "0–5 Min Start" }
        ]
      },
      "Telegram Post Views": {
        name: "𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝐏𝐨𝐬𝐭 𝐕𝐢𝐞𝐰𝐬 ~ 𝐒𝐮𝐩𝐞𝐫 𝐅𝐚𝐬𝐭",
        services: [
          { id: "3010", name: "Telegram Post Views | Last 5 Posts | Super Instant | 0–2 Min Start", rate: 5.500, avgTime: "0–2 Min Start" },
          { id: "3011", name: "Telegram Post Views | Single Post | 100K/Day | Instant Start", rate: 3.200, avgTime: "0–1 Min Start" }
        ]
      }
    }
  }
};

// Helper function to get combined categories for 'all'
function getAllCategoriesCombined() {
  const combined = {};
  const platformKeys = ['instagram', 'facebook', 'youtube', 'tiktok', 'telegram'];
  
  platformKeys.forEach(plat => {
    if (platformData[plat] && platformData[plat].categories) {
      for (let catKey in platformData[plat].categories) {
        combined[`${plat}_${catKey}`] = platformData[plat].categories[catKey];
      }
    }
  });
  return combined;
}

// Render Select With Dynamic Platform Icons & Auto-scroll
function setupSelectIcons(selectId) {
  const selectElem = document.getElementById(selectId);
  if (!selectElem) return;

  let wrapper = selectElem.parentElement.querySelector('.custom-select-wrapper');
  if (wrapper) wrapper.remove();

  wrapper = document.createElement('div');
  wrapper.className = 'custom-select-wrapper';
  wrapper.style.cssText = 'position: relative; width: 100%; font-family: sans-serif;';

  const defaultBoxStyle = 'background: #f8fafc; color: #1e293b; font-weight: 500; border: 2px solid #ec4899;';

  const isCategory = selectId === 'categorySelect';
  const boxFontSize = '14px';
  const optionFontSize = isCategory ? '14px' : '13px';

  const selectedDisplay = document.createElement('div');
  selectedDisplay.className = 'custom-selected-box';
  selectedDisplay.style.cssText = `display: flex; align-items: center; gap: 10px; padding: 12px; border-radius: 8px; cursor: pointer; font-size: ${boxFontSize}; transition: all 0.3s ease; ${defaultBoxStyle}`;

  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'custom-options-container';
  optionsContainer.style.cssText = 'display: none; position: absolute; top: 105%; left: 0; right: 0; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; max-height: 250px; overflow-y: auto; z-index: 999; box-shadow: 0 10px 25px rgba(0,0,0,0.15);';

  const formatTextWithBadge = (text) => {
    return text.replace(/^(\d+)\s*[-—]?\s*/, '<span class="service-id-badge" style="background: #8b5cf6; color: #ffffff; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block; margin-right: 6px;">$1</span>');
  };

  let selectedItemElement = null;

  Array.from(selectElem.options).forEach((opt, index) => {
    const item = document.createElement('div');
    item.className = 'custom-option-item';
    
    // Automatically detect app logo from text
    const logoUrl = getLogoByText(opt.textContent);
    const isSelected = index === selectElem.selectedIndex;
    const formattedText = formatTextWithBadge(opt.textContent);

    const defaultItemStyle = `display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: ${optionFontSize}; color: #1e293b; background: #ffffff; transition: background 0.2s;`;
    const activeItemStyle = `display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: ${optionFontSize}; color: #ffffff; background: #8b5cf6;`;

    item.style.cssText = isSelected ? activeItemStyle : defaultItemStyle;
    item.innerHTML = `<img src="${logoUrl}" style="width:20px; height:20px; object-fit:contain; flex-shrink:0;"> <span>${formattedText}</span>`;

    if (isSelected) {
      selectedItemElement = item;
      selectedDisplay.innerHTML = `<img src="${logoUrl}" style="width:20px; height:20px; object-fit:contain; flex-shrink:0;"> <span>${formattedText}</span>`;
    }

    item.onclick = () => {
      selectElem.selectedIndex = index;
      setupSelectIcons(selectId);
      optionsContainer.style.display = 'none';
      
      const event = new Event('change');
      selectElem.dispatchEvent(event);
    };

    item.onmouseenter = () => {
      if (index !== selectElem.selectedIndex) {
        item.style.background = '#f1f5f9';
      }
    };
    item.onmouseleave = () => {
      if (index !== selectElem.selectedIndex) {
        item.style.background = '#ffffff';
      }
    };

    optionsContainer.appendChild(item);
  });

  selectedDisplay.onclick = (e) => {
    e.stopPropagation();
    const isVisible = optionsContainer.style.display === 'block';
    document.querySelectorAll('.custom-options-container').forEach(c => c.style.display = 'none');
    
    if (!isVisible) {
      optionsContainer.style.display = 'block';
      if (selectedItemElement) {
        optionsContainer.scrollTop = selectedItemElement.offsetTop - (optionsContainer.clientHeight / 2) + (selectedItemElement.clientHeight / 2);
      }
    } else {
      optionsContainer.style.display = 'none';
    }
  };

  selectElem.style.display = 'none';
  wrapper.appendChild(selectedDisplay);
  wrapper.appendChild(optionsContainer);
  selectElem.parentElement.appendChild(wrapper);
}

document.addEventListener('click', () => {
  document.querySelectorAll('.custom-options-container').forEach(c => c.style.display = 'none');
});

// Platform Selection Logic
function selectPlatform(platform) {
  currentPlatform = platform;

  document.querySelectorAll('.platform-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-${platform}`);
  if (activeBtn) activeBtn.classList.add('active');

  const data = platformData[platform];
  if (data) {
    const heroTitle = document.getElementById('heroPlatformTitle');
    const heroIcon = document.getElementById('heroPlatformIcon');
    const checkoutIcon = document.getElementById('checkoutPlatformIcon');
    const linkLabel = document.getElementById('linkLabel');

    if (heroTitle) heroTitle.innerText = data.title;
    if (heroIcon) heroIcon.innerHTML = `<i class="${data.icon}"></i>`;
    if (checkoutIcon) checkoutIcon.innerHTML = `<i class="${data.icon}"></i>`;
    if (linkLabel) linkLabel.innerText = data.linkPlaceholder;
  }

  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect) {
    categorySelect.innerHTML = "";
    
    let categoriesObj = {};
    if (platform === 'all') {
      categoriesObj = getAllCategoriesCombined();
    } else if (data && data.categories) {
      categoriesObj = data.categories;
    }

    for (let key in categoriesObj) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = categoriesObj[key].name;
      categorySelect.appendChild(option);
    }
    setupSelectIcons('categorySelect');
  }

  const searchInput = document.getElementById('categorySearchInput');
  if (searchInput) searchInput.value = "";

  updateServices();
}

// Service Options & Average Time Update Logic
function updateServices() {
  const categorySelect = document.getElementById("categorySelect");
  if (!categorySelect) return;
  
  const categoryKey = categorySelect.value;
  const serviceSelect = document.getElementById("serviceSelect");
  if (!serviceSelect) return;
  
  serviceSelect.innerHTML = "";

  let categoriesObj = {};
  if (currentPlatform === 'all') {
    categoriesObj = getAllCategoriesCombined();
  } else if (platformData[currentPlatform]) {
    categoriesObj = platformData[currentPlatform].categories;
  }

  if (!categoryKey || !categoriesObj[categoryKey]) {
    const timeBox = document.querySelector('.time-box');
    if (timeBox) timeBox.innerHTML = `⚡ Average Time: <strong>N/A</strong>`;
    setupSelectIcons('serviceSelect');
    calculatePrice();
    return;
  }

  const services = categoriesObj[categoryKey].services;

  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.id;
    option.setAttribute("data-rate", service.rate);
    option.setAttribute("data-avgtime", service.avgTime);
    option.textContent = `${service.id} - ${service.name} - ₹${service.rate}`;
    serviceSelect.appendChild(option);
  });

  setupSelectIcons('serviceSelect');
  updateAverageTime();
  calculatePrice();
}

// Dynamic Average Time Display
function updateAverageTime() {
  const serviceSelect = document.getElementById("serviceSelect");
  if (!serviceSelect) return;

  const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  const timeBox = document.querySelector('.time-box');
  
  if (selectedOption && timeBox) {
    const avgTime = selectedOption.getAttribute("data-avgtime");
    timeBox.innerHTML = `⚡ Average Time: <strong>${avgTime}</strong>`;
  } else if (timeBox) {
    timeBox.innerHTML = `⚡ Average Time: <strong>N/A</strong>`;
  }
}

// Calculate Price Logic
function calculatePrice() {
  const serviceSelect = document.getElementById("serviceSelect");
  if (!serviceSelect) return;

  const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  const totalPriceText = document.getElementById("totalPriceText");
  
  if (!selectedOption) {
    if (totalPriceText) totalPriceText.innerText = "0.00";
    calculatedPrice = "0.00";
    return;
  }

  const ratePer1000 = parseFloat(selectedOption.getAttribute("data-rate"));
  const quantityInput = document.getElementById("mainQuantityInput") ? document.getElementById("mainQuantityInput").value : 0;
  const quantity = parseInt(quantityInput) || 0;

  calculatedPrice = ((ratePer1000 / 1000) * quantity).toFixed(2);
  if (totalPriceText) totalPriceText.innerText = calculatedPrice;
  
  updateAverageTime();
}

// Checkout Navigation with Instant Client-side QR Generation
let qrcodeInstance = null;

function openCheckout() {
  const mainLink = document.getElementById("mainLinkInput");
  const mainQty = document.getElementById("mainQuantityInput");

  const link = mainLink ? mainLink.value.trim() : "";
  const quantityInput = mainQty ? mainQty.value.trim() : "";
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

  const checkoutTitle = document.getElementById("checkoutServiceTitle");
  const checkoutPrice = document.getElementById("checkoutPriceText");

  if (checkoutTitle) checkoutTitle.innerText = selectedText.split(' - ₹')[0];
  if (checkoutPrice) checkoutPrice.innerText = calculatedPrice;

  const upiId = "rajsmmpanel@jio";
  const upiString = `upi://pay?pa=${upiId}&am=${calculatedPrice}&cu=INR`;

  // Instant Browser-based QR Generation (Zero Delay)
  const qrContainer = document.getElementById("qrcode");
  if (qrContainer) {
    qrContainer.innerHTML = ""; 
    
    qrcodeInstance = new QRCode(qrContainer, {
      text: upiString,
      width: 130,
      height: 120,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  const checkoutPage = document.getElementById("checkoutPage");
  if (checkoutPage) {
    checkoutPage.classList.remove("hidden");
    history.pushState({ checkoutOpen: true }, "", "#checkout");
  }
}

function closeCheckout() {
  const checkoutPage = document.getElementById("checkoutPage");
  if (checkoutPage && !checkoutPage.classList.contains("hidden")) {
    checkoutPage.classList.add("hidden");
    if (history.state && history.state.checkoutOpen) {
      history.back();
    }
  }
}

// Left Sidebar Handlers
function openSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.add("active");
  if (overlay) overlay.classList.add("active");
  
  history.pushState({ sidebarOpen: true }, "", "#sidebar");
}

function closeSidebar() {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  
  if (sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    
    if (history.state && history.state.sidebarOpen) {
      history.back();
    }
  }
}

window.addEventListener('popstate', function (event) {
  const sidebar = document.getElementById("leftSidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const checkoutPage = document.getElementById("checkoutPage");

  if (sidebar && sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    return;
  }

  if (checkoutPage && !checkoutPage.classList.contains("hidden")) {
    checkoutPage.classList.add("hidden");
    return;
  }
});

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

// Modern Glowing Popup & Confetti
function showModernPopup(title, message, type = 'success') {
  const existingPopup = document.getElementById('modernCustomPopup');
  if (existingPopup) existingPopup.remove();

  const popupOverlay = document.createElement('div');
  popupOverlay.id = 'modernCustomPopup';
  popupOverlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
    display: flex; align-items: center; justify-content: center;
    z-index: 99999; animation: fadeInPopup 0.3s ease;
  `;

  const isSuccess = type === 'success';
  const glowColor = isSuccess ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';
  const iconSymbol = isSuccess ? '✅' : '❌';

  popupOverlay.innerHTML = `
    <div style="
      background: #ffffff; width: 90%; max-width: 380px; padding: 30px 20px;
      border-radius: 20px; text-align: center; box-shadow: 0 0 30px ${glowColor};
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      transform: scale(0.8); animation: scaleUpPopup 0.3s ease forwards;
    ">
      <div style="font-size: 50px; margin-bottom: 15px;">${iconSymbol}</div>
      <h3 style="margin: 0 0 10px; color: #1e293b; font-size: 20px; font-weight: 700;">${title}</h3>
      <p style="margin: 0 0 25px; color: #64748b; font-size: 14px; line-height: 1.5;">${message}</p>
      <button id="modernPopupCloseBtn" style="
        background: ${isSuccess ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
        color: #ffffff; border: none; padding: 12px 30px; font-size: 15px;
        font-weight: 600; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 15px ${glowColor};
        transition: transform 0.2s;
      ">Okay</button>
    </div>
  `;

  document.body.appendChild(popupOverlay);

  if (!document.getElementById('modernPopupKeyframes')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modernPopupKeyframes';
    styleSheet.innerHTML = `
      @keyframes fadeInPopup { from { opacity: 0; } to { opacity: 1; } }
      @keyframes scaleUpPopup { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    `;
    document.head.appendChild(styleSheet);
  }

  document.getElementById('modernPopupCloseBtn').onclick = () => {
    popupOverlay.remove();
  };
  popupOverlay.onclick = (e) => {
    if (e.target === popupOverlay) popupOverlay.remove();
  };

  if (isSuccess && typeof triggerConfetti === 'function') {
    triggerConfetti();
  }
}

function triggerConfetti() {
  if (window.confetti) {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  } else {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    script.onload = () => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    };
    document.head.appendChild(script);
  }
}

async function sendOrderToTelegram() {
  const mainLink = document.getElementById("mainLinkInput");
  const checkoutTxn = document.getElementById("checkoutTxnId");
  const checkoutTitle = document.getElementById("checkoutServiceTitle");
  const mainQty = document.getElementById("mainQuantityInput");
  
  const submitBtn = document.querySelector("#checkoutPage button[onclick*='sendOrderToTelegram']") || document.querySelector("#checkoutPage button");

  const link = mainLink ? mainLink.value.trim() : "";
  const utr = checkoutTxn ? checkoutTxn.value.trim() : "";
  const service = checkoutTitle ? checkoutTitle.innerText : "";
  const quantity = mainQty ? mainQty.value : "";

  if (!utr) {
    showModernPopup("Error!", "Please enter Transaction ID / UTR Number.", "error");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";
    submitBtn.dataset.originalText = submitBtn.innerText;
    submitBtn.innerText = "Processing...";
  }

  const botToken = "8960508595:AAG8-0ZNbOGZ-iRtSh5xzAabhSrHbRWjUaE"; 
  const chatId = "8895603997";

  const message = `🛍️ New Order Received!\n\n` +
                  `📌 Platform: ${currentPlatform.toUpperCase()}\n` +
                  `🏷️ Service: ${service}\n` +
                  `🔢 Quantity: ${quantity}\n` +
                  `💰 Price: ₹${calculatedPrice}\n` +
                  `🔗 Link: ${link}\n` +
                  `💳 UTR/TxID: ${utr}\n\n` +
                  `📅 Date: ${new Date().toLocaleString()}`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });

    const data = await response.json();

    if (data.ok) {
      showModernPopup("Success!", "Order submitted successfully!", "success");
      if (checkoutTxn) checkoutTxn.value = "";
      closeCheckout();
    } else {
      showModernPopup("Telegram Error", data.description, "error");
    }
  } catch (error) {
    console.error("Error submitting order:", error);
    showModernPopup("Connection Failed!", "Please check your network connection.", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
      submitBtn.innerText = submitBtn.dataset.originalText || "Confirm Order";
    }
  }
}

function submitOrderToWhatsApp() {
  sendOrderToTelegram();
}

// Search Logic matching user screenshot style
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('categorySearchInput');
  
  if (searchInput) {
    let searchDropdown = document.createElement('div');
    searchDropdown.id = 'liveSearchDropdown';
    searchDropdown.style.cssText = `
      display: none; position: absolute; top: calc(100% + 5px); left: 0; right: 0;
      background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
      max-height: 280px; overflow-y: auto; z-index: 1000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15); padding: 8px;
    `;
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(searchDropdown);

    searchInput.addEventListener('input', function (e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      searchDropdown.innerHTML = "";

      if (searchTerm === "") {
        searchDropdown.style.display = 'none';
        return;
      }

      let matchedServices = [];

      for (let platKey in platformData) {
        if (platKey === 'all') continue;
        const categories = platformData[platKey].categories;
        for (let catKey in categories) {
          categories[catKey].services.forEach(service => {
            if (service.id.includes(searchTerm) || service.name.toLowerCase().includes(searchTerm)) {
              matchedServices.push({ ...service, platform: platKey, categoryKey: catKey });
            }
          });
        }
      }

      if (matchedServices.length > 0) {
        searchDropdown.style.display = 'block';
        
        matchedServices.forEach(service => {
          const item = document.createElement('div');
          item.style.cssText = `
            display: flex; align-items: center; gap: 10px; padding: 10px 12px;
            cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #1e293b;
            border-radius: 8px; transition: background 0.2s;
          `;
          
          item.innerHTML = `
            <span style="background: #8b5cf6; color: #ffffff; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; flex-shrink: 0;">${service.id}</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${service.name}</span>
          `;

          item.onmouseenter = () => item.style.background = '#f1f5f9';
          item.onmouseleave = () => item.style.background = '#ffffff';

          item.onclick = () => {
            if (currentPlatform !== service.platform) {
              selectPlatform(service.platform);
            }
            
            const categorySelect = document.getElementById('categorySelect');
            categorySelect.value = service.categoryKey;
            setupSelectIcons('categorySelect');
            
            updateServices();
            
            const serviceSelect = document.getElementById('serviceSelect');
            serviceSelect.value = service.id;
            setupSelectIcons('serviceSelect');
            calculatePrice();

            searchDropdown.style.display = 'none';
            searchInput.value = '';
          };

          searchDropdown.appendChild(item);
        });
      } else {
        searchDropdown.style.display = 'block';
        searchDropdown.innerHTML = `<div style="padding: 12px; text-align: center; color: #64748b; font-size: 13px;">No matching services found</div>`;
      }
    });

    document.addEventListener('click', function (e) {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });
  }
});

// Auto Initialize Page to Default 'all'
window.onload = function() {
  selectPlatform('all');
};
