# Tabla de entrypoints temporales (v1)

## Objetivo
Cerrar la precondición documental para los lotes de borrado: qué entrypoints son contrato temporal, cuáles son compatibilidad y cuáles son internos.

## Estado (2026-03-13)
- **Contrato público temporal (soportado):**
  - `npm run read-evals -- -- ...`
  - `npm run run-evals -- -- ...`
- **Interno (no contrato público):**
  - `scripts/evals/cli/*`
  - `scripts/evals/application/*`
  - `scripts/evals/domain/*`
  - `scripts/evals/infrastructure/*`
  - `scripts/evals/compatibility/*` (excepto el alias documentado arriba)

## Decisión de Gate B (v1)
El contrato de `--iteration` y `--retry-errors` **sobrevive en v1** como parte de `run-evals`:
- se mantiene `--iteration` para reejecutar una iteración existente,
- se mantiene `--retry-errors` para reintentar solo casos con error.

`run-iteration` ya fue retirado; el contrato canónico queda concentrado en `read-evals` y `run-evals`.
