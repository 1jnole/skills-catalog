## Overview

This change implements the approved contract for the existing `zod-normalize-inputs` skill without renegotiating it.

## Approved contract authority

Primary authority:
- `openspec/changes/refactor-zod-normalize-inputs-contract/eval-brief.json`

The implementation must preserve:
- the exact skill name
- the contract-frozen frontmatter description
- the package shape of `SKILL.md`, `references/`, and `agents/`
- the interface metadata for `agents/openai.yaml`
- the narrow boundary around Zod-based normalization at input boundaries

## Implementation decisions

### Keep the package shallow

No new support folders are required by the contract. Existing `references/` content already covers the long examples and pitfalls the skill needs.

### Tighten routing and blockers in `SKILL.md`

The maintained skill should explicitly teach:
- when it triggers
- when it does not trigger
- when to stop and ask because boundary ownership or upstream normalization is unclear

### Align the interface metadata

`agents/openai.yaml` should mirror the contract-frozen `display_name`, `short_description`, and `default_prompt`.
