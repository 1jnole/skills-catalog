# Laminar Migration - Phase 1 Tasks

## Objective

Neutralize naming and public architecture before deeper migration work. This phase only changes boundaries, naming, and public documentation. It does not change benchmark semantics or introduce a generic platform abstraction.

## End State

At the end of Phase 1:

- the supported public command is `run-evals`
- `run-lmnr-eval` remains only as a temporary internal alias and is not documented as the supported path
- the Laminar integration lives under `scripts/evals/platforms/laminar/`
- `scripts/evals/providers/` is clearly reserved for model providers
- docs and Mermaid diagrams describe Laminar as an observability/eval platform, not a backend

## Task List

### 1. Rename the public command

- Rename the public command from `run-lmnr-eval` to `run-evals`.
- Keep `run-lmnr-eval` only as a temporary internal alias during migration.
- Do not document `run-lmnr-eval` as the supported path.
- Update any public references so `run-evals` is the supported path.

### 2. Rename the Laminar integration folder

- Move the Laminar integration from `scripts/evals/lmnr/` to `scripts/evals/platforms/laminar/`.
- Update imports and references to the new path.
- Keep behavior intact in this phase; only the boundary and naming change.

### 3. Freeze folder meanings

- `scripts/evals/domain/` = core eval domain
- `scripts/evals/providers/` = model provider layer
- `scripts/evals/platforms/laminar/` = observability/eval platform adapter
- `scripts/evals/run/` and related legacy structures remain temporary until Phase 3

### 4. Update public documentation

Update the public docs so they all tell the same story:

- `README.md`
- `AGENTS.md`
- `scripts/evals/README.md`

If needed, align supporting docs so they do not contradict the new naming:

- `plans/02-eval-blueprint.md`
- `plans/05-artifacts-reference.md`

### 5. Update architecture diagrams

Maintain:

- the final context/relationship diagram
- the current state diagram
- the Phase 1 result diagram

Both diagrams must use the new naming:

- `run-evals`
- `platforms/laminar`
- `model provider layer`
- `observability/eval platform`

## Validation

### Search checks

- No public active references remain to `run-lmnr-eval`, except the explicit temporary internal alias.
- No active docs present `scripts/evals/lmnr/` as the canonical location.

### Build checks

- `npx tsc -p scripts/evals/tsconfig.json`

### Sanity checks

- `run-evals` still validates `evals.json` before execution.
- `README.md`, `AGENTS.md`, and `scripts/evals/README.md` describe the same architecture.

## Risks / Notes

- Do not change scoring, gates, or benchmark aggregation in this phase.
- Do not redesign `run.json` in this phase.
- Do not remove the internal legacy runner yet unless it is clearly unused.
- Do not introduce a generic interface like `EvalPlatformAdapter` yet.

## Done Gate

Phase 1 is complete only when:

- the supported public command is `run-evals`
- `run-lmnr-eval` is, at most, an internal transitional alias
- Laminar is described as an observability/eval platform, not a backend
- `providers/` is clearly reserved for model providers
- docs and Mermaid diagrams match the actual naming and boundaries
- `skill-forge` remains the only migration pilot

## Assumptions

- Phase 1 is limited to naming, boundaries, and public surface cleanup.
- Legacy internals may remain temporarily if they are no longer the supported public path.
- The temporary `run-lmnr-eval` alias will be removed once the Laminar path is fully stable.
