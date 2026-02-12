Proposed Plan


# Plan Atómico de Consolidación Angular Skills (4 Changes + Umbrella Superseded)

## Resumen

Política acordada para toda la serie: sin npm run verify en esta fase; validación estructural/documental por change.

## Cambios importantes en interfaces/contratos

1. La interfaz pública del catálogo (packs/angular/skills/*) cambia de 29 skills a 10 skills canónicas.
2. Se eliminan 27 carpetas legacy y se crean 8 carpetas nuevas; se mantienen angular-docs-bootstrap y angular-tooling-bootstrap.
3. Todas las skills canónicas deben cumplir contrato homogéneo de SKILL.md:
   name, description, metadata.short-description + secciones Goal, When to use, When NOT to use, Inputs, Outputs, Workflow, Common pitfalls, Definition of done, Failure modes.
4. No hay cambios de APIs runtime, ni package.json, ni tooling de verify en esta serie.

## Secuencia exacta de implementación (decision-complete)

## Change 1: baseline y matriz de absorción

Slug: angular-skills-baseline-and-mapping
Objetivo: congelar baseline y publicar mapeo completo origen -> destino antes de editar skills.

1. Crear change y artefactos OpenSpec:
   openspec new change "angular-skills-baseline-and-mapping"
   openspec instructions proposal --change "angular-skills-baseline-and-mapping" --json
   openspec instructions specs --change "angular-skills-baseline-and-mapping" --json
   openspec instructions design --change "angular-skills-baseline-and-mapping" --json
   openspec instructions tasks --change "angular-skills-baseline-and-mapping" --json
   openspec validate "angular-skills-baseline-and-mapping" --type change
2. Implementación de este change:
   docs/angular-skills-consolidation-map.md con mapeo completo (tabla de este plan, sección “Matriz de absorción completa”).
3. Validación de salida:
   (Get-ChildItem packs/angular/skills -Directory).Count debe seguir en 29.
   Get-ChildItem packs/angular/skills -Directory | Select-Object -ExpandProperty Name sin cambios.
   git diff --name-only solo incluye artefactos del change y docs/angular-skills-consolidation-map.md.
4. Cerrar change:
   openspec validate "angular-skills-baseline-and-mapping" --type change
   openspec archive "angular-skills-baseline-and-mapping"

## Change 2: consolidación foundation + data

Slug: angular-skills-consolidate-foundation-and-data
Objetivo: consolidar docs/state/template/httpresource en un bloque autocontenido.

1. Crear y preparar artefactos:
   openspec new change "angular-skills-consolidate-foundation-and-data"
   (igual secuencia de instructions + validate que en Change 1)
2. Implementación exacta:
   Actualizar packs/angular/skills/angular-docs-bootstrap/SKILL.md.
   Crear packs/angular/skills/angular21-state-model/SKILL.md.
   Crear packs/angular/skills/angular21-template-control-flow/SKILL.md.
   Crear packs/angular/skills/angular21-data-httpresource/SKILL.md.
   Eliminar carpetas legacy absorbidas de estos dominios (listadas en la matriz).
3. Validación de salida:
   (Get-ChildItem packs/angular/skills -Directory).Count debe quedar en 22.
   rg --files packs/angular/skills
   rg "## Goal|## When to use|## When NOT to use|## Inputs|## Outputs|## Workflow|## Common pitfalls|## Definition of done|## Failure modes" packs/angular/skills/**/SKILL.md -n
   git diff --name-only sin package.json.
4. Cerrar change:
   openspec validate "angular-skills-consolidate-foundation-and-data" --type change
   openspec archive "angular-skills-consolidate-foundation-and-data"

## Change 3: consolidación routing + di + defer + rxjs + testing

Slug: angular-skills-consolidate-platform-and-quality
Objetivo: completar consolidación del resto de dominios hasta llegar a 10 skills.

1. Crear y preparar artefactos:
   openspec new change "angular-skills-consolidate-platform-and-quality"
   (igual secuencia de instructions + validate que en Change 1)
2. Implementación exacta:
   Crear packs/angular/skills/angular21-routing-patterns/SKILL.md.
   Crear packs/angular/skills/angular21-di-patterns/SKILL.md.
   Crear packs/angular/skills/angular21-defer-hydration/SKILL.md.
   Crear packs/angular/skills/angular21-rxjs-interop-concurrency/SKILL.md.
   Crear packs/angular/skills/angular21-testing-strategy/SKILL.md.
   Eliminar carpetas legacy absorbidas de estos dominios (listadas en la matriz).
3. Validación de salida:
   (Get-ChildItem packs/angular/skills -Directory).Count debe quedar en 10.
   Get-ChildItem packs/angular/skills -Directory | Select-Object -ExpandProperty Name debe coincidir con catálogo final.
   rg "## Goal|## When to use|## When NOT to use|## Inputs|## Outputs|## Workflow|## Common pitfalls|## Definition of done|## Failure modes" packs/angular/skills/**/SKILL.md -n
   git diff --name-only sin package.json.
4. Cerrar change:
   openspec validate "angular-skills-consolidate-platform-and-quality" --type change
   openspec archive "angular-skills-consolidate-platform-and-quality"

## Change 4: alineación documental y cierre de serie

Slug: angular-skills-docs-validation-and-close
Objetivo: sincronizar documentación pública, dejar evidencia final y cerrar umbrella como superseded.

1. Crear y preparar artefactos:
   openspec new change "angular-skills-docs-validation-and-close"
   (igual secuencia de instructions + validate que en Change 1)
2. Implementación exacta:
   Actualizar README.md.
   Actualizar docs/AGENTS.md.
   Actualizar docs/AUDIT.md.
   Verificar consistencia con docs/angular-skills-consolidation-map.md.
3. Validación final de serie:
   (Get-ChildItem packs/angular/skills -Directory).Count == 10
   Get-ChildItem packs/angular/skills -Directory | Select-Object -ExpandProperty Name
   git diff --name-only sin package.json
   openspec validate "angular-skills-docs-validation-and-close" --type change
4. Cerrar este change:
   openspec archive "angular-skills-docs-validation-and-close"
5. Cierre del umbrella:
   Marcar en openspec/changes/consolidate-angular-skills-phase1/tasks.md que quedó superseded por los 4 slugs anteriores.
   Archivar umbrella:
   openspec archive "consolidate-angular-skills-phase1"

## Matriz de absorción completa (sin decisiones pendientes)

angular-architecture-bootstrap -> angular-docs-bootstrap
angular-styling-bootstrap -> angular-docs-bootstrap
angular21-computed-vs-linked-signal -> angular21-state-model
angular21-effect-usage-rules -> angular21-state-model
angular21-signals-input-output-model -> angular21-state-model
angular21-template-control-flow-states -> angular21-template-control-flow
angular21-httpresource-basics -> angular21-data-httpresource
angular21-httpresource-chained-resources -> angular21-data-httpresource
angular21-httpresource-factory-service-pattern -> angular21-data-httpresource
angular21-httpresource-parse-validation -> angular21-data-httpresource
angular21-router-component-input-binding -> angular21-routing-patterns
angular21-routing-functional-guards -> angular21-routing-patterns
angular21-routing-functional-resolvers -> angular21-routing-patterns
angular21-routing-standalone-lazy-loading -> angular21-routing-patterns
angular21-di-hierarchical-providers-scoping -> angular21-di-patterns
angular21-di-injection-context-rules -> angular21-di-patterns
angular21-di-injectiontoken-config -> angular21-di-patterns
angular21-di-injectiontoken-factory-composition -> angular21-di-patterns
angular21-defer-blocks-triggers-and-states -> angular21-defer-hydration
angular21-defer-hydrate-triggers -> angular21-defer-hydration
angular21-incremental-hydration-setup -> angular21-defer-hydration
angular21-rxjs-concurrency-operator-choice -> angular21-rxjs-interop-concurrency
angular21-rxjs-interop-take-until-destroyed -> angular21-rxjs-interop-concurrency
angular21-testing-component-scenarios -> angular21-testing-strategy
angular21-testing-di-overrides -> angular21-testing-strategy
angular21-testing-httpclient -> angular21-testing-strategy
angular21-defer-testing-strategy -> angular21-testing-strategy

Se mantienen:
angular-docs-bootstrap (ampliada)
angular-tooling-bootstrap (sin cambio funcional)

## Casos de prueba y escenarios

1. Escenario baseline: antes de consolidar, conteo de carpetas = 29.
2. Escenario post-Change-2: conteo = 22 y no faltan skills canónicas ya creadas.
3. Escenario post-Change-3: conteo = 10 y catálogo coincide exactamente con los 10 nombres objetivo.
4. Escenario contrato SKILL.md: cada skill canónica contiene frontmatter y secciones obligatorias.
5. Escenario documentación: README.md, docs/AGENTS.md y docs/AUDIT.md reflejan exactamente el catálogo final.
6. Escenario guardrail de alcance: no cambios en package.json; no evidencia de ejecución de npm run verify en esta serie.
7. Escenario trazabilidad: el umbrella queda archivado como superseded con referencia explícita a los 4 slugs ejecutados.

## Supuestos y defaults explícitos

1. Se aplica core-minimal-diff-implementer: diffs pequeños, sin refactors laterales.
2. Se adapta core-gates-and-evidence al alcance de fase: evidencia estructural/documental en lugar de npm run verify.
3. No se crean aliases de compatibilidad temporal para nombres legacy.
4. No se mueve contenido deep desde vault en esta serie.
5. La serie termina con 5 archives: 4 atómicos + 1 umbrella superseded.
