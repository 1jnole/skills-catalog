# Tasks: skill-implementation-forge-authoritative-golden-inputs

## 1. OpenSpec artifacts

- [x] 1.1 Update the Promptfoo family spec for `skill-implementation-forge` to require one authoritative positive golden mirrored across the maintained suites.
- [x] 1.2 Validate the OpenSpec change before implementation verification.

## 2. Promptfoo family alignment

- [x] 2.1 Add the canonical positive real case to `contract.yaml` with deterministic trigger-path assertions.
- [x] 2.2 Add the same canonical case to `uplift.yaml` with aligned trigger-path semantics.
- [x] 2.3 Mirror the same canonical case in `uplift.without-skill.yaml` as an informational baseline without skill-boundary impersonation.

## 3. Verification and evidence

- [x] 3.1 Run `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`.
- [x] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml`.
- [x] 3.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`.
- [x] 3.4 Run live `promptfoo eval -c ...` commands for the same three configs if provider credentials are available, or record the blocking reason.
- [x] 3.5 Record command/result/date/note evidence in this file.

## Evidence

- **Command:** `openspec status --change "skill-implementation-forge-authoritative-golden-inputs" --json`
  **Result:** PASS - `"isComplete": true`
  **Date:** `2026-03-19`
  **Note:** The change reached apply-ready state with proposal, design, specs, and tasks all present.

- **Command:** `openspec validate "skill-implementation-forge-authoritative-golden-inputs" --type change`
  **Result:** PASS - `Change 'skill-implementation-forge-authoritative-golden-inputs' is valid`
  **Date:** `2026-03-19`
  **Note:** The OpenSpec change validated cleanly before and after the repo edits.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-19`
  **Note:** The contract config accepted the new authoritative golden case.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-19`
  **Note:** The with-skill uplift config remained valid after adding the mirrored positive case.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-19`
  **Note:** The informational baseline config remained valid after the baseline-only mirror case was refined.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
  **Result:** PASS - `11 passed, 0 failed, 0 errors (100%)`
  **Date:** `2026-03-19`
  **Note:** The new authoritative trigger-path golden passed alongside the existing contract cases, including the post-review authority assertion refinement.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml`
  **Result:** PASS - `7 passed, 0 failed, 0 errors (100%)`
  **Date:** `2026-03-19`
  **Note:** The mirrored with-skill uplift case passed with the expected terminal marker.

- **Command:** `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`
  **Result:** PASS - `9 passed, 0 failed, 0 errors (100%)`
  **Date:** `2026-03-19`
  **Note:** The baseline mirror case stayed informational without impersonating the skill-owned completion boundary after restoring prompt parity with the with-skill case.
