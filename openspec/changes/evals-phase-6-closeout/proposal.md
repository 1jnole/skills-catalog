# Proposal: evals-phase-6-closeout

## Why

Even after the new command surface is fixed, the repo still needs an explicit final supported-path document, historical isolation notes, a validation suite that protects the new system rather than the Laminar path, and a short deferred-debt record. Without that closeout, the migration remains operationally ambiguous.

## What Changes

- add or update a short document that defines the final supported eval path
- mark historical Laminar and inherited-layout docs as compatibility or historical only
- update the smoke or closeout validation so it protects the final supported path rather than the inherited runner
- add a concise deferred-debt list for items explicitly outside this migration
- update the Phase 6 migration plan with closeout evidence

## Capabilities

### New Capabilities
- `evals-final-closeout`: Defines the final supported-path documentation, historical isolation, validation, and deferred-debt record for the closed migration.

### Modified Capabilities
- None.

## Impact

- `scripts/evals/README.md`
- `evals/README.md`
- `evals/engines/promptfoo/README.md`
- `scripts/evals/infrastructure/laminar/README.md`
- `migration/fase-6-migracion-skills-evals-plan-y-tareas.md`
- validation tests and closeout docs under `evals/`
