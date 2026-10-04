---
titulo: "Aviso de sensibilidad"
descripcion: "Qué no afirma EPI-Aetheris, cómo se validó la predicción de casos, por qué se retiró el clasificador y qué datos usa el sistema."
orden: 5
categoria: "Datos y método"
---

## Para qué sirve

EPI-Aetheris es una herramienta de vigilancia descriptiva. Cruza series públicas, compara cada departamento con sus propios años anteriores y muestra de dónde sale cada dato. Sirve para priorizar: dónde mirar primero y con qué contexto.

Lo que publica no es un diagnóstico, una clasificación de riesgo de brote ni una recomendación médica. Las decisiones sobre fumigación, camas o campañas corresponden al personal de salud.

Un color del mapa no indica un brote y un percentil alto no anticipa un ascenso. Los módulos M1, M2 y M3 describen el clima o los casos ya observados.

## Predicción de casos a corto plazo

La página de predicción muestra una predicción estadística del número de casos en el país para las 1 a 8 semanas siguientes a la última semana publicada, con un intervalo de incertidumbre. Da un número y un rango, y el gráfico muestra siempre la fecha de partida.

En la misma página se puede elegir otra semana de partida y comparar la predicción con lo que se observó después. Cada predicción usa solo los datos anteriores a su semana de partida. De 2014 a marzo de 2017 no hay predicción, porque el modelo necesita unos tres años de datos para entrenarse. 2020 se muestra con un aviso: no se usó para entrenar ni para validar el modelo.

### Hasta 2024: serie de OpenDengue

- Se calcula con la serie nacional de OpenDengue, que termina en diciembre de 2024.
- Se validó con las temporadas de 2019 y de 2021 a 2024, usando en cada prueba solo los datos anteriores al punto de corte. A 5 a 8 semanas tuvo menos error que repetir el último valor observado en cuatro de las cinco temporadas, con una ventaja media de entre un 12 % y un 18 %. A 1 a 3 semanas rindió como repetir el último valor. El método, las métricas y una segunda validación hecha desde cero están en la [decisión de arquitectura 0020](https://github.com/the-monolith-project/EPI-Aetheris/blob/main/docs/adr/0020-nowcast-corto-plazo.md).
- Su ventaja depende de que los datos de entrenamiento, que empiezan en 2014, ya incluyan un brote grande. Entrenado solo con datos desde 2016, en 2019 tuvo más error que repetir el último valor. Ante un brote sin precedente en la serie, la predicción puede quedarse corta: con la historia recortada, en el pico de 2019 y de 2022 la mediana valió el 12 % y el 41 % de lo observado.
- Los rangos quedan por debajo de su nivel. A 4 y a 8 semanas, el del 95 % contuvo el 88 % de los valores observados y el del 50 % contuvo entre el 55 % y el 57 %.
- El pico de 2014 y 2015 coincidió con una alerta nacional por arbovirosis y con la búsqueda activa de casos de síndrome febril, que pudieron aumentar el número de casos notificados. El modelo aprende de ese pico.

### Desde 2025: serie del tablero de MINSAL

- Desde la primera semana de 2025 la serie es la de casos sospechosos del tablero de vigilancia de MINSAL, con la misma definición de caso que OpenDengue. El tablero publica cada semana como un promedio de varias, así que la serie cambia despacio.
- Con esa serie, el modelo validado con OpenDengue tuvo en 2025 y 2026 más error que repetir el último valor a 1 a 5 semanas. Por eso la predicción lo combina con una tendencia amortiguada, que prolonga la pendiente de las tres últimas semanas y la va frenando.
- En 2025 y 2026, a cuatro semanas, la combinación tuvo un 14 % menos de error que repetir el último valor. Esos años sirvieron para elegir el método, así que la cifra mide cómo se ajusta a ellos.
- La prueba usa las 20 semanas que MINSAL publique desde el 20 de septiembre de 2026 (semana 38) y se evalúa una sola vez, hacia febrero de 2027. La combinación se mantiene si, a cuatro y a ocho semanas, tiene menos error que repetir el último valor, no más que el modelo validado con OpenDengue y a lo sumo 3 de las 20 semanas fuera del rango del 95 %. Si no, se vuelve a ese modelo.
- En 2026 el valor observado quedó fuera del rango del 95 % en una de cada cinco semanas: sobre todo en las primeras del año, cuando la serie del tablero da un salto, y en mayo, cuando la predicción esperaba una subida mayor que la observada. La prueba incluye el cambio de año de 2027.
- La semana 53 de 2025 no está publicada. No hay predicción con semana de partida entre esa y la 7 de 2026, porque el modelo usa las ocho semanas anteriores.

## Recomendaciones y campos clínicos

El sitio puede mostrar recomendaciones de prevención ya publicadas por OPS/OMS o MINSAL, con su fuente; por ejemplo, «elimine criaderos, revise depósitos de agua». El sistema no redacta indicaciones clínicas propias ni las deduce de los módulos M1 a M4 o del clasificador retirado. M4 describe la calidad del dato: completitud, cuadre y antigüedad.

Los campos clínicos de una alerta de campo (definición de caso, signos de alarma, criterios de referencia, qué notificar y contacto de vigilancia) los llena el equipo transcribiendo la fuente que cita. Si la fuente no da un dato, el campo queda vacío.

## Clasificador retirado

El sitio conserva como referencia un clasificador que asignaba a cada semana un riesgo de brote alto, medio o bajo a partir del clima de semanas anteriores. Se retiró porque no detectó ninguna semana de riesgo alto en 2019 ni en 2022, los dos años de la ventana que las tuvieron. Se muestra con sus métricas de evaluación y no se usa para ninguna decisión.

Su código sigue en el repositorio para que se puedan repetir las evaluaciones.

## Datos personales

El sistema trabaja con conteos por departamento y semana y con datos de clima. No guarda nombres, documentos, historias clínicas ni ubicaciones de pacientes.

- La API de lectura no pide registro y quien lee el sitio no tiene cuenta. Las cuentas existen solo para las personas del equipo que publican o revisan contenido, se crean por invitación y guardan nombre, correo, institución y las credenciales de acceso. El nombre, el cargo si se indica y la institución de quien firma son públicos. La [política de privacidad](/legal/privacidad) detalla qué se guarda y por cuánto tiempo.
- Publicar o editar una alerta exige una cuenta o, mientras convivan, una clave que solo tiene el equipo. Las alertas no se borran: se desactivan y pasan al archivo.
- Las sugerencias se reciben en GitHub, no en un formulario propio.
- No hay datos por municipio, y la serie departamental de dengue llega hasta 2023. Por eso el sitio no ofrece vistas por municipio ni «de hoy».

El detalle de qué datos técnicos circulan al visitar el sitio está en la [política de privacidad](/legal/privacidad).

## Origen de los datos

Todos los datos vienen de fuentes públicas y citables, descritas en [De dónde salen los datos](/biblioteca/04-fuentes-de-datos). Al cargarlos se aplican estas reglas:

- No se simulan series ni se rellenan huecos. Si falta un boletín, falta esa semana.
- Las 19 correcciones retroactivas negativas de MINSAL se excluyen de la serie.
- Las celdas vacías de la tabla departamental de dengue se cargan como 0, porque así lo indica la fuente. Los demás huecos (boletín ausente, tabla no publicada) quedan sin dato.
- La serie de OpenDengue se guarda como total, porque la fuente no separa casos probables y confirmados.
- La serie del tablero de MINSAL se guarda como casos sospechosos, el nombre que usa la fuente.
- Las horas de lluvia se rechazan cuando el modelo climático no calcula precipitación, porque llegarían como 0 sin serlo.
- La copia de la base incluida en el repositorio (4,4 MB) contiene esas mismas tablas.

Los campos clínicos de las alertas se transcriben tal cual, con la página y el organismo de origen.

## Coincidir en el tiempo no prueba una causa

Que M1 (idoneidad climática) y M3 (percentil de casos) estén altos la misma semana muestra que dos series coinciden en el tiempo. No demuestra que ese clima causara esos casos ni que el índice anticipe el conteo.

El canal endémico y M3 comparan cada departamento con sus otros años, sin incluir el año que se describe, para que ese año no influya en su propia referencia. Eso tampoco convierte un percentil en una relación con la lluvia o con El Niño. El índice ONI se carga solo como contexto climático.

## Métricas a la vista

- M1 y M2 muestran el valor continuo, sin semáforo.
- M3 muestra el percentil y la lectura baja, media o alta. Si no hay al menos tres años de referencia, no calcula percentil y lo indica.
- El mapa indica la semana y el año que se están viendo.
- La predicción muestra su intervalo y sus métricas junto al gráfico, con los años en que se midieron.
- El clasificador retirado se muestra con sus métricas de evaluación por año.

## Qué aporta el proyecto

El aprendizaje automático aplicado al dengue y al clima ya tiene mucha literatura, con estudios en Bangladesh, Vietnam, India o Brasil. EPI-Aetheris no propone un modelo nuevo; su aporte es el software:

1. Se instala con `git clone` y `docker compose up`, con los datos incluidos.
2. El esquema admite otras enfermedades y regiones, porque las trata como catálogos.
3. Cada fila se puede rastrear hasta su boletín, su modelo climático y su definición de caso.
4. Cubre El Salvador, una región con menos estudios que Asia o Brasil.

Las cargas, los cálculos y las evaluaciones están en el repositorio y se pueden repetir.
