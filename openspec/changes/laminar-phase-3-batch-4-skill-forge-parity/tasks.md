- [x] 1.1 Create and validate the OpenSpec change for the Phase 3 Batch 4 parity gate.
- [x] 1.2 Add and install `@lmnr-ai/lmnr` as the active Laminar SDK dependency.
- [x] 1.3 Execute a fresh `skill-forge` iteration through the active Laminar path.
- [x] 1.4 Verify that the resulting `benchmark.json` reaches `overall_passed: true`.
- [x] 1.5 Verify that `with_skill` still outperforms `without_skill`.
- [x] 1.6 Verify trigger / non-trigger / stop-and-ask alignment on the Laminar run.
- [x] 1.7 Apply the approved rerun policy if the first verification run fails only because of `timeout` or `execution_error`.
- [x] 1.8 Re-run the accepted Laminar iteration with local `--iteration` and `--retry-errors`.
- [x] 1.9 Add `roadmap2/phase-3-batch-4-skill-forge-parity.md` with the parity evidence and outcome.
- [x] 1.10 Cross-check the result against `PLAN.md` and the Phase 3 gate policy.
- [x] 1.11 Run validation checks and record evidence.

## Evidence

- Command: `openspec validate "laminar-phase-3-batch-4-skill-forge-parity" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The Batch 4 parity change validates successfully after expanding scope to include the Laminar SDK dependency.

- Command: `npm install @lmnr-ai/lmnr`
  Result: PASS
  Date: 2026-03-11
  Note: Installed the active Laminar SDK dependency and updated `package.json` plus lockfile.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-11
  Note: The repo compiles after adding the Laminar SDK dependency.

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini`
  Result: FAIL
  Date: 2026-03-11
  Note: Expected blocker. The command stopped with `LMNR_PROJECT_API_KEY is required for Laminar-backed eval runs.` before creating a new iteration.

- Command: `powershell check of runs root before/after failed invocation`
  Result: PASS
  Date: 2026-03-11
  Note: `iteration-1` through `iteration-7` were present before and after the failed run; no new iteration folder was created.

- Command: `powershell load .env into process env and run node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini`
  Result: PASS
  Date: 2026-03-11
  Note: The Laminar-backed run completed as `iteration-8` and produced `benchmark.json` plus `run.json`.

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-8/benchmark.json`
  Result: PASS
  Date: 2026-03-11
  Note: `overall_passed: true`, `completed_case_count: 8`, `error_case_count: 0`, and `with_skill` outperformed `without_skill` across all eight cases.

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-8/run.json`
  Result: PASS
  Date: 2026-03-11
  Note: The neutral manifest preserved `platform: laminar`, `provider: openai`, and `iteration: 8`.

- Command: `powershell load .env into process env and run node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 8 --retry-errors`
  Result: PASS
  Date: 2026-03-11
  Note: The accepted Laminar iteration reused existing artifacts for all cases, preserving the local retry contract on `iteration-8`.

- Command: `openspec validate "laminar-phase-3-batch-4-skill-forge-parity" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The completed Batch 4 change still validates after recording parity evidence and roadmap alignment.
