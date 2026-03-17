# Tasks: phase-6i-quarantine-case-historical-artifacts

## 1. Quarantine historical case files

- [x] 1.1 Move `evals/cases/skill-contract-forge/pilot-suite.v1.json` to `evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`.
  - Verification command: `rg -n "\"purpose\": \"Phase 4 pilot suite|ambiguous-multi-workflow-request|judge_model" evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`
- [x] 1.2 Move `evals/cases/skill-contract-forge/manual-audit.phase-6a.json` to `evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.json`.
  - Verification command: `rg -n "\"phase\": \"6A\"|\"audit_buckets\"|\"uplift-without-skill\"" evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.json`
- [x] 1.3 Move `evals/cases/skill-contract-forge/manual-audit.phase-6a.md` to `evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.md`.
  - Verification command: `rg -n "Phase 6A Manual Audit|Error patterns|baseline prompt is a useful contrast" evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.md`
- [x] 1.4 Remove the historical pilot and manual-audit files from the active `evals/cases/skill-contract-forge/` surface.
  - Verification command: `rg -n "pilot-suite\\.v1\\.json|manual-audit\\.phase-6a" evals/cases/skill-contract-forge`

## 2. Realign local docs

- [x] 2.1 Update `evals/cases/skill-contract-forge/README.md` so manual-audit and pilot references point to quarantine and the then-active case-directory authoring contract remains clearly separated from historical files.
  - Verification command: `rg -n "_phase_a_quarantine/cases/skill-contract-forge|pilot-suite\\.v1\\.json|manual-audit\\.phase-6a" evals/cases/skill-contract-forge/README.md`
- [x] 2.2 Update `evals/cases/README.md`, `evals/README.md`, `evals/engines/promptfoo/README.md`, and `evals/fixtures/skill-contract-forge/README.md` so historical case references point to quarantine and the pilot suite is no longer listed as a supported artifact.
  - Verification command: `rg -n "_phase_a_quarantine/cases/skill-contract-forge|pilot-suite\\.v1\\.json|manual-audit\\.phase-6a" evals/cases/README.md evals/README.md evals/engines/promptfoo/README.md evals/fixtures/skill-contract-forge/README.md`
- [x] 2.3 Update `PLAN.md` so the historical case artifacts are described as already isolated.
  - Verification command: `rg -n "pilot-suite\\.v1\\.json|manual-audit\\.phase-6a|aislada|aislados" PLAN.md`

## 3. Verification evidence

- [x] 3.1 Validate the change artifacts with OpenSpec.
  - Verification command: `openspec validate "phase-6i-quarantine-case-historical-artifacts" --type change`
- [x] 3.2 Record evidence in this file using the standard command/result/date/note format.
  - Verification command: `rg -n "\\*\\*Command:\\*\\*|\\*\\*Result:\\*\\*|\\*\\*Date:\\*\\*|\\*\\*Note:\\*\\*" openspec/changes/phase-6i-quarantine-case-historical-artifacts/tasks.md`

## Evidence

- **Command:** `rg -n "\"purpose\": \"Phase 4 pilot suite|ambiguous-multi-workflow-request|judge_model" evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`
- **Result:** The quarantined pilot suite retains its Phase 4 purpose field, `judge_model`, and representative negative case `ambiguous-multi-workflow-request`.
- **Date:** `2026-03-16`
- **Note:** The historical pilot content remains recoverable after leaving the active case surface.

- **Command:** `rg -n "\"phase\": \"6A\"|\"audit_buckets\"|\"uplift-without-skill\"" evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.json`
- **Result:** The quarantined audit JSON still contains the `6A` phase marker, `audit_buckets`, and the `uplift-without-skill` surface definition.
- **Date:** `2026-03-16`
- **Note:** The manual audit sample survives intact as historical dataset context.

- **Command:** `rg -n "Phase 6A Manual Audit|Error patterns|baseline prompt is a useful contrast" evals/_phase_a_quarantine/cases/skill-contract-forge/manual-audit.phase-6a.md`
- **Result:** The quarantined audit note still contains the title, the `Error patterns` section, and the baseline-contrast discussion.
- **Date:** `2026-03-16`
- **Note:** The human calibration narrative was preserved during the move.

- **Command:** `rg -n "pilot-suite\.v1\.json|manual-audit\.phase-6a" evals/cases/skill-contract-forge`
- **Result:** Only `evals/cases/skill-contract-forge/README.md` now references those files, and it points them to `_phase_a_quarantine`; the active case directory no longer contains the historical data files themselves.
- **Date:** `2026-03-16`
- **Note:** The active case surface now centers on the current authoring contract plus current maintenance guidance.

- **Command:** `rg -n "_phase_a_quarantine/cases/skill-contract-forge|pilot-suite\.v1\.json|manual-audit\.phase-6a" evals/cases/README.md evals/README.md evals/engines/promptfoo/README.md evals/fixtures/skill-contract-forge/README.md`
- **Result:** The affected docs now point to `_phase_a_quarantine/cases/skill-contract-forge/...`; `evals/README.md` no longer lists `pilot-suite.v1.json` in the supported artifact inventory.
- **Date:** `2026-03-16`
- **Note:** Supported-artifact lists now exclude quarantined historical case files.

- **Command:** `rg -n "pilot-suite\.v1\.json|manual-audit\.phase-6a|aislada|aislados" PLAN.md`
- **Result:** `PLAN.md` now labels the pilot suite and manual Phase 6A audit files as `Históricos ya aislados`.
- **Date:** `2026-03-16`
- **Note:** The plan reflects the current quarantine state instead of leaving those artifacts as only future candidates.

- **Command:** `openspec status --change "phase-6i-quarantine-case-historical-artifacts" --json`
- **Result:** `isComplete: true` with `proposal`, `design`, `specs`, and `tasks` all marked `done`.
- **Date:** `2026-03-16`
- **Note:** The historical-case quarantine slug is apply-ready.

- **Command:** `openspec validate "phase-6i-quarantine-case-historical-artifacts" --type change`
- **Result:** `Change 'phase-6i-quarantine-case-historical-artifacts' is valid`
- **Date:** `2026-03-16`
- **Note:** The slug validates successfully after the case-history move.
