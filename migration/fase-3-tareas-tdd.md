# Fase 3 — Tareas tangibles TDD

## Objetivo de la fase
Extraer y estabilizar el **núcleo portable** que sí sobrevive a la migración, dejando fuera de ese núcleo todo lo que pertenezca al runner local, a la plataforma concreta o al wiring histórico.

## Estado de ejecución (2026-03-13)
- Slice ejecutado en este turno: scaffold visible de Fase 3.
- Evidencia:
  - `skills/README.md`
  - `evals/README.md`
  - `evals/engines/promptfoo/README.md`
- Resultado:
  - el nuevo scaffold ya es visible en la raíz del repo,
  - `evals/engines/promptfoo/` ya existe como boundary explícito,
  - pero el núcleo portable sigue físicamente en `scripts/evals/` hasta los siguientes slices.
- Slice ejecutado después: **Tarea 3.1**.
- Evidencia:
  - `evals/contracts/README.md`
  - `scripts/evals/domain/run-results/run-result.schema.test.ts`
- Resultado:
  - el boundary visible `evals/contracts/` ya existe,
  - hay evidencia automatizada de parse para el contrato canónico `run-result`,
  - y queda explícito qué contratos sobreviven y qué no entra todavía en el núcleo.
- Slice ejecutado después: **Tarea 3.2**.
- Evidencia:
  - `scripts/evals/domain/baseline/baseline.ts`
  - `scripts/evals/domain/baseline/baseline.test.ts`
  - `evals/baseline/README.md`
- Resultado:
  - la semántica base `with_skill / without_skill` ya vive en un punto explícito del dominio,
  - schemas y tipos del core reutilizan esa autoridad,
  - y el scaffold nuevo ya hace visible también el boundary de baseline.
- Slice ejecutado después: **Tarea 3.3**.
- Evidencia:
  - `scripts/evals/domain/grading/grading.schema.ts`
  - `scripts/evals/domain/grading/grading.types.ts`
  - `scripts/evals/domain/grading/grade-case.test.ts`
  - `evals/scorers/README.md`
- Resultado:
  - `grading` ya define su propio contrato semántico y deja de depender directamente de shapes de `run-results`,
  - el grading acepta input semántico mínimo (sin campos de authoring ni wiring técnico),
  - y el scaffold nuevo ya expone el boundary de scorers como parte del núcleo portable.
- Slice ejecutado después: **Tarea 3.4**.
- Evidencia:
  - `scripts/evals/domain/benchmark/benchmark.types.ts`
  - `scripts/evals/domain/benchmark/benchmark.test.ts`
  - `evals/benchmark/README.md`
- Resultado:
  - benchmark ya define contrato propio de agregado y reduce acople directo con tipos de `run-results`,
  - hay prueba explícita de agregado usando solo campos normalizados del core (sin metadata de provider),
  - y el scaffold nuevo ya expone el boundary de benchmark.
- Slice ejecutado después: **Tarea 3.5**.
- Evidencia:
  - `scripts/evals/domain/run-results/run-result.schema.ts`
  - `scripts/evals/domain/run-results/run-result.schema.test.ts`
  - `scripts/evals/domain/run-results/run-results.ts`
  - `scripts/evals/domain/run-results/run-results.test.ts`
  - `evals/contracts/run-results-normalization.md`
- Resultado:
  - la normalización quedó explícita como frontera del núcleo con reglas canónicas por status,
  - benchmark consume ese shape local sin depender del report bruto de engine,
  - y los artefactos heredados incompletos se normalizan con fallback controlado para no romper ejecución.
- Siguiente slice recomendado: **Tarea 3.6** para revisar y limpiar residuos de provider en el núcleo.

Esta fase sigue dos ideas ya cerradas en el plan maestro:

- **DDD-lite**: separar con claridad el “cerebro” del sistema de los detalles de orquestación y plataforma.
- **TDD**: cada cambio se hace en slices pequeños, con rojo real, verde mínimo y refactor corto.

---

## Qué entra en esta fase

### Debe quedar dentro del núcleo
- contratos canónicos que siguen vivos,
- grading,
- benchmark,
- normalización de resultados,
- métricas agregadas,
- semántica de comparación `with-skill / without-skill`.

### Debe quedar fuera del núcleo
- provider-specific logic,
- Promptfoo config y adapters,
- filesystem de iteraciones históricas,
- locks,
- retry machinery del runner local,
- wrappers y entrypoints heredados.

---

## Guardrails de la fase

### Guardrails de TDD
- No modificar más de **un comportamiento relevante** por iteración.
- No aceptar como rojo válido un fallo de imports, config o setup.
- No refactorizar mientras el slice no esté en verde.
- No mezclar extracción de lógica pura con cambio de engine.

### Guardrails de diseño
- No introducir `previous-skill` en esta fase.
- No reintroducir `openai` en contratos o tipos del núcleo.
- No meter Promptfoo dentro de benchmark/grading.
- No mover layout físico de `skills/` o `evals/` todavía si eso no es necesario para extraer el núcleo.

### Guardrails de alcance
- Si una pieza es puramente de runner histórico, no se “mejora”: se marca para borrar o dejar fuera del núcleo.
- Si una pieza contiene lógica reusable y detalles históricos mezclados, primero se **extrae la lógica**, luego se decide el destino del resto.

---

## Secuencia recomendada

1. Consolidar el **núcleo de contratos** superviviente.
2. Consolidar la **semántica de comparación** `with-skill / without-skill`.
3. Consolidar **grading** y **benchmark** como núcleo puro.
4. Consolidar la **normalización de resultados** como paso local, independiente del engine.
5. Revisar que el núcleo quede **provider-neutral** y **engine-neutral**.

---

# Tareas tangibles

## Tarea 3.1 — Cerrar el núcleo mínimo de contratos supervivientes

### Objetivo
Definir con claridad qué contratos siguen formando parte del sistema tras quitar el runner local.

### Incluye
- `eval-case`
- `eval-definition`
- `run-result`
- `run-artifact` o equivalente superviviente
- tipos auxiliares que sigan siendo parte del benchmark o la normalización

### No incluye
- contratos exclusivos del runner local histórico,
- shapes ligados a locking, workspace o iteration machinery,
- campos específicos de un provider.

### TDD slice sugerido
1. escribir test de contrato o parse para un caso canónico del núcleo,
2. verificar rojo real,
3. reducir/eliminar campos que ya no pertenecen al núcleo,
4. poner en verde,
5. refactor corto.

### Definition of Done
- existe una lista explícita de contratos supervivientes,
- no queda `openai` como literal de provider en el core superviviente,
- los contratos del runner histórico quedan fuera de este conjunto.

---

## Tarea 3.2 — Fijar la semántica base `with-skill / without-skill`

### Objetivo
Asegurar que el núcleo se apoya solo en el baseline que forma parte del alcance inmediato.

### Trabajo concreto
- revisar tipos y enums que modelan modos,
- confirmar que el núcleo solo necesita:
  - `with_skill`
  - `without_skill`
- retirar o diferir cualquier extensión prematura.

### TDD slice sugerido
1. añadir test sobre comparación básica de modos soportados,
2. rojo real,
3. simplificar tipos o validaciones al baseline actual,
4. verde,
5. refactor.

### Definition of Done
- el núcleo no presupone `previous-skill`,
- la comparación base queda establecida y testeada,
- no hay lógica “preparada” para modos no soportados aún.

---

## Tarea 3.3 — Extraer `grading` como lógica pura y portable

### Objetivo
Garantizar que el grading no depende del engine ni del provider.

### Trabajo concreto
- revisar funciones de grading actuales,
- separar cualquier dato técnico o shape accidental,
- dejar solo inputs/outputs semánticos.

### TDD slice sugerido
1. añadir test de grading sobre un caso normalizado,
2. rojo real,
3. reducir dependencias accidentales,
4. verde,
5. refactor.

### Checklist de revisión
- ¿usa tipos del core y no del engine?
- ¿tolera provider-neutral results?
- ¿la función sigue siendo determinista y rápida?

### Definition of Done
- grading funciona con resultados normalizados,
- no conoce Promptfoo ni OpenAI,
- no depende del runner histórico.

---

## Tarea 3.4 — Extraer `benchmark` como agregado puro del núcleo

### Objetivo
Dejar claro que benchmark pertenece al núcleo local, no al engine.

### Trabajo concreto
- revisar agregación actual,
- confirmar métricas mínimas que sí sobreviven,
- aislar cualquier cálculo todavía acoplado a artifacts históricos.

### TDD slice sugerido
1. test de agregado benchmark sobre entradas mínimas representativas,
2. rojo real,
3. simplificación o extracción de cálculo puro,
4. verde,
5. refactor.

### Definition of Done
- benchmark se construye a partir de resultados normalizados del core,
- no depende del shape de reports del runner histórico,
- sigue siendo reutilizable aunque cambie el engine.

---

## Tarea 3.5 — Consolidar la normalización de resultados como frontera del núcleo

### Objetivo
Definir un formato local y estable de resultado que el engine pueda alimentar y el núcleo pueda consumir.

### Trabajo concreto
- revisar normalización actual de case results,
- decidir qué shape local queda como canon,
- asegurar que benchmark y grading dependen de ese shape y no del report bruto del engine.

### TDD slice sugerido
1. test de normalización desde una entrada representativa,
2. rojo real,
3. ajuste del normalizador o del contrato local,
4. verde,
5. refactor.

### Definition of Done
- existe un shape local estable para resultados,
- grading y benchmark dependen de él,
- el engine futuro podrá adaptarse a ese shape sin contaminar el núcleo.

---

## Tarea 3.6 — Revisar y limpiar residuos de provider en el núcleo

### Objetivo
Cerrar el desacoplamiento conceptual iniciado en Fase 2, pero ahora enfocado al núcleo puro.

### Trabajo concreto
Buscar y eliminar del núcleo superviviente:
- literales de provider (`openai`, etc.),
- discriminadores innecesarios ligados al proveedor,
- errores o statuses modelados con semántica exclusiva del proveedor.

### TDD slice sugerido
1. test que pruebe parse o normalización sin provider hardcoded,
2. rojo real,
3. retirar acoplamiento,
4. verde,
5. refactor.

### Definition of Done
- el núcleo no codifica un proveedor concreto,
- el provider queda completamente fuera de `contracts`, `grading`, `benchmark` y `run-results`.

---

## Tarea 3.7 — Revisión gris final del núcleo

### Objetivo
Comprobar que lo que se conserva como núcleo es realmente portátil y que el resto puede caer o moverse a fases posteriores.

### Trabajo concreto
Revisar estas categorías:
- piezas que quedan claramente en el núcleo,
- piezas que deben pasar a adapter/engine,
- piezas que pueden borrarse,
- piezas que deben diferirse a fases posteriores.

### Salida esperada
Una clasificación final breve:
- **core stays**
- **moves to engine**
- **delete later**
- **defer**

### Definition of Done
- el núcleo superviviente queda delimitado,
- no hay ambigüedad importante sobre ownership,
- Fase 4 puede centrarse ya en engine integration sin rediscutir el brain.

---

# Stop conditions de la fase

Detener la fase si aparece cualquiera de estos casos:

- para cerrar una tarea necesitas reabrir la decisión sobre `previous-skill`,
- necesitas mover layout físico antes de tenerlo planeado en fase posterior,
- empiezas a modelar detalles de Promptfoo dentro del núcleo,
- la normalización de resultados sigue acoplada a provider o runner histórico de forma no trivial.

---

# Criterios de cierre de Fase 3

La Fase 3 se considera cerrada cuando:

1. el núcleo superviviente está delimitado;
2. contratos, grading, benchmark y normalización ya forman un conjunto coherente;
3. el núcleo ya no depende de provider específico;
4. `with-skill / without-skill` queda como baseline explícito y suficiente para esta etapa;
5. el engine futuro podrá conectarse al núcleo mediante adaptación, no mediante invasión del dominio.

---

# No hacer en esta fase

- No integrar todavía Promptfoo a fondo.
- No introducir `previous-skill`.
- No mover todo el layout físico final del repo.
- No reabrir debate sobre delete-first de piezas claramente muertas.
- No reconstruir un runner local “mejorado”.
