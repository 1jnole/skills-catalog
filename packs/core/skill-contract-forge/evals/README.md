# skill-contract-forge eval authoring

This folder owns the canonical eval authoring source for `skill-contract-forge`.

## Source of truth

- `evals.json` is the active authoring contract for this skill's eval cases.
- Promptfoo runtime suites still live outside this folder under `evals/engines/promptfoo/`.
- Until the dedicated sync slug lands, runtime-facing Promptfoo suite files remain maintained separately from this authoring source.

## Boundary

- This folder does not own runtime execution.
- This folder does not ship Promptfoo configs, providers, fixtures, or generated outputs.
- This folder does not contain a local runner, no wrapper CLI, grading layer, or alternative eval engine.

Promptfoo remains the only supported runtime, and it continues to execute from the top-level `evals/engines/promptfoo/` boundary.
