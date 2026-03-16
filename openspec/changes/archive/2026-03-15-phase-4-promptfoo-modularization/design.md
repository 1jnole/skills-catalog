# Design: phase-4-promptfoo-modularization

## Design intent

Use the existing Promptfoo directory layout as the stable modular shape and improve clarity rather than adding abstraction layers prematurely.

## Key decisions

### Decision 1 — Keep the current file topology

**Decision:** `prompts/`, `tests/`, and `providers/` remain the responsibility boundaries for Promptfoo assets.

**Rationale:** The current structure already matches the desired separation and does not need further movement.

### Decision 2 — No `tests/defaults.yaml` in this phase

**Decision:** Do not add `evals/engines/promptfoo/tests/defaults.yaml`.

**Rationale:** The duplicated test content between contract and uplift is limited and the differences are semantically important. A shared defaults layer would save little while making the suites harder to read.

### Decision 3 — Normalize entrypoint wording

**Decision:** The three Promptfoo configs SHALL use role-specific descriptions that mirror the docs.

**Rationale:** Clear entrypoint identity is the main deliverable of this phase.

## Minimal-diff constraints

- do not change prompts, tests, providers, or contracts semantically;
- do not create helper files unless they provide clear value;
- keep the top-level README high-level and the engine README operational.
