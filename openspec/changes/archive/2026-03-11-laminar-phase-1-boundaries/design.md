## Context

La fase 0 fijó el punto de partida: los comandos fuente actuales son `read-evals` y `run-iteration`, el benchmark local sigue siendo la referencia de paridad y el árbol mezcla surface pública, runner legacy y restos transicionales. Además, la baseline capturó que `scripts/evals/lmnr/` existe en source aunque todavía no sea la ubicación canónica descrita para la arquitectura objetivo.

La fase 1 debe limpiar nombres y límites sin cambiar comportamiento observable de benchmark. Eso implica separar tres ideas que hoy todavía se pisan:
- el nombre público del comando soportado
- la ubicación canónica de la integración Laminar
- el significado estable de `domain/`, `providers/` y la futura capa `platforms/laminar/`

## Goals / Non-Goals

**Goals:**
- Definir `run-evals` como el comando público soportado.
- Mover o reubicar la integración Laminar bajo `scripts/evals/platforms/laminar/`.
- Dejar `providers/` reservado a model providers.
- Actualizar docs y Mermaid para que la arquitectura pública cuente una sola historia.
- Mantener `skill-forge` como único piloto.

**Non-Goals:**
- Cambiar scoring, gates o benchmark aggregation.
- Retirar todos los internals legacy.
- Diseñar `run.json`.
- Introducir una interfaz genérica de platform.

## Decisions

### Decision: tratar `run-evals` como nombre público aunque el runner legacy siga detrás
Rationale:
- La fase 1 busca limpiar la superficie pública antes de reestructurar la implementación profunda.
- Permite actualizar documentación y contratos de uso sin exigir aún la retirada del runner legacy.

Alternatives considered:
- Esperar a fase 3 para renombrar el comando.
Reason rejected:
- Mantendría documentación y arquitectura pública en drift durante demasiadas fases.

### Decision: `platforms/laminar/` pasa a ser la ubicación canónica aunque `lmnr/` exista hoy
Rationale:
- La arquitectura objetivo ya reserva Laminar como observability/eval platform.
- La fase 0 mostró que `lmnr/` existe, pero no debe seguir siendo el nombre canónico del boundary.

Alternatives considered:
- Mantener `lmnr/` hasta que la integración esté completa.
Reason rejected:
- Retrasa la limpieza de límites y obliga a seguir explicando una carpeta cuyo nombre ya no representa el modelo deseado.

### Decision: reservar `providers/` solo para model providers
Rationale:
- Evita confundir integración de plataforma con acceso al modelo.
- Se alinea con el end state del plan: AI SDK y OpenAI siguen siendo la model provider layer.

Alternatives considered:
- Permitir que `providers/` aloje tanto providers como adapters de plataforma durante la transición.
Reason rejected:
- Haría más difícil separar la fase 1 de la fase 3 y degradaría la claridad del árbol.

### Decision: corregir el baseline documental cuando la fase 1 cambie el significado canónico
Rationale:
- La nota de fase 0 debe seguir siendo una fotografía honesta del punto de partida, incluyendo transicionales como `scripts/evals/lmnr/`.
- Fase 1 no debe dejar atrás documentación archivada o activa que contradiga el estado real o el nuevo boundary.

Alternatives considered:
- No tocar la baseline de fase 0 durante fase 1.
Reason rejected:
- Dejaría una inconsistencia conocida entre el historial reciente y el árbol real del repo.

## Risks / Trade-offs

- [Riesgo] El alias transicional puede quedar mal definido y generar doble documentación. → Mitigación: documentar solo `run-evals` como público y mencionar `run-lmnr-eval` únicamente como alias interno temporal si sigue existiendo.
- [Riesgo] Renombrar carpetas puede romper imports o paths de build. → Mitigación: limitar la fase a movimientos y actualizaciones mecánicas respaldadas por `tsc`.
- [Trade-off] La fase mejora claridad pública antes de simplificar internals. → Justificación: prioriza contratos legibles para las siguientes fases sin mezclar refactor estructural profundo.

## Migration Plan

1. Confirmar dónde existe hoy la integración Laminar y qué parte es source frente a output generado.
2. Introducir `run-evals` como entrada pública soportada.
3. Reubicar Laminar bajo `scripts/evals/platforms/laminar/` y actualizar imports.
4. Actualizar docs y Mermaid para reflejar los nuevos límites.
5. Corregir la baseline documental activa si hace falta para mantenerla fiel al punto de partida.
6. Validar con `npx tsc -p scripts/evals/tsconfig.json`.

Rollback:
- Si el rename rompe imports o documentación clave, revertir el movimiento de naming y mantener la fase como change no aplicado hasta corregir el contrato.

## Open Questions

- Si `run-lmnr-eval` seguirá existiendo como archivo fuente alias o solo como output generado en `dist` durante la transición.
