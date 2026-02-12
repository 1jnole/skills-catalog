## Context

La serie atomica del plan (`32 -> 22 -> 10`) ya ejecuto consolidaciones funcionales en foundation/data y platform/quality. El ultimo paso pendiente es documental: hacer visible el catalogo canonico final en la narrativa publica y cerrar la trazabilidad en `PLANS.md` sin abrir nuevo alcance tecnico.

## Goals / Non-Goals

**Goals:**
- Reflejar en `README.md` el catalogo Angular final de `10` skills.
- Cerrar la tabla de estado en `PLANS.md` con rutas de evidencia archivadas por slug.
- Mantener `AGENTS.md` estable salvo que exista una inconsistencia operativa real.

**Non-Goals:**
- No modificar contenido de `SKILL.md` canonicas.
- No tocar tooling, dependencias, scripts o gates.
- No introducir nuevas capacidades funcionales fuera del cierre documental.

## Decisions

### Decision: Enumerar explicitamente el catalogo Angular final en README
- Se agregara una seccion breve y escaneable con los `10` skills canonicos.
- Alternativa considerada: mantener README generico sin inventario concreto.
- Motivo de descarte: dificulta confirmar rapidamente que la consolidacion termino.

### Decision: Usar PLANS como fuente de trazabilidad de serie
- Se actualizara la tabla `Estado y trazabilidad` para alinear estados/evidencias con los slugs archivados.
- Alternativa considerada: dejar PLANS historico y confiar solo en `openspec list`.
- Motivo de descarte: rompe la promesa del plan como vista ejecutiva del progreso.

### Decision: Evitar cambios en AGENTS salvo drift
- `AGENTS.md` se mantendra sin cambios si ya apunta correctamente a `openspec/AGENTS.override.md` y no hay conflictos.
- Alternativa considerada: tocar AGENTS para "marcar cierre".
- Motivo de descarte: agregaria churn sin valor operativo.

## Risks / Trade-offs

- [Riesgo] Divergencia entre tabla de PLANS y artefactos reales archivados. -> Mitigacion: usar rutas de evidencia exactas y validacion final con `openspec`.
- [Riesgo] README demasiado largo al listar skills. -> Mitigacion: seccion compacta solo con nombres canonicos.
- [Riesgo] Scope creep hacia refactors de contenido. -> Mitigacion: limitar el diff a README/PLANS y artefactos del slug.

## Migration Plan

1. Completar artefactos del slug (`proposal/spec/design/tasks`).
2. Actualizar `README.md` con el inventario canonico Angular final.
3. Actualizar `PLANS.md` para cerrar estados y evidencias del plan.
4. Revisar `AGENTS.md`; no modificar si ya esta alineado.
5. Ejecutar `openspec validate "angular-skills-catalog-final-sync" --type change` y `npm run verify`.
6. Registrar evidencia en `tasks.md`.

Rollback:
- Revertir este slug restaura el estado documental previo sin impacto funcional/runtime.

## Open Questions

- Ninguna. El alcance esta acotado y verificable.
