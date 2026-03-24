## Context

El repo ya endureció `sourceRefs` para evitar documentos plausibles pero inexistentes y ya exige autoridad inspeccionable para `skill-implementation-forge` y `skill-eval-forge`. El hueco restante es semántico: todavía no queda suficientemente claro qué parte de la evidencia consultada durante contract authoring debe viajar dentro del handoff y cuál debe quedarse como contexto efímero del workspace.

En la práctica, esto produce briefs que pueden estar “grounded” en el momento de crearse, pero no son realmente portables porque siguen dependiendo de rutas auxiliares locales o de convenciones implícitas del repo donde se redactaron.

## Goals / Non-Goals

**Goals:**
- Hacer explícito que el brief aprobado es el único artefacto contractual inspeccionable que debe pasar de contract a implementation.
- Evitar que `sourceRefs` y otros campos del brief se conviertan en un inventario de ficheros locales consultados.
- Enseñar que ejemplos, templates y reference material que deban sobrevivir downstream se materializan en `references/` o `assets/` de la skill objetivo.
- Alinear las suites Promptfoo de las tres fases con este modelo de authority handoff.

**Non-Goals:**
- Eliminar el uso de paths exactos para identificar el brief aprobado o la implementación existente en las fases downstream.
- Cambiar el JSON schema base del Eval Brief más allá de su semántica operativa.
- Reabrir decisiones previas sobre response envelopes o terminal markers.

## Decisions

### Treat the approved brief as the only required contractual handoff artifact
El handoff entre contract e implementation sigue necesitando un artefacto inspeccionable y estable. La solución no es eliminar el brief path, sino prohibir que el contenido del brief dependa de rutas auxiliares del workspace de authoring.

Alternatives considered:
- Hacer todo inline y eliminar cualquier path entre fases. Rechazado porque choca con la necesidad repo-local de autoridad operativamente inspeccionable.
- Permitir paths auxiliares siempre que existan. Rechazado porque mantiene el acoplamiento al workspace original y debilita la portabilidad.

### Distill consulted repo context into the brief instead of preserving local file refs
Cuando contract authoring consulte `AGENTS.md`, specs, ejemplos o skill files del repo, la salida portable debe ser la regla, restricción o expectation destilada dentro del brief, no la ruta local misma.

Alternatives considered:
- Mantener `sourceRefs` como log de todo lo inspeccionado. Rechazado porque lo convierte en metadata histórica, no en autoridad útil downstream.

### Materialize reusable examples and templates in the target package
Si downstream necesita ejemplos largos, templates o reference content para implementar o evaluar la skill, el contrato debe congelar `packageShape` para que esa información viva en `references/` o `assets/` del paquete final.

Alternatives considered:
- Dejar esos materiales solo como `sourceRefs` o notas textuales en el brief. Rechazado porque implementation y eval seguirían dependiendo de material no portable o ambiguamente accesible.

### Enforce the new handoff model through Promptfoo and documentation together
La semántica nueva debe quedar reflejada en:
- specs OpenSpec
- `SKILL.md` y references de las forge skills
- suites Promptfoo de contract, implementation y eval

Solo tocar tests sin cambiar la documentación dejaría comportamiento correcto con guidance incorrecta; solo tocar guidance sin suites dejaría una regresión fácil.

## Risks / Trade-offs

- [El modelo puede sobrerreducir `sourceRefs` y perder trazabilidad humana] -> Mantener `sourceRefs` como autoridad portable mínima y dejar la trazabilidad exhaustiva fuera del brief.
- [Casos existentes pueden asumir que citar rutas locales reales sigue siendo válido] -> Añadir regresiones explícitas y actualizar ejemplos/anti-ejemplos en las tres fases.
- [La materialización en `references/` y `assets/` puede confundirse con obligación de scaffold] -> Reforzar que solo aplica cuando el contrato realmente congela esa necesidad en `authoring.packageShape`.
- [Promptfoo offline/live puede divergir tras cambiar semántica de handoff] -> Ejecutar primero validación focalizada por familia, luego las entrypoints repo-level y solo después archivar.

## Migration Plan

1. Actualizar primero specs y artefactos del slug hasta `openspec validate`.
2. Cambiar guidance en las tres forge skills y sus superficies de support material.
3. Endurecer suites Promptfoo y ajustar casos/fixtures afectados por la nueva semántica.
4. Ejecutar validaciones focalizadas y luego gates repo-level.
5. Registrar evidencia en `tasks.md`.
6. Archivar el slug solo si el diff y las validaciones quedan limpios.

Rollback:
- Revertir el slug completo si la nueva semántica rompe compatibilidad con handoffs existentes.
- Si falla solo una familia Promptfoo, mantener el cambio abierto y no archivar hasta reconciliar guidance y suite.

## Open Questions

- None. El modelo de handoff queda fijado para este slug como “brief path sí, refs auxiliares locales no”.
