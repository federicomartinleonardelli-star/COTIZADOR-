// Service Worker — Cotizador VW Iruña
// Estrategia: red primero (para no mostrar precios/versiones desactualizadas),
// con respaldo en caché solo para poder abrir la app sin conexión.
const CACHE = "vw-cotizador-v1";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS).catch(function () {});
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(function (res) {
        var resClone = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(e.request, resClone); });
        return res;
      })
      .catch(function () {
        return caches.match(e.request).then(function (cached) {
          return cached || caches.match("./index.html");
        });
      })
  );
});
