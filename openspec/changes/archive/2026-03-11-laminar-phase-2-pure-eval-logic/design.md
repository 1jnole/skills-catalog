## Context

La fase 1 dejó `run-evals` como superficie pública y fijó `platforms/laminar/` como boundary canónico. Aun así, el benchmark sigue dependiendo de piezas del runner legacy: lectura y escritura de `timing.json`, `grading.json`, `feedback.json`, `outputs/` y carpetas por modo. Si esa dependencia no se aísla antes de integrar Laminar como flow soportado, la migración puede cambiar accidentalmente la semántica de paridad.

La fase 2 tiene que separar dos cosas:
- la semántica local del benchmark y de las decisiones de pass/fail
- el mecanismo concreto con el que un runner o plataforma produce resultados

## Goals / Non-Goals

**Goals:**
- Declarar explícitamente la source of truth local para evals y benchmark semantics.
- Aislar scoring, gates y benchmark aggregation para que trabajen con resultados normalizados.
- Definir `run.json` con naming neutral.
- Reducir la dependencia del benchmark respecto al layout detallado de artefactos legacy.
- Mantener la paridad de `skill-forge` como referencia.

**Non-Goals:**
- Eliminar por completo el runner legacy.
- Cambiar el significado de trigger, non-trigger, stop-and-ask o `overall_passed`.
- Rediseñar Laminar o introducir un adapter genérico para múltiples platforms.

## Decisions

### Decision: extraer lógica pura antes de retirar artifacts legacy
Rationale:
- Primero hay que separar semántica de mecanismo; si se retiran artifacts antes, se corre el riesgo de mezclar refactor con cambio de comportamiento.
- Permite verificar que `benchmark.json` conserva semántica estable aunque cambie la fuente de resultados.

Alternatives considered:
- Saltar directamente a usar solo resultados de plataforma.
Reason rejected:
- Haría más difícil demostrar que la semántica se mantiene intacta.

### Decision: definir `run.json` como contrato neutral mínimo
Rationale:
- La migración necesita un artefacto de ejecución con naming estable que no dependa de Laminar.
- Un contrato pequeño reduce el riesgo de sobre-diseñar antes de tener una segunda platform real.

Alternatives considered:
- Esperar a fase 3 para introducir `run.json`.
Reason rejected:
- Dejaría la semántica runner-neutral sin un artefacto explícito para representar resultados normalizados.

### Decision: mantener benchmark semantics locales al repo
Rationale:
- Fase 2 debe preservar exactamente las expectativas congeladas en fase 0.
- Laminar se integra como observabilidad/eval platform, no como autoridad sobre pass/fail.

Alternatives considered:
- Dejar que la plataforma determine parte de los gates o del benchmark shape.
Reason rejected:
- Contradiría el plan y reintroduciría lock-in en la semántica central.

## Risks / Trade-offs

- [Riesgo] La extracción de lógica pura puede tocar varias rutas internas y abrir scope de refactor. → Mitigación: mantener el cambio centrado en normalización y funciones puras, sin retirar todavía el flujo legacy.
- [Riesgo] `run.json` puede crecer demasiado pronto. → Mitigación: limitarlo a los campos ya definidos en el roadmap.
- [Trade-off] La fase añade una capa de normalización antes de simplificar del todo el runner. → Justificación: mejora testabilidad y reduce el riesgo de regresión semántica en fase 3.

## Migration Plan

1. Identificar la lógica actual de scoring, gates y benchmark aggregation.
2. Definir una forma normalizada de resultados de ejecución independiente del layout detallado.
3. Extraer scoring, gates y benchmark aggregation para consumir esa forma normalizada.
4. Definir `run.json` neutral y conectar su producción con el flujo híbrido.
5. Reducir la dependencia del benchmark respecto a artifacts detallados legacy como source of truth.
6. Actualizar docs y diagramas.
7. Verificar con `npx tsc -p scripts/evals/tsconfig.json`.

Rollback:
- Si la extracción rompe la paridad o deja lógica mezclada, volver a usar el flujo legacy como fuente interna y limitar la fase a documentación y tipos.

## Open Questions

- Si la normalización de resultados debe vivir bajo `scripts/evals/domain/` como contrato central o bajo `scripts/evals/run/` como paso transicional hacia fase 3.
