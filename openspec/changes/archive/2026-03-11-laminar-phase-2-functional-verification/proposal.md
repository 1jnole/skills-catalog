## Why

La fase 2 se archivó con validación estructural y de tipos, pero sin la comprobación funcional completa exigida por sus propios behavioral checks. Hace falta un follow-up explícito para verificar con una iteración nueva que la semántica de `benchmark.json` sigue intacta y que el flujo usa `run.json` y resultados normalizados como se pretende.

## What Changes

- Ejecutar una iteración nueva de `skill-forge` después de los cambios de fase 2.
- Verificar que esa iteración genera `benchmark.json` y `run.json` con la forma esperada.
- Comparar la semántica del benchmark resultante contra la baseline congelada de fase 0.
- Verificar que el camino de reutilización o retry usa `benchmark.json` como fuente primaria y no depende del layout legacy como source of truth.
- Registrar evidencia funcional en OpenSpec para cerrar de forma rigurosa la fase 2.

Out of scope:
- Cambios nuevos de arquitectura de fase 3.
- Rediseño adicional de la lógica pura salvo que la verificación encuentre una regresión real.

## Capabilities

### New Capabilities
- `laminar-phase-2-verification`: Define la verificación funcional necesaria para considerar realmente cerrada la fase 2.

### Modified Capabilities
- `laminar-pure-eval-logic`: La fase 2 SHALL quedar respaldada por evidencia funcional real, no solo por typecheck y revisión estructural.

## Impact

- `openspec/changes/laminar-phase-2-functional-verification/`
- `roadmap/laminar-migration-phase-2-tasks.md` si hace falta aclarar el cierre operativo
- evidencia de ejecución sobre `packs/core/skill-forge/evals/runs/`
