## Context

`PLANS.md` define decisiones, alcance y checkpoints de la consolidacion Angular. El documento tenia un baseline numerico desactualizado y trazabilidad generica (`<slug>`) que no refleja archivos reales del repositorio.

## Goals / Non-Goals

**Goals:**
- Alinear el baseline del plan con el inventario real de `packs/angular/skills`.
- Mantener `PLANS.md` enfocado en decisiones y aceptacion, sin duplicar flujo operativo de AGENTS.
- Asegurar trazabilidad valida para el slug 1 y evitar referencias a rutas inexistentes.

**Non-Goals:**
- No consolidar ni eliminar skills de Angular en este change.
- No implementar el alcance de los slugs 2, 3 o 4.
- No modificar tooling, scripts ni gates del repositorio.

## Decisions

### Decision: Baseline fijo en fecha explicita
- Se fija el baseline con fecha `2026-02-12` y conteo real (`32`) para evitar ambiguedad temporal.
- Alternativa considerada: mantener valor estimado (`29`) hasta iniciar slug 2.
- Razon para descartar alternativa: propaga drift en checkpoints y afecta aceptacion global.

### Decision: Tabla de trazabilidad sin placeholders de ruta
- Para slugs sin `tasks.md` aun, se documenta el estado sin inventar rutas de evidencia.
- Alternativa considerada: mantener `openspec/changes/<slug>/tasks.md` como placeholder.
- Razon para descartar alternativa: incumple el objetivo del change (sin referencias a rutas inexistentes).

### Decision: Change atomico solo documental
- Este slug solo ajusta baseline/plan/trazabilidad y evidencia del propio slug.
- Alternativa considerada: iniciar consolidacion tecnica en el mismo commit.
- Razon para descartar alternativa: rompe atomicidad y contradice la instruccion de no pasar al punto 2.

## Risks / Trade-offs

- [Riesgo] Los slugs 2-4 siguen incompletos en OpenSpec (sin tareas). -> Mitigacion: dejar estado explicito en `PLANS.md` y no ocultar deuda.
- [Riesgo] El baseline puede volver a cambiar si se agregan o quitan skills antes del slug 2. -> Mitigacion: incluir fecha concreta del baseline.

## Migration Plan

1. Crear artefactos del slug 1 (`proposal/specs/design/tasks`).
2. Calcular baseline real en `packs/angular/skills`.
3. Actualizar `PLANS.md` con baseline, checkpoints y tabla de estado real.
4. Ejecutar `openspec validate "<slug>" --type change` y `npm run verify`.
5. Registrar evidencia en `tasks.md`.

Rollback:
- Revertir solo este slug y `PLANS.md` si validacion falla o se detecta alcance fuera del punto 1.

## Open Questions

- Ninguna para este slug. La siguiente decision depende del inicio explicito del punto 2 por parte del usuario.
