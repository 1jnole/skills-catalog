# Proposal: evals-cli-arg-parsing-hardening

## Why

The `run-evals` command currently owns both argument parsing and command wiring in one file. That makes the parsing behavior harder to test directly and leaves edge cases such as invalid integer formats mixed into the entrypoint logic.

## What Changes

- extract `run-evals` argument parsing into a pure module
- add colocated unit tests for the parser
- harden positive integer parsing so invalid forms are rejected consistently
- keep the `run-evals` command behavior and flags unchanged

## Capabilities

### Added Capabilities
- `evals-cli-arg-parsing-hardening`

## Impact

- `scripts/evals/commands/run-evals.ts`
- `scripts/evals/commands/run-evals.args.ts`
- `scripts/evals/commands/run-evals.args.test.ts`
- `scripts/evals/shared/cli/args.ts`