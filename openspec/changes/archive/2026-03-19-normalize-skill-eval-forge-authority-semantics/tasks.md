# Tasks: normalize-skill-eval-forge-authority-semantics

## 1. OpenSpec artifacts

- [x] 1.1 Create the OpenSpec change artifacts for `normalize-skill-eval-forge-authority-semantics`.
- [x] 1.2 Add the spec deltas for `skill-eval-forge` and `skill-eval-forge-promptfoo-family`.
- [x] 1.3 Validate the OpenSpec change before completion.

## 2. Promptfoo family normalization

- [x] 2.1 Rename authority-vague `skill-eval-forge` contract cases so the names reflect “mentioned only” semantics.
- [x] 2.2 Keep those contract cases as `stop_and_ask` with deterministic clarification assertions and no `Skill eval ready`.
- [x] 2.3 Add the same three authority guardrails to `uplift.yaml` while keeping uplift lighter than contract.
- [x] 2.4 Mirror the renamed prompts in `uplift.without-skill.yaml`.
- [x] 2.5 Keep `without_skill` informational by forbidding skill-owned authority and boundary framing for the mirrored cases.

## 3. Verification and evidence

- [x] 3.1 Run `openspec status --change "normalize-skill-eval-forge-authority-semantics" --json`.
- [x] 3.2 Run `openspec validate "normalize-skill-eval-forge-authority-semantics" --type change`.
- [x] 3.3 Run `promptfoo validate` for the three `skill-eval-forge` configs.
- [x] 3.4 Run `promptfoo eval` for the three `skill-eval-forge` configs.
- [x] 3.5 Record command/result/date/note evidence here.

## Assumptions

- `skill-contract-forge` and `skill-implementation-forge` remain untouched in this slug and serve as the reference bar for semantic robustness.
- “Same robustness” for this slug means semantic parity across contract/uplift/baseline, not offline replay parity or public npm surface parity.
- If validation reveals drift outside `skill-eval-forge`, stop and ask instead of widening the slug.

## Evidence

- 2026-03-19 — `openspec status --change "normalize-skill-eval-forge-authority-semantics" --json` — PASS
  `isComplete: true`; all required artifacts reported as `done`.
- 2026-03-19 — `openspec validate "normalize-skill-eval-forge-authority-semantics" --type change` — PASS
  Change validated successfully.
- 2026-03-19 — `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml` — PASS
  Configuration is valid.
- 2026-03-19 — `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml` — PASS
  Configuration is valid.
- 2026-03-19 — `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` — PASS
  Configuration is valid.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml --no-progress-bar --table-cell-max-length 80` — PASS
  Results: `15 passed, 0 failed, 0 errors`.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml --no-progress-bar --table-cell-max-length 80` — PASS
  Results: `11 passed, 0 failed, 0 errors`.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --no-progress-bar --table-cell-max-length 80` — PASS
  Results: `9 passed, 0 failed, 0 errors`.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern contract-artifact-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-contract-mentioned.json` — PASS
  Focused regression rerun after tightening baseline prompt behavior and limitation assertions.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern implementation-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-implementation-mentioned.json` — PASS
  Focused regression rerun confirmed brief limitation acknowledgement without repo-shaped procedure.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern eval-context-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-context-mentioned.json` — PASS
  Focused regression rerun confirmed missing eval context is acknowledged without skill impersonation.
- 2026-03-19 — `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` — PASS
  Revalidated after prompt-level baseline guardrail tightening.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --no-progress-bar --table-cell-max-length 80` — PASS
  Rerun after baseline correction; results: `9 passed, 0 failed, 0 errors`.
- 2026-03-19 — `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` — PASS
  Revalidated after reducing phrase-lock in the mirrored mentioned-only assertions.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern contract-artifact-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-contract-mentioned.json` — PASS
  Confirmed the contract-mentioned-only case still passes with concept-level limitation checks.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern implementation-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-implementation-mentioned.json` — PASS
  Confirmed the implementation-mentioned-only case still passes after removing the larger phrase bucket.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern eval-context-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-context-mentioned.json` — PASS
  Confirmed the eval-context-mentioned-only case still passes with the reduced wording dependency.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --no-progress-bar --table-cell-max-length 80` — PASS
  Full baseline rerun after wording-coupling reduction; results: `9 passed, 0 failed, 0 errors`.
- 2026-03-19 — `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml` — PASS
  Revalidated after tightening the handoff signal so it requires an actual user-facing request for concrete material.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern contract-artifact-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-contract-mentioned.json` — PASS
  Confirmed the contract-mentioned-only case still passes after removing passive handoff fragments.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern implementation-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-implementation-mentioned.json` — PASS
  Confirmed the implementation-mentioned-only case still passes with explicit user handoff wording.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --filter-pattern eval-context-mentioned-only --no-progress-bar --no-table -o tmp/without-skill-context-mentioned.json` — PASS
  Confirmed the eval-context-mentioned-only case still passes while requiring a real request for inspectable material.
- 2026-03-19 — `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml --no-progress-bar --table-cell-max-length 80` — PASS
  Full baseline rerun after tightening the handoff assertion; results: `9 passed, 0 failed, 0 errors`.
- Note
  The final baseline correction now uses prompt-level behavior plus two concept-level positive checks in the mirrored mentioned-only cases: the response must acknowledge that a concrete repo-local reference is missing and explicitly ask the user to provide inspectable material, while still forbidding skill-owned authority and repo-shaped procedures.
