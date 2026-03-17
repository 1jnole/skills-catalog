# Tasks: phase-7e-normalize-openspec-authority-and-supersession

## 1. Normalize stable `skill-contract-forge` specs

- [ ] 1.1 Update the stable `skill-contract-forge` specs touched by this architecture so they point to `packs/core/skill-contract-forge/evals/evals.json` for authoring and Promptfoo for runtime.
  - Verification command: `rg -n "packs/core/skill-contract-forge/evals/evals.json|suite.v1.json|local runner|Promptfoo" openspec/specs/skill-contract-forge-*.md openspec/specs/promptfoo-*.md`
- [ ] 1.2 Fill the placeholder `Purpose: TBD` text in the touched stable `skill-contract-forge` specs.
  - Verification command: `rg -n "TBD - created by archiving change" openspec/specs | rg "skill-contract-forge|promptfoo-"`

## 2. Reconcile active phase-6 changes

- [ ] 2.1 Ensure active phase-6 changes no longer act as the current authority direction for `suite.v1.json`.
  - Verification command: `rg -n "suite.v1.json" openspec/changes/phase-6*`

## 3. Keep the no-runner rule normative

- [ ] 3.1 Verify that stable specs and active phase-7 changes repeat the no-runner / no wrapper boundary.
  - Verification command: `rg -n "local runner|wrapper runtime|grading override|Promptfoo directly" openspec/specs openspec/changes/phase-7*`

## Evidence

