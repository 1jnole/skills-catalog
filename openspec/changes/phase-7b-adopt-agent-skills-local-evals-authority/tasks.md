# Tasks: phase-7b-adopt-agent-skills-local-evals-authority

## 1. Move eval authoring next to the skill

- [ ] 1.1 Create `packs/core/skill-contract-forge/evals/evals.json` as the canonical authoring source.
  - Verification command: `Test-Path packs/core/skill-contract-forge/evals/evals.json`
- [ ] 1.2 Add local documentation that says this folder owns authoring only and does not own runtime execution.
  - Verification command: `rg -n "authoring source|Promptfoo runtime|no local runner|no wrapper" packs/core/skill-contract-forge/evals/README.md`

## 2. Preserve the dataset while making surface membership explicit

- [ ] 2.1 Migrate the current 12 unique cases into `evals.json` and remove the duplicate `eval-authoring-only-request`.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const ids=[...(j.golden||[]),...(j.negative||[])].map((c)=>c.id); console.log(JSON.stringify({total:ids.length, unique:new Set(ids).size, duplicates:[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))]}));"`
- [ ] 2.2 Add explicit surface membership for every case.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const cases=[...(j.golden||[]),...(j.negative||[])]; const missing=cases.filter((c)=>!Array.isArray(c.surfaces)||c.surfaces.length===0).map((c)=>c.id); console.log(JSON.stringify({missing}));"`

## 3. Keep runtime out of the skill package

- [ ] 3.1 Confirm that the new skill-local eval folder does not add runtime configs, providers, fixtures, generated outputs, or any local runner.
  - Verification command: `Get-ChildItem packs/core/skill-contract-forge/evals -Recurse | Select-Object FullName`

## Evidence

