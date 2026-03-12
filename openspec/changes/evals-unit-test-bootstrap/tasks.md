## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for the evals unit-test bootstrap.
- [x] 1.2 Validate that the bootstrap scope excludes domain coverage and CLI refactors.

## 2. Tooling bootstrap

- [x] 2.1 Add the Vitest dependency and supported npm scripts.
- [x] 2.2 Exclude `*.test.ts` from the `scripts/evals/` TypeScript build output.
- [x] 2.3 Document test placement and the Red -> Green -> Refactor loop in `scripts/evals/README.md`.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-unit-test-bootstrap" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-unit-test-bootstrap" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The bootstrap change validates with proposal, spec, design, and tasks artifacts in place.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest executed the colocated bootstrap smoke test successfully from the repository root.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner still builds cleanly with `*.test.ts` excluded from emitted output.

- Command: `Test-Path scripts/evals/dist/smoke.test.js`
  Result: PASS
  Date: 2026-03-13
  Note: The check returned `False`, confirming the colocated smoke test is not emitted into `dist/`.
