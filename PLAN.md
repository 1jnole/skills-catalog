# Migración a Laminar

## Propósito

Este archivo es la entrada estable de alto nivel para la migración a Laminar.

Aquí dejamos claras tres cosas:

- el objetivo final de la migración
- el estado real actual del repo
- dónde vive el plan detallado por versiones

## Estado real actual

A fecha de 2026-03-12:

- v1 híbrida: aceptada
- v2: no aceptada todavía
- v3: no aceptada todavía

Evidencia vigente:

- [iteration-13/benchmark.json](/C:/Users/Jorge/WebstormProjects/skills-catalog/packs/core/skill-forge/evals/runs/iteration-13/benchmark.json) está en `overall_passed: true`
- [iteration-13/run.json](/C:/Users/Jorge/WebstormProjects/skills-catalog/packs/core/skill-forge/evals/runs/iteration-13/run.json) mantiene `platform: laminar` y `provider: openai`
- `run-evals --iteration 13 --retry-errors` reutilizó correctamente los artifacts existentes

## Objetivo final

Al terminar las tres versiones de la migración:

- `run-evals` será el único comando público soportado para ejecutar evals
- Laminar quedará integrado como **observability/eval platform**
- AI SDK seguirá siendo la **model provider layer**
- el dominio local seguirá siendo la fuente de verdad:
  - `Eval Brief`
  - `evals.json`
  - Zod schemas
  - benchmark semantics
- el flujo soportado persistirá sólo:
  - `benchmark.json`
  - `run.json`

## Plan por versiones

El plan detallado y estable vive en [07-laminar-migration-versions.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/plans/07-laminar-migration-versions.md).

Ese documento define:

- v1 híbrida
- v2 de consolidación
- v3 de migración fuerte
- el estado actual de cada versión
- el gate de aceptación para cerrar cada una

## Source of truth

Para trabajar la migración sin volver a contaminar documentación:

- [PLAN.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/PLAN.md): objetivo final, estado real actual y navegación
- [07-laminar-migration-versions.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/plans/07-laminar-migration-versions.md): plan detallado por versiones
- [README.md](/C:/Users/Jorge/WebstormProjects/skills-catalog/scripts/evals/README.md): forma actual del runner compartido
- `openspec/changes/`: ejecución, decisiones y evidencia de cada cambio

## Regla de planificación

No se considera cerrada una versión porque existan piezas implementadas sueltas.

Una versión sólo se considera cerrada cuando su gate de aceptación está cumplido de extremo a extremo y la documentación activa del repo describe exactamente ese estado.
