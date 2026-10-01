import test from 'node:test';
import assert from 'node:assert/strict';
import {
  agruparEnAcordeones,
  sinCodigoEnLinea,
} from '../../src/lib/acordeones.ts';

test('cada h2 abre un acordeón con su contenido y solo el primero arranca abierto', () => {
  const { html, total } = agruparEnAcordeones(
    '<p>Intro</p><h2>Uno</h2><p>a</p><h3>sub</h3><p>b</p><h2 id="x">Dos</h2><p>c</p>',
  );
  assert.equal(total, 2);
  assert.match(html, /^<p>Intro<\/p><div class="acordeones">/);
  assert.equal(html.match(/<details/g)?.length, 2);
  assert.equal(html.match(/<details class="acordeon" open>/g)?.length, 1);
  assert.match(
    html,
    /<summary><h2>Uno<\/h2><\/summary><div class="acordeon-cuerpo"><p>a<\/p><h3>sub<\/h3><p>b<\/p><\/div>/,
  );
  assert.match(html, /<summary><h2 id="x">Dos<\/h2><\/summary>/);
});

test('sin h2 el contenido no cambia', () => {
  const entrada = '<p>Solo texto</p><ul><li>a</li></ul>';
  assert.deepEqual(agruparEnAcordeones(entrada), { html: entrada, total: 0 });
});

test('abiertos controla cuántos acordeones arrancan desplegados', () => {
  const entrada = '<h2>A</h2><p>1</p><h2>B</h2><p>2</p><h2>C</h2><p>3</p>';
  assert.equal(
    agruparEnAcordeones(entrada, 0).html.match(/ open>/g)?.length ?? 0,
    0,
  );
  assert.equal(
    agruparEnAcordeones(entrada, 2).html.match(/ open>/g)?.length,
    2,
  );
});

test('el código en línea pasa a span y los bloques pre se respetan', () => {
  const entrada =
    '<p>La tabla <code>tipos_evento</code> y <code class="x">Iv</code></p>' +
    '<pre><code>pnpm dev</code></pre><p><code>fin</code></p>';
  const salida = sinCodigoEnLinea(entrada);
  assert.match(salida, /<span class="termino">tipos_evento<\/span>/);
  assert.match(salida, /<span class="termino">Iv<\/span>/);
  assert.match(salida, /<pre><code>pnpm dev<\/code><\/pre>/);
  assert.match(salida, /<p><span class="termino">fin<\/span><\/p>/);
});
