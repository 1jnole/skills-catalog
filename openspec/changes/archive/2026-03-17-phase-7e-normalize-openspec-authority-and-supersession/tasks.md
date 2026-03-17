# Tasks: phase-7e-normalize-openspec-authority-and-supersession

## 1. Normalize stable `skill-contract-forge` specs

- [x] 1.1 Update the stable `skill-contract-forge` specs touched by this architecture so they point to `packs/core/skill-contract-forge/evals/evals.json` for authoring and Promptfoo for runtime.
  - Verification command: `rg -n "packs/core/skill-contract-forge/evals/evals.json|suite.v1.json|local runner|Promptfoo" openspec/specs | rg "skill-contract-forge|promptfoo-"`
- [x] 1.2 Fill the placeholder `Purpose: TBD` text in the touched stable `skill-contract-forge` specs.
  - Verification command: `rg -n "TBD - created by archiving change" openspec/specs | rg "skill-contract-forge|promptfoo-"`

## 2. Reconcile active phase-6 changes

- [x] 2.1 Ensure active phase-6 changes no longer act as the current authority direction for `suite.v1.json`.
  - Verification command: `Get-ChildItem openspec/changes -Directory | Where-Object Name -like 'phase-6*' | ForEach-Object { rg -n "active local authoring contract|active canonical dataset|current authority.*evals/cases/skill-contract-forge/suite\\.v1\\.json|evals/cases/skill-contract-forge/suite\\.v1\\.json.*active" $_.FullName }`

## 3. Keep the no-runner rule normative

- [x] 3.1 Verify that stable specs and active phase-7 changes repeat the no-runner / no wrapper boundary.
  - Verification command: `rg -n "local runner|wrapper runtime|grading override|Promptfoo directly" openspec/specs openspec/changes | rg "phase-7|openspec/specs"`

## Evidence
- **Command:** `rg -n "packs/core/skill-contract-forge/evals/evals.json|suite.v1.json|local runner|Promptfoo" openspec/specs | rg "skill-contract-forge|promptfoo-"`
- **Result:** The stable `skill-contract-forge` and Promptfoo-related specs now point to the skill-local authoring source, keep Promptfoo as runtime authority, and only mention `suite.v1.json` as a retired or disallowed path.
- **Date:** `2026-03-17`
- **Note:** The stable spec layer now matches the authoring/runtime split implemented in phase 7.

- **Command:** `rg -n "TBD - created by archiving change" openspec/specs | rg "skill-contract-forge|promptfoo-"`
- **Result:** No matches.
- **Date:** `2026-03-17`
- **Note:** The touched `skill-contract-forge` and Promptfoo-related stable specs no longer carry placeholder `Purpose` text.

- **Command:** `Get-ChildItem openspec/changes -Directory | Where-Object Name -like 'phase-6*' | ForEach-Object { rg -n "active local authoring contract|active canonical dataset|current authority.*evals/cases/skill-contract-forge/suite\\.v1\\.json|evals/cases/skill-contract-forge/suite\\.v1\\.json.*active" $_.FullName }`
- **Result:** No matches.
- **Date:** `2026-03-17`
- **Note:** The remaining active phase-6 artifacts were reconciled so they no longer present `suite.v1.json` as current authority.

- **Command:** `rg -n "local runner|wrapper runtime|grading override|Promptfoo directly" openspec/specs openspec/changes | rg "phase-7|openspec/specs"`
- **Result:** Matches remain in the stable Promptfoo runtime spec and the active phase-7 artifacts, all reinforcing the no-runner and no-wrapper boundary.
- **Date:** `2026-03-17`
- **Note:** The ban on repo-owned runners remains explicit in both the normative and active-change layers.
