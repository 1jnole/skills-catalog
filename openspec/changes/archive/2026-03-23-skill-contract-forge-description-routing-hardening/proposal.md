## Why

El dogfooding real ha mostrado que `skill-contract-forge` ya congela `skill.description`, pero todavía permite descripciones que suenan a resumen del deliverable o a paráfrasis de `authoring.singleJob`. Eso deja un hueco práctico: la metadata queda estructuralmente presente, pero no cumple bien la función de routing implícito que sí tienen `name` y `description` en `SKILL.md`.

## What Changes

- Endurecer `skill-contract-forge` para que `skill.description` se redacte como metadata de activación y boundary, no como resumen interno del output.
- Enseñar explícitamente que la descripción debe sintetizar cuándo usar la skill y cuándo no usarla, apoyándose en `activationProbes` y `negativeSignals`.
- Añadir ejemplos y anti-ejemplos de descripciones demasiado orientadas a output.
- Endurecer la familia Promptfoo de `skill-contract-forge` para vigilar esta regresión.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: los trigger briefs siguen congelando `skill.description`, pero ahora deben hacerlo con semántica de activación y no de deliverable.
- `skill-contract-forge-eval-coverage-hardening`: la cobertura endurecida ahora detecta la regresión donde la descripción se formula como output summary en vez de routing metadata.

## Impact

- Affected code: `packs/core/skill-contract-forge/` y la familia Promptfoo de `skill-contract-forge`.
- Affected interface: no cambia el shape del Eval Brief; cambia la semántica esperada de `skill.description`.
- Out of scope: `sourceRefs`, `skill-implementation-forge`, y cualquier cambio en `packageShape`.
