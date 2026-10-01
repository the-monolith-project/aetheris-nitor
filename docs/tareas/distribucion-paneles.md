# Tarea: distribución de paneles en /dengue

Estas instrucciones y el diagnóstico de más abajo son todo el contexto. En este repo `CLAUDE.md` y los `*.local.md` no se versionan, así que la sesión en la nube no los trae. Lo que sigue reemplaza lo que ahí se dice.

## Qué hacer

Implementa la Propuesta 1 del diagnóstico (algoritmo de fila completa) más el escalón responsive `md:`. No implementes las propuestas 2 ni 3.

1. Antes de cambiar nada, comprueba en `src/components/analisis/PanelAnalisis.astro` y `src/lib/analisis-layout-state.ts` que las causas A y B siguen vigentes. El diagnóstico es de ayer y `PanelAnalisis.astro` cambió después. Si los números de columnas o los presets ya no coinciden, ajusta el plan a lo que haya en el código y anótalo en la descripción del PR.
2. Escribe la lógica de anchos como función pura en `src/lib`, con pruebas en `tests/unit` (se ejecutan con `pnpm test:unit`). Casos mínimos: panel único, huérfano al final de fila, presets Clima, Calidad y Territorial, y todos los paneles visibles.
3. No cambies la estructura del DOM ni los atributos que usan las pruebas e2e y los lectores de pantalla.
4. Los heatmaps de 52 semanas conservan su scroll horizontal por debajo de su ancho mínimo.

## Reglas del repo

- Todo en español: código, comentarios, identificadores, mensajes de commit y texto de la interfaz.
- Commits en Conventional Commits en español (`feat(dengue): ...`, `fix: ...`).
- Nunca añadas `Co-Authored-By`, "Generated with Claude Code", enlaces de sesión ni ninguna línea de atribución, ni en commits ni en la descripción del PR. El commit lleva solo el mensaje del cambio.
- No uses `any` nuevo (`@typescript-eslint/no-explicit-any` está apagado solo por código antiguo de GeoJSON).
- Las gráficas son ECharts con renderer SVG. No importes `echarts` de forma estática en componentes.
- Redacción de comentarios y del PR: sin historia del proceso («se decidió que...»), sin tono defensivo, sin proclamar virtudes («robusto», «honesto»), sin mayúsculas para enfatizar, sin incisos entre rayas, sin negritas en exceso, sin construcciones «no es X, es Y» encadenadas.
- No menciones apodos internos del proyecto. Usa nombres funcionales.

## Entorno

- Package manager: pnpm 9 (Node 22). La instalación ya está hecha por el script de configuración.
- No hay backend en la nube. `/dengue` carga datos de la API, así que no podrás ver el resultado con datos reales y las pruebas e2e que usan el backend real fallarán. Eso no es una regresión: no las ejecutes como criterio de aceptación. Las que usan mocks (`respiratorio`, `fichas-departamentales`) sí pueden ejecutarse si logras instalar Chromium.
- Playwright usa 1 worker a propósito. No lo cambies.
- Si `fichas-departamentales.spec.ts` falla con "resolved to 5 elements", es la barra de desarrollo de Astro (hay paneles con su propio `h1`), no tu cambio. Desactívala con `pnpm exec astro preferences disable devToolbar --global`.

## Sin backend: qué comprobar y cómo

La distribución horizontal (anchos, huecos al final de fila, presets, ocultar y mostrar paneles) depende del estado de la distribución y de CSS, no de la API. Con los paneles en su estado de error o de carga puedes medir cada caja con Playwright (`boundingBox`) y comprobar, a 1440 y a 768 px, que cada fila llena el ancho disponible y que ningún panel queda solo con la mitad de la fila vacía. Eso cubre las causas A, B y C del diagnóstico.

La altura real de los paneles (causa D) y el aspecto con datos no se pueden comprobar así: un panel con error mide menos que uno con el mapa o un heatmap cargado.

- Si quieres acercarte a lo real, simula la API con `page.route` como hacen `tests/e2e/respiratorio.spec.ts` y `tests/e2e/fichas-departamentales.spec.ts`, con respuestas mínimas para los endpoints que consume `/dengue` (`src/lib/analisis-api.ts`).
- Limita el tiempo que dedicas a eso. Si los mocks no salen en un tiempo razonable, quédate con la verificación geométrica con paneles en estado de error y dilo en la descripción del PR, indicando qué no pudiste ver (alturas y aspecto con datos).
- No intentes levantar el backend real: necesita FastAPI y base de datos y no está disponible aquí.

## Verificación

Ejecuta y deja pasar: `pnpm check`, `pnpm lint`, `pnpm format:check`, `pnpm test:unit`, `pnpm build`. Si puedes abrir un navegador, captura `/dengue` a 1440 px y a 768 px con distintos presets y paneles ocultos. Si no puedes, dilo en el PR.

## Entrega

- Trabaja en una rama nueva a partir de esta, llamada `feat/distribucion-paneles`.
- En el último commit, borra este archivo (`docs/tareas/distribucion-paneles.md`): son instrucciones, no documentación del proyecto.
- Abre un PR hacia `main`. No hagas merge. En la descripción cuenta qué cambió, qué verificaste y qué no pudiste verificar.

---

# Diagnóstico y Propuestas de Solución: Distribución de Paneles en el Workspace Analítico

Este documento analiza el problema visual de los espacios vacíos ("huecos") en el espacio de análisis epidemiológico (`src/pages/dengue.astro`), las causas técnicas en el código fuente y las propuestas para desarrollar una solución propia, ligera y accesible sin librerías externas.

---

## 1. El Problema

Cuando el usuario interactúa con el espacio de análisis (cambia de preset en la barra de herramientas, oculta o muestra paneles en el selector o cambia el tamaño de un panel individual), la disposición visual resultante a menudo presenta defectos notorios:

1. **Grandes huecos en blanco al final de las filas:** Paneles que quedan aislados ocupando únicamente el 25%, 33% o 50% del ancho de la pantalla, dejando la otra mitad o dos tercios de la fila como un vacío estéril.
2. **Presets desbalanceados por defecto:** Vistas predefinidas del sistema (como *Clima*, *Calidad* o *Territorial*) nacen con espacios en blanco a la derecha sin que el usuario haya tocado ninguna configuración.
3. **Colapso a un diseño plano y desestructurado:** La composición armónica inicial (mapa a la izquierda, gráficos a la derecha) se desmorona en cuanto el usuario altera cualquier panel, convirtiéndose en una lista de bloques sin balance.
4. **Experiencia deficiente en pantallas medianas (tablets / portátiles pequeños):** Entre 640px y 1279px, la interfaz cae en un apilamiento vertical de una sola columna kilométrica, desperdiciando el espacio horizontal disponible.

---

## 2. Las Causas Técnicas

Al inspeccionar `src/components/analisis/PanelAnalisis.astro` y `src/lib/analisis-layout-state.ts`, se identifican cuatro causas raíz:

### Causa A: Aritmética rígida de 12 columnas con anchos fijos
El contenedor principal usa un CSS Grid tradicional de 12 columnas (`xl:grid-cols-12`). Los tamaños de los paneles están mapeados a anchos estáticos:
- `pequeno`: 3 columnas (25%)
- `mediano`: 4 columnas (33.3%)
- `grande`: 6 columnas (50%)

**El fallo matemático:** Si la suma de las columnas de los paneles visibles no es múltiplo exacto de 12, el espacio sobrante queda vacío:
- **Preset Clima:** Mapa (4 cols) + Dispersión (6 cols) = **10 columnas** $\rightarrow$ **2 columnas (16.7%) vacías a la derecha**.
- **Preset Calidad:** Disponibilidad (6 cols) + Calidad (4 cols) = **10 columnas** $\rightarrow$ **2 columnas vacías**.
- **Preset Territorial:** Mapa (6 cols) + Presión (6 cols) en Fila 1; Departamentos (6 cols) en Fila 2 $\rightarrow$ **6 columnas (50%) totalmente en blanco en la Fila 2**.
- **Panel único:** Si el usuario activa solo 1 panel (ej. Canal endémico o Mapa), este mide 6 columnas y deja **el 50% de la pantalla en blanco**.

### Causa B: La "composición optimizada" es de tipo todo-o-nada
El componente tiene una función llamada `esVistaGeneralOptimizada`:
- Solo se activa si la vista es `general` **y** están exactamente los 4 paneles predeterminados **y** tienen sus tamaños de fábrica.
- En cuanto esa condición se cumple, se crea una estructura de 2 columnas principales (4 cols para mapa, 8 cols para análisis con un subgrid interno).
- Pero **en cuanto el usuario apaga un solo panel o cambia un tamaño**, la condición se vuelve `false` y los contenedores se convierten en `contents`. Todos los paneles pasan a ser elementos directos de un grid plano sin jerarquía ni compensación de espacios.

### Causa C: Brecha responsive entre móvil y escritorio grande
El grid salta directamente de `grid-cols-1` a `xl:grid-cols-12` (1280px). No existe ninguna definición para los escalones `md:` (768px) ni `lg:` (1024px). Esto genera dos extremos: o se muestra un panel único en móvil, o una columna única gigante en tablet, o un grid rígido en monitores grandes.

### Causa D: Asimetría en las alturas intrínsecas
Los paneles tienen naturalezas y alturas muy diferentes:
- El mapa (`MapaDepartamentos`) y la matriz de calor (`HeatmapDepartamentos`) superan los 480–550 px de alto.
- Las curvas y resúmenes de calidad rondan los 260–340 px.
En un grid plano sin agrupación semántica, emparejar un panel alto con uno bajo en la misma fila genera vacíos verticales debajo del más corto.

---

## 3. Evaluación de Librerías Existentes vs. Solución Propia

| Alternativa | Tipo | Pros | Por qué NO se recomienda en este repo |
| :--- | :--- | :--- | :--- |
| **Gridstack.js** | Grid drag & drop / resize | Auto-empaqueta hacia arriba; popular en dashboards. | Rompe la accesibilidad (posicionamiento absoluto desalineado del DOM); penaliza el bundle (~60-80 KB); provoca saltos y problemas de render con Leaflet y ECharts SVG; rompe `@media print`. |
| **Masonry / Muuri** | Mampostería (Pinterest) | Elimina huecos verticales. | Desordena el flujo de lectura lógico y analítico de los datos epidemiológicos. |
| **Golden Layout** | Ventanas acoplables tipo IDE | Muy configurable. | Demasiado complejo, pesado y hostil para una plataforma pública de consulta epidemiológica. |
| **Solución Propia** | TypeScript + CSS nativo | 0 KB de dependencias; 100% accesible; control total de la semántica de datos; compatible con impresión y Leaflet/ECharts. | Requiere implementar la lógica interna en el repositorio. |

---

## 4. Propuestas para Desarrollar la Solución Propia

### Propuesta 1: Normalizador Dinámico de Columnas (Algoritmo de "Fila Completa")
*Es la solución más directa y compatible con la estructura actual de 12 columnas.*

**Concepto:** Mantener la cuadrícula de 12 columnas de Tailwind, pero sustituir la asignación estática de `col-span` por una pequeña función pura en TypeScript que ajuste los anchos según el contexto de los paneles visibles:

1. **Regla de panel único:** Si hay exactamente 1 panel visible, se le asigna siempre `col-span-12` (ancho completo).
2. **Absorción de huérfanos (Fill the Row):** El algoritmo recorre los paneles visibles simulando las filas (hasta 12 columnas). Si el último panel de una fila queda solo (por ejemplo, ocupa 4 o 6 columnas y no hay más paneles que lo acompañen), se auto-expande a `col-span-12`.
3. **Corrección de los presets nativos:**
   - Preset *Clima*: Mapa (5 cols) + Clima (7 cols) = **12 cols**.
   - Preset *Calidad*: Disponibilidad (7 cols) + Auditoría (5 cols) = **12 cols**.
   - Preset *Territorial*: Fila 1 (6 + 6 = 12 cols); Fila 2: Departamentos expandido a **12 cols**.
4. **Ventajas:** Código mínimo (~30 líneas de TS), cero cambios en la estructura HTML/DOM, resuelve el 95% de los huecos horizontales de inmediato.

---

### Propuesta 2: Sistema Flexbox Proporcional (`flex-grow` fluido)
*La solución más flexible y moderna en CSS para eliminar huecos sin importar la resolución.*

**Concepto:** En lugar de forzar a los paneles a encajar en divisiones rígidas de doceavos, el contenedor pasa a ser un contenedor flexible con envoltura (`flex flex-wrap gap-4`):

1. **Comportamiento proporcional:** Cada panel define un ancho base mínimo según su tamaño (ej. `min-w-[420px]` para mediano, `min-w-[580px]` para grande) y una propiedad `flex-1` o `flex-grow`.
2. **Auto-distribución:**
   - Si caben dos paneles grandes en la fila, cada uno toma exactamente el **50%** del espacio.
   - Si caben tres paneles medianos, cada uno toma el **33.3%**.
   - Si un panel queda solo al final de la fila, `flex-grow: 1` hace que **absorba automáticamente todo el ancho restante**, sin dejar un solo píxel en blanco.
3. **Ventajas:** Adaptabilidad perfecta a cualquier ancho de pantalla (ultrawide, laptops intermedias, tablets apaisadas) de forma puramente declarativa y sin cálculos manuales de columnas.

---

### Propuesta 3: Composición Bi-Columna Semántica (Eje Espacial vs. Eje Analítico)
*La solución con mayor valor analítico y editorial.*

**Concepto:** El proyecto ya categoriza sus paneles en `src/components/analisis/PanelWorkspace.astro` en 4 arquetipos: `visor` (mapa), `matriz` (heatmaps), `traza` (curvas) y `registro` (calidad). Esta propuesta hace que la "vista optimizada" sea dinámica en vez de fija:

1. **Si el Mapa (`visor`) está activo:**
   - La pantalla se divide en dos columnas principales:
     - **Columna izquierda (Territorial):** Fija para el mapa (35% a 40% del ancho). Al ser vertical, acompaña armónicamente a los gráficos.
     - **Columna derecha (Analítica):** (60% a 65% del ancho). Dentro de ella, los paneles de matrices y trazas se apilan o forman un subgrid interno de 1 o 2 columnas que siempre llena el alto y el ancho disponible.
2. **Si el Mapa se oculta:**
   - La columna analítica se expande al 100% del ancho y organiza los paneles en una cuadrícula simétrica de 2 columnas estándar.
3. **Ventajas:** Resuelve tanto los huecos horizontales como la **asimetría vertical** provocada por la altura del mapa de El Salvador.

---

### Mejora Transversal: Incorporación del Breakpoint Intermedio (`md:`)
Independientemente de la propuesta elegida, es necesario dotar al workspace de soporte para resoluciones entre 768px y 1279px:
- En tablets (768px+), permitir cuadrículas de 2 columnas o paneles al 100% cuando superen su ancho mínimo legible.
- Mantener la regla de que los heatmaps de 52 semanas conserven su scroll horizontal (`overflow-x-auto`) cuando el contenedor sea menor a su ancho mínimo ideal (~760px), protegiendo la legibilidad de las celdas.

---

## 5. Tabla Comparativa de Propuestas

| Criterio | Propuesta 1 (Algoritmo Fila Completa) | Propuesta 2 (Flexbox Proporcional) | Propuesta 3 (Bi-Columna Semántica) |
| :--- | :--- | :--- | :--- |
| **Complejidad de desarrollo** | Baja (rápida de implementar) | Media (ajustes de CSS/Tailwind) | Media-Alta (reorganización de estructura) |
| **Eliminación de huecos horizontales** | Excelente (100% resuelto) | Excelente (100% fluido) | Excelente |
| **Balance de alturas verticales** | Aceptable | Bueno | Excelente (diseñado para balancear el mapa) |
| **Riesgo para accesibilidad y tests** | Nulo (mantiene el DOM actual) | Nulo | Muy bajo |
| **Impacto en bundle** | 0 KB | 0 KB | 0 KB |

---

## 6. Recomendación de Implementación

El camino más equilibrado y seguro para el proyecto consiste en **iniciar con la Propuesta 1 (Algoritmo de Fila Completa)** combinada con el escalón responsive `md:`. 

Esto elimina de inmediato todos los huecos en blanco de los presets y selecciones de usuario sin alterar la estructura DOM existente de los componentes ni comprometer los tests de Playwright. Si más adelante se busca un equilibrio estético superior para el mapa frente a los gráficos, se puede evolucionar hacia la **Propuesta 3**.
