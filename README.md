# Cotizador Premium — Volkswagen Iruña

App web (un solo archivo `index.html`, sin backend) para cotizar Cotizar / BNA / Cheques / Usados.
Está lista para publicarse en **GitHub Pages** y para instalarse como app en el **iPhone** (PWA — "Agregar a pantalla de inicio").

## Contenido de esta carpeta

```
index.html                 ← la app completa (HTML + CSS + JS + imágenes, todo embebido) — pesa ~18,5 MB
fichas/                    ← 38 PDFs de "Ficha Técnica" (uno por modelo/versión), separados del HTML
manifest.webmanifest       ← metadatos de la PWA (nombre, íconos, color de tema)
sw.js                      ← service worker (permite que la app abra offline / cargue rápido)
apple-touch-icon-180.png   ← ícono que usa el iPhone al agregarla a la pantalla de inicio
icon-192.png / icon-512.png← íconos para Android / manifest
favicon-16.png / favicon-32.png ← favicon para el navegador (opcional, el SVG embebido ya cubre esto)
logo.svg                   ← logo original en vectorial, por si se necesita regenerar íconos
```

**Importante:** todos estos archivos y carpetas (`index.html`, `fichas/`, `manifest.webmanifest`, `sw.js` y los
`.png`) tienen que quedar en la **misma carpeta raíz**, uno al lado del otro (y `fichas/` como subcarpeta ahí
mismo), porque `index.html` los referencia con rutas relativas (`./fichas/polo-track.pdf`,
`./manifest.webmanifest`, `./sw.js`, etc.).

> **Sobre el tamaño:** antes las 38 fichas técnicas venían incrustadas dentro del propio `index.html`
> (pesaba ~30 MB, por encima del límite de 25 MB que pone GitHub para subir archivos arrastrándolos desde la
> web). Ahora esos PDFs se separaron a la carpeta `fichas/`, así que **`index.html` quedó en ~18,5 MB** —
> entra sin problema por el método de arrastrar y soltar en GitHub. La carpeta `fichas/` pesa ~8,3 MB más
> (38 archivos de ~200 KB cada uno), pero al ser muchos archivos chicos no tiene ese límite de 25 MB por
> archivo.

## 1. Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (puede ser privado o público).
2. Subí estos archivos a la raíz del repositorio (o a una carpeta `/docs` si preferís), manteniéndolos todos juntos, **incluyendo la carpeta `fichas/` completa**.
   - Por línea de comandos:
     ```bash
     git init
     git add .
     git commit -m "Cotizador VW Iruña"
     git branch -M main
     git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
     git push -u origin main
     ```
   - O simplemente arrastrando los archivos y la carpeta `fichas/` desde la web de GitHub ("Add file → Upload files"). Como `index.html` ya pesa menos de 25 MB, y cada PDF de `fichas/` pesa menos de 1 MB, todo entra por ese método sin usar la línea de comandos.
3. En el repo: **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   elegí la rama `main` y la carpeta `/ (root)` (o `/docs` si los subiste ahí). Guardar.
4. GitHub te va a dar una URL del tipo `https://TU-USUARIO.github.io/TU-REPO/` — puede tardar 1-2
   minutos en activarse la primera vez.
5. **HTTPS es obligatorio** para que funcionen el service worker y el instalado como app — GitHub
   Pages ya sirve todo por HTTPS automáticamente, así que no hay que configurar nada extra.

## 2. Instalar en iPhone (como app, con ícono propio)

1. Abrí la URL de GitHub Pages en **Safari** (tiene que ser Safari, no Chrome, para que aparezca la opción).
2. Tocá el botón de **Compartir** (el cuadrado con la flecha hacia arriba).
3. Elegí **"Agregar a la pantalla de inicio"**.
4. Confirmá el nombre ("Iruña VW") y tocá **Agregar**.

A partir de ahí queda un ícono propio en la pantalla de inicio, abre en pantalla completa (sin la
barra de Safari) y, gracias al service worker, la carga siguiente es más rápida incluso con mala
señal.

## 3. Actualizaciones futuras

Cada vez que se suba una nueva versión de `index.html` al repositorio (mismo nombre, mismo lugar),
GitHub Pages la sirve automáticamente. Si algún celular no ve el cambio enseguida, es el service
worker mostrando la versión cacheada — alcanza con cerrar la app y volver a abrirla una vez (el
service worker se actualiza solo en segundo plano en cada visita). Si agregás un modelo nuevo con
su ficha técnica, subí el PDF a la carpeta `fichas/` y agregá la línea correspondiente en el objeto
`FICHAS_TECNICAS` dentro de `index.html` (buscá `var FICHAS_TECNICAS = {` cerca de la línea 7650).
