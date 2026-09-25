---
titulo: "Arquitectura y reproducibilidad"
descripcion: "Tres servicios Docker, una copia de la base incluida en el repositorio y los pasos para levantar el sistema con git clone y docker compose up."
orden: 6
categoria: "Cómo funciona"
---

Para instalar EPI-Aetheris basta con el [repositorio](https://github.com/the-monolith-project/EPI-Aetheris) y Docker. El núcleo no depende de APIs de datos de pago ni de servicios en la nube obligatorios. Las rutas de archivo de esta página son relativas a la raíz del repositorio.

## Tres servicios

`docker-compose.yml` define una red (`aetheris_network`) y tres contenedores:

| Servicio | Qué es | Puerto |
|---|---|---|
| `db` | PostgreSQL 15 | 5432 |
| `backend` | FastAPI con `psycopg2`, sin ORM | 8000 (`/health`, `/docs`) |
| `web` | Astro, TypeScript, Leaflet y Tailwind | 4321 |

La primera vez que arranca con un volumen vacío, la base crea el esquema a partir de `db/migrations/*.sql` y carga `db/seed/seed_datos_reales.sql`, una copia de las tablas de datos hecha con `pg_dump --data-only` (ADR 0010). Así, quien clona el repositorio tiene el sistema funcionando con los mismos datos que el sitio público.

Equipo mínimo: 4 GB de RAM, procesador x86-64 de dos núcleos y unos 10 GB de disco.

## Cómo levantarlo

```bash
cp .env.example .env   # completar POSTGRES_*; .env no se sube al repositorio
docker compose up --build
```

La API queda en `http://localhost:8000` y el sitio en `http://localhost:4321`. La configuración de CORS del backend local ya admite ese origen.

Sin Docker, para desarrollo:

- Backend: `cd backend && pip install -r requirements.txt && uvicorn api.main:app --reload`, dentro de un entorno virtual.
- Web: `cd web && pnpm install && pnpm dev` (pnpm 9 mediante Corepack).

Los datos descargados y los archivos intermedios no se guardan en el repositorio. La copia de la base en `db/seed/` es la excepción, para que el sistema arranque con datos sin tener que repetir la descarga.

## Qué incluye la copia de la base

Un archivo de texto de unos 4,4 MB, sin los PDF originales. Contiene las tablas `semanas_epidemiologicas`, `boletines_procesados`, `casos_epidemiologicos`, `variables_ambientales` y `vigilancia_virus_respiratorios`, con 2.742 filas de IRA, 2.749 de neumonías y 3.028 de vigilancia de virus.

No incluye `regiones`, `tipos_evento` ni `fuentes_datos`, que las crean las propias migraciones, ni `schema_migrations`, que la crea el programa de migraciones.

La copia no se actualiza sola. Se regenera con `db/generar_seed.sh`, que además quita las instrucciones `DISABLE/ENABLE TRIGGER ALL` de `pg_dump`, porque en la base gestionada de Render el usuario de la aplicación no tiene permisos de superusuario.

## Migraciones en una base que ya existe

Con un volumen que ya tiene datos, Postgres no vuelve a ejecutar las migraciones iniciales. Para ese caso está `db/aplicar_migraciones.py` (ADR 0009):

```bash
python db/aplicar_migraciones.py --bootstrap   # una vez: registra las migraciones ya aplicadas
python db/aplicar_migraciones.py               # aplica solo los archivos nuevos
```

Se ejecuta desde el equipo anfitrión contra `localhost:5432`. No tiene marcha atrás: una migración con errores se corrige con otra migración.

## Tecnologías

- Backend: Python, FastAPI, scikit-learn (solo para el clasificador retirado), `pdfplumber` y `epiweeks` (semanas epidemiológicas de OPS/CDC, distintas de las semanas ISO 8601).
- Frontend: Astro, TypeScript, Tailwind CSS 4 y Leaflet, sin React ni Vue.
- Tablas, columnas y comentarios del código están en español.

Esta Biblioteca se escribe en Markdown y Astro la publica como colección de contenido. La documentación interna del equipo (decisiones de arquitectura, notas de contexto, informes de experimentos) está en `docs/` y no se publica aquí.

## Despliegue público

El sitio público está en Render y se configura en `render.yaml`: una base Postgres 15 gestionada, el backend en Docker (que aplica las migraciones antes de cada despliegue con `python db/aplicar_migraciones.py`) y el sitio estático de Astro, que se genera con `pnpm build` y publica la carpeta `dist/`. Los tres servicios están en la región `oregon`, y la API y la base se comunican por red privada.

Al publicar una versión nueva del frontend hay que subir `VERSION` en `web/public/sw.js`, para que los navegadores descarguen la estructura nueva del sitio en lugar de usar la guardada.
