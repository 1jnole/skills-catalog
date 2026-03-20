## Why

`skill-eval-forge` already has a useful phase boundary, but its permanent spec is still too thin compared with the actual behavior expected by the repo and by its Promptfoo contract gate. We need to make the validation pattern explicit now so the skill can be hardened without drifting into `skill-contract-forge` semantics.

## What Changes

- Clarify the permanent `skill-eval-forge` capability so it defines trigger, non-trigger, and stop-and-ask precedence for eval authoring requests.
- Define what counts as operationally inspectable authority for the approved contract artifact, existing implementation, and active eval context.
- Align the skill instructions and Promptfoo contract suite with that stronger validation boundary.
- Add an explicit guardrail preventing `skill-eval-forge` from copying the classification envelope used by `skill-contract-forge`.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-eval-forge`: strengthen the phase boundary, authority requirements, trigger routing, and contract validation semantics for the eval-authoring phase.

## Impact

- Affected capability spec: `openspec/specs/skill-eval-forge/spec.md`
- Affected skill: `packs/core/skill-eval-forge/SKILL.md`
- Affected eval contract gate: `evals/engines/promptfoo/skill-eval-forge/tests/contract.yaml`
