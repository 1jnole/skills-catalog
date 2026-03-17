# skill-contract-forge eval authoring

This folder owns the canonical eval authoring source for `skill-contract-forge`.

## Source of truth

- `evals.json` is the active authoring contract for this skill's eval cases.
- `npm run promptfoo:sync` projects this authoring data into the native Promptfoo suites under `evals/engines/promptfoo/tests/`.
- `npm run promptfoo:sync:check` fails if the checked-in Promptfoo suites drift from `evals.json`.

## Boundary

- This folder does not own runtime execution.
- This folder does not ship Promptfoo configs, providers, fixtures, or generated outputs.
- This folder does not contain a local runner, wrapper CLI, grading layer, or alternative eval engine.

Promptfoo remains the only supported runtime, and it continues to execute from the top-level `evals/engines/promptfoo/` boundary.
