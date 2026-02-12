## Context

El plan maestro define una serie atomica `32 -> 22 -> 10`. Esta change cubre exclusivamente la parte 3 (platform/quality): routing, DI, defer/hydration, RxJS y testing. El estado actual del catalogo esta en `22` skills y aun mantiene 17 skills legacy de estos dominios.

## Goals / Non-Goals

**Goals:**
- Publicar contenido canonico completo en las cinco skills de platform/quality.
- Retirar las diecisiete skills legacy absorbidas por esta fase.
- Verificar y evidenciar el checkpoint final `10` en `tasks.md`.

**Non-Goals:**
- No tocar consolidacion foundation/data (parte 2).
- No sincronizar narrativa publica final (`README.md`) fuera del alcance de la parte 4.
- No modificar scripts, dependencias ni tooling del repo.

## Decisions

### Decision: Consolidar routing en una skill canonica
- Se crea `angular21-routing-patterns` absorbiendo component input binding, guards, resolvers y standalone lazy loading.
- Alternativa considerada: mantener skills separadas por tecnica.
- Motivo de descarte: mantiene ruido de enrutamiento y duplicacion.

### Decision: Consolidar DI en una skill canonica
- Se crea `angular21-di-patterns` absorbiendo provider scoping, injection context e InjectionToken config/factory composition.
- Alternativa considerada: separar DI por subdominios.
- Motivo de descarte: aumenta carga de mantenimiento para guidance fuertemente relacionado.

### Decision: Consolidar defer + hydration en una skill canonica
- Se crea `angular21-defer-hydration` absorbiendo defer triggers/states, hydrate triggers e incremental hydration setup.
- Alternativa considerada: separar defer de hydration.
- Motivo de descarte: fragmenta decisiones UX/performance que deben evaluarse juntas.

### Decision: Consolidar RxJS interop + concurrency en una skill canonica
- Se crea `angular21-rxjs-interop-concurrency` absorbiendo operator choice y takeUntilDestroyed.
- Alternativa considerada: mantener skills individuales.
- Motivo de descarte: la eleccion de operador y la seguridad de ciclo de vida suelen resolverse en el mismo flujo.

### Decision: Consolidar testing en una skill canonica
- Se crea `angular21-testing-strategy` absorbiendo component scenarios, DI overrides, HttpClient testing y defer testing.
- Alternativa considerada: separar testing por capa.
- Motivo de descarte: rompe la estrategia de pruebas integrada y aumenta duplicacion.

### Decision: Eliminar legacy solo despues de completar canonicias
- El orden sera: crear canonicias y luego borrar legacy.
- Alternativa considerada: borrar primero.
- Motivo de descarte: deja huecos temporales en el catalogo.

## Risks / Trade-offs

- [Riesgo] Perder detalles tecnicos al fusionar skills. -> Mitigacion: incluir workflows y pitfalls explicitos por patron dentro de cada skill canonica.
- [Riesgo] Alcance accidental fuera de parte 3. -> Mitigacion: limitar cambios a platform/quality y artifacts del slug.
- [Riesgo] Conteo final incorrecto por borrado incompleto. -> Mitigacion: validar inventario por nombres legacy y conteo total (`10`).

## Migration Plan

1. Completar artifacts de la change (`proposal/spec/design/tasks`).
2. Crear `SKILL.md` canonicos de routing/DI/defer/RxJS/testing.
3. Eliminar las diecisiete carpetas legacy absorbidas.
4. Actualizar checkboxes de `tasks.md` y registrar evidencia con comandos/resultados.
5. Ejecutar `openspec validate "angular-skills-consolidate-platform-and-quality" --type change` y `npm run verify`.

Rollback:
- Revertir este slug para restaurar legacy y contenido previo si el checkpoint o validaciones fallan.

## Open Questions

- Ninguna para esta fase. La sincronizacion documental final queda para `angular-skills-catalog-final-sync`.
