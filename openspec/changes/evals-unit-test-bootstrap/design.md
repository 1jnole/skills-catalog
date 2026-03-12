# Design: evals-unit-test-bootstrap

## Context

This change introduces only the minimum tooling needed to start unit-testing the shared eval runner. It does not add the domain tests themselves yet and it does not refactor CLI entrypoints.

The repo already uses `npx tsc -p scripts/evals/tsconfig.json` as the preferred gate, so the bootstrap must preserve that path without emitting tests into `dist/`.

## Goals

- provide a supported local unit-test runner for `scripts/evals/`
- keep the bootstrap small and easy to review
- avoid changing public command behavior or eval-definition contracts
- codify the intended TDD loop close to the shared runner docs

## Non-Goals

- add domain coverage in this change
- refactor `run-evals` argument parsing
- introduce browser, E2E, or visual test tooling
- redesign repository-wide build or release flows

## Decisions

### Decision: use Vitest with explicit imports and no config file

Vitest fits the repo's TypeScript + Node usage and supports both fast local runs and watch mode. This bootstrap keeps the setup intentionally small:

- no `vitest.config.ts`
- tests will import from `vitest` explicitly
- root scripts will expose the supported entrypoints

### Decision: colocated `*.test.ts` files are supported, but excluded from build output

The shared runner tree is already organized by behavior. Colocated tests keep the test near the logic it exercises. To avoid emitting test files into `scripts/evals/dist`, `scripts/evals/tsconfig.json` will exclude `*.test.ts`.

### Decision: document the workflow in `scripts/evals/README.md`

The TDD guidance belongs next to the shared runner because that is where the new workflow starts. A short section there is sufficient for this bootstrap.