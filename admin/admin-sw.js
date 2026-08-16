const ADMIN_CACHE_NAME = 'raj-admin-v1';

// ক্যাশে রাখার মতো প্রয়োজনীয় ফাইলসমূহ
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './dashboard.html',
  './admin-style.css',
  './admin-auth.js',
  './admin-app.js',
  './admin-manifest.json'
];

// 1. Install Event - Caching Assets
self.addEventListener('install', (e) => {
  console.log('[Admin Service Worker] Installed');
  e.waitUntil(
    caches.open(ADMIN_CACHE_NAME).then((cache) => {
      console.log('[Admin Service Worker] Caching Admin Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event - Clean old caches
self.addEventListener('activate', (e) => {
  console.log('[Admin Service Worker] Activated');
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== ADMIN_CACHE_NAME && key.startsWith('raj-admin-')) {
            console.log('[Admin Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event - Network First Strategy with Fallback
self.addEventListener('fetch', (e) => {
  // ফায়ারবেস এপিআই বা এক্সটার্নাল রিকোয়েস্টের জন্য নরমাল ফেচ
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // সফলভাবে নেটওয়ার্ক থেকে পেলে ক্যাশে আপডেট করা
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(ADMIN_CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // ইন্টারনেট না থাকলে ক্যাশে থেকে ডাটা লোড করা
        return caches.match(e.request);
      })
  );
});
