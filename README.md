# Cotizador Premium — Volkswagen Iruña

Cotizador de financiación, listo para publicarse en GitHub Pages y usarse como
app instalable en iPhone y Android (PWA - Progressive Web App).

## Archivos del paquete

```
index.html              → el cotizador (toda la app vive acá)
manifest.webmanifest    → metadata de la app (nombre, ícono, colores)
sw.js                   → service worker (permite instalar y usar offline)
icon-192.png            → ícono de la app (192x192)
icon-512.png            → ícono de la app (512x512)
```

Los 5 archivos tienen que quedar **en la misma carpeta**, en la raíz del repo
(o en la raíz de la carpeta que publiques con GitHub Pages). No cambies los
nombres, porque `index.html` ya los referencia tal cual.

## 1. Subir a GitHub

1. Creá un repositorio nuevo en GitHub (puede ser público o privado; si es
   privado necesitás GitHub Pro/Team/Enterprise para poder activarle Pages).
2. Subí los 5 archivos de arriba a la raíz del repo (podés arrastrarlos desde
   la web de GitHub con "Add file → Upload files", o con git:
   ```bash
   git init
   git add .
   git commit -m "Cotizador Iruña"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

## 2. Activar GitHub Pages

1. En el repo: **Settings → Pages**.
2. En "Source" elegí **Deploy from a branch**.
3. Rama: **main**, carpeta: **/ (root)**. Guardar.
4. GitHub te va a dar una URL parecida a:
   `https://TU-USUARIO.github.io/TU-REPO/`
5. Esperá 1-2 minutos y entrá a esa URL. Ahí ya tenés el cotizador andando
   con HTTPS (imprescindible para que funcione la instalación como app).

> Importante: el service worker (`sw.js`) solo se activa sobre HTTPS. En
> `github.io` esto ya viene con HTTPS por defecto, así que no hay que
> configurar nada extra.

## 3. Instalar como app

### iPhone (Safari)
1. Abrí la URL de GitHub Pages en **Safari** (tiene que ser Safari, no
   Chrome — iOS solo permite instalar PWAs desde Safari).
2. Tocá el botón de **Compartir** (el cuadradito con la flecha hacia arriba).
3. Elegí **"Agregar a la pantalla de inicio"**.
4. Confirmá el nombre ("Iruña VW") y tocá **Agregar**.
5. Va a aparecer un ícono en el celular que abre el cotizador a pantalla
   completa, como una app nativa.

### Android (Chrome)
1. Abrí la URL de GitHub Pages en **Chrome**.
2. Va a aparecer automáticamente un cartel abajo: **"Instalar app en el
   celular"** (con un botón **Instalar**). Si no aparece, tocá los **3
   puntitos** arriba a la derecha → **"Instalar app"** / **"Agregar a
   pantalla de inicio"**.
3. Confirmá. Queda instalada como cualquier app, con ícono propio y sin
   barra de navegador.

## 4. Actualizar contenido más adelante

Cuando quieras subir cambios (precios nuevos, campañas, etc.):
1. Reemplazá `index.html` en el repo (subiendo el archivo nuevo).
2. Los celulares que ya tienen la app instalada la van a actualizar solos la
   próxima vez que la abran con internet (el service worker trae siempre la
   versión más nueva primero, y solo usa la copia guardada si no hay señal).
3. Si en algún momento notás que un celular quedó con una versión vieja
   "pegada", abrí `sw.js` y cambiá el número de versión del caché
   (`cotizador-irunia-v1` → `cotizador-irunia-v2`), volvé a subirlo, y eso
   fuerza a todos los celulares a bajar todo de nuevo.

## Notas

- No hace falta backend ni servidor propio: todo corre en el navegador, los
  datos (fotos de autos, listas de precios, etc.) están embebidos dentro de
  `index.html`.
- Si el repo es público, cualquiera con el link puede ver y usar el
  cotizador. Si necesitás que sea privado, usá un repo privado con GitHub
  Pro/Team, o subilo a otro hosting con autenticación.
