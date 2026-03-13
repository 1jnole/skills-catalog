# Proposal: evals-benchmark-map-reduce-refactor

## Why

`benchmark.ts` is already cleaner than before, but it still mixes case summarization with accumulator mutation. The next small design step is to make the benchmark flow explicit as summarize -> reduce -> assemble while preserving the existing artifact semantics.

## What Changes

- extract an explicit per-case summary step
- reduce summaries into the benchmark accumulator in a dedicated reducer
- keep the final artifact assembly behavior unchanged

## Capabilities

### Modified Capabilities
- `evals-domain-unit-tests`

## Impact

- `scripts/evals/domain/services/benchmark.ts`
