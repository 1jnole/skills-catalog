## 1. Primary-route docs

- [x] 1.1 Update the active eval READMEs so the canonical `skill-forge` suite in `evals/cases/` is the primary route.
- [x] 1.2 Mark `packs/core/skill-forge/evals/README.md` as transitional compatibility and point to the new scaffold.
- [x] 1.3 Update the Phase 5 migration plan with closeout state and evidence.

## 2. Verification

- [x] 2.1 Run `openspec validate "evals-phase-5-primary-route" --type change`.
- [x] 2.2 Run `rg -n "suite.v1|transitional compatibility|primary route|run-promptfoo-pilot" README.md scripts/evals/README.md evals/README.md evals/engines/promptfoo/README.md packs/core/skill-forge/evals/README.md migration/fase-5-migracion-skills-evals-plan-y-tareas.md`.

## Evidence

- Command: `openspec validate "evals-phase-5-primary-route" --type change`
  Result: PASS
  Date: 2026-03-13
  Note: The change validates after the active docs and migration notes describe the canonical `skill-forge` suite as the primary route.

- Command: `rg -n "suite.v1|transitional compatibility|primary route|run-promptfoo-pilot" README.md scripts/evals/README.md evals/README.md evals/engines/promptfoo/README.md packs/core/skill-forge/evals/README.md migration/fase-5-migracion-skills-evals-plan-y-tareas.md`
  Result: PASS
  Date: 2026-03-13
  Note: The active eval docs, inherited `packs/core` README, and Phase 5 migration plan all point to `suite.v1.json` plus `run-promptfoo-pilot` as the primary `skill-forge` route while marking the inherited path as transitional compatibility.
