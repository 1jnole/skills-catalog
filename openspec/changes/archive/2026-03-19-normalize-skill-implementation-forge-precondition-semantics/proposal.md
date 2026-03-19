## Why

The `skill-implementation-forge` Promptfoo family currently treats several prompts as successful implementation triggers even when they only mention an approved contract artifact instead of actually providing one. That contradicts the skill's authoritative boundary, which requires a real approved contract artifact before implementation can proceed safely.

## What Changes

- Reclassify `skill-implementation-forge` Promptfoo cases that mention an approved contract artifact without actually providing it so they expect `stop_and_ask` instead of `Skill implementation ready`.
- Rename the affected case descriptions and `case_id` values to make the "artifact mentioned only" semantics explicit and readable.
- Align `contract.yaml`, `uplift.yaml`, and `uplift.without-skill.yaml` around the same precondition honesty policy.
- Tighten the regression case that previously treated "vague contract" as missing implementation details so it now checks for missing authoritative artifact delivery instead.
- Keep assertions deterministic, simple, and legible without introducing new runtime infrastructure or synthetic contract artifacts.

## Capabilities

### New Capabilities
- `skill-implementation-forge-promptfoo-family`: Defines the Promptfoo family behavior for authoritative contract preconditions and informational baselines around `skill-implementation-forge`.

### Modified Capabilities
- `skill-implementation-forge`: Clarifies that mentioning an approved contract artifact without providing an authoritative artifact still requires clarification before implementation.

## Impact

- Affected code: `evals/engines/promptfoo/skill-implementation-forge/tests/*.yaml`
- Affected systems: Promptfoo contract/uplift/baseline family for `skill-implementation-forge`
- Out of scope: `packs/core/skill-implementation-forge/SKILL.md`, new contract artifacts, Promptfoo runners/providers/wrappers, package scripts, and non-family eval infrastructure
