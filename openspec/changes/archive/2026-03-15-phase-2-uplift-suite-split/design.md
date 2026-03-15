# Design: phase-2-uplift-suite-split

## Design intent

Keep the architecture simple and native to Promptfoo:

- one contract gate config stays unchanged;
- one shared uplift test file is reused by two separate Promptfoo configs;
- each uplift config runs only one prompt mode.

## Key decisions

### Decision 1 — Uplift stays separate from the contract gate

**Decision:** `evals/engines/promptfoo/promptfooconfig.yaml` SHALL remain unchanged.

**Rationale:** The contract gate must keep a single, unambiguous meaning.

### Decision 2 — Uplift uses a reduced comparative suite

**Decision:** `skill-forge.uplift.yaml` SHALL use a subset of the current suite with lighter assertions.

**Rationale:** The purpose is to compare modes, not demand the full contract payload from the baseline path.

### Decision 3 — Comparison uses two configs, not one mixed config

**Decision:** uplift execution SHALL be split into `with_skill` and `without_skill` configs that point to the same suite.

**Rationale:** This keeps the semantics explicit while staying within normal Promptfoo capabilities.

## Minimal-diff constraints

- do not change the provider;
- do not move prompts or cases;
- do not touch schema, fixtures, or generated outputs;
- do not harden uplift assertions into full contract checks.
