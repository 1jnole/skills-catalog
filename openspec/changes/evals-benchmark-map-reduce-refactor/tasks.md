## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the benchmark map-reduce refactor.
- [x] 1.2 Confirm the scope is limited to benchmark internal structure and preserves behavior.

## 2. Internal design refactor

- [x] 2.1 Extract an explicit per-case benchmark summary step.
- [x] 2.2 Reduce summaries into the accumulator through a dedicated reducer function.
- [x] 2.3 Keep final artifact assembly and tests behaviorally unchanged.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-benchmark-map-reduce-refactor" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-benchmark-map-reduce-refactor" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The map-reduce benchmark refactor is valid and remains scoped to internal benchmark structure.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 7 test files and 47 tests successfully after making the benchmark flow explicit as summarize -> reduce -> assemble.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after the internal benchmark pattern refactor.
