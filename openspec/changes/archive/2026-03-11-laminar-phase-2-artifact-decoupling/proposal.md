## Why

La fase 2 ya aisló la semántica del benchmark y la verificó funcionalmente con `skill-forge`, pero el flujo soportado todavía escribe artifacts detallados legacy por caso y conserva un fallback operativo a ese layout. Este follow-up cierra ese hueco para que la fase 2 cumpla de forma estricta su propio contrato sin adelantar trabajo de Laminar.

## What Changes

- Dejar de escribir `outputs/`, `timing.json`, `grading.json`, `feedback.json`, `with_skill/`, y `without_skill/` en nuevas iteraciones soportadas.
- Mantener como artifacts soportados de nuevas iteraciones solo `benchmark.json` y `run.json`.
- Mantener `--iteration` y `--retry-errors` como flags públicos, pero hacer que para nuevas iteraciones dependan solo de `benchmark.json` y `run.json`.
- Aislar cualquier lectura del layout legacy como compatibilidad histórica transitoria, fuera del flujo soportado nuevo.
- Actualizar tipos, schemas y docs activas para eliminar referencias soportadas a `output_path` y al layout detallado por caso.
- Corregir la instrucción de `skill-forge` donde haga falta para que los casos trigger mixtos con authoring primario y trabajo downstream diferido sigan produciendo `Classification: trigger`.
- Repetir la verificación funcional con una configuración de timeout suficiente para distinguir fallos del contrato frente a timeouts espurios del proveedor.

Out of scope:
- Integrar Laminar como path activo.
- Cambiar benchmark semantics o gates.
- Introducir dependencias nuevas.
- Reabrir o editar changes archivados de fase 1 o fase 2.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `laminar-pure-eval-logic`: La fase 2 debe cerrar el desacoplamiento de artifacts y retry para que las nuevas iteraciones soportadas persistan solo `benchmark.json` y `run.json`, sin depender del layout legacy detallado.

## Impact

- `scripts/evals/run/`
- `scripts/evals/domain/`
- `scripts/evals/grading/`
- `scripts/evals/README.md`
- `README.md`
- `packs/core/skill-forge/SKILL.md`
