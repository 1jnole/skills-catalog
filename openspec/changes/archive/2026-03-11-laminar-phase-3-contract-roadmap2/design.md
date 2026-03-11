## Context

La arquitectura de fase 3 sigue siendo válida: Laminar pasa a ser la primera platform real, AI SDK/OpenAI sigue como model provider layer y el benchmark local sigue siendo la fuente de verdad. El problema actual no es de dirección arquitectónica sino de contrato operativo: `PLAN.md` todavía deja decisiones implícitas sobre `--group-name`, retry/resume, fail-fast, y retirada del legacy.

## Goals

- Reescribir la fase 3 de `PLAN.md` para que sea implementable sin decisiones ocultas.
- Crear `roadmap2/` como preparación explícita y ordenada de la fase 3.
- Poner primero los acuerdos y edge cases, después las tareas y gates.
- Comprobar por escrito que el desglose cubre todo lo que pide `PLAN.md`.

## Non-Goals

- Implementar Laminar.
- Rediseñar la arquitectura general de la migración.
- Abrir todavía el change de implementación de fase 3.

## Decisions

### Decision: mantener la arquitectura y revisar solo el contrato operativo

La revisión de fase 3 no cambia la dirección del plan. Se mantienen:
- Laminar como observability/eval platform.
- AI SDK/OpenAI como model provider layer.
- `skill-forge` como único piloto.
- benchmark semantics locales.

### Decision: `--group-name` sale del contrato de fase 3

`PLAN.md` lo menciona, pero el CLI actual no lo soporta y no es necesario para activar la plataforma Laminar. La revisión debe quitarlo del contrato de la fase.

### Decision: retry y resume siguen siendo locales

`--iteration` y `--retry-errors` se mantienen como contrato público local sobre `iteration-N`, `benchmark.json` y `run.json`, aunque Laminar sea la platform activa.

### Decision: `roadmap2/` ordenado por acuerdos, alineación, tareas y gates

`roadmap2/` debe escribirse en este orden:
1. acuerdos y edge cases
2. comparación contra `PLAN.md`
3. batches de tareas tangibles
4. gates y parity

## Implementation Outline

1. Revisar y reescribir la sección de fase 3 de `PLAN.md`.
2. Añadir una nota breve en `roadmap/README.md` apuntando a `roadmap2/` como preparación de fase 3.
3. Crear `roadmap2/README.md`.
4. Crear `roadmap2/phase-3-agreements.md`.
5. Crear `roadmap2/phase-3-plan-alignment.md`.
6. Crear `roadmap2/phase-3-task-batches.md`.
7. Crear `roadmap2/phase-3-gates-and-parity.md`.

## Risks

- Si las decisiones operativas no quedan explícitas, `roadmap2/` solo duplicará `PLAN.md` y no reducirá ambigüedad.
- Si las tareas se escriben antes que los acuerdos, se esconderán decisiones críticas dentro del backlog operativo.
