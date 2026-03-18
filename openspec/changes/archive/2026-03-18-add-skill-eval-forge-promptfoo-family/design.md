# Design

## Summary

This change adds a direct Promptfoo family for `skill-eval-forge` under the active repo eval boundary:

1. `contract`
2. `uplift.with-skill`
3. `uplift.without-skill`

The family is implemented as config-local runtime assets only. It does not publish new npm aliases, does not add replay fixtures, and does not change shared provider/runtime structure.

## Decisions

### Direct per-skill family

The family lives at:
- `evals/engines/promptfoo/skill-eval-forge/`

It mirrors the direct per-skill topology already used by the other forge families:
- `promptfooconfig.yaml`
- `promptfooconfig.uplift.with-skill.yaml`
- `promptfooconfig.uplift.without-skill.yaml`
- `prompts/`
- `tests/`

### Contract-aligned semantics

The suite must reflect the actual boundary from `packs/core/skill-eval-forge/SKILL.md`:
- one named target skill
- approved contract artifact required
- existing implementation required
- stop-and-ask for missing or ambiguous preconditions
- no widening into contract authoring, skill implementation, or runtime redesign
- terminal marker `Skill eval ready` only on in-scope trigger paths

The tests should validate those behaviors semantically, not by demanding exact wording or filesystem-path echoes.

### Config-local support in v1

This family will support:
- Promptfoo config validation
- live execution from direct config files

This family will not yet support:
- maintained offline replay fixtures
- new public npm aliases in `package.json`

That keeps the family small and avoids coupling it to the separate command-surface cleanup.

### Docs boundary

Eval-facing docs must distinguish between:
- supported public npm command surface
- direct config-local runtime entrypoints

`skill-eval-forge` belongs to the second category in this v1.
