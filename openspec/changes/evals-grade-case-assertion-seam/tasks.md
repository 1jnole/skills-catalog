## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the assertion-seam slug.
- [x] 1.2 Confirm the scope is limited to assertion grading and excludes boundary redesign.

## 2. Contract and runtime

- [x] 2.1 Extend `EvalCase` with optional aligned `grading.assertion_rules`.
- [x] 2.2 Add schema and load tests for the new assertion seam.
- [x] 2.3 Refactor `grade-case` to consume explicit assertion rules before keyword fallback.
- [x] 2.4 Migrate `skill-forge/evals.json` to declare assertion rules where the grader used to hardcode them.
- [x] 2.5 Update grading tests and characterization coverage to preserve pilot behavior after the refactor.
- [x] 2.6 Document the optional assertion seam in the shared eval runner README.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-grade-case-assertion-seam" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-grade-case-assertion-seam" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The assertion-seam change is valid and remains scoped to assertion grading plus its supporting tests and docs.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 8 test files and 46 tests successfully after migrating `skill-forge` to explicit assertion rules and removing the hardcoded assertion table from `grade-case`.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after extending the eval-case schema and refactoring the grading engine.
