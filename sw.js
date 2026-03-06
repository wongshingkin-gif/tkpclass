const CACHE_NAME = 'scoring-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
  // 若有圖示也可以加進來，例如 './icon-192.png'
];

// 安裝 Service Worker 並快取資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求：如果有快取就用快取，沒有就抓網路的
self.addEventListener('fetch', event => {
  // 為了確保即時抓取 GAS 最新資料，API 請求不放進快取
  if (event.request.url.includes('script.google.com')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});