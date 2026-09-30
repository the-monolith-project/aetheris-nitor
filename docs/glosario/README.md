# Glosario técnico de aetheris-nitor

Vocabulario técnico de este repositorio, el frontend del sitio público de EPI-Aetheris: lo que dicen las pantallas, cómo se construye y se prueba el sitio, qué prometen las páginas legales y qué forma tienen los datos que llegan de la API. Son **237 entradas** en cuatro ramas.

> **Este glosario describe; no decide.** El código y las páginas del sitio mandan sobre este texto, y las decisiones del proyecto viven en los ADR del repositorio EPI-Aetheris (este repositorio no tiene `docs/adr/`). Redactado el 2026-09-30 sobre el commit `6d7c900`; los textos del repositorio que ya no coinciden con su estado actual están en las [Notas de vigencia](#notas-de-vigencia).

## Qué cubre y qué no

`aetheris-nitor` es el «fork-vitrina» de la carpeta `web/` de EPI-Aetheris: solo el frontend, sin API ni base de datos. Por eso este glosario se reparte el trabajo con el de EPI-Aetheris:

- **Aquí:** lo propio de este repositorio: el vocabulario de la interfaz (secciones, paneles, capas del mapa, niveles de alerta, mensajes), la estructura y las herramientas del sitio, las páginas legales y el contrato de datos **visto desde el cliente**.
- **En el glosario de EPI-Aetheris** (`docs/glosario/` de ese repositorio): la epidemiología (semana epidemiológica, caso probable, canal endémico), las fuentes y su ingesta, el clima, la estadística del nowcast, los módulos M1 a M4 en profundidad, el backend, la base de datos, el despliegue y el proceso de decisión. Cuando una entrada de aquí toca un término de ese dominio, dice qué muestra el sitio y remite a la rama correspondiente por su nombre.

Como el código de `src/` es idéntico en los dos repositorios, la rama 9 (Frontend web) de EPI-Aetheris describe las mismas piezas desde el otro lado; las ramas de aquí añaden lo que solo existe en este repositorio o en la vista de quien lee el sitio.

## Mapa de ramas

La numeración de las ramas es propia de este repositorio. Cada archivo tiene su índice alfabético al comienzo.

| Rama | Archivo | Qué reúne | Entradas |
|---|---|---|---|
| 1 | [`01-vocabulario-de-la-interfaz.md`](01-vocabulario-de-la-interfaz.md) | Estructura del sitio, los doce términos con ayuda «?», los paneles y filtros del análisis, las capas del mapa, la predicción, el observatorio respiratorio, las alertas en pantalla y los mensajes de estado | 86 |
| 2 | [`02-sitio-estatico-y-herramientas.md`](02-sitio-estatico-y-herramientas.md) | Qué es este repositorio, mapa de carpetas, configuración de Astro, scripts y paquetes, contenedores, pruebas, publicación y uso sin conexión | 51 |
| 3 | [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md) | Aviso legal, política de privacidad, términos de uso, contacto, sugerencias, seguridad (`security.txt`) y cómo se indexa el sitio | 50 |
| 4 | [`04-contrato-de-datos-consumido.md`](04-contrato-de-datos-consumido.md) | Convenciones del contrato (`disponible: false`, `aviso`, `null` frente a cero), endpoints consumidos, formas de las respuestas y reglas con que el cliente las lee | 50 |

## Por dónde empezar

### Doce términos para empezar

1. [Fork-vitrina (repo suelto)](02-sitio-estatico-y-herramientas.md#fork-vitrina-repo-suelto): qué es este repositorio y por qué su código coincide con `web/` de EPI-Aetheris.
2. [Sitio estático y API aparte](02-sitio-estatico-y-herramientas.md#sitio-estático-y-api-aparte): el sitio son archivos; los datos los pide el navegador a otra dirección.
3. [Navegación principal](01-vocabulario-de-la-interfaz.md#navegación-principal): las dos caras del sitio, que son secciones y no un modo.
4. [Ayuda de término («?»)](01-vocabulario-de-la-interfaz.md#ayuda-de-término-): el glosario que vive dentro de la interfaz.
5. [Filtros de análisis](01-vocabulario-de-la-interfaz.md#filtros-de-análisis): el conjunto de filtros que gobierna todos los paneles.
6. [Capas del mapa](01-vocabulario-de-la-interfaz.md#capas-del-mapa): qué colorea cada capa y por qué ninguna es un nivel de riesgo.
7. [Predicción de casos a corto plazo](01-vocabulario-de-la-interfaz.md#predicción-de-casos-a-corto-plazo): la única predicción del sistema y cómo se lee.
8. [Niveles: Informativo, Atención, Intensificación](01-vocabulario-de-la-interfaz.md#niveles-informativo-atención-intensificación): categorías de respuesta que decide el equipo de vigilancia.
9. [Respuesta `disponible: false`](04-contrato-de-datos-consumido.md#respuesta-disponible-false): cómo se degrada el sitio cuando falta un dato.
10. [`null` frente a cero](04-contrato-de-datos-consumido.md#null-frente-a-cero): la ausencia de dato nunca se dibuja como cero.
11. [Lo que se guarda en el navegador](03-legal-privacidad-y-publicacion.md#lo-que-se-guarda-en-el-navegador): qué queda en el equipo de quien visita.
12. [Licencias del código y de los datos](03-legal-privacidad-y-publicacion.md#licencias-del-código-y-de-los-datos): GPL-3.0 para el código y la licencia de cada fuente para sus datos.

### Rutas según lo que se quiere hacer

- **Leer una pantalla.** [Portada](01-vocabulario-de-la-interfaz.md#portada) → [Análisis (índice de herramientas)](01-vocabulario-de-la-interfaz.md#análisis-índice-de-herramientas) → [Filtros de análisis](01-vocabulario-de-la-interfaz.md#filtros-de-análisis) → [Vistas](01-vocabulario-de-la-interfaz.md#vistas-general-territorial-temporal-clima-calidad-de-datos) → [Capas del mapa](01-vocabulario-de-la-interfaz.md#capas-del-mapa) → [Sin dato para esta selección](01-vocabulario-de-la-interfaz.md#sin-dato-para-esta-selección).
- **Interpretar una alerta.** [Alertas de campo](01-vocabulario-de-la-interfaz.md#alertas-de-campo) → [Niveles](01-vocabulario-de-la-interfaz.md#niveles-informativo-atención-intensificación) → [Rótulo de alerta de prueba](01-vocabulario-de-la-interfaz.md#rótulo-de-alerta-de-prueba) → [«NO VIGENTE»](01-vocabulario-de-la-interfaz.md#no-vigente) → [Campos clínicos](01-vocabulario-de-la-interfaz.md#campos-clínicos-de-la-tarjeta-de-alerta) → [Alcance de una alerta](04-contrato-de-datos-consumido.md#alcance-de-una-alerta).
- **Levantar o modificar el sitio.** [Dos árboles: monorepo y repo suelto](02-sitio-estatico-y-herramientas.md#dos-árboles-monorepo-y-repo-suelto) → [Mapa de carpetas](02-sitio-estatico-y-herramientas.md#2-mapa-de-carpetas) → [Scripts de `package.json`](02-sitio-estatico-y-herramientas.md#scripts-de-packagejson) → [`Dockerfile` (desarrollo)](02-sitio-estatico-y-herramientas.md#dockerfile-desarrollo) → [Pruebas de extremo a extremo](02-sitio-estatico-y-herramientas.md#pruebas-de-extremo-a-extremo-testse2e).
- **Consumir la API.** [`API_BASE` y `PUBLIC_API_URL`](04-contrato-de-datos-consumido.md#api_base-y-public_api_url) → [Respuesta `disponible: false`](04-contrato-de-datos-consumido.md#respuesta-disponible-false) → [Endpoints consumidos](04-contrato-de-datos-consumido.md#2-endpoints-consumidos) → [Formas de las respuestas](04-contrato-de-datos-consumido.md#3-formas-de-las-respuestas).
- **Revisar lo legal.** [Documentos legales](03-legal-privacidad-y-publicacion.md#documentos-legales) → [Política de privacidad](03-legal-privacidad-y-publicacion.md#política-de-privacidad) → [Quién más recibe datos](03-legal-privacidad-y-publicacion.md#quién-más-recibe-datos) → [Derechos del titular (ARCO-POL)](03-legal-privacidad-y-publicacion.md#derechos-del-titular-arco-pol) → [Términos de uso](03-legal-privacidad-y-publicacion.md#aceptación-de-los-términos) → [`security.txt` (RFC 9116)](03-legal-privacidad-y-publicacion.md#securitytxt-rfc-9116).

## Siglas y abreviaturas

Las expansiones **sin marca** están escritas en el propio repositorio. Las marcadas con **†** son de uso general: el repositorio usa la sigla sin expandirla y la expansión la aporta este glosario. VIGEPES y SIMMOW no tienen expansión en ningún repositorio del proyecto y aquí tampoco se inventa.

| Sigla | Significa | Entrada |
|---|---|---|
| ARCO-POL | Sin expansión en la página; agrupa siete derechos sobre datos personales (acceso, rectificación, cancelación, oposición, portabilidad, olvido y limitación) | [Derechos del titular](03-legal-privacidad-y-publicacion.md#derechos-del-titular-arco-pol) |
| CC BY 4.0 | Creative Commons Atribución 4.0 † | [CC BY 4.0 (Open-Meteo)](03-legal-privacidad-y-publicacion.md#cc-by-40-open-meteo) |
| CC BY-SA 2.0 | Creative Commons Atribución-CompartirIgual 2.0 † | [CC BY-SA 2.0](03-legal-privacidad-y-publicacion.md#cc-by-sa-20-límites-departamentales) |
| CDN | Content Delivery Network (red de distribución de contenido) † | [Estado del servicio](01-vocabulario-de-la-interfaz.md#estado-del-servicio) |
| CORS | Cross-Origin Resource Sharing † | [Uso de la API](03-legal-privacidad-y-publicacion.md#uso-de-la-api) |
| CSV | Valores separados por comas † | [Exportación CSV del análisis](04-contrato-de-datos-consumido.md#exportación-csv-del-análisis) |
| e2e | De extremo a extremo (*end to end*) † | [Pruebas de extremo a extremo](02-sitio-estatico-y-herramientas.md#pruebas-de-extremo-a-extremo-testse2e) |
| GPL-3.0 | GNU General Public License, versión 3 | [GPL-3.0](03-legal-privacidad-y-publicacion.md#gpl-30) |
| INSAMT | Instituto Nacional de San Miguel Tepezontes | [Alertas de campo](01-vocabulario-de-la-interfaz.md#alertas-de-campo) |
| IP | Dirección de Protocolo de Internet † | [Dirección IP y *user-agent*](03-legal-privacidad-y-publicacion.md#dirección-ip-y-user-agent) |
| IRA | Infección respiratoria aguda | [IRA — conteo notificado](01-vocabulario-de-la-interfaz.md#ira--conteo-notificado-y-neumonías--conteo-notificado) |
| Iv | Idoneidad biofísica | [Iv (idoneidad biofísica)](01-vocabulario-de-la-interfaz.md#iv-idoneidad-biofísica) |
| M1 a M4 | Módulos descriptivos: idoneidad biofísica, anomalía climática, presión epidemiológica relativa e integridad de la vigilancia | [Cuatro preguntas](01-vocabulario-de-la-interfaz.md#cuatro-preguntas-m1-a-m4-en-la-portada) |
| MINSAL | Ministerio de Salud (de El Salvador) | [Observatorio respiratorio (MINSAL)](01-vocabulario-de-la-interfaz.md#observatorio-respiratorio-minsal) |
| MMWR | Morbidity and Mortality Weekly Report † (calendario epidemiológico de la OPS y el CDC) | [Semana epidemiológica (SE)](01-vocabulario-de-la-interfaz.md#semana-epidemiológica-se) |
| OG | Open Graph † (etiquetas para compartir enlaces) | [Metadatos para compartir](02-sitio-estatico-y-herramientas.md#metadatos-para-compartir) |
| OSM, OSMF | OpenStreetMap y OpenStreetMap Foundation | [OpenStreetMap y las teselas](03-legal-privacidad-y-publicacion.md#openstreetmap-y-las-teselas) |
| PNG, SVG | Formatos de imagen: Portable Network Graphics y Scalable Vector Graphics † | [Manifiesto web](02-sitio-estatico-y-herramientas.md#manifiesto-web-manifestwebmanifest) |
| PWA | Progressive Web App † | [Manifiesto web](02-sitio-estatico-y-herramientas.md#manifiesto-web-manifestwebmanifest) |
| RFC 9116 | Norma sobre `security.txt`; RFC es *Request for Comments* † | [`security.txt` (RFC 9116)](03-legal-privacidad-y-publicacion.md#securitytxt-rfc-9116) |
| SE | Semana epidemiológica | [Semana epidemiológica (SE)](01-vocabulario-de-la-interfaz.md#semana-epidemiológica-se) |
| SIBASI | Sistemas Básicos de Salud Integral † | [Niveles](01-vocabulario-de-la-interfaz.md#niveles-informativo-atención-intensificación) |
| SLA | *Service level agreement*, acuerdo de nivel de servicio † | [Disponibilidad](03-legal-privacidad-y-publicacion.md#disponibilidad) |
| VIGEPES | Sin expansión (sistema de vigilancia de MINSAL que citan los boletines) | [Campos clínicos](01-vocabulario-de-la-interfaz.md#campos-clínicos-de-la-tarjeta-de-alerta) |
| VSR | Virus sincitial respiratorio † | [Influenza, VSR y SARS-CoV-2](01-vocabulario-de-la-interfaz.md#influenza-vsr-y-sars-cov-2--laboratorio-nacional) |
| WIS | Weighted Interval Score † (puntuación de intervalo ponderada) | [Reducción del error de intervalo](01-vocabulario-de-la-interfaz.md#reducción-del-error-de-intervalo-wis-respecto-a-la-persistencia) |
| XSS | Cross-site scripting † | [`src/utils/security.ts`](02-sitio-estatico-y-herramientas.md#srcutilssecurityts-escapehtml) |
| YTD | *Year to date* † (la interfaz lo traduce: «Acumulado del año (YTD)») | [Periodo MINSAL](01-vocabulario-de-la-interfaz.md#periodo-minsal-semana-acumulado-histórico) |

## Cómo está escrito

- **Estructura de un archivo.** Título, «Para quién es», «Cómo leer una entrada», «Ramas vecinas», el **índice alfabético** de sus entradas y las secciones (`##`) con las entradas (`###`).
- **Estructura de una entrada.** Las ramas 1 y 3 usan **En pantalla** o **En el sitio** (el texto tal como aparece, entre «comillas angulares»), **Qué significa** y, cuando aporta, **Ojo** y **Detalle**. La rama 2 usa **Qué es** y **En este repositorio**. La rama 4 usa **Qué es** y **En el cliente**.
- **Citas exactas.** Los textos de interfaz y de las páginas legales están copiados del código fuente al 2026-09-30. Un cambio en la pantalla exige actualizar la entrada.
- **Definiciones generales.** Las de programación y de derecho son de uso corriente y **no son asesoría legal**; el texto que vale es el de cada página.
- **Voz.** Español neutro. No se asignan pronombres a las personas: se las nombra por su nombre o por su rol.

## Notas de vigencia

Textos del repositorio que ya no coinciden con su estado actual. **No se corrigieron aquí**; se listan para que quien lea sepa a qué creerle. Las líneas son las del commit `6d7c900` (2026-09-30).

1. **Enlaces a rutas movidas.** La Biblioteca 03 (línea 50) enlaza `docs/modulos-descriptivos/modulo-3-presion-epidemiologica.md` y la Biblioteca 04 (línea 8) enlaza `docs/contexto/03-fuentes-de-datos.md`, ambos en la rama `main` de EPI-Aetheris. Esas carpetas salieron de ese repositorio el 2026-09-25 hacia el repositorio STC, donde hoy están en `EPI-Aetheris/historico/modulos-descriptivos/` y `EPI-Aetheris/historico/contexto/`. Las direcciones de GitHub ya no resuelven.
2. **Filas de clima.** La Biblioteca 04 (línea 75) dice «Filas cargadas: 35.868 (7 variables, 14 departamentos, de 2018 a 2024, con 2020)». El volcado del repositorio EPI-Aetheris trae hoy 65.450 filas de `variables_ambientales`: 9.268 por cada una de las 7 variables climáticas y 574 de `oni_anom`, de 2014 a 2026.
3. **Tamaño del volcado.** Las Bibliotecas 05 (línea 71) y 06 (línea 42) dicen «4,4 MB». Es la medición de la primera versión; hoy el archivo `db/seed/seed_datos_reales.sql` de EPI-Aetheris pesa 5.675.731 bytes (unos 5,7 MB).
4. **Arranque con Docker Compose.** La Biblioteca 06 (líneas 10 a 31) y la portada (`index.astro`, línea 211, «Tres servicios que se levantan juntos») dicen que `docker compose up --build` levanta tres contenedores y deja el sitio en `http://localhost:4321`. Desde el commit `82c5077` de EPI-Aetheris (#156) el servicio `web` va bajo el perfil `web` y hay que pedirlo aparte: `docker compose --profile web up -d web`. Este repositorio no tiene `docker-compose.yml`: el texto describe el monorepo.
5. **Descripción de M4 en `/analisis`.** `src/pages/analisis.astro` (línea 18) describe la tarjeta de dengue con «presión epidemiológica relativa como percentil (M3) y nowcast de la semana en curso (M4)». M4 es la integridad de la vigilancia y el nowcast es la predicción de 1 a 8 semanas desde la última semana observada, no una estimación de la semana en curso. El mismo texto está en `web/src/pages/analisis.astro` de EPI-Aetheris.
6. **Etiqueta del pie.** El enlace «Módulos M1–M3» (`src/layouts/Layout.astro`, línea 322) apunta a «Qué hace hoy», documento que describe también M4.
7. **Lo que se guarda en el navegador.** La política de privacidad (`src/pages/legal/privacidad.astro`, línea 200) dice «Sí se guardan tres cosas en el propio navegador»: la clave de publicación, las alertas ya vistas y las copias de páginas. El código escribe además en `localStorage` la elección de tema (`epi:tema`) y el departamento recordado (`epi:departamento`). Ninguna contiene datos personales, pero no están en la lista.
8. **Color del tema.** `src/layouts/Layout.astro` (línea 103) y `public/manifest.webmanifest` (línea 10) declaran `theme-color` `#2a2a72` (índigo); la cabecera del sitio usa `--color-header: #183e39` (verde oscuro) de la paleta fijada el 2026-08-21.
9. **Dos `escapeHtml`.** Existen `src/utils/security.ts` (escapa también la comilla simple) y `src/lib/vista-alertas.ts` (línea 128, que no la escapa). Las dos funciones tienen el mismo nombre y comportamientos distintos.
10. **Ayuda «?» de la semana epidemiológica.** `src/lib/glosario.ts` define la clave `semana-epidemiologica`, pero ningún componente le coloca su botón «?».
11. **`security.txt` vence.** `Expires: 2027-09-20T00:00:00.000Z`: pasada esa fecha el archivo deja de ser válido y hay que renovarlo (el propio archivo lo recuerda).
12. **Sin `README.md` en la raíz.** El repositorio solo tiene `LICENSE` en la raíz. La entrada de lectura es la Biblioteca (`docs/biblioteca/`) y este glosario.

## Relación con los otros repositorios

- **[EPI-Aetheris](https://github.com/the-monolith-project/EPI-Aetheris):** el monorepo con el backend, la base de datos, los ADR y `web/`, del que este repositorio es la copia de despliegue del frontend. Su glosario (`docs/glosario/`) tiene diez ramas de dominio, datos, estadística, ingeniería y proceso. Los enlaces de contacto, sugerencias y `security.txt` de este sitio apuntan a ese repositorio, no a este.
- **[STC](https://github.com/the-monolith-project/STC):** el marco de trabajo TMP-STC y el archivo histórico de EPI-Aetheris (`EPI-Aetheris/historico/`). Su glosario (`glosario/`) cubre la metodología del marco, el vocabulario de los documentos históricos y las decisiones y la cronología.

## Mantenimiento

- **Cuándo entra un término.** Cuando un lector no lo entendería sin ayuda y el sitio o el repositorio lo usa con un sentido preciso.
- **Cuando cambia una pantalla.** Se actualiza la entrada con el texto nuevo, no se agrega una entrada paralela.
- **El índice alfabético.** El bloque entre `<!-- INDICE:INICIO -->` y `<!-- INDICE:FIN -->` de cada archivo se generó a partir de los encabezados `###` y hoy se mantiene a mano: al agregar, renombrar o quitar una entrada hay que actualizar su línea. Las anclas siguen las reglas de GitHub (minúsculas, sin signos de puntuación, espacios convertidos en guiones y sufijo `-1` en un encabezado repetido).
- **No se publica.** `src/content.config.ts` solo carga `docs/biblioteca/*.md`, así que este glosario no entra al sitio ni puede romper el *build*.
