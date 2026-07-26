// साज साडी बाजार — किमान service worker (फक्त PWA इन्स्टॉल होण्यासाठी)
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // फक्त आपल्याच साईटवरच्या (same-origin) GET रिक्वेस्ट्स हॅंडल करायच्या.
  // Firebase Auth/Firestore, Cloudinary, Google Fonts वगैरे बाहेरच्या (cross-origin)
  // रिक्वेस्ट्समध्ये अजिबात ढवळाढवळ करायची नाही — नाहीतर लॉगिन/डेटा तुटतो.
  if (url.origin !== self.location.origin || e.request.method !== "GET") {
    return;
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
