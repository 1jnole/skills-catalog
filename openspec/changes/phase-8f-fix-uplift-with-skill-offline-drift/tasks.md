# Tasks: phase-8f-fix-uplift-with-skill-offline-drift

## 1. Reproduce and isolate the uplift replay drift

- [ ] 1.1 Reproduce the failing `with_skill` offline uplift replay and capture the failing case evidence.
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
- [ ] 1.2 Compare the failing case behavior across the contract replay, uplift replay, suite assertions, and fixture inputs.
  - Verification command: `rg -n -C 6 "ambiguous-refactor-missing-target" evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml`

## 2. Repair the source of truth for the offline uplift replay

- [ ] 2.1 Fix the root cause of the `with_skill` replay mismatch without weakening the expected stop-and-ask behavior.
  - Verification command: `npm run promptfoo:validate:uplift:with-skill`
- [ ] 2.2 Re-run the offline uplift replay until the `with_skill` surface returns to green.
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`

## 3. Record focused evidence

- [ ] 3.1 Validate the OpenSpec change artifacts.
  - Verification command: `openspec validate "phase-8f-fix-uplift-with-skill-offline-drift" --type change`
- [ ] 3.2 Record the repaired case-specific evidence for `ambiguous-refactor-missing-target`.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.eval.json','utf8')); const row=(j.results?.results||j.results||[]).find(r=>r.vars?.case_id==='ambiguous-refactor-missing-target'); console.log(JSON.stringify({success:row?.success,namedScores:row?.namedScores,output:(row?.response?.output||row?.output||'').slice(0,240)}, null, 2));"`

## Evidence

- Pending implementation.
