import * as Plot from '@observablehq/plot';

export const ESTILO_PLOT = {
  background: 'transparent',
  color: 'var(--color-ink-muted)',
  fontFamily: 'var(--font-mono)',
};

export const MARGENES = {
  matriz: {
    marginLeft: 110,
    marginBottom: 48,
    marginTop: 12,
    marginRight: 20,
  },
  traza: {
    marginLeft: 60,
    marginBottom: 48,
    marginTop: 12,
    marginRight: 20,
  },
};

export function ejeSemana(
  desde = 1,
  hasta = 53,
  opciones?: { discreto?: boolean; ticks?: number; label?: string | null },
) {
  const ticks = opciones?.ticks ?? 10;
  const label =
    opciones?.label !== undefined ? opciones.label : 'Semana epidemiológica';
  const domain = opciones?.discreto
    ? Array.from({ length: hasta - desde + 1 }, (_, indice) => desde + indice)
    : [desde, hasta];

  return {
    domain,
    label,
    tickFormat: (valor: number | string) =>
      `SE${String(valor).padStart(2, '0')}`,
    ticks,
  };
}

export function marcoPlot(plotInstance?: typeof Plot) {
  const P = plotInstance ?? Plot;
  return P.frame({ stroke: 'var(--color-border)' });
}
