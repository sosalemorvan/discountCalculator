const CACHE_NAME = 'discount-calculator-v7';
const ASSETS = [
    '/',
    '/index.html?v=1',
    '/styles.css?v=1',
    '/app.js?v=1',
    '/service-worker.js?v=1',
    '/manifest.json?v=1'
  ];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch assets from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Activate the new service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Delete old caches
          }
        })
      );
    })
  );

  // Claim clients to ensure the new service worker takes control immediately
  self.clients.claim();
});

// Listen for messages from the main thread (e.g., to trigger a refresh)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting(); // Force the new service worker to activate
  }
});