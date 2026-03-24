## Why

El flujo forge ya exige autoridad inspeccionable entre fases, pero todavía permite que el brief arrastre rutas locales auxiliares como si fueran parte durable del handoff. Eso hace que el contrato dependa del workspace donde se redactó en vez de viajar como un artefacto portable y suficiente.

## What Changes

- Endurecer `skill-contract-forge` para que el brief aprobado siga siendo el único handoff inspeccionable requerido, pero sin filtrar referencias auxiliares a ficheros locales dentro del payload.
- Aclarar que la evidencia repo-local consultada durante contract authoring debe destilarse dentro del brief y, si se necesita como material reusable downstream, materializarse vía `references/` o `assets/` en la skill objetivo.
- Alinear `skill-implementation-forge` y `skill-eval-forge` para que consuman el brief aprobado como autoridad operativa sin exigir ni propagar refs auxiliares del workspace de autoría.
- Endurecer las familias Promptfoo afectadas para cubrir el nuevo modelo de handoff portable y los edge cases de ejemplos/templates que deben empaquetarse.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: los trigger briefs deben ser portables y no filtrar refs auxiliares del workspace de authoring.
- `skill-contract-forge-eval-coverage-hardening`: la cobertura endurecida debe detectar trigger briefs que preservan rutas locales auxiliares en vez de destilar o empaquetar la autoridad.
- `skill-implementation-forge`: la implementación debe tratar el brief aprobado como única autoridad contractual inspeccionable requerida y materializar ejemplos/templates en el paquete cuando el contrato lo pida.
- `skill-implementation-forge-promptfoo-family`: la familia Promptfoo debe cubrir el handoff “brief path sí, refs auxiliares no”.
- `skill-eval-forge`: la autoría de evals debe alinearse con brief aprobado + implementación existente, sin depender de refs auxiliares del workspace original.
- `skill-eval-forge-promptfoo-family`: la familia Promptfoo debe cubrir que la autoridad downstream proviene del brief y de la implementación, no de rutas históricas de authoring.
- `skill-forge-workflow-authority`: el workflow repo-default debe documentar el handoff forge como portable entre fases.

## Impact

- Affected code: `packs/core/skill-contract-forge/`, `packs/core/skill-implementation-forge/`, `packs/core/skill-eval-forge/`, `evals/engines/promptfoo/skill-contract-forge/`, `evals/engines/promptfoo/skill-implementation-forge/`, `evals/engines/promptfoo/skill-eval-forge/`.
- Affected interface: cambia la semántica de `sourceRefs` y del handoff entre fases, no el shape base del brief ni los terminal markers.
- Out of scope: cambiar el orden general `contract -> implementation -> eval`, introducir dependencias nuevas, o rediseñar el runtime Promptfoo.
