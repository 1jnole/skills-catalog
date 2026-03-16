# Tasks: phase-2-uplift-suite-split

## Execution policy

- Keep the diff limited to uplift configs, uplift tests, and minimum docs.
- Do not modify the contract gate config or contract suite semantics.
- Record structural evidence for the phase checks.

## Tasks

- [x] 0.1 Confirm Phase 1 is already closed and the contract gate exists.
- [x] 0.2 Add minimal OpenSpec artifacts for this slug.
- [x] 1.1 Create `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`.
- [x] 1.2 Create `evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`.
- [x] 1.3 Create `evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`.
- [x] 1.4 Update `evals/README.md` for separate contract and uplift surfaces.
- [x] 1.5 Update `evals/engines/promptfoo/README.md` for the new Promptfoo entrypoints.
- [x] 1.6 Run a final structural coherence check.

## Evidence

### 0.1
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `description: Canonical Promptfoo contract suite for skill-contract-forge`
  `tests: file://tests/skill-contract-forge.contract.yaml`
- **Date:** `2026-03-15`
- **Note:** Phase 1 contract gate is present before uplift work starts.

### 1.1
- **Command:** `Test-Path evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- **Result:** PASS.
  `True`
- **Date:** `2026-03-15`
- **Note:** Comparative Promptfoo suite exists.

### 1.2
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- **Result:** PASS.
  `- label: with_skill`
  `tests: file://tests/skill-contract-forge.uplift.yaml`
- **Date:** `2026-03-15`
- **Note:** With-skill uplift config points to the comparative suite.

### 1.3
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- **Result:** PASS.
  `- label: without_skill`
  `tests: file://tests/skill-contract-forge.uplift.yaml`
- **Date:** `2026-03-15`
- **Note:** Without-skill uplift config points to the same comparative suite.

### 1.4
- **Command:** `rg -n "contract|uplift|with_skill|without_skill" evals/README.md`
- **Result:** PASS.
  `README now documents both the contract gate and uplift comparison surface.`
- **Date:** `2026-03-15`
- **Note:** Top-level docs describe the two eval questions separately.

### 1.5
- **Command:** `rg -n "contract|uplift|with_skill|without_skill|skill-contract-forge\\.uplift\\.yaml" evals/engines/promptfoo/README.md`
- **Result:** PASS.
  `Engine README now names the contract and uplift entrypoints separately.`
- **Date:** `2026-03-15`
- **Note:** Engine docs align with the new Promptfoo surface area.

### 1.6
- **Command:** `rg -n "skill-contract-forge\\.uplift\\.yaml|promptfooconfig\\.uplift|skill-contract-forge\\.contract\\.yaml" evals/README.md evals/engines/promptfoo/README.md evals/engines/promptfoo/*.yaml evals/engines/promptfoo/tests`
- **Result:** PASS.
  `Contract and uplift files are distinct and consistently referenced.`
- **Date:** `2026-03-15`
- **Note:** Final structure is coherent without altering schema, cases, or generated artifacts.
