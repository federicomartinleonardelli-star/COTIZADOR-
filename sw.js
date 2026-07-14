// Service Worker — Cotizador Iruña VW
// Cachea el "app shell" (el archivo principal + íconos) para que la app
// abra rápido y funcione aunque no haya conexión, tanto en iPhone como en Android.

const CACHE_NAME = "cotizador-iruna-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const req = event.request;

  // Solo manejamos pedidos GET del mismo origen (el propio sitio en GitHub Pages).
  // Todo lo externo (fuentes de Google, CDN de html2canvas, WhatsApp, etc.)
  // se deja pasar directo a la red sin interferir.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then(function (cached) {
      const network = fetch(req)
        .then(function (res) {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
          }
          return res;
        })
        .catch(function () { return cached; });
      // Stale-while-revalidate: mostrá lo cacheado ya mismo si existe,
      // y actualizá el cache en segundo plano.
      return cached || network;
    })
  );
});
