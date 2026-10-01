// Service worker del Cotizador Iruña VW
// Estrategia: "red primero" para la página (siempre trae la última versión publicada
// cuando hay conexión) y copia en caché para poder abrir la app sin señal.
// Al publicar cambios importantes, subí el número de versión para limpiar cachés viejas.
const VERSION = "cotizador-v2026-10-01b";
const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./apple-touch-icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Solo manejamos archivos propios; fuentes y demás van directo a la red.
  if (url.origin !== self.location.origin) return;

  // Página principal: red primero (revalida con ETag, no re-descarga si no cambió).
  if (req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) {
    event.respondWith(
      fetch(req, { cache: "no-cache" })
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put("./index.html", copy));
          }
          return res;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // Íconos, manifest y fichas técnicas: caché primero (quedan disponibles sin señal una vez descargadas).
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
