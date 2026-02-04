# Catalog conventions

## Folder layout
- `packs/<pack>/skills/<skill>/SKILL.md` is the source of truth.
- The repo MUST NOT contain `skills/.curated` or `skills/.experimental` (or a `skills/` tree).
  - Any reintroduction of a `skills/` tree should fail verification.

## Skill naming
- Folder name is kebab-case and matches frontmatter `name`.
- Skills should be **domain-agnostic** by default.

## Skill helper files (assets/)
- Within a skill folder, any non-`SKILL.md` file intended for copy/paste or agent inspection MUST live under `assets/`.
- A `templates/` directory inside a skill is forbidden (use `assets/` instead).
- Note: this is separate from a target repo’s `openspec/templates/*` (repo-local OpenSpec templates).

## Evals
- `evals/prompts.csv` is the executable regression set.
- Prefer deterministic checks:
  - file/dir exists
  - content contains / does not contain
  - allowlist writes (`writes_only`)
  - negative controls (`no_writes`)

Rubric scoring is optional and must not block the default developer loop.

## Codex config notes
- Evals force `web_search` to `disabled` via `-c web_search=disabled` to avoid cache drift and reduce prompt-injection surface.
