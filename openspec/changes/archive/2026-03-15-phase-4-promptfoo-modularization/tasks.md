# Tasks: phase-4-promptfoo-modularization

## Execution policy

- Keep the diff structural and documentation-focused.
- Do not introduce `tests/defaults.yaml` unless it clearly improves maintainability.
- Record the explicit decision about shared defaults in the change artifacts.

## Tasks

- [x] 0.1 Audit the current Promptfoo topology and confirm the existing separation by `prompts/`, `tests/`, and `providers/`.
- [x] 0.2 Add minimal OpenSpec artifacts for this slug.
- [x] 1.1 Normalize the role wording of the Promptfoo entrypoint configs.
- [x] 1.2 Update `evals/engines/promptfoo/README.md` to describe the modular topology and entrypoint purposes.
- [x] 1.3 Update `evals/README.md` only where the top-level topology needs clarification.
- [x] 1.4 Record the decision not to introduce `tests/defaults.yaml` in this phase.
- [x] 1.5 Run a final structural coherence check.

## Evidence

### 0.1
- **Command:** `Get-ChildItem -Recurse evals/engines/promptfoo`
- **Result:** PASS.
  `prompts/, tests/, providers/, fixtures/, generated/ are present under evals/engines/promptfoo/`
- **Date:** `2026-03-15`
- **Note:** The current Promptfoo tree already separates major responsibilities.

### 1.1
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `description: Promptfoo contract gate for skill-contract-forge`
- **Date:** `2026-03-15`
- **Note:** Contract entrypoint wording is explicit.

### 1.2
- **Command:** `rg -n "Entrypoints|Shared Assets|defaults.yaml|contract gate|uplift comparison" evals/engines/promptfoo/README.md`
- **Result:** PASS.
  `Engine README now documents entrypoints, topology, and the decision to omit defaults.yaml for now.`
- **Date:** `2026-03-15`
- **Note:** Engine docs match the final modular structure.

### 1.3
- **Command:** `rg -n "prompts/|tests/|providers/|contract gate|uplift comparison|defaults.yaml" evals/README.md`
- **Result:** PASS.
  `Top-level README now points to the modular Promptfoo layout without duplicating engine detail.`
- **Date:** `2026-03-15`
- **Note:** Top-level docs are aligned with the engine README.

### 1.4
- **Command:** `Test-Path evals/engines/promptfoo/tests/defaults.yaml`
- **Result:** PASS.
  `False`
- **Date:** `2026-03-15`
- **Note:** Shared defaults file is intentionally not introduced in this phase.

### 1.5
- **Command:** `rg -n "description:|providers:|tests:|raw: file://prompts/|file://tests/|file://providers/" evals/engines/promptfoo/promptfooconfig.yaml evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- **Result:** PASS.
  `Each config declares one role-specific description, one prompt path, one provider path, and one test path.`
- **Date:** `2026-03-15`
- **Note:** Entrypoints remain simple and single-purpose.
