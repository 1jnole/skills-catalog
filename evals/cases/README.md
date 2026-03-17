# Cases Boundary

This directory owns suite/case authoring artifacts for the new eval harness.

Current canonical local authoring contract:
- `packs/core/skill-contract-forge/evals/evals.json`

Current Promptfoo execution surfaces:
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`

Notes:
- `packs/core/skill-contract-forge/evals/evals.json` is the local authoring contract and is not the runtime pass/fail authority.
- `evals/cases/` no longer carries a second skill-local authoring copy for `skill-contract-forge`.
- inherited migration residue is no longer kept in the active `evals/` tree; archived OpenSpec plus git history preserve that context.
- The repo does not maintain a local runner around Promptfoo for case execution.
