## 1. OpenSpec artifacts

- [x] 1.1 Write proposal, design, and tasks for `low-token-workflow-refinement`.

## 2. Implementation

- [x] 2.1 Refine the `Low-token workflow` section in `openspec/AGENTS.override.md` with the new heuristics.
- [x] 2.2 Keep the guidance aligned with the existing forge workflow and `low-token-execution` rather than introducing a parallel process.

## 3. Verification

- [x] 3.1 Validate the OpenSpec change and record evidence.
- [x] 3.2 Review the updated guidance to confirm it adds workflow savings without weakening validation quality.

## Evidence

- 2026-03-22: `openspec validate "low-token-workflow-refinement" --type change` -> passed.
- 2026-03-22: review note -> the updated `Low-token workflow` section adds diff-first rereads, narrow reruns, phase-boundary status checks, and minimal closeout reconciliation without changing forge phase boundaries or validation authority.
