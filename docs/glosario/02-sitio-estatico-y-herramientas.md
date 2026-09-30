# Rama 2 · Sitio estático y herramientas

Vocabulario de lo que hay dentro de este repositorio y de cómo se construye, se prueba y se publica: qué es un «repo suelto», qué carpeta hace qué, qué significa cada script, cada archivo de configuración y cada prueba.

**Para quién es.** Para quien clona el repositorio, abre `package.json` o `astro.config.mjs` y necesita saber qué pieza es cada una antes de tocarla.

**Cómo leer una entrada.** **Qué es** da la definición general; **En este repositorio** dice cómo se usa aquí, con los valores exactos al 2026-09-30; **Ojo** avisa de trampas; **Detalle** apunta a la fuente. Las ideas del frontend que no dependen de este repositorio (estado por URL, eventos `epi:*`, accesibilidad, service worker) están explicadas con más profundidad en la rama 9 del glosario de EPI-Aetheris.

**Ramas vecinas.** Lo que ve quien usa el sitio, en [`01-vocabulario-de-la-interfaz.md`](01-vocabulario-de-la-interfaz.md); las páginas legales y el contacto, en [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md); los datos que llegan de la API, en [`04-contrato-de-datos-consumido.md`](04-contrato-de-datos-consumido.md).

<!-- INDICE:INICIO -->

## Índice alfabético (51 entradas)

- **A** — [aetheris-web (nombre del paquete)](#aetheris-web-nombre-del-paquete) · [astro.config.mjs](#astroconfigmjs) · [axe (accesibilidad automatizada)](#axe-accesibilidad-automatizada)
- **C** — [Colección biblioteca](#colección-biblioteca) · [Configuración de Playwright](#configuración-de-playwright)
- **D** — [Dependencias de desarrollo](#dependencias-de-desarrollo) · [Dependencias de ejecución](#dependencias-de-ejecución) · [Dockerfile (desarrollo)](#dockerfile-desarrollo) · [Dockerfile.e2e](#dockerfilee2e) · [.dockerignore](#dockerignore) · [docs/](#docs) · [DocumentoTexto](#documentotexto) · [Dominio canónico (site)](#dominio-canónico-site) · [Dos árboles: monorepo y repo suelto](#dos-árboles-monorepo-y-repo-suelto)
- **E** — [ESLint (configuración plana)](#eslint-configuración-plana)
- **F** — [Fork-vitrina (repo suelto)](#fork-vitrina-repo-suelto) · [Fuentes autohospedadas](#fuentes-autohospedadas)
- **G** — [.gitignore (lo que no se versiona)](#gitignore-lo-que-no-se-versiona)
- **I** — [Íconos (astro-icon, Tabler y Simple Icons)](#íconos-astro-icon-tabler-y-simple-icons) · [--ignore-lock](#--ignore-lock) · [Imagen para compartir (og-default.png)](#imagen-para-compartir-og-defaultpng)
- **L** — [Licencia GPL-3.0](#licencia-gpl-30)
- **M** — [Manifiesto web (manifest.webmanifest)](#manifiesto-web-manifestwebmanifest) · [Metadatos para compartir](#metadatos-para-compartir)
- **O** — [Overrides de dependencias (fast-uri, nanoid)](#overrides-de-dependencias-fast-uri-nanoid)
- **P** — [pnpm y Corepack](#pnpm-y-corepack) · [pnpm-workspace.yaml](#pnpm-workspaceyaml) · [preconnect a las teselas de OpenStreetMap](#preconnect-a-las-teselas-de-openstreetmap) · [Prefetch (prefetchAll)](#prefetch-prefetchall) · [Prettier](#prettier) · [Propiedades de Layout](#propiedades-de-layout) · [Pruebas de extremo a extremo (tests/e2e/)](#pruebas-de-extremo-a-extremo-testse2e) · [Pruebas unitarias (tests/unit/)](#pruebas-unitarias-testsunit) · [public/](#public) · [PUBLIC_API_URL](#public_api_url)
- **R** — [Redirección /panel a /dengue](#redirección-panel-a-dengue)
- **S** — [Scripts de package.json](#scripts-de-packagejson) · [scripts/genera-imagenes.py](#scriptsgenera-imagenespy) · [server.host y puerto 4321](#serverhost-y-puerto-4321) · [Service worker (sw.js)](#service-worker-swjs) · [Sitemap y su filtro](#sitemap-y-su-filtro) · [Sitio estático y API aparte](#sitio-estático-y-api-aparte) · [src/components/](#srccomponents) · [src/layouts/](#srclayouts) · [src/lib/](#srclib) · [src/pages/](#srcpages) · [src/styles/](#srcstyles) · [src/utils/security.ts (escapeHtml)](#srcutilssecurityts-escapehtml)
- **T** — [Tailwind como plugin de Vite](#tailwind-como-plugin-de-vite) · [tests/](#tests) · [TypeScript y astro check](#typescript-y-astro-check)

<!-- INDICE:FIN -->

## 1. Qué es este repositorio

### Fork-vitrina (repo suelto)

**Qué es.** Un repositorio que contiene solo el frontend del sitio público, sin la API ni la base de datos.

**En este repositorio.** `aetheris-nitor` es el «fork-vitrina» del directorio `web/` del repositorio EPI-Aetheris: se despliega solo, en su propio sitio estático de Render, y su dominio es `epi-aetheris.dev`. El código de `src/` es hoy idéntico al de `web/src/` de EPI-Aetheris (96 archivos sin diferencias); lo que cambia es la raíz (aquí no hay `web/`), un par de pruebas de extremo a extremo y los cinco documentos de la Biblioteca, que están reescritos.

**Ojo.** Como el código es el mismo en los dos sitios, un cambio hecho en uno no llega solo al otro: hay que llevarlo a mano. La historia de este repositorio tiene 96 commits.

**Detalle.** Comentario de `astro.config.mjs`.

### Dos árboles: monorepo y repo suelto

**Qué es.** El mismo código vive en dos disposiciones de carpetas distintas.

**En este repositorio.** En el monorepo, el sitio está en `web/` y la documentación en `docs/`, un nivel por encima del paquete. Aquí el paquete es la raíz y `docs/` cuelga de ella. Para que las dos disposiciones funcionen, `src/content.config.ts` prueba primero `docs/biblioteca` (la copia propia) y, si no existe, cae a `../../docs/biblioteca` (la del monorepo).

**Ojo.** Sin esa doble ruta el repositorio suelto compilaría sin error pero dejaría vacía la colección y las cinco páginas de `/biblioteca`, enlazadas desde el pie, responderían 404 en producción. La carpeta `docs/glosario/` no se ve afectada: el cargador solo lee `docs/biblioteca/*.md`.

### `aetheris-web` (nombre del paquete)

**Qué es.** El campo `name` del `package.json`.

**En este repositorio.** El paquete se llama `aetheris-web`, versión `0.5.0`, con `"type": "module"` (módulos ES). Es el mismo nombre que tiene en el monorepo; el nombre del repositorio en GitHub (`aetheris-nitor`) es otro.

### Sitio estático y API aparte

**Qué es.** Una arquitectura en la que las páginas se generan una vez (en el *build*) y se sirven como archivos, mientras que los datos los pide el navegador a una API distinta.

**En este repositorio.** El sitio es estático (Astro genera HTML) y se aloja como *Static Site* de Render, distribuido por una red de entrega de contenido (CDN). La API y la base de datos no están aquí: son el backend de EPI-Aetheris, en otro dominio. Por eso la página de estado dice que el portal «permanece disponible aun si el backend de cómputo se encuentra temporalmente inactivo».

**Detalle.** En el glosario de EPI-Aetheris: rama 8, «Render».

### Dominio canónico (`site`)

**Qué es.** La dirección base con la que Astro construye las URL absolutas de la página.

**En este repositorio.** `site: 'https://epi-aetheris.dev'`. De ahí salen la etiqueta `<link rel="canonical">`, la `og:url`, la imagen de vista previa y el sitemap. El comentario de la configuración explica el error que se evitó: con el valor anterior (el despliegue del monorepo), cada página declaraba como canónica la dirección de otro sitio.

### Licencia GPL-3.0

**Qué es.** Licencia de software libre con copyleft: quien redistribuya el código modificado debe hacerlo con la misma licencia.

**En este repositorio.** El archivo `LICENSE` contiene el texto completo de la GPL-3.0 y el pie del sitio dice «GPL-3.0 · 2026». Los datos no están bajo esa licencia: conservan la de su fuente.

**Detalle.** [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md#licencias-del-código-y-de-los-datos).

## 2. Mapa de carpetas

### `src/pages/`

**Qué es.** Las rutas del sitio: cada archivo `.astro` es una página y su ruta sale del nombre.

**En este repositorio.** 24 páginas: `index`, `dengue`, `respiratorio`, `analisis` (más `analisis/ficha/[departamento]`), `departamento/[codigo]`, `alertas/` (`index`, `archivo`, `nueva`), `biblioteca/` (`index` y `[...slug]`), `estado`, `acerca-de`, `contacto`, `sugerencias`, `legal/` (`index`, `aviso-legal`, `privacidad`, `terminos`), `demos/` (`index`, `nowcast`), `incrustar/` (`curva-nacional`, `ultima-semana`) y `404`. Una ruta con corchetes es **dinámica**: se genera una página por cada valor (los 14 departamentos o cada documento de la Biblioteca).

**Detalle.** [`01-vocabulario-de-la-interfaz.md`](01-vocabulario-de-la-interfaz.md#1-estructura-del-sitio).

### `src/components/`

**Qué es.** Piezas de interfaz reutilizables.

**En este repositorio.** 24 componentes en la raíz (mapas, curvas, paneles de dengue y respiratorio, cargadores, botones de exportar e incrustar, `AyudaTermino`, `Icono`, `DocumentoTexto`, `NavSecciones`), 14 en `analisis/` (los paneles del workspace, el selector, la barra de herramientas y la leyenda de rampa), 3 archivos en `nowcast/` (dos paneles y `svg-nowcast.ts`) y el módulo `estado-async.ts`, que no es un componente sino un ayudante para los estados de carga.

**Ojo.** Casi todos los componentes de datos traen su propio `<script>` de cliente: piden a la API, dibujan y escuchan los eventos `epi:*`. El HTML del componente es solo la carcasa.

### `src/layouts/`

**Qué es.** Plantillas que envuelven a las páginas.

**En este repositorio.** Dos: `Layout.astro` (cabecera, navegación, pie, metadatos, tema oscuro y registro del service worker) y `LayoutIncrustado.astro` (mínimo: sin navegación ni pie, sin indexar y con atribución, para las vistas de `/incrustar`).

### Propiedades de `Layout`

**Qué es.** Los parámetros que cada página pasa a la plantilla.

**En este repositorio.** `title` (por defecto «EPI-Aetheris»), `descripcion`, `imagen` (por defecto `/og/og-default.png`), `noindex` (saca la página del índice de los buscadores; se usa en el formulario de operadores y en la 404) y `mapa` (activa las conexiones previas a los servidores de teselas de OpenStreetMap, solo donde hay un mapa).

### `src/lib/`

**Qué es.** Lógica sin interfaz: estado, cliente de la API, formato y utilidades.

**En este repositorio.** 23 módulos TypeScript:

| Módulo | Qué hace |
|---|---|
| `alcance-alertas.ts` | Decide a quién aplica una alerta: una nacional aplica a todos; una regional, solo a los departamentos que lista |
| `analisis-api.ts` | Cliente de la API del análisis: cachés de promesas por recurso, contador de peticiones en vuelo y eventos `epi:actividad-red` y `epi:datos-cargados` |
| `analisis-export.ts` | Exportación del análisis a CSV |
| `analisis-layout-state.ts` | Estado del workspace (vista, paneles visibles, tamaños, foco y zoom); evento `epi:analysis-layout-changed` |
| `analisis-state.ts` | Estado de los filtros del análisis; evento `epi:filters-changed` |
| `canal-endemico.ts` | Construye el canal endémico (P50 y P75) y clasifica cada semana en `baja`, `media` o `alta` |
| `colores.ts` | Rampas secuenciales de ColorBrewer, paleta cualitativa Dark2 y colores de «sin dato» y «dato disponible» |
| `departamento-recordado.ts` | Guarda en `localStorage` (clave `epi:departamento`) el departamento que la persona eligió recordar |
| `departamentos.ts` | Los 14 departamentos con su código ISO 3166-2 y su nombre |
| `enlaces.ts` | Rutas fijas a la Biblioteca (`RUTA_SENSIBILIDAD`, `RUTA_FUENTE_TABLERO`) |
| `exportar-grafico.ts` | Exporta gráficos de Observable Plot a SVG o PNG |
| `ficha-departamental.ts` | Tipos y lógica de las fichas departamentales |
| `frescura.ts` | Nombres de las series y textos de «última semana» y de rezago |
| `glosario.ts` | Las doce definiciones de los términos con ayuda «?» |
| `incrustar.ts` | Genera el código `<iframe>` de las vistas incrustables |
| `movimiento.ts` | Entrada de bloques al hacer scroll y cifras que cuentan hacia arriba |
| `plot-interacciones.ts` | Hace focalizables y activables por teclado las marcas de un gráfico de Plot |
| `plot-tema.ts` | Estilo y marco comunes de las gráficas de Plot |
| `respiratorio-state.ts` | Estado de `/respiratorio`; evento `epi:respiratorio-changed` |
| `resumen-semana.ts` | Última semana del tablero y su par del año anterior |
| `tabla-alternativa.ts` | Clase `TablaAlternativa`: la tabla textual de cada gráfica |
| `tipos-analisis.ts` | Tipos del contrato de datos y constantes como `ANIOS_ANALISIS_DENGUE` |
| `vista-alertas.ts` | Tipos, textos y dibujo de las tarjetas de alertas |

**Ojo.** `plot-tema.ts` importa Plot solo como tipo. Es deliberado: con un import de valor, los siete paneles que lo comparten arrastrarían unos 391 KB de Plot y d3 al grafo inicial de `/dengue` y anularían la carga perezosa de cada componente.

### `src/utils/security.ts` (`escapeHtml`)

**Qué es.** Función que convierte `&`, `<`, `>`, `"` y `'` en sus entidades HTML.

**En este repositorio.** Es la única utilidad de `src/utils/`. Todo lo que se interpola en `innerHTML` pasa por `escapeHtml` (la «regla de la casa»), porque los valores, como el nombre de un departamento, vienen de la API. Devuelve la entrada intacta si no es texto.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «`escapeHtml` y XSS».

### `src/styles/`

**Qué es.** Las hojas de estilo globales.

**En este repositorio.** `tokens.css` (118 líneas) define las variables de diseño (`--color-bg`, `--color-ink`, `--color-accent`, `--color-secondary`, `--color-deep`, …) a partir de la paleta fijada por la coordinación el 2026-08-21; los nombres de variable no cambian, solo se agregan tokens nuevos. `global.css` (896 líneas) importa Tailwind y `tokens.css` y define las clases compartidas.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Tokens de diseño».

### `public/`

**Qué es.** Archivos que Astro copia tal cual a la raíz del sitio, sin procesarlos.

**En este repositorio.** `favicon.svg` y `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` e `icon-512-maskable.png` (iconos de la aplicación), `logo/logo-dark-bg.svg`, `og/og-default.png` (imagen para compartir), `geo/slv-adm1.geojson` (límites departamentales con el código ISO ya incorporado), `manifest.webmanifest`, `robots.txt`, `sw.js` (service worker) y `.well-known/security.txt`.

**Ojo.** Los archivos de `public/` no pasan por el *build*: un cambio en `sw.js` o en el GeoJSON llega tal cual, sin nombre con huella (*hash*). El GeoJSON se lee también en el *build* de la portada, con `process.cwd()`, porque una ruta relativa al módulo dejaría de apuntar al mismo sitio una vez empaquetado.

### `tests/`

**Qué es.** Las pruebas automáticas.

**En este repositorio.** `tests/unit/` (8 archivos, con el ejecutor de pruebas de Node) y `tests/e2e/` (20 archivos, con Playwright). Ver la sección 6.

### `scripts/genera-imagenes.py`

**Qué es.** Un script de Python para regenerar la imagen de vista previa y los iconos PNG.

**En este repositorio.** «Uso puntual: se corre a mano cuando cambia la marca, no en el *build*.» Convierte la Inter que Astro ya descargó (`.astro/fonts`, en formato woff2) a TTF con `fontTools` y dibuja con `PIL` sobre los colores de la marca (`--color-deep`, `--color-accent`, `--color-deep-ink`, `--color-live`).

**Ojo.** Depende de `fontTools` y de `PIL`, que no están en el `package.json`: son dependencias de Python del equipo, no del sitio.

### `docs/`

**Qué es.** La documentación del repositorio.

**En este repositorio.** `docs/biblioteca/` (los cinco documentos que se publican en `/biblioteca`, con `frontmatter` de `titulo`, `descripcion`, `orden` y, opcionalmente, `categoria`) y `docs/glosario/` (este glosario, que no se publica). No hay un `README.md` en la raíz.

## 3. Configuración de Astro

### `astro.config.mjs`

**Qué es.** El archivo de configuración del framework Astro.

**En este repositorio.** Define `site`, `prefetch`, `redirects`, `fonts`, `integrations` (íconos y sitemap), `server` y el plugin de Vite para Tailwind. Cada bloque lleva un comentario que explica el porqué.

### Prefetch (`prefetchAll`)

**Qué es.** Precarga del HTML de un enlace antes de que se pulse.

**En este repositorio.** `prefetch: { prefetchAll: true }`: se precarga el HTML de cualquier enlace del sitio al pasar el cursor o al entrar en pantalla, para que la navegación entre las cinco vistas sea casi instantánea.

### Redirección `/panel` a `/dengue`

**Qué es.** Una entrada de `redirects` en la configuración.

**En este repositorio.** `/panel` se renombró a `/dengue` (issue #70). La ruta vieja estuvo en producción, en marcadores y en enlaces compartidos, y la redirección la conserva. En un *build* estático Astro genera una página de redirección por cada entrada, y el sitemap la excluye.

### Fuentes autohospedadas

**Qué es.** La API de fuentes de Astro: descarga los archivos de tipografía en el *build* y los sirve desde el propio dominio, con alternativas de métricas ajustadas para evitar saltos de diseño.

**En este repositorio.** Tres: **Inter** (variable `--font-inter`, pesos 400, 500, 600 y 700; cuerpo del sitio), **IBM Plex Mono** (`--font-plex-mono`, peso 400; etiquetas de ejes, valores y código) y **Fraunces** (`--font-fraunces`, pesos 600 y 700 con eje óptico 144; solo los titulares H1 y H2 de la portada). Ninguna petición sale hacia Google al abrir una página.

**Ojo.** No se hace `preload` de las fuentes a propósito: se difirieron del renderizado crítico (#87) y el intercambio lo cubre el alternativo con métricas ajustadas.

### Íconos (`astro-icon`, Tabler y Simple Icons)

**Qué es.** Integración que inserta iconos SVG en línea durante el *build*, sin JavaScript ni fuente de iconos en el cliente.

**En este repositorio.** Se incluyen los conjuntos **Tabler** (licencia MIT) y **Simple Icons** (CC0, logotipos). Se usan siempre a través de `src/components/Icono.astro`, que fija trazo de 24 px a grosor 2 y trata el ícono como decorativo (oculto a lectores de pantalla) si no se le da una `etiqueta`.

### Sitemap y su filtro

**Qué es.** El archivo `sitemap-index.xml` que lista las páginas públicas para los buscadores.

**En este repositorio.** Generado por `@astrojs/sitemap` a partir de `site`. El filtro deja fuera `/alertas/nueva` (formulario de operadores), `/panel` (la redirección), `/demos` y `/incrustar`. `robots.txt` lo declara y permite todo el sitio.

**Ojo.** `robots.txt` **no** lista `/alertas/nueva` a propósito: un `Disallow` la anunciaría. Queda fuera del índice por su propia etiqueta `noindex` y fuera del sitemap por el filtro.

### `server.host` y puerto 4321

**Qué es.** La configuración del servidor de desarrollo.

**En este repositorio.** `host: true` hace accesible el servidor desde fuera del contenedor Docker y `port: 4321` es el puerto estándar de la interfaz de desarrollo.

### Tailwind como plugin de Vite

**Qué es.** Tailwind CSS 4 se integra directamente como plugin de Vite.

**En este repositorio.** `plugins: [tailwindcss()]` con `@tailwindcss/vite`. La integración anterior (`@astrojs/tailwind`) no soporta Tailwind 4 ni Astro 6 o superior.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Tailwind CSS 4».

### Colección `biblioteca`

**Qué es.** Una colección de contenido de Astro: un conjunto de archivos Markdown con un esquema.

**En este repositorio.** Definida en `src/content.config.ts` con el cargador `glob` sobre `*.md` de `docs/biblioteca/`. El esquema (`zod`) exige `titulo`, `descripcion` y `orden` y admite `categoria`. Orden, título, descripción y agrupación salen del `frontmatter`, no de una lista paralela en las páginas.

### Metadatos para compartir

**Qué es.** Etiquetas de la cabecera que controlan cómo se ve un enlace al pegarlo en una red o un mensajero.

**En este repositorio.** `Layout.astro` emite `description`, `og:*`, `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description` y `twitter:image`. La imagen se convierte en URL absoluta, porque WhatsApp, Slack, Telegram y los rastreadores de redes descartan una `og:image` relativa. El favicon se ofrece en SVG (navegadores modernos) y en PNG de 32 px (respaldo y barra de favoritos), y el `apple-touch-icon` es el que usa iOS al añadir el sitio a la pantalla de inicio.

### `preconnect` a las teselas de OpenStreetMap

**Qué es.** Una pista al navegador para que abra la conexión con un servidor antes de necesitarlo.

**En este repositorio.** Solo las páginas con mapa (`mapa` en `Layout`) la emiten, hacia los tres subdominios de teselas (`a`, `b` y `c.tile.openstreetmap.org`). En el resto sería gasto.

**Detalle.** [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md#openstreetmap-y-las-teselas).

### `DocumentoTexto`

**Qué es.** Componente envoltorio de las páginas de texto largo escritas a mano.

**En este repositorio.** Lo usan las tres páginas legales, «Contacto» y «Acerca de». Da el mismo bloque de lectura que la Biblioteca (tarjeta elevada, medida de unos 68 caracteres, titular en Fraunces) sin pasar por la colección de contenido, porque esos documentos son Markdown compartido con el monorepo y el texto legal es específico de este despliegue.

## 4. Scripts, paquetes y estilo

### Scripts de `package.json`

**Qué es.** Los comandos que se ejecutan con `pnpm <nombre>`.

**En este repositorio.**

| Script | Qué hace |
|---|---|
| `dev` | `astro dev`: servidor de desarrollo en el puerto 4321 |
| `build` | `astro check && astro build`: verifica tipos y genera `dist/` |
| `preview` | `astro preview`: sirve `dist/` para revisar el resultado |
| `check` | `astro check`: solo la verificación de tipos |
| `lint` | ESLint sobre `src/`, `tests/` y los archivos de configuración |
| `format` | Prettier escribe el formato correcto |
| `format:check` | Prettier solo comprueba, sin cambiar nada |
| `test:e2e` | `playwright test`: pruebas de extremo a extremo |
| `test:unit` | `node --experimental-strip-types --test "tests/unit/**/*.test.ts"` |

### pnpm y Corepack

**Qué es.** pnpm es el gestor de paquetes; Corepack es la herramienta de Node que descarga y fija la versión de ese gestor.

**En este repositorio.** `packageManager` fija `pnpm@9.15.9`; el `Dockerfile` activa Corepack (`corepack enable && corepack prepare pnpm@9 --activate`) y `Dockerfile.e2e` fija la versión exacta. `pnpm-lock.yaml` guarda las versiones resueltas y las pruebas de extremo a extremo instalan con `--frozen-lockfile`, que falla si el archivo de bloqueo no coincide con `package.json`.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «pnpm y Corepack».

### `pnpm-workspace.yaml`

**Qué es.** Archivo de configuración del espacio de trabajo de pnpm.

**En este repositorio.** Declara un solo paquete (`'.'`), `allowBuilds: { esbuild: true }` (permite el script de instalación de `esbuild`) y `overrides: { nanoid: '>=3.3.18' }`.

### Overrides de dependencias (`fast-uri`, `nanoid`)

**Qué es.** Reglas que obligan a usar una versión mínima de una dependencia transitiva, aunque el paquete que la trae pida otra.

**En este repositorio.** `package.json` fija `fast-uri` en `^3.1.7` (commit «fix(deps): fast-uri 3.1.7 o superior por las alertas de Dependabot») y `pnpm-workspace.yaml` fija `nanoid` en `>=3.3.18`, regla que ya venía en el primer commit del repositorio.

### Dependencias de ejecución

**Qué es.** Los paquetes que el sitio necesita al ejecutarse en el navegador o al generarse.

**En este repositorio.** Siete: `astro` (`^7.2.8`), `@astrojs/sitemap`, `tailwindcss` y `@tailwindcss/vite` (`^4.3.3`), `leaflet` (`^1.9.4`, mapas), `@observablehq/plot` (`^0.6.17`, gráficas) y `chroma-js` (`^3.2.0`, escalas de color).

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Leaflet», «Observable Plot» y «Chroma.js y ColorBrewer».

### Dependencias de desarrollo

**Qué es.** Paquetes que solo se usan para construir, verificar y probar.

**En este repositorio.** Verificación de tipos (`typescript`, `@astrojs/check`, `@types/*`), estilo (`eslint`, `eslint-plugin-astro`, `typescript-eslint`, `@eslint/js`, `globals`, `prettier`, `prettier-plugin-astro`), pruebas (`@playwright/test`, `@axe-core/playwright`) e iconos (`astro-icon`, `@iconify-json/tabler`, `@iconify-json/simple-icons`).

### ESLint (configuración plana)

**Qué es.** El analizador que detecta errores y malas prácticas en el código; «configuración plana» (*flat config*) es el formato actual, un arreglo de objetos en `eslint.config.js`.

**En este repositorio.** Combina `js.configs.recommended`, `tseslint.configs.recommended` y `astro.configs.recommended`; ignora `.astro/` y `dist/`; declara los globales del navegador y de Node; usa el analizador de TypeScript dentro de los `.astro`; y apaga dos reglas con motivo escrito: `no-explicit-any` («el código cartográfico heredado valida estructuras GeoJSON en tiempo de ejecución; tiparlo por completo es un refactor separado») y `triple-slash-reference` en `*.d.ts` (`src/env.d.ts` usa la referencia que genera Astro).

### Prettier

**Qué es.** El formateador de código.

**En este repositorio.** `.prettierrc.mjs` activa el complemento de Astro, comillas simples (`singleQuote`) y coma final siempre (`trailingComma: 'all'`), con el analizador `astro` para los `.astro`. `.prettierignore` excluye `.astro/`, `dist/`, `node_modules/` y `public/geo/`.

### TypeScript y `astro check`

**Qué es.** TypeScript añade tipos a JavaScript; `astro check` los verifica también dentro de los `.astro`.

**En este repositorio.** `tsconfig.json` extiende `astro/tsconfigs/base`, incluye `.astro/types.d.ts` y todo el árbol, y excluye `dist`. El `build` corre `astro check` antes de `astro build`, así que un error de tipos impide construir.

**Ojo.** `.astro/` lo regenera `astro sync` (que corren `astro check` y `astro build`), por eso no se versiona.

## 5. Contenedores y archivos ignorados

### `Dockerfile` (desarrollo)

**Qué es.** La receta de una imagen de contenedor.

**En este repositorio.** Parte de `node:22-alpine`, activa Corepack con pnpm 9, copia los manifiestos, corre `pnpm install`, copia el código, expone el puerto 4321 y arranca `pnpm exec astro dev --host 0.0.0.0 --ignore-lock`. Es una imagen para **desarrollo**, no para producción: la producción es un sitio estático.

### `--ignore-lock`

**Qué es.** Una opción de `astro dev` que omite el archivo de bloqueo del servidor.

**En este repositorio.** El identificador de proceso que Astro guarda en `.astro/dev.json` puede sobrevivir al contenedor, porque `/app` se monta desde el equipo anfitrión. Docker ya controla la instancia del servicio, así que se omite ese bloqueo para evitar falsos positivos al reiniciar.

### `Dockerfile.e2e`

**Qué es.** La imagen que ejecuta las pruebas de extremo a extremo.

**En este repositorio.** Parte de `mcr.microsoft.com/playwright:v1.62.1-noble` (que ya trae los navegadores), fija `pnpm@9.15.9`, instala con `--frozen-lockfile` y ejecuta `pnpm test:e2e`.

**Ojo.** La versión de la imagen (`v1.62.1`) y la de `@playwright/test` (`^1.62.1`) van alineadas; conviene subirlas juntas, para que los navegadores de la imagen sean los que espera la biblioteca (pauta general de Playwright, no escrita en el repositorio).

### `.dockerignore`

**Qué es.** Lista de rutas que no se copian al contexto de construcción de la imagen.

**En este repositorio.** `node_modules/`, `.astro/`, `dist/`, `test-results/`, `playwright-report/`, `.git`, `.env` y `*.md` (en la raíz).

### `.gitignore` (lo que no se versiona)

**Qué es.** Lista de rutas que Git no rastrea.

**En este repositorio.** Además de lo habitual (`node_modules/`, `dist/`, `.astro/`, registros y archivos de editor): `.env` y `.env.*` (menos `.env.example`), `test-results/` y `playwright-report/`, `graphify-out/` (índice de código regenerable), `.claude/` y `CLAUDE.md` (configuración local de agentes), `.agents/` y `skills-lock.json` (habilidades de agentes instaladas por cada persona) y `*.local.md`, el sufijo de los archivos de trabajo local para delegar tareas a agentes.

**Detalle.** En el glosario de EPI-Aetheris: rama 8, «Archivos de tarea locales (`*.local.md`)».

## 6. Pruebas

### Pruebas unitarias (`tests/unit/`)

**Qué es.** Pruebas de funciones puras, sin navegador.

**En este repositorio.** Ocho archivos que ejecuta el ejecutor de pruebas integrado de Node (`node --test`) con `--experimental-strip-types`, que permite correr TypeScript sin compilar: `alcance-alertas`, `canal-endemico`, `exportar-grafico`, `ficha-departamental`, `frescura`, `incrustar`, `respiratorio-state` y `resumen-semana`. Cada nombre coincide con el módulo de `src/lib/` que prueba.

### Pruebas de extremo a extremo (`tests/e2e/`)

**Qué es.** Pruebas que abren el sitio en un navegador real y actúan como una persona.

**En este repositorio.** Veinte archivos `.spec.ts` con Playwright: `alertas`, `alertas-territorio`, `analisis`, `biblioteca`, `canal-endemico`, `contraste-nowcast`, `departamento`, `enfoque-dual`, `estado`, `exportar-grafico`, `fichas-departamentales`, `glosario`, `impresion-dengue`, `incrustar`, `legal`, `movil`, `respiratorio`, `respiratorio-estado`, `tema-oscuro` y `ultima-semana`.

**Ojo.** Estas pruebas necesitan el sitio en marcha y una API (`PLAYWRIGHT_BASE_URL` apunta al sitio). Dos de ellas difieren de las de `web/tests/e2e/` del monorepo por el commit «test: las pruebas de reintento y de contraste en oscuro valen contra el sitio compilado»: `tema-oscuro` espera a que desaparezcan los cargadores atenuados antes de medir el contraste con axe, y `ultima-semana` omite la prueba de reintento cuando el sitio compilado conserva la copia del *build* (`#ultima-semana-instantanea`), que muestra un aviso y no un botón.

### Configuración de Playwright

**Qué es.** El archivo `playwright.config.ts`.

**En este repositorio.** `testDir: './tests/e2e'`; `fullyParallel: false` y **un solo worker**; `forbidOnly` y **dos reintentos** solo en integración continua (`CI`); reportero `list`; límite de 45 s por prueba y de 10 s por aserción; `baseURL` desde `PLAYWRIGHT_BASE_URL` (por defecto `http://localhost:4321`); traza y captura solo si falla; un único proyecto, `chromium` (Desktop Chrome).

**Ojo.** El único *worker* es deliberado: el servidor de desarrollo de Vite reoptimiza dependencias de forma perezosa y, con varios *workers* pidiendo `/dengue` y `/respiratorio` a la vez, Leaflet y Observable Plot entran en una carrera que devuelve 504 y recarga la página a mitad de prueba. La suite completa tarda unos 30 s en serie.

### axe (accesibilidad automatizada)

**Qué es.** `@axe-core/playwright` ejecuta el motor axe, que detecta problemas de accesibilidad (contraste, etiquetas, roles) en la página abierta.

**En este repositorio.** Once archivos de `tests/e2e/` lo usan: `analisis`, `canal-endemico`, `contraste-nowcast`, `departamento`, `estado`, `glosario`, `incrustar`, `legal`, `respiratorio`, `tema-oscuro` y `ultima-semana`.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Playwright y axe».

## 7. Publicación y uso sin conexión

### `PUBLIC_API_URL`

**Qué es.** Variable de entorno de Astro que fija, en el *build*, la dirección base de la API.

**En este repositorio.** El código la lee como `import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000'`. Como el sitio es estático, el valor queda escrito en los archivos generados: cambiarla exige reconstruir el sitio.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «`PUBLIC_API_URL` y `API_BASE`».

### Manifiesto web (`manifest.webmanifest`)

**Qué es.** Archivo que describe la aplicación instalable (PWA, *Progressive Web App*).

**En este repositorio.** Nombre «EPI-Aetheris», idioma `es`, `start_url: "/alertas"` (al abrir la aplicación instalada se llega a las alertas), `scope: "/"`, `display: "standalone"`, `background_color: "#ffffff"`, `theme_color: "#2a2a72"` y cuatro iconos (SVG, 192 px, 512 px y 512 px *maskable*). Su descripción dice que las alertas las redacta el equipo y que «no es un diagnóstico ni un pronóstico».

**Ojo.** El `theme_color` (`#2a2a72`) y la etiqueta `theme-color` de `Layout.astro` no coinciden con el color de la cabecera del sitio (`--color-header: #183e39`).

### Service worker (`sw.js`)

**Qué es.** Un script que el navegador ejecuta en segundo plano y que intercepta las peticiones para servir copias guardadas cuando no hay conexión.

**En este repositorio.** Escrito a mano, sin dependencias, en `public/sw.js`. `VERSION = 'v1'` da los nombres de las dos cachés, `epi-shell-v1` (la estructura del sitio) y `epi-api-v1` (las alertas). El «cascarón mínimo» precargado es `['/', '/alertas']`. Las alertas van primero a la red y la caché solo se usa sin conexión, porque mostrar como vigente una alerta ya desactivada tendría consecuencias clínicas.

**Ojo.** Al cambiar la estrategia o los nombres hay que subir `VERSION`; el service worker borra las cachés que no coinciden con las dos vigentes.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Service worker (`sw.js`)» y «`VERSION` del service worker».

### Imagen para compartir (`og-default.png`)

**Qué es.** La imagen que aparece al compartir un enlace del sitio.

**En este repositorio.** `public/og/og-default.png`, generada con `scripts/genera-imagenes.py`. Cada página puede pasar otra por la propiedad `imagen` de `Layout`.
