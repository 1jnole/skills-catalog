## Why

The repo already uses Promptfoo-native `validate`, `offline replay`, and `live` runs, but the current docs do not state one consistent authority rule across `evals/` and OpenSpec guidance. That leaves room to overread offline replay as a source of semantic truth or to miss that `without_skill` is intentionally informational.

## What Changes

- Document one shared operational policy for Promptfoo-native execution:
  - `validate` checks config and suite structure
  - `offline replay` is the preferred low-cost smoke path
  - `live` is the semantic authority when replay and live disagree
  - `without_skill` remains an informational baseline
- Align the top-level eval docs, Promptfoo engine boundary docs, and OpenSpec workflow guidance to say the same thing without changing runtime topology.
- Record the policy in OpenSpec as a spec-level runtime clarification for the supported Promptfoo-native eval flow.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `skill-contract-forge-promptfoo-eval-runtime`: clarify operational authority across `validate`, offline replay, live runs, and the informational `without_skill` baseline.

## Impact

- Affected code: `evals/README.md`, `evals/engines/promptfoo/README.md`, `openspec/AGENTS.override.md`
- Affected systems: OpenSpec runtime guidance and Promptfoo eval workflow documentation
- Out of scope: Promptfoo configs, npm scripts, snapshots, runtime topology, Eval Brief schema, fixture refresh
