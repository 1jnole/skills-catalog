# Tasks: phase-6h-quarantine-engine-historical-support

## 1. Quarantine retired engine support

- [x] 1.1 Move `evals/engines/promptfoo/support/assertions.cjs` to `evals/_phase_a_quarantine/engines/promptfoo/support/assertions.cjs`.
  - Verification command: `rg -n "gradeSkillForgeCase|evaluateBoundary|module\\.exports" evals/_phase_a_quarantine/engines/promptfoo/support/assertions.cjs`
- [x] 1.2 Remove `evals/engines/promptfoo/support/assertions.cjs` from the active engine support surface.
  - Verification command: `rg -n "assertions\\.cjs" evals/engines/promptfoo/support`

## 2. Quarantine retired pilot replay data

- [x] 2.1 Move `evals/engines/promptfoo/fixtures/pilot-model-outputs.json` to `evals/_phase_a_quarantine/engines/promptfoo/fixtures/pilot-model-outputs.json`.
  - Verification command: `rg -n "workflow: new-skill|classification: stop-and-ask|implementation plan" evals/_phase_a_quarantine/engines/promptfoo/fixtures/pilot-model-outputs.json`
- [x] 2.2 Remove `evals/engines/promptfoo/fixtures/pilot-model-outputs.json` from the active fixture surface.
  - Verification command: `rg -n "pilot-model-outputs\\.json" evals/engines/promptfoo/fixtures`

## 3. Realign the Phase A plan

- [x] 3.1 Update `PLAN.md` so `assertions.cjs` and the pilot fixture are described as already isolated historical artifacts.
  - Verification command: `rg -n "pilot-model-outputs\\.json|assertions\\.cjs|aislado|ya aislado" PLAN.md`

## 4. Verification evidence

- [x] 4.1 Validate the change artifacts with OpenSpec.
  - Verification command: `openspec validate "phase-6h-quarantine-engine-historical-support" --type change`
- [x] 4.2 Record evidence in this file using the standard command/result/date/note format.
  - Verification command: `rg -n "\\*\\*Command:\\*\\*|\\*\\*Result:\\*\\*|\\*\\*Date:\\*\\*|\\*\\*Note:\\*\\*" openspec/changes/phase-6h-quarantine-engine-historical-support/tasks.md`

## Evidence

- **Command:** `rg -n "gradeSkillForgeCase|evaluateBoundary|module\.exports" evals/_phase_a_quarantine/engines/promptfoo/support/assertions.cjs`
- **Result:** The quarantined helper still contains `evaluateBoundary`, `gradeSkillForgeCase`, and `module.exports`, confirming the full retired helper logic was preserved.
- **Date:** `2026-03-16`
- **Note:** The historical helper is recoverable without living in the active runtime support path.

- **Command:** `rg -n "assertions\.cjs" evals/engines/promptfoo/support`
- **Result:** `No matches found`
- **Date:** `2026-03-16`
- **Note:** The active engine support folder no longer contains the retired central grader helper.

- **Command:** `rg -n "workflow: new-skill|classification: stop-and-ask|implementation plan" evals/_phase_a_quarantine/engines/promptfoo/fixtures/pilot-model-outputs.json`
- **Result:** The quarantined pilot fixture still contains the trigger, runtime-implementation, and stop-and-ask replay samples.
- **Date:** `2026-03-16`
- **Note:** The pilot replay data remains preserved as historical context.

- **Command:** `rg -n "pilot-model-outputs\.json" evals/engines/promptfoo/fixtures`
- **Result:** `No matches found`
- **Date:** `2026-03-16`
- **Note:** The active engine fixture folder now contains only fixtures still used by supported offline commands.

- **Command:** `rg -n "pilot-model-outputs\.json|assertions\.cjs|aislado|ya aislado" PLAN.md`
- **Result:** `PLAN.md` now marks `pilot-model-outputs.json` as `Histórica ya aislada` and `assertions.cjs` as `Soporte heredado ya aislado`.
- **Date:** `2026-03-16`
- **Note:** The Phase A plan now matches the actual quarantine state of the engine leftovers.

- **Command:** `openspec status --change "phase-6h-quarantine-engine-historical-support" --json`
- **Result:** `isComplete: true` with `proposal`, `design`, `specs`, and `tasks` all marked `done`.
- **Date:** `2026-03-16`
- **Note:** The slug is apply-ready under the repository OpenSpec workflow.

- **Command:** `openspec validate "phase-6h-quarantine-engine-historical-support" --type change`
- **Result:** `Change 'phase-6h-quarantine-engine-historical-support' is valid`
- **Date:** `2026-03-16`
- **Note:** The engine-historical quarantine slug validates successfully.
