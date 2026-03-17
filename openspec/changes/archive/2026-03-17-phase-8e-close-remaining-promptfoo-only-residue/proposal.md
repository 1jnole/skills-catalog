## Why

`skill-contract-forge` already runs as Promptfoo-native, but two active templates still mention `evals.json` and the active README surfaces do not all list the same supported Promptfoo commands. That leaves avoidable ambiguity in the maintained tree even though the legacy sync workflow and skill-local eval subtree are already gone. A separate pre-existing offline uplift replay drift remains, but it belongs to follow-up runtime/fixture investigation rather than this closeout slug.

## What Changes

- Remove the remaining `evals.json` wording from the active `skill-contract-forge` templates under `packs/core/skill-contract-forge/assets/`.
- Align the supported Promptfoo command surface across the root README and active eval READMEs so uplift validation and replay commands are documented consistently.
- Add a final active-tree residue check and closeout verification evidence without changing suites, fixtures, prompts, providers, or runtime behavior.
- Record the known `promptfoo:run:offline:uplift:with-skill` semantic drift as an explicit follow-up rather than broadening this documentation-only cleanup slug.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge-brief-boundary-neutrality`: active `skill-contract-forge` authoring templates must stay engine-neutral and avoid retired eval-authoring targets.
- `skill-contract-forge-packaging-alignment`: packaged support assets must not teach `evals.json` or a local eval-authoring subtree as downstream destinations.
- `promptfoo-modular-config-topology`: active Promptfoo docs must present one consistent supported command surface without reintroducing sync or wrapper tooling.

## Impact

- Affected files: `packs/core/skill-contract-forge/assets/`, `README.md`, `evals/README.md`, `evals/engines/promptfoo/README.md`, and the new OpenSpec change artifacts.
- No dependency, provider, Promptfoo suite, fixture, or runtime contract changes.
- Verification uses existing Promptfoo validate commands, active-tree residue scans, and offline replay evidence, with any pre-existing replay drift tracked separately when it falls outside this slug's documentation-only scope.
