# Tasks: phase-6g-quarantine-historical-eval-artifacts

## 1. Create the quarantine surface

- [x] 1.1 Add `evals/_phase_a_quarantine/README.md` describing the purpose of the quarantine area.
  - Verification command: `rg -n "_phase_a_quarantine|historical|not part of the active runtime" evals/_phase_a_quarantine/README.md`

## 2. Quarantine the inherited runtime suite

- [x] 2.1 Move `evals/engines/promptfoo/tests/skill-contract-forge.yaml` to `evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml`.
  - Verification command: `rg -n "new-skill-one-clear-job|runtime-harness-implementation|ambiguous-multi-workflow-request" evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml`
- [x] 2.2 Remove the old `evals/engines/promptfoo/tests/skill-contract-forge.yaml` path from the active Promptfoo tests surface.
  - Verification command: `rg -n "skill-contract-forge\\.yaml" evals/engines/promptfoo/tests`

## 3. Realign local references

- [x] 3.1 Update nearby docs and `PLAN.md` so the quarantined suite is no longer described as if it lived in the active tests folder.
  - Verification command: `rg -n "_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge\\.yaml|evals/engines/promptfoo/tests/skill-contract-forge\\.yaml" PLAN.md evals/cases/README.md evals/fixtures/skill-contract-forge/README.md`

## 4. Verification evidence

- [x] 4.1 Validate the change artifacts with OpenSpec.
  - Verification command: `openspec validate "phase-6g-quarantine-historical-eval-artifacts" --type change`
- [x] 4.2 Record evidence in this file using the standard command/result/date/note format.
  - Verification command: `rg -n "\\*\\*Command:\\*\\*|\\*\\*Result:\\*\\*|\\*\\*Date:\\*\\*|\\*\\*Note:\\*\\*" openspec/changes/phase-6g-quarantine-historical-eval-artifacts/tasks.md`

## Evidence

- **Command:** `rg -n "_phase_a_quarantine|historical|not part of the active runtime" evals/_phase_a_quarantine/README.md`
- **Result:** `evals/_phase_a_quarantine/README.md` now states that the folder isolates historical or inherited artifacts and that files there are not part of the active runtime boundary.
- **Date:** `2026-03-16`
- **Note:** Phase A now has a concrete quarantine surface instead of only a planned location.

- **Command:** `rg -n "new-skill-one-clear-job|runtime-harness-implementation|ambiguous-multi-workflow-request" evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** The quarantined file contains representative cases including `new-skill-one-clear-job`, `runtime-harness-implementation`, and `ambiguous-multi-workflow-request`, confirming the legacy suite content was preserved.
- **Date:** `2026-03-16`
- **Note:** The inherited suite remains recoverable without living in the active Promptfoo tests folder.

- **Command:** `rg -n "skill-contract-forge\.yaml" evals/engines/promptfoo/tests`
- **Result:** `No matches found`
- **Date:** `2026-03-16`
- **Note:** The active Promptfoo tests directory no longer contains the inherited runtime suite.

- **Command:** `rg -n "_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge\.yaml|evals/engines/promptfoo/tests/skill-contract-forge\.yaml" PLAN.md evals/cases/README.md evals/fixtures/skill-contract-forge/README.md`
- **Result:** `PLAN.md`, `evals/cases/README.md`, and `evals/fixtures/skill-contract-forge/README.md` now point at `evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml`; no active-doc match remains for the old runtime-folder path.
- **Date:** `2026-03-16`
- **Note:** Local guidance now matches the quarantine move.

- **Command:** `openspec status --change "phase-6g-quarantine-historical-eval-artifacts" --json`
- **Result:** `isComplete: true` with `proposal`, `design`, `specs`, and `tasks` all marked `done`.
- **Date:** `2026-03-16`
- **Note:** The second slug is apply-ready under the repository OpenSpec workflow.

- **Command:** `openspec validate "phase-6g-quarantine-historical-eval-artifacts" --type change`
- **Result:** `Change 'phase-6g-quarantine-historical-eval-artifacts' is valid`
- **Date:** `2026-03-16`
- **Note:** The quarantine slug validates successfully after the move.
