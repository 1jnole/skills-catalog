## Why

El repo ya tiene un buen pipeline forge y una skill operativa (`low-token-execution`) para compactar una unidad de trabajo, pero las sesiones recientes mostraron fuentes repetidas de gasto de tokens a nivel de flujo:
- releer artefactos ya cerrados en lugar de empezar por el diff
- rerun completo antes de rerun focalizado cuando el cambio fue local
- repetir preflight y estado en micro-pasos en vez de hacerlo por cambio de fase
- convertir fallos de archive/apply ya limpios en re-trabajo más ancho del necesario

Eso no pide una nueva skill. Pide endurecer el workflow repo-local con heurísticas explícitas en `openspec/AGENTS.override.md`.

## What Changes

- Refine the `Low-token workflow` section in `openspec/AGENTS.override.md`.
- Add explicit heuristics for diff-first rereads, focal reruns before broad reruns, phase-boundary status checks, and minimal reconciliation on already-applied closeout failures.
- Keep `low-token-execution` as the task-local execution skill and keep these new rules at the repo workflow layer.

## Capabilities

### Modified Capabilities
- OpenSpec workflow guidance: stronger token-discipline heuristics for normal forge execution.

## Impact

- Updated repo workflow guidance: `openspec/AGENTS.override.md`
