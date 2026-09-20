import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const RUTAS_LEGALES = [
  '/legal/privacidad',
  '/legal/terminos',
  '/legal/aviso-legal',
  '/contacto',
  '/acerca-de',
];

test.describe('Páginas legales y canales de confianza', () => {
  for (const ruta of RUTAS_LEGALES) {
    test(`la ruta ${ruta} responde 200, tiene un único h1 y navegación funcional`, async ({
      page,
    }) => {
      const response = await page.goto(ruta);
      expect(response?.status()).toBe(200);

      // Debe tener un único h1
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).not.toBeEmpty();

      // Navegación principal y pie de página accesibles
      await expect(
        page.locator('nav[aria-label="Navegación principal"]'),
      ).toBeVisible();
      await expect(page.locator('nav[aria-label="Pie de página"]')).toBeAttached();

      // Enlace de inicio/vuelta
      await expect(page.locator('a[aria-label="EPI-Aetheris, inicio"]')).toHaveAttribute(
        'href',
        '/',
      );
    });
  }

  test('ninguna página legal contiene marcadores pendientes « (falla deliberadamente hasta resolver §3)', async ({
    page,
  }) => {
    // Nota de CAPA_LEGAL_Y_CONFIANZA.local.md §11.2:
    // "este test debe fallar hasta que §3 se resuelva; es deliberado."
    // Marcadores pendientes de §3: «RESPONSABLE», «DOMICILIO», «CORREO_CONTACTO», «CORREO_SEGURIDAD», «JURISDICCION».
    test.fail(
      true,
      'Bloqueo deliberado previo al despliegue: faltan datos reales de §3',
    );
    for (const ruta of RUTAS_LEGALES) {
      await page.goto(ruta);
      const contenido = await page.content();
      expect(contenido).not.toContain('«');
    }
  });

  test('accesibilidad WCAG en /legal/privacidad y /404 con AxeBuilder', async ({
    page,
  }) => {
    await page.goto('/legal/privacidad');
    const resultadosPrivacidad = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(resultadosPrivacidad.violations).toEqual([]);

    await page.goto('/404');
    const resultados404 = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(resultados404.violations).toEqual([]);
  });

  test('una ruta inexistente muestra la página 404 con navegación intacta', async ({
    page,
  }) => {
    await page.goto('/ruta-inexistente-de-prueba-404');
    await expect(page.locator('h1')).toContainText('Esta página no existe');
    await expect(
      page.locator('nav[aria-label="Navegación principal"]'),
    ).toBeVisible();
    await expect(page.locator('nav[aria-label="Pie de página"]')).toBeAttached();
    await expect(
      page.getByRole('link', { name: /Ir a Inicio/ }),
    ).toHaveAttribute('href', '/');
  });
});
