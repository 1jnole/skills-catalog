## Overview

This is a contract-only change for the existing `zod-normalize-inputs` skill. The change does not edit the skill package yet. It freezes the skill boundary into one approved brief artifact so implementation can happen from an explicit contract instead of re-deciding the skill shape during editing.

## Decisions

### Workflow

Use `existing-skill-refactor`.

Reason:
- the target skill already exists under `packs/zod/zod-normalize-inputs/`
- the goal is to tighten and clarify its contract before changing the maintained files

### Skill boundary

The skill remains responsible for normalizing untrusted, stringly, or loosely typed inputs at the boundary with Zod coercion, transform, and refine patterns.

It should trigger for:
- query or path parameter normalization
- form field normalization
- DB row decoding from stringly shapes
- converting validated string inputs into runtime-friendly values such as `Date`
- constraint checks that belong on top of normalized inputs

It should not trigger for:
- validating HTTP JSON response bodies
- deriving CRUD or visibility variants from an existing base schema
- tasks where inputs are already normalized or validated upstream

### Package shape

The maintained package should keep:
- `SKILL.md`
- `references/`
- `agents/`

Reason:
- the procedure can stay lean in `SKILL.md`
- pattern routing and pitfalls belong in `references/`
- repo policy already uses `agents/openai.yaml` metadata for portable skill interfaces

### Portable handoff

The approved brief should carry the distilled contract directly. Repo-local authoring sources may be consulted while drafting the contract, but they should not become downstream dependencies unless the handoff truly needs them as durable authority.
