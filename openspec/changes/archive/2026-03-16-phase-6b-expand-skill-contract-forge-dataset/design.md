## Context

Phase 6A found two especially actionable patterns:
- `existing-skill-refactor-clear-target` still has a payload-quality problem, but its routing is directionally correct
- `ambiguous-refactor-missing-target` is a true boundary miss, and the current dataset has only one wording for that family

The Phase 6B plan calls for explicit buckets, a few new near-miss cases, and realistic rewordings without inflating the suite.

## Decision 1 - Keep expansion buckets adjacent to the source contract, not inside it

**Decision:** Record the Phase 6B bucket map in the local `skill-contract-forge` case docs next to `suite.v1.json` instead of adding new top-level fields to the JSON contract.

**Rationale:**
- the bucket map stays close to the canonical cases without changing the JSON contract shape
- this avoids unproven downstream compatibility risk for consumers of `suite.v1.json`
- the authoring rationale remains easy to review next to the case contract

**Tradeoff:** The bucket map is documented rather than machine-readable inside the suite file, but the source contract remains safer to reuse.

## Decision 2 - Expand narrowly around audited patterns and keep source semantics aligned with runtime

**Decision:** Promote existing regression-only cases into the source file and add only one new reworded stop-and-ask case in this slug, while avoiding new wording-only deterministic markers that the runtime gate no longer treats as contractual.

**Rationale:**
- most of the useful 6B work is source alignment, not raw case count growth
- the weakest observed boundary is the missing-target stop-and-ask family
- one realistic rewording is enough to add phrasing variance without turning the suite into prompt spam
- keeping source-side assertion hints semantically coarse avoids reintroducing brittle wording checks through a side channel

**Tradeoff:** Phase 6B does not try to cover every plausible wording variant yet, but the suite stays legible and reviewable.

## Decision 3 - Keep comparative signal selective

**Decision:** Add the new reworded missing-target case to both contract and uplift, but do not force every newly-source-tracked case into the uplift suite.

**Rationale:**
- the missing-target family is informative in both contract and comparative routing
- downstream eval-authoring negatives already add enough signal in the contract gate
- this follows the plan guardrail that not every case should live in both surfaces by default

## Decision 4 - Preserve offline executability

**Decision:** Extend the fixture replay with one additional output pair for the new stop-and-ask rewording.

**Rationale:**
- Phase 6B should stay runnable with the existing supported offline commands
- a small fixture addition is cheaper than introducing new replay topology
