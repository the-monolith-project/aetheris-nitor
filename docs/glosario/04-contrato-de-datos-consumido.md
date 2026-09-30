# Rama 4 · Contrato de datos consumido

El vocabulario de lo que el sitio pide a la API y de cómo lo lee: los endpoints que consume, los campos de cada respuesta que el cliente espera, las convenciones que comparten todas (`aviso`, `disponible: false`, `null` frente a cero) y las reglas con que el cliente interpreta lo que recibe.

**Para quién es.** Para quien escribe o cambia un panel, una prueba o el backend y necesita saber qué forma tiene lo que llega, o para quien lee una respuesta de la API y quiere saber qué hace el sitio con cada campo.

**Cómo leer una entrada.** **Qué es** da la definición; **En el cliente** dice qué espera y qué hace el sitio (con el archivo donde ocurre); **Ojo** avisa de matices. Aquí solo se describe el **lado del cliente**: lo que el backend calcula y por qué está en la rama 5 y en la rama 6 del glosario de EPI-Aetheris. Los tipos viven en `src/lib/tipos-analisis.ts`, `src/lib/vista-alertas.ts` y `src/lib/ficha-departamental.ts`, y el cliente principal en `src/lib/analisis-api.ts`.

**Ramas vecinas.** Los paneles que dibujan estos datos, en [`01-vocabulario-de-la-interfaz.md`](01-vocabulario-de-la-interfaz.md); las herramientas del repositorio, en [`02-sitio-estatico-y-herramientas.md`](02-sitio-estatico-y-herramientas.md).

<!-- INDICE:INICIO -->

## Índice alfabético (50 entradas)

- **A** — [Actividad de red (epi:actividad-red, epi:datos-cargados)](#actividad-de-red-epiactividad-red-epidatos-cargados) · [Alcance de una alerta](#alcance-de-una-alerta) · [AlertaPublica y PayloadAlertas](#alertapublica-y-payloadalertas) · [Años del análisis de dengue (ANIOS_ANALISIS_DENGUE)](#años-del-análisis-de-dengue-anios_analisis_dengue) · [API_BASE y PUBLIC_API_URL](#api_base-y-public_api_url)
- **C** — [Cachés de promesas por recurso](#cachés-de-promesas-por-recurso) · [Campo aviso](#campo-aviso) · [CasoNacionalSemanal](#casonacionalsemanal) · [Categoría baja, media, alta](#categoría-baja-media-alta) · [Código de departamento (SV-XX)](#código-de-departamento-sv-xx) · [Construcción del canal endémico](#construcción-del-canal-endémico)
- **D** — [_desde_cache](#_desde_cache) · [DesempenoNowcast](#desempenonowcast)
- **E** — [Endpoints citados pero no consumidos](#endpoints-citados-pero-no-consumidos) · [EstimacionHorizonte](#estimacionhorizonte) · [Exportación CSV del análisis](#exportación-csv-del-análisis)
- **G** — [GET /api/alertas](#get-apialertas) · [GET /api/alertas/feed.xml](#get-apialertasfeedxml) · [GET /api/casos-nacional](#get-apicasos-nacional) · [GET /api/ira/departamental y GET /api/neumonias/departamental](#get-apiiradepartamental-y-get-apineumoniasdepartamental) · [GET /api/ira/nacional y GET /api/neumonias/nacional](#get-apiiranacional-y-get-apineumoniasnacional) · [GET /api/ira/temporal/{codigo} y GET /api/neumonias/temporal/{codigo}](#get-apiiratemporalcodigo-y-get-apineumoniastemporalcodigo) · [GET /api/neumonias/heatmap/{anio}](#get-apineumoniasheatmapanio) · [GET /api/nowcast-dengue](#get-apinowcast-dengue) · [GET /api/nowcast-dengue/retrospectivo](#get-apinowcast-dengueretrospectivo) · [GET /api/respiratorios/cobertura](#get-apirespiratorioscobertura) · [GET /api/respiratorios/temporal](#get-apirespiratoriostemporal) · [GET /api/respiratorios/virus](#get-apirespiratoriosvirus) · [GET /api/riesgo-nacional](#get-apiriesgo-nacional) · [GET /api/v1/analisis/dengue](#get-apiv1analisisdengue) · [GET /api/v1/analisis/dengue/procedencia](#get-apiv1analisisdengueprocedencia) · [GET /api/v1/presion/temporal/{codigo}](#get-apiv1presiontemporalcodigo) · [GET /api/v1/spatial/current](#get-apiv1spatialcurrent) · [GET /api/v1/temporal/{codigo}](#get-apiv1temporalcodigo) · [GET /api/v1/vigilancia/integridad](#get-apiv1vigilanciaintegridad) · [GET /health](#get-health)
- **I** — [IntegridadVigilancia, AntiguedadSerie y CompletitudAnual](#integridadvigilancia-antiguedadserie-y-completitudanual)
- **N** — [NowcastDengue](#nowcastdengue) · [NowcastDengueRetrospectivo (formato compacto)](#nowcastdengueretrospectivo-formato-compacto) · [null frente a cero](#null-frente-a-cero)
- **P** — [POST /api/alertas](#post-apialertas) · [PresionAnalitica](#presionanalitica) · [PruebaNowcast](#pruebanowcast)
- **R** — [Respuesta disponible: false](#respuesta-disponible-false)
- **S** — [Semana y año en las respuestas](#semana-y-año-en-las-respuestas) · [SemanaAnalitica y DatasetAnaliticoDengue](#semanaanalitica-y-datasetanaliticodengue)
- **T** — [Texto accionable de una alerta](#texto-accionable-de-una-alerta)
- **U** — [Última semana comparable](#última-semana-comparable)
- **V** — [Validación mínima del contrato](#validación-mínima-del-contrato) · [Vigencia de una alerta](#vigencia-de-una-alerta)

<!-- INDICE:FIN -->

## 1. Convenciones del contrato

### `API_BASE` y `PUBLIC_API_URL`

**Qué es.** La dirección base de la API.

**En el cliente.** Cada módulo la lee como `import.meta.env.PUBLIC_API_URL ?? 'http://localhost:8000'` y la antepone a la ruta (`${API_BASE}/api/...`). Como el sitio es estático, el valor se fija en el *build*.

**Detalle.** En la rama 2: «`PUBLIC_API_URL`».

### Respuesta `disponible: false`

**Qué es.** Una respuesta con estado HTTP 200 y cuerpo `{ "disponible": false, "motivo": "..." }`.

**En el cliente.** Significa «la fuente respondió, pero el recurso no está generado o la tabla no está cargada»; no es un error de red. El tipo es `RespuestaNoDisponible`, la función `esNoDisponible(datos)` lo reconoce y `motivoNoDisponible(datos)` devuelve el `motivo` o, si falta, «Los datos no están disponibles en este despliegue.». Todos los clientes lo comprueban antes de leer el resto del cuerpo, y el panel muestra el motivo en un estado neutro, sin botón «Reintentar».

**Ojo.** Es el contrato que hace que el sitio se degrade sin romperse cuando un artefacto del backend no está generado (por ejemplo, el nowcast o el clasificador retirado).

**Detalle.** `src/components/estado-async.ts`. En el glosario de EPI-Aetheris: rama 6, «Contrato `disponible: false`».

### Campo `aviso`

**Qué es.** Un texto que la propia API incluye en la respuesta para acompañar los números con su advertencia.

**En el cliente.** Casi todas las respuestas analíticas traen un `aviso` (o `avisos` con claves `idoneidad` y `presion` en el dataset de dengue) y el sitio lo muestra junto al gráfico o en la leyenda de la capa. Es la vía por la que los deslindes del backend llegan a la pantalla.

**Detalle.** En el glosario de EPI-Aetheris: rama 6, «`aviso`».

### `null` frente a cero

**Qué es.** La regla de que la ausencia de dato se representa con `null` y nunca con `0`.

**En el cliente.** Los tipos declaran `number | null` en casos, percentiles, límites de línea base e `Iv`. Un `null` se dibuja como hueco (la línea se corta, la celda queda gris) y no se interpola; un `0` es una observación real. Una semana que la fuente no publicó, como la 53 de 2025 en el tablero, directamente no trae fila o trae `casos: null`.

**Ojo.** Es el mismo principio de «hueco frente a cero» del glosario de EPI-Aetheris (rama 1), aplicado a cada gráfico.

### Código de departamento (`SV-XX`)

**Qué es.** El código ISO 3166-2 de El Salvador que identifica cada departamento.

**En el cliente.** Catorce códigos, de `SV-AH` (Ahuachapán) a `SV-US` (Usulután), en `src/lib/departamentos.ts`. Se usan como clave en las respuestas (`codigo`, `departamento_codigo`), en las rutas dinámicas (`/departamento/[codigo]`) y en la dirección (`dept`, `compare`). El mapa los une con el GeoJSON por igualdad estricta sobre `properties.codigo`.

**Detalle.** En el glosario de EPI-Aetheris: rama 1, «Código ISO 3166-2:SV».

### Semana y año en las respuestas

**Qué es.** Los campos que ubican un dato en el calendario epidemiológico.

**En el cliente.** `anio` y `semana_epi` (1 a 53) identifican la semana MMWR; `semana_inicio` es la fecha ISO del primer día de esa semana (un domingo). En las series nacionales, `fecha` cumple la misma función. Un año con semana 53 tiene una fila más.

### Validación mínima del contrato

**Qué es.** Una comprobación que el cliente hace sobre la forma de la respuesta antes de usarla.

**En el cliente.** Por ejemplo, el dataset analítico se rechaza con «El dataset analítico no tiene el contrato esperado.» si no trae un arreglo `departamentos`, y las alertas se rechazan si `alertas` no es un arreglo. La validación es de forma, no de valores: no verifica rangos.

### Cachés de promesas por recurso

**Qué es.** Guardar la promesa de una petición, no solo su resultado, para que varias piezas que la piden a la vez compartan un único envío.

**En el cliente.** `analisis-api.ts` mantiene un `Map` o una variable por recurso (dataset por año, casos nacionales, IRA departamental, integridad, nowcast, procedencia por clave, series temporales por departamento y año). Si una petición falla, se borra de la caché para que el reintento vuelva a pedirla.

**Ojo.** Estas cachés viven en la memoria de la pestaña; no son la caché del service worker ni persisten entre visitas.

### Actividad de red (`epi:actividad-red`, `epi:datos-cargados`)

**Qué es.** Eventos del navegador (`CustomEvent`) que anuncian que la interfaz está esperando datos o que llegaron.

**En el cliente.** `registrarPeticion` cuenta las peticiones en vuelo y, cada vez que el conteo cambia, emite `epi:actividad-red` con `{ enVuelo, conteo }`; la barra de actividad de la barra de herramientas del análisis se enciende con él. Al cargar el dataset analítico se emite `epi:datos-cargados`, que el panel de análisis escucha una sola vez para orquestar la aparición escalonada de los paneles (con un respaldo a los 600 ms si el evento no llega).

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Eventos `epi:*`».

### Años del análisis de dengue (`ANIOS_ANALISIS_DENGUE`)

**Qué es.** Los años para los que existe dataset analítico de dengue por departamento.

**En el cliente.** `[2018, 2019, 2021, 2022, 2023]`: los años con boletines departamentales (2020 no entra). `aniosClimaPresentacion()` genera la lista de años del selector, desde 2018 hasta el año en curso, porque el clima sí cubre años posteriores; para esos años sin casos, `notaAnioSoloClima` explica: idoneidad y anomalía cubren el año, pero la presión epidemiológica se detiene en 2023.

## 2. Endpoints consumidos

### `GET /health`

**Qué es.** Comprobación de salud de la API.

**En el cliente.** La página `/estado` lo llama y muestra una etiqueta «Disponible» (con el código y los milisegundos de latencia), «Error <código>» o «Sin conexión»; ante un fallo ofrece «Reintentar verificación» y avisa de que, si el servicio lleva un rato inactivo, puede tardar hasta un minuto en arrancar.

### `GET /api/casos-nacional`

**Qué es.** La serie nacional semanal de dengue.

**En el cliente.** Devuelve un arreglo de `CasoNacionalSemanal`: `semana_inicio`, `anio`, `semana_epi`, `conteo` y `fuente` (`opendengue_v1_3` hasta 2024, `minsal_tablero` desde 2025). Alimenta la curva epidémica nacional, el resumen histórico y la tarjeta «Última semana publicada».

**Ojo.** `fuente` distingue dos series de definición y suavizado distintos: el cliente solo compara tablero contra tablero.

### `GET /api/v1/analisis/dengue`

**Qué es.** El dataset analítico anual de dengue por departamento.

**En el cliente.** Se pide con `?year=<año>` y devuelve `DatasetAnaliticoDengue`: `anio`, `anios_disponibles`, `series`, `departamentos[]` (cada uno con sus `semanas[]`) y `avisos`. Es la fuente de casi todos los paneles del workspace, del mapa de presión, del canal endémico y de la exportación CSV.

### `GET /api/v1/analisis/dengue/procedencia`

**Qué es.** La procedencia de una observación concreta.

**En el cliente.** Se pide con `year`, `week`, `serie` y `dept` (los cuatro obligatorios; sin departamento, el cliente rechaza la petición). Devuelve `ProcedenciaAnalitica` con `disponible`, `conteo_observado` y `registros[]`, cada uno con `conteo`, `fecha_ingesta`, `fuente` (`codigo`, `nombre`, `url_referencia`) y `boletin` (`anio`, `semana_archivo`, `nombre_archivo`, `url_origen`, `estado_extraccion`, `validacion_cuadra`, `fecha_procesado`). Alimenta el panel «Perfil de calidad».

### `GET /api/v1/spatial/current`

**Qué es.** Los valores espaciales de M1 y M2 para una semana.

**En el cliente.** Se pide con `week` y `year` y devuelve `departamentos[]` con `codigo`, `iv` y `anomaly_sigma`. Lo usa el mapa para las capas de idoneidad biofísica y de anomalía climática, incluso para años sin dengue departamental. Un valor no numérico se trata como «sin dato».

### `GET /api/v1/temporal/{codigo}`

**Qué es.** La serie semanal de M1 y M2 de un departamento en un año.

**En el cliente.** Se pide con `?anio=`. Devuelve `SerieTemporalIdoneidad`: `departamento_codigo`, `departamento_nombre`, `anio`, `semanas[]` (con `semana_epi`, `iv_real`, `p25_baseline`, `mediana_baseline`, `p75_baseline` y `anomaly_sigma`) y `aviso`. Lo usan el panel «Serie del departamento», la curva de detalle del mapa y las fichas.

### `GET /api/v1/presion/temporal/{codigo}`

**Qué es.** La serie semanal de M3 de un departamento en un año.

**En el cliente.** Se pide con `?anio=`. Devuelve `SerieTemporalPresion`: por semana, `probable` y `confirmado` con la forma `PresionAnalitica`, más `aviso`.

### `GET /api/v1/vigilancia/integridad`

**Qué es.** Los datos de M4.

**En el cliente.** Sin parámetros devuelve el resumen: `antiguedad` (por clave de serie) y `resumen_anual`. Con `week` y `year` devuelve la vista semanal que usa la capa «Integridad de la vigilancia»: `completitud` (por serie, con `departamentos[]` y su `presente`) y `cuadre` (con `cuadra`). El tipo `IntegridadVigilancia` describe la primera forma.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «M4: integridad de la vigilancia».

### `GET /api/nowcast-dengue`

**Qué es.** La predicción a corto plazo del conteo nacional de dengue, precalculada.

**En el cliente.** Devuelve `NowcastDengue` (ver la sección 3). Lo usan el panel de predicción y la tarjeta «Semana siguiente» de la última semana.

### `GET /api/nowcast-dengue/retrospectivo`

**Qué es.** La predicción retrospectiva: lo que el modelo habría predicho desde cada semana pasada.

**En el cliente.** Devuelve `NowcastDengueRetrospectivo` en formato compacto (ver la sección 3). Alimenta «Contrastar la predicción con lo observado».

### `GET /api/riesgo-nacional`

**Qué es.** La evaluación del clasificador de riesgo retirado.

**En el cliente.** Lo pide solo `MetricasModelo.astro`, para mostrar su evaluación histórica. Puede responder `disponible: false` cuando los artefactos del modelo no están generados en el despliegue.

**Ojo.** El endpoint y el modelo se conservan «sin cambios como referencia»; nada de lo demás depende de él.

### `GET /api/ira/departamental` y `GET /api/neumonias/departamental`

**Qué es.** El resumen departamental de IRA y de neumonías notificadas.

**En el cliente.** Devuelve `RespuestaIraDepartamental`: `departamentos[]` (con `nombre`, `codigo`, `notificado_total`, `semanas_con_dato`, `primer_anio` y `ultimo_anio`) y `aviso`. Colorea los mapas de IRA y de neumonías. El cliente lo pide una sola vez y lo comparte entre los componentes.

### `GET /api/ira/temporal/{codigo}` y `GET /api/neumonias/temporal/{codigo}`

**Qué es.** Las series semanales por año de un departamento.

**En el cliente.** Devuelven `RespuestaSerieRespiratoria`: `anios[]` y `series`, un objeto de año a lista de pares `[semana, valor]`. Lo usan las curvas departamentales y las fichas.

### `GET /api/ira/nacional` y `GET /api/neumonias/nacional`

**Qué es.** La serie nacional del tablero de MINSAL desde 2025.

**En el cliente.** `analisis-api.ts` compone la ruta como `/api/${evento}/nacional` con `evento` igual a `ira` o `neumonias`. Devuelve `SerieRespiratoriaNacional`: `disponible: true`, `evento`, `fuente: 'minsal_tablero'`, `unidad: 'conteo_notificado'`, `semanas[]` (con `semana_inicio`, `anio`, `semana_epi` y `conteo`) y `aviso`; o `disponible: false`. Las semanas que el tablero no publicó no traen fila.

### `GET /api/neumonias/heatmap/{anio}`

**Qué es.** La matriz de neumonías por departamento y semana de un año.

**En el cliente.** Devuelve `departamentos[]`, cada uno con `semanas`, un objeto de número de semana (como texto) a valor. La celda ausente es un hueco, nunca un cero.

### `GET /api/respiratorios/virus`

**Qué es.** El catálogo de series de vigilancia laboratorial de virus.

**En el cliente.** Devuelve `series[]` con `virus`, `metrica` y `unidad`, más un `aviso`. El panel de virus lo usa para saber qué combinaciones de virus y métrica existen.

### `GET /api/respiratorios/temporal`

**Qué es.** Una serie de virus por año y semana.

**En el cliente.** Se pide con `virus` y `metrica` (`detecciones`, `positividad`, `muestras_analizadas` o `muestras_positivas`). Devuelve `anios[]` y `series`. Si la métrica es global, se pide con `virus=todos`.

### `GET /api/respiratorios/cobertura`

**Qué es.** El resumen de cobertura y calidad de las series respiratorias.

**En el cliente.** Devuelve `aviso`, `procedencia` y tres bloques (`ira`, `neumonias`, `virus`), cada uno con `semanas_con_dato_por_anio`, `filas_cargadas` y `notas` (por ejemplo `tablas_imagen`, `ausencia_vacacion`, `correcciones_negativas_excluidas`, `reimpresiones`, `covid_19_solo_en`, `anio_2020_descargado`). Alimenta el panel «Cobertura y calidad de la fuente».

### `GET /api/alertas`

**Qué es.** Las alertas de campo.

**En el cliente.** Sin parámetros devuelve las activas y sin etiqueta: `PayloadAlertas` con `aviso`, `ultima_revision` y `alertas[]`. Acepta `tipo` (`dengue` o `respiratorio`). El archivo pide además `incluir_inactivas=true` y, opcionalmente, `desde` y `hasta`. El service worker marca lo servido desde su caché con `_desde_cache: true` en el cuerpo.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Contrato de respuesta de alertas».

### `POST /api/alertas`

**Qué es.** La publicación de una alerta.

**En el cliente.** Solo la envía el formulario de operadores: cabecera `Authorization: Bearer <token>`, cuerpo JSON. Si responde bien, el formulario muestra «Alerta creada (id N).» y redirige a `/alertas#alerta-N`.

### `GET /api/alertas/feed.xml`

**Qué es.** El feed Atom de las alertas.

**En el cliente.** La página de alertas lo enlaza como «Suscribirse por feed (Atom)»; no lo lee ningún script.

### Endpoints citados pero no consumidos

**Qué es.** Rutas que aparecen en comentarios del código, pero que el cliente no llama.

**En el cliente.** `GET /api/v1/presion/current` se menciona en `MapaDepartamentos.astro`, pero las capas de presión del mapa se arman con la semana activa del dataset analítico (`/api/v1/analisis/dengue`), no con ese endpoint. Un comentario de `alertas/index.astro` cita también `web/public/sw.js`, una ruta del monorepo que aquí es `public/sw.js`.

## 3. Formas de las respuestas

### `PresionAnalitica`

**Qué es.** La medida de presión epidemiológica relativa (M3) de un departamento, una semana y una serie.

**En el cliente.** `casos_observados`, `percentil` (0 a 100), `categoria` (`baja`, `media`, `alta` o `null`), `p50_baseline`, `p75_baseline`, `n_obs_baseline` (observaciones de la línea base), `anios_baseline` (años que aportan) y una `nota` opcional cuando no se puede calcular. Si la línea base es insuficiente o falta la observación, `percentil` y `categoria` van en `null`.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Insuficiente y sin observación».

### `SemanaAnalitica` y `DatasetAnaliticoDengue`

**Qué es.** La unidad y el conjunto del dataset analítico de dengue.

**En el cliente.** `SemanaAnalitica`: `semana_epi`, `probable`, `confirmado` (conteos o `null`), `iv`, `anomaly_sigma`, `presion_probable`, `presion_confirmado` (cada una una `PresionAnalitica`) y `nota_clima` opcional. `DatasetAnaliticoDengue`: `anio`, `anios_disponibles`, `series`, `departamentos` (cada uno con `codigo`, `nombre` y `semanas`) y `avisos` (`idoneidad` y `presion`).

### `EstimacionHorizonte`

**Qué es.** Una fila de la predicción del nowcast: un horizonte de 1 a 8 semanas.

**En el cliente.** `h`, `fecha`, `anio`, `semana`, `cuantiles` (23 valores), `mediana`, `banda_50` y `banda_95` (pares `[inferior, superior]`).

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «Cuantil y 23 cuantiles» y «Rango del 50 % y del 95 %».

### `NowcastDengue`

**Qué es.** La respuesta completa de la predicción precalculada.

**En el cliente.** `disponible`, `motivo`, `aviso`, `generado`, `fuente_serie`, `metodo`, `alcance_historia_desde`, `ancla` (`fecha`, `anio`, `semana`, `casos`), `horizontes`, `observado` (puntos con `fecha` y `casos`, `null` en una semana no publicada), `estimacion` (arreglo de `EstimacionHorizonte`), `backtest` (`horizonte`, `anios`, `puntos` con `observado`, `mediana` y bandas), `desempeno`, `prueba` y `nota_alcance`.

**Ojo.** Todos los campos, salvo `disponible` y `aviso`, son opcionales: el panel decide por lo que llegue, y muestra «La predicción no está disponible todavía.» si falta la estimación o el desempeño.

### `DesempenoNowcast`

**Qué es.** Las métricas con que se mide el método, a un horizonte dado.

**En el cliente.** `horizonte`, `baseline` (nombre de la referencia), `wis_modelo`, `wis_baseline`, `reduccion_wis`, `skill_medio_por_anio`, `skill_por_anio`, `anios_ganados`, `n_anios`, `cobertura_50`, `cobertura_95` y `dentro_de_muestra`.

**Ojo.** `dentro_de_muestra: true` significa que los años del desempeño se usaron para elegir el método; el panel entonces cambia la redacción de sus títulos y evita la palabra «Validación».

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «WIS (Weighted Interval Score)», «Skill relativo», «Años ganados» y «Cobertura empírica y nominal».

### `PruebaNowcast`

**Qué es.** La prueba prospectiva del método.

**En el cliente.** `inicio` (`fecha`, `anio`, `semana`), `semanas`, `horizontes_decisivos` y `referencia`.

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «Prueba prospectiva».

### `NowcastDengueRetrospectivo` (formato compacto)

**Qué es.** El abanico h = 1 a 8 que el modelo habría dado desde cada semana de la serie, usando solo los datos hasta esa semana.

**En el cliente.** Para ahorrar tamaño, los valores de cada horizonte van **por posición**, en el orden que declara `campos_horizonte`: `[mediana, banda_50 inferior, banda_50 superior, banda_95 inferior, banda_95 superior, wis_modelo, wis_referencia]` (`ValoresHorizonteRetro`). Cada origen (`OrigenRetro`) trae `fecha`, `anio`, `semana` y `h`, o un `motivo` que explica por qué no hay predicción: `historia_insuficiente` o `hueco_en_serie` (a las 8 semanas previas les falta una sin publicar). También incluye `observado` (pares `[fecha, casos]`), `resumen_por_anio`, `primera_semana_con_prediccion`, `anio_excluido` y `aviso_anio_excluido`, y un bloque `tablero` que marca desde qué semana el método es la mezcla.

### `CasoNacionalSemanal`

**Qué es.** Una fila de la serie nacional semanal de dengue.

**En el cliente.** `semana_inicio`, `anio`, `semana_epi`, `conteo` y `fuente` opcional. El comentario del tipo lo resume: «Total de OpenDengue hasta 2024; sospechosos del tablero desde 2025.»

### `IntegridadVigilancia`, `AntiguedadSerie` y `CompletitudAnual`

**Qué es.** Las formas de la respuesta resumen de M4.

**En el cliente.** `IntegridadVigilancia`: `aviso`, `antiguedad` (un `AntiguedadSerie` por clave de serie: `ultima_anio`, `ultima_semana_epi` y `semanas` de rezago) y `resumen_anual` (por año, `probable` y `confirmado`, cada uno un `CompletitudAnual` con `semanas_completas`, `semanas_con_dato` y `semanas_nominales`).

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Completitud», «Antigüedad (M4)» y «Semanas nominales» (rama 1).

### `AlertaPublica` y `PayloadAlertas`

**Qué es.** Las formas de una alerta y de la respuesta que las lista.

**En el cliente.** `AlertaPublica`: `id`, `tipo`, `nivel`, `titulo`, `contexto`, `indicaciones`, `fuente`, `autor`, `vigente_desde`, `vigente_hasta` (`null` si no tiene cierre), `activa`, `etiqueta`, `departamentos` (`null` o ausente: alerta nacional; lista de códigos `SV-XX`: regional) y los cinco campos clínicos opcionales (`definicion_caso`, `signos_alarma`, `criterios_referencia`, `que_notificar`, `contacto_vigilancia`). `PayloadAlertas`: `aviso`, `ultima_revision` y `alertas`.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Alerta de campo» y «Alcance territorial (`departamentos`)».

### `_desde_cache`

**Qué es.** Un campo que agrega el service worker al cuerpo JSON de las alertas cuando las sirve de su caché.

**En el cliente.** Si es `true`, la página de alertas marca la respuesta como una copia y muestra la fecha del sello de frescura. El backend nunca emite este campo. Va en el cuerpo y no en una cabecera porque la API es de otro origen y el navegador filtra por CORS las cabeceras propias.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «`_desde_cache` y `X-EPI-Cache`».

## 4. Reglas con que el cliente lee los datos

### Categoría `baja`, `media`, `alta`

**Qué es.** La lectura de un percentil de presión frente a los cortes de la línea base.

**En el cliente.** `categoriaCanal` (`src/lib/canal-endemico.ts`) devuelve `baja` si lo observado es menor o igual al P50, `media` si es menor o igual al P75 y `alta` si lo supera; devuelve `null` si falta lo observado o alguno de los cortes. Una semana sin línea base suficiente no se interpola.

### Construcción del canal endémico

**Qué es.** El paso de las semanas de M3 a las bandas del panel «Canal endémico».

**En el cliente.** `construirCanal` ordena las semanas por `semana_epi` y, para la serie elegida, produce puntos con `p50`, `p75` y `observado`. Si falta cualquiera de los dos cortes, ambos quedan en `null`.

### Vigencia de una alerta

**Qué es.** Cuándo se considera que una alerta está vigente.

**En el cliente.** `alertaEstaVigente` devuelve `false` si `activa` es falso; si no hay `vigente_hasta`, es vigente; si lo hay, es vigente hasta esa fecha inclusive, comparando la fecha UTC de hoy. El texto de la tarjeta es «Vigencia: <desde> – <hasta>» o «Vigencia: desde <fecha> (sin fecha de cierre)».

### Alcance de una alerta

**Qué es.** A qué departamentos aplica una alerta.

**En el cliente.** `alcance-alertas.ts`: una alerta es **nacional** si `departamentos` no existe o está vacío, y entonces aplica a todos; una regional aplica solo a los códigos que lista. El texto del alcance es «Nacional» o los nombres de los departamentos separados por comas.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Alcance territorial (`departamentos`)».

### Texto accionable de una alerta

**Qué es.** El formato mínimo con que se escriben las «Indicaciones» de una alerta.

**En el cliente.** `renderTextoAccionable` convierte cada línea que empieza con `- ` en un elemento de lista, cada otra línea no vacía en un párrafo y descarta las vacías; todo pasa por `escapeHtml`.

**Ojo.** Existen dos funciones `escapeHtml`: la de `src/utils/security.ts` (que también escapa la comilla simple) y la de `src/lib/vista-alertas.ts` (que no la escapa).

### Última semana comparable

**Qué es.** La regla con que se elige la semana de la tarjeta «Última semana publicada».

**En el cliente.** `resumirUltimaSemana` filtra la serie a `fuente === 'minsal_tablero'`, toma la semana más reciente y busca la misma semana del año anterior; calcula la diferencia y la variación porcentual solo si esa semana existe, y la variación solo si su conteo es mayor que cero.

### Exportación CSV del análisis

**Qué es.** El archivo que baja «Descargar vista».

**En el cliente.** `exportarAnalisisCsv` genera un CSV en UTF-8 con marca de orden de bytes, con las columnas `anio`, `semana_epi`, `departamento_codigo`, `departamento_nombre`, `serie`, `casos_observados`, `iv`, `anomalia_sigma`, `presion_percentil`, `presion_categoria`, `p50_baseline`, `p75_baseline`, `n_obs_baseline` y `anios_baseline`, filtrado por el rango de semanas, la serie y los departamentos elegidos. Las celdas `null` quedan vacías; los valores con comas, comillas o saltos de línea se entrecomillan. Devuelve el número de filas.

**Detalle.** [`01-vocabulario-de-la-interfaz.md`](01-vocabulario-de-la-interfaz.md#descargar-vista-y-copiar-enlace).
