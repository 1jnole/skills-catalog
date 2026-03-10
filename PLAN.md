# OpenSpec por Fases para estabilizar `skill-forge` hasta Fase 4

## Resumen
Crear primero un change umbrella `phase-skill-system-stabilization` que introduzca la spec normativa del programa de estabilización por fases. Esa spec será la fuente de verdad del roadmap y dividirá la implementación en cuatro child changes, alineados con el curso hasta Fase 4 y con precedencia documental explícita: `plans/` manda; el curso rellena huecos metodológicos; el código actual solo sirve como restricción de arquitectura física, no como comportamiento válido.

El capability único a introducir en OpenSpec será `skill-system-stability`, y todos los child changes modificarán ese mismo capability para evitar specs paralelas o solapadas.

## Modelo recomendado por fase
Tomo tu corrección como referencia operativa del plan: usar `5.4` como modelo general de diseño/especificación y `5.3 code x` como modelo de ejecución técnica/coding.

Recomendación por fase:
- Fase 1 `discover-skill-system-language`: `5.4`, `high`.
  Motivo: descubrimiento, lenguaje ubicuo, pains, restricciones y precedencia documental.
- Fase 2 `model-skill-system-domain`: `5.4`, `high`.
  Motivo: modelado conceptual, clasificación de artefactos y Mermaid consistente.
- Fase 3 `define-skill-system-contexts`: `5.4`, `high`.
  Motivo: bounded contexts, ownership, handoffs y límites entre `skill-forge`, `skill-eval-forge` y runtime compartido.
- Fase 4 `define-skill-system-contracts`: `5.3 code x`, `high`.
  Motivo: aquí ya hay diseño técnico, contratos, skeleton y decisiones de estructura.
- Redacción mecánica de artifacts OpenSpec, checklisting y tasks: `5.3 code x`, `medium`.
- Revisión final de consistencia de propuesta/spec/design/tasks antes de cerrar cada slug: `5.4`, `medium`.

Regla de escalado:
- `medium` para trabajo mecánico y convergencia de artifacts ya decididos.
- `high` como default del programa.
- `xhigh` solo para bloqueos reales: conflicto entre `plans/`, curso y arquitectura; o ambigüedad contractual que impida cerrar una fase.
- No usar `mini` en estas cuatro fases. Aquí prima consistencia del modelo, no throughput.

## Cambios OpenSpec
### 1. Change umbrella: `phase-skill-system-stabilization`
Este change crea la spec inicial y no implementa comportamiento final. Debe definir:
- Secuencia obligatoria de Fase 1 a Fase 4 y prohibición de saltar a Fase 5/6.
- Precedencia de fuentes: `plans/*` > curso `Domain Modeling for Humans and AI` > implementación actual como restricción arquitectónica.
- Regla de frontera: `skill-forge` termina en `Eval Handoff Contract ready`; `skill-eval-forge` empieza ahí.
- Regla de preservación arquitectónica: se conservan `packs/`, `evals/shared/`, `evals/skills/`, `scripts/`; el comportamiento actual no se preserva.
- Exit criteria por fase, modelo recomendado por fase y dependencia obligatoria entre slugs.

Artefactos del umbrella:
- `openspec/changes/phase-skill-system-stabilization/{proposal,design,tasks}.md`
- `openspec/specs/skill-system-stability/spec.md`
- `docs/skill-system/README.md` como índice humano de fases y artefactos

### 2. Child change Fase 1: `discover-skill-system-language`
Objetivo: cerrar el problem space del sistema `skill-forge` / `skill-eval-forge`.

Debe producir:
- Glosario canónico en `docs/skill-system/phases/phase-1-ubiquitous-language.md`
- Lista de pains, restricciones, excepciones y preguntas cerradas
- Candidato explícito de core domain
- Lista de non-goals: nada de lógica final, nada de mezcla con AGENTS/vault, nada de Fase 5/6

Términos mínimos obligatorios:
- `single job`, `trigger boundary`, `non-goals`, `stop conditions`, `success model`
- `Eval Handoff Contract`, `golden set`, `negative set`, `baseline`, `review pack`
- `skill authoring`, `skill eval authoring`, `shared eval runtime`

### 3. Child change Fase 2: `model-skill-system-domain`
Objetivo: transformar Fase 1 en modelo conceptual.

Debe producir:
- `docs/skill-system/phases/phase-2-domain-model.md`
- Domain Inventory con clasificación y justificación
- Mermaid conceptual
- Constraints Matrix

Inventario mínimo a modelar:
- `SkillDefinition`, `EvalDefinition`, `EvalHandoffContract`, `EvalCase`, `EvalDataset`, `GatePolicy`, `ManualDogfoodingRecord`, `ReviewPack`, `BaselineSnapshot`
- Los Value Objects mínimos incluyen `TriggerBoundary`, `SuccessModel`, `ActivationProbe`, `FailureTaxonomy`, `CaseExpectation`
- El Mermaid debe mostrar el flujo `SkillDefinition -> EvalHandoffContract -> EvalDefinition -> Dataset/Checks/ReviewPack/Baseline`

### 4. Child change Fase 3: `define-skill-system-contexts`
Objetivo: fijar bounded contexts y handoffs.

Debe producir:
- `docs/skill-system/phases/phase-3-context-map.md`
- Context Map y ACLs/handoffs
- Regla de ownership por contexto

Contextos obligatorios:
- `Skill Authoring Context` para `skill-forge`
- `Eval Authoring Context` para `skill-eval-forge`
- `Shared Eval Runtime Context` para `evals/shared` y `scripts`
- `Catalog Governance Context` para `plans/`, `AGENTS.md`, `openspec/`

Decisiones obligatorias:
- `skill-forge` no define runtime de eval
- `skill-eval-forge` no redefine el contrato de authoring
- `Shared Eval Runtime` consume contratos, no define el dominio
- El único handoff entre authoring y eval authoring es `Eval Handoff Contract`

### 5. Child change Fase 4: `define-skill-system-contracts`
Objetivo: crear la source of truth técnica y el skeleton, sin lógica de negocio real.

Debe producir:
- `docs/skill-system/phases/phase-4-technical-contract.md`
- `packages/types/` como source of truth con `Zod + TypeScript`
- Skeleton separado para `packs/core/skill-forge/` y `packs/core/skill-eval-forge/`
- Compatibilidad transitoria con `evals/shared/schemas/` como mirrors derivados, no como origen

Contratos públicos mínimos en `packages/types/src/`:
- `SkillDefinitionSchema`
- `SkillBoundarySchema`
- `SuccessModelSchema`
- `ActivationProbeSchema`
- `EvalHandoffContractSchema`
- `EvalCaseSchema`
- `EvalDatasetSchema`
- `GatePolicySchema`
- `ManualDogfoodingRecordSchema`
- `FailureTaxonomySchema`
- `ReviewPackSummarySchema`
- `BaselineSnapshotSchema`

Decisiones técnicas cerradas:
- `packages/types` pasa a ser la única source of truth contractual
- `evals/shared/schemas/*` queda como compatibilidad generada o sincronizada desde `packages/types`
- Se introduce `typescript` y `zod` de forma aislada al paquete de contratos
- No se migra todavía la lógica `.mjs` existente ni se arregla el drift operativo del CLI en esta fase
- No se implementa lógica real de `skill-forge` ni `skill-eval-forge`; solo skeleton y contratos

## Interfaces y tipos públicos
La spec debe declarar como interfaces públicas del sistema:
- `SkillDefinition`
- `EvalHandoffContract`
- `EvalCase`
- `EvalDataset`
- `GatePolicy`
- `ManualDogfoodingRecord`
- `ReviewPackSummary`
- `BaselineSnapshot`

También debe declarar dos fronteras públicas:
- salida de `skill-forge`: `EvalHandoffContract ready`
- entrada de `skill-eval-forge`: `EvalHandoffContract ready`

## Plan de validación
Para el umbrella y cada child change:
- `openspec status --change "<slug>" --json`
- `openspec validate "<slug>" --type change`

Para Fase 4 además:
- `npm run contracts:check` o equivalente `tsc --noEmit` sobre `packages/types`
- validación de exports y generación/sincronización de mirrors en `evals/shared/schemas`
- revisión explícita de que no se añadió lógica de negocio real a los skeletons

## Supuestos y defaults fijados
- Se trabajará con un umbrella slug y cuatro child slugs.
- El límite de este programa es Fase 4; Fase 5 y Fase 6 quedan fuera.
- `plans/` sigue siendo la referencia principal de negocio y gobernanza.
- El curso solo rellena metodología no contemplada en `plans/`.
- El comportamiento actual de `skill-forge` y su eval se considera inválido; solo se conserva la arquitectura física del repo.
- El drift actual de `docs/evals-operations.md` y los comandos npm no entra en este programa salvo que una fase posterior lo abra como cambio independiente.
- La política de modelos por defecto será `high`; `medium` solo para trabajo mecánico; `xhigh` solo ante bloqueo real.
