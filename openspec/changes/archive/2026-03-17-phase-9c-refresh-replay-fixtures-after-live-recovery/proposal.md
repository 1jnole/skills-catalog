## Why

The `skill-contract-forge` live contract and uplift-with-skill surfaces are already green after the missing-target recovery, but the offline replay fixtures still encode older outputs. That leaves the supported replay path out of sync with the confirmed live behavior and weakens the value of offline smoke checks.

## What Changes

- Confirm the current live behavior for the affected contract and uplift-with-skill surfaces before touching fixtures.
- Refresh the Promptfoo `--model-outputs` fixtures for the contract and uplift-with-skill surfaces using the confirmed live outputs, preserving suite order.
- Re-run the offline replay commands to verify that the refreshed fixtures now reproduce the recovered stop-and-ask behavior.
- Record the change in OpenSpec and document that this slug updates replay evidence only, not runtime semantics.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: clarify that offline replay fixtures SHALL be refreshed only after matching live recovery is confirmed for the affected surface.

## Impact

- Affected code: `evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json`, `evals/engines/promptfoo/fixtures/skill-contract-forge.uplift.with-skill.model-outputs.json`
- Affected systems: Promptfoo-native offline replay evidence for contract and uplift-with-skill
- Out of scope: Promptfoo test suites, assertions, docs authority policy, Eval Brief schema, runtime topology
