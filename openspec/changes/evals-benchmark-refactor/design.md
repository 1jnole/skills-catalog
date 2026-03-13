# Design: evals-benchmark-refactor

## Context

The benchmark builder already lives in the deterministic domain layer, which makes it a good candidate for a TDD-style legacy refactor. The risk is not I/O or dependencies, but accidental semantic drift while changing a function that currently owns too many responsibilities at once.

## Goals

- preserve the current benchmark artifact shape and semantics
- make per-case entry building, totals accumulation, gate calculation, and summary building easier to read
- lock down the current gate-rounding behavior before restructuring

## Non-Goals

- redesign gate semantics
- change pass-rate rounding rules
- move benchmark ownership out of the domain layer

## Decisions

### Decision: current gate semantics remain source-compatible

The refactor keeps the current behavior where displayed pass rates are rounded but gate decisions compare the raw ratios. A dedicated test makes that behavior explicit so structural cleanup does not silently change it.

### Decision: helper extraction stays local to benchmark.ts

This refactor reduces complexity by extracting small pure helpers inside the same module. It does not introduce new exported modules or shared abstractions.
