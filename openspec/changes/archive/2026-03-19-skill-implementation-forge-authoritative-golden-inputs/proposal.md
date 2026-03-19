## Why

`skill-implementation-forge` ya tiene cobertura sólida para precondiciones negativas, pero no tiene un trigger-path positivo real basado en autoridad repo-local inspeccionable. Eso deja a la familia sin un golden que pruebe que la skill sí entra correctamente cuando el contrato aprobado y el target skill están dados de forma operativa.

## What Changes

- Add one real positive Promptfoo case for `skill-implementation-forge` using an authoritative repo-local contract artifact and an explicit target skill.
- Align that same case semantically across `contract.yaml`, `uplift.yaml`, and `uplift.without-skill.yaml`.
- Strengthen the Promptfoo family spec so the positive trigger path is required and remains deterministic without path-echo lock-in.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-implementation-forge-promptfoo-family`: require a real authoritative trigger-path golden with mirrored baseline coverage across the three maintained suites.

## Impact

- Affects `openspec/specs/skill-implementation-forge-promptfoo-family/spec.md`.
- Affects the Promptfoo family suites under `evals/engines/promptfoo/skill-implementation-forge/tests/`.
- Does not change the skill package, Promptfoo runtime topology, providers, fixtures, or generated outputs.
