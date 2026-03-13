## 1. Final supported command

- [x] 1.1 Repoint `run-evals` to the Promptfoo-backed supported flow and reject retired historical flags explicitly.
- [x] 1.2 Make `read-evals --skill-name` resolve the canonical new-scaffold suite by default.
- [x] 1.3 Remove `run-promptfoo-pilot` from `package.json` and keep any source-level alias explicitly deprecated.
- [x] 1.4 Rename default generated Promptfoo artifact paths to final non-`pilot` names.

## 2. Verification

- [x] 2.1 Run `openspec validate "evals-phase-6-command-surface" --type change`.
- [x] 2.2 Run `npm run build-evals && npx vitest run "scripts/evals/cli/run-evals.args.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-config.test.ts" "scripts/evals/smoke.test.ts"`.
- [x] 2.3 Run `npm run read-evals -- -- --skill-name skill-forge`.
- [x] 2.4 Run `npm run run-evals -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`.

## Evidence

- Command: `openspec validate "evals-phase-6-command-surface" --type change`
  Result: PASS
  Relevant output:
  - `Change 'evals-phase-6-command-surface' is valid`
  Date: `2026-03-13`
  Note: The command-surface change artifacts remained apply-ready after implementation.
- Command: `npm run build-evals && npx vitest run "scripts/evals/cli/run-evals.args.test.ts" "scripts/evals/application/load-eval-definition/load-eval-definition.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-config.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-scoring.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-benchmark.test.ts" "scripts/evals/smoke.test.ts"`
  Result: PASS
  Relevant output:
  - `> build-evals`
  - `> tsc -p scripts/evals/tsconfig.json`
  - `Test Files  6 passed (6)`
  - `Tests  28 passed (28)`
  Date: `2026-03-13`
  Note: The final command parser, supported resolver, promptfoo adapter paths, and smoke checks all passed together.
- Command: `npm run read-evals -- -- --skill-name skill-forge`
  Result: PASS
  Relevant output:
  - `eval definition OK: ...\evals\cases\skill-forge\suite.v1.json`
  - `skill: skill-forge`
  - `golden: 4`
  - `negative: 4`
  - `total: 8`
  Date: `2026-03-13`
  Note: The supported read path now resolves the canonical new-scaffold suite by skill name.
- Command: `npm run run-evals -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`
  Result: PASS
  Relevant output:
  - `promptfoo suite: ...\evals\cases\skill-forge\suite.v1.json`
  - `promptfoo output: ...\evals\engines\promptfoo\generated\skill-forge.eval.json`
  - `local benchmark output: ...\evals\engines\promptfoo\generated\skill-forge.benchmark.json`
  - `Results: ✓ 16 passed, 0 failed, 0 errors (100%)`
  Date: `2026-03-13`
  Note: The supported `run-evals` command now executes the new-scaffold Promptfoo flow and writes final non-`pilot` outputs.
