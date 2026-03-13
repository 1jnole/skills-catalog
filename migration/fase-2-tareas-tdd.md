# Fase 2 — Tareas tangibles en orden TDD

## Objetivo de la fase

Abrir las **costuras estructurales mínimas** para que el repo pueda dejar atrás el runner local sin romper el contrato local.

En esta fase **no** se implanta todavía el layout final `skills/ + evals/` ni Promptfoo como engine completo. El objetivo es dejar preparado el terreno para esos cambios.

Los dos frentes de trabajo de la fase son:

1. **resolver/config de paths**
2. **desacoplamiento de provider en contracts**

## Estado de ejecución (2026-03-13)
- Slice ejecutado en este turno: **Tarea 2.1**.
- Evidencia: `scripts/evals/docs/fase-2-paths-contract.md`.
- Slice ejecutado después: **Tarea 2.4**.
- Evidencia:
  - `scripts/evals/application/load-eval-definition/load-eval-definition.test.ts`
  - prueba de integración para `resolveEvalPath(...)` y `resolveEvalRunsRoot(...)` vía config.
- Slice ejecutado después: **Tarea 2.8**.
- Evidencia:
  - `scripts/evals/docs/fase-2-core-inventory.md`
  - referencia añadida en `scripts/evals/README.md`
- Estado práctico de la fase: no quedan slices pendientes de implementación real; lo que queda es cerrar o ajustar la documentación del plan si se quiere dejarla 100% alineada con el repo actual.
- Tareas ya materializadas en código antes de este cierre documental:
  - `2.2` y `2.3`: el resolver único ya gobierna `eval-definition`, `runs/` y paths derivados críticos.
  - `2.5`, `2.6` y `2.7`: el desacoplamiento de provider ya está reflejado en contracts y persistencia soportada.

---

## Flujo que seguimos

La fase sigue el mismo patrón acordado:

- **Entrada legacy-first**: trabajamos sobre el repo real y sus hardcodes actuales.
- **TDD por slice pequeño**:
  1. rojo real,
  2. cambio mínimo,
  3. verde,
  4. refactor corto,
  5. comprobación de ownership.

---

## Guardrails de la fase

### Guardrails de alcance
- No mover todavía `skills/`, `evals/` ni `runs/` a su layout final.
- No introducir todavía `Promptfoo` como engine operativo completo.
- No meter `previous-skill` en esta fase.
- No reabrir la discusión de `--iteration` / `--retry-errors` si ya quedó cerrada en Fase 1.
- No usar esta fase para rediseñar benchmark o reports por estética.

### Guardrails de TDD
- Cada tarea empieza por un test que falle por el motivo correcto.
- No mezclar resolver de paths y provider-neutrality en el mismo slice.
- No aceptar como rojo válido un fallo de imports, `tsconfig` o setup accidental.
- El refactor solo ocurre después de verde.

### Guardrails de diseño
- El **resolver de paths** no debe contener lógica de negocio.
- Los **contracts** no deben fijar un provider concreto en su semántica canónica.
- No duplicar schemas y types si el schema ya puede ser Source of Truth.
- No convertir metadata técnica del engine en parte del benchmark local.

---

## Mapa actual del repo que tomamos como base

La fase se apoya sobre estas piezas actuales de `scripts/evals/`:

- `application/load-eval-definition/load-eval-definition.ts`
- `application/load-eval-definition/read-eval-definition.ts`
- `domain/eval-definition/*`
- `domain/eval-case/*`
- `domain/run-results/*`
- `domain/benchmark/*`
- `infrastructure/filesystem/eval-runs/*`
- `infrastructure/filesystem/eval-paths.ts`
- `infrastructure/filesystem/read-skill-prompt.ts`
- `infrastructure/laminar/*`

Y en estos puntos estructurales relevantes del estado actual:

- `load-eval-definition.ts` ya resuelve paths vía la autoridad de `eval-paths.ts`
- `resolveEvalRunsRoot(...)` ya depende de la misma autoridad
- `run-artifact.schema.ts` ya no fija `provider: 'openai'` como literal obligatorio
- `execute-run-eval-iteration.ts` ya persiste provider como metadata técnica opcional

---

# Orden de trabajo

## Tarea 2.1 — Documentar el contrato de paths actual y el target inmediato

### Objetivo
Dejar explícito qué rutas están hoy hardcodeadas y cuáles serán las primeras rutas resueltas por configuración.

### Rojo
No existe un documento corto que diga:
- qué se resuelve hoy desde `packs/core/...`,
- qué rutas dependen del layout actual,
- qué rutas deben pasar por el nuevo resolver.

### Verde mínimo
Crear un documento breve dentro de `scripts/evals/` con:
- rutas actuales hardcodeadas,
- puntos de entrada afectados,
- rutas críticas que el resolver cubrirá primero:
  - `evals.json`
  - `runs/` o equivalente temporal
  - skill root
  - fixtures
  - reports

### Archivos candidatos
- `scripts/evals/README.md`
- o `scripts/evals/docs/fase-2-paths-contract.md`

### Definition of Done
- El documento existe.
- Identifica claramente los hardcodes actuales.
- Nombra qué **no** entra todavía en esta fase.

### Antiobjetivos
- No diseñar aún el layout final completo.
- No mover archivos en esta tarea.

---

## Tarea 2.2 — Introducir un resolver único para `eval-definition`

### Objetivo
Sacar de `load-eval-definition.ts` el hardcode principal de `packs/core/.../evals/evals.json`.

### Rojo
Añadir un test que falle si la resolución de `eval-definition` sigue dependiendo directamente del hardcode actual en varios puntos.

### Verde mínimo
Crear una pieza única de resolución, por ejemplo:
- `scripts/evals/application/paths/resolve-eval-path.ts`
- o `scripts/evals/config/paths.ts`

Y hacer que `load-eval-definition.ts` la use como única vía para resolver el archivo de entrada.

### Archivos candidatos
- `scripts/evals/application/load-eval-definition/load-eval-definition.test.ts`
- `scripts/evals/application/load-eval-definition/load-eval-definition.ts`
- nuevo módulo de paths

### Definition of Done
- `resolveEvalPath(...)` deja de construir la ruta inline.
- Hay una única autoridad de resolución para `eval-definition`.
- Los tests existentes de carga siguen verdes.

### Antiobjetivos
- No introducir todavía toda la resolución de fixtures, reports y runs.
- No cambiar aún el layout físico.

---

## Tarea 2.3 — Introducir un resolver único para `runs/` y paths derivados

### Objetivo
Sacar de `load-eval-definition.ts` y del resto del código el hardcode del root de runs.

### Rojo
Añadir o ajustar un test que falle si `resolveEvalRunsRoot(...)` sigue incrustando `packs/core/.../evals/runs` como única forma posible.

### Verde mínimo
Centralizar la resolución de:
- root de runs temporal,
- report root temporal,
- skill root,
- paths derivados que hoy dependen del layout actual.

### Archivos candidatos
- nuevo módulo de paths/config
- `scripts/evals/application/load-eval-definition/load-eval-definition.ts`
- `scripts/evals/infrastructure/filesystem/eval-runs/resolve-workspace.ts`
- piezas lectoras/escritoras que dependan de paths derivados

### Definition of Done
- `runs/` deja de resolverse con hardcodes repartidos.
- `resolve-workspace.ts` consume la nueva autoridad de paths donde aplique.
- Sigue funcionando el camino actual sin mover layout todavía.

### Antiobjetivos
- No rehacer aún el filesystem de iteraciones.
- No tocar la decisión ya tomada sobre supervivencia/deprecación de `--iteration` y `--retry-errors`.

---

## Tarea 2.4 — Añadir test de integración pequeño para el resolver de paths

### Objetivo
Asegurar que el nuevo resolver no es solo cosmético.

### Rojo
Crear un test pequeño que falle si un cambio en el layout configurado no se refleja en la resolución efectiva.

### Verde mínimo
Añadir un test de integración acotado que valide, como mínimo, uno de estos escenarios:
- skill localizada por config/resolver
- `evals.json` resuelto vía resolver
- `runs/` derivado desde la misma autoridad de paths

### Archivos candidatos
- `scripts/evals/application/load-eval-definition/*.test.ts`
- o nuevo test co-localizado del módulo de paths

### Definition of Done
- El resolver demuestra ser autoridad real, no solo helper.
- El test falla si alguien vuelve a introducir hardcodes en el punto crítico cubierto.

### Antiobjetivos
- No convertirlo en un test end-to-end pesado.
- No atravesar toda la iteración.

---

## Tarea 2.5 — Caracterizar el acoplamiento actual a provider en contracts

### Objetivo
Hacer visible, con tests, dónde el core todavía fija `openai` como parte del contrato.

### Rojo
Añadir o ajustar tests que evidencien el acoplamiento actual en:
- `run-artifact.schema.ts`
- `run-result.schema.ts` si aplica
- cualquier tipo o helper que dependa de `provider: 'openai'`

### Verde mínimo
Dejar tests que fallen por el motivo correcto cuando el contrato siga siendo provider-specific.

### Archivos candidatos
- `scripts/evals/domain/run-results/run-results.test.ts`
- nuevos tests en `scripts/evals/domain/run-results/`

### Definition of Done
- Existe evidencia automatizada del acoplamiento actual.
- Se sabe exactamente qué shapes habrá que tocar.

### Antiobjetivos
- No borrar aún `infrastructure/providers/openai/`.
- No mezclar esta tarea con paths.

---

## Tarea 2.6 — Hacer provider-neutral `run-artifact` en el core

### Objetivo
Quitar `z.literal('openai')` de los contracts canónicos sin perder la información que todavía pueda ser útil como metadata técnica.

### Rojo
Los tests de la tarea anterior deben fallar mientras `run-artifact.schema.ts` siga fijando `openai` como único valor válido.

### Verde mínimo
Cambiar el contrato a una forma neutral. Opciones razonables:
- provider opcional como string técnica no canónica,
- o metadata separada fuera del contrato semántico principal.

La clave es que el significado del artifact ya no dependa de un provider concreto.

### Archivos candidatos
- `scripts/evals/domain/run-results/run-artifact.schema.ts`
- `scripts/evals/domain/run-results/run-artifact.types.ts`
- tests asociados

### Definition of Done
- El schema deja de fijar `openai` literal.
- El core sigue expresando correctamente:
  - `mode`
  - `status`
  - `error`
  - semántica de resultado
- Los tests quedan verdes.

### Antiobjetivos
- No introducir aún una taxonomía completa de providers.
- No mover metadata de engine a benchmark.

---

## Tarea 2.7 — Hacer provider-neutral la persistencia de resultados

### Objetivo
Evitar que la orquestación siga persistiendo `provider: 'openai'` como parte del significado local de `run.json`.

### Rojo
Añadir o ajustar un test que falle si `execute-run-eval-iteration.ts` sigue escribiendo provider acoplado como contrato canónico.

### Verde mínimo
Modificar la persistencia para que:
- o bien no escriba provider en el contrato canónico,
- o lo trate como metadata técnica opcional y no esencial para benchmark/semántica.

### Archivos candidatos
- `scripts/evals/application/run-eval-iteration/execute-run-eval-iteration.test.ts`
- `scripts/evals/application/run-eval-iteration/execute-run-eval-iteration.ts`
- `scripts/evals/domain/run-results/*`

### Definition of Done
- El resultado normalizado ya no depende de `openai`.
- La ruta actual sigue funcionando.
- No se toca todavía la integración final con Promptfoo.

### Antiobjetivos
- No reescribir el caso de uso entero.
- No introducir aún adapters de engine.

---

## Tarea 2.8 — Consolidar el núcleo superviviente en un inventario estable

### Objetivo
Cerrar la fase dejando explícito qué piezas sobreviven a la migración y cuáles ya son claramente transitorias.

### Rojo
No existe un inventario corto y estable del núcleo que seguirá vivo tras cambiar layout/engine.

### Verde mínimo
Crear o actualizar un documento con el inventario del núcleo superviviente:
- `eval-case`
- `eval-definition`
- `run-result`
- benchmark
- grading
- normalización
- baseline `with-skill / without-skill`
- resolver de paths como costura estructural nueva

Y marcar como transitorio lo que corresponda.

### Archivos candidatos
- `scripts/evals/README.md`
- o `scripts/evals/docs/fase-2-core-inventory.md`

### Definition of Done
- El núcleo superviviente está listado.
- El repo ya permite distinguir mejor entre:
  - core portable,
  - piezas transitorias,
  - layout actual todavía heredado.

### Antiobjetivos
- No mover todavía todo el árbol final.
- No usar este inventario para abrir nuevas fases.

---

# Criterios de cierre de Fase 2

La fase se considera cerrada cuando se cumplen todos estos puntos:

1. Existe una **autoridad única de paths** para al menos:
   - `eval-definition`
   - `runs/` o equivalente temporal
   - skill root / paths derivados críticos
2. Los contracts canónicos ya no fijan `openai` como provider literal.
3. La persistencia/resultados normalizados ya no dependen semánticamente de un provider concreto.
4. El núcleo superviviente queda inventariado de forma explícita.
5. El repo queda preparado para una fase posterior donde sí podrá:
   - mover layout,
   - encapsular Promptfoo,
   - y separar mejor `skills/` y `evals/`.

---

# Stop conditions de la fase

Parar y replanificar si ocurre cualquiera de estas situaciones:

- el resolver de paths empieza a arrastrar lógica de negocio,
- el desacoplamiento de provider obliga a cambiar benchmark semántico sin haberlo previsto,
- aparece una dependencia no mapeada que hace imposible mantener el comportamiento actual sin mover layout demasiado pronto,
- se intenta introducir `previous-skill` en mitad de la fase,
- se intenta convertir Promptfoo en engine operativo antes de cerrar las costuras.
