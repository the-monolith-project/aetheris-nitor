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

La página de dengue incluye una predicción estadística del número de casos en el país para las 1 a 8 semanas siguientes a la última semana con datos, con un intervalo de incertidumbre.

- Se calcula sobre la serie nacional de OpenDengue. Da un número y un rango.
- Parte de la última semana publicada, que va varios meses por detrás de la fecha actual. El gráfico muestra siempre esa fecha de partida.
- Se validó con las temporadas de 2019 y de 2021 a 2024, usando en cada prueba solo los datos anteriores al punto de corte. En las cinco temporadas tuvo menos error que repetir el último valor observado. Las métricas, el protocolo y una segunda validación hecha desde cero están en el [informe del experimento](https://github.com/the-monolith-project/EPI-Aetheris/blob/main/docs/experimentos/experimento-nowcast-corto-plazo.md).

## Recomendaciones y campos clínicos

El sitio puede mostrar recomendaciones de prevención ya publicadas por OPS/OMS o MINSAL, con su fuente; por ejemplo, «elimine criaderos, revise depósitos de agua». El sistema no redacta indicaciones clínicas propias ni las deduce de los módulos M1 a M4 o del clasificador retirado. M4 describe la calidad del dato: completitud, cuadre y antigüedad.

Los campos clínicos de una alerta de campo (definición de caso, signos de alarma, criterios de referencia, qué notificar y contacto de vigilancia) los llena el equipo transcribiendo la fuente que cita. Si la fuente no da un dato, el campo queda vacío.

## Clasificador retirado

El sitio conserva como referencia un clasificador que asignaba a cada semana un riesgo de brote alto, medio o bajo a partir del clima de semanas anteriores. Se retiró porque no detectó ninguna semana de riesgo alto en 2019 ni en 2022, los dos años de la ventana que las tuvieron. Se muestra con sus métricas de evaluación y no se usa para ninguna decisión.

Su código sigue en el repositorio para que se puedan repetir las evaluaciones. El [informe de cierre](https://github.com/the-monolith-project/EPI-Aetheris/blob/main/docs/rescate-prediccion/informe-cierre-rescate-prediccion.md) recoge las pruebas y sus resultados.

## Datos personales

El sistema trabaja con conteos por departamento y semana y con datos de clima. No guarda nombres, documentos, historias clínicas ni ubicaciones de personas.

- No hay cuentas de usuario. La API de lectura no pide registro.
- Publicar o editar una alerta exige una clave que solo tiene el equipo. Las alertas no se borran: se desactivan y pasan al archivo.
- Las sugerencias se reciben en GitHub, no en un formulario propio.
- No hay datos por municipio, y la serie departamental de dengue llega hasta 2023. Por eso el sitio no ofrece vistas por municipio ni «de hoy».

El detalle de qué datos técnicos circulan al visitar el sitio está en la [política de privacidad](/legal/privacidad).

## Origen de los datos

Todos los datos vienen de fuentes públicas y citables, descritas en [De dónde salen los datos](/biblioteca/04-fuentes-de-datos). Al cargarlos se aplican estas reglas:

- No se simulan series ni se rellenan huecos. Si falta un boletín, falta esa semana.
- Las 19 correcciones retroactivas negativas de MINSAL se excluyen de la serie.
- Las celdas vacías de la tabla departamental de dengue se cargan como 0, porque así lo indica la fuente. Los demás huecos (boletín ausente, tabla no publicada) quedan sin dato.
- La serie de OpenDengue se guarda como total, porque la fuente no separa casos probables y confirmados.
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
- La predicción muestra su intervalo y sus métricas de validación junto al gráfico.
- El clasificador retirado se muestra con sus métricas de evaluación por año.

## Qué aporta el proyecto

El aprendizaje automático aplicado al dengue y al clima ya tiene mucha literatura, con estudios en Bangladesh, Vietnam, India o Brasil. EPI-Aetheris no propone un modelo nuevo; su aporte es el software:

1. Se instala con `git clone` y `docker compose up`, con los datos incluidos.
2. El esquema admite otras enfermedades y regiones, porque las trata como catálogos.
3. Cada fila se puede rastrear hasta su boletín, su modelo climático y su definición de caso.
4. Cubre El Salvador, una región con menos estudios que Asia o Brasil.

Las cargas, los cálculos y las evaluaciones están en el repositorio y se pueden repetir.
