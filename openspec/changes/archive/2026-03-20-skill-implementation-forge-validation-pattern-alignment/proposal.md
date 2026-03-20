## Why

`skill-implementation-forge` ya tiene una base útil, pero su spec permanente y su contract gate todavía no expresan con suficiente precisión el patrón de validación forge que ahora sí quedó claro en `skill-eval-forge`. Necesitamos cerrar ahora la precedencia entre `trigger`, `non-trigger` y `stop-and-ask` para que la skill de implementación sea robusta por criterio, no solo por suites en verde.

## What Changes

- Fortalecer la capability permanente de `skill-implementation-forge` para definir con claridad qué activa la skill, qué autoridad requiere y cuándo debe parar.
- Definir qué cuenta como approved contract artifact inspeccionable y qué no basta como autoridad operativa.
- Alinear `packs/core/skill-implementation-forge/SKILL.md` con esa frontera de validación sin copiar el envelope de otras forge skills.
- Endurecer el Promptfoo contract gate para cubrir precedencia, autoridad inspeccionable, widening separable y marker terminal exclusivo.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-implementation-forge`: strengthen implementation-phase trigger routing, inspectable contract authority, stop-and-ask precedence, and terminal-marker exclusivity.

## Impact

- Affected capability spec: `openspec/specs/skill-implementation-forge/spec.md`
- Affected skill: `packs/core/skill-implementation-forge/SKILL.md`
- Affected eval contract gate: `evals/engines/promptfoo/skill-implementation-forge/tests/contract.yaml`
