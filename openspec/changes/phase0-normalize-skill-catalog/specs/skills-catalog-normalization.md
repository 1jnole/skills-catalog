# Specs — Skills Catalog Normalization

## Invariants (source of truth)
- All skills MUST live under:
  - `skills/.curated/<skill>/SKILL.md`
  - `skills/.experimental/<skill>/SKILL.md`
- `SKILL.md` MUST start with YAML frontmatter delimited by `---` at column 0.
- `name` MUST follow Agent Skills constraints (lowercase letters/numbers + hyphens only) and MUST match the parent directory name.
- A single repo gate MUST exist: `npm run verify`.

## Notes
- Packs (e.g. Angular) are represented by bucket + prefix conventions and selected via Codex config (not by nesting).
