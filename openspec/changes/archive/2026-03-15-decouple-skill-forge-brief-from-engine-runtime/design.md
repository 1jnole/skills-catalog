## Overview

This change keeps the runtime and eval-engine references in downstream eval documentation while removing them from the core `skill-forge` contract. The implementation is documentation-only plus one agent metadata update.

## Decisions

- Treat `packs/core/skill-forge/SKILL.md` as the neutral authoring contract.
- Keep downstream eval context references, but phrase them as repository guidance rather than runtime authority.
- Update the OpenAI agent description so its metadata matches the current skill boundary and no longer references the older spec/manual-dogfooding/shared-eval workflow.

## Verification

- Validate the OpenSpec change with `openspec validate "decouple-skill-forge-brief-from-engine-runtime" --type change`.
- Run `npm run promptfoo:validate` as a repo-safe executable gate to confirm the docs-only change does not disturb the supported runtime config.
- Inspect the edited files to confirm no direct Promptfoo runtime-suite reference remains in the core skill contract.
