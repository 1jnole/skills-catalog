# Tasks: normalize-skill-implementation-forge-precondition-semantics

## 1. OpenSpec artifacts

- [x] 1.1 Create the OpenSpec change artifacts for `normalize-skill-implementation-forge-precondition-semantics`.
- [x] 1.2 Add the Promptfoo family spec delta and the related clarification to `skill-implementation-forge`.
- [x] 1.3 Validate the OpenSpec change before completion.

## 2. Promptfoo family normalization

- [x] 2.1 Identify the `skill-implementation-forge` contract/uplift cases that only mention an approved contract artifact without providing one.
- [x] 2.2 Reclassify those cases to `stop_and_ask` in `contract.yaml`.
- [x] 2.3 Rename the affected descriptions and `case_id` values to make "artifact mentioned only" explicit.
- [x] 2.4 Reframe the former `vague-contract` regression around missing authoritative artifact delivery instead of hidden-file inference.
- [x] 2.5 Reflect the same policy in `uplift.yaml`.
- [x] 2.6 Align `uplift.without-skill.yaml` with the new names and prompt semantics while keeping it informational.

## 3. Verification and evidence

- [x] 3.1 Run `openspec status --change "normalize-skill-implementation-forge-precondition-semantics" --json`.
- [x] 3.2 Run `openspec validate "normalize-skill-implementation-forge-precondition-semantics" --type change`.
- [x] 3.3 Run `promptfoo validate` for the three `skill-implementation-forge` configs.
- [x] 3.4 Run `promptfoo eval` for the three `skill-implementation-forge` configs, or record the concrete blocker if live execution is unavailable.
- [x] 3.5 Record command/result/date/note evidence here.

## Assumptions

- The existing skill contract in `packs/core/skill-implementation-forge/SKILL.md` remains authoritative, so this slug only aligns Promptfoo family semantics to that boundary.
- Fidelity to the real precondition semantics takes priority over preserving historical positive-path case names.
- No optional second slug will be created unless a repo-local authoritative artifact is later identified and intentionally wired into the tests.

## Evidence

- **Command:** `openspec status --change "normalize-skill-implementation-forge-precondition-semantics" --json`
  **Result:** PASS - `isComplete: true`; `proposal`, `design`, `specs`, and `tasks` all reported `done`
  **Date:** `2026-03-19`
  **Note:** The slug reached apply-ready state with the expected spec-driven artifacts present.

- **Command:** `openspec validate "normalize-skill-implementation-forge-precondition-semantics" --type change`
  **Result:** PASS - `Change 'normalize-skill-implementation-forge-precondition-semantics' is valid`
  **Date:** `2026-03-19`
  **Note:** The OpenSpec change validates cleanly after the proposal/design/spec/task artifacts were added.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-19`
  **Note:** The contract suite accepts the renamed clarification cases and updated assertions.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-19`
  **Note:** The with-skill uplift suite stays structurally aligned with the contract suite.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-19`
  **Note:** The informational baseline remains valid after aligning the renamed prompt semantics.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml --no-progress-bar --table-cell-max-length 80`
  **Result:** PASS - `Results: ✓ 10 passed, 0 failed, 0 errors (100.00%)`
  **Date:** `2026-03-19`
  **Note:** The contract family now treats artifact-mentioned-only prompts as clarification paths instead of false positive implementation completions.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml --no-progress-bar --table-cell-max-length 80`
  **Result:** PASS - `Results: ✓ 6 passed, 0 failed, 0 errors (100.00%)`
  **Date:** `2026-03-19`
  **Note:** The uplift suite now matches the contract suite on precondition honesty for missing authoritative artifacts.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml --no-progress-bar --table-cell-max-length 80`
  **Result:** PASS - `Results: ✓ 8 passed, 0 failed, 0 errors (100.00%)`
  **Date:** `2026-03-19`
  **Note:** The without-skill baseline remains informational and non-impersonating while mirroring the renamed comparison cases.
