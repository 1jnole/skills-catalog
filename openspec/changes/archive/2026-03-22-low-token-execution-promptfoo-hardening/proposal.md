## Why

`low-token-execution` ya tiene contrato e implementacion, pero aun no tiene una familia Promptfoo que verifique su routing, sus guardrails y su marker terminal. Necesitamos cerrar la fase de eval authoring con el mismo pipeline forge del repo y, cuando sea posible, usar la propia disciplina de `low-token-execution` durante ese trabajo como dogfooding ligero.

## What Changes

- Add a Promptfoo-native family for `low-token-execution` under `evals/engines/promptfoo/low-token-execution/`.
- Define the capability spec for that family in `low-token-execution-promptfoo-family`.
- Author the three maintained surfaces:
  - `contract`
  - `uplift.with-skill`
  - `uplift.without-skill`
- Keep dogfooding lightweight and subordinate to the approved contract and implementation of `low-token-execution`.

## Capabilities

### New Capabilities
- `low-token-execution-promptfoo-family`: Promptfoo-native eval coverage for the `low-token-execution` skill.

### Modified Capabilities
- None.

## Impact

- New capability spec: `openspec/specs/low-token-execution-promptfoo-family/spec.md`
- New eval family: `evals/engines/promptfoo/low-token-execution/`
- Update Promptfoo runtime documentation if the family becomes active and maintained
