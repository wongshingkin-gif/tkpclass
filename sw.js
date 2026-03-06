const CACHE_NAME = 'class-score-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝 Service Worker 並快取基本檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求：GAS 網址不快取，其他檔案優先使用快取
self.addEventListener('fetch', event => {
  // 如果是呼叫 Google Apps Script API，一律走網路連線
  if (event.request.url.includes('script.google.com')) {
    return;
  }

  // 靜態檔案優先讀取快取
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
