- [x] 1.1 Create and validate the OpenSpec change for the Phase 3 Batch 3 artifacts and reporting contract.
- [x] 1.2 Ensure Laminar-derived execution results are normalized into the local reporting shape before benchmark aggregation.
- [x] 1.3 Ensure `benchmark.json` is rebuilt from normalized results on the active Laminar path.
- [x] 1.4 Ensure `run.json` is written with the neutral schema and `platform: laminar`.
- [x] 1.5 Preserve the supported artifact set as only `benchmark.json` and `run.json`.
- [x] 1.6 Add `roadmap2/phase-3-batch-3-artifacts-reporting.md` aligned with the implemented behavior.
- [x] 1.7 Cross-check the reporting path against `PLAN.md` and earlier Phase 3 decisions.
- [x] 1.8 Run validation checks and record evidence.

## Evidence

- Command: `openspec validate "laminar-phase-3-batch-3-artifacts-reporting" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The Batch 3 reporting change validates successfully.

- Command: `openspec status --change "laminar-phase-3-batch-3-artifacts-reporting" --json`
  Result: PASS
  Date: 2026-03-11
  Note: OpenSpec reports `isComplete: true` with proposal, design, specs, and tasks in `done` state.

- Command: `npx tsc -p scripts/evals/tsconfig.json --noEmit`
  Result: PASS
  Date: 2026-03-11
  Note: The reporting path compiles under the existing eval TypeScript config.

- Command: `rg -n "buildLaminarBenchmark|buildLaminarRunManifest|benchmarkArtifactSchema|runManifestArtifactSchema|phase-3-batch-3-artifacts-reporting" scripts/evals roadmap2/phase-3-batch-3-artifacts-reporting.md openspec/changes/laminar-phase-3-batch-3-artifacts-reporting -S`
  Result: PASS
  Date: 2026-03-11
  Note: The active Laminar path writes benchmark and run manifests through the reporting boundary and preserves the supported artifact contract.
