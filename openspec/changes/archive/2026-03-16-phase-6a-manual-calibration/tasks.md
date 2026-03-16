# Tasks: phase-6a-manual-calibration

## Execution policy

- Keep the diff limited to audit artifacts, local eval docs, and OpenSpec change files.
- Reuse the current supported Promptfoo configs instead of introducing new runner scripts.
- Do not commit generated Promptfoo output files.

## Tasks

- [x] 0.1 Create OpenSpec artifacts for Slug 6A.
- [x] 1.1 Define a tracked manual audit sample for the current canonical `skill-contract-forge` cases.
- [x] 1.2 Run the audit sample across contract, uplift `with_skill`, and uplift `without_skill`.
- [x] 1.3 Record a human-readable audit note with `correct`, `incorrect`, or `dudoso` judgments.
- [x] 1.4 Extract a small set of actionable error patterns from the audit.
- [x] 1.5 Update local `skill-contract-forge` eval docs so the audit artifacts are discoverable.
- [x] 1.6 Validate the OpenSpec change and record executable evidence.

## Evidence

### 0.1
- **Command:** `openspec new change "phase-6a-manual-calibration"`
- **Result:** PASS.
  `Created change 'phase-6a-manual-calibration'`
- **Date:** `2026-03-16`
- **Note:** The Phase 6A slug now exists as an independent, reviewable change.

### 1.1
- **Command:** `rg -c "^- description:" evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`
- **Result:** PASS.
  `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml:11`
  `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml:7`
- **Date:** `2026-03-16`
- **Note:** The current canonical sample is small enough to audit in full, so Phase 6A uses the supported cases rather than synthetic padding.

### 1.2a
- **Command:** `npx promptfoo eval -c evals/engines/promptfoo/promptfooconfig.yaml --model-outputs evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json -o evals/engines/promptfoo/generated/phase-6a.contract.eval.json --no-progress-bar --table-cell-max-length 80`
- **Result:** FAIL.
  `Results: ✓ 9 passed, ✗ 2 failed, 0 errors (81.82%)`
- **Date:** `2026-03-16`
- **Note:** The contract gate still fails on two semantically important cases and therefore remains audit-worthy.

### 1.2b
- **Command:** `npx promptfoo eval -c evals/engines/promptfoo/promptfooconfig.uplift.with-skill.yaml --model-outputs evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json -o evals/engines/promptfoo/generated/phase-6a.uplift.with-skill.eval.json --no-progress-bar --table-cell-max-length 80`
- **Result:** FAIL.
  `Results: ✓ 6 passed, ✗ 1 failed, 0 errors (85.71%)`
- **Date:** `2026-03-16`
- **Note:** `with_skill` uplift is directionally strong but still misses one stop-and-ask boundary.

### 1.2c
- **Command:** `npx promptfoo eval -c evals/engines/promptfoo/promptfooconfig.uplift.without-skill.yaml --model-outputs evals/engines/promptfoo/fixtures/skill-contract-forge-suite-model-outputs.json -o evals/engines/promptfoo/generated/phase-6a.uplift.without-skill.eval.json --no-progress-bar --table-cell-max-length 80`
- **Result:** FAIL.
  `Results: 0 passed, ✗ 7 failed, 0 errors (0%)`
- **Date:** `2026-03-16`
- **Note:** The baseline prompt shows no reliable routing on the audit sample, which makes the uplift contrast easy to observe.

### 1.3
- **Command:** `node -e "const fs=require('fs'); const files=[['contract','evals/engines/promptfoo/generated/phase-6a.contract.eval.json'],['with_skill','evals/engines/promptfoo/generated/phase-6a.uplift.with-skill.eval.json'],['without_skill','evals/engines/promptfoo/generated/phase-6a.uplift.without-skill.eval.json']]; for (const [label,p] of files){ const j=JSON.parse(fs.readFileSync(p,'utf8')); console.log('##',label); for (const r of j.results.results){ const id=r.vars?.case_id||r.testCase?.vars?.case_id||r.description||'unknown'; const pass=(r.success ?? r.gradingResult?.pass ?? false); console.log(id+'\\t'+(pass?'PASS':'FAIL')); } }"`
- **Result:** PASS.
  `contract: 9 pass / 2 fail`
  `with_skill: 6 pass / 1 fail`
  `without_skill: 0 pass / 7 fail`
- **Date:** `2026-03-16`
- **Note:** The per-case matrix was captured and translated into the tracked audit note.

### 1.4
- **Command:** `rg -n "schema pass|wrong classification|false stop-and-ask|near-miss|ambiguous workflow" evals/cases/skill-contract-forge/manual-audit.phase-6a.md`
- **Result:** PASS.
  `The audit note records concrete error patterns tied to observed case behavior.`
- **Date:** `2026-03-16`
- **Note:** Phase 6B can now expand the dataset from observed failure patterns instead of guesswork.

### 1.5
- **Command:** `rg -n "manual-audit.phase-6a" evals/cases/skill-contract-forge/README.md`
- **Result:** PASS.
  `The local skill-contract-forge case docs now point to the Phase 6A audit artifacts.`
- **Date:** `2026-03-16`
- **Note:** The audit sample and note are discoverable next to the canonical case contract.

### 1.6a
- **Command:** `openspec validate "phase-6a-manual-calibration" --type change`
- **Result:** PASS.
  `Change 'phase-6a-manual-calibration' is valid`
- **Date:** `2026-03-16`
- **Note:** The new slug is structurally valid in OpenSpec.

### 1.6b
- **Command:** `git status --short`
- **Result:** PASS.
  `Phase 6A source artifacts and local eval docs remain in the diff; PLAN.md also remains as a pre-existing local change outside this slug.`
- **Date:** `2026-03-16`
- **Note:** Generated Promptfoo outputs were used for evidence but are not intended to stay versioned.
