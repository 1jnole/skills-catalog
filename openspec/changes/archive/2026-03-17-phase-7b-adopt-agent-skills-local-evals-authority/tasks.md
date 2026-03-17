# Tasks: phase-7b-adopt-agent-skills-local-evals-authority

## 1. Move eval authoring next to the skill

- [x] 1.1 Create `packs/core/skill-contract-forge/evals/evals.json` as the canonical authoring source.
  - Verification command: `Test-Path packs/core/skill-contract-forge/evals/evals.json`
- [x] 1.2 Add local documentation that says this folder owns authoring only and does not own runtime execution.
  - Verification command: `rg -n "authoring source|Promptfoo runtime|no local runner|no wrapper" packs/core/skill-contract-forge/evals/README.md`

## 2. Preserve the dataset while making surface membership explicit

- [x] 2.1 Migrate the current 12 unique cases into `evals.json` and remove the duplicate `eval-authoring-only-request`.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const ids=[...(j.golden||[]),...(j.negative||[])].map((c)=>c.id); console.log(JSON.stringify({total:ids.length, unique:new Set(ids).size, duplicates:[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))]}));"`
- [x] 2.2 Add explicit surface membership for every case.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const cases=[...(j.golden||[]),...(j.negative||[])]; const missing=cases.filter((c)=>!Array.isArray(c.surfaces)||c.surfaces.length===0).map((c)=>c.id); console.log(JSON.stringify({missing}));"`

## 3. Keep runtime out of the skill package

- [x] 3.1 Confirm that the new skill-local eval folder does not add runtime configs, providers, fixtures, generated outputs, or any local runner.
  - Verification command: `Get-ChildItem packs/core/skill-contract-forge/evals -Recurse | Select-Object FullName`

## Evidence

- **Command:** `Test-Path packs/core/skill-contract-forge/evals/evals.json`
  - **Result:** PASS
    - `True`
  - **Date:** `2026-03-17`
  - **Note:** The canonical skill-local eval authoring file exists next to `skill-contract-forge`.

- **Command:** `rg -n "authoring source|Promptfoo runtime|no local runner|no wrapper" packs/core/skill-contract-forge/evals/README.md`
  - **Result:** PASS
    - `3:This folder owns the canonical eval authoring source for skill-contract-forge.`
    - `8:- Promptfoo runtime suites still live outside this folder under evals/engines/promptfoo/.`
    - `9:- Until the dedicated sync slug lands, runtime-facing Promptfoo suite files remain maintained separately from this authoring source.`
    - `15:- This folder does not contain a local runner, no wrapper CLI, grading layer, or alternative eval engine.`
  - **Date:** `2026-03-17`
  - **Note:** The skill-local README now defines authoring ownership without implying any local runtime or sync wrapper in this slug.

- **Command:** `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const ids=[...(j.golden||[]),...(j.negative||[])].map((c)=>c.id); console.log(JSON.stringify({total:ids.length, unique:new Set(ids).size, duplicates:[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))]}));"`
  - **Result:** PASS
    - `{"total":12,"unique":12,"duplicates":[]}`
  - **Date:** `2026-03-17`
  - **Note:** The migrated skill-local dataset contains the expected 12 unique cases and removes the duplicate `eval-authoring-only-request`.

- **Command:** `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('packs/core/skill-contract-forge/evals/evals.json','utf8')); const cases=[...(j.golden||[]),...(j.negative||[])]; const missing=cases.filter((c)=>!Array.isArray(c.surfaces)||c.surfaces.length===0).map((c)=>c.id); console.log(JSON.stringify({missing}));"`
  - **Result:** PASS
    - `{"missing":[]}`
  - **Date:** `2026-03-17`
  - **Note:** Every case now carries explicit surface membership in the skill-local authoring source.

- **Command:** `Get-ChildItem packs/core/skill-contract-forge/evals -Recurse | Select-Object FullName`
  - **Result:** PASS
    - `C:\Users\Jorge\WebstormProjects\skills-catalog\packs\core\skill-contract-forge\evals\evals.json`
    - `C:\Users\Jorge\WebstormProjects\skills-catalog\packs\core\skill-contract-forge\evals\README.md`
  - **Date:** `2026-03-17`
  - **Note:** The skill-local eval folder contains authoring artifacts only and does not absorb runtime configs, fixtures, providers, or generated outputs.

- **Command:** `openspec validate "phase-7b-adopt-agent-skills-local-evals-authority" --type change`
  - **Result:** PASS
    - `Change 'phase-7b-adopt-agent-skills-local-evals-authority' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The phase-7b change artifacts remain valid after moving authoring authority into the skill package and documenting the new boundary.
