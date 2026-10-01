// Transformaciones sobre el HTML ya renderizado de las páginas de texto largo
// (DocumentoTexto). Trabajan sobre la cadena porque el contenido llega de dos
// orígenes distintos: markdown de la Biblioteca y HTML escrito a mano en las
// páginas legales. Los dos producen `<h2>` planos al mismo nivel, sin
// anidarlos, y esa es la única forma que se asume aquí.

const BLOQUE_PRE = /<pre[\s\S]*?<\/pre>/g;
const ENCABEZADO_H2 = /<h2(?:\s[^>]*)?>[\s\S]*?<\/h2>/g;

/** Aplica `transformar` solo al texto que queda fuera de los bloques `<pre>`. */
function fueraDePre(html: string, transformar: (tramo: string) => string) {
  let resultado = '';
  let cursor = 0;
  for (const bloque of html.matchAll(BLOQUE_PRE)) {
    const inicio = bloque.index ?? 0;
    resultado += transformar(html.slice(cursor, inicio)) + bloque[0];
    cursor = inicio + bloque[0].length;
  }
  return resultado + transformar(html.slice(cursor));
}

/**
 * Sustituye el `<code>` en línea por un `<span class="termino">`. En la
 * documentación el recuadro monoespaciado se lee peor que el texto normal; los
 * bloques `<pre><code>` (comandos para copiar) se dejan intactos.
 */
export function sinCodigoEnLinea(html: string): string {
  return fueraDePre(html, (tramo) =>
    tramo
      .replace(/<code(?:\s[^>]*)?>/g, '<span class="termino">')
      .replace(/<\/code>/g, '</span>'),
  );
}

/**
 * Convierte cada `<h2>` y el contenido que le sigue hasta el siguiente `<h2>`
 * en un acordeón nativo (`<details>`). Lo que precede al primer `<h2>` queda
 * fuera, como introducción. El encabezado se conserva dentro del `<summary>`
 * para que siga apareciendo en la navegación por encabezados.
 *
 * `abiertos` indica cuántos acordeones arrancan desplegados, contados desde el
 * primero. Devuelve también cuántos acordeones se generaron.
 */
export function agruparEnAcordeones(
  html: string,
  abiertos = 1,
): { html: string; total: number } {
  const encabezados = [...html.matchAll(ENCABEZADO_H2)];
  const [primero] = encabezados;
  if (!primero) return { html, total: 0 };

  const introduccion = html.slice(0, primero.index ?? 0);
  const secciones = encabezados.map((encabezado, i) => {
    const inicio = (encabezado.index ?? 0) + encabezado[0].length;
    const fin = encabezados[i + 1]?.index ?? html.length;
    const cuerpo = html.slice(inicio, fin).trim();
    const abierto = i < abiertos ? ' open' : '';
    return (
      `<details class="acordeon"${abierto}>` +
      `<summary>${encabezado[0]}</summary>` +
      `<div class="acordeon-cuerpo">${cuerpo}</div>` +
      `</details>`
    );
  });

  return {
    html: `${introduccion}<div class="acordeones">${secciones.join('')}</div>`,
    total: encabezados.length,
  };
}
