## Why

La parte 2 del plan debe consolidar dominios foundation/data para eliminar solapamientos y preparar la reduccion progresiva del catalogo Angular. Hoy existen skills legacy que duplican guias ya planeadas como canones, lo que incrementa costo de mantenimiento y ruido de enrutamiento.

## What Changes

- Consolidar el dominio de docs manteniendo `angular-docs-bootstrap` como skill canonica para `docs/ARCHITECTURE.md` y `docs/STYLING.md`.
- Consolidar state/template/data creando contenido canonico en:
  - `angular21-state-model`
  - `angular21-template-control-flow`
  - `angular21-data-httpresource`
- Eliminar las skills legacy absorbidas por esas canonicias para evitar duplicacion.
- Registrar evidencia de verificacion y checkpoint intermedio en `tasks.md` del slug.

## Capabilities

### New Capabilities
- `angular-skills-foundation-data-consolidation`: consolidar foundation/data del pack Angular, retirar legacy absorbidas y verificar checkpoint `22`.

### Modified Capabilities
- Ninguna.

## Impact

- `packs/angular/skills/angular-docs-bootstrap/SKILL.md`
- `packs/angular/skills/angular21-state-model/SKILL.md`
- `packs/angular/skills/angular21-template-control-flow/SKILL.md`
- `packs/angular/skills/angular21-data-httpresource/SKILL.md`
- Carpetas legacy absorbidas en `packs/angular/skills/*`
- `openspec/changes/angular-skills-consolidate-foundation-and-data/`
