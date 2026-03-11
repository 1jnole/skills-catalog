## Context

La fase 0 no introduce la arquitectura final de Laminar ni cambia el comportamiento del runner. Su función es fijar el punto de partida real del repositorio para que las fases 1 a 3 no mezclen limpieza conceptual con cambios de comportamiento o con restos de documentación stale.

El estado actual del repo ya muestra señales de drift:
- `PLAN.md` describe una transición por fases.
- `roadmap/laminar-migration-phase-0-tasks.md` define una fase puramente de estabilización.
- `scripts/evals/` contiene comandos visibles, capas activas, integración Laminar y artefactos `dist/` que pueden no representar la fuente real.

El diseño de esta fase tiene que ser documental, auditable y mínimo. El resultado esperado es un baseline que permita distinguir qué debe preservarse, qué sigue siendo necesario por compatibilidad temporal y qué puede ignorarse en la migración.

## Goals / Non-Goals

**Goals:**
- Documentar el inventario actual del runner y sus documentos relacionados.
- Clasificar rutas y artefactos del runner en categorías explícitas y reutilizables por fases posteriores.
- Fijar `skill-forge` como único piloto de migración hasta demostrar paridad.
- Registrar la baseline funcional aceptada que deberá preservarse en la migración.
- Identificar acoplamientos legacy y drift documental o de naming sin resolverlos todavía.

**Non-Goals:**
- Renombrar `run-iteration`, `read-evals`, `run-lmnr-eval` o cualquier carpeta.
- Mover módulos entre `domain/`, `providers/`, `platforms/` o equivalentes.
- Cambiar el contenido o la semántica de `benchmark.json`.
- Eliminar piezas legacy solo porque parezcan antiguas.

## Decisions

### Decision: tratar la fase 0 como cambio de baseline documental
Rationale:
- La fase 0 existe para reducir incertidumbre, no para empezar la migración técnica.
- Mantener esta fase documental permite revisar y corregir supuestos antes de tocar código con riesgo de regresión.

Alternatives considered:
- Implementar ya los renames de fase 1 junto con el inventario.
Reason rejected:
- Mezclar inventario y refactor haría imposible saber si una diferencia posterior es de baseline o de implementación.

### Decision: usar tres clases de estado para el runner actual
Rationale:
- `source of truth`, `legacy but still needed` y `stale / safe to ignore during migration` reflejan exactamente el objetivo operativo de la fase 0.
- La clasificación permite planificar las fases siguientes sin borrar información útil demasiado pronto.

Alternatives considered:
- Separar solo entre `active` y `legacy`.
Reason rejected:
- Esa división no distingue entre legacy aún requerido y restos stale que no deben condicionar la migración.

### Decision: congelar `skill-forge` como único piloto
Rationale:
- La migración necesita una única referencia de paridad para evitar multiplicar incertidumbre y coste de validación.
- `PLAN.md` y el roadmap ya posicionan `skill-forge` como piloto.

Alternatives considered:
- Ampliar la validación a varias skills en paralelo.
Reason rejected:
- Haría más difícil aislar si los fallos provienen del runner, de las eval definitions o de diferencias entre skills.

### Decision: registrar acoplamientos y drift, pero no resolverlos en esta fase
Rationale:
- Las fases posteriores necesitan una lista cerrada de dependencias legacy antes de retirarlas.
- Registrar primero y retirar después evita borrar accidentalmente piezas aún consumidas.

Alternatives considered:
- Eliminar en la fase 0 todo lo que parezca stale.
Reason rejected:
- La propia definición de la fase 0 prohíbe retirar piezas salvo evidencia incuestionable.

### Decision: usar una nota nueva en `roadmap/` como ubicación canónica del baseline de fase 0
Rationale:
- La clasificación y la baseline de migración son material operativo de fase, no arquitectura estable.
- `PLAN.md` debe conservarse como documento de arquitectura, rationale y transición por fases.
- `scripts/evals/README.md` debe describir el runner soportado y no convertirse en archivo transicional de migración.

Alternatives considered:
- Añadir toda la clasificación a `PLAN.md`.
Reason rejected:
- Mezclar baseline transicional con arquitectura estable aumenta drift y hace más difícil mantener el plan legible.

Alternatives considered:
- Dejar la baseline solo en `tasks.md`.
Reason rejected:
- `tasks.md` sirve para control del change y evidencia, no como referencia operativa para fases 1 a 3.

## Risks / Trade-offs

- [Riesgo] El inventario puede quedarse corto si solo se apoya en documentos existentes. → Mitigación: contrastar docs con el árbol real de `scripts/evals/` y con búsquedas de referencias stale.
- [Riesgo] La clasificación puede volverse discutible en bordes transicionales. → Mitigación: registrar la evidencia y la razón de cada clasificación en notas de fase 0.
- [Riesgo] El baseline funcional puede citar un benchmark no reproducible o desactualizado. → Mitigación: documentar la ruta exacta de artefactos usados como baseline aceptada.
- [Trade-off] Esta fase añade documentación sin avanzar la integración técnica. → Justificación: reduce riesgo de rehacer fases 1 a 3 sobre un estado mal entendido.

## Migration Plan

1. Inventariar comandos, carpetas y documentos del runner actual.
2. Clasificar cada pieza en `source of truth`, `legacy but still needed` o `stale / safe to ignore during migration`.
3. Registrar la baseline aceptada de `skill-forge` y las rutas de artefactos asociadas.
4. Registrar acoplamientos con artefactos legacy y drift de naming o documentación.
5. Ajustar `PLAN.md` y `roadmap/` solo cuando se detecten diferencias demostrables frente al estado real.
6. Validar con `npx tsc -p scripts/evals/tsconfig.json`.

Rollback:
- No aplica rollback técnico complejo porque la fase está limitada a artefactos documentales y de planificación.

## Open Questions

- Confirmar el nombre final de la nota canónica bajo `roadmap/` para mantener coherencia con el resto de archivos de la migración.
