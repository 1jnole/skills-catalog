## Context

El plan maestro define una serie atomica `32 -> 22 -> 10`. Esta change cubre exclusivamente la parte 2 (foundation/data): docs bootstrap, state model, template control flow y httpresource. El repositorio ya contiene los nombres canonicos `angular21-state-model`, `angular21-template-control-flow` y `angular21-data-httpresource`, pero sin `SKILL.md`, mientras que las skills legacy aun existen.

## Goals / Non-Goals

**Goals:**
- Publicar contenido canonico completo en las cuatro skills de foundation/data.
- Retirar las diez skills legacy absorbidas por esta fase.
- Verificar y evidenciar el checkpoint intermedio `22` en `tasks.md`.

**Non-Goals:**
- No consolidar routing, DI, defer, RxJS ni testing (parte 3).
- No sincronizar narrativa publica final (`README.md`) fuera del alcance de esta fase.
- No modificar scripts, dependencias ni tooling del repo.

## Decisions

### Decision: Reusar `angular-docs-bootstrap` como canonica de docs
- Se mantiene `angular-docs-bootstrap` como skill canonica y se conserva su rol de bundle para `ARCHITECTURE + STYLING`.
- Alternativa considerada: mantener `angular-architecture-bootstrap` y `angular-styling-bootstrap` como skills separadas.
- Motivo de descarte: contradice la matriz de absorcion del plan y mantiene duplicacion.

### Decision: Consolidar state/template/data en tres skills canonicias
- Se crea `SKILL.md` en `angular21-state-model`, `angular21-template-control-flow` y `angular21-data-httpresource` combinando alcance de las legacy absorbidas.
- Alternativa considerada: mantener skills granulares por tecnica.
- Motivo de descarte: aumenta ruido de enrutamiento y costo de mantenimiento.

### Decision: Eliminar legacy solo despues de completar contenido canonico
- El orden de ejecucion sera: crear/ajustar canonicias y luego borrar legacy.
- Alternativa considerada: borrar legacy primero.
- Motivo de descarte: deja huecos funcionales temporales en el catalogo.

## Risks / Trade-offs

- [Riesgo] Perder guidance puntual al fusionar skills. -> Mitigacion: incluir secciones explicitas por patron dentro de cada skill canonica.
- [Riesgo] Alcance accidental hacia parte 3 o 4. -> Mitigacion: limitar cambios a foundation/data y artifacts del slug 2.
- [Riesgo] Conteo final incorrecto por borrado incompleto. -> Mitigacion: validar inventario por nombre y conteo total (`22`).

## Migration Plan

1. Completar artifacts de la change (`proposal/spec/design/tasks`).
2. Crear/actualizar `SKILL.md` canonicos de foundation/data.
3. Eliminar las diez carpetas legacy absorbidas.
4. Actualizar checkboxes de `tasks.md` y registrar evidencia con comandos/resultados.
5. Ejecutar `openspec validate "angular-skills-consolidate-foundation-and-data" --type change` y `npm run verify`.

Rollback:
- Revertir este slug para restaurar legacy y contenido previo si el checkpoint o validaciones fallan.

## Open Questions

- Ninguna para esta fase. El siguiente ajuste documental del catalogo queda para `angular-skills-catalog-final-sync`.
