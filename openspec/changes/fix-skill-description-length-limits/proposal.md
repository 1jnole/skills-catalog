## Why

Three core skills are currently skipped by the loader because their frontmatter `description` exceeds the platform limit (1024 characters). This breaks intended routing and makes those skills unavailable even though the files exist.

## What Changes

- Shorten frontmatter `description` blocks in three core skills to stay below 1024 characters while preserving routing clarity (`Use when`, `Don't use when`, `Outputs`, `Success criteria`).
- Keep all procedural body guidance unchanged unless a wording adjustment is required by the shorter frontmatter.
- Add verification evidence showing resulting description lengths are within limit.

## Capabilities

### New Capabilities

- `skill-frontmatter-description-limits`: Ensure core skill frontmatter descriptions are concise enough to load reliably while retaining clear routing intent.

### Modified Capabilities

- None.

## Impact

- Affected files:
  - `packs/core/skills/agents-bootstrap/SKILL.md`
  - `packs/core/skills/openspec-bootstrap/SKILL.md`
  - `packs/core/skills/skill-forge/SKILL.md`
- No runtime code, dependency, or CI/tooling changes.
