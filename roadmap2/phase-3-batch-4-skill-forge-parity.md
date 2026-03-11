# Phase 3 Batch 4 Skill Forge Parity

This note records the parity evidence for the active Laminar-backed `skill-forge` path.

## Goal

Prove that the supported Laminar path preserves the accepted local benchmark behavior before any supported legacy retirement work begins.

## Result

Batch 4 is green on `iteration-8`.

- `benchmark.json` reached `overall_passed: true`
- `with_skill` outperformed `without_skill`
- trigger / non-trigger / stop-and-ask behavior stayed aligned with the accepted baseline
- the local retry contract still works through `--iteration 8 --retry-errors`

## Evidence

### Fresh Laminar iteration

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini`
- Execution context: `.env` was loaded into the process environment before invoking the command because the repo does not auto-load `.env`
- Outcome: `iteration-8`

### Benchmark outcome

- `overall_passed: true`
- `completed_case_count: 8`
- `error_case_count: 0`
- `with_skill.pass_rate: 1`
- `without_skill.pass_rate: 0`
- `with_skill.average_score: 0.88`
- `without_skill.average_score: 0.22`

### Case alignment

- Trigger cases (`new-skill-one-clear-job`, `existing-skill-refactor-clear-target`, `skill-rewrite-clear-target`, `mixed-authoring-and-eval-request`) matched the expected `Eval Brief ready` stop.
- Non-trigger cases (`agents-policy-request`, `runtime-harness-implementation`, `eval-authoring-only-request`) matched `do_not_trigger`.
- The ambiguous case (`ambiguous-multi-workflow-request`) matched `stop_and_ask`.

### Retry contract

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 8 --retry-errors`
- Outcome: all eight cases reported `skipped: existing artifacts reused`
- Interpretation: Laminar execution does not replace the local `iteration-N` retry and resume contract

## Plan alignment

This result satisfies the Phase 3 gate described in `PLAN.md`:

- `run-evals` uses Laminar as the supported path
- `skill-forge` maintains `overall_passed: true`
- `with_skill` still beats `without_skill`
- trigger / non-trigger / stop-and-ask remain aligned
- the supported artifact surface remains `benchmark.json` plus `run.json`

## Next step

Batch 5 can start because Batch 4 no longer blocks supported legacy retirement work.
