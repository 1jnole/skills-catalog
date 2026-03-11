## Why

La fase 2 ya quedó cerrada y el siguiente trabajo real es la fase 3 de `PLAN.md`. Antes de implementarla, hace falta revisar su contrato operativo para cerrar drift documental y aterrizar corner cases que hoy el repo no resuelve de forma explícita.

## What Changes

- Revisar la sección de fase 3 en `PLAN.md` para mantener la arquitectura, pero cerrar el contrato operativo y eliminar drift actual.
- Crear `roadmap2/` como workspace preparatorio exclusivo de la fase 3.
- Documentar primero los acuerdos y edge cases de fase 3 y solo después desglosar batches y gates ejecutables.
- Comparar explícitamente el desglose de `roadmap2/` contra los requisitos de `PLAN.md` para confirmar cobertura completa antes de abrir la implementación.

Out of scope:
- Implementar la integración Laminar.
- Añadir dependencias nuevas.
- Cambiar benchmark semantics, scoring o gates.
- Abrir o aplicar todavía un change OpenSpec de implementación de fase 3.

## Capabilities

### New Capabilities
- `laminar-phase-3-preparation`: Define la revisión contractual de la fase 3 y el workspace `roadmap2/` previo a la implementación.

### Modified Capabilities
- None.

## Impact

- `PLAN.md`
- `roadmap/README.md`
- `roadmap2/`
