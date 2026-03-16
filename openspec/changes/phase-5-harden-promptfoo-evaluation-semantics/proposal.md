## Why

The current Promptfoo suites for `skill-contract-forge` still depend too much on literal substring checks, which makes the gate fragile to harmless wording changes and makes uplift failures harder to interpret. This change hardens the evaluation semantics with native Promptfoo features so structural invariants and critical boundary checks carry more of the signal.

## What Changes

- Group Promptfoo assertions into critical and auxiliary checks using native `assert-set` blocks.
- Add named metrics for critical dimensions such as classification, workflow, schema validity, terminal markers, and out-of-scope behavior.
- Keep the contract suite structural and strict on trigger paths.
- Keep the uplift suite comparative and lighter than the contract gate for baseline behavior.
- Update Promptfoo entrypoint descriptions and engine docs to explain the stronger semantics.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-contract-gate`: strengthen the contractual gate so critical failures are structural and measurable.
- `skill-contract-forge-uplift-surface`: make uplift explicitly comparative with named routing and boundary metrics.

## Impact

- Affected code: `evals/engines/promptfoo/tests/*.yaml`, `evals/engines/promptfoo/promptfooconfig*.yaml`, `evals/engines/promptfoo/README.md`
- Affected systems: Promptfoo validation, offline eval reporting, OpenSpec change tracking
- Dependencies: none
