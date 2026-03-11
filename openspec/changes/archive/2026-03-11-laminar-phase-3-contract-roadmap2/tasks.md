- [x] 1.1 Create and validate the OpenSpec change for the phase 3 contract revision and `roadmap2/` preparation.
- [x] 1.2 Rewrite the phase 3 section of `PLAN.md` so it reflects the current repo reality and closes the identified drift.
- [x] 1.3 Update `roadmap/README.md` to point phase 3 preparation work to `roadmap2/`.
- [x] 1.4 Create `roadmap2/README.md` describing the role of the new folder and the reading order.
- [x] 1.5 Create `roadmap2/phase-3-agreements.md` with the phase 3 agreements, corner cases, and edge cases resolved before task writing.
- [x] 1.6 Create `roadmap2/phase-3-plan-alignment.md` comparing the revised breakdown against `PLAN.md` and mapping every requirement to a future batch.
- [x] 1.7 Create `roadmap2/phase-3-task-batches.md` with tangible batches, prerequisites, outputs, and blockers.
- [x] 1.8 Create `roadmap2/phase-3-gates-and-parity.md` with entry gate, batch gates, parity policy, and final done gate.
- [x] 1.9 Run validation checks and record evidence for OpenSpec plus the final doc state.

## Evidence

- Command: `openspec validate "laminar-phase-3-contract-roadmap2" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The change artifacts validate successfully.

- Command: `openspec status --change "laminar-phase-3-contract-roadmap2" --json`
  Result: PASS
  Date: 2026-03-11
  Note: OpenSpec reports `isComplete: true` with proposal, design, specs, and tasks in `done` state.

- Command: `npx tsc -p scripts/evals/tsconfig.json --noEmit`
  Result: PASS
  Date: 2026-03-11
  Note: The documentation-only change does not introduce TypeScript regressions.

- Command: `rg -n "group-name|retry-errors|LMNR_PROJECT_API_KEY|roadmap2|platform = laminar|provider = openai" PLAN.md roadmap/README.md roadmap2 openspec/changes/laminar-phase-3-contract-roadmap2 -S`
  Result: PASS
  Date: 2026-03-11
  Note: The revised phase 3 contract, roadmap2 docs, and alignment evidence are present in the expected files.
