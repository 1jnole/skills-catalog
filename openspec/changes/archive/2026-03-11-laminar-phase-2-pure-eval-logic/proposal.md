## Why

Tras la fase 1, la superficie pública y los límites principales ya están más claros, pero la semántica del benchmark sigue acoplada al runner actual y a su layout detallado de artefactos. La fase 2 necesita aislar scoring, gates y benchmark aggregation para que la migración a Laminar no cambie qué significa pasar una eval.

## What Changes

- Congelar explícitamente como source of truth `Eval Brief`, `evals.json`, Zod schemas, domain types y benchmark semantics.
- Extraer scoring, gates y benchmark aggregation a lógica runner-neutral que consuma resultados normalizados.
- Definir `run.json` con naming neutral y sin campos vendor-specific.
- Reducir la dependencia del benchmark respecto al layout detallado de artefactos legacy.
- Actualizar docs y diagramas para reflejar que Laminar no define la semántica del benchmark.

Out of scope:
- Retirar la integración legacy completa.
- Rediseñar la integración Laminar.
- Introducir una interfaz genérica de platform.
- Cambiar la semántica actual de `benchmark.json`.

## Capabilities

### New Capabilities
- `laminar-pure-eval-logic`: Define la lógica pura y neutral para scoring, gates, benchmark aggregation y `run.json` en la fase 2.

### Modified Capabilities
- `laminar-public-boundaries`: La documentación pública y los límites de fase 1 deben seguir siendo consistentes cuando la fase 2 declare que benchmark semantics y source of truth son locales al repo.
- `laminar-migration-baseline`: La baseline y los documentos de migración deben reflejar que la semántica del benchmark permanece local mientras se reduce el acoplamiento con artefactos legacy.

## Impact

- `scripts/evals/domain/`
- `scripts/evals/run/`
- `scripts/evals/grading/`
- `scripts/evals/platforms/laminar/`
- `scripts/evals/README.md`
- `PLAN.md`
- `roadmap/laminar-migration-phase-0-baseline.md`
- `roadmap/laminar-migration-phase-2-tasks.md`
- stable OpenSpec specs under `openspec/specs/`
