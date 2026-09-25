---
titulo: "Qué es EPI-Aetheris"
descripcion: "Sistema de vigilancia epidemiológica descriptiva de código abierto que se instala con Docker, probado con dengue y eventos respiratorios en El Salvador."
orden: 1
categoria: "El proyecto"
---

EPI-Aetheris es un sistema de código abierto que se instala con un solo comando de Docker. Ordena por semana epidemiológica los casos de dengue y de eventos respiratorios junto con datos de clima, y los publica en una API y un mapa.

La primera versión cubre El Salvador: 14 departamentos, las series de MINSAL de 2018 a 2023 (sin 2020 en los datos por departamento) y la serie nacional de OpenDengue. Las enfermedades y las regiones son catálogos de la base (`tipos_evento` y `regiones`), así que se pueden añadir otras sin cambiar el esquema.

## Qué resuelve

El dengue es endémico en El Salvador y la respuesta institucional suele llegar cuando los casos ya subieron. La literatura relaciona la incidencia con la temperatura, la lluvia y la humedad de semanas anteriores, pero no había una herramienta local que cruzara esos datos, indicara su origen y permitiera comparar cada serie con sus propios años anteriores.

El sistema incluye:

- Carga de los boletines de MINSAL, OpenDengue, Open-Meteo y NOAA ONI, con un registro de cada boletín procesado.
- Una base que guarda por separado cada definición de caso (`probable`, `confirmado`, `total`, `notificado`).
- Módulos descriptivos (idoneidad biofísica, anomalía climática, presión epidemiológica relativa) que se calculan al consultarlos.
- Un mapa por departamento, un observatorio respiratorio y alertas de campo redactadas por el equipo de vigilancia.
- Una copia de la base dentro del repositorio: `git clone` y `docker compose up` dejan el sistema funcionando con los mismos datos que el sitio público.

## Cómo está organizado el sitio

El sitio tiene dos secciones:

- Consulta (`/alertas`): el personal de salud ve las alertas vigentes y qué hacer en su unidad.
- Análisis (`/analisis`): dengue (mapa y módulos descriptivos M1 a M3) y respiratorio (neumonías, IRA y vigilancia de laboratorio de virus).

Esta Biblioteca explica qué es el proyecto, qué funciones tiene, de dónde salen los datos y cómo se calculan. Los límites del sistema, y lo que no afirma, están en el [aviso de sensibilidad](/biblioteca/05-sensibilidad-y-honestidad).

## Quién lo construye

Lo desarrolla el Equipo 4 de 3.er año de Bachillerato Técnico Vocacional en Desarrollo de Software del INSAMT (Instituto Nacional de San Miguel Tepezontes, El Salvador) para Expotécnica. Son cinco integrantes, tres de ellos dedicados a la programación. El código está en [GitHub](https://github.com/the-monolith-project/EPI-Aetheris).

La relación entre dengue, clima y aprendizaje automático ya está estudiada. Lo que aporta el equipo es el software: integración de fuentes, registro del origen de cada dato, instalación con Docker y acceso abierto al código y a los datos.
