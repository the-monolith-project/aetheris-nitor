// Ciclo de vida de una gráfica ECharts: carga diferida, init con SVG,
// redimensionado y repintado al cambiar el tema. Sustituye el patrón que
// cada panel repetía con Plot (await import + ResizeObserver con debounce
// que volvía a renderizar todo).
import type { OpcionEcharts } from './echarts-base';
import { leerTokens } from './echarts-tema';
import type { TokensGrafico } from './echarts-tema';

type Echarts = typeof import('./echarts-base');
type Instancia = ReturnType<Echarts['echarts']['init']>;

let promesaEcharts: Promise<Echarts> | null = null;

/** Carga ECharts una sola vez, aunque monten varios paneles a la vez. */
export function cargarEcharts(): Promise<Echarts> {
  promesaEcharts ??= import('./echarts-base').catch((error) => {
    promesaEcharts = null;
    throw error;
  });
  return promesaEcharts;
}

export interface GraficoMontado {
  instancia: Instancia;
  /** Sustituye la opción (p. ej. al cambiar filtros) sin recrear la instancia. */
  actualizar(construir: (tokens: TokensGrafico) => OpcionEcharts): void;
  destruir(): void;
}

/**
 * Monta una gráfica dentro de `contenedor` (que debe tener alto definido).
 * `descripcion` va al `aria-label` del SVG; la alternativa textual completa
 * sigue siendo la tabla de cada panel.
 */
export async function montarGrafico(
  contenedor: HTMLElement,
  construir: (tokens: TokensGrafico) => OpcionEcharts,
  descripcion: string,
): Promise<GraficoMontado> {
  const { echarts } = await cargarEcharts();
  contenedor.replaceChildren();
  const instancia = echarts.init(contenedor, undefined, { renderer: 'svg' });
  let constructor = construir;

  const pintar = (): void => {
    instancia.setOption(constructor(leerTokens()), true);
    // exportar-grafico.ts busca svg[role="img"]; ECharts solo marca el div.
    const svg = contenedor.querySelector('svg');
    svg?.setAttribute('role', 'img');
    svg?.setAttribute('aria-label', descripcion);
  };
  pintar();

  const observadorTamano = new ResizeObserver(() => instancia.resize());
  observadorTamano.observe(contenedor);

  // Cambio de tema sin recargar: <html data-theme> o la preferencia del sistema.
  const observadorTema = new MutationObserver(pintar);
  observadorTema.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  const esquema = window.matchMedia('(prefers-color-scheme: dark)');
  esquema.addEventListener('change', pintar);

  return {
    instancia,
    actualizar(nuevo) {
      constructor = nuevo;
      pintar();
    },
    destruir() {
      observadorTamano.disconnect();
      observadorTema.disconnect();
      esquema.removeEventListener('change', pintar);
      instancia.dispose();
    },
  };
}
