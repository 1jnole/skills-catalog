- [x] 1.1 Create and validate the OpenSpec change for the Phase 3 Batch 2 active execution path.
- [x] 1.2 Route `run-evals` through the Laminar boundary without broadening the public CLI.
- [x] 1.3 Add fail-fast validation for `LMNR_PROJECT_API_KEY`, `OPENAI_API_KEY`, timeout configuration, and Laminar SDK readiness before `iteration-N`.
- [x] 1.4 Preserve the local `--iteration` and `--retry-errors` behavior on the Laminar path.
- [x] 1.5 Ensure `with_skill` injects `SKILL.md` and `without_skill` remains the baseline path.
- [x] 1.6 Add `roadmap2/phase-3-batch-2-active-path.md` aligned with the implemented behavior.
- [x] 1.7 Cross-check the active path against `PLAN.md`, Batch 0, and Batch 1 decisions.
- [x] 1.8 Run validation checks and record evidence.

## Evidence

- Command: `openspec validate "laminar-phase-3-batch-2-active-path" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The Batch 2 active path change validates successfully.

- Command: `openspec status --change "laminar-phase-3-batch-2-active-path" --json`
  Result: PASS
  Date: 2026-03-11
  Note: OpenSpec reports `isComplete: true` with proposal, design, specs, and tasks in `done` state.

- Command: `npx tsc -p scripts/evals/tsconfig.json --noEmit`
  Result: PASS
  Date: 2026-03-11
  Note: The active-path wiring compiles under the existing eval TypeScript config.

- Command: `rg -n "assertLaminarReady|LMNR_PROJECT_API_KEY|runText\\(|retryErrors|phase-3-batch-2-active-path|platform: 'laminar'" scripts/evals roadmap2/phase-3-batch-2-active-path.md openspec/changes/laminar-phase-3-batch-2-active-path -S`
  Result: PASS
  Date: 2026-03-11
  Note: The active Laminar routing, fail-fast checks, local retry contract, and Batch 2 note are present in the expected files.
