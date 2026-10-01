# Cotizador Iruña VW

Cotizador profesional de Volkswagen Iruña S.A. Es una app web que se instala en el iPhone como una app más y funciona tanto en vertical como en horizontal.

## Contenido del repositorio

| Archivo | Para qué sirve |
|---|---|
| `index.html` | El cotizador completo (precios, campañas e imágenes embebidas) — pesa unos 18,6 MB |
| `fichas/` | Las 38 fichas técnicas en PDF que descarga el botón "Ficha Técnica" |
| `manifest.webmanifest` | Nombre, colores e íconos de la app instalada |
| `sw.js` | Service worker: carga la última versión cuando hay señal y permite abrir la app sin conexión |
| `apple-touch-icon-180.png` | Ícono de la pantalla de inicio del iPhone |
| `icons/` | Íconos para Android / Chrome |
| `.nojekyll` | Evita que GitHub Pages procese los archivos |

## Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo `cotizador-iruna`).
2. En el repositorio tocá **Add file → Upload files**, arrastrá **todo el contenido** de esta carpeta (incluidas las carpetas `icons/` y `fichas/`) y tocá **Commit changes**.
   - Ningún archivo pasa los 25 MB, así que se puede subir desde la página web de GitHub.
   - Arrastrá las carpetas tal cual (no solo los archivos de adentro) para que se respeten `icons/` y `fichas/`.
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)`** → Save.
4. En uno o dos minutos la app queda en `https://USUARIO.github.io/cotizador-iruna/`.

## Instalar en el iPhone

1. Abrí la dirección de GitHub Pages en **Safari**.
2. Tocá **Compartir** → **Agregar a pantalla de inicio** → **Agregar**.
3. Abrila desde el ícono: se ve a pantalla completa, sin barra de Safari, y gira a horizontal.

> Los datos que guarda la app (sesión, historial, configuración) quedan en el dispositivo. La app instalada y Safari los guardan por separado, así que puede pedir el login de nuevo la primera vez que se abre desde el ícono.

## Actualizar precios

1. Subí el `index.html` nuevo con **Add file → Upload files** (reemplaza al anterior). Para agregar una ficha técnica, subí el PDF a `fichas/` con el nombre que figura en `FICHAS_TECNICAS_NOMBRES`.
2. Con señal, la app instalada toma la versión nueva la próxima vez que se abre (si no aparece, cerrala del todo y volvé a abrirla).
3. Si cambiás íconos o el manifest, subí también el número de `VERSION` en `sw.js`.

## Ajustes para iPhone incluidos

- Respeta la barra de estado, la isla dinámica / muesca y la barra de inicio (safe areas).
- Vertical: barra superior en dos filas (marca + botones / pestañas), grillas de 3 a 5 columnas pasan a 2, y la fila de extras se reordena.
- Horizontal: barra superior compacta, márgenes laterales para la muesca y pantalla de login con scroll.
- Campos de texto a 16 px para que el iPhone no haga zoom al tocarlos.

## Importante sobre la privacidad

GitHub Pages en cuentas gratuitas publica el repositorio de forma **pública**: cualquiera con la dirección puede abrir la página y leer el código fuente, incluidos la lista de precios, el PIN de configuración y los usuarios y claves que están dentro de `index.html`. Para restringirlo, usá un repositorio privado con GitHub Pro/Team, o un hosting con contraseña.
