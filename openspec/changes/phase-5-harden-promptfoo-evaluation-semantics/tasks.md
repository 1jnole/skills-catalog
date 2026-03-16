# Tasks: phase-5-harden-promptfoo-evaluation-semantics

## Execution policy

- Keep the diff limited to Promptfoo tests, config descriptions, and engine docs.
- Prefer native Promptfoo thresholds and metrics over custom scoring functions.
- Preserve contract-vs-uplift separation.

## Tasks

- [x] 0.1 Create OpenSpec artifacts for the Phase 5 hardening change.
- [x] 1.1 Classify contract and uplift assertions into critical vs auxiliary groups.
- [x] 1.2 Harden `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`.
- [x] 1.3 Harden `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`.
- [x] 1.4 Update Promptfoo entrypoint descriptions.
- [x] 1.5 Update `evals/engines/promptfoo/README.md`.
- [ ] 1.6 Run Promptfoo validation and the offline gate.

## Evidence

### 0.1
- **Command:** `openspec status --change "phase-5-harden-promptfoo-evaluation-semantics" --json`
- **Result:** PASS.
  `"isComplete": true`
  `"proposal": "done"`
  `"design": "done"`
  `"specs": "done"`
  `"tasks": "done"`
- **Date:** `2026-03-16`
- **Note:** The Phase 5 slug is apply-ready and valid.

### 1.1
- **Command:** `rg -n "metric:|assert-set|threshold:" evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- **Result:** PASS.
  `Both suites now define grouped assertions with explicit metrics and thresholds.`
- **Date:** `2026-03-16`
- **Note:** Critical gating checks stay explicit with native Promptfoo assertion sets; wording-only drift hints were removed from gate enforcement where Promptfoo cannot keep them informational.

### 1.2
- **Command:** `rg -n "schema_valid|critical_contract|auxiliary_contract|terminal_marker|out_of_scope_behavior|stop_and_ask_behavior" evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- **Result:** PASS.
  `The contract suite now emits named metrics for structural trigger, out-of-scope, and stop-and-ask checks.`
- **Date:** `2026-03-16`
- **Note:** Trigger-path schema validation remains critical in the contract gate, while wording-only benchmark hints were removed from pass/fail enforcement because Promptfoo `0.120.19` does not yet support truly informational assertions here.

### 1.3
- **Command:** `rg -n "critical_uplift|workflow|terminal_marker|out_of_scope_behavior|stop_and_ask_behavior" evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- **Result:** PASS.
  `The uplift suite now measures comparative routing and terminal behavior without requiring contract JSON payload validity.`
- **Date:** `2026-03-16`
- **Note:** Uplift remains comparative rather than contract-complete, and wording-only auxiliary hints are documented outside the enforced gate until the engine supports non-gating assertions.

### 1.4
- **Command:** `rg -n "^description:" evals/engines/promptfoo/promptfooconfig.yaml evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- **Result:** PASS.
  `Promptfoo structural contract gate for skill-contract-forge`
  `Promptfoo comparative uplift signals for skill-contract-forge (with_skill)`
  `Promptfoo comparative uplift signals for skill-contract-forge (without_skill)`
- **Date:** `2026-03-16`
- **Note:** Entrypoint wording now matches the stronger semantics.

### 1.5
- **Command:** `rg -n "Reliability semantics|Critical checks|Auxiliary checks|named metrics|structural contract gate" evals/engines/promptfoo/README.md`
- **Result:** PASS.
  `The engine README now documents critical vs auxiliary checks and the contract-vs-uplift distinction.`
- **Date:** `2026-03-16`
- **Note:** Docs now describe the hardened Promptfoo behavior instead of only the topology.

### 1.6
- **Command:** `npm run promptfoo:validate`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** Promptfoo accepts the hardened config and test syntax.

### 1.6a
- **Command:** `npm run promptfoo:validate:uplift:with-skill`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** The uplift entrypoint touched in this phase validates cleanly for `with_skill`.

### 1.6b
- **Command:** `npm run promptfoo:validate:uplift:without-skill`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** The uplift entrypoint touched in this phase validates cleanly for `without_skill`.

### 1.6c
- **Command:** `npm run promptfoo:run:offline`
- **Result:** FAIL.
  `Results: ✓ 9 passed, ✗ 2 failed, 0 errors (81.82%)`
  `Remaining failures: existing-skill-refactor-clear-target, ambiguous-refactor-missing-target`
- **Date:** `2026-03-16`
- **Note:** The hardening removed the benchmark-wording false negative, but two fixture-backed behavior mismatches remain, so the slug should stay open until the contract gate is green or those cases are explicitly re-baselined.
