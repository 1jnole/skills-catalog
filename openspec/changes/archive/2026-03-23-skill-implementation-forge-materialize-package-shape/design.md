## Context

El slug anterior ya cerró la parte contractual del handoff: los briefs nuevos pueden congelar `packageShape`. Este slug se mantiene estrictamente en la fase de implementación y solo adapta cómo `skill-implementation-forge` debe obedecer ese contrato, sin renegociarlo ni mover el scope a eval authoring.

## Goals / Non-Goals

**Goals:**
- Tratar `authoring.packageShape` como autoridad operativa cuando venga congelado en el contrato aprobado.
- Mantener compatibilidad con briefs legacy que no traen `packageShape`.
- Hacer explícito el caso `agents`: si el contrato lo pide, también debe congelar `authoring.interface`.
- Cubrir el comportamiento con Promptfoo contract y uplift, sin añadir infraestructura nueva.

**Non-Goals:**
- Cambiar el shape del Eval Brief otra vez.
- Hacer clasificación más detallada por carpeta dentro del JSON.
- Crear carpetas opcionales “por si acaso”.
- Tocar `skill-eval-forge` o reabrir la discusión de `evals/` per-skill.

## Decisions

### Obey `packageShape` when present

Si el contrato aprobado incluye `authoring.packageShape`, implementación debe seguirlo literalmente:
- `requiredFiles`
- `supportFolders`

La regla de colocación vive en el texto del skill, no en un validador nuevo.

### Conservative legacy fallback

Si el contrato aprobado no trae `packageShape`, se trata como brief legacy soportado:
- default a `SKILL.md` solo
- no inferir `references/`, `scripts/`, `assets/` o `agents/` desde costumbre repo-local

Esto preserva compatibilidad sin reabrir contratos viejos.

### Special-case `agents`

`agents` sigue siendo distinto al resto de carpetas opcionales porque requiere materializar metadata estructurada. Por eso:
- si `supportFolders` incluye `agents`, implementación debe requerir `authoring.interface`
- si falta esa interface, la respuesta correcta es `stop-and-ask`

### No empty or widened scaffolding

La implementación debe seguir siendo shallow y mínima:
- no crear carpetas no pedidas
- no crear carpetas vacías “por si acaso”
- no dejar una respuesta que sugiera scaffolding más amplio que el contrato aprobado

## Risks / Trade-offs

- [Un modelo puede sobreinterpretar `packageShape` y proponer carpetas extra] -> reforzar guardrails y casos Promptfoo donde el fallback legacy es explícitamente `SKILL.md` solo.
- [El caso `agents` puede quedarse ambiguo] -> exigir `authoring.interface` y cubrirlo con una regresión dedicada.
- [La compatibilidad legacy puede animar a no usar `packageShape`] -> dejar claro que el fallback existe por compatibilidad, no como nuevo default para contratos recientes.
