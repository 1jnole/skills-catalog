# Tasks: phase-1-contract-suite-split

## Execution policy

- Keep the diff limited to the first three phase tasks requested by the user.
- Do not touch docs in this slug.
- Record lightweight evidence for the structural checks performed.

## Tasks

- [x] 0.1 Run OpenSpec preflight commands and confirm the workspace is ready.
- [x] 0.2 Add minimal change artifacts for this slug.
- [x] 1.1 Create `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml` from the existing suite content.
- [x] 1.2 Update `evals/engines/promptfoo/promptfooconfig.yaml` so the canonical gate uses only `with_skill` and the contract suite.
- [x] 1.3 Remove `evals/engines/promptfoo/tests/skill-contract-forge.yaml` to avoid duplicate canonical sources.
- [x] 1.4 Update `evals/README.md` and `evals/engines/promptfoo/README.md` so the canonical gate semantics are documented.
- [x] 1.5 Run a final structural coherence check for config, suite, docs, and retained assets.

## Evidence

### 0.1
- **Command:** `openspec --version`
- **Result:** PASS.
  `1.2.0`
- **Date:** `2026-03-15`
- **Note:** OpenSpec CLI is available.

- **Command:** `openspec schemas --json`
- **Result:** PASS.
  `"name": "spec-driven"`
- **Date:** `2026-03-15`
- **Note:** Schema listing works.

- **Command:** `openspec list --json`
- **Result:** PASS.
  `{"changes":[]}`
- **Date:** `2026-03-15`
- **Note:** Preflight completed before creating the slug.

### 1.1
- **Command:** `Test-Path evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`
- **Result:** PASS.
  `True`
- **Date:** `2026-03-15`
- **Note:** Dedicated contractual suite file exists.

### 1.2
- **Command:** `Get-Content evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `prompts:`
  `  - label: with_skill`
  `tests: file://tests/skill-contract-forge.contract.yaml`
- **Date:** `2026-03-15`
- **Note:** Canonical config now points only at the contractual suite.

### 1.3
- **Command:** `Test-Path evals/engines/promptfoo/tests/skill-contract-forge.yaml`
- **Result:** PASS.
  `False`
- **Date:** `2026-03-15`
- **Note:** Removed the old suite file to avoid a double source of truth.

### 1.4
- **Command:** `rg -n "skill-contract-forge\.contract\.yaml|with_skill|without_skill|contract suite|comparison" evals/README.md evals/engines/promptfoo/README.md`
- **Result:** PASS.
  `README files now reference skill-contract-forge.contract.yaml and describe with_skill as the canonical gate path.`
- **Date:** `2026-03-15`
- **Note:** Top-level and engine-level docs now align on the contractual semantics.

### 1.5
- **Command:** `rg -n "without_skill|skill-contract-forge\.yaml|skill-contract-forge\.contract\.yaml" evals/engines/promptfoo/promptfooconfig.yaml evals/README.md evals/engines/promptfoo/README.md evals/engines/promptfoo/tests`
- **Result:** PASS.
  `Only skill-contract-forge.contract.yaml remains canonical; without_skill appears only in docs as a retained future comparison asset.`
- **Date:** `2026-03-15`
- **Note:** Final structure is coherent without touching schema, cases, fixtures, or generated outputs.
