/* Carnet Bouzelmate Hicham — service worker
   Change CACHE à chaque mise à jour de l'app pour forcer le rafraîchissement. */
const CACHE = 'carnet-bouzelmate-v2';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './apple-touch-icon.png',
  './favicon-64.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* Météo et polices : le réseau d'abord, le cache en secours. */
  if (url.hostname.indexOf('open-meteo.com') !== -1 ||
      url.hostname.indexOf('fonts.googleapis.com') !== -1 ||
      url.hostname.indexOf('fonts.gstatic.com') !== -1) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  /* L'app elle-même : le cache d'abord, pour marcher sans réseau dans la parcelle. */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
