# Cases Boundary

This directory owns suite/case authoring artifacts for the new eval harness.

Current local authoring contract:
- `evals/cases/skill-contract-forge/suite.v1.json`

Current Promptfoo execution surfaces:
- `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- `evals/engines/promptfoo/tests/skill-contract-forge.uplift.without-skill.yaml`

Notes:
- `suite.v1.json` remains the local authoring contract and is not the runtime pass/fail authority.
- `evals/_phase_a_quarantine/engines/promptfoo/tests/skill-contract-forge.yaml` stores the inherited migration residue and should not be treated as the supported runtime suite.

Historical bootstrap snapshot:
- `evals/_phase_a_quarantine/cases/skill-contract-forge/pilot-suite.v1.json`
