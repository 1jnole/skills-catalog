# Tasks: phase-6b-expand-skill-contract-forge-dataset

## Execution policy

- Keep the diff limited to canonical case artifacts, Promptfoo suite files, offline fixtures, and OpenSpec change files.
- Expand only from observed Phase 6A patterns; do not add decorative prompts.
- Do not introduce new runner scripts or alternate suite topologies.

## Tasks

- [x] 0.1 Create OpenSpec artifacts for Slug 6B.
- [x] 1.1 Document explicit Phase 6B expansion buckets next to the canonical `skill-contract-forge` source suite while preserving the suite contract shape.
- [x] 1.2 Promote the currently useful regression cases into the canonical source suite.
- [x] 1.3 Add one realistic rewording for the missing-target stop-and-ask pattern.
- [x] 1.4 Reflect the new stop-and-ask rewording in the Promptfoo contract and uplift suites.
- [x] 1.5 Revalidate OpenSpec plus Promptfoo contract/uplift replay on the expanded dataset.

## Evidence

### 0.1
- **Command:** `openspec new change "phase-6b-expand-skill-contract-forge-dataset"`
- **Result:** PASS.
  `Created change 'phase-6b-expand-skill-contract-forge-dataset'`
- **Date:** `2026-03-16`
- **Note:** The Phase 6B slug now exists as an independent, reviewable change on its own branch.

### 1.1
- **Command:** `rg -n "boundary-mixed-request|near-miss-stop-and-ask|near-miss-non-trigger" evals/cases/skill-contract-forge/README.md`
- **Result:** PASS.
  `The local case docs now record explicit bucket intent tied to audited patterns without changing the JSON suite contract shape.`
- **Date:** `2026-03-16`
- **Note:** The Phase 6B bucket map stays adjacent to the source contract while avoiding downstream compatibility risk for `suite.v1.json`.

### 1.2
- **Command:** `rg -n "\"id\": \"(trigger-with-benchmark-noise|eval-authoring-only-request|eval-authoring-benchmark-suite-request|ambiguous-refactor-missing-target)\"" evals/cases/skill-contract-forge/suite.v1.json`
- **Result:** PASS.
  `The useful regression cases are now visible in the source suite rather than living only in Promptfoo YAML.`
- **Date:** `2026-03-16`
- **Note:** This tightens source/suite separation without changing the supported runtime topology.

### 1.3
- **Command:** `rg -n "\"id\": \"ambiguous-rewrite-missing-target\"" evals/cases/skill-contract-forge/suite.v1.json evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- **Result:** PASS.
  `The new missing-target rewording exists in the source suite and both runtime suites.`
- **Date:** `2026-03-16`
- **Note:** Phase 6B adds one realistic phrasing variant instead of inflating the suite with many near-duplicates.

### 1.4
- **Command:** `node -e "const fs=require('fs'); const arr=JSON.parse(fs.readFileSync('evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json','utf8')); console.log(arr.length);"`
- **Result:** PASS.
  `24`
- **Date:** `2026-03-16`
- **Note:** The offline replay fixture was extended by one output pair for the new reworded case.

### 1.5
- **Command:** `openspec validate "phase-6b-expand-skill-contract-forge-dataset" --type change`
- **Result:** PASS.
  `Change 'phase-6b-expand-skill-contract-forge-dataset' is valid`
- **Date:** `2026-03-16`
- **Note:** The Phase 6B change is structurally valid in OpenSpec.

### 1.5a
- **Command:** `C:\Users\Jorge\WebstormProjects\skills-catalog\node_modules\.bin\promptfoo.cmd validate -c evals/engines/promptfoo/promptfooconfig.yaml`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** The separate worktree reuses the main workspace Promptfoo binary because `node_modules` is not duplicated there.

### 1.5b
- **Command:** `C:\Users\Jorge\WebstormProjects\skills-catalog\node_modules\.bin\promptfoo.cmd validate -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** The `with_skill` uplift config remains structurally valid after adding the new stop-and-ask rewording.

### 1.5c
- **Command:** `C:\Users\Jorge\WebstormProjects\skills-catalog\node_modules\.bin\promptfoo.cmd validate -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml`
- **Result:** PASS.
  `Configuration is valid.`
- **Date:** `2026-03-16`
- **Note:** The `without_skill` uplift config remains structurally valid after the dataset expansion.

### 1.5d
- **Command:** `C:\Users\Jorge\WebstormProjects\skills-catalog\node_modules\.bin\promptfoo.cmd eval -c evals/engines/promptfoo/promptfooconfig.yaml --model-outputs evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json -o evals/engines/promptfoo/generated/phase-6b.contract.eval.json --no-progress-bar --table-cell-max-length 80`
- **Result:** FAIL.
  `Results: ✓ 9 passed, ✗ 3 failed, 0 errors (75.00%)`
- **Date:** `2026-03-16`
- **Note:** The expanded contract surface keeps the known payload issue and confirms that the new missing-target rewrite wording fails for the same stop-and-ask reason family.

### 1.5e
- **Command:** `C:\Users\Jorge\WebstormProjects\skills-catalog\node_modules\.bin\promptfoo.cmd eval -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml --model-outputs evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json -o evals/engines/promptfoo/generated/phase-6b.uplift.with-skill.eval.json --no-progress-bar --table-cell-max-length 80`
- **Result:** FAIL.
  `Results: ✓ 6 passed, ✗ 2 failed, 0 errors (75.00%)`
- **Date:** `2026-03-16`
- **Note:** `with_skill` uplift still misses both missing-target stop-and-ask variants, which is useful new signal rather than random drift.

### 1.5f
- **Command:** `C:\Users\Jorge\WebstormProjects\skills-catalog\node_modules\.bin\promptfoo.cmd eval -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml --model-outputs evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json -o evals/engines/promptfoo/generated/phase-6b.uplift.without-skill.eval.json --no-progress-bar --table-cell-max-length 80`
- **Result:** FAIL.
  `Results: 0 passed, ✗ 8 failed, 0 errors (0%)`
- **Date:** `2026-03-16`
- **Note:** The baseline remains uniformly weak on the expanded uplift surface, preserving the comparative contrast.
