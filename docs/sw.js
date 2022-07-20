self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('periodik-store').then((cache) => cache.addAll([
      'index.html',
      "img/icons/app_icon.png"
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});