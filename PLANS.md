# Plan Atómico de Consolidación Angular Skills

## Propósito
- Reducir el catálogo Angular de `32` a `10` skills canónicas.
- Eliminar solapamientos temáticos y mejorar mantenibilidad del pack Angular.
- Mantener la ejecución en cambios atómicos y trazables.

## Fuentes de verdad operativas
- El flujo operativo (preflight, creación de change, artefactos, validación, cierre) se toma de `AGENTS.md`.
- El enrutamiento detallado por fase se toma de `openspec/AGENTS.override.md`.
- `PLANS.md` define decisiones, alcance y aceptación; no duplica comandos.

## Alcance
In-scope:
- Consolidación de skills en `packs/angular/skills`.
- Actualización de documentación pública del catálogo cuando corresponda.
- Registro de trazabilidad por slug en `openspec/changes/<slug>/tasks.md`.

Out-of-scope:
- Cambios en scripts o tooling runtime.
- Creación de `docs/*` no existente en el estado actual del repo.
- Refactors laterales no ligados al objetivo de consolidación.

## Baseline operativo
- Fecha de baseline: `2026-02-12`.
- Inventario Angular actual: `32` skills en `packs/angular/skills`.

## Plan por changes

### 1) `angular-skills-plan-baseline-and-realignment`
- Objetivo: fijar baseline y alinear el plan maestro con la estructura real del repo.
- Entregables: `PLANS.md` lean y baseline del catálogo actual.
- Aceptación: plan sin duplicación operativa, baseline `32` explícito y sin referencias a rutas inexistentes.

### 2) `angular-skills-consolidate-foundation-and-data`
- Objetivo: consolidar dominios de docs/state/template/httpresource.
- Entregables: skills canónicas de foundation y data + eliminación de legacy absorbidas.
- Aceptación: checkpoint intermedio de catálogo en `22` skills.

### 3) `angular-skills-consolidate-platform-and-quality`
- Objetivo: consolidar routing/DI/defer/RxJS/testing.
- Entregables: skills canónicas de plataforma y calidad + eliminación de legacy restantes.
- Aceptación: checkpoint final de catálogo en `10` skills.

### 4) `angular-skills-catalog-final-sync`
- Objetivo: sincronizar narrativa pública y cerrar trazabilidad de la serie.
- Entregables: actualización final de `README.md` y ajustes mínimos en `AGENTS.md` si aplica.
- Aceptación: catálogo final consistente y evidencia completa por slug.

## Matriz de absorción
- `angular-architecture-bootstrap` -> `angular-docs-bootstrap`
- `angular-styling-bootstrap` -> `angular-docs-bootstrap`
- `angular21-computed-vs-linked-signal` -> `angular21-state-model`
- `angular21-effect-usage-rules` -> `angular21-state-model`
- `angular21-signals-input-output-model` -> `angular21-state-model`
- `angular21-template-control-flow-states` -> `angular21-template-control-flow`
- `angular21-httpresource-basics` -> `angular21-data-httpresource`
- `angular21-httpresource-chained-resources` -> `angular21-data-httpresource`
- `angular21-httpresource-factory-service-pattern` -> `angular21-data-httpresource`
- `angular21-httpresource-parse-validation` -> `angular21-data-httpresource`
- `angular21-router-component-input-binding` -> `angular21-routing-patterns`
- `angular21-routing-functional-guards` -> `angular21-routing-patterns`
- `angular21-routing-functional-resolvers` -> `angular21-routing-patterns`
- `angular21-routing-standalone-lazy-loading` -> `angular21-routing-patterns`
- `angular21-di-hierarchical-providers-scoping` -> `angular21-di-patterns`
- `angular21-di-injection-context-rules` -> `angular21-di-patterns`
- `angular21-di-injectiontoken-config` -> `angular21-di-patterns`
- `angular21-di-injectiontoken-factory-composition` -> `angular21-di-patterns`
- `angular21-defer-blocks-triggers-and-states` -> `angular21-defer-hydration`
- `angular21-defer-hydrate-triggers` -> `angular21-defer-hydration`
- `angular21-incremental-hydration-setup` -> `angular21-defer-hydration`
- `angular21-rxjs-concurrency-operator-choice` -> `angular21-rxjs-interop-concurrency`
- `angular21-rxjs-interop-take-until-destroyed` -> `angular21-rxjs-interop-concurrency`
- `angular21-testing-component-scenarios` -> `angular21-testing-strategy`
- `angular21-testing-di-overrides` -> `angular21-testing-strategy`
- `angular21-testing-httpclient` -> `angular21-testing-strategy`
- `angular21-defer-testing-strategy` -> `angular21-testing-strategy`

Se mantienen:
- `angular-docs-bootstrap` (ampliada)
- `angular-tooling-bootstrap` (sin cambio funcional)

## Criterios de aceptación global
- Checkpoints de catálogo: `32 -> 22 -> 10`.
- Estructura mínima consistente en cada `SKILL.md` canónica.
- Evidencia de verificación y cierre registrada por slug en `tasks.md`.
- Trazabilidad completa entre decisiones del plan y cambios archivados.

## Riesgos y mitigaciones
- Riesgo: drift entre plan y flujo operativo.
- Mitigación: comandos se mantienen solo en AGENTS y este documento solo referencia esa fuente.
- Riesgo: alcance accidental fuera de consolidación.
- Mitigación: cambios atómicos por dominio y validación de alcance por slug.

## Supuestos y defaults
- No existe umbrella previo para marcar como superseded.
- No se crearán rutas `docs/*` nuevas en esta serie.
- Se prioriza cambio mínimo y revisión simple por iteración.

## Estado y trazabilidad

| Slug | Estado | Fecha | Evidencia (`tasks.md`) | Nota |
| --- | --- | --- | --- | --- |
| `angular-skills-plan-baseline-and-realignment` | Archivado | `2026-02-12` | `openspec/changes/archive/2026-02-12-angular-skills-plan-baseline-and-realignment/tasks.md` | Baseline + realineación del plan |
| `angular-skills-consolidate-foundation-and-data` | Pendiente | - | Pendiente de crear en su slug | Bloque foundation + data |
| `angular-skills-consolidate-platform-and-quality` | Archivado | `2026-02-12` | `openspec/changes/archive/2026-02-12-angular-skills-consolidate-platform-and-quality/tasks.md` | Bloque platform + quality |
| `angular-skills-catalog-final-sync` | Pendiente | - | Pendiente de crear en su slug | Cierre documental final |
