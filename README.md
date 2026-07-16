# Cotizador Premium — Volkswagen Iruña

Cotizador web para simular financiación de vehículos Volkswagen (Iruña S.A.): precio de contado, planes de cuotas, BNA, cheques diferidos, comparativas entre campañas y generación de cotizaciones en PDF / imagen para compartir.

Es una aplicación 100% del lado del cliente: un único archivo `index.html` con HTML, CSS y JavaScript embebidos (incluye las imágenes de los vehículos en base64). No requiere backend ni build, por lo que se puede publicar directamente con **GitHub Pages**.

## Uso

Abrí `index.html` en el navegador, o publicalo con GitHub Pages:

1. Subí este repositorio a GitHub.
2. Andá a **Settings → Pages**.
3. En "Source" elegí la rama `main` y la carpeta `/ (root)`.
4. Guardá los cambios; GitHub te va a dar una URL tipo `https://usuario.github.io/repositorio/`.

## Dependencias externas

- [Google Fonts](https://fonts.google.com) (tipografía Inter)
- [html2canvas](https://html2canvas.hertzen.com/) vía CDN (para generar imágenes/"historias" para compartir)

Ambas se cargan desde CDN; no hace falta instalar nada localmente.

## Estructura

```
index.html                  → aplicación completa (HTML + CSS + JS + imágenes embebidas)
manifest.webmanifest        → metadata de la PWA (nombre, ícono, colores)
sw.js                       → service worker (funcionamiento offline y carga rápida)
icon-192.png                → ícono de la app 192×192
icon-512.png                → ícono de la app 512×512
icon-512-maskable.png       → ícono "maskable" (con margen de seguridad) para Android
```

## Instalar como app en el celular (iPhone y Android)

Una vez publicado con GitHub Pages (necesita HTTPS, que GitHub Pages da automáticamente):

**iPhone (Safari):**
1. Abrí el link del sitio en Safari.
2. Tocá el botón de compartir (el cuadrado con la flecha hacia arriba).
3. Elegí "Agregar a pantalla de inicio".

**Android (Chrome):**
1. Abrí el link del sitio en Chrome.
2. Va a aparecer un banner "Instalar app en el celular" (o desde el menú ⋮ → "Instalar app" / "Agregar a pantalla de inicio").
3. Confirmá la instalación.

En ambos casos queda como un ícono más en la pantalla de inicio, abre en pantalla completa (sin la barra del navegador) y funciona aunque se corte la conexión gracias al service worker (`sw.js`).

**Importante:** el service worker solo se activa sobre HTTPS (GitHub Pages lo cumple). Si probás el archivo abriéndolo directo (`file://`) en el navegador, esa parte no funciona, pero el resto del cotizador sí.


## Notas

- Los valores de precios, patentamiento y campañas están cargados directamente en el JavaScript del archivo. Para actualizarlos, hay que editar `index.html`.
- La app genera cotizaciones descargables en PDF (impresión del navegador) y como imagen para compartir por WhatsApp.
