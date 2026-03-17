# Tasks: phase-7d-clean-dataset-drift-and-runtime-docs

## 1. Remove dataset drift

- [x] 1.1 Ensure the canonical authoring dataset contains exactly 12 unique cases and no duplicate `eval-authoring-only-request`.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const ids=[...(j.golden||[]),...(j.negative||[])].map((c)=>c.id); console.log(JSON.stringify({total:ids.length, unique:new Set(ids).size, evalAuthoringOnly:ids.filter((id)=>id==='eval-authoring-only-request').length}));"`

## 2. Retire the old active authoring path

- [x] 2.1 Remove `evals/cases/skill-contract-forge/suite.v1.json` as an active authority and leave at most pointer documentation behind.
  - Verification command: `Test-Path evals/cases/skill-contract-forge/suite.v1.json`
- [x] 2.2 Update `evals/cases/skill-contract-forge/README.md` to point to the skill-local source.
  - Verification command: `rg -n "packs/core/skill-contract-forge/evals/evals.json|suite.v1.json|pointer|historical" evals/cases/skill-contract-forge/README.md`

## 3. Update runtime and authoring docs

- [x] 3.1 Update top-level eval docs to identify the skill-local authoring source and native Promptfoo runtime together.
  - Verification command: `rg -n "packs/core/skill-contract-forge/evals/evals.json|Promptfoo|local runner|suite.v1.json" evals/README.md evals/cases/README.md evals/contracts/README.md evals/fixtures/skill-contract-forge/README.md evals/engines/promptfoo/README.md`

## Evidence
- `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const ids=[...(j.golden||[]),...(j.negative||[])].map((c)=>c.id); console.log(JSON.stringify({total:ids.length, unique:new Set(ids).size, evalAuthoringOnly:ids.filter((id)=>id==='eval-authoring-only-request').length}));"` -> `{"total":12,"unique":12,"evalAuthoringOnly":1}`
- `Test-Path evals/cases/skill-contract-forge/suite.v1.json` -> `False`
- `rg -n "packs/core/skill-contract-forge/evals/evals.json|suite.v1.json|pointer|historical" evals/cases/skill-contract-forge/README.md` -> shows the canonical skill-local path plus pointer/historical wording only
- `rg -n "packs/core/skill-contract-forge/evals/evals.json|Promptfoo|local runner|suite.v1.json" evals/README.md evals/cases/README.md evals/contracts/README.md evals/fixtures/skill-contract-forge/README.md evals/engines/promptfoo/README.md` -> shared docs now point to the skill-local authoring source and Promptfoo runtime without presenting `suite.v1.json` as active
