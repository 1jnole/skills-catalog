## Context

La fase 2 ya extrajo el contrato normalizado, la agregación pura y `run.json`, pero su cierre quedó débil porque no se ejecutó una iteración nueva que demostrara la preservación de la semántica del benchmark. El propio roadmap de fase 2 pide behavioral checks, así que esta verificación pertenece a la fase 2 y no a una fase posterior.

## Goals / Non-Goals

**Goals:**
- Ejecutar una validación funcional real de la fase 2.
- Confirmar que `benchmark.json` mantiene la semántica congelada.
- Confirmar que `run.json` se genera con naming neutral.
- Confirmar que el reuso de casos prioriza `benchmark.json` frente al layout legacy.

**Non-Goals:**
- Cambiar el diseño de fase 2 salvo que la verificación descubra una regresión.
- Empezar trabajo de fase 3.

## Decisions

### Decision: tratar esta verificación como follow-up explícito de fase 2
Rationale:
- El criterio faltante ya pertenecía a fase 2.
- Un change explícito evita que el cierre quede apoyado en una inferencia informal.

### Decision: exigir una iteración nueva de `skill-forge`
Rationale:
- Reusar artifacts anteriores no demuestra que la lógica nueva produzca los resultados correctos.
- Una ejecución nueva es la forma mínima de validar el comportamiento real tras el cambio.

## Risks / Trade-offs

- [Riesgo] La ejecución real puede requerir credenciales o entorno no disponible. → Mitigación: registrar el bloqueo explícitamente si aparece.
- [Riesgo] La iteración nueva puede no reproducir exactamente la baseline por variabilidad del modelo. → Mitigación: revisar tanto shape como semántica y anotar cualquier diferencia real.

## Migration Plan

1. Ejecutar una iteración nueva de `skill-forge`.
2. Inspeccionar `benchmark.json` y `run.json`.
3. Validar el camino de reutilización o retry sobre esa iteración.
4. Registrar evidencia en OpenSpec.

## Open Questions

- Ninguna adicional: el objetivo es puramente de verificación funcional.
