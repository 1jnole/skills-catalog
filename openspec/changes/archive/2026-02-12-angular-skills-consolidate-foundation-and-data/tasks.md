## 1. Consolidacion foundation/data

- [x] 1.1 Completar y/o ajustar contenido canonico en `angular-docs-bootstrap`, `angular21-state-model`, `angular21-template-control-flow` y `angular21-data-httpresource`.
- [x] 1.2 Eliminar las diez skills legacy absorbidas por la matriz de la parte 2.

## 2. Validacion y evidencia

- [x] 2.1 Verificar inventario posterior (nombres legacy ausentes + checkpoint `22`) y registrar evidencia.
- [x] 2.2 Ejecutar `openspec validate "angular-skills-consolidate-foundation-and-data" --type change` y `npm run verify`, registrando evidencia.

## Evidencia

| Fecha | Comando | Resultado | Nota |
| --- | --- | --- | --- |
| 2026-02-12 | `$canon = @('packs/angular/skills/angular-docs-bootstrap/SKILL.md','packs/angular/skills/angular21-state-model/SKILL.md','packs/angular/skills/angular21-template-control-flow/SKILL.md','packs/angular/skills/angular21-data-httpresource/SKILL.md'); $canon | ForEach-Object { "${_}: $(Test-Path $_)" }` | PASS (`.../angular-docs-bootstrap/SKILL.md: True`, `.../angular21-state-model/SKILL.md: True`, `.../angular21-template-control-flow/SKILL.md: True`, `.../angular21-data-httpresource/SKILL.md: True`) | Se confirma presencia de las cuatro skills canonicas de foundation/data. |
| 2026-02-12 | `$legacy = @('angular-architecture-bootstrap','angular-styling-bootstrap','angular21-computed-vs-linked-signal','angular21-effect-usage-rules','angular21-signals-input-output-model','angular21-template-control-flow-states','angular21-httpresource-basics','angular21-httpresource-chained-resources','angular21-httpresource-factory-service-pattern','angular21-httpresource-parse-validation'); $legacy | ForEach-Object { "${_}: $(Test-Path (Join-Path 'packs/angular/skills' $_))" }` | PASS (`angular-architecture-bootstrap: False`, `angular-styling-bootstrap: False`, `angular21-computed-vs-linked-signal: False`, `angular21-httpresource-parse-validation: False`) | Ninguna de las diez skills legacy absorbidas permanece en el catalogo. |
| 2026-02-12 | `(Get-ChildItem -Directory packs/angular/skills).Count` | PASS (`22`) | Checkpoint intermedio del plan cumplido (`32 -> 22`). |
| 2026-02-12 | `openspec validate "angular-skills-consolidate-foundation-and-data" --type change` | PASS (`Change 'angular-skills-consolidate-foundation-and-data' is valid`) | El slug queda valido en el esquema spec-driven. |
| 2026-02-12 | `npm run verify` | PASS (`openspec list --json && openspec validate --specs`; `Totals: 2 passed, 0 failed`) | Gate del repositorio ejecutado exitosamente tras la consolidacion. |
