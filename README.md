# Cotizador Iruña — Volkswagen

Cotizador de vehículos 0km para Iruña S.A. (Volkswagen). Es una aplicación web
de un solo archivo (`index.html`), sin backend: todo corre en el navegador.
Está preparada como **PWA (Progressive Web App)**, así que se puede instalar
como si fuera una app nativa en iPhone y en Android.

## 📁 Contenido del repo

```
index.html                  → la app completa (HTML + CSS + JS en un solo archivo)
manifest.webmanifest        → metadatos de instalación (nombre, ícono, colores)
sw.js                       → service worker (caché offline)
icon-192.png / icon-512.png → íconos para Android / Chrome
apple-touch-icon-180.png    → ícono para iOS / Safari
favicon-32.png              → ícono de pestaña del navegador
```

---

## 🚀 Publicar en GitHub Pages (dejarlo online)

1. Creá un repositorio nuevo en GitHub (puede ser público o privado — si es
   privado necesitás GitHub Pro/Team/Enterprise para poder usar Pages).
2. Subí **todos** los archivos de esta carpeta a la raíz del repo (respetando
   los nombres tal cual están, sobre todo `index.html`).
3. Andá a **Settings → Pages**.
4. En "Build and deployment" elegí **Deploy from a branch**, rama `main`,
   carpeta `/ (root)`, y guardá.
5. Esperá 1-2 minutos. GitHub te va a dar una URL del estilo:
   `https://tu-usuario.github.io/nombre-del-repo/`
6. Entrá a esa URL — ahí ya está funcionando la app, con HTTPS (necesario
   para que el service worker y la instalación como app funcionen).

> **Importante:** el service worker (`sw.js`) sólo se activa en `https://`
> (o en `localhost` para pruebas). En GitHub Pages esto ya viene resuelto.

### Actualizar la app más adelante
Cada vez que subas cambios a `index.html` (por ejemplo con este mismo
asistente), simplemente reemplazá el archivo en el repo (`git add`,
`git commit`, `git push`, o subiéndolo manualmente desde la web de GitHub).
Los usuarios que ya la instalaron como app la van a recibir actualizada la
próxima vez que la abran con internet.

---

## 📲 Instalar como app en el celular

Una vez que la app está publicada (paso anterior), cualquiera puede
"instalarla" desde el navegador — no hace falta subirla a la App Store ni a
Google Play.

### iPhone / iPad (Safari)
1. Abrí la URL de la app en **Safari** (tiene que ser Safari, no Chrome).
2. Tocá el botón de **Compartir** (el cuadrado con la flecha hacia arriba).
3. Elegí **"Agregar a pantalla de inicio"**.
4. Confirmá el nombre y tocá **Agregar**.
5. Va a aparecer un ícono en la pantalla de inicio, como cualquier otra app,
   y va a abrir a pantalla completa (sin la barra de Safari).

### Android (Chrome)
1. Abrí la URL de la app en **Chrome**.
2. Chrome va a mostrar automáticamente un banner **"Instalar app"** en la
   parte de abajo (la app ya tiene ese aviso programado). Tocá **Instalar**.
3. Si no aparece el banner, tocá los **tres puntos** (⋮) arriba a la derecha
   → **"Instalar app"** o **"Agregar a la pantalla de inicio"**.
4. Va a quedar instalada como una app normal, con su ícono y su propia
   ventana (sin la barra de direcciones de Chrome).

### Funciona sin internet (parcialmente)
Gracias al service worker (`sw.js`), una vez que la app se abrió al menos una
vez con conexión, va a seguir abriendo aunque no haya internet (aunque
lógicamente no vas a poder exportar/enviar por WhatsApp esas cosas sí
necesitan conexión).

---

## 🖥️ Probarlo en la compu antes de subirlo

No hace falta configurar nada especial: podés abrir `index.html` directo con
doble clic. Lo único que **no** va a funcionar abriendo el archivo así
(`file://`) es el service worker y el botón de "Instalar app", porque eso
requiere `https://`. Para probarlo completo en local, podés levantar un
servidor simple, por ejemplo con Python:

```bash
cd cotizador-vw-iruna
python3 -m http.server 8000
```

Y abrir `http://localhost:8000` en el navegador.

---

## 🔑 PIN de configuración

El acceso a la sección de Configuración está protegido por PIN (se define en
el `<meta name="cfg-pin">` dentro de `index.html`). Si necesitás cambiarlo,
buscá esa línea en el archivo y reemplazá el valor.
