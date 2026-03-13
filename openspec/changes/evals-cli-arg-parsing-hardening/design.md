# Design: evals-cli-arg-parsing-hardening

## Context

The current command entrypoint parses argv inline, reads the default model from `process.env`, validates source flags, and then executes the Laminar iteration. The parsing rules themselves are deterministic and do not require any external dependency.

## Goals

- isolate argv parsing into a pure, directly testable module
- preserve the public command flags and output behavior
- lock down edge cases around missing values, source exclusivity, and positive integer parsing

## Non-Goals

- redesign the `run-evals` command contract
- change Laminar execution logic
- add integration tests that require credentials or network

## Decisions

### Decision: inject only the default model into the parser

The parser module accepts argv plus an optional default model value. `run-evals.ts` remains responsible for reading `process.env.OPENAI_MODEL` and passing it in.

### Decision: harden integer parsing in the shared CLI helper

`parsePositiveInteger` remains the shared helper, but now rejects non-canonical positive integers such as decimals, suffixes, zero, negatives, and blank values.

### Decision: parser tests focus on observable outputs and thrown messages

The tests verify returned parsed args for valid cases and thrown errors for invalid cases. They do not exercise the Laminar executor.