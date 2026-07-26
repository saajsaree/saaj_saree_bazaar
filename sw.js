// साज साडी बाजार — किमान service worker (फक्त PWA इन्स्टॉल होण्यासाठी)
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  // साधं पास-थ्रू — नेटवर्कवरूनच नेहमी लोड करतं, ऑफलाइन कॅशिंग करत नाही
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
