# Phase 6A Manual Audit

## Scope

This note audits the full current supported `skill-forge` sample instead of a smaller subset.

Reason:
- the current canonical contract surface has 11 cases
- the uplift surface has 7 cases
- auditing the full supported set gives a cleaner calibration baseline than inventing extra prompts just to hit a target count

## Observed runs

- `contract`: `9 pass / 2 fail`
- `uplift with_skill`: `6 pass / 1 fail`
- `uplift without_skill`: `0 pass / 7 fail`

## Case review

| Case ID | Bucket | Contract | Uplift with_skill | Uplift without_skill | Human judgment | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `new-skill-one-clear-job` | trigger-clear | PASS | PASS | FAIL | correct | Good positive control. The skill path works and the baseline misses it. |
| `existing-skill-refactor-clear-target` | trigger-clear | FAIL | PASS | FAIL | incorrect | The routing is right, but the contract payload still misses the required `authoring` shape, so this is a real contract miss rather than harmless wording drift. |
| `skill-rewrite-clear-target` | trigger-clear | PASS | PASS | FAIL | correct | Rewrite routing looks stable with skill context and clearly degrades without it. |
| `mixed-authoring-and-eval-request` | trigger-clear | PASS | not-audited | not-audited | correct | The contract gate correctly keeps authoring primary and defers downstream eval work. |
| `trigger-with-benchmark-noise` | trigger-near-miss | PASS | not-audited | not-audited | correct | The suite no longer treats benchmark wording as a hard failure, which matches the intended boundary. |
| `agents-policy-request` | non-trigger-clear | PASS | PASS | FAIL | correct | With skill context the repo-policy non-trigger is stable; without skill context the baseline asks for missing inputs instead of routing out of scope. |
| `runtime-harness-implementation` | non-trigger-clear | PASS | PASS | FAIL | correct | The skill correctly rejects shared runtime work, while the baseline tries to implement it. |
| `eval-authoring-only-request` | non-trigger-clear | PASS | not-audited | not-audited | correct | Downstream eval authoring is correctly kept out of `skill-forge`. |
| `eval-authoring-benchmark-suite-request` | non-trigger-clear | PASS | not-audited | not-audited | correct | This case now behaves as intended after removing wording-only benchmark gating from the contract pass/fail path. |
| `ambiguous-multi-workflow-request` | stop-and-ask-clear | PASS | PASS | FAIL | correct | The skill correctly stops on a mixed multi-workflow request; the baseline tries to do everything. |
| `ambiguous-refactor-missing-target` | near-miss-ambiguous | FAIL | FAIL | FAIL | incorrect | The current skill still over-triggers instead of stopping for clarification when the refactor target is missing. |

`not-audited` means the case is outside the current uplift suite surface, not that the result was skipped accidentally.

## Error patterns

### 1. Schema pass / boundary fail is no longer the main problem

The contract gate is mostly doing its job structurally. The remaining contract miss is narrower:
- `existing-skill-refactor-clear-target` routes correctly
- but the embedded brief still violates the required `authoring` schema shape

Actionable takeaway:
- Phase 6B should add more refactor-shaped trigger cases that stress payload completeness, not just classification.

### 2. False stop-and-ask remains the wrong failure category for the ambiguous refactor edge

The active miss is the opposite:
- `ambiguous-refactor-missing-target` should stop and ask
- the model still emits a trigger-shaped refactor brief with an invented target (`unknown`)

Actionable takeaway:
- Phase 6B should add near-miss refactor prompts where the workflow sounds valid but the target identity is missing or underspecified.

### 3. The baseline prompt is a useful contrast, not a usable gate

The `without_skill` uplift surface fails all 7 audited cases.

Observed baseline tendencies:
- answers implementation work instead of routing out of scope
- asks for missing input on obvious repo-policy non-triggers
- emits generic planning text instead of the repository-specific routing modes

Actionable takeaway:
- keep treating uplift as comparative evidence only
- do not reuse baseline pass/fail language as if it were contractual confidence

### 4. Wording-only benchmark mentions should stay outside pass/fail gating

`trigger-with-benchmark-noise` and `eval-authoring-benchmark-suite-request` now behave correctly in the contract audit once benchmark wording is treated as documentation/audit context rather than a gate assertion.

Actionable takeaway:
- future Phase 6B expansions should prefer boundary-bearing near-misses over extra wording-variant checks unless the wording changes meaning.
