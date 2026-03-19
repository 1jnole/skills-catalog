## Why

The Promptfoo runtime no longer fits a single flat `skill-contract-forge` layout. The repository now has more than one skill-specific eval family, but the active docs and runtime topology still describe a mixed structure with root-level contract files for one skill and a different nested layout for another. That drift makes it harder to add new skill evals without inventing structure on each change.

## What Changes

- adopt a direct per-skill Promptfoo family layout under `evals/engines/promptfoo/<skill-name>/`
- migrate `skill-contract-forge` from the flat root layout into its own family folder
- keep shared runtime assets in the Promptfoo root: `providers/`, `fixtures/`, `generated/`, and engine docs
- rewire `package.json` commands and maintained docs to the new topology
- define the topology in OpenSpec change artifacts so the migration can be archived into stable specs later

## Impact

- removes the mixed flat vs per-skill Promptfoo layout
- makes future skill eval families copyable without creating ad hoc paths
- changes only repo-local Promptfoo wiring and documentation; it does not add a new runner or provider model
