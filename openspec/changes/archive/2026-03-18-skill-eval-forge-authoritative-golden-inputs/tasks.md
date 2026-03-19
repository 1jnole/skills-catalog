# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec deltas for `skill-eval-forge-authoritative-golden-inputs`

## 2. Trigger-path input authority
- [x] 2.1 Update `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml` so trigger-path goldens identify concrete authoritative repo-local inputs
- [x] 2.2 Update `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml` so trigger-path goldens identify concrete authoritative repo-local inputs
- [x] 2.3 Preserve semantic assertions so the model is not required to echo file paths verbatim

## 3. Verification
- [x] 3.1 Run `openspec validate "skill-eval-forge-authoritative-golden-inputs" --type change`
- [x] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- [x] 3.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- [x] 3.4 Run one live run of the `skill-eval-forge` trigger paths and record the result

## Evidence

- **Command:** `openspec validate "skill-eval-forge-authoritative-golden-inputs" --type change`
  **Result:** PASS - `Change 'skill-eval-forge-authoritative-golden-inputs' is valid`
  **Date:** `2026-03-18`
  **Note:** The slug artifacts and spec deltas validate cleanly after the trigger-path input update.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** The contract surface remains structurally valid after binding the goldens to concrete repo-local inputs.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** The comparative with-skill surface remains structurally valid after the golden input rewrite.

- **Command:** Live run of the `skill-eval-forge` trigger paths
  **Result:** PASS - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
  **Date:** `2026-03-18`
  **Note:** The tightened trigger-path wording and broader deictic stop-and-ask assertion closed the remaining live gaps for this slug.
