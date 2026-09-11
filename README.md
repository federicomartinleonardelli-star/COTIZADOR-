# Cotizador Premium — Volkswagen Iruña

App de una sola página (todo vive en `index.html`, sin backend ni build). Lista para
publicarse en GitHub Pages y usarse como app en el iPhone.

## Arreglo aplicado (login trabado en el celular)

La versión anterior se quedaba con la pantalla de "Usuario / Contraseña" tapando toda
la app en algunos iPhones y no dejaba cotizar. La causa: si Safari está en **modo
privado**, `localStorage` puede rechazar el guardado de la sesión, y el código no
tenía en cuenta ese caso — se cortaba a mitad de camino y nunca llegaba a cerrar la
pantalla de login, aunque el usuario y contraseña fueran correctos. Ya está corregido:
ahora, si el guardado falla, la sesión se mantiene en memoria para esa visita y la app
funciona igual (solo que no va a recordar la sesión si cerrás Safari y volvés a
entrar en modo privado).

## Archivos de esta carpeta

| Archivo | Para qué es |
|---|---|
| `index.html` | La app completa (cotizador, campañas, BNA, cheques). |
| `manifest.webmanifest` | Metadata para que el celular la reconozca como "app instalable". |
| `sw.js` | Service worker: cachea la app para que funcione sin internet después de la primera carga. |
| `apple-touch-icon-180.png` | Ícono que usa el iPhone al agregarla a la pantalla de inicio. |
| `icon-192.png` / `icon-512.png` | Íconos para Android / Chrome. |

## 1) Subir a GitHub

1. Creá un repositorio nuevo en GitHub (puede ser público o privado).
2. Subí estos 6 archivos a la raíz del repo (todos juntos, sin subcarpetas), por ejemplo:
   ```bash
   git init
   git add .
   git commit -m "Cotizador Iruña"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
   > El archivo `index.html` pesa ~20,7 MB (tiene las fotos de los autos incluidas
   > adentro, comprimidas para que entre cómodo). Por lo tanto no solo cumple el
   > límite de GitHub de 100 MB por archivo con Git, sino que también entra bajo
   > el límite de 25 MB que tiene la subida por arrastrar-y-soltar desde el
   > navegador (github.com), así que podés subirlo también así si no querés usar
   > la terminal ni GitHub Desktop.

## 2) Activar GitHub Pages

1. En el repo, ir a **Settings → Pages**.
2. En "Source" elegir **Deploy from a branch**.
3. Branch: **main**, carpeta: **/ (root)** → Guardar.
4. GitHub te da una URL como `https://TU-USUARIO.github.io/TU-REPO/` (tarda 1-2 minutos
   la primera vez). Como abre `index.html` automáticamente, esa URL ya es el cotizador andando.

## 3) Instalarla en el iPhone

1. Abrí esa URL en **Safari** (tiene que ser Safari, no Chrome, para que funcione el
   "agregar a inicio" de iOS).
2. Tocá el botón de compartir (el cuadrado con la flecha hacia arriba).
3. Elegí **"Agregar a pantalla de inicio"**.
4. Confirmá el nombre (ya viene sugerido "Iruña VW") y tocá **Agregar**.

Con esto queda un ícono en la pantalla de inicio que abre la app a pantalla completa
(sin la barra de Safari), y gracias al service worker, después de abrirla una vez con
internet, va a seguir funcionando aunque no haya conexión.

## Actualizar la app más adelante

Cuando reemplaces `index.html` por una versión nueva y la subas al repo (GitHub Pages
se actualiza solo), tené en cuenta que el service worker cachea agresivamente: para que
los celulares que ya la tienen instalada vean la versión nueva, subí `sw.js` cambiando
el número de la constante `CACHE_NAME` (por ejemplo de `cotizador-iruna-v1` a
`cotizador-iruna-v2`). Eso hace que se descarte el caché viejo y se traiga todo de nuevo.
