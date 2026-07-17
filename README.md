# Cotizador Premium — Volkswagen Iruña

App web (PWA) lista para publicarse gratis en GitHub Pages e instalarse como app en Android y iPhone.

## Contenido de esta carpeta

```
index.html              → la app (todo el cotizador vive acá adentro)
manifest.webmanifest     → metadata de la PWA (nombre, ícono, colores)
sw.js                    → service worker (permite instalar la app y que abra más rápido)
icon-192.png             → ícono de la app (192×192)
icon-512.png             → ícono de la app (512×512)
apple-touch-icon.png     → ícono para iPhone (180×180)
.nojekyll                → le dice a GitHub que no "procese" los archivos, los sirva tal cual
```

No hace falta tocar nada de esto: **subí toda la carpeta tal cual está**.

---

## 1) Subir el sitio a GitHub

### Opción A — Sin usar la terminal (más simple)
1. Entrá a [github.com](https://github.com) y creá una cuenta si no tenés.
2. Arriba a la derecha, tocá el **+** → **New repository**.
3. Ponele un nombre, por ejemplo `cotizador-iruna`. Dejalo en **Public**. Creá el repositorio (no hace falta tildar "Add a README").
4. Adentro del repo vacío, tocá **uploading an existing file**.
5. Arrastrá **todos los archivos de esta carpeta** (`index.html`, `manifest.webmanifest`, `sw.js`, los `.png`, y `.nojekyll`) y confirmá el commit.

### Opción B — Con git (si ya lo usás)
```bash
cd carpeta-del-sitio
git init
git add .
git commit -m "Cotizador Iruña - primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cotizador-iruna.git
git push -u origin main
```

## 2) Activar GitHub Pages (para que quede online, con HTTPS)

1. En el repo, andá a **Settings** → **Pages** (menú de la izquierda).
2. En "Build and deployment" → **Source**, elegí **Deploy from a branch**.
3. En "Branch" elegí **main** y la carpeta **/ (root)**. Guardá.
4. Esperá 1-2 minutos. GitHub te va a mostrar una URL tipo:
   `https://TU-USUARIO.github.io/cotizador-iruna/`

Esa es la dirección que vas a compartir y usar en el celular. **Es importante que sea `https://`**: la instalación como app (y el modo offline) solo funciona con conexión segura, y GitHub Pages la da gratis automáticamente.

---

## 3) Instalar en Android

1. Abrí la URL de GitHub Pages con **Chrome**.
2. Va a aparecer un cartelito abajo: **"📲 Instalar app en el celular"** → tocá **Instalar**.
   - Si no aparece solo, tocá el menú **⋮** de Chrome → **"Instalar app"** o **"Agregar a pantalla de inicio"**.
3. Queda como un ícono más en el celular, se abre en pantalla completa, sin la barra del navegador.

## 4) Instalar en iPhone

1. Abrí la URL de GitHub Pages con **Safari** (tiene que ser Safari, no Chrome — en iPhone solo Safari puede instalar así).
2. Tocá el botón de **Compartir** (el cuadrado con la flecha hacia arriba).
3. Elegí **"Agregar a pantalla de inicio"**.
4. Confirmá el nombre y tocá **Agregar**.

Queda con el ícono de VW en la pantalla de inicio, y abre como app (sin la barra de Safari).

---

## 5) Cuando le hagas cambios al cotizador más adelante

- Reemplazá `index.html` por la versión nueva y volvé a subirla al repo (mismo nombre de archivo).
- Abrí `sw.js` y cambiá el número de la primera línea de código, por ejemplo de `cotizador-iruna-v1` a `cotizador-iruna-v2`. Esto le avisa a los celulares que ya tienen la app instalada que hay una versión nueva para bajar (si no cambiás ese número, algunos celus pueden seguir viendo la versión vieja guardada en caché).
- Los cambios pueden tardar unos minutos en verse reflejados en la URL de GitHub Pages.

---

## Notas

- No hace falta App Store ni Play Store: esto se instala directo desde el navegador (es una "PWA" — Progressive Web App). Se ve y se comporta como una app nativa.
- El sitio es público (cualquiera con el link puede verlo), salvo que configures un repo privado con GitHub Pages en un plan que lo permita.
- El PIN de configuración del cotizador sigue funcionando igual que antes; eso no lo cambia el hosting.
