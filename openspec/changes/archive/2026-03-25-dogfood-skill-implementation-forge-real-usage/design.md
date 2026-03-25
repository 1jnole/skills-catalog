## Overview

This change internalizes only the guidance that the real implementation run needed. It does not widen `skill-implementation-forge` into contract work, eval work, or general authoring doctrine.

## Findings from real use

### 1. Approved brief fields need a clearer file mapping

The `zod-normalize-inputs` run needed to map:
- `skill.name` and `skill.description` into `SKILL.md` frontmatter
- `authoring.triggerBoundary` into explicit trigger, non-trigger, and stop guidance in `SKILL.md`
- `authoring.interface` into `agents/openai.yaml`

That mapping is implied today, but not taught explicitly enough in the main procedure.

### 2. Existing shallow packages need reuse guidance

The target package already contained:
- `SKILL.md`
- `references/`
- `agents/`

The implementation run needed to inspect the existing support files and conclude that `references/` already satisfied the approved contract. The forge skill should teach that package inspection is not only for discovery; it is also how the implementation avoids unnecessary rewrites and duplicate support content.

## Decisions

- Keep the implementation boundary unchanged.
- Teach the minimal file mapping from brief to maintained outputs.
- Teach reuse of the current package before editing.
- Teach that contract-required support folders mean “materialize and align what is needed”, not “rewrite every file in that folder”.
