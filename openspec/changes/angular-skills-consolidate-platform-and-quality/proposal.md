## Why

La parte 3 del plan debe consolidar dominios platform/quality para completar la reduccion del catalogo Angular desde el checkpoint `22` hasta `10` skills canonicas. Hoy existen skills legacy en routing, DI, defer, RxJS y testing que duplican guias y aumentan el costo de mantenimiento.

## What Changes

- Consolidar routing en `angular21-routing-patterns`.
- Consolidar DI en `angular21-di-patterns`.
- Consolidar defer/hydration en `angular21-defer-hydration`.
- Consolidar RxJS interop/concurrency en `angular21-rxjs-interop-concurrency`.
- Consolidar testing (incluyendo defer testing) en `angular21-testing-strategy`.
- Eliminar las skills legacy absorbidas por esas cinco canonicias.
- Registrar evidencia de verificacion y checkpoint final en `tasks.md` del slug.

## Capabilities

### New Capabilities
- `angular-skills-platform-quality-consolidation`: consolidar platform/quality del pack Angular, retirar legacy absorbidas y verificar checkpoint `10`.

### Modified Capabilities
- Ninguna.

## Impact

- `packs/angular/skills/angular21-routing-patterns/SKILL.md`
- `packs/angular/skills/angular21-di-patterns/SKILL.md`
- `packs/angular/skills/angular21-defer-hydration/SKILL.md`
- `packs/angular/skills/angular21-rxjs-interop-concurrency/SKILL.md`
- `packs/angular/skills/angular21-testing-strategy/SKILL.md`
- Carpetas legacy absorbidas en `packs/angular/skills/*`
- `openspec/changes/angular-skills-consolidate-platform-and-quality/`
