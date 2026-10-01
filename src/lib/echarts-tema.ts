// Tema de ECharts. Solo importa tipos: los componentes lo cargan de forma
// estática sin arrastrar ECharts (ver echarts-base.ts).
import type { OpcionEcharts } from './echarts-base';

/** Tokens de tokens.css resueltos a valores concretos. */
export interface TokensGrafico {
  tinta: string;
  tintaSuave: string;
  borde: string;
  superficie: string;
  acento: string;
  fuente: string;
}

/**
 * ECharts dibuja con valores literales y no resuelve `var(--...)`, así que se
 * leen del DOM. Hay que volver a leerlos al cambiar el tema (ver
 * echarts-montaje.ts).
 */
export function leerTokens(): TokensGrafico {
  const estilo = getComputedStyle(document.documentElement);
  const token = (nombre: string, respaldo: string) =>
    estilo.getPropertyValue(nombre).trim() || respaldo;
  return {
    tinta: token('--color-ink', '#040316'),
    tintaSuave: token('--color-ink-muted', '#4c5a56'),
    borde: token('--color-border', '#e0e0e6'),
    superficie: token('--color-surface', '#ffffff'),
    acento: token('--color-accent', '#183e39'),
    fuente: token('--font-mono', 'ui-monospace, monospace'),
  };
}

export function reducirMovimiento(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Etiqueta de semana epidemiológica: 5 -> "SE05". */
export function etiquetaSemana(valor: number | string): string {
  return `SE${String(valor).padStart(2, '0')}`;
}

/**
 * Opción común a todas las gráficas: tipografía, rejilla, tooltip y ARIA.
 * Cada gráfica la extiende con `{ ...crearOpcionBase(t), series, ... }`.
 */
export function crearOpcionBase(
  tokens: TokensGrafico,
  extra: {
    grid?: Record<string, unknown>;
    tooltip?: Record<string, unknown>;
    legend?: Record<string, unknown>;
  } = {},
): OpcionEcharts {
  return {
    animation: !reducirMovimiento(),
    animationDuration: 400,
    backgroundColor: 'transparent',
    textStyle: { color: tokens.tintaSuave, fontFamily: tokens.fuente },
    // Decals desactivados por defecto: en rampas ordenadas (bandas, mapas de
    // calor) el tono ya distingue; cada gráfica cualitativa los activa.
    // La descripción autogenerada de ECharts sale en inglés y pisa el
    // aria-label del panel: se apaga y montarGrafico etiqueta el SVG en
    // español. La alternativa textual completa es la tabla de cada panel.
    aria: { enabled: true, label: { enabled: false }, decal: { show: false } },
    grid: { left: 52, right: 20, top: 16, bottom: 40, ...extra.grid },
    tooltip: {
      trigger: 'axis',
      confine: true,
      backgroundColor: tokens.superficie,
      borderColor: tokens.borde,
      textStyle: { color: tokens.tinta, fontFamily: tokens.fuente },
      ...extra.tooltip,
    },
    legend: {
      bottom: 0,
      textStyle: { color: tokens.tintaSuave, fontFamily: tokens.fuente },
      ...extra.legend,
    },
  };
}

/** Eje de semanas epidemiológicas con etiquetas "SE05". */
export function ejeSemana(
  tokens: TokensGrafico,
  desde = 1,
  hasta = 53,
  etiqueta: string | null = 'Semana epidemiológica',
): OpcionEcharts {
  return {
    type: 'value',
    min: desde,
    max: hasta,
    name: etiqueta ?? undefined,
    nameLocation: 'middle',
    nameGap: 28,
    nameTextStyle: { color: tokens.tintaSuave },
    axisLabel: {
      formatter: etiquetaSemana,
      color: tokens.tintaSuave,
      hideOverlap: true,
    },
    axisLine: { lineStyle: { color: tokens.borde } },
    splitLine: { show: false },
  };
}
