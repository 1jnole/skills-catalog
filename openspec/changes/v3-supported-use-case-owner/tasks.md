## 1. Scope and safety net

- [x] 1.1 Add characterization tests for the supported run use case covering reuse of completed artifacts and retry of errored artifacts.
- [x] 1.2 Keep the public `run-evals` command contract unchanged.

## 2. Ownership move

- [x] 2.1 Introduce an application-owned run use case under `scripts/evals/run/`.
- [x] 2.2 Reduce `platforms/laminar/run-eval-iteration.ts` to compatibility ownership only.
- [x] 2.3 Point the supported command to the new application owner.

## 3. Verification

- [x] 3.1 Run `openspec validate "v3-supported-use-case-owner" --type change`.
- [x] 3.2 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.3 Run `npm run test:run`.

## Evidence

- Command: `openspec validate "v3-supported-use-case-owner" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The change validates after defining the supported use case as application-owned with a delta-formatted spec.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after moving the supported run use case owner to `scripts/evals/run/`.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 8 test files and 49 tests successfully, including new characterization coverage for skip/retry and supported artifact persistence.
