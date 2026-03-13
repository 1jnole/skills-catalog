## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the grade-case test consolidation cleanup.
- [x] 1.2 Confirm the cleanup is test-only and preserves behavior.

## 2. Test consolidation

- [x] 2.1 Move the legacy skill-forge parity tests into `grade-case.test.ts` under a dedicated describe block.
- [x] 2.2 Remove `grade-case.characterization.test.ts` after the moved tests are present.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-grade-case-test-consolidation" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-grade-case-test-consolidation" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The consolidation cleanup is valid and remains scoped to test organization only.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 7 test files and 46 tests successfully after moving the legacy skill-forge parity coverage into the main `grade-case` suite.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after removing the standalone characterization test file.
