// Service Worker — Cotizador Iruña VW
// Estrategia: network-first para index.html (para traer siempre la última versión
// cuando hay internet), cache-first para íconos y el manifest. Si no hay conexión,
// se sirve la última versión guardada en caché.

const CACHE_NAME = "cotizador-iruna-v1";
const APP_SHELL = [
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon-180.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;

  // Solo manejamos GET; el resto (POST, etc.) pasa directo a la red.
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  var isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin) {
    // Network-first para el documento principal, con fallback a caché offline.
    event.respondWith(
      fetch(req).then(function (res) {
        var resClone = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(req, resClone); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match("./index.html");
        });
      })
    );
  } else {
    // Recursos externos (fuentes, html2canvas CDN): cache-first con actualización en segundo plano.
    event.respondWith(
      caches.match(req).then(function (cached) {
        var networkFetch = fetch(req).then(function (res) {
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, res.clone()); });
          return res;
        }).catch(function () { return cached; });
        return cached || networkFetch;
      })
    );
  }
});
