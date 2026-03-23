## Context

`sourceRefs` ya existe en el Eval Brief, pero hoy no tiene una regla operativa suficientemente clara. Eso permite briefs trigger con referencias plausibles pero inventadas, sobre todo en new-skill cases con prompts escasos. El repo ya tiene una orientación parcial en `edge-cases.md` al decir que no se deben inventar source-of-truth documents, pero falta volverlo contrato activo y cubrirlo en Promptfoo.

## Goals / Non-Goals

**Goals:**
- Hacer explícito que `sourceRefs` debe listar solo fuentes reales y usadas.
- Evitar refs inventadas para reforzar artificialmente el brief.
- Cubrir la regresión con Promptfoo y alinear los fixtures offline.

**Non-Goals:**
- Cambiar el JSON schema de `sourceRefs`.
- Añadir validación automática de existencia de rutas dentro del schema.
- Tocar `skill-implementation-forge`.

## Decisions

### Treat `sourceRefs` as grounded evidence, not decorative metadata
`sourceRefs` no debe ser una lista decorativa de documentos plausibles. Debe representar autoridad realmente disponible para congelar el contrato en ese run.

### Allow minimal grounded refs
Cuando una new skill nace con poca documentación local, es válido que `sourceRefs` sea corto, por ejemplo `AGENTS.md` o un doc repo-local realmente existente. No hace falta inflar la lista.

### Use Promptfoo for semantic enforcement
El shape actual ya sirve. La enforcement práctica debe vivir en:
- texto del skill
- template y ejemplos
- Promptfoo regression coverage

## Risks / Trade-offs

- [El modelo puede seguir prefiriendo rutas “bonitas” aunque no existan] -> reforzar la regla en `SKILL.md`, prompt surface y anti-ejemplos.
- [Los fixtures actuales contienen refs hipotéticas] -> sanearlos como parte del slug para que el replay no mantenga una baseline incorrecta.
- [Algunos casos new-skill se quedarán con refs muy mínimas] -> aceptar esa salida como más honesta y portable que una autoridad inventada.
