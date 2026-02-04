# Spec — phase4-skill-assets-and-docs-alignment

## Objective
Reduce future drift by enforcing a single convention for skill-local helper files (use `assets/`, not `templates/`) and add minimal operational documentation to run `verify` and `evals`.

## Scope
- Migrate any skill-local `templates/` folders to `assets/` (preserving relative paths).
- Update affected `SKILL.md` references from `templates/...` to `assets/...`.
- Add a verification guard so reintroducing `templates/` inside a skill fails `npm run verify`.
- Add a minimal doc (`docs/RUN_EVALS.md`) explaining how to run `verify` + `run-evals` and where artifacts/traces are written.

## Out of scope
- Changing the canonical skill layout (`packs/<pack>/skills` remains canonical).
- Changing eval runner architecture or expanding the dataset.

## Acceptance criteria
1. `find packs -type d -name templates` returns **no** directories.
2. Any attempt to add `packs/**/skills/**/templates/` causes `npm run verify` to fail with a clear message.
3. `docs/RUN_EVALS.md` exists and documents:
   - `npm run verify`
   - `node scripts/run-evals.mjs`
   - artifact/trace locations
   - the skills source of truth
4. `npm run verify` passes.
