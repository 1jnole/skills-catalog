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
- `evals/cases/skill-contract-forge/README.md` is pointer and historical context only for this skill.
- `evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml` stores the inherited migration residue and should not be treated as the supported runtime suite.
- The repo does not maintain a local runner around Promptfoo for case execution.

Historical bootstrap snapshot:
- `evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`
