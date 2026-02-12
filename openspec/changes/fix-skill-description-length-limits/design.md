## Context

The repository keeps canonical skill definitions in `packs/core/skills/.../SKILL.md`. Three of these skills currently use verbose frontmatter descriptions that exceed the loader's 1024-character maximum, causing skills to be skipped at load time.

## Goals / Non-Goals

**Goals:**
- Make the three affected core skills loadable by reducing frontmatter description size.
- Preserve routing quality in each description with concise decision boundaries.
- Keep diffs minimal and isolated to frontmatter metadata.

**Non-Goals:**
- Refactor skill body instructions.
- Introduce new skill files, scripts, or tooling changes.
- Change repo workflow, prompts, or OpenSpec schemas.

## Decisions

- Edit only the `description` field in the affected files.
Rationale: The failure is specific to description length; broader edits add risk and review overhead.
Alternative considered: Rewriting full skill documents. Rejected as unnecessary for this defect.

- Keep a compact structured format (`Use when`, `Don't use when`, `Outputs`, `Success criteria`) in each description.
Rationale: This keeps routing signal quality while meeting the hard character limit.
Alternative considered: Single-sentence descriptions. Rejected because it weakens routing precision.

## Risks / Trade-offs

- [Risk] Over-compression can reduce routing clarity.
  Mitigation: Retain explicit boundary phrases and outcome language in all descriptions.
- [Risk] Future edits may accidentally exceed the limit again.
  Mitigation: Record length-check evidence in tasks and keep this requirement explicit in spec.

## Migration Plan

1. Update the three core `SKILL.md` frontmatter descriptions.
2. Run a deterministic length check command.
3. Validate the OpenSpec change and run repo gate (`npm run verify`).

Rollback strategy:
- Revert the three frontmatter edits if any unexpected loader regression appears.

## Open Questions

- None.
