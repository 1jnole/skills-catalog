## Why

La fase 0 dejó fijado el baseline real del runner. La fase 1 necesita limpiar nombres y límites públicos para que las fases posteriores trabajen sobre una superficie consistente, sin tocar todavía scoring, gates ni semántica de benchmark.

## What Changes

- Introducir `run-evals` como nombre del comando público soportado para ejecutar evals.
- Mantener `run-lmnr-eval` solo como alias interno transicional, si sigue siendo necesario durante la migración.
- Establecer `scripts/evals/platforms/laminar/` como ubicación canónica para la integración de Laminar.
- Reservar `scripts/evals/providers/` exclusivamente para model providers.
- Actualizar documentación y Mermaid para describir Laminar como observability/eval platform, no como backend ni como source of truth.
- Corregir el baseline documental donde haga falta para reflejar que `scripts/evals/lmnr/` existe hoy como ubicación transicional en source.

Out of scope:
- Cambiar scoring, gates, benchmark aggregation o semántica de `benchmark.json`.
- Rediseñar `run.json`.
- Introducir una abstracción genérica tipo `EvalPlatformAdapter`.
- Retirar el runner legacy completo en esta fase.

## Capabilities

### New Capabilities
- `laminar-public-boundaries`: Define la superficie pública, naming y límites de carpetas para la fase 1 de la migración Laminar.

### Modified Capabilities
- `laminar-migration-baseline`: La baseline de migración debe seguir reflejando el estado real actual y sus notas transicionales cuando la fase 1 ajuste documentación y límites canónicos.

## Impact

- `scripts/evals/`
- `README.md`
- `AGENTS.md`
- `scripts/evals/README.md`
- `PLAN.md`
- `roadmap/laminar-migration-phase-0-baseline.md`
- `roadmap/laminar-migration-phase-1-tasks.md`
