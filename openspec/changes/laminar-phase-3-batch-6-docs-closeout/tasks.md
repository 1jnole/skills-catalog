## 1. OpenSpec and scope

- [x] 1.1 Create the Batch 6 OpenSpec proposal, design, spec, and task artifacts.
- [x] 1.2 Identify the remaining repo-level docs that still describe the pre-closeout state.

## 2. Docs closeout

- [x] 2.1 Update `README.md` to describe the supported eval path accurately.
- [x] 2.2 Update `scripts/evals/README.md` to match the implemented runner layout and supported command story.
- [x] 2.3 Update `PLAN.md` and Mermaid diagrams to describe Laminar as the active supported path.
- [x] 2.4 Keep the closeout summary and evidence in active repo docs plus OpenSpec task evidence.

## 3. Verification

- [x] 3.1 Run `openspec validate "laminar-phase-3-batch-6-docs-closeout" --type change`.
- [x] 3.2 Record evidence and outcome in this file.

## Evidence

- Command: `rg -n "run-evals|compatibility alias|LMNR_PROJECT_API_KEY|run/historical|Estado soportado actual" README.md scripts/evals/README.md PLAN.md -S`
  Result: PASS
  Date: 2026-03-11
  Note: The repo-level docs now describe `run-evals` as the supported command, historical helpers under `run/historical/`, and the current supported architecture in present tense.

- Command: `openspec validate "laminar-phase-3-batch-6-docs-closeout" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The completed Batch 6 docs closeout validates after the README, runner README, and PLAN updates.



