// ✅ সঠিক এবং সেফ কোড:
self.addEventListener('fetch', (event) => {
  // শুধুমাত্র GET রিকোয়েস্ট ক্যাশ বা হ্যান্ডেল করবে
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // নেটওয়ার্ক থেকে রেসপন্স আসলে তা ব্রাউজারে পাঠাবে
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open('raj-smm-v1').then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // নেটওয়ার্ক ফেল করলে ক্যাশ থেকে রিটার্ন করবে
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // ক্যাশেও না থাকলে একটি প্রপার ভ্যালিড Fallback Response দিবে
          return new Response('Network error occurred', {
            status: 480,
            statusText: 'Network Error'
          });
        });
      })
  );
});
