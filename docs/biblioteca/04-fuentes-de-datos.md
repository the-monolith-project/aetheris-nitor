---
titulo: "De dónde salen los datos"
descripcion: "MINSAL, OpenDengue, Open-Meteo y NOAA ONI: años cubiertos, licencias, procedencia y cómo se citan en la base."
orden: 4
categoria: "Datos y método"
---

Cada conteo y cada variable de clima de EPI-Aetheris viene de una fuente pública y lleva su `fuente_id` en la base. Esta página resume de dónde sale cada serie, qué años cubre y con qué licencia se usa. Los problemas encontrados al cargar cada fuente están documentados en las [notas de fuentes del repositorio](https://github.com/the-monolith-project/EPI-Aetheris/blob/main/docs/contexto/03-fuentes-de-datos.md).

## Boletines epidemiológicos de MINSAL

PDF semanales publicados en `salud.gob.sv`, con VIGEPES como fuente citada. Cubren los 14 departamentos. Se cargaron 264 archivos de 2018 a 2023. 2020 no se descargó para la serie departamental por el subregistro durante la covid y por lo difícil de extraer sus tablas. Desde 2024 el panel `boletin.salud.gob.sv` bloquea las descargas automáticas (Cloudflare), así que no hay una fuente departamental que se pueda cargar sin intervención manual.

No todas las semanas tienen tabla departamental. Los boletines de Semana Santa, fiestas agostinas y fin de año no la publican, ni algunos de semanas normales (por ejemplo, la semana 18 de 2023). En promedio hay unas 49 semanas de 52 por año (48 en 2023). En 2018 y 2019 hay además semanas que MINSAL marca como «no elaboradas».

La tabla tiene dos formatos, y se reconoce cuál es en cada documento, no por el año:

- Formato A: columnas Probable, Confirmado y Tasa por 100.000.
- Formato B: Probable (semana actual) y Confirmado (semana anterior), sin tasa.

Las cifras de probables y confirmados vienen acumuladas desde la semana 1 y, en una misma fila, corresponden a semanas distintas. El sistema calcula las cifras semanales restando boletines consecutivos. Un hueco no se reparte entre semanas. Una diferencia negativa es una corrección retroactiva de MINSAL (hay 19, de −1 o −2 casos): se registra aparte y se excluye de la serie.

Otras reglas de la fuente, comprobadas al leer los PDF:

- El año impreso dentro del documento no es fiable; se toma del nombre del archivo y del índice.
- Una celda en blanco significa 0.
- La fila «Otros países» a veces entra en el total impreso y a veces no, así que la validación prueba las dos formas en cada boletín.
- Las versiones `_v2` a `_v4` son el mismo boletín republicado; se usa la más reciente (ADR 0004).

Los mismos PDF publican IRA, neumonías (conteo notificado por departamento) y la tabla nacional de vigilancia de laboratorio de influenza, VSR y SARS-CoV-2.

Licencia y uso: publicación oficial del Ministerio de Salud de El Salvador. El proyecto usa las cifras agregadas y no republica los PDF, que tampoco se guardan en el repositorio.

## OpenDengue

Extracto `Spatial_extract_V1_3.csv` de `opendengue.org` (unos 2,8 millones de filas), versión 1.3, distribuido en Figshare con DOI y licencia. Para El Salvador, la serie nacional es semanal desde 2013–2014; la departamental es mensual y solo cubre 2000 a 2009, por lo que no se usa.

El sistema carga 365 filas nacionales de 2018 a 2024 con `clasificacion = 'total'` (ADR 0005). En las 574 filas semanales nacionales, `case_definition_standardised` vale `'Total'`: OpenDengue no separa probables y confirmados a esta escala. Cargar ese total como `confirmado` lo mezclaría con los casos confirmados por laboratorio de MINSAL.

Cada fila se asigna a su semana epidemiológica comparando `calendar_start_date` con `semanas_epidemiologicas.fecha_inicio` (de domingo a sábado, criterio OPS/CDC).

La serie nacional incluye 2020, con una nota. La exclusión de 2020 solo afecta a la comparación departamental.

Las cifras no coinciden exactamente con el total de MINSAL (2018: 8.448 frente a 8.443 del boletín de la semana 52; 2022: 16.542 frente a 16.529). La diferencia se deja como está porque las dos fuentes no usan la misma definición de caso.

## Open-Meteo

API gratuita de datos históricos (`archive-api.open-meteo.com`). Se descartó instalarla en un servidor propio: no hay una forma documentada de recortar la grilla mundial y el volumen (decenas o cientos de GB) supera el equipo del proyecto.

Cada variable sale de un modelo fijo (ADR 0006):

| Variables | Modelo | Resolución |
|---|---|---|
| Temperatura máxima, mínima y media, humedad relativa media, punto de rocío | `era5_land` | 0,1° (unos 11 km); una celda distinta por departamento |
| Lluvia acumulada y horas de lluvia | `era5` | 0,25°; 13 celdas para 14 departamentos (La Libertad y San Salvador comparten una) |

Open-Meteo no ofrece precipitación con `era5_land`. No se usan `best_match` ni `era5_seamless` porque combinan modelos sin indicar cuál produjo cada valor.

Los datos diarios se pasan a semanales con la media en las variables de estado y la suma en las de lluvia, usando la zona horaria `America/El_Salvador`. Las coordenadas son un punto representativo de cada departamento (ADR 0003), no el centro de la celda que devuelve la API.

Los términos de Open-Meteo permiten el uso no comercial en investigación pública y contenido educativo. El proyecto es de una institución educativa pública, para una feria técnica, sin publicidad ni suscripciones.

Filas cargadas: 35.868 (7 variables, 14 departamentos, de 2018 a 2024, con 2020). La carga respeta el límite de consultas por minuto de la API y reintenta con espera cuando recibe un `429`.

## NOAA ONI

Índice Oceánico de El Niño (ONI) del Climate Prediction Center de NOAA, publicado como [archivo de texto](https://www.cpc.ncep.noaa.gov/data/indices/oni.ascii.txt). Serie mensual desde 1950 (ADR 0008).

Se guarda la anomalía (`oni_anom`) con la región nacional `SV`. El valor de cada mes se asigna a las semanas epidemiológicas que empiezan en ese mes; como es un índice y no un conteo, no se divide.

Se probó como variable del clasificador retirado y no mejoró sus resultados. Se mantiene como contexto climático.

## Cómo se citan en la base

`fuentes_datos.codigo` usa estas cadenas: `opendengue_v1_3`, `minsal_pdf`, `open_meteo_era5_land`, `open_meteo_era5`, `noaa_oni`. `variables_ambientales.variable` es texto libre sin restricción, así que un error de escritura crearía una serie nueva sin avisar. Las variables en uso son `temp_max`, `temp_min`, `temp_media`, `precipitation_sum`, `precipitation_hours`, `humedad_relativa_media`, `punto_rocio` y `oni_anom`.

Los límites departamentales del mapa vienen de geoBoundaries gbOpen SLV ADM1 (datos de OSM a través de osm-boundaries.com), con licencia CC BY-SA 2.0. La atribución está en los [términos de uso](/legal/terminos).
