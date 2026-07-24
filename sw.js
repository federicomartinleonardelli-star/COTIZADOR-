// Service worker del Cotizador Premium — Volkswagen Iruña
// Estrategia: cache-first para el "app shell", con actualización en segundo plano (stale-while-revalidate).
// Subí un número de versión cada vez que resubas el sitio a GitHub, para forzar a los celulares a bajar la versión nueva.
const CACHE_NAME = "cotizador-iruna-v4";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // si falla el precache (ej. sin conexión), no bloquea la instalación
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const enRed = fetch(event.request)
        .then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            const copia = respuesta.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copia));
          }
          return respuesta;
        })
        .catch(() => cached); // sin conexión: usamos lo que haya en caché

      // Mostrar lo cacheado al instante si existe, y actualizar en segundo plano
      return cached || enRed;
    })
  );
});
