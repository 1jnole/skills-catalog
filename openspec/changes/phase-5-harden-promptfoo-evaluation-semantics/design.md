# Design: phase-5-harden-promptfoo-evaluation-semantics

## Design intent

Increase evaluation reliability without changing the engine, the skill source contract, or the case dataset. The implementation must stay declarative and Promptfoo-native.

## Key decisions

### Decision 1 — Use native assertion grouping

**Decision:** Use Promptfoo `assert-set` blocks with thresholds to separate critical checks from auxiliary drift signals.

**Rationale:** This keeps the suites readable while letting us distinguish true contract breakage from softer wording regressions.

### Decision 2 — Keep schema validity central in the contract gate

**Decision:** Trigger-path contract cases keep embedded Eval Brief schema validation as a critical check, together with classification, workflow, and terminal marker behavior.

**Rationale:** These are the strongest deterministic signals that the output stays within the intended boundary.

### Decision 3 — Keep uplift comparative

**Decision:** The uplift suite measures routing, workflow, and stop-boundary behavior without requiring full contract JSON validity from the baseline path.

**Rationale:** Uplift should answer whether the skill adds value, not duplicate the contract gate.

### Decision 4 — Use named metrics, not custom scoring code

**Decision:** Use Promptfoo `metric` fields on grouped and leaf assertions and avoid `assertScoringFunction`.

**Rationale:** Named metrics make failures more interpretable without hiding logic behind custom code.

## Minimal-diff constraints

- Do not modify `packs/core/skill-contract-forge/SKILL.md`.
- Do not change `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`.
- Do not introduce `tests/defaults.yaml` unless duplication becomes materially worse after hardening.
- Do not add a new runtime layer or provider-specific logic.
