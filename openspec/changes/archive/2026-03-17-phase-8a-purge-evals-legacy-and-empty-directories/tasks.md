# Tasks: phase-8a-purge-evals-legacy-and-empty-directories

## 1. Update the normative layer

- [x] 1.1 Update the stable Promptfoo runtime and dataset-maintenance specs so they allow purging historical eval residue from the active repo tree.
  - Verification command: `rg -n "removed from the active repository tree|removed from the active repo tree|SHALL NOT appear under the active evals tree|MAY be removed from the active repository tree" openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md openspec/specs/skill-contract-forge-dataset-maintenance/spec.md`

## 2. Purge legacy eval residue and doc stubs

- [x] 2.1 Remove `evals/_phase_a_quarantine/` and the known redundant README pointer files under `evals/`.
  - Verification command: `Test-Path evals/_phase_a_quarantine; Test-Path evals/fixtures/README.md; Test-Path evals/cases/skill-contract-forge/README.md`
- [x] 2.2 Update active docs under `evals/` so they no longer reference `_phase_a_quarantine/` or other purged legacy files.
  - Verification command: `rg -n "_phase_a_quarantine|pilot-suite\\.v1\\.json|manual-audit\\.phase-6a|pilot-model-outputs|skill-contract-forge\\.yaml" evals README.md AGENTS.md --glob '!openspec/changes/archive/**'`
- [x] 2.3 Remove empty directories under `evals/`.
  - Verification command: `Get-ChildItem -Directory -Recurse evals | Where-Object { -not (Get-ChildItem $_.FullName -Force | Select-Object -First 1) } | Select-Object FullName`

## 3. Retire transitional planning residue

- [x] 3.1 Rewrite or remove `PLAN.md` so it no longer narrates quarantine-era transitional state as current guidance.
  - Verification command: `Test-Path PLAN.md`

## 4. Validate the cleanup

- [x] 4.1 Validate the OpenSpec change and record evidence in standard command/result/date/note format.
  - Verification command: `openspec validate "phase-8a-purge-evals-legacy-and-empty-directories" --type change`

## Evidence

- **Command:** `rg -n "removed from the active repository tree|removed from the active repo tree|SHALL NOT appear under the active evals tree|MAY be removed from the active repository tree" openspec/specs/skill-contract-forge-promptfoo-eval-runtime/spec.md openspec/specs/skill-contract-forge-dataset-maintenance/spec.md`
- **Result:** The stable runtime and dataset-maintenance specs now allow removal of historical eval residue from the active repo tree.
- **Date:** `2026-03-17`
- **Note:** The normative layer now matches the repo cleanup policy.

- **Command:** `Test-Path evals/_phase_a_quarantine; Test-Path evals/fixtures/README.md; Test-Path evals/cases/skill-contract-forge/README.md`
- **Result:** `False`, `False`, `False`
- **Date:** `2026-03-17`
- **Note:** The quarantine tree and redundant README stubs were removed.

- **Command:** `rg -n "_phase_a_quarantine|pilot-suite\\.v1\\.json|manual-audit\\.phase-6a|pilot-model-outputs|skill-contract-forge\\.yaml" evals README.md AGENTS.md --glob '!openspec/changes/archive/**'`
- **Result:** No matches.
- **Date:** `2026-03-17`
- **Note:** Active docs no longer point at purged legacy eval artifacts.

- **Command:** `Get-ChildItem -Directory -Recurse evals | Where-Object { -not (Get-ChildItem $_.FullName -Force | Select-Object -First 1) } | Select-Object FullName`
- **Result:** No output.
- **Date:** `2026-03-17`
- **Note:** The `evals/` tree no longer contains empty directories.

- **Command:** `Test-Path PLAN.md`
- **Result:** `False`
- **Date:** `2026-03-17`
- **Note:** The transitional migration board was removed instead of being kept as stale guidance.

- **Command:** `openspec validate "phase-8a-purge-evals-legacy-and-empty-directories" --type change`
- **Result:** `Change 'phase-8a-purge-evals-legacy-and-empty-directories' is valid`
- **Date:** `2026-03-17`
- **Note:** The slug validates after the purge.
