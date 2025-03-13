const CACHE_NAME = 'discount-calculator-v1';
const ASSETS = [
  '/', // Root page
  '/index.html',
  '/styles.css', // Your CSS file
  '/app.js', // Your JavaScript file
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css', // Flatpickr CSS
  'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.js' // Flatpickr JS
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
});