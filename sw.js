/* SPC — Service Worker v3 (wipes stale cache on update) */
const CACHE = 'spc-v3-20260522a';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Network-first for HTML so updates show immediately
  if (req.destination === 'document' || req.headers.get('accept')?.includes('text/html')) {
    e.respondWith(
      fetch(req).then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {});
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }
  // Cache-first for everything else (images, css, js)
  e.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {});
        }
        return res;
      });
    })
  );
});
