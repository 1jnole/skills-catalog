# Skills Scaffold

This directory is the visible Phase 3 destination for repository skill artifacts.

## Intent
- `skills/` becomes the stable top-level home for skill definitions.
- Skill authoring should converge here instead of staying conceptually tied to legacy pack layout.
- The final migration will move concrete skill artifacts here by small slices, not by a single broad rename.

## Current status
The current physical source of truth still lives in inherited locations such as:
- `packs/core/<skill>/SKILL.md`
- `packs/angular/skills/<skill>/SKILL.md`

This directory exists now so the future scaffold is visible and no longer implicit.

## Not done in this slice
- No skill files are moved yet.
- No pack is deleted yet.
- No final skill taxonomy is locked here yet.

## Phase 3 rule
From this point on, the migration should treat `skills/` as the target structural reference, even while compatibility and inherited layout still exist elsewhere in the repo.
