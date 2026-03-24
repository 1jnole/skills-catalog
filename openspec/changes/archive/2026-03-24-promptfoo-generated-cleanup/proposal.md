## Why

The repo already keeps Promptfoo reports under `evals/engines/promptfoo/generated/`, but those files are large, regenerated outputs rather than source-of-truth inputs.

Keeping stale reports around increases local search noise and AI context cost without improving the repo's durable contract surface.

## What Changes

- Add a public cleanup command for Promptfoo generated reports.
- Remove the currently retained generated Promptfoo JSON files from the working tree.
- Keep fixtures, tests, and Promptfoo configs unchanged.

## Capabilities

### Modified Capabilities
- Promptfoo runtime hygiene: generated eval reports can be cleared with one repo-supported command.

## Impact

- Updated tooling entrypoints: `package.json`
- Cleared local generated artifacts: `evals/engines/promptfoo/generated/`
