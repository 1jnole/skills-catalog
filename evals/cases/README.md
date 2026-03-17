# Cases Boundary

This directory owns case-oriented documentation for the Promptfoo-first eval harness.

Current Promptfoo execution surfaces:
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`

Notes:
- for `skill-contract-forge`, those three Promptfoo-native suites are the only supported case-definition authority.
- `evals/cases/` no longer carries a second skill-local authoring copy for `skill-contract-forge`.
- inherited migration residue is no longer kept in the active `evals/` tree; archived OpenSpec plus git history preserve that context.
- The repo does not maintain a local runner around Promptfoo for case execution.
