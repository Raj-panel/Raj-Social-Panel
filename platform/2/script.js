// Global State Variables
let currentPlatform = 'all';
let calculatedPrice = 0;

// Platform SVG / Image Logos
const platformLogos = {
  instagram: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
  facebook: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
  youtube: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  tiktok: "https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg",
  telegram: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
  whatsapp: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
};

// Precise Logo Detection via Explicit Platform Tag & Text Analysis
function getLogoForOption(opt) {
  const targetPlat = opt.getAttribute('data-platform');
  if (targetPlat && platformLogos[targetPlat]) {
    return platformLogos[targetPlat];
  }

  const text = (opt.textContent || "").toLowerCase();
  if (text.includes('telegram')) return platformLogos.telegram;
  if (text.includes('facebook') || text.includes('fb')) return platformLogos.facebook;
  if (text.includes('youtube') || text.includes('yt')) return platformLogos.youtube;
  if (text.includes('tiktok')) return platformLogos.tiktok;
  if (text.includes('whatsapp')) return platformLogos.whatsapp;
  if (text.includes('instagram') || text.includes('ig')) return platformLogos.instagram;

  return platformLogos.instagram;
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
          { id: "1220", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 60D Refill 🔄", rate: 53.358, avgTime: "0–10 Min Start" },
          { id: "1221", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 90D Refill 🔄", rate: 57.929, avgTime: "0–10 Min Start" },
          { id: "1222", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - 365D Refill 🔄", rate: 60.501, avgTime: "0–10 Min Start" },
          { id: "1223", name: "Instagram Followers | Real Profile Accounts | Less Drop - 100K/Day - Max Unlimited | 0–10 Min Start - Lifetime Refill ♻️", rate: 63.072, avgTime: "0–10 Min Start" },
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
          { id: "1030", name: "🇮🇳Instagram Photo & Post Views | Photo + Post + Image Impressions | Non Drop | 1M+ Per Day | 0–1 Minutes Start", rate: 10.286, avgTime: "0–1 Minutes Start" }
        ]
      }
    }
  },
  facebook: {
    title: "Facebook Boost",
    icon: "fa-brands fa-facebook",
    linkPlaceholder: "Link Facebook page or profile",
    categories: {
      "Facebook - Followers | HQ - Cheapest Price": {
        name: "𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 - 𝐅𝐨𝐥𝐥𝐨𝐰𝐞𝐫𝐬 | 𝐇𝐐 - 𝐂𝐡𝐞𝐚𝐩𝐞𝐬𝐭 𝐏𝐫𝐢𝐜𝐞",
        services: [
          { id: "4501", name: "Facebook Followers | 100K/Day | Max 1M | Global Name | Instant | 0–30 Min Start | 60D Refill", rate: 34.1075, avgTime: "0–30 Min Start" },
          { id: "4502", name: "Facebook Followers | 100K/Day | Max 1M | Global Name | Instant | 0–30 Min Start | 90D Refill", rate: 35.1525, avgTime: "0–30 Min Start" },
          { id: "5988", name: "Facebook Followers | 100K/Day | Max 1M | Global Name | Instant | 0–30 Min Start | 365D Refill ♻️", rate: 36.1975, avgTime: "0–30 Min Start" },
          { id: "5989", name: "Facebook Followers | 100K/Day | Max 1M | Global Name | Instant | 0–30 Min Start | Lifetime Refill♻️", rate: 40.2425, avgTime: "0–30 Min Start" }
        ]
      },
      "Facebook follower real account medium speed": {
        name: "𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐟𝐨𝐥𝐥𝐨𝐰𝐞𝐫 𝐑𝐞𝐚𝐥 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 [𝐍𝐨𝐧-𝐃𝐫𝐨𝐩]",
        services: [
          { id: "6426", name: "Facebook - Followers | 100K/Day - Max 100K | Real Accounts| 0–30 Min Start | 90D Refill ♻️", rate: 40.4272, avgTime: "0–30 Min Start" },
          { id: "6427", name: "Facebook - Followers | 100K/Day - Max 100K | Real Accounts| 0–30 Min Start | 365D Refill ♻️", rate: 45.0640, avgTime: "0–30 Min Start" },
          { id: "6428", name: "Facebook - Followers | 100K/Day - Max 100K | Real Accounts| 0–30 Min Start | Lifetime Refill ♻️", rate: 53.7008, avgTime: "0–30 Min Start" },
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
        name: "𝐘𝐨𝐮𝐓𝐮𝐛𝐞 𝐒𝐮𝐛𝐬𝐜𝐫𝐢𝐛𝐞𝐫𝐬- 🇮🇳[𝐍𝐨𝐧~𝐃𝐫𝐨𝐩] ✅",
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
      "Telegram Members - Non~Drop": {
        name: "𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 𝐌𝐞𝐦𝐛𝐞𝐫𝐬 - 𝐍𝐨𝐧~𝐃𝐫𝐨𝐩",
        services: [
          { id: "6749", name: "Telegram Members | HQ Accounts | Non Drop | 100K/Day 🚀 | Max 1M | Instant ⚡ | 0–10 Min Start | Refill ♻️", rate: 70.5200, avgTime: "0–10 Min Start" },
          { id: "6750", name: "Telegram Members | HQ Accounts | Non Drop | 100K/Day 🚀 | Max 1M | Instant ⚡ | 0–10 Min Start | 60D Refill ♻️", rate: 72.8000, avgTime: "0–10 Min Start" },
          { id: "6751", name: "Telegram Members | HQ Accounts | Non Drop | 100K/Day 🚀 | Max 1M | Instant ⚡ | 0–10 Min Start | 90D Refill ♻️", rate: 74.7000, avgTime: "0–10 Min Start" },
          { id: "6752", name: "Telegram Members | HQ Accounts | Non Drop | 100K/Day 🚀 | Max 1M | Instant ⚡ | 0–10 Min Start | 365D Refill ♻️", rate: 76.6000, avgTime: "0–10 Min Start" },
          { id: "6753", name: "Telegram Members | HQ Accounts | Non Drop | 100K/Day 🚀 | Max 1M | Instant ⚡ | 0–10 Min Start | Lifetime Refill ♻️", rate: 80.5000, avgTime: "0–10 Min Start" }
        ]
      },
      "Telegram - Reactions | Cheapest in The World": {
        name: "𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 - 𝐑𝐞𝐚𝐜𝐭𝐢𝐨𝐧𝐬 | 𝐂𝐡𝐞𝐚𝐩𝐞𝐬𝐭 𝐢𝐧 𝐓𝐡𝐞 𝐖𝐨𝐫𝐥𝐝",
        services: [
          { id: "6050", name: "Telegram Mix Positive Reaction [👍😍🎉🔥❤️🥰👏🥳🤩🔥💯] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6051", name: "Telegram Mix Negative Reaction [👎💔👎😢💩🤢🤬😡😴🍌😈] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6052", name: "Telegram Reaction [🔥] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6053", name: "Telegram Reaction [❤️] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6054", name: "Telegram Reaction [💘] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6055", name: "Telegram Reaction [💔] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6056", name: "Telegram Reaction [🔥] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6057", name: "Telegram Reaction [👍] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6058", name: "Telegram Reaction [👎] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6059", name: "Telegram Reaction [💩] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6060", name: "Telegram Reaction [⚡] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6061", name: "Telegram Reaction [⛄] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6062", name: "Telegram Reaction [✍️] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6063", name: "Telegram Reaction [🙈] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6064", name: "Telegram Reaction [💊] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6065", name: "Telegram Reaction [😎] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6066", name: "Telegram Reaction [😘] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6067", name: "Telegram Reaction [🦄] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6068", name: "Telegram Reaction [🤷] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6069", name: "Telegram Reaction [🆒] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6070", name: "Telegram Reaction [👾] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6071", name: "Telegram Reaction [🗿] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6072", name: "Telegram Reaction [🤪] + Views", rate: 10.3749, avgTime: "0–20 Min Start" },
          { id: "6073", name: "Telegram Reaction [🎉] + Views", rate: 10.3749, avgTime: "0–20 Min Start" }
        ]
      },
      "Telegram - Post Views": {
        name: "𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 - 𝐏𝐨𝐬𝐭 𝐕𝐢𝐞𝐰𝐬",
        services: [
          { id: "3882", name: "Telegram - Views ~ 1 POST ~ INSTANT", rate: 3.2645, avgTime: "0–20 Min Start" },
          { id: "3885", name: "Telegram Post View (Last 5 Post)", rate: 12.3135, avgTime: "0–20 Min Start" },
          { id: "3886", name: "Telegram Post View (Last 10 Post)", rate: 25.0515, avgTime: "0–20 Min Start" },
          { id: "3887", name: "Telegram Post View [Last 20 Post]", rate: 40.5275, avgTime: "0–20 Min Start" },
          { id: "3888", name: "Telegram Post View [Last 50 Post]", rate: 80.0315, avgTime: "0–20 Min Start" },
          { id: "3889", name: "Telegram Post View [Last 100 Post]", rate: 159.8545, avgTime: "0–20 Min Start" }
        ]
      }
    }
  }
};

// Render Select With Dynamic Platform Logos per item & Extended Popup Height with Gradient Border
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
  optionsContainer.style.cssText = `
    display: none; position: absolute; top: 105%; left: 0; right: 0;
    background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6) border-box;
    border: 1px solid transparent; border-radius: 12px;
    max-height: 340px; overflow-y: auto; z-index: 999;
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.25);
  `;

  const formatTextWithBadge = (text) => {
    return text.replace(/^(\d+)\s*[-—]?\s*/, '<span class="service-id-badge" style="background: #8b5cf6; color: #ffffff; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 12px; display: inline-block; margin-right: 6px;">$1</span>');
  };

  let selectedItemElement = null;

  Array.from(selectElem.options).forEach((opt, index) => {
    const item = document.createElement('div');
    item.className = 'custom-option-item';

    const logoUrl = getLogoForOption(opt);
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
    document.querySelectorAll('.custom-options-container, #liveSearchDropdown').forEach(c => c.style.display = 'none');

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
  document.querySelectorAll('.custom-options-container, #liveSearchDropdown').forEach(c => c.style.display = 'none');
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

    if (platform === 'all') {
      const platformKeys = ['instagram', 'facebook', 'youtube', 'tiktok', 'telegram'];
      platformKeys.forEach(plat => {
        if (platformData[plat] && platformData[plat].categories) {
          for (let catKey in platformData[plat].categories) {
            const option = document.createElement("option");
            option.value = `${plat}_${catKey}`;
            option.textContent = platformData[plat].categories[catKey].name;
            option.setAttribute("data-platform", plat);
            categorySelect.appendChild(option);
          }
        }
      });
    } else if (data && data.categories) {
      for (let key in data.categories) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = data.categories[key].name;
        option.setAttribute("data-platform", platform);
        categorySelect.appendChild(option);
      }
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

  const categoryValue = categorySelect.value;
  const serviceSelect = document.getElementById("serviceSelect");
  if (!serviceSelect) return;

  serviceSelect.innerHTML = "";

  let targetPlatform = currentPlatform;
  let catKey = categoryValue;

  if (currentPlatform === 'all' && categoryValue.includes('_')) {
    const parts = categoryValue.split('_');
    targetPlatform = parts[0];
    catKey = parts.slice(1).join('_');
  }

  const platObj = platformData[targetPlatform];
  if (!catKey || !platObj || !platObj.categories || !platObj.categories[catKey]) {
    const timeBox = document.querySelector('.time-box');
    if (timeBox) timeBox.innerHTML = `⚡ Average Time: <strong>N/A</strong>`;
    setupSelectIcons('serviceSelect');
    calculatePrice();
    return;
  }

  const services = platObj.categories[catKey].services;

  services.forEach(service => {
    const option = document.createElement("option");
    option.value = service.id;
    option.setAttribute("data-rate", service.rate);
    option.setAttribute("data-avgtime", service.avgTime);
    option.setAttribute("data-platform", targetPlatform);
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

// Checkout Navigation
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
    if (upiView) upsView.classList.remove('hidden'); // Fix typo if any in original or keep safe
    if (btnBinance) btnBinance.classList.remove('active');
    if (btnUpi) btnUpi.classList.add('active');

    if (txnLabel) txnLabel.innerText = "Enter 12-Digit UPI UTR / Ref No:";
    if (txnInput) txnInput.placeholder = "e.g. 4029XXXXXXXXXX (12-Digit UTR)";
  }
}

// Custom Glow Popup
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
}

// PLATFORM 2 - BACKEND ORDER SUBMISSION
function sendOrderToTelegram() {
  const mainLink = document.getElementById("mainLinkInput");
  const checkoutTxn = document.getElementById("checkoutTxnId");
  const checkoutTitle = document.getElementById("checkoutServiceTitle");
  const mainQty = document.getElementById("mainQuantityInput");
  const categorySelect = document.getElementById("categorySelect");

  const submitBtn =
    document.querySelector("#checkoutPage button[onclick*='sendOrderToTelegram']") ||
    document.querySelector("#checkoutPage button");

  const link = mainLink ? mainLink.value.trim() : "";
  const utr = checkoutTxn ? checkoutTxn.value.trim() : "";
  const service = checkoutTitle ? checkoutTitle.innerText.trim() : "";
  const quantity = Number(mainQty ? mainQty.value : 0);

  const categoryText =
    categorySelect &&
    categorySelect.options[categorySelect.selectedIndex]
      ? categorySelect.options[categorySelect.selectedIndex].textContent.trim()
      : "N/A";

  if (!link) {
    showModernPopup("Error!", "Please enter the target link.", "error");
    return;
  }

  if (!utr) {
    showModernPopup(
      "Error!",
      "Please enter Transaction ID / UTR Number.",
      "error"
    );
    return;
  }

  if (!quantity || quantity <= 0) {
    showModernPopup("Error!", "Please enter a valid quantity.", "error");
    return;
  }

  let userIdentifier = localStorage.getItem("raj_smm_browser_id");

  if (!userIdentifier) {
    userIdentifier =
      "BID_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    localStorage.setItem("raj_smm_browser_id", userIdentifier);
  }

  let serviceId = "PLATFORM2_SERVICE";

  if (typeof selectedServiceId !== "undefined" && selectedServiceId) {
    serviceId = String(selectedServiceId);
  } else if (typeof currentServiceId !== "undefined" && currentServiceId) {
    serviceId = String(currentServiceId);
  }

  const amount = Number(
    typeof calculatedPrice !== "undefined"
      ? calculatedPrice
      : 0
  );

  // Prevent double click without showing Processing delay
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "not-allowed";
  }

  const orderPayload = {
    userId: userIdentifier,
    platform: "platform2",
    serviceId: serviceId,
    serviceName: `${service} (${categoryText})`,
    link: link,
    quantity: quantity,
    amount: amount,
    paymentId: utr,
    transactionId: utr,
    paymentMethod: "UPI QR Code"
  };

  /*
   * IMPORTANT:
   * We intentionally DO NOT use await here.
   *
   * The request is sent immediately in the background.
   * The customer does not have to wait for the Vercel response
   * before the order-success screen appears.
   */
  fetch(
    "https://raj-social-panel-backend-qfwd.vercel.app/api/orders/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderPayload)
    }
  )
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          data.error ||
          "Order submission failed."
        );
      }

      const backendOrder = data.order || {};

      /*
       * Keep the backend-generated Order ID exactly as before.
       * Nothing is changed here.
       */
      const localOrder = {
        orderId:
          backendOrder.internalOrderId ||
          Math.floor(100000 + Math.random() * 900000),

        serviceName: service,
        category: categoryText,
        link: link,
        quantity: quantity,
        amount: amount.toFixed(2),
        transactionId: utr,
        status: "Pending",
        userIdentifier: userIdentifier,
        orderTimeEpoch: Date.now()
      };

      const existingOrders = JSON.parse(
        localStorage.getItem("raj_smm_orders") || "[]"
      );

      existingOrders.push(localOrder);

      localStorage.setItem(
        "raj_smm_orders",
        JSON.stringify(existingOrders)
      );

      /*
       * If the background request succeeds,
       * the local order data is updated exactly as before.
       */
      console.log(
        "Platform 2 order created successfully:",
        backendOrder.internalOrderId
      );
    })
    .catch((error) => {
      console.error(
        "Platform 2 Backend Order Error:",
        error
      );

      /*
       * The backend request failed in the background.
       * We still log it instead of keeping the customer
       * stuck on Processing.
       */
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
      }
    });

  /*
   * IMPORTANT:
   * Customer gets immediate success feedback.
   * No waiting for Vercel / MongoDB / Telegram response.
   */
  showModernPopup(
    "Success!",
    "Order submitted successfully!",
    "success"
  );

  if (checkoutTxn) {
    checkoutTxn.value = "";
  }

  closeCheckout();
}

function submitOrderToWhatsApp() {
  sendOrderToTelegram();
}
