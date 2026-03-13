## 1. Expanded suite scoring inputs

- [x] 1.1 Expand the Promptfoo offline model-output fixture so the canonical `skill-forge` suite can run end to end.
- [x] 1.2 Update Promptfoo suite/config expectations that still assume the Phase 4-only case count.
- [x] 1.3 Update scoring and benchmark docs to explain the canonical-suite ownership clearly.

## 2. Verification

- [x] 2.1 Run `openspec validate "evals-phase-5-scorers-benchmark" --type change`.
- [x] 2.2 Run `npm run test:run -- scripts/evals/infrastructure/promptfoo/pilot-config.test.ts scripts/evals/infrastructure/promptfoo/pilot-scoring.test.ts scripts/evals/infrastructure/promptfoo/pilot-benchmark.test.ts`.
- [x] 2.3 Run `npm run run-promptfoo-pilot -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`.

## Evidence

- Command: `openspec validate "evals-phase-5-scorers-benchmark" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The change validates after expanding the Promptfoo offline fixture and documenting canonical-suite scoring and benchmark ownership.

- Command: `npm run build-evals && npx vitest run "scripts/evals/application/load-eval-definition/load-eval-definition.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-config.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-scoring.test.ts" "scripts/evals/infrastructure/promptfoo/pilot-benchmark.test.ts"`
  Result: PASS
  Date: 2026-03-13
  Note: TypeScript built successfully and Vitest ran 4 test files with 16 passing tests across canonical-suite loading, Promptfoo config, scoring, and benchmark behavior.

- Command: `npm run run-promptfoo-pilot -- -- --skill-name skill-forge --model-outputs evals/engines/promptfoo/fixtures/skill-forge-suite-model-outputs.json`
  Result: PASS
  Date: 2026-03-13
  Note: The canonical `skill-forge` suite executed offline with 16 Promptfoo evaluations and produced local scoring plus benchmark artifacts with `overall_passed: true`.
