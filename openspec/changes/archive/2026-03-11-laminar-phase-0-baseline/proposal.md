## Why

La migración a Laminar arranca desde un runner que mezcla piezas activas, legacy y restos de spike. Antes de renombrar comandos, mover carpetas o cambiar integraciones, la fase 0 necesita fijar un baseline verificable para que las fases siguientes preserven paridad en lugar de trabajar sobre supuestos.

## What Changes

- Documentar el inventario actual del runner de evals y clasificar sus piezas como `source of truth`, `legacy but still needed` o `stale / safe to ignore during migration`.
- Congelar `skill-forge` como único piloto de la migración hasta que exista paridad demostrada.
- Registrar la baseline funcional aceptada de `skill-forge`, incluyendo expectativas de benchmark y rutas de artefactos actualmente usadas.
- Identificar acoplamientos con artefactos legacy y drift de naming o documentación para que fases posteriores los retiren de forma intencional.
- Crear una nota canónica de fase 0 bajo `roadmap/` para centralizar inventario, clasificación y baseline sin sobrecargar `PLAN.md`.
- Alinear `PLAN.md` y `roadmap/` con el estado real actual del repo cuando existan diferencias demostrables.

Out of scope:
- Renombrar comandos, carpetas o módulos.
- Cambiar semántica de benchmark, scoring o gates.
- Retirar piezas legacy salvo que se demuestre que son completamente stale y fuera del flujo soportado.

## Capabilities

### New Capabilities
- `laminar-migration-baseline`: Define el baseline documental y verificable desde el que debe arrancar la fase 0 de la migración a Laminar.

### Modified Capabilities
- None.

## Impact

- `PLAN.md`
- `roadmap/README.md`
- `roadmap/laminar-migration-phase-0-tasks.md`
- `roadmap/laminar-migration-phase-0-baseline.md` o nombre equivalente bajo `roadmap/`
- `scripts/evals/README.md` y documentación relacionada del runner actual
- Nuevas notas o artefactos documentales que capturen inventario, clasificación y baseline de `skill-forge`
