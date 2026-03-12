## 1. Parity recovery

- [x] 1.1 Create the successor OpenSpec artifacts for skill-forge parity recovery.
- [x] 1.2 Diagnose the failing runtime-only case without adding supported artifacts.
- [x] 1.3 Update `skill-forge` wording to make runtime-only requests clearly non-trigger and trigger cases explicitly contract-first.
- [x] 1.4 Re-run a fresh `skill-forge` iteration through `run-evals`.
- [x] 1.5 Re-run the accepted iteration with `--iteration` and `--retry-errors`.

## 2. Evidence

- Command: one-off local diagnostic of `runtime-harness-implementation`
  Result: PASS
  Date: 2026-03-12
  Note: The diagnostic showed the failing assertion was satisfied by strengthening `skill-forge` wording, so no grader change was required.

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini`
  Result: PASS
  Date: 2026-03-12
  Note: The accepted fresh run completed as `iteration-13` with `overall_passed: true`.

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-13/benchmark.json`
  Result: PASS
  Date: 2026-03-12
  Note: `golden_pass_rate: 1`, `negative_pass_rate: 1`, `overall_passed: true`, and `with_skill` outperformed `without_skill` in all eight cases.

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 13 --retry-errors`
  Result: PASS
  Date: 2026-03-12
  Note: The accepted Laminar iteration reused existing artifacts for every case and preserved the local retry contract.
