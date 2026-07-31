# Cotizador Premium — Volkswagen Iruña

Esta carpeta ya está lista para:
1. Subir a GitHub y publicarse como sitio web (GitHub Pages).
2. Instalarse como app en iPhone y Android (PWA — Progressive Web App).

## Archivos
- `index.html` → el cotizador (la app en sí).
- `manifest.webmanifest` → le dice al celular el nombre, ícono y color de la app.
- `sw.js` → service worker, permite que la app abra aunque no haya internet.
- `icon-192.png`, `icon-512.png`, `apple-touch-icon-180.png` → íconos de la app.

**Importante:** los 5 archivos deben quedar juntos, en la misma carpeta, con esos nombres exactos (no los renombres ni los muevas a subcarpetas), porque `index.html` los busca con rutas relativas (`./manifest.webmanifest`, `./sw.js`, etc.).

---

## 1) Subir a GitHub y publicar (GitHub Pages)

### Opción A: desde la web de GitHub (sin usar la terminal)
1. Entrá a https://github.com y creá un repositorio nuevo (botón verde "New").
   - Nombre sugerido: `cotizador-vw-irunia`
   - Dejalo público (los repos privados de GitHub Pages requieren plan pago para algunos casos).
2. Una vez creado, hacé clic en "uploading an existing file" (o "Add file → Upload files").
3. Arrastrá los 5 archivos de esta carpeta (`index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon-180.png`) y confirmá el commit.
4. Andá a **Settings → Pages** (en el menú lateral del repo).
5. En "Build and deployment" → "Source", elegí **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guardá.
6. Esperá 1-2 minutos. GitHub te va a mostrar la URL pública, algo como:
   `https://tu-usuario.github.io/cotizador-vw-irunia/`

### Opción B: con git desde la terminal
```bash
cd carpeta-descargada
git init
git add .
git commit -m "Cotizador Iruña VW"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cotizador-vw-irunia.git
git push -u origin main
```
Después activá Pages igual que en el paso 4-5 de arriba.

**Nota clave:** la app necesita **HTTPS** para funcionar como PWA instalable (Service Worker, "Agregar a pantalla de inicio", etc.). GitHub Pages ya sirve todo por HTTPS automáticamente, así que no tenés que hacer nada extra en ese sentido.

---

## 2) Instalar como app

Una vez que tengas la URL pública (ej: `https://tu-usuario.github.io/cotizador-vw-irunia/`), compartila por WhatsApp/mail al equipo. Cada uno la instala así:

### iPhone (Safari)
1. Abrí el link en **Safari** (no funciona el "agregar a inicio" desde Chrome en iOS).
2. Tocá el ícono de compartir (el cuadrado con la flecha hacia arriba).
3. Elegí **"Agregar a pantalla de inicio"**.
4. Confirmá el nombre ("Iruña VW") y tocá "Agregar".
5. Va a quedar un ícono en la pantalla de inicio que abre la app a pantalla completa, sin la barra de Safari.

### Android (Chrome)
1. Abrí el link en **Chrome**.
2. Va a aparecer automáticamente un cartelito abajo que dice "Instalar app en el celular" (ya viene armado en el propio cotizador). Tocá "Instalar".
   - Si no aparece, tocá los 3 puntitos (⋮) arriba a la derecha → **"Instalar app"** o **"Agregar a pantalla principal"**.
3. Confirmá. Queda como un ícono más, igual que cualquier app instalada de Play Store.

Una vez instalada en cualquiera de los dos sistemas, abre en modo standalone (sin barra del navegador), tiene su propio ícono y funciona igual que cualquier app nativa para navegar y usar el cotizador.

---

## 3) Actualizar la app más adelante
Cuando quieras subir cambios al cotizador:
1. Editá `index.html` con los cambios que necesites.
2. Subí de nuevo el archivo al repositorio de GitHub (reemplazando el anterior).
3. Abrí `sw.js` y subí en 1 el número de `CACHE_NAME` (ej: `v1` → `v2`). Esto asegura que los celulares que ya tienen la app instalada bajen la versión nueva la próxima vez que abran con internet.
4. Esperá unos minutos a que GitHub Pages actualice el sitio, y listo.
