# Proposal: evals-unit-test-bootstrap

## Why

The shared eval runner currently relies on TypeScript compilation and live execution flows, but it has no local unit-test bootstrap for the deterministic logic under `scripts/evals/`.

That makes TDD adoption harder than it should be:

- there is no repo-supported watch-mode unit test command
- pure domain logic cannot be exercised quickly without reaching for broader integration flows
- `scripts/evals/tsconfig.json` would currently compile colocated test files into `dist/`, which is not the desired build behavior

## What Changes

- add a repo-supported Vitest bootstrap for local unit tests
- add root npm scripts for run and watch flows
- exclude `*.test.ts` files from the `scripts/evals/` TypeScript build output
- document the intended test placement and Red -> Green -> Refactor loop in `scripts/evals/README.md`

## Capabilities

### Added Capabilities
- `evals-unit-test-bootstrap`

## Impact

- `package.json`
- `package-lock.json`
- `scripts/evals/tsconfig.json`
- `scripts/evals/README.md`