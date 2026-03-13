## 1. Final supported-path closeout

- [x] 1.1 Add a short final supported-path document for the closed migration state.
- [x] 1.2 Update active and historical READMEs so only the final path is documented as supported.
- [x] 1.3 Add a concise deferred-debt note for items explicitly outside this migration.

## 2. Final validation

- [x] 2.1 Rewrite or replace the smoke validation so it protects the final supported command surface instead of the inherited Laminar runner.
- [x] 2.2 Update the Phase 6 migration plan with execution state, evidence, and closeout checklist.

## 3. Verification

- [x] 3.1 Run `openspec validate "evals-phase-6-closeout" --type change`.
- [x] 3.2 Run `npm run build-evals && npx vitest run "scripts/evals/smoke.test.ts"`.
- [x] 3.3 Run `rg -n "run-evals|run-promptfoo-pilot|historical compatibility|supported path|suite.v1" scripts/evals/README.md evals/README.md evals/engines/promptfoo/README.md scripts/evals/infrastructure/laminar/README.md migration/fase-6-migracion-skills-evals-plan-y-tareas.md evals/final-supported-path.md evals/deferred-migration-debt.md`.

## Evidence

- Command: `openspec validate "evals-phase-6-closeout" --type change`
  Result: PASS
  Relevant output:
  - `Change 'evals-phase-6-closeout' is valid`
  Date: `2026-03-13`
  Note: The closeout artifacts remained consistent after the documentation and validation updates.
- Command: `npm run build-evals && npx vitest run "scripts/evals/smoke.test.ts"`
  Result: PASS
  Relevant output:
  - `> build-evals`
  - `> tsc -p scripts/evals/tsconfig.json`
  - `Test Files  6 passed (6)`
  - `Tests  28 passed (28)`
  Date: `2026-03-13`
  Note: The closeout verification reused the final smoke suite together with the nearby final-path tests in the same build run.
- Command: `rg -n "run-evals|run-promptfoo-pilot|historical compatibility|supported path|suite.v1" scripts/evals/README.md evals/README.md evals/engines/promptfoo/README.md scripts/evals/infrastructure/laminar/README.md migration/fase-6-migracion-skills-evals-plan-y-tareas.md evals/final-supported-path.md evals/deferred-migration-debt.md`
  Result: PASS
  Relevant output:
  - `evals/final-supported-path.md:12:\`run-evals\` is the supported execution command.`
  - `scripts/evals/infrastructure/laminar/README.md:3:This folder is historical compatibility code...`
  - `evals/README.md:43:- \`skill-forge\` should be exercised through \`npm run run-evals ...\``
  - `scripts/evals/README.md:5:## Final supported path`
  - `migration/fase-6-migracion-skills-evals-plan-y-tareas.md:159:- \`run-evals\` ya es el entrypoint soportado del flujo final`
  Date: `2026-03-13`
  Note: Active docs now point to the final supported path while historical pieces are labeled explicitly.
