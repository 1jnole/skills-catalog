## Overview

This change normalizes the `skill-implementation-forge` Promptfoo family so it follows the same authority model as the skill itself: implementation may proceed only when a real approved contract artifact is actually provided. Prompts that merely mention such an artifact must route to clarification instead of a false positive implementation completion.

## Design Decisions

### Skill authority remains primary

The existing `packs/core/skill-implementation-forge/SKILL.md` already defines the boundary: implementation requires an approved contract artifact and a clearly identified target skill. The Promptfoo family must adapt to that truth rather than preserving historical trigger-paths that imply missing authority can be inferred from wording alone.

### Precondition honesty across the family

The same semantic boundary must hold in:
- `contract.yaml`
- `uplift.yaml`
- `uplift.without-skill.yaml`

The contract and uplift suites should agree that "artifact mentioned only" prompts are clarification paths. The without-skill suite remains informational and non-impersonating, but it should use the same case names and prompt phrasing so cross-suite comparison stays readable.

### Deterministic case wording

Affected prompts will say explicitly that the approved artifact is referenced but not actually provided. This keeps the expected `stop_and_ask` behavior grounded in the prompt text rather than in hidden evaluator assumptions.

The prior `vague-contract` regression case will be reframed to test missing authoritative delivery instead of asking the model to infer nonexistent outputs or stop conditions from an unseen brief.

### No new artifacts or runtime changes

This change does not:
- create new contract artifacts
- modify `SKILL.md`
- add default tests, transforms, wrappers, runners, or package scripts
- introduce llm-rubric scoring or extra runtime infrastructure

## Verification Strategy

- Validate the OpenSpec change with `openspec validate "normalize-skill-implementation-forge-precondition-semantics" --type change`
- Run `promptfoo validate` for:
  - `evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`
  - `evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.with-skill.yaml`
  - `evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.uplift.without-skill.yaml`
- Run `promptfoo eval` for the same three configs if provider credentials are available; otherwise record the blocking reason in `tasks.md`

## Risks

- The main risk is accidental suite drift if case names, prompts, and assertions diverge across the three YAML files.
- A secondary risk is making the assertions too brittle; this change keeps them broad enough to accept clear clarification language while still requiring absence of `Skill implementation ready`.
