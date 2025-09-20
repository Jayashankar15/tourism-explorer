const CACHE_NAME = 'jharkhand-tourism-v1.2.0';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Core files to cache for offline functionality
const CORE_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/hotels.html',
  '/restaurantspage.html',
  '/hotels.js',
  '/restaurants.js',
  '/manifest.json'
];

// Static assets (images, fonts, etc.)
const STATIC_ASSETS = [
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/web-app-manifest-192x192.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// API endpoints and dynamic content
const DYNAMIC_URLS = [
  '/api/',
  'https://www.zomato.com/',
  'https://www.makemytrip.com/',
  'https://www.booking.com/'
];

// Install event - cache core files and static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache core files
      caches.open(CACHE_NAME).then(cache => {
        console.log('[SW] Caching core files');
        return cache.addAll(CORE_FILES);
      }),
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('http')));
      })
    ])
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension URLs
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Handle different types of requests with appropriate strategies
  if (isCorePage(request.url)) {
    event.respondWith(cacheFirst(request, CACHE_NAME));
  } else if (isStaticAsset(request.url)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (isDynamicContent(request.url)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else if (isImageRequest(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE, true));
  } else if (isExternalAPI(request.url)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE, true));
  } else {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE));
  }
});

// Cache First strategy - good for static assets
async function cacheFirst(request, cacheName, fallbackToNetwork = true) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    if (!fallbackToNetwork) {
      return new Response('Offline', { status: 503 });
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request.clone(), networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache first failed:', error);
    return getOfflineFallback(request);
  }
}

// Network First strategy - good for dynamic content
async function networkFirst(request, cacheName, storeInCache = true) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok && storeInCache) {
      const cache = await caches.open(cacheName);
      cache.put(request.clone(), networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || getOfflineFallback(request);
  }
}

// Stale While Revalidate - good for frequently updated content
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request.clone(), networkResponse.clone()));
    }
    return networkResponse;
  }).catch(error => {
    console.log('[SW] Stale while revalidate fetch failed:', error);
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Helper functions to categorize requests
function isCorePage(url) {
  return CORE_FILES.some(file => url.endsWith(file) || url.includes(file));
}

function isStaticAsset(url) {
  return /\.(css|js|woff|woff2|ttf|eot)$/i.test(url) || 
         url.includes('cdnjs.cloudflare.com');
}

function isDynamicContent(url) {
  return DYNAMIC_URLS.some(dynamicUrl => url.includes(dynamicUrl));
}

function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(request.url);
}

function isExternalAPI(url) {
  return url.includes('zomato.com') || 
         url.includes('makemytrip.com') || 
         url.includes('booking.com') ||
         url.includes('api');
}

// Offline fallback responses
function getOfflineFallback(request) {
  if (request.destination === 'document') {
    return caches.match('/index.html') || 
           new Response(`
             <!DOCTYPE html>
             <html>
             <head>
               <title>Offline - Discover Jharkhand</title>
               <style>
                 body { 
                   font-family: Arial, sans-serif; 
                   display: flex; 
                   justify-content: center; 
                   align-items: center; 
                   height: 100vh; 
                   margin: 0;
                   background: linear-gradient(135deg, #4a7c59, #7fb069);
                   color: white;
                   text-align: center;
                 }
                 .offline-content {
                   background: rgba(255,255,255,0.1);
                   padding: 2rem;
                   border-radius: 15px;
                   backdrop-filter: blur(10px);
                 }
               </style>
             </head>
             <body>
               <div class="offline-content">
                 <h1>🌲 Discover Jharkhand</h1>
                 <h2>You're offline</h2>
                 <p>Please check your internet connection and try again.</p>
                 <button onclick="window.location.reload()">Retry</button>
               </div>
             </body>
             </html>
           `, {
             headers: { 'Content-Type': 'text/html' }
           });
  }
  
  if (isImageRequest(request)) {
    return new Response(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#4a7c59"/>
        <text x="200" y="150" text-anchor="middle" fill="white" font-size="16" font-family="Arial">
          🌲 Image unavailable offline
        </text>
      </svg>
    `, {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
  
  return new Response('Offline', { 
    status: 503, 
    statusText: 'Service Unavailable' 
  });
}

// Background sync for form submissions (when supported)
self.addEventListener('sync', event => {
  if (event.tag === 'review-sync') {
    event.waitUntil(syncReviews());
  } else if (event.tag === 'trip-plan-sync') {
    event.waitUntil(syncTripPlans());
  }
});

async function syncReviews() {
  try {
    // Get pending reviews from IndexedDB (if implemented)
    console.log('[SW] Syncing pending reviews...');
    // Implementation would depend on your backend API
  } catch (error) {
    console.log('[SW] Review sync failed:', error);
  }
}

async function syncTripPlans() {
  try {
    console.log('[SW] Syncing pending trip plans...');
    // Implementation would depend on your backend API
  } catch (error) {
    console.log('[SW] Trip plan sync failed:', error);
  }
}

// Push notification handler
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from Discover Jharkhand',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Now',
        icon: '/icons/action-explore.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Discover Jharkhand', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default click - open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
