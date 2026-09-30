# Rama 1 · Vocabulario de la interfaz

Las palabras que ve quien abre el sitio: cómo se llaman las secciones, los paneles, las capas del mapa, los niveles de alerta, los mensajes de estado y los términos con ayuda «?». Sirve para traducir lo que se lee en pantalla a lo que el sistema calcula.

**Para quién es.** Para quien lee el sitio (personal de salud, docencia, prensa, evaluación) y para quien escribe textos o pruebas de interfaz y necesita usar las mismas palabras que el código.

**Cómo leer una entrada.** **En pantalla** reproduce el texto tal como aparece, entre «comillas angulares»; **Qué significa** lo explica en lenguaje llano; **Detalle** indica dónde se explica a fondo (la Biblioteca de este repositorio o una rama del glosario de EPI-Aetheris) y **Ojo** avisa de lecturas erróneas frecuentes. Los textos se copiaron del código fuente el 2026-09-30.

**Ramas vecinas.** La estructura técnica del sitio (rutas, scripts, pruebas) está en [`02-sitio-estatico-y-herramientas.md`](02-sitio-estatico-y-herramientas.md); las páginas legales y de contacto, en [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md); los datos que consume cada panel, en [`04-contrato-de-datos-consumido.md`](04-contrato-de-datos-consumido.md).

<!-- INDICE:INICIO -->

## Índice alfabético (86 entradas)

- **A** — [Alertas de campo](#alertas-de-campo) · [Análisis (índice de herramientas)](#análisis-índice-de-herramientas) · [Ancla («última semana en la serie pública»)](#ancla-última-semana-en-la-serie-pública) · [Anomalía (σ)](#anomalía-σ) · [Archivo de alertas emitidas](#archivo-de-alertas-emitidas) · [Auditoría del dato](#auditoría-del-dato) · [Ayuda de término («?»)](#ayuda-de-término-)
- **B** — [Banda del 50 % y del 95 %](#banda-del-50--y-del-95-) · [Barra de herramientas del análisis](#barra-de-herramientas-del-análisis) · [Biblioteca](#biblioteca)
- **C** — [Campos clínicos de la tarjeta de alerta](#campos-clínicos-de-la-tarjeta-de-alerta) · [Canal endémico](#canal-endémico) · [Capas del mapa](#capas-del-mapa) · [Cargando y barra de actividad](#cargando-y-barra-de-actividad) · [Cartel de la predicción](#cartel-de-la-predicción) · [Cifras de la portada](#cifras-de-la-portada) · [Clasificador histórico («Retirado»)](#clasificador-histórico-retirado) · [Cobertura y calidad de la fuente](#cobertura-y-calidad-de-la-fuente) · [Cómo funciona (tres pasos)](#cómo-funciona-tres-pasos) · [«Cómo se comportó…» (temporadas de prueba y dentro de muestra)](#cómo-se-comportó-temporadas-de-prueba-y-dentro-de-muestra) · [Comparar departamentos](#comparar-departamentos) · [Confirmado](#confirmado) · [Conteo notificado](#conteo-notificado) · [Contrastar la predicción con lo observado](#contrastar-la-predicción-con-lo-observado) · [Cuatro preguntas (M1 a M4 en la portada)](#cuatro-preguntas-m1-a-m4-en-la-portada) · [Curva epidémica nacional de dengue](#curva-epidémica-nacional-de-dengue)
- **D** — [«Descargar vista» y «Copiar enlace»](#descargar-vista-y-copiar-enlace)
- **E** — [Emitir alerta de campo (formulario de operadores)](#emitir-alerta-de-campo-formulario-de-operadores) · [Enlace «Saltar al contenido principal»](#enlace-saltar-al-contenido-principal) · [Estado del servicio](#estado-del-servicio) · [Estado vacío de las alertas](#estado-vacío-de-las-alertas) · [Estados de la capa «Integridad de la vigilancia»](#estados-de-la-capa-integridad-de-la-vigilancia) · [Exploración espacial y temporal](#exploración-espacial-y-temporal)
- **F** — [Ficha departamental](#ficha-departamental) · [Ficha imprimible](#ficha-imprimible) · [Filtros de análisis](#filtros-de-análisis) · [Formato de semana («SE01 de 2023»)](#formato-de-semana-se01-de-2023)
- **I** — [Imprimir cartel](#imprimir-cartel) · [Influenza, VSR y SARS-CoV-2 — laboratorio nacional](#influenza-vsr-y-sars-cov-2--laboratorio-nacional) · [Integridad de la vigilancia](#integridad-de-la-vigilancia) · [IRA — conteo notificado y Neumonías — conteo notificado](#ira--conteo-notificado-y-neumonías--conteo-notificado) · [Iv (idoneidad biofísica)](#iv-idoneidad-biofísica)
- **L** — [«Los datos no están disponibles en este despliegue»](#los-datos-no-están-disponibles-en-este-despliegue)
- **M** — [Modo demostración de la predicción](#modo-demostración-de-la-predicción)
- **N** — [Navegación principal](#navegación-principal) · [Niveles: Informativo, Atención, Intensificación](#niveles-informativo-atención-intensificación) · [No se pudo contactar la fuente («Reintentar»)](#no-se-pudo-contactar-la-fuente-reintentar) · [«NO VIGENTE»](#no-vigente) · [Nombres de las series en «Última semana con dato»](#nombres-de-las-series-en-última-semana-con-dato)
- **O** — [Observatorio respiratorio (MINSAL)](#observatorio-respiratorio-minsal)
- **P** — [Página 404](#página-404) · [Páginas de texto (Acerca de, Contacto, Sugerencias)](#páginas-de-texto-acerca-de-contacto-sugerencias) · [Panel «Calendario epidémico»](#panel-calendario-epidémico) · [Panel «Canal endémico»](#panel-canal-endémico) · [Panel «Clima × presión»](#panel-clima--presión) · [Panel «Comparación de departamentos»](#panel-comparación-de-departamentos) · [Panel «Comparación de temporadas»](#panel-comparación-de-temporadas) · [Panel «Disponibilidad de datos»](#panel-disponibilidad-de-datos) · [Panel «Mapa departamental»](#panel-mapa-departamental) · [Panel «Perfil de calidad»](#panel-perfil-de-calidad) · [Panel «Presión por semana»](#panel-presión-por-semana) · [Panel «Serie del departamento»](#panel-serie-del-departamento) · [Para revisar o replicar el sistema](#para-revisar-o-replicar-el-sistema) · [Percentil de presión](#percentil-de-presión) · [Periodo MINSAL (semana, acumulado, histórico)](#periodo-minsal-semana-acumulado-histórico) · [Pestañas «Vigilancia» y «Predicción a corto plazo»](#pestañas-vigilancia-y-predicción-a-corto-plazo) · [Pie de página](#pie-de-página) · [Portada](#portada) · [Positividad](#positividad) · [Predicción de casos a corto plazo](#predicción-de-casos-a-corto-plazo) · [Probable](#probable)
- **R** — [Reducción del error de intervalo (WIS) respecto a la persistencia](#reducción-del-error-de-intervalo-wis-respecto-a-la-persistencia) · [Resumen histórico nacional](#resumen-histórico-nacional) · [Rezago («al día», «N semanas de rezago»)](#rezago-al-día-n-semanas-de-rezago) · [Rótulo de alerta de prueba](#rótulo-de-alerta-de-prueba)
- **S** — [Selector de paneles](#selector-de-paneles) · [Semana epidemiológica (SE)](#semana-epidemiológica-se) · [Sin dato para esta selección](#sin-dato-para-esta-selección) · [Sospechoso](#sospechoso) · [Suscribirse por feed (Atom)](#suscribirse-por-feed-atom)
- **T** — [Tema oscuro](#tema-oscuro) · [Token de escritura y «Recordar el token en este navegador»](#token-de-escritura-y-recordar-el-token-en-este-navegador)
- **U** — [Última semana publicada de dengue](#última-semana-publicada-de-dengue)
- **V** — [«Ver los datos en tabla»](#ver-los-datos-en-tabla) · [Vistas (General, Territorial, Temporal, Clima, Calidad de datos)](#vistas-general-territorial-temporal-clima-calidad-de-datos) · [Vistas de demostración e incrustadas](#vistas-de-demostración-e-incrustadas)

<!-- INDICE:FIN -->

## 1. Estructura del sitio

### Navegación principal

**En pantalla.** Cinco enlaces en la cabecera: «Inicio», «Alertas», «Análisis», «Biblioteca» y «Sugerencias», y el botón «Tema oscuro» (que pasa a «Tema claro» cuando el tema oscuro está activo).

**Qué significa.** El sitio tiene dos caras que son **secciones**, no un modo que se conmuta: «Alertas» es la cara de consulta (lo vigente, para quien trabaja en una unidad de salud) y «Análisis» agrupa las dos herramientas descriptivas (`/dengue` y `/respiratorio`), que se marcan como activas bajo «Análisis» aunque su dirección no empiece por `/analisis`. Ninguna cara esconde a la otra y no hay estado de «modo»: son enlaces normales, así que un enlace compartido se comporta igual para cualquiera.

**Detalle.** `src/layouts/Layout.astro` (constante `NAV`). En el glosario de EPI-Aetheris: rama 5, «Enfoque dual (consulta y análisis)».

### Enlace «Saltar al contenido principal»

**En pantalla.** Un enlace que solo se ve cuando recibe el foco del teclado, antes de la cabecera.

**Qué significa.** Lleva a `#contenido-principal` y evita recorrer la cabecera en cada página a quien navega con teclado o con lector de pantalla.

### Pie de página

**En pantalla.** Un bloque de identidad («EPI-Aetheris», «Vigilancia epidemiológica de dengue y enfermedad respiratoria en El Salvador», «MINSAL · OpenDengue · Open-Meteo CC BY 4.0», «GPL-3.0 · 2026») y cuatro columnas de enlaces.

**Qué significa.** Las columnas son «El proyecto» (Qué es, Acerca de, Aviso de sensibilidad, Arquitectura y reproducibilidad, GitHub), «Datos y método» (Fuentes de datos, Módulos M1–M3, la documentación interactiva de la API en `/docs` y Licencias de datos), «Vigilancia» (Alertas de campo, Análisis por departamento, Sugerencias) y «Legal y contacto» (Privacidad, Términos de uso, Aviso legal, Contacto y Estado del servicio).

**Ojo.** El enlace se llama «Módulos M1–M3» pero apunta al documento «Qué hace hoy», que describe también M4 ([`03-funciones.md`](../biblioteca/03-funciones.md#m4-integridad-de-la-vigilancia)).

### Portada

**En pantalla.** Titular «Sistema de análisis y prevención de brotes de dengue», con los botones «Ver el mapa» y «Alertas de campo», sobre un mapa de los 14 departamentos.

**Qué significa.** El mapa es el héroe de la página: cada silueta es un enlace real a la ficha de su departamento, y el teclado llega a los botones antes que al mapa. Debajo hay una tira «Alertas vigentes ahora» (se oculta entera si el backend no responde), la sección «Por dónde entrar» (las dos caras del sitio), las cifras, «Cómo funciona», las cuatro preguntas, «Para revisar o replicar el sistema» y «Datos públicos y citables».

**Detalle.** `src/pages/index.astro`.

**Ojo.** El titular habla de «prevención de brotes»; el sistema es de vigilancia **descriptiva** y no clasifica riesgo de brote (ver [`05-sensibilidad-y-honestidad.md`](../biblioteca/05-sensibilidad-y-honestidad.md#para-qué-sirve)).

### Cifras de la portada

**En pantalla.** Cuatro cifras que cuentan hacia arriba al entrar en pantalla: «14 departamentos vigilados», «13 años de historia, 2014 a 2026», «3 fuentes públicas de datos» y «4 preguntas por semana y departamento».

**Qué significa.** Son textos fijos del código, no consultas a la API: el valor final ya está en el HTML y el conteo animado solo lo repite, y no se anima si la persona pidió reducir el movimiento. Las tres fuentes son MINSAL, OpenDengue y Open-Meteo; las cuatro preguntas son M1 a M4.

**Ojo.** Como son cifras escritas a mano, no se actualizan solas: «2014 a 2026» y «13 años» hay que cambiarlos cuando cambie la cobertura.

### Cuatro preguntas (M1 a M4 en la portada)

**En pantalla.** «¿El clima le conviene al zancudo?» (M1), «¿Es un clima raro para esta época?» (M2), «¿Hay más casos de lo habitual?» (M3) e «Integridad de la vigilancia» (M4), bajo el título «Cuatro preguntas para cada departamento, cada semana».

**Qué significa.** Es la traducción llana de los cuatro módulos descriptivos: idoneidad biofísica, anomalía climática continua, presión epidemiológica relativa e integridad de la vigilancia. Son «cuatro preguntas paralelas», no un índice compuesto: ninguna se suma con las otras.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md). En el glosario de EPI-Aetheris: rama 5, «Módulos descriptivos (M1 a M4)».

### Cómo funciona (tres pasos)

**En pantalla.** «Reúne lo que ya es público», «Compara cada departamento consigo mismo» y «Señala lo que se sale de lo normal».

**Qué significa.** Resume el método: se usan solo datos públicos, cada lugar se mide contra su propia historia y no contra el promedio del país, y el mapa marca dónde el clima favorece al mosquito y dónde los casos suben más de lo habitual. El tercer paso no equivale a una alerta ni a un nivel de riesgo.

### Para revisar o replicar el sistema

**En pantalla.** Una «hoja de especificaciones» con cuatro capas: «Datos» (PostgreSQL 15), «Cálculo» (Python · FastAPI), «Sitio» (Astro · TypeScript · Leaflet) y «Despliegue» (Docker Compose).

**Qué significa.** Es la sección para quien evalúa o quiere replicar: aquí sí cabe el vocabulario técnico. Enlaza al código y a la Biblioteca.

**Ojo.** El texto de «Despliegue» dice «Tres servicios que se levantan juntos». Desde el commit `82c5077` de EPI-Aetheris (#156), el servicio `web` va en un perfil de Compose bajo demanda y no arranca con `docker compose up` (ver las [Notas de vigencia](README.md#notas-de-vigencia)).

### Análisis (índice de herramientas)

**En pantalla.** Dos tarjetas, «Dengue» (estado «Cuatro capas activas») y «Respiratorio» (estado «Series notificadas»); la sección «Un departamento en una página»; «Fichas departamentales imprimibles»; y «Cómo leer estas vistas» con tres frases.

**Qué significa.** Es la puerta de entrada a las dos herramientas descriptivas; no calcula nada, solo enruta. Las tres frases de «Cómo leer estas vistas» resumen la lectura correcta: cada departamento se compara contra su propia historia; cada capa describe lo ya publicado (un percentil, un conteo, una anomalía); las series son históricas y el dato más reciente cargado no es el de esta semana.

**Ojo.** La descripción de la tarjeta de dengue nombra «nowcast de la semana en curso (M4)». M4 es la integridad de la vigilancia y el nowcast es una predicción de 1 a 8 semanas desde la última semana observada (ver las [Notas de vigencia](README.md#notas-de-vigencia)).

### Ficha departamental

**En pantalla.** Página `/departamento/[codigo]`, con el título «EPI-Aetheris — <departamento>: alertas, dengue y respiratorio», enlazada desde la sección «Un departamento en una página» del índice de análisis.

**Qué significa.** Reúne para un departamento las alertas vigentes que le aplican, el canal endémico de dengue, el clima (idoneidad biofísica y anomalía climática) y las curvas respiratorias. Es la página a la que llevan las siluetas del mapa de la portada. Se genera de forma estática, una por cada uno de los 14 departamentos.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Ficha departamental».

### Ficha imprimible

**En pantalla.** Página `/analisis/ficha/[departamento]`, presentada como «Fichas departamentales imprimibles»: «Una hoja por departamento para campo e impresión sin conexión».

**Qué significa.** Una hoja con el estado de la última semana disponible (M1, M2 y M3), las series históricas, IRA y neumonías, y las guías de prevención oficiales citadas. Está pensada para imprimirse y llevarse a terreno.

### Biblioteca

**En pantalla.** Cinco documentos: «Qué es EPI-Aetheris», «Qué hace hoy», «De dónde salen los datos», «Aviso de sensibilidad» y «Arquitectura y reproducibilidad». El pie de página enlaza el tercero como «Fuentes de datos».

**Qué significa.** Son los documentos propios del proyecto, escritos para un lector externo. Se sirven desde `docs/biblioteca/` de este repositorio. La numeración de los archivos salta el 02: no existe un documento 02.

**Ojo.** El documento 05 se llama «Aviso de sensibilidad» aquí y «Sensibilidad y honestidad» en EPI-Aetheris; el contenido de los cinco documentos también difiere entre los dos repositorios.

### Estado del servicio

**En pantalla.** Página `/estado` con «Frontend web y documentación (CDN)» («Operativo»), «API pública de cómputo y datos» («Consultando…» y luego una etiqueta «Disponible», «Error <código>» o «Sin conexión»), «Última semana con dato» y una «Nota técnica sobre tiempos de respuesta».

**Qué significa.** Comprueba en vivo si la API responde: si contesta, dice «La API respondió correctamente con código 200 en N ms»; si falla, ofrece «Reintentar verificación» y un «Detalle técnico» aparte. El portal es estático y sigue disponible aunque el backend esté inactivo. La nota técnica avisa de que, tras periodos largos de inactividad, la API puede tardar entre 30 y 50 segundos en el primer arranque («arranque en frío» o *spin-up*).

**Detalle.** En el glosario de EPI-Aetheris: rama 8, «Cold start (arranque en frío)».

### Páginas de texto (Acerca de, Contacto, Sugerencias)

**En pantalla.** «Acerca de» (qué es, para quién, cómo llegó hasta aquí, quién lo desarrolla, con qué recursos), «Contacto» (canales y plazos) y «Sugerencias» (cómo enviarlas por GitHub).

**Qué significa.** Son páginas de texto sin datos. Ninguna tiene formulario: el contacto es por correo y las sugerencias van como incidencias públicas en GitHub.

**Detalle.** [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md#contacto-canales-y-plazos).

### Vistas de demostración e incrustadas

**En pantalla.** `/demos` y `/demos/nowcast` («Recorridos animados de las vistas de EPI-Aetheris»); `/incrustar/curva-nacional` y `/incrustar/ultima-semana`.

**Qué significa.** Las demos sirven para enseñar o grabar; las vistas incrustadas se insertan en otra página mediante un `<iframe>`, sin navegación ni pie y con la atribución visible. Ninguna entra al sitemap ni al índice de los buscadores.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Demos» e «Incrustación».

### Página 404

**En pantalla.** «Página no encontrada»: «La dirección solicitada no existe en EPI-Aetheris», con las salidas principales.

**Qué significa.** Se emite como `404.html`, no se indexa y ofrece enlaces a las secciones principales.

## 2. Términos con ayuda («?»)

### Ayuda de término («?»)

**En pantalla.** Un botón circular con «?» junto a un término. Al pulsarlo se abre una ventana emergente con el nombre del término, su definición breve y el enlace «Leer más en la Biblioteca».

**Qué significa.** Es el glosario de la interfaz: doce definiciones que viven en `src/lib/glosario.ts` y que el componente `AyudaTermino.astro` muestra en un *popover* nativo. El botón tiene un área táctil de 44 px con un círculo visible de 20 px y lleva el nombre accesible «¿Qué es …?». Si la clave no existe en el glosario, el build falla.

**Ojo.** Las once claves de abajo que se usan en pantalla están en la tabla siguiente; la duodécima, `semana-epidemiologica`, existe en el glosario pero ningún componente le coloca hoy su botón «?».

| Clave | Dónde se coloca el botón |
|---|---|
| `iv`, `anomalia`, `percentil-presion`, `integridad` | Selector de capas del mapa (`MapaDepartamentos.astro`) |
| `canal-endemico` | Panel «Canal endémico» |
| `probable`, `confirmado` | Filtros de análisis (`FiltrosAnalisis.astro`) |
| `bandas`, `sospechoso` | Panel de predicción a corto plazo |
| `conteo-notificado`, `positividad` | Página `/respiratorio` |

### Iv (idoneidad biofísica)

**En pantalla.** «Índice de 0 a 1 que resume qué tan favorables son la temperatura, la lluvia y la humedad de una semana para el vector. Describe el clima, no casos.»

**Qué significa.** Un número por departamento y semana que dice si el clima de esa semana conviene al mosquito *Aedes aegypti*; 0 es desfavorable y 1 es lo más favorable. Un `Iv` alto no significa que haya casos ni que vaya a haberlos.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#m1-idoneidad-biofísica-iv). En el glosario de EPI-Aetheris: rama 5, «M1: idoneidad biofísica (`Iv`)».

### Anomalía (σ)

**En pantalla.** «Cuántas desviaciones estándar se aparta el Iv de una semana de lo habitual en ese departamento y esa semana del año.»

**Qué significa.** Un valor de 0 es una semana típica para ese lugar y esa época; valores positivos o negativos grandes son semanas climáticamente raras. La comparación es contra la propia historia del departamento (2014 en adelante), sin contar el año que se describe.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#m2-anomalía-climática-continua). En el glosario de EPI-Aetheris: rama 5, «M2: anomalía climática continua» y «`anomaly_sigma`».

### Percentil de presión

**En pantalla.** «Posición de los casos de una semana entre los de otros años en el mismo departamento, de 0 a 100. No compara departamentos entre sí.»

**Qué significa.** Un percentil de 80 significa, a grandes rasgos, que esa semana tuvo más casos que el 80 % de las mismas semanas de los otros años **en ese departamento**. Describe lo ya ocurrido; no predice, no usa clima y no compara un departamento con otro.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#m3-presión-epidemiológica-relativa). En el glosario de EPI-Aetheris: rama 5, «Percentil de presión».

### Canal endémico

**En pantalla.** «Los cortes P50 y P75 de la historia del departamento dibujados como bandas, con los casos observados encima.»

**Qué significa.** Tres bandas (casos hasta la mediana, entre la mediana y el P75, por encima del P75) que sirven de referencia: si la línea de casos observados entra en la banda alta, esa semana estuvo por encima de lo que suele pasar en ese departamento.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#canal-endémico). En el glosario de EPI-Aetheris: rama 1, «Canal endémico».

### Probable

**En pantalla.** «Caso clasificado como probable en los boletines de MINSAL. Se muestra por separado del confirmado y nunca se suma con él.»

**Qué significa.** Una de las dos series de dengue por departamento de los boletines, según la definición de caso de MINSAL. Es una cifra notificada, con todas las cautelas de un conteo notificado.

**Detalle.** [`04-fuentes-de-datos.md`](../biblioteca/04-fuentes-de-datos.md#boletines-epidemiológicos-de-minsal). En el glosario de EPI-Aetheris: rama 1, «Caso probable».

### Confirmado

**En pantalla.** «Caso con confirmación de laboratorio según los boletines de MINSAL. Es una serie distinta de la de probables.»

**Qué significa.** La otra serie por departamento. Se muestra por separado de la de probables y nunca se suma con ella: cada serie tiene su propio percentil y su propio canal endémico.

**Detalle.** [`04-fuentes-de-datos.md`](../biblioteca/04-fuentes-de-datos.md#boletines-epidemiológicos-de-minsal). En el glosario de EPI-Aetheris: rama 1, «Caso confirmado».

### Sospechoso

**En pantalla.** «Nombre que usa el tablero de MINSAL para los casos notificados desde 2025. Su serie llega ya suavizada por la fuente.»

**Qué significa.** La serie **nacional** de dengue desde 2025; el sitio no tiene desglose departamental para esos años. No equivale a «probable» ni a «confirmado» y por eso no se mezcla con ellos ni con el total de OpenDengue en una comparación semana a semana.

**Detalle.** [`04-fuentes-de-datos.md`](../biblioteca/04-fuentes-de-datos.md#tablero-de-vigilancia-de-minsal). En el glosario de EPI-Aetheris: rama 2, «Sospechoso (serie nacional del tablero)» y «Serie suavizada del tablero».

### Semana epidemiológica (SE)

**En pantalla.** «Semana de domingo a sábado numerada dentro del año para comparar la vigilancia entre años. Algunos años tienen 53.»

**Qué significa.** La unidad de tiempo de todo el sitio. Se numera con el calendario MMWR (el de la OPS y el CDC), no con el ISO 8601. En pantalla se escribe con el formato `SE01`.

**Detalle.** [`04-fuentes-de-datos.md`](../biblioteca/04-fuentes-de-datos.md#opendengue). En el glosario de EPI-Aetheris: rama 1, «Semana epidemiológica (SE)» y «Semana MMWR».

**Ojo.** Su botón «?» no está colocado en ninguna página (ver «Ayuda de término»).

### Banda del 50 % y del 95 %

**En pantalla.** «Rango en el que caería la cifra prevista con esa probabilidad. La banda del 95 % es más ancha que la del 50 %.»

**Qué significa.** La predicción a corto plazo no es un número único sino un abanico: la banda del 50 % es el rango más probable y la del 95 %, el rango casi seguro. Que un valor real salga de la banda del 95 % es posible y está previsto.

**Detalle.** [`05-sensibilidad-y-honestidad.md`](../biblioteca/05-sensibilidad-y-honestidad.md#predicción-de-casos-a-corto-plazo). En el glosario de EPI-Aetheris: rama 4, «Rango del 50 % y del 95 %».

### Conteo notificado

**En pantalla.** «Casos que las unidades de salud reportaron a MINSAL. Depende de cuánto se notifica, no solo de cuánto se enferma.»

**Qué significa.** Es lo que dice la serie de IRA y de neumonías: una cifra de notificación. Si sube, puede ser que haya más enfermedad o que se esté notificando más.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#observatorio-respiratorio). En el glosario de EPI-Aetheris: rama 1, «Conteo notificado».

### Positividad

**En pantalla.** «Proporción de muestras de laboratorio con detección de un virus en una semana.»

**Qué significa.** Se lee en la vigilancia laboratorial de virus respiratorios: de las muestras analizadas esa semana, qué fracción dio positivo. Es una proporción, no un conteo de casos, y MINSAL la publica ya calculada.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#observatorio-respiratorio). En el glosario de EPI-Aetheris: rama 1, «Positividad».

### Integridad de la vigilancia

**En pantalla.** «Qué tan completa y puntual es la información publicada de un departamento. Indica cuánto confiar en la cifra, no la cantidad de casos.»

**Qué significa.** El cuarto módulo. Reúne tres datos por separado (completitud geográfica, cuadre del boletín y antigüedad de cada serie) y no los combina en una nota. En el mapa, un departamento sin color en esa capa es un departamento sin dato esa semana.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#m4-integridad-de-la-vigilancia). En el glosario de EPI-Aetheris: rama 5, «M4: integridad de la vigilancia».

## 3. Análisis de dengue

### Pestañas «Vigilancia» y «Predicción a corto plazo»

**En pantalla.** Bajo el título «Vigilancia del dengue por departamento», dos pestañas: «Vigilancia» y «Predicción a corto plazo». Un enlace «¿Alerta activa? →» lleva a las alertas.

**Qué significa.** «Vigilancia» contiene el resumen nacional, la última semana publicada, la curva epidémica nacional, el análisis por departamento y la auditoría del dato. «Predicción a corto plazo» contiene el nowcast (sección 4).

### Resumen histórico nacional

**En pantalla.** «Resumen histórico nacional». Si falta la serie: «Todavía no hay serie nacional cargada para este resumen.»

**Qué significa.** Un resumen de la serie nacional de dengue, tomada de `/api/casos-nacional`.

### Última semana publicada de dengue

**En pantalla.** «Última semana publicada de dengue en El Salvador», con tarjetas: «SE nn/aaaa, casos sospechosos» (con «Semana del …»), «Misma semana de <año anterior>» (con «Diferencia: … (… %)»), «Semana siguiente (SE nn/aaaa)» (con «Mediana; banda del 50 %: … a …») y, al pie, «Última semana en la base: SE nn/aaaa» y el aviso «El tablero publica cada semana como un promedio de varias.» con los enlaces «Cómo leer estas cifras», «Ver predicción» y «Curva nacional». Mensajes de vacío: «El tablero de MINSAL todavía no tiene semanas cargadas en esta serie.», «El tablero no publicó esa semana.» y «La estimación no está disponible en este despliegue.»

**Qué significa.** Muestra la última semana de la serie del tablero de MINSAL, la misma semana del año anterior y la estimación de la semana siguiente (la mediana y su banda del 50 %). Solo compara tablero contra tablero, porque la serie de OpenDengue tiene otro suavizado, y no interpola una semana que la fuente no publicó, como la 53 de 2025. La variación porcentual queda vacía si el año anterior no existe o su conteo es cero. Mientras la estimación se calcula, la tarjeta «Semana siguiente» muestra «Actualizando la estimación.».

**Detalle.** `src/lib/resumen-semana.ts`; `src/components/UltimaSemanaDengue.astro`.

### Curva epidémica nacional de dengue

**En pantalla.** «Curva epidémica nacional de dengue», con el subtítulo «OpenDengue hasta 2024; tablero de MINSAL desde 2025» y, junto a la palabra «Detalle», los botones «−» («Reducir detalle») y «+» («Aumentar detalle»).

**Qué significa.** La serie nacional semanal, empalmada en 2025 entre dos fuentes distintas. El subtítulo existe para que nadie lea el empalme como una sola serie continua. Los botones cambian el zoom de la curva entre 100, 150 y 200 %. Mientras carga, dice «Cargando la curva…»; si no hay datos, «Sin serie nacional cargada todavía.»

**Detalle.** En el glosario de EPI-Aetheris: rama 2, «Serie mixta (empalme)».

### Exploración espacial y temporal

**En pantalla.** «Exploración espacial y temporal»: «Explora el comportamiento del dengue por departamento y semana. Selecciona un departamento, ajusta el periodo y compara sus patrones con otras temporadas y territorios.» Sigue una línea con los años del histórico «(boletines)» y la frase «Cada uno se compara contra su propia historia».

**Qué significa.** Es el encabezado del **workspace** de análisis: la sección donde se combinan paneles con un mismo conjunto de filtros. No lleva rótulo «workspace» en pantalla porque nombraba cómo está construida la sección y no lo que la persona hace en ella.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Workspace analítico».

### Filtros de análisis

**En pantalla.** Un cuadro de diálogo, «Filtros de análisis: ajusta el periodo, el departamento y la serie utilizados por las vistas del workspace», con los grupos «Periodo» (Año, Periodo MINSAL, Semana activa), «Rango de comparación» (Desde, Hasta), «Serie y territorio» (Serie MINSAL, Departamento, Comparar departamentos) y los botones «Limpiar filtros», «Descargar vista» y «Copiar enlace».

**Qué significa.** Un solo conjunto de filtros gobierna todos los paneles. La lista de años llega hasta el año en curso, pero solo los años con boletines departamentales (2018, 2019, 2021, 2022 y 2023) tienen casos; para los demás solo hay clima.

**Ojo.** Para un año sin casos departamentales, el sitio avisa: «El año … no tiene casos MINSAL departamentales. Idoneidad y anomalía (clima) sí cubren este año; la presión epidemiológica se detiene en 2023.»

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Filtros del análisis (`FiltrosAnalisis`)».

### Periodo MINSAL (semana, acumulado, histórico)

**En pantalla.** Un selector con tres opciones: «Semana seleccionada», «Acumulado del año (YTD)» y «Histórico completo».

**Qué significa.** Decide qué ventana de casos MINSAL pinta la capa «Volumen de casos (MINSAL)» del mapa. En el código son los valores `semana`, `ytd` (*year to date*) e `historico`:

| Opción | Qué suma | Título de la leyenda |
|---|---|---|
| Semana seleccionada | Los casos de la semana activa; un cero se conserva como observación | «Casos "probable" en SE nn / aaaa» |
| Acumulado del año (YTD) | Las observaciones disponibles de la SE01 a la semana activa; los periodos sin registro no se convierten en cero | «Casos "probable" acumulados hasta SE nn / aaaa» |
| Histórico completo | Las observaciones de 2018, 2019, 2021, 2022 y 2023 | «Casos "probable" acumulados en la historia disponible» |

**Ojo.** El periodo histórico se rotula «2018–2023 (2020 sin serie departamental)»: 2020 no entra porque no hay boletines departamentales de ese año.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «`modoMinsal` (`semana`, `ytd`, `historico`)».

### Comparar departamentos

**En pantalla.** «Selecciona hasta cuatro departamentos. 0 de 4 seleccionados.»

**Qué significa.** Elige los departamentos que se dibujan lado a lado en el panel «Comparación de departamentos». El límite es cuatro y el sitio no admite repetidos.

### «Descargar vista» y «Copiar enlace»

**En pantalla.** Dos botones al pie del cuadro «Filtros de análisis».

**Qué significa.** «Descargar vista» baja un archivo CSV con las semanas del rango elegido para el departamento (o los departamentos comparados) y la serie activa; si no hay ninguno elegido, incluye los 14. El archivo se llama `epi-aetheris-dengue-<año>-<serie>-se<desde>-se<hasta>.csv` (con el código del departamento al final si es uno solo), empieza con una marca de orden de bytes para que Excel lo abra en UTF-8 y deja vacías las celdas sin dato. Sus columnas son `anio`, `semana_epi`, `departamento_codigo`, `departamento_nombre`, `serie`, `casos_observados`, `iv`, `anomalia_sigma`, `presion_percentil`, `presion_categoria`, `p50_baseline`, `p75_baseline`, `n_obs_baseline` y `anios_baseline`. «Copiar enlace» copia la dirección con los filtros incluidos (ver el estado por URL).

**Ojo.** Para un año sin casos departamentales, la exportación falla por diseño (la función lanza la nota de «solo clima») y la interfaz solo responde «No se pudo generar el CSV. Inténtalo de nuevo.». Al terminar bien dice «CSV generado con N filas filtradas.»; al copiar, «Enlace a esta vista copiado.»

**Detalle.** `src/lib/analisis-export.ts`. En el glosario de EPI-Aetheris: rama 9, «Estado por URL».

### Barra de herramientas del análisis

**En pantalla.** Selector «Vista» (General, Territorial, Temporal, Clima, Calidad de datos), control de «Zoom» (100 % con botones − y +), botón «Filtros», botón «Restablecer vista» y una cinta de semanas (SE01, SE13, SE26, SE39, SE53).

**Qué significa.** Controla la disposición del workspace, no los datos. El zoom temporal admite 100, 150 y 200 %. «Restablecer vista» vuelve a la vista General.

### Selector de paneles

**En pantalla.** «Paneles visibles», agrupados en «Territorio» (Mapa departamental), «Matrices» (Presión por semana, Calendario epidémico, Disponibilidad de datos), «Trazas temporales» (Canal endémico, Comparación de temporadas, Comparación de departamentos, Serie del departamento, Clima × presión) y «Registro y auditoría» (Perfil de calidad).

**Qué significa.** Permite encender o apagar paneles a mano. Son diez paneles en total; cada uno puede ser pequeño, mediano o grande, y uno puede ponerse «en foco».

### Vistas (General, Territorial, Temporal, Clima, Calidad de datos)

**En pantalla.** Cinco descripciones: «General: mapa, matriz de presión y comparaciones temporales y territoriales.»; «Territorial: mapa, matriz de presión y comparación entre departamentos.»; «Temporal: serie histórica y canal endémico del departamento, temporadas y calendario nacional.»; «Clima: mapa territorial y dispersión de anomalía climática contra presión.»; «Calidad de datos: disponibilidad de observaciones y auditoría de procedencia.»

**Qué significa.** Cada vista es una combinación predefinida de paneles y tamaños. Aplicar una vista reemplaza los paneles visibles y quita el foco.

### Panel «Mapa departamental»

**En pantalla.** El mapa de los 14 departamentos con un selector de capas (ver «Capas del mapa»).

**Qué significa.** Pinta un valor por departamento para la semana activa. No pinta niveles de riesgo departamental. Los departamentos sin dato quedan en gris.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#mapa-departamental-dengue).

### Panel «Presión por semana»

**En pantalla.** «Presión epidemiológica relativa por departamento y semana», un mapa de calor.

**Qué significa.** Una matriz de departamentos por semanas, coloreada por el percentil de presión. Sirve para ver de un vistazo en qué departamentos y semanas los casos superaron lo habitual. El color ordena magnitudes; no es un nivel de alarma.

### Panel «Serie del departamento»

**En pantalla.** «Series temporales del departamento por semana», con tres gráficas: «Percentil frente a su historia (0–100)», «Iv (0–1)» contra la banda histórica y «Anomalía (σ)».

**Qué significa.** Los tres módulos temporales (M3, M1 y M2) del departamento activo, semana a semana. Sin departamento elegido, el panel pide elegirlo en el mapa o en «Filtros».

### Panel «Canal endémico»

**En pantalla.** El canal endémico del departamento activo, con el enlace «¿Qué es el canal endémico?» y la opción «Ver los datos en tabla».

**Qué significa.** Dibuja los cortes P50 y P75 de M3 como tres bandas con los casos observados encima. Usa la línea base de M3, que deja fuera el año descrito; por eso la banda cambia de un año a otro. Las semanas sin línea base suficiente quedan en blanco.

### Panel «Comparación de temporadas»

**En pantalla.** «Comparación de temporadas para el departamento activo», con el eje «Casos» de la serie elegida.

**Qué significa.** Superpone los conteos semanales de los distintos años del mismo departamento para ver si la temporada actual se adelanta, se retrasa o es más alta.

### Panel «Comparación de departamentos»

**En pantalla.** «Comparación de departamentos seleccionados por semana», en paneles alineados.

**Qué significa.** Dibuja las curvas de hasta cuatro departamentos, con el mismo eje de semanas. Sin departamentos elegidos, el panel pide seleccionarlos en «Filtros».

**Ojo.** Las curvas comparan conteos, no riesgo: el conteo depende del tamaño de la población y de cuánto se notifica. Por eso el sitio compara cada departamento con su propia historia y no con los demás.

### Panel «Calendario epidémico»

**En pantalla.** «Calendario de casos nacionales por año y semana».

**Qué significa.** Una matriz de años por semanas epidemiológicas con los casos nacionales, para ver el patrón estacional de cada año.

### Panel «Clima × presión»

**En pantalla.** «Anomalía climática y percentil de presión por departamento», un diagrama de dispersión con los ejes «Anomalía climática (σ)» y «Percentil presión (probable|confirmado)».

**Qué significa.** Cada punto es un departamento en la semana activa. Sirve para mirar si las semanas de clima raro coinciden con más casos de lo habitual; la coincidencia temporal no prueba una causa.

**Detalle.** [`05-sensibilidad-y-honestidad.md`](../biblioteca/05-sensibilidad-y-honestidad.md#coincidir-en-el-tiempo-no-prueba-una-causa).

### Panel «Disponibilidad de datos»

**En pantalla.** «Disponibilidad de observaciones por departamento y semana», un mapa de calor.

**Qué significa.** Muestra dónde hay y dónde no hay observación cargada. Un hueco es un hueco de la fuente, no un cero.

### Panel «Perfil de calidad»

**En pantalla.** «Elige un departamento en el mapa o en Filtros para revisar la procedencia y calidad de sus observaciones» y, con departamento elegido, «Selecciona un departamento para revisar una observación.»

**Qué significa.** Permite abrir una observación concreta y ver de dónde salió: la fuente, el boletín, el estado de la extracción y si el cuadre coincidió.

### Auditoría del dato

**En pantalla.** «Auditoría del dato», con la completitud geográfica y la antigüedad de las series. Mensajes: «Los huecos se concentran en semanas festivas y en boletines sin tabla departamental.» y «No se pudo calcular la completitud geográfica en este momento.»

**Qué significa.** El resumen de M4 en la página de dengue: cuántas semanas tienen los 14 departamentos, y a cuántas semanas quedó cada serie.

### «Ver los datos en tabla»

**En pantalla.** Un botón bajo cada gráfica.

**Qué significa.** Abre una tabla con los mismos valores que la gráfica. Es la alternativa textual de cada visualización, útil para lectores de pantalla y para copiar cifras.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Tabla alternativa».

### Capas del mapa

**En pantalla.** Seis pestañas del selector de capas: «Volumen de casos (MINSAL)», «Idoneidad biofísica (Iv)», «Anomalía climática (continua)», «Presión epidemiológica (probable)», «Presión epidemiológica (confirmado)» e «Integridad de la vigilancia».

**Qué significa.** Una tabla de lo que colorea cada capa:

| Capa | Qué pinta | Módulo |
|---|---|---|
| Volumen de casos (MINSAL) | Casos semanales, acumulados del año o históricos del departamento, según el «Periodo MINSAL» (por defecto, semanales) | — |
| Idoneidad biofísica (Iv) | `Iv` de la semana, de 0 a 1 | M1 |
| Anomalía climática (continua) | Desviaciones estándar respecto de lo habitual | M2 |
| Presión epidemiológica (probable) y (confirmado) | La categoría `baja`, `media` o `alta` frente al P50 y el P75 de la historia del departamento, una serie por pestaña | M3 |
| Integridad de la vigilancia | Si el departamento tiene dato esa semana y si el boletín cuadra | M4 |

**Ojo.** Ninguna capa es salida del clasificador de riesgo retirado y ninguna pinta un nivel de riesgo (la rampa de presión es «neutra: sin rojo de urgencia, esto no es una alerta»). Cada capa tiene una leyenda y una tabla de valores «Valores de <capa> por departamento». Al pasar el cursor sobre un departamento en las capas M1, M2 o M3, el cuadro emergente muestra los cuatro valores a la vez (`Iv`, anomalía, presión probable y confirmado): la capa activa solo decide el color.

### Estados de la capa «Integridad de la vigilancia»

**En pantalla.** La leyenda «Calidad del dato (semana seleccionada)» con tres clases: «sin dato esta semana», «dato presente» y «el boletín no cuadra». El aviso de la capa dice: «El color indica si ese departamento tiene fila esa semana, si falta el dato, o si el boletín no cuadra aritméticamente. No es un nivel de riesgo ni un índice de confianza opaco.»

**Qué significa.** Tres estados por departamento y semana: sin dato (gris), presente (azul grisáceo) y presente pero con el boletín que no cuadra (dorado). «No cuadra» es una propiedad del boletín de esa semana, no del departamento: si la suma de los 14 departamentos no coincide con el total nacional impreso, todos los departamentos con dato quedan marcados.

**Detalle.** En el glosario de EPI-Aetheris: rama 2, «Cuadre (`validacion_cuadra`)» y rama 5, «Cuadre».

## 4. Predicción a corto plazo

### Predicción de casos a corto plazo

**En pantalla.** «Predicción de casos a corto plazo»: «Predicción estadística del conteo nacional de dengue para las próximas 1 a 8 semanas, con intervalo de incertidumbre, a partir de la última semana observada.» Al pie, el enlace «Método y validación».

**Qué significa.** El nowcast: la **única** predicción del sistema. Es del conteo nacional de casos de dengue, no de un nivel de riesgo ni de un brote, y parte de la última semana con dato (que puede estar meses atrás si la fuente publica con retraso). Si el recurso no está generado, el panel dice «La predicción no está disponible todavía.»

**Detalle.** [`05-sensibilidad-y-honestidad.md`](../biblioteca/05-sensibilidad-y-honestidad.md#predicción-de-casos-a-corto-plazo). En el glosario de EPI-Aetheris: rama 4, «Nowcast de dengue».

### Cartel de la predicción

**En pantalla.** Una tarjeta con el rótulo superior «Predicción · próximas 1 a 8 semanas» y las cifras de la estimación (mediana y bandas).

**Qué significa.** El resumen numérico de lo que dibuja la gráfica: para cada una de las próximas 1 a 8 semanas, la mediana y las bandas del 50 % y del 95 %.

### Ancla («última semana en la serie pública»)

**En pantalla.** En la gráfica, una marca vertical con el rótulo «última semana en la serie pública».

**Qué significa.** La **semana de anclaje**: la última semana observada de la serie, desde la que se cuentan las 1 a 8 semanas predichas. Es la fecha que separa lo observado de lo predicho.

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «Ancla (semana de anclaje)».

### «Cómo se comportó…» (temporadas de prueba y dentro de muestra)

**En pantalla.** Un bloque titulado «Cómo se comportó en las temporadas de prueba», con la leyenda «Validación: casos observados frente a la predicción a cuatro semanas en las temporadas de prueba». Cuando los años evaluados se usaron para elegir el método, el título pasa a «Cómo se comportó en <lista de años>» y la leyenda a «Casos observados frente a la predicción a cuatro semanas en <lista de años>», sin la palabra «Validación».

**Qué significa.** El desempeño histórico del método a un horizonte de cuatro semanas, contra los casos observados. El cambio de redacción es deliberado: solo se llama **validación** a lo evaluado sobre años que no intervinieron en elegir el método; lo demás se describe sin esa palabra.

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «Dentro de muestra (`dentro_de_muestra`)».

### Reducción del error de intervalo (WIS) respecto a la persistencia

**En pantalla.** «Reducción del error de intervalo (WIS) respecto a la persistencia, por año.»

**Qué significa.** Compara el error del modelo con el de la referencia más simple (repetir el último valor). Una reducción positiva significa que el modelo mejoró a esa referencia en ese año.

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «WIS (Weighted Interval Score)», «Persistencia (random walk)» y «Skill relativo».

### Contrastar la predicción con lo observado

**En pantalla.** «Contrastar la predicción con lo observado»: «Elige una semana de partida. La gráfica muestra lo que el modelo habría predicho con los datos disponibles hasta esa semana y lo que se observó después.» Controles de «Año» y «Semana de partida» con flechas.

**Qué significa.** La predicción **retrospectiva**: el abanico que el modelo habría dado desde cada semana de la serie usando solo lo publicado hasta entonces. Permite ver aciertos y errores pasados.

**Detalle.** En el glosario de EPI-Aetheris: rama 4, «Nowcast retrospectivo».

### Modo demostración de la predicción

**En pantalla.** Con `?demo` en `/dengue`, o siempre en `/demos/nowcast`, una barra con un selector «Semana de anclaje» (con la opción «<fecha> · última semana observada»), un botón que cambia de texto a «Calculando…» y luego a «Predicción cargada», y un enlace «Reiniciar».

**Qué significa.** Una secuencia animada para enseñar o grabar cómo se revela el abanico de predicción; no es una función de uso normal. Un enlace sin `?demo` no muestra la barra.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Demos (`?demo`, `?lento`, `?limpio`)».

### Clasificador histórico («Retirado»)

**En pantalla.** Una tarjeta con la etiqueta «Retirado» y el título «Clasificador histórico»: «Clasificador piloto de 2024. Al validarlo con los años de brote conocidos no detectó las semanas de riesgo alto y se retiró. Se conserva para consultar su evaluación.»

**Qué significa.** El clasificador de riesgo de brote que se abandonó. Va en una sección colapsable y etiquetada como histórica, y solo muestra su evaluación, con sus métricas; no produce ninguna salida operativa y no alimenta el mapa ni las alertas. Se retiró porque ninguna de las cinco líneas de validación sostuvo capacidad predictiva. Si la evaluación no está generada en el despliegue, dice «La evaluación histórica no está generada en este despliegue.»

**Detalle.** [`05-sensibilidad-y-honestidad.md`](../biblioteca/05-sensibilidad-y-honestidad.md#clasificador-retirado). En el glosario de EPI-Aetheris: rama 4, «Clasificador de riesgo retirado».

## 5. Observatorio respiratorio

### Observatorio respiratorio (MINSAL)

**En pantalla.** «Observatorio respiratorio (MINSAL)»: «IRA y neumonías son conteos clínicos notificados: nacionales desde 2025, del tablero de MINSAL, y por departamento de 2018 a 2023, de los boletines. Influenza, VSR y SARS-CoV-2 son vigilancia laboratorial nacional (muestras, detecciones, positividad). Cada serie conserva su unidad.»

**Qué significa.** La segunda herramienta de análisis. Reúne series de tres tipos que **no se mezclan**: conteos de IRA, conteos de neumonías y mediciones de laboratorio de virus. Las fórmulas de M1 a M3 no se aplican aquí.

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#observatorio-respiratorio). En el glosario de EPI-Aetheris: rama 5, «Observatorio respiratorio».

### IRA — conteo notificado y Neumonías — conteo notificado

**En pantalla.** Dos secciones, «IRA — conteo notificado» y «Neumonías — conteo notificado», y un enlace «Copiar enlace a esta vista».

**Qué significa.** Cada una muestra la serie nacional del tablero de MINSAL desde 2025 (con una línea por año, la última semana frente a la del año anterior y una tabla) y, por departamento, el conteo acumulado de los boletines de 2018 a 2023.

### Influenza, VSR y SARS-CoV-2 — laboratorio nacional

**En pantalla.** «Influenza, VSR y SARS-CoV-2 — laboratorio nacional» y, dentro, «Vigilancia centinela de virus (nacional)» con la opción «Todos los virus / vigilancia total».

**Qué significa.** Muestras analizadas, detecciones y positividad por virus, solo a nivel nacional. No hay mapa de virus por departamento porque la fuente no publica ese desglose. Un selector «Métrica» ofrece «detecciones (conteo)», «positividad (%)», «muestras analizadas (conteo)» y «muestras positivas (conteo)», y otro «Año»; por defecto se muestran influenza, VSR, `covid_19`, adenovirus y parainfluenza, y los subtipos de influenza siguen en la base pero no en este panel. La descripción del panel avisa: «Que un virus coincida en el tiempo con un alza de IRA no prueba que la haya causado. SARS-CoV-2 aparece como covid_19 solo en 2023.»

### Cobertura y calidad de la fuente

**En pantalla.** «Cobertura y calidad de la fuente»: «Mide cuántas semanas del año tienen dato cargado en la base, frente a las 52 nominales.»

**Qué significa.** Un panel de auditoría de la serie respiratoria: qué semanas y qué tablas hay. Un año con menos de 52 semanas cargadas tiene huecos que vienen de la fuente y que no se rellenan.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Panel de cobertura respiratoria».

## 6. Alertas de campo en pantalla

### Alertas de campo

**En pantalla.** «Alertas de campo · equipo de vigilancia», con un aviso de honestidad: «Alertas redactadas por el equipo de vigilancia del proyecto (INSAMT, Equipo 4) a partir de datos públicos históricos (MINSAL, OpenDengue, Open-Meteo). No reemplazan los lineamientos del MINSAL ni el criterio clínico.»

**Qué significa.** Avisos redactados **a mano** por personas, no generados por el sistema: no salen de M1 a M3 ni del clasificador retirado. La página lista solo las alertas activas y sin etiqueta; permite filtrar por tipo («Todas», «Dengue», «Respiratorio») y por «Departamento» (muestra las nacionales y las de ese departamento).

**Detalle.** [`03-funciones.md`](../biblioteca/03-funciones.md#alertas-de-campo). En el glosario de EPI-Aetheris: rama 5, «Alerta de campo».

### Niveles: Informativo, Atención, Intensificación

**En pantalla.** Sección «Niveles» con tres etiquetas y su significado operativo:

| Nivel | Significado que muestra la página |
|---|---|
| Informativo | «Sin señal relevante en los datos. Recordatorio de vigilancia rutinaria.» |
| Atención | «Los datos históricos recientes están por encima de lo esperado para la época. Reforzar notificación y búsqueda de casos.» |
| Intensificación | «Señal sostenida varias semanas y/o concentración territorial. Activar medidas locales y coordinar con SIBASI.» |

**Qué significa.** Son categorías de **respuesta** que decide el equipo de vigilancia, no una clasificación de riesgo calculada. En el formulario y en la API se escriben sin tilde: `informativo`, `atencion`, `intensificacion`.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Nivel de alerta».

### Rótulo de alerta de prueba

**En pantalla.** «ALERTA DE PRUEBA — NO ACTUAR SOBRE ESTA INFORMACIÓN», dentro de la tarjeta, como texto en negrita y mayúsculas y no como un color.

**Qué significa.** Se muestra sobre toda alerta que lleve una etiqueta (`test`, `simulacro` o `historica`) para que nadie la tome como real; la alerta de producción no lleva etiqueta. Las alertas etiquetadas no salen en la lista por defecto. Los términos de uso prohíben difundir como reales las alertas marcadas como prueba.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Etiqueta de alerta (`test`, `simulacro`, `historica`)».

### «NO VIGENTE»

**En pantalla.** «NO VIGENTE — venció el dd/mm/aaaa» sobre una alerta vencida o apagada, en el archivo de alertas.

**Qué significa.** Una alerta cuya vigencia terminó, o que se desactivó, no se ve igual que una vigente: lleva ese rótulo y un borde propio. La fecha es la de fin de vigencia o, si no la tiene, la de inicio. La página del archivo aclara que no se usa como material para decisiones tomadas sin conexión.

### Archivo de alertas emitidas

**En pantalla.** «Archivo de alertas»: «Consulta qué se emitió y cuándo.», con filtros «Tipo», «Desde», «Hasta» y el botón «Filtrar»; el enlace de vuelta se llama «Volver a alertas vigentes».

**Qué significa.** La lista completa de lo emitido, no solo lo vigente. Si «Desde» es posterior a «Hasta», el filtro avisa: «La fecha "Desde" no puede ser posterior a "Hasta".»

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Archivo de alertas».

### Suscribirse por feed (Atom)

**En pantalla.** Un enlace «Suscribirse por feed (Atom)» en la página de alertas.

**Qué significa.** Permite seguir las alertas desde un lector de noticias (formato Atom) sin visitar el sitio.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Feed Atom de alertas».

### Imprimir cartel

**En pantalla.** Un botón «Imprimir cartel».

**Qué significa.** Abre el diálogo de impresión del navegador con una versión sin cabecera, pie ni filtros, pensada para pegarse en una sala de espera: cada alerta se mantiene entera en una hoja y se abren los bloques clínicos antes de imprimir.

### Campos clínicos de la tarjeta de alerta

**En pantalla.** Bloques opcionales dentro de cada alerta: «Definición de caso», «Signos de alarma», «Criterios de referencia», «Qué notificar» y «A quién contactar (SIBASI)».

**Qué significa.** Contenido clínico que el equipo transcribe de fuentes oficiales (VIGEPES de MINSAL y guías de la OPS) con la fuente citada. Si el bloque está vacío, no se muestra: el sistema no inventa teléfonos, correos ni texto clínico.

**Detalle.** En el glosario de EPI-Aetheris: rama 5, «Campos clínicos de una alerta»; rama 1, «Signos de alarma» y «Criterios de referencia».

### Estado vacío de las alertas

**En pantalla.** «No hay alertas activas. Última revisión del equipo: dd/mm/aaaa.»

**Qué significa.** No es una falla: significa que no hay alertas vigentes y muestra cuándo el equipo revisó por última vez. Si la API no responde, la página dice «No se pudieron cargar las alertas.»

### Emitir alerta de campo (formulario de operadores)

**En pantalla.** Página `/alertas/nueva`, «Operadores · no enlazado en la navegación», con el título «Emitir alerta de campo». Campos: Tipo (dengue, respiratorio), Nivel (informativo, atencion, intensificacion), Etiqueta (ninguna, test, simulacro, historica), Alcance (departamentos), Título, Contexto, Indicaciones, Fuente, Autor, Vigente desde, Vigente hasta, y los opcionales clínicos y de contacto. Botón «Publicar alerta».

**Qué significa.** El formulario que usa el equipo para publicar. Advierte: «Lo que se escriba aquí lo va a leer un médico en terreno.» y «La fuente del dato es obligatoria.». Sin departamento marcado, la alerta es nacional. No aparece en la navegación, no está en el sitemap y no se indexa.

### Token de escritura y «Recordar el token en este navegador»

**En pantalla.** «Token de escritura (ALERTAS_TOKEN)», la casilla «Recordar el token en este navegador» y el botón «Cerrar sesión (olvidar token)».

**Qué significa.** Publicar una alerta exige una clave definida en el servidor. Si se marca la casilla, el navegador la guarda en `localStorage` para no reescribirla; el botón la borra. No hay cuentas de usuario.

**Detalle.** [`03-legal-privacidad-y-publicacion.md`](03-legal-privacidad-y-publicacion.md#lo-que-se-guarda-en-el-navegador). En el glosario de EPI-Aetheris: rama 6, «Bearer y `ALERTAS_TOKEN`».

## 7. Mensajes, estados y formatos

### Cargando y barra de actividad

**En pantalla.** Mensajes como «Cargando alertas…», «Cargando archivo…», «Cargando la curva…» y «Consultando…», y, en la barra de herramientas del análisis, una barra animada cuyo texto para lectores de pantalla es «Actualizando datos…».

**Qué significa.** Estados de espera. La barra de actividad del análisis se enciende mientras hay peticiones a la API en vuelo (por ejemplo, tras cambiar un filtro); fuera del workspace de dengue no existe. Los cargadores decorativos (el cometa que recorre la curva, los puntos en cascada) no anuncian nada: quien anuncia el estado es el contenedor, con `role="status"`.

### Sin dato para esta selección

**En pantalla.** Mensajes neutros como «Sin serie nacional cargada todavía.», «Sin idoneidad biofísica para este departamento.» o «Sin alertas de campo vigentes para este departamento.»

**Qué significa.** El desenlace **esperado y no erróneo** de una consulta que no tiene datos. Forma parte del mensaje del proyecto sobre los huecos de cobertura: la ausencia de dato se muestra como ausencia, no como cero. Los lectores de pantalla lo reciben como región de estado.

### No se pudo contactar la fuente («Reintentar»)

**En pantalla.** Mensajes como «No se pudo cargar la idoneidad biofísica.» o «No se pudieron cargar las alertas en este momento.», con un botón «Reintentar».

**Qué significa.** Un fallo real de red o de servidor, distinto de «sin dato». Ofrece reintentar y evita jerga de desarrollador.

**Detalle.** `src/components/estado-async.ts`.

### «Los datos no están disponibles en este despliegue»

**En pantalla.** El texto «Los datos no están disponibles en este despliegue.», o el motivo que traiga la respuesta.

**Qué significa.** La API respondió 200 con `disponible: false`: la fuente respondió, pero el recurso no está generado o la tabla no está cargada. No es un error de red y no lleva «Reintentar».

**Detalle.** [`04-contrato-de-datos-consumido.md`](04-contrato-de-datos-consumido.md#respuesta-disponible-false). En el glosario de EPI-Aetheris: rama 6, «Contrato `disponible: false`».

### Formato de semana («SE01 de 2023»)

**En pantalla.** `SE01`, `SE13`, `SE53`; en el estado del servicio, la última semana con dato se escribe con el patrón «SE23 de 2024» (el número y el año son un ejemplo del formato); en el mapa y en los cuadros, `SE01 / 2023`.

**Qué significa.** La semana epidemiológica se escribe con dos dígitos precedidos de `SE`. Una serie que ya no avanza no está «rota»: la fuente publica con retraso.

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Formato de semana (`SE01`)».

### Rezago («al día», «N semanas de rezago»)

**En pantalla.** En «Última semana con dato»: «al día», «1 semana de rezago» o «N semanas de rezago».

**Qué significa.** Cuántas semanas atrás quedó cada serie respecto de la más reciente. La frase de la página lo aclara: «Una serie con rezago no está rota: la fuente publica con retraso.»

**Detalle.** `src/lib/frescura.ts`.

### Nombres de las series en «Última semana con dato»

**En pantalla.** Nueve nombres: «Dengue por departamento (boletines de MINSAL)», «Dengue nacional (OpenDengue)», «Dengue nacional (tablero de MINSAL)», «Clima (Open-Meteo)», «IRA por departamento (boletines)», «Neumonías por departamento (boletines)», «IRA nacional (tablero de MINSAL)», «Neumonías nacionales (tablero de MINSAL)» y «Virus respiratorios (laboratorio nacional)».

**Qué significa.** Los nueve grupos de datos que usa el sitio, con su fuente entre paréntesis. Cada uno tiene su propia última semana, por eso el listado muestra un rezago distinto para cada uno.

### Tema oscuro

**En pantalla.** El botón «Tema oscuro» / «Tema claro» de la cabecera.

**Qué significa.** Cambia entre el tema claro y el oscuro y recuerda la elección en el navegador (`localStorage`, clave `epi:tema`); sin elección guardada manda la preferencia del sistema (`prefers-color-scheme`).

**Detalle.** En el glosario de EPI-Aetheris: rama 9, «Tema oscuro (`data-theme`)».
