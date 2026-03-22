## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and delta spec for `low-token-execution-promptfoo-hardening`.

## 2. Eval authoring

- [x] 2.1 Add `openspec/specs/low-token-execution-promptfoo-family/spec.md` through this change.
- [x] 2.2 Add `evals/engines/promptfoo/low-token-execution/` with `contract`, `uplift.with-skill`, and `uplift.without-skill`.
- [x] 2.3 Keep the family compact and aligned to the approved `low-token-execution` contract and implementation.
- [x] 2.4 Use dogfooding only as supplemental evidence, not as a replacement for contract-based assertions.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change.
- [x] 3.2 Validate all Promptfoo configs for the family.
- [x] 3.3 Run the family and review failures for boundary correctness before considering the slug done.

## Evidence

- 2026-03-22: `openspec validate "low-token-execution-promptfoo-hardening" --type change` -> passed.
- 2026-03-22: `promptfoo validate -c evals/engines/promptfoo/low-token-execution/promptfooconfig.yaml` -> passed.
- 2026-03-22: `promptfoo validate -c evals/engines/promptfoo/low-token-execution/promptfooconfig.uplift.with-skill.yaml` -> passed.
- 2026-03-22: `promptfoo validate -c evals/engines/promptfoo/low-token-execution/promptfooconfig.uplift.without-skill.yaml` -> passed.
- 2026-03-22: `promptfoo eval -c evals/engines/promptfoo/low-token-execution/promptfooconfig.yaml` -> 8 passed, 0 failed, 0 errors.
- 2026-03-22: `promptfoo eval -c evals/engines/promptfoo/low-token-execution/promptfooconfig.uplift.with-skill.yaml --filter-pattern deictic-unit-reference` -> 1 passed, 0 failed, 0 errors.
- 2026-03-22: `promptfoo eval -c evals/engines/promptfoo/low-token-execution/promptfooconfig.uplift.with-skill.yaml` -> 5 passed, 0 failed, 0 errors.
- 2026-03-22: `promptfoo eval -c evals/engines/promptfoo/low-token-execution/promptfooconfig.uplift.without-skill.yaml` -> 4 passed, 0 failed, 0 errors.
- Review note: one deictic uplift case initially failed because the matcher did not accept equivalent wording asking for the exact multi-step task or deliverable. The fix broadened the assertion to capture that contract-aligned behavior rather than relaxing the boundary.
