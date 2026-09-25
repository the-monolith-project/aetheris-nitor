---
titulo: "Qué hace hoy"
descripcion: "Catálogo de módulos descriptivos (M1 a M4), mapa, observatorio respiratorio, alertas de campo, uso sin conexión y carga de datos."
orden: 3
categoria: "Cómo funciona"
---

Cada función se describe con lo que mide, los datos que usa y lo que deja fuera. Los módulos M1 a M3 se calculan al consultar la API, sin tabla propia en la base.

## M1. Idoneidad biofísica (`Iv`)

Mide qué tan favorable es el clima de un departamento en una semana para *Aedes aegypti*, en una escala continua de 0 a 1.

Datos: `temp_media` y `humedad_relativa_media` de ERA5-Land y `precipitation_sum` de ERA5, a través de Open-Meteo. Si falta alguna de las tres variables, la semana se omite; no se imputa.

Fórmulas, con las mismas constantes del experimento de anticipación:

- `f_T`, curva de Brière: `f_T(T) = c · T · (T − Tmin) · √(Tmax − T)` dentro de [16 °C, 38 °C], y 0 fuera. La constante `c` no viene publicada; se calcula numéricamente para que el máximo de `f_T` en ese intervalo sea 1 (`c ≈ 0,000795`).
- `f_R`, logística sobre la lluvia acumulada en dos semanas (la actual y la anterior, sin pasar de un año a otro): `f_R(R) = 1 / (1 + e^(−k·(R−R0)))`, con R0 = 30 mm y k = 0,1.
- `f_H`, rampa lineal propuesta por el equipo: `f_H(HR) = min(1, max(0, HR/50))`. El documento de partida pedía penalizar la humedad relativa por debajo del 50 % sin dar fórmula, y ni Mordecai et al. ni la tesis de la UES la especifican. Se eligió la forma más simple que cumple ese requisito.
- `Iv` = `f_T × (0,3 + 0,7·f_R) × f_H`.

Endpoints: `GET /api/v1/spatial/current` y `GET /api/v1/temporal/{codigo}`.

M1 no clasifica el riesgo de brote ni anticipa una temporada.

## M2. Anomalía climática continua

Mide qué tan inusual es el `Iv` de un departamento en una semana respecto de su propia historia climática.

Método: puntuación z de `Iv` por departamento y semana del año, calculada sin el año que se describe (leave-one-out). La línea base va de 2014 al año en curso (ADR 0018), así que cada año nuevo cambia las desviaciones históricas. Se compara la misma semana exacta, sin semanas vecinas. El reanálisis ERA5 llega con unos 5 días de retraso.

Se muestra como serie continua (`anomaly_sigma`). El experimento de anticipación usaba un umbral de Z ≥ 1,5 durante dos semanas seguidas; se retiró porque se cruzaba en todos los años evaluados y no distinguía unos de otros. M2 no emite alertas ni expone `lead_time_weeks`.

## M3. Presión epidemiológica relativa

Mide qué tan alta es la cifra de casos ya observados en un departamento en una semana, comparada con su propia historia.

| Elemento | Valor |
|---|---|
| Variable | `casos_epidemiologicos.conteo`, series `probable` y `confirmado` por separado (nunca `total` ni las dos sumadas) |
| Método | Percentil histórico sin el año descrito (leave-one-out) |
| Años base | 2018, 2019, 2021, 2022, 2023 (2020 no entra) |
| Ventana | ±1 semana, sin pasar de un año a otro |
| Mínimo | Al menos 3 de los 4 años de referencia con alguna observación en la ventana |
| Cortes | P50 y P75 |
| Lectura | Hasta P50, `baja`; entre P50 y P75, `media`; por encima de P75, `alta`; más el percentil de 0 a 100 |
| Sin datos suficientes | `percentil = null` y una nota; no se interpola |

La fórmula completa está en el [documento del módulo 3](https://github.com/the-monolith-project/EPI-Aetheris/blob/main/docs/modulos-descriptivos/modulo-3-presion-epidemiologica.md).

Endpoints: `GET /api/v1/presion/current` y `GET /api/v1/presion/temporal/{codigo}`.

M3 no usa el clima ni emite alertas. Un percentil alto compara lo ya ocurrido con los otros años del mismo departamento.

## M4. Integridad de la vigilancia

Da tres datos sobre la calidad de la información, por separado:

- Completitud geográfica: cuántos de los 14 departamentos tienen dato esa semana, y cuántas semanas de cada año están completas.
- Cuadre del boletín: si la suma de los departamentos coincide con el total nacional publicado en el mismo PDF, y por cuánto difiere cuando no.
- Antigüedad: semanas desde la última observación de cada serie (dengue MINSAL, OpenDengue, clima, IRA, neumonías, virus). Explica por qué la serie de dengue termina en 2023. No mide el retraso entre el caso y la publicación del boletín, porque esa fecha no está en la base.

Endpoint: `GET /api/v1/vigilancia/integridad`. En el mapa es la capa «Integridad de la vigilancia».

Un departamento sin color en esta capa es un departamento sin dato esa semana.

## Mapa departamental (dengue)

Muestra los 14 departamentos. Los datos se unen al mapa por el nombre normalizado, porque la fuente de límites trae vacío el código ISO 3166-2 (ADR 0002). La capa inicial son los casos semanales de MINSAL, probables o confirmados. El selector de capas añade M1, M2 y las dos series de M3.

El mapa no pinta niveles de riesgo por departamento.

## Observatorio respiratorio

Usa los mismos boletines de MINSAL, pero otras tablas. Está en `/respiratorio`, con IRA y neumonías como secciones de la página.

- Neumonías: conteo clínico por departamento, acumulado desde la semana 1, con `clasificacion = 'notificado'` y `tipos_evento = 'neumonia'`. No se mezcla con IRA.
- IRA: el mismo tipo de conteo notificado (ADR 0011), en serie acumulada y semanal, con 2.742 filas en la copia actual de la base.
- Vigilancia de laboratorio nacional (ADR 0012): muestras, detecciones y positividad de influenza, VSR y SARS-CoV-2, en la tabla `vigilancia_virus_respiratorios`. COVID-19 aparece como fila propia en 2023. No hay mapa por departamento de virus.
- Un panel de cobertura indica qué semanas y qué tablas hay.

Las fórmulas de M1 a M3 solo están definidas para dengue, así que esta sección no las usa.

## Alertas de campo

Las alertas las redacta y publica el equipo de vigilancia (ADR 0013 y 0015). Cada una tiene tipo (`dengue` o `respiratorio`), nivel (`informativo`, `atencion` o `intensificacion`), título, contexto, indicaciones, fuente, autor, vigencia, estado `activa` y una etiqueta opcional (`test`, `simulacro` o `historica`). La página pública `/alertas` lista solo las activas sin etiqueta, igual que `GET /api/alertas` por defecto.

Para publicar o editar se usan `POST /api/alertas` y `PATCH /api/alertas/{id}` con una clave definida en el servidor (`ALERTAS_TOKEN`, cabecera Bearer). No hay tabla de usuarios ni `DELETE`: una alerta se desactiva y pasa al archivo, en `/alertas/archivo`. El formulario `/alertas/nueva` no aparece en la navegación.

Los cinco campos clínicos (ADR 0014) se llenaron por tipo de alerta transcribiendo VIGEPES y OPS, con la fuente citada. Si la fuente no da un dato, el campo queda en `null`; en respiratorio pasa con los signos de alarma y los criterios de referencia. El sistema no rellena teléfonos ni correos.

Las alertas no se generan a partir de M1 a M3 ni del clasificador retirado.

## Uso sin conexión

El service worker está escrito a mano (`public/sw.js`), sin dependencias. La estructura del sitio se sirve desde la caché y se actualiza en segundo plano. `GET /api/alertas` va primero a la red, porque mostrar como vigente una alerta ya desactivada tendría consecuencias clínicas; la caché solo se usa sin conexión. Lo que viene de la caché lleva `_desde_cache: true` en el JSON y la página muestra la fecha de esa copia. El indicador va en el cuerpo y no en una cabecera porque la API está en otro dominio y CORS no deja leer cabeceras propias.

## Carga de datos

- Descarga de 264 PDF de boletines MINSAL (2018 a 2023, sin 2020), comprobando que cada archivo empiece por `%PDF`.
- Lectura de las tablas departamentales: hay dos formatos, que se distinguen en cada documento por la presencia de la columna de tasa y no por el año. Las cifras de probables y confirmados vienen acumuladas desde la semana 1 y se pasan a semanales restando. Los huecos y las correcciones retroactivas no se reparten entre semanas.
- Registro de cada boletín en `boletines_procesados` (ADR 0004 y 0007), con estado `ok`, `ausencia_esperada`, `sin_texto_extraible`, `revision_manual`, `error` o `pendiente`.
- Carga de la serie nacional de OpenDengue (`clasificacion = 'total'`, ADR 0005) y del clima de Open-Meteo (ERA5-Land y ERA5, ADR 0006).
- Semanas epidemiológicas de OPS/CDC (MMWR) con la librería `epiweeks`.

En esa fuente una celda vacía de MINSAL significa 0 y se carga así. Un hueco por vacaciones no se convierte en una cifra interpolada.
