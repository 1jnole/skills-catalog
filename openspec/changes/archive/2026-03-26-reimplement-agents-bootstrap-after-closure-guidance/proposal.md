## Why

`agents-bootstrap` still has the older implementation shape even after the refreshed approved brief exists, and we have now dogfooded an additional improvement into the local `skill-implementation-forge`: phase-2 runs should materialize explicit closure guidance in the target skill when the workflow benefits from one.

This rerun applies the refreshed brief again using the updated local implementation-forge guidance so we can verify that the target skill now lands in the intended shape.

## What Changes

- Refactor `packs/core/agents-bootstrap/SKILL.md` from the refreshed approved brief at `refresh-agents-bootstrap-contract-local-skill/eval-brief.json`.
- Preserve the existing package shape of `SKILL.md` plus `assets/AGENTS.managed.md`.
- Add explicit completion guidance in the maintained skill so the workflow has a clear done signal.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `agents-bootstrap`: reimplement the maintained skill from the refreshed approved brief using the updated local implementation-forge guidance.

## Impact

- Produces a visibly refreshed implementation of `agents-bootstrap`.
- Confirms that the local `skill-implementation-forge` adjustment improves the target skill output.
- Leaves downstream eval authoring out of scope.
