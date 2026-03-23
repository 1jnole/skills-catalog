## Why

`skill-contract-forge` ya congela `authoring.packageShape`, pero `skill-implementation-forge` todavía no lo trata como autoridad explícita de materialización. Eso deja un hueco práctico: la implementación puede seguir creando scaffolding de más, ignorar la forma mínima congelada, o no saber qué hacer con briefs legacy que todavía no traen `packageShape`.

## What Changes

- Hacer que `skill-implementation-forge` trate `authoring.packageShape` como autoridad operativa cuando el contrato aprobado lo incluya.
- Añadir compatibilidad mínima para briefs legacy sin `packageShape`: default a `SKILL.md` solo y sin inferir carpetas extra.
- Hacer `stop-and-ask` cuando el contrato pide `agents` pero no congela la interface mínima necesaria para materializar `agents/openai.yaml`.
- Endurecer las suites Promptfoo de `skill-implementation-forge` para cubrir trigger positivo con `packageShape`, trigger legacy sin `packageShape`, y regresión `agents` sin `interface`.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-implementation-forge`: la implementación ahora obedece `packageShape` cuando está congelado y mantiene un fallback conservador para contratos legacy.
- `skill-implementation-forge-promptfoo-family`: la familia compara también el comportamiento alrededor de `packageShape`, incluyendo el caso `agents` sin interface.

## Impact

- Affected code: `packs/core/skill-implementation-forge/` y la familia Promptfoo de `skill-implementation-forge`.
- Affected interface: `skill-implementation-forge` pasa a interpretar `authoring.packageShape` y `authoring.interface` como parte del contrato aprobado cuando existan.
- Out of scope: cambiar `skill-contract-forge`, hacer `agents/openai.yaml` obligatorio repo-wide, o introducir un runtime offline específico para esta familia.
