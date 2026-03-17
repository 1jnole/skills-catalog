# Design: phase-6d-align-skill-contract-forge-eval-contract

## Design intent

Re-align the eval stack to the current `skill-contract-forge` contract without weakening the contract to fit stale fixtures, make the current contract easier for the model to execute, and separate the skill package into normative vs supportive material. If the packaging split changes model behavior, that recalibration is deferred rather than silently absorbed here.

## Key decisions

### Decision 1 — `SKILL.md` remains authoritative

**Decision:** Treat `packs/core/skill-contract-forge/SKILL.md` as the source of truth for observable output behavior.

**Rationale:** The skill defines the contract. Evals should verify it, not redefine it around old snapshots.

### Decision 2 — Keep the output envelope exact

**Decision:** Keep exact routing headers, workflow labels, and the exact `Eval Brief ready` terminal marker as hard checks.

**Rationale:** The current skill contract explicitly names those lines, so accepting looser semantic variants would silently widen the contract.

### Decision 3 — Remove stale auxiliary wording

**Decision:** Remove wording-only auxiliary assertions from the runtime Promptfoo gates entirely.

**Rationale:** Promptfoo `0.120.19` still lets some auxiliary assertion shapes affect case failure. The wording guidance belongs in the skill and local docs, not in the hard runtime gate.

### Decision 4 — Make the current contract more executable

**Decision:** Strengthen `SKILL.md` and the `with_skill` prompt wrapper with explicit response-format guardrails and canonical examples, while keeping the underlying semantics unchanged.

**Rationale:** The current live failures show that the model is not reliably inferring the intended output envelope from the existing skill text alone.

### Decision 5 — Keep baseline informational

**Decision:** Treat `with_skill` as the semantic uplift gate and `without_skill` as an informational baseline surface with its own lighter suite.

**Rationale:** The baseline path does not own the skill contract and should not be forced to satisfy the same envelope to make the eval system meaningful, but it still must be prevented from accidentally looking contract-compliant.

### Decision 6 — Refresh fixtures only after live proof

**Decision:** Run live Promptfoo first. Refresh offline fixtures only if live behavior satisfies the hard envelope. When runtime surfaces use different prompts or case ordering, keep a separate replay fixture per surface instead of forcing one ambiguous snapshot to serve all of them.

**Rationale:** A fixture should snapshot real compliant behavior, not launder a contract violation into the offline gate or silently replay the wrong prompt/case ordering for a different surface.

### Decision 7 — Align package structure with progressive disclosure

**Decision:** Keep `skill-contract-forge` as one skill package, but move examples, routing expansion, and edge-case walkthroughs into `packs/core/skill-contract-forge/references/` so `SKILL.md` remains the always-loaded normative contract.

**Rationale:** The current skill already acts as the contract authority, but it is carrying supportive material that is easier to maintain and consume through on-demand references. This matches the repository package model and the external Agent Skills packaging guidance without moving eval ownership under the skill folder or changing semantics.

### Decision 8 — Defer post-refactor gate recalibration

**Decision:** If the progressive-disclosure split changes live Promptfoo behavior, record that drift honestly and defer gate/fixture recalibration to a later change instead of restoring green by widening the contract or undoing the packaging split inside this slug.

**Rationale:** This slug now combines contract alignment and package restructuring. Once the package refactor is accepted as valuable on its own, any recovery work needed to make the evals green again is a distinct behavior-calibration step and should be reviewed separately.

## Minimal-diff constraints

- Do not modify `evals/contracts/skill-contract-forge/eval-brief-output.schema.json`.
- Do not add npm uplift run scripts or unrelated tooling improvements in this slug.
- Adding uplift run scripts is allowed when required to make the supported repo gates cover the implemented runtime surfaces.
- Do not change the semantic contract of `skill-contract-forge`; only make the current contract more executable and observable.
- Do not rename case IDs, buckets, or the `skill-eval-forge` references in prompts unless a case becomes logically invalid.
- Do not split `skill-contract-forge` into multiple child skills.
- Do not move Promptfoo runtime assets under `packs/core/skill-contract-forge/`.
