# Tasks

## 1. Change artifacts
- [x] 1.1 Create proposal, design, tasks, and spec delta for `add-skill-eval-forge-promptfoo-family`

## 2. Promptfoo family
- [x] 2.1 Add `evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- [x] 2.2 Add `evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- [x] 2.3 Add `evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
- [x] 2.4 Add `evals/engines/promptfoo/skill-eval-forge/prompts/with-skill.txt`
- [x] 2.5 Add `evals/engines/promptfoo/skill-eval-forge/prompts/without-skill.txt`
- [x] 2.6 Add `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml`
- [x] 2.7 Add `evals/engines/promptfoo/skill-eval-forge/tests/uplift.yaml`
- [x] 2.8 Add `evals/engines/promptfoo/skill-eval-forge/tests/uplift.without-skill.yaml`

## 3. Eval-facing docs
- [x] 3.1 Update `evals/README.md` to describe the new direct config entrypoints without expanding supported npm commands
- [x] 3.2 Update `evals/engines/promptfoo/README.md` to describe the new direct config entrypoints without expanding supported npm commands

## 4. Verification
- [ ] 4.1 Run `openspec validate "add-skill-eval-forge-promptfoo-family" --type change`
- [x] 4.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
- [x] 4.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
- [x] 4.4 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
- [x] 4.5 Run the Promptfoo tests for the new family and record the result

## Evidence

Implementation is complete. The following verification evidence is recorded:

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** Structural contract gate config validated successfully.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.with-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** Comparative uplift config validated successfully.

- **Command:** `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.uplift.without-skill.yaml`
  **Result:** PASS - `Configuration is valid.`
  **Date:** `2026-03-18`
  **Note:** Informational baseline config validated successfully.

- **Command:** Promptfoo tests for the `skill-eval-forge` family
  **Result:** PASS - User reported that all tests pass after the latest contract and suite refinements.
  **Date:** `2026-03-18`
  **Note:** Dogfooding feedback for shared infra widening, mixed-phase requests, incomplete eval context, and baseline impersonation was incorporated before this pass.

The remaining archive gate still pending is:
- `openspec validate "add-skill-eval-forge-promptfoo-family" --type change`
