## 1. OpenSpec and scope

- [x] 1.1 Create the OpenSpec artifacts for CLI argument hardening.
- [x] 1.2 Confirm the scope is limited to parser extraction and helper hardening.

## 2. Parser extraction and coverage

- [x] 2.1 Extract `run-evals` argv parsing into a pure parser module.
- [x] 2.2 Add colocated unit tests for valid and invalid parser inputs.
- [x] 2.3 Harden positive integer parsing for non-canonical values.
- [x] 2.4 Keep the `run-evals` entrypoint as thin wiring only.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-cli-arg-parsing-hardening" --type change`.
- [x] 3.2 Run `npm run test:run`.
- [x] 3.3 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.4 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "evals-cli-arg-parsing-hardening" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The CLI hardening change validates with proposal, spec, design, and tasks artifacts present.

- Command: `npm run test:run`
  Result: PASS
  Date: 2026-03-13
  Note: Vitest ran 5 test files and 32 tests successfully, including the new parser and CLI helper suites.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-13
  Note: The shared eval runner TypeScript build remains clean after extracting the parser and hardening integer parsing.
