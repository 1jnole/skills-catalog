# Proposal: evals-phase-6-command-surface

## Why

Phase 5 made the new scaffold the real path for `skill-forge`, but the public command surface is still mixed: `run-evals` and `read-evals` keep inherited defaults while `run-promptfoo-pilot` carries the real supported flow. Phase 6 needs one final supported command story that resolves the new suite by default and stops exposing the transitional alias as a public script.

## What Changes

- repoint `run-evals` to the Promptfoo-based new-scaffold flow
- make `read-evals --skill-name <name>` resolve the canonical new-scaffold suite by default
- remove `run-promptfoo-pilot` from the public `package.json` script surface and keep it only as an explicitly deprecated compatibility alias
- rename default generated Promptfoo output files so they no longer carry `pilot` historical naming
- add or update tests that protect the final command surface and the rejection of retired historical flags

## Capabilities

### New Capabilities
- `evals-final-command-surface`: Defines the final supported eval command surface and default suite resolution for the new scaffold.

### Modified Capabilities
- None.

## Impact

- `package.json`
- `scripts/evals/cli/`
- `scripts/evals/infrastructure/promptfoo/`
- `scripts/evals/smoke.test.ts`
- `scripts/evals/README.md`
