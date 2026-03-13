## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the evals domain unit tests.
- [x] 1.2 Confirm the scope is limited to deterministic domain modules and excludes CLI refactors.

## 2. Domain coverage

- [x] 2.1 Add colocated unit tests for `grade-case` boundary and assertion behavior.
- [x] 2.2 Add colocated unit tests for `benchmark` aggregation, rates, deltas, and error counting.
- [x] 2.3 Add colocated unit tests for `run-results` normalization and manifest generation.
- [x] 2.4 Refine the colocated domain tests to follow the vault's small-iteration and Setup / Stimulus / Expectations style.
- [x] 2.5 Cover final edge cases for substring marker matching and empty benchmark inputs.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-domain-unit-tests" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-domain-unit-tests" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The domain-test change remains valid after refining the colocated tests and covering the final edge cases.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 4 test files and 21 tests successfully after splitting behaviors into smaller cases and adding the final corner-case coverage.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after the grading hardening and benchmark edge-case additions.
