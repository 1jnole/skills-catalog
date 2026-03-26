## Why

Dogfooding `skill-contract-forge` on the real `agents-bootstrap` contract run exposed one more gap that still depended on operator judgment instead of living inside the skill itself. The run had to recognize that an existing `assets/AGENTS.managed.md` file was not incidental support content but durable contract authority that should keep `assets/` in the approved package shape.

Compared against `skill-authoring-doc.md`, that missing emphasis creates avoidable pressure to collapse `supportFolders` to `[]` even when a maintained template or baseline already defines deterministic skill behavior.

## What Changes

- Clarify that existing template, baseline, or scaffold assets in the current skill package can be positive justification for keeping `assets/` in `authoring.packageShape.supportFolders`.
- Teach existing-skill refactor and rewrite runs not to drop `assets/` just because the durable support surface is small.
- Add supporting examples and edge-case guidance so the rule lives inside the maintained skill package instead of only in the playbook.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge`: existing-skill refactors must preserve asset-backed package shape when durable templates or baselines already exist in the maintained package.

## Impact

- Makes `skill-contract-forge` more self-sufficient during real contract authoring runs.
- Reduces dependence on `skill-authoring-doc.md` when an existing skill owns authoritative template assets.
- Keeps the contract phase boundary unchanged and still ends at `Eval Brief ready`.
