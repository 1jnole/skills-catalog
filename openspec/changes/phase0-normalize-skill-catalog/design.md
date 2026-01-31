# Design

## Layout decision
- Keep the repo "flattened" under `skills/.curated` and `skills/.experimental` to make selection/packs easy via Codex config without nested folders.
- Keep all current skill names (except strict kebab-case fixes) to minimize churn.

## Validator
Add a zero-dependency validator and wire it to the single gate:
- `npm run verify` → `node scripts/skills-validate.mjs`

This validator enforces:
- Correct layout buckets
- Valid/closed YAML frontmatter
- `name` constraints and `name == directory`
- No duplicate skill names
