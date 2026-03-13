# Design: evals-domain-unit-tests

## Context

This change builds the first real TDD base for the shared eval runner on top of the Vitest bootstrap. The target modules are deterministic and CPU-bound, which matches the intended entry point for unit-test adoption in this repo.

## Goals

- cover the deterministic grading and aggregation behavior directly
- lock down edge cases around boundaries, pass rates, score deltas, and timestamps
- avoid I/O, env, network, or Laminar dependencies in unit tests

## Non-Goals

- refactor `run-evals` CLI parsing in this change
- add browser, E2E, or visual test layers
- redesign scoring semantics or artifact shapes

## Decisions

### Decision: colocated tests exercise public functions only

The tests call the exported functions from each module and assert on observable outputs. They do not reach into module internals.

### Decision: time-dependent outputs use fake timers only where needed

`buildRunManifestArtifact` and benchmark timestamps may use generated dates. Tests will pass explicit timestamps where possible and use Vitest fake timers only for the default timestamp path.

### Decision: edge cases remain source-compatible

This change is expected to add coverage first. If a failing test reveals a correctness issue, the implementation fix must be the smallest change that preserves current public contracts.

### Decision: domain tests follow the vault anatomy closely

The colocated tests should read as small requirements:

- one main behavior per `it`
- a visible setup, single stimulus, and focused expectations
- `toMatchObject` for partial assertions unless the full shape is the contract under test
