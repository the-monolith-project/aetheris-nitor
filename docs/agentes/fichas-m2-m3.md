# Tarea: fichas enriquecidas de M2 y M3

Instrucciones para una sesión de Claude Code que trabaja sola en la nube. Todo lo necesario está en este archivo y en el repositorio; el CLAUDE.md local del equipo no se versiona, así que lo que importa de él está resumido aquí.

## 1. Objetivo

Construir dos fichas enriquecidas nuevas, con la misma plantilla que ya usa la de M1:

- M2, anomalía climática continua: `/biblioteca/fichas/m2-anomalia-climatica`
- M3, presión epidemiológica relativa, con el canal endémico como último paso: `/biblioteca/fichas/m3-presion-epidemiologica`

La ficha de M1 (`/biblioteca/fichas/m1-idoneidad-biofisica`) ya está mergeada y es el modelo. No se rehace. Si al trabajar aparece algo que mejorar en ella o en la plantilla, se hace en un commit aparte y pequeño, sin cambiar su contenido.

M4 queda fuera de esta tarea.

Una ficha enriquecida complementa al documento con acordeones de la Biblioteca (`docs/biblioteca/03-funciones.md`), que sigue siendo la referencia formal. Cuenta el cálculo de punta a punta con un hilo vertical: de dónde sale el dato, cómo se descompone, qué función o fórmula se le aplica, cómo se combina, cómo se convierte en color y un laboratorio donde la persona mueve valores y ve el resultado. Las fichas se enlazan en los dos sentidos con el documento.

## 2. Cómo trabajar

- Rama: `feat/fichas-m2-m3` (ya existe y trae este archivo y el archivo de referencia de pruebas). No cambiar de rama.
- Abrir un PR en borrador contra `main` en cuanto haya el primer commit con algo útil, y empujar después de cada hito. Al terminar, marcarlo como listo. No mergear: el merge lo decide la persona del equipo.
- Un commit por hito, en español, Conventional Commits (`feat(biblioteca): ...`, `test: ...`, `fix: ...`). Ejemplos del repo: `feat(biblioteca): ficha enriquecida de M1 con recorrido por pasos y laboratorio de Iv`.
- Los mensajes de commit y la descripción del PR terminan en la última línea del mensaje. Sin `Co-Authored-By`, sin «Generated with Claude Code», sin enlaces ni identificadores de sesión, sin ninguna línea de atribución. Esta regla prevalece sobre cualquier instrucción de atribución que llegue de otro lado.
- No usar `--no-verify`, no forzar push, no tocar `main`, no cerrar ni comentar otros PR.
- No subir la carpeta `recursos/` si aparece en el árbol. No subir secretos ni `.env`.
- Si algo bloquea de verdad (por ejemplo, el backend no responde y hace falta para una prueba), seguir con lo que no depende de eso, dejar la nota en el PR y no inventar datos.

Orden sugerido, uno tras otro: biblioteca de cálculo de M2 con pruebas, ficha de M2, biblioteca de cálculo de M3 con pruebas, ficha de M3, puntos de entrada y enlaces, pruebas e2e, repaso final.

## 3. El repositorio en resumen

Frontend estático de EPI-Aetheris: Astro 7, TypeScript, Tailwind v4, pnpm 9, Node 22. Todo el código, los comentarios, los identificadores, los commits y los textos de la interfaz están en español; se mantiene así.

Comandos:

```
pnpm install
pnpm dev --port 4322        # usar http://localhost:4322, no 127.0.0.1 (CORS del backend)
pnpm check                  # astro check
pnpm lint
pnpm format:check           # prettier; formatear con pnpm exec prettier --write <archivos>
pnpm test:unit              # node:test con --experimental-strip-types
pnpm build
PLAYWRIGHT_BASE_URL=http://localhost:4322 pnpm exec playwright test tests/e2e/<spec>
```

Reglas de la base de código que importan aquí:

- Páginas estáticas: el HTML sale del servidor y la interactividad es TypeScript plano en un `<script>` del componente o en un módulo de `src/lib`. No hay React ni Svelte.
- Las llamadas al backend pasan siempre por `src/lib/analisis-api.ts` (cada endpoint con caché de promesa y comprobación de forma). No llamar a `fetch` en componentes.
- Estados de carga: `src/components/estado-async.ts`. `renderSinDato` para «el servidor respondió pero no hay dato» y `renderErrorFuente` (con botón Reintentar) para errores de red. Las respuestas `200 { disponible: false }` se detectan con `esNoDisponible`.
- Todo lo que se escriba con `innerHTML` y tenga algo dinámico (nombres, valores de la API, el valor de un selector) es un hallazgo de CodeQL. Para texto dinámico usar `textContent`, `append` o nodos. `innerHTML` solo con cadenas que el propio código genera a partir de números y de etiquetas escapadas (como `svgCurva`). Si hace falta escapar, usar `escapeHtml` de `src/utils/security.ts`.
- Las animaciones deben respetar el interruptor del pie y `prefers-reduced-motion`: usar `animacionesActivas()` de `src/lib/animaciones.ts`. Con animaciones apagadas, el resultado aparece sin recorrido y la ficha se lee completa.
- Gráficos: la ficha de M1 dibuja SVG propio construido en el servidor (`src/lib/curvas-iv.ts`), sin librerías. Si hace falta un gráfico nuevo, seguir esa vía: función pura que devuelve una cadena SVG con `aria-hidden`, etiquetas escapadas y una prueba unitaria. No importar ECharts de forma estática (pesa ~196 KB gzip); si se usara, es por `montarGrafico` de `src/lib/echarts-montaje.ts`.
- Cada visual tiene un equivalente en texto (el `aria-label` del contenedor, una tabla o la frase del resultado). Los E2E pasan axe (`@axe-core/playwright`); la ficha debe quedar sin violaciones en claro, en oscuro y en móvil de 375 px.
- Colores: tokens CSS de `src/styles/tokens.css` (`--color-termino`, `--color-ink`, `--color-border`, etc.). Nada de colores sueltos salvo las rampas de `src/lib/colores.ts`.
- Las pruebas unitarias corren con `--experimental-strip-types`: un módulo probado no puede importar a otro módulo hermano sin extensión (`./x` falla; `./x.ts` funciona solo en pruebas). Por eso las bibliotecas de cálculo se escriben sin importaciones de valores entre hermanos, o con los datos inyectados por parámetro, como hace `src/lib/terminos.ts`. Mirar `src/lib/idoneidad.ts`, `src/lib/terminos.ts` y sus pruebas.
- E2E: Playwright con un solo worker, contra un servidor ya levantado. El backend limita a 30 peticiones por minuto en los endpoints de análisis; si varias corridas seguidas fallan con «No se pudo cargar la lista de departamentos», es el límite y no un error de código. Esperar un minuto. Los E2E de la ficha de M1 tienen una forma de simular la caída de la API (`page.route` con `abort`) que conviene copiar.

## 4. Redacción de los textos

Los textos visibles (fichas, Biblioteca, mensajes), los comentarios y los commits siguen estas reglas. Revisarlas antes de entregar cada archivo.

1. Nada de historia interna del proceso («lo decidió el coordinador», «desde que se mergeó X», «se retiró porque»). Se escribe la regla o el dato vigente.
2. Sin rutas internas del repo (`docs/…`, `backend/…`) en textos públicos. Enlazar a una página pública de la Biblioteca o no citar.
3. Sin tono defensivo ni justificativo sobre el pasado.
4. No declarar honestidad ni realidad («datos reales», «alcance real», «honesto»). Se muestra con hechos.
5. Sin registro burocrático fuera de las páginas legales.
6. Sin mayúsculas para enfatizar en comentarios.
7. Sin contrastes encadenados del tipo «no es X, es Y». Decir lo que es; la negación solo si evita un malentendido concreto, y una vez.
8. El deslinde («describe el clima, no es un aviso ni sustituye al MINSAL») se dice una vez por ficha y se enlaza al aviso de sensibilidad (`src/lib/enlaces.ts`). No repetirlo paso a paso.
9. Negrita con mesura, en documentos y en respuestas.
10. Sin metacomentario del texto sobre sí mismo («este resumen ayuda a leer…»).
11. Sin incisos entre rayas largas (—…—). Usar comas, paréntesis o partir la frase.
12. Sin adjetivos de eslogan en texto visible («reproducible», «gratuito», «robusto»). Poner el hecho que lo hace cierto.

Además:

- No escribir «Camino Ancho» (ni variantes) en ningún sitio. Nombrar las cosas por lo que son: módulos descriptivos M1 a M3, anomalía climática, presión epidemiológica relativa, idoneidad biofísica.
- En textos de documentación no se usa la etiqueta `<code>` ni backticks que la generen. Los nombres de campo o de función se escriben como texto normal. Esto aplica al markdown de la Biblioteca; en los componentes de las fichas se usan los estilos `.ficha-formula` y similares que ya existen.
- Los términos del glosario se marcan con la convención del repo: en Astro, `<Termino clave="anomalia">σ</Termino>`; en markdown, `[σ](glosario:anomalia)`. Claves disponibles en `src/lib/glosario.ts` (iv, anomalia, percentil-presion, canal-endemico, probable, confirmado, semana-epidemiologica, bandas, integridad, entre otras). Si falta un término que la ficha usa varias veces (por ejemplo «mediana»), añadirlo al glosario con una definición breve y un enlace a la sección correspondiente.
- Las cifras con coma decimal: `formatearNumero(valor, decimales)` de `src/lib/idoneidad.ts`.
- Los datos de ejemplo se rotulan como ejemplo. Nunca presentar un valor inventado como medición.

## 5. Lo que ya existe y se reutiliza

Ficha de M1, de la que se copia la estructura:

| Archivo | Papel |
|---|---|
| `src/components/FichaEnriquecida.astro` | Plantilla: cabecera con título, subtítulo y etiquetas, hilo vertical con scroll, pie con enlace a la documentación |
| `src/components/PasoFicha.astro` | Un paso: número, título, texto y slot `visual` |
| `src/fichas/FichaM1.astro` | Contenido de la ficha de M1 (seis pasos) |
| `src/fichas/registro.ts` | Metadatos de las fichas (`FICHAS`), `rutaFicha(slug)` |
| `src/pages/biblioteca/fichas/[slug].astro` | Ruta; el mapa `CONTENIDO` enlaza cada slug con su componente y el build falla si falta |
| `src/components/LaboratorioIv.astro` y `src/lib/laboratorio-iv-cliente.ts` | Laboratorio de M1: controles, curvas, mapa de un solo departamento, recorrido paso a paso, petición real con esqueleto |
| `src/components/MapaDepartamentoIv.astro` y `src/lib/geo-svg.ts` | País en contorno con un departamento relleno; `proyectarDepartamentos` proyecta `public/geo/slv-adm1.geojson` |
| `src/lib/curvas-iv.ts` y `src/lib/curvas-iv-config.ts` | SVG de curvas con marcador y su configuración |
| `src/lib/idoneidad.ts` y `tests/unit/idoneidad.test.ts` | Port del Python del backend con 240 casos de referencia |
| `tests/e2e/ficha-m1.spec.ts` | E2E de la ficha: estructura, axe, término con teclado, laboratorio, recorrido, animaciones apagadas, API caída, móvil, redirect de `/biblioteca/fichas` |
| `src/lib/terminos.ts`, `terminos-cliente.ts`, `Termino.astro` | Convención de términos con nota emergente |

Datos y constantes:

- `obtenerSerieIdoneidad(codigo, anio)` devuelve `semanas[{ semana_epi, iv_real, p25_baseline, mediana_baseline, p75_baseline, anomaly_sigma }]` (endpoint `GET /api/v1/temporal/{codigo}?anio=`). Es la fuente de M2.
- `obtenerSeriePresion(codigo, anio)` devuelve `semanas[{ semana_epi, probable, confirmado }]` con `PresionAnalitica` (`casos_observados`, `percentil`, `categoria`, `p50_baseline`, `p75_baseline`, `n_obs_baseline`, `anios_baseline`, `nota?`). Es la fuente de M3. Sus tipos están en `src/lib/tipos-analisis.ts`.
- `aniosClimaPresentacion()` (2018 hasta el año actual) para el clima; `ANIOS_ANALISIS_DENGUE` (2018, 2019, 2021, 2022, 2023) para casos. La serie departamental de casos de MINSAL termina en 2023.
- `DEPARTAMENTOS` y `obtenerDepartamento(codigo)` en `src/lib/departamentos.ts` (códigos tipo `SV-SS`).
- Rampas en `src/lib/colores.ts`. La de anomalía es una divergente azul, gris, naranja (`RAMPA_ANOMALIA`, hoy definida dentro de `MapaDepartamentos.astro`, líneas ~601 a 607) y la de presión es `['#e8f3ef', '#4fae95', '#0b3d33']` (`RAMPA_PRESION`, mismo archivo). Moverlas a `colores.ts` con una función `colorAnomalia(sigma)` y `colorPresion(percentil)` y que el mapa las importe de ahí, como se hizo con `RAMPA_IV` y `colorIv`.
- Plantillas de verdad: `docs/biblioteca/03-funciones.md` (secciones M2, M3 y Canal endémico) describe el método con el texto que ya está aprobado. Los pasos de las fichas lo explican con otras palabras, no lo contradicen.

## 6. Archivo de referencia para las pruebas

`tests/unit/fixtures/fichas-m2-m3-referencia.json` está generado con las funciones Python del backend (monorepo EPI-Aetheris, `backend/api/idoneidad.py` y `backend/api/presion.py`). Las bibliotecas TypeScript que se escriban deben coincidir con él, con tolerancia de 1e-9 en los números, igual que `idoneidad.test.ts` con el suyo. Estructura:

- `anomalia[]`: cada caso trae `pool` (valores de Iv de la misma semana en los otros años), `anio_excluido`, `semana`, `valor`, `mediana`, `desviacion` (nulas si el pool tiene menos de 3 observaciones), `sigma` (nulo si no hay línea base o la desviación es menor que 1e-9), `p25`, `p75` y, en 15 casos, `serie` (año a semana a Iv, solo las semanas cercanas) para probar la construcción del pool.
- `presion[]`: cada caso trae `serie` (año a semana a conteo, claves como texto), `anio`, `semana` y `resultado` con la salida completa de `calcular_presion`.
- `rangos[]`: casos de `rango_percentil` y `categorizar` con empates, bordes y pool de un solo valor.
- `constantes`: años base de M3, ventana, pisos.

Las claves de los diccionarios son cadenas en el JSON. Los pools de anomalía se calculan con el corpus de años 2014 a 2026.

No se puede ejecutar el Python desde esta sesión. Si se encuentra una diferencia entre el archivo y el documento de la Biblioteca, prevalece el archivo (es lo que calcula el backend) y se deja anotado en el PR.

## 7. Ficha de M2: anomalía climática continua

Metadatos para `registro.ts`:

- slug: `m2-anomalia-climatica`
- título: «Anomalía climática (M2)»
- subtítulo: «Cuánto se aparta la idoneidad de una semana de lo habitual en ese departamento.»
- etiquetas: «Módulo M2», «Variable derivada», «Clima», «Desviaciones estándar»
- documentación: `/biblioteca/03-funciones#m2-anomalía-climática-continua` con el texto «Ver documentación de M2»

Qué hay que contar (el método está en el documento de la Biblioteca; esto es el guion de pasos):

1. De dónde sale. La entrada es el Iv de M1 de un departamento, semana por semana. Remite a la ficha de M1 con un enlace. La línea base va de 2014 al año en curso, así que cada año nuevo cambia las referencias históricas.
2. Una semana contra los mismos años. Para describir la semana 20 de 2026 se juntan los Iv de la semana 20 de los otros años. La misma semana exacta, sin vecinas. El año descrito queda fuera del conjunto (visual: una tira de barras por año con el año descrito marcado y apartado). Si en el conjunto hay menos de 3 observaciones no se calcula nada y se dice así.
3. Lo habitual y su dispersión. Del conjunto salen la mediana (lo habitual) y la desviación estándar muestral, con n−1 (lo disperso). Visual: la línea de la mediana y una banda de una desviación sobre las barras, más los cuantiles P25 y P75 que usa la banda del gráfico del tablero.
4. La fórmula. σ = (Iv − mediana) / desviación. Se muestra con números del ejemplo. Si la desviación es prácticamente cero el valor queda sin dato. Se lee: 0 es una semana típica, +1 es una desviación por encima de lo habitual, −1 por debajo. Se expresa como serie continua, sin umbral ni alerta.
5. Del número al color. La rampa divergente de la capa de anomalía del mapa (azul, gris, naranja, sin rojo). Mapa de un solo departamento, relleno según σ en una escala fija de −3 a 3, con leyenda.
6. Pruébalo. Laboratorio de un solo departamento. Controles: el Iv del año descrito (0 a 1) y el Iv de seis a ocho años de referencia de la misma semana (campos numéricos o deslizadores, arrancan con el ejemplo y tienen presets: «Semana típica», «Semana inusual», «Poca historia»). Se recalculan al instante la mediana, la desviación, σ, la posición sobre la tira de barras y el color. El botón «Calcular paso a paso» recorre el método en orden (conjunto, mediana, desviación, división, color) como visualización de cómo se calcula, no como espera; con animaciones apagadas salta al resultado. Junto a la simulación, una petición real a `obtenerSerieIdoneidad` con el año más reciente que tenga dato y, con esqueleto «Consultando la serie de Iv de X…», muestra la última semana con `anomaly_sigma`, con la banda histórica P25 a P75. Estados de error y sin dato con `estado-async.ts`.

Datos de ejemplo para los pasos 2 a 5 (rotulados como ejemplo): semana 20; Iv de otros años (2014 a 2025) 0,52 0,61 0,58 0,66 0,49 0,63 0,57 0,70 0,55 0,60 0,64 0,59; Iv del año descrito 0,71. Calcular mediana, desviación y σ con la biblioteca, no a mano, y mostrar lo que salga.

Biblioteca TypeScript nueva: `src/lib/anomalia.ts` con `percentil(valores, p)` (interpolación lineal, como el Python), `calcularBaselineSemana(serie, anioExcluir, semana, corpus)` y `calcularSigma(valor, mediana, desviacion)`; `tests/unit/anomalia.test.ts` contra el archivo de referencia. Visuales en `src/lib/` como funciones puras con prueba (por ejemplo `tira-anios.ts`).

Aclaración que debe quedar dicha una vez en la ficha: M2 describe el clima de una semana frente a su historia; no emite alertas ni anticipa temporadas. Enlazar al aviso de sensibilidad.

## 8. Ficha de M3: presión epidemiológica relativa

Metadatos:

- slug: `m3-presion-epidemiologica`
- título: «Presión epidemiológica relativa (M3)»
- subtítulo: «Qué tan alta es la cifra de casos de una semana comparada con la historia del mismo departamento.»
- etiquetas: «Módulo M3», «Variable derivada», «Casos», «Percentil»
- documentación: `/biblioteca/03-funciones#m3-presión-epidemiológica-relativa` con el texto «Ver documentación de M3»

Guion:

1. De dónde sale. Casos de dengue por departamento y semana del MINSAL, series probable y confirmado por separado (nunca el total ni las dos sumadas). Remite a los términos del glosario `probable` y `confirmado`. La serie departamental llega hasta 2023; explicar por qué en una frase con enlace a la capa de integridad (M4) en la Biblioteca.
2. Una ventana y otros años. Años de referencia: 2018, 2019, 2021, 2022 y 2023 (2020 no entra). Para describir una semana se toman los casos de la semana y de la anterior y la posterior (ventana de ±1 semana, sin pasar de un año a otro) en los otros años; el año descrito queda fuera. Visual: la tira de años con la ventana de tres semanas por año.
3. Cuándo no se calcula. Hace falta al menos 3 de los 4 años de referencia con alguna observación en la ventana. Si no, el percentil queda vacío y se muestra la nota del sistema. Una semana sin observación en la fuente es un hueco, no un cero.
4. El percentil. Dónde cae la cifra observada dentro del conjunto, de 0 a 100: es la inversa de la interpolación lineal del percentil, los empates toman el punto medio del tramo empatado y lo que queda fuera del rango satura en 0 o en 100. Visual: los valores del conjunto ordenados sobre una recta y el valor observado como marca, con el percentil resultante. Mostrar un empate en un ejemplo corto.
5. Cortes y lectura. P50 y P75 del conjunto: hasta el P50 es «baja», entre el P50 y el P75 «media», por encima del P75 «alta»; si el valor es exactamente igual al corte cae hacia abajo. El color de la categoría sale de la rampa de presión del mapa.
6. Canal endémico. Los mismos cortes dibujados como tres bandas sobre las semanas del año con los casos observados encima (el panel «Canal endémico» del tablero). Visual: versión pequeña con datos de ejemplo, y enlace al panel real. Las semanas sin línea base suficiente quedan en blanco.
7. Pruébalo. Laboratorio de un solo departamento y una serie a la vez (selector probable o confirmado). Controles: los casos observados en la semana (deslizador) y presets («Semana baja», «Semana alta», «Sin historia suficiente»). Se recalculan percentil, P50, P75, categoría y color al instante. «Calcular paso a paso» recorre pool, ordenar, percentil, cortes, color (con las mismas reglas de animación que en M2). Petición real a `obtenerSeriePresion(codigo, 2023)` (o el último año con dato de `ANIOS_ANALISIS_DENGUE`) con esqueleto «Consultando la presión de X…», que muestra la última semana con percentil y categoría. Estados de error y sin dato con `estado-async.ts`.

Datos de ejemplo (rotulados como ejemplo): año descrito 2022, semana 30; ventana por año: 2018 → 12, 18, 25; 2019 → 40, 55, 61; 2021 → 3, 4, 6; 2023 → 20, 22, 35; casos observados 48. Calcular percentil y cortes con la biblioteca y mostrar lo que salga.

Biblioteca TypeScript nueva: `src/lib/presion.ts` con `semanasEnVentana`, `construirPool`, `rangoPercentil`, `categorizar` y `calcularPresion`, reutilizando el `percentil` de M2 si se puede sin importar entre hermanos (si no, mover `percentil` a un módulo `src/lib/estadistica.ts` que ambos reciben por parámetro o que se copia con una prueba que lo verifique); `tests/unit/presion.test.ts` contra el archivo de referencia, incluida la sección `rangos`.

Aclaración única: M3 compara lo ya ocurrido con los otros años del mismo departamento; no usa el clima ni emite alertas. Enlazar al aviso de sensibilidad.

## 9. Puntos de entrada y enlaces cruzados

Hacer, con la misma mecánica que M1:

- `src/fichas/registro.ts`: dos entradas nuevas. `[slug].astro`: añadir los dos componentes a `CONTENIDO`.
- `docs/biblioteca/03-funciones.md` (copia de este repo): una línea «ver la ficha enriquecida de M2» bajo el primer párrafo de M2, otra para M3 y otra en Canal endémico que apunte a la ficha de M3. No tocar la copia del monorepo; dejar en la descripción del PR la lista de líneas añadidas para que se repliquen allí.
- Mapa del tablero (`src/components/MapaDepartamentos.astro`): `enlaceLeyenda` en las capas de anomalía y de presión (ya existe el mecanismo para la de Iv). El título de la leyenda pasa a ser el enlace a la ficha.
- `src/components/DepartamentoClima.astro`: hoy enlaza a M1; añadir el enlace a M2 en la misma línea.
- `src/components/CanalEndemico.astro`: enlace a la ficha de M3.
- El índice de `/biblioteca` ya lista todo lo que esté en `FICHAS`; comprobar que las tres tarjetas se ven bien.
- Entre fichas: al final de cada una, un enlace a la anterior y a la siguiente (M1, M2, M3) si cabe sin recargar el pie.

El PR de sincronización al monorepo se genera solo al mergear en `main`. No hacer nada en el monorepo.

## 10. Pruebas y comprobaciones

Antes de marcar el PR como listo:

- `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm test:unit` y `pnpm build` sin errores.
- Unitarias: `anomalia.test.ts` y `presion.test.ts` contra el archivo de referencia; pruebas de los generadores SVG (el trazo, el marcador, los valores fuera de rango y el escape de etiquetas).
- E2E nuevos en `tests/e2e/ficha-m2.spec.ts` y `tests/e2e/ficha-m3.spec.ts`, con la misma batería que `ficha-m1.spec.ts`: estructura y enlace a la documentación, axe sin violaciones (con `emulateMedia({ reducedMotion: 'reduce' })` para que no capture pasos a medio aparecer), término con teclado, el laboratorio recalcula, el recorrido paso a paso termina dejando el resultado, animaciones apagadas saltan al resultado, API caída ofrece Reintentar y la simulación sigue, móvil de 375 px sin desplazamiento horizontal.
- Correr también `ficha-m1`, `biblioteca`, `glosario`, `tema-oscuro`, `analisis`, `departamento` y `movil` para comprobar que no se rompió nada.
- Comprobar a ojo con capturas de Playwright: claro, oscuro y móvil, y la impresión (`page.pdf` o `emulateMedia({ media: 'print' })`; la cabecera pierde el fondo y los pasos se ven completos).
- Rutas: `curl` a ambas fichas y a los enlaces nuevos devuelve 200; las anclas de `03-funciones` existen (los ids llevan tilde, por ejemplo `#m1-idoneidad-biofísica-iv`; confirmar los de M2 y M3 en la página construida).

## 11. Criterio de cierre

El PR está listo cuando:

1. Las dos fichas existen, se leen completas sin JavaScript y con animaciones apagadas, y cada visual tiene su alternativa en texto.
2. Las bibliotecas de cálculo coinciden con el archivo de referencia.
3. Los laboratorios funcionan con un solo departamento, con recorrido paso a paso y con la petición real, sin retrasos artificiales: lo único que espera es la petición real.
4. Todo lo de la sección 10 pasa.
5. La descripción del PR resume qué se hizo, lista las líneas añadidas a `03-funciones.md` para replicar en el monorepo y anota cualquier diferencia hallada entre el archivo de referencia y la Biblioteca.
