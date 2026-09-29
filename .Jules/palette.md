# Palette's Journal - Critical UX & A11y Learnings

## 2025-05-18 - Explicit ARIA Labels on Export/Download Action Buttons
**Learning:** In data visualization components (e.g. charts, heatmaps, epidemic curves), export or download buttons labeled with concise visual text (like "Descargar CSV") lack full context for screen readers when navigated out of context or in button lists.
**Action:** Always provide explicit, descriptive `aria-label` attributes on data export buttons (e.g., `aria-label="Exportar datos de la curva epidémica nacional a CSV"`) to explicitly describe what dataset is being exported.
