// Basic service worker for PWA installability
// Caching strategies can be added here for offline capabilities

const CACHE_NAME = 'mankakura-cache-v1';
// Define assets that are essential for the app shell to load.
// For now, keeping it minimal as the primary issue is app loading, not offline caching.
const urlsToCache = [
  './', // Represents the start_url (root of the PWA scope, typically index.html)
  'manifest.json',
  // 'index.js', // Entry point for your app
  // 'App.js',   // Main app component
  // Add other critical JS bundles or CSS if not loaded via CDN/inline
  // 'icons/icon-192x192.png', // Example PWA icon
  // 'icons/icon-512x512.png', // Example PWA icon
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Opened cache', CACHE_NAME);
        // If you want to pre-cache assets, uncomment the next line.
        // For initial debugging of the blank page, it's often better to keep pre-caching minimal.
        // console.log('Service Worker: Caching app shell assets:', urlsToCache);
        // return cache.addAll(urlsToCache); 
        return Promise.resolve(); // Currently, no explicit pre-caching during install.
      })
      .then(() => {
        console.log('Service Worker: Install completed. Skipping waiting.');
        return self.skipWaiting(); // Ensures the new service worker activates immediately.
      })
      .catch(error => {
        console.error('Service Worker: Install failed:', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  // Clean up old caches to free up storage and ensure new assets are used.
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation completed. Claiming clients.');
      return self.clients.claim(); // Takes control of uncontrolled clients.
    })
  );
});

self.addEventListener('fetch', event => {
  // We are not implementing any specific caching strategy for fetch requests here (e.g., cache-first, network-first).
  // This means all network requests will go to the network.
  // For offline functionality, you would need to add logic here to serve responses from cache.
  // console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    fetch(event.request).catch((error) => {
      console.warn('Service Worker: Fetch failed; returning offline fallback or error for:', event.request.url, error);
      // Example: return caches.match('offline.html'); // If you have an offline fallback page
      // For now, let the browser handle the error (which might result in a browser's default offline page).
      // This will not serve cached assets unless explicitly handled above or by browser's HTTP cache.
    })
  );
});