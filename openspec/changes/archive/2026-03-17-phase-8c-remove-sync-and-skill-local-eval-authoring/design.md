## Context

`phase-8b` already established that `skill-contract-forge` is maintained directly in the three Promptfoo-native suite files. This slug removes the transitional disk artifacts and command surface that were intentionally left in place only to keep the migration reviewable.

## Goals / Non-Goals

**Goals:**

- Remove the obsolete `evals.json` file and its transitional README from the skill package.
- Remove the sync script, sync test, and `promptfoo:sync*` commands.
- Leave the supported runtime commands and Promptfoo suite behavior unchanged.
- Close the transitional wording in the stable specs.

**Non-Goals:**

- Changing Promptfoo suite contents or coverage.
- Moving Promptfoo-native suites to a different folder.
- Removing the `yaml` dependency, because it is still used by the skill-metadata frontmatter code.
- Refactoring `skill-eval-forge` or any other legacy generic skill flow.

## Decisions

### Decision 1 — Delete obsolete files instead of preserving a local shadow workflow

Once Promptfoo-native suites are the only supported authority, keeping `packs/core/skill-contract-forge/evals/` and sync tooling provides no supported value. The repo should keep the historical record in git and archived OpenSpec changes, not in an active duplicate workflow.

### Decision 2 — Command surface stays Promptfoo-native only

After this slug, the supported command surface for `skill-contract-forge` remains:

- `promptfoo:validate`
- `promptfoo:validate:uplift:with-skill`
- `promptfoo:validate:uplift:without-skill`
- `promptfoo:run*`

No sync/check command remains for this skill.

### Decision 3 — `yaml` stays

The sync script uses `yaml`, but so does `scripts/skill-metadata/frontmatter.ts`. This slug removes only the obsolete sync-specific code, not the shared dependency.

## Risks / Trade-offs

- [Risk] A doc or spec still points to a deleted file after cleanup. -> Mitigation: run residue searches for `evals.json`, `promptfoo:sync`, and `sync-skill-contract-forge-promptfoo` before closing.
- [Risk] Deleting the skill-local `evals/` folder leaves an empty directory assumption somewhere else in the repo. -> Mitigation: remove the folder completely and verify no active references remain.
- [Risk] Removing sync commands accidentally breaks the supported Promptfoo execution flow. -> Mitigation: run the Promptfoo validation and offline replay commands after cleanup.

## Migration Plan

1. Remove sync scripts and sync package commands.
2. Remove `packs/core/skill-contract-forge/evals/` once its obsolete files are deleted.
3. Tighten the stable specs to remove the transitional allowance from `phase-8b`.
4. Run residue searches plus Promptfoo validation and offline replay commands.
