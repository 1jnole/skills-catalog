## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the benchmark refactor.
- [x] 1.2 Confirm the scope is limited to deterministic benchmark refactoring and coverage.

## 2. TDD refactor

- [x] 2.1 Add a characterization test for the current gate-rounding behavior.
- [x] 2.2 Refactor `benchmark.ts` to extract smaller helpers for case entry building, aggregation, comparison, and summary construction.
- [x] 2.3 Preserve the current `BenchmarkArtifact` contract and benchmark semantics.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-benchmark-refactor" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-benchmark-refactor" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The benchmark refactor change is valid and remains scoped to deterministic domain logic plus its tests.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 7 test files and 47 tests successfully after adding a gate-rounding characterization test and decomposing the benchmark builder into smaller helpers.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after the benchmark refactor.
