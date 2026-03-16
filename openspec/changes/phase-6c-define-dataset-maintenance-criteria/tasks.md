# Tasks: phase-6c-define-dataset-maintenance-criteria

## Execution policy

- Keep the diff limited to local `skill-forge` maintenance docs and OpenSpec change files.
- Do not change Promptfoo topology or case/runtime assets in this slug.
- Prefer short operational guidance over broad governance prose.

## Tasks

- [x] 0.1 Create OpenSpec artifacts for Slug 6C.
- [x] 1.1 Define explicit admission criteria for new `skill-forge` cases.
- [x] 1.2 Define pruning, fusion, movement, or downgrade criteria for existing cases.
- [x] 1.3 Document the short dataset evolution workflow.
- [x] 1.4 Define the practical "sufficiently good" stopping point.
- [x] 1.5 Validate the OpenSpec change and record the documentation evidence.

## Evidence

### 0.1
- **Command:** `openspec new change "phase-6c-define-dataset-maintenance-criteria"`
- **Result:** PASS.
  `Created change 'phase-6c-define-dataset-maintenance-criteria'`
- **Date:** `2026-03-16`
- **Note:** The Phase 6C slug now exists as its own reviewable change.

### 1.1
- **Command:** `rg -n "## Case admission criteria|Add a new case only|Do not add a new case" evals/cases/skill-forge/README.md`
- **Result:** PASS.
  `The local skill-forge docs now define when a new case should enter the canonical maintenance flow.`
- **Date:** `2026-03-16`
- **Note:** Admission now depends on uncovered boundaries, observed misses, useful rewordings, or comparative value.

### 1.2
- **Command:** `rg -n "## Case pruning and movement criteria|Delete, fuse, move, or downgrade" evals/cases/skill-forge/README.md`
- **Result:** PASS.
  `The local docs now define when to prune, fuse, move, or downgrade cases.`
- **Date:** `2026-03-16`
- **Note:** This keeps the canonical suite from inflating silently.

### 1.3
- **Command:** `rg -n "## Dataset maintenance workflow|1\\. detect a real failure|6\\. keep the case only" evals/cases/skill-forge/README.md`
- **Result:** PASS.
  `A short step-by-step maintenance workflow is now documented next to the suite.`
- **Date:** `2026-03-16`
- **Note:** The workflow keeps maintenance actionable and tied to real signal.

### 1.4
- **Command:** `rg -n "## Sufficiently good|Treat the dataset as good enough" evals/cases/skill-forge/README.md`
- **Result:** PASS.
  `The docs now define when to stop expanding the dataset for routine work.`
- **Date:** `2026-03-16`
- **Note:** The stopping point favors useful signal over infinite coverage growth.

### 1.5
- **Command:** `openspec validate "phase-6c-define-dataset-maintenance-criteria" --type change`
- **Result:** PASS.
  `Change 'phase-6c-define-dataset-maintenance-criteria' is valid`
- **Date:** `2026-03-16`
- **Note:** The new maintenance-policy slug is structurally valid in OpenSpec.

### 1.5a
- **Command:** `rg -n "## Case admission criteria|## Case pruning and movement criteria|## Dataset maintenance workflow|## Sufficiently good" evals/cases/skill-forge/README.md`
- **Result:** PASS.
  `28:## Case admission criteria`
  `42:## Case pruning and movement criteria`
  `50:## Dataset maintenance workflow`
  `60:## Sufficiently good`
- **Date:** `2026-03-16`
- **Note:** The local `skill-forge` docs now contain the four operational maintenance sections requested by Slug 6C.
