## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the grade-case characterization slug.
- [x] 1.2 Confirm the scope is limited to characterization coverage and excludes runtime or contract changes.

## 2. Characterization coverage

- [x] 2.1 Add a characterization test for a `skill-forge` single-marker structured assertion.
- [x] 2.2 Add a characterization test for a `skill-forge` multi-marker structured assertion.
- [x] 2.3 Add a characterization test for a `skill-forge` absent-marker structured assertion.
- [x] 2.4 Add a characterization test for a legacy keyword-fallback assertion.
- [x] 2.5 Add characterization tests for the current trigger, non-trigger, and `stop_and_ask` boundaries.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-grade-case-characterization" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-grade-case-characterization" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The characterization-only change is valid and stays scoped to tests plus OpenSpec artifacts.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 6 test files and 39 tests successfully after adding the dedicated legacy characterization suite for `grade-case`.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean with the new characterization tests excluded from emitted output.
