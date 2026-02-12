## 1. Artifact preparation

- [x] 1.1 Add proposal, specs, and design artifacts for the description-limit fix.
- [x] 1.2 Validate the OpenSpec change structure (`openspec validate <slug> --type change`).

## 2. Skill metadata updates

- [x] 2.1 Shorten frontmatter `description` in `agents-bootstrap` to <=1024 chars while keeping routing boundaries.
- [x] 2.2 Shorten frontmatter `description` in `openspec-bootstrap` to <=1024 chars while keeping routing boundaries.
- [x] 2.3 Shorten frontmatter `description` in `skill-forge` to <=1024 chars while keeping routing boundaries.
- [x] 2.4 Run a deterministic description-length check and record results.

## 3. Verification and evidence

- [x] 3.1 Run `npm run verify` and record outcome.
- [x] 3.2 Record command evidence table for all checks performed in this change.

## Evidence

| Date | Command | Result | Note |
| --- | --- | --- | --- |
| 2026-02-12 | `openspec validate "fix-skill-description-length-limits" --type change` | PASS (`Change 'fix-skill-description-length-limits' is valid`) | Validates artifact completeness before and after implementation. |
| 2026-02-12 | `$paths=@('packs/core/skills/agents-bootstrap/SKILL.md','packs/core/skills/openspec-bootstrap/SKILL.md','packs/core/skills/skill-forge/SKILL.md'); foreach($p in $paths){...}` | PASS (`agents-bootstrap: 900`, `openspec-bootstrap: 987`, `skill-forge: 998`) | Confirms each frontmatter description is within the 1024-char loader limit. |
| 2026-02-12 | `npm run verify` | PASS (`fix-skill-description-length-limits: completedTasks 8/8`, `openspec validate --specs`, `Totals: 5 passed, 0 failed`) | Repo gate passes with all tasks complete. |
