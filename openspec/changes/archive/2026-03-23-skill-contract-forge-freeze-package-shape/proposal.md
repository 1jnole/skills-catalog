## Why

`skill-contract-forge` ya congela `skill.name` y `skill.description`, pero todavía no congela la forma mínima del paquete que la implementación debe materializar. Eso deja otro hueco real de handoff: aunque la skill quede bien definida funcionalmente, `skill-implementation-forge` sigue teniendo que improvisar si todo vive en `SKILL.md` o si debe separar `references/`, `scripts/`, `assets/` o `agents/`.

## What Changes

- Añadir `authoring.packageShape` al Eval Brief trigger para congelar la forma mínima del paquete.
- Enseñar en `skill-contract-forge` la regla de colocación de contenido: core en `SKILL.md`, consulta en `references/`, lógica repetitiva o frágil en `scripts/`, templates o recursos de salida en `assets/`, y `agents/openai.yaml` solo cuando haga falta metadata/UI/dependencies.
- Hacer `authoring.interface` obligatorio únicamente cuando `authoring.packageShape.supportFolders` incluya `agents`.
- Endurecer el schema, plantilla, ejemplos y Promptfoo contract gate para que los trigger payloads sin `packageShape` o con `agents` sin `interface` fallen.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: los trigger briefs ahora congelan también la forma mínima del paquete y cuándo `agents` está realmente justificado.
- `skill-contract-forge-eval-coverage-hardening`: el runtime soportado rechaza trigger payloads que omitan `authoring.packageShape` o pidan `agents` sin la interface mínima asociada.

## Impact

- Affected code: `packs/core/skill-contract-forge/`, `evals/contracts/skill-contract-forge/`, y la familia Promptfoo de `skill-contract-forge`.
- Affected interface: el Eval Brief trigger ahora requiere `authoring.packageShape`, y `authoring.interface` cuando `supportFolders` contiene `agents`.
- Out of scope: materializar carpetas en implementación, `evals/` per-skill, y hacer `agents/openai.yaml` obligatorio repo-wide.
