## Context

La documentación oficial de skills y la skill built-in `skill-creator` tratan `name` y `description` como metadata de activación. Nuestro contrato actual ya congela ambos campos, pero no enseña con suficiente precisión cómo debe escribirse `skill.description`. El resultado es que el modelo puede devolver una descripción correcta en forma, pero floja en routing.

## Goals / Non-Goals

**Goals:**
- Hacer explícito que `skill.description` es metadata de activación.
- Evitar descripciones que solo resumen el deliverable o reformulan `singleJob`.
- Cubrir la regresión con Promptfoo sin cambiar el schema JSON.

**Non-Goals:**
- Cambiar el shape del Eval Brief.
- Endurecer `sourceRefs` en este slug.
- Tocar `skill-implementation-forge` o `skill-eval-forge`.

## Decisions

### Standardize an activation-oriented description pattern
La skill debe enseñar un patrón claro y portable:
- describir cuándo usar la skill
- describir límites negativos cercanos

No se exige una plantilla exacta a nivel de schema, pero sí se permite recomendar una forma estable del tipo `Use this skill when ... Do not use it for ...`.

### Derive description from activation boundary, not from singleJob
`authoring.singleJob` y `skill.description` no cumplen el mismo papel.
- `singleJob` define la operación interna
- `skill.description` debe resumir la frontera de activación usando `activationProbes` y `negativeSignals`

### Keep enforcement in skill text and Promptfoo
Este cambio es semántico, no estructural. Por eso debe vivir en:
- `SKILL.md`
- plantilla y ejemplos
- Promptfoo contract coverage

No hace falta cambiar el JSON schema porque la forma del campo `description` ya es correcta.

## Risks / Trade-offs

- [Las assertions pueden quedar demasiado literales] -> recomendar una forma estable en la skill y en la plantilla para que la cobertura sea clara sin volverse frágil.
- [El modelo puede seguir usando verbos de output como “produce”] -> añadir anti-ejemplos explícitos y una regresión dedicada en Promptfoo.
- [La descripción puede duplicar demasiado `negativeSignals`] -> enseñar a resumir solo los boundaries negativos cercanos, no toda la lista.
