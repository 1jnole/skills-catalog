## Why

El plan maestro de consolidacion Angular quedo desalineado con el estado real del repositorio: el baseline actual es de 32 skills en `packs/angular/skills`, no 29. Esta diferencia reduce trazabilidad y puede romper los checkpoints de consolidacion.

## What Changes

- Crear un change atomico para formalizar el baseline real del catalogo Angular.
- Ajustar `PLANS.md` para que refleje el estado real del repo y los slugs activos.
- Eliminar referencias a rutas inexistentes en la tabla de trazabilidad.
- Registrar evidencia de verificacion en `tasks.md` del slug.

## Capabilities

### New Capabilities
- `angular-skills-plan-baseline`: Gobernar baseline y trazabilidad del plan maestro de consolidacion Angular.

### Modified Capabilities
- Ninguna.

## Impact

- `PLANS.md`
- `openspec/changes/angular-skills-plan-baseline-and-realignment/`
- Flujo de consolidacion de slugs `2-4` (solo en terminos de plan y trazabilidad, sin implementar su alcance funcional)
