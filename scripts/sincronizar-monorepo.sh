#!/usr/bin/env bash
# Copia el frontend de este repo (lo que está versionado en HEAD) al paquete
# web/ del monorepo EPI-Aetheris. Reemplaza src, tests y public completos, de
# modo que un archivo borrado aquí también se borra allá, y sobrescribe los
# archivos de configuración del paquete. No toca web/.astro ni docs/: los
# documentos de la Biblioteca tienen su propia copia en el monorepo.
#
# Uso: scripts/sincronizar-monorepo.sh <raíz del monorepo>
set -euo pipefail

destino="${1:?Uso: $0 <raíz del monorepo EPI-Aetheris>}"
origen="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

[ -d "$destino/web" ] || {
  echo "No existe $destino/web: ¿es la raíz del monorepo?" >&2
  exit 1
}

# Directorios que se reemplazan por completo y archivos sueltos de configuración.
DIRECTORIOS=(src tests public)
ARCHIVOS=(
  .dockerignore .prettierignore .prettierrc.mjs Dockerfile Dockerfile.e2e
  astro.config.mjs eslint.config.js package.json playwright.config.ts
  pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json
)

for d in "${DIRECTORIOS[@]}"; do
  rm -rf "${destino:?}/web/$d"
done

git -C "$origen" archive HEAD -- "${DIRECTORIOS[@]}" "${ARCHIVOS[@]}" |
  tar -x -C "$destino/web"
