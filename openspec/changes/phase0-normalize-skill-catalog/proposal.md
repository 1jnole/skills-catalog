# Proposal — phase0-normalize-skill-catalog

## Objective
Normalize the skills catalog so it is compatible with the Agent Skills naming rules and can be packaged/consumed deterministically.

## Scope
- Move skills into the standard buckets:
  - `skills/.curated/<skill>/SKILL.md`
  - `skills/.experimental/<skill>/SKILL.md`
- Fix frontmatter issues that break parsers:
  - Frontmatter delimiter must be `---` at column 0.
  - Skill `name` must be lowercase/kebab-case and must match the directory name.
- Remove distribution noise from the catalog zip (e.g. `.git/`, `.idea/`).

## Non-goals
- No semantic rewrites of skill bodies.
- No refactor of naming conventions beyond the minimum required for spec compliance (prefix consolidation is a later change).
