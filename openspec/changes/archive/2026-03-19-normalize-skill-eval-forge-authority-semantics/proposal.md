## Why

`skill-eval-forge` already has a strong contract gate, but its comparative uplift and informational baseline do not yet mirror the same authority honesty around contract artifact, implementation, and eval-context inputs. That leaves `skill-eval-forge` less semantically robust than `skill-implementation-forge` even though both skills depend on real repo-local authority before they should proceed.

## What Changes

- Normalize `skill-eval-forge` Promptfoo cases so authority-sensitive inputs are treated consistently across `contract.yaml`, `uplift.yaml`, and `uplift.without-skill.yaml`.
- Rename vague authority cases to explicit “mentioned only” semantics so the test names and prompts reflect the real failure mode.
- Add the highest-signal authority guardrails for contract artifact, existing implementation, and active eval context to `uplift.yaml`.
- Mirror those renamed prompts in `uplift.without-skill.yaml` while keeping the baseline informational and non-impersonating.
- Clarify in OpenSpec that `skill-eval-forge` requires all three inputs to be operationally identifiable rather than merely mentioned.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-eval-forge`: Clarify that contract artifact, implementation, and eval context must be specifically identifiable as authority before eval authoring can proceed.
- `skill-eval-forge-promptfoo-family`: Align contract, uplift, and baseline suites around authority honesty and non-impersonating baseline behavior.

## Impact

- Affected code: `evals/engines/promptfoo/skill-eval-forge/tests/*.yaml`
- Affected systems: `skill-eval-forge` Promptfoo family and its associated OpenSpec requirements
- Out of scope: `packs/core/skill-eval-forge/SKILL.md`, fixtures, replay support, npm scripts, Promptfoo topology, and repo-wide runtime tooling
