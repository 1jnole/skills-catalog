# Tasks: phase-8f-fix-uplift-with-skill-offline-drift

## 1. Reproduce and isolate the uplift replay drift

- [x] 1.1 Reproduce the failing `with_skill` offline uplift replay and capture the failing case evidence.
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
- [x] 1.2 Compare the failing case behavior across the contract replay, uplift replay, suite assertions, and fixture inputs.
  - Verification command: `rg -n -C 6 "ambiguous-refactor-missing-target" evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml`

## 2. Repair the source of truth for the offline uplift replay

- [x] 2.1 Fix the root cause of the `with_skill` replay mismatch without weakening the expected stop-and-ask behavior.
  - Verification command: `npm run promptfoo:prepare:offline:uplift:with-skill`
- [x] 2.2 Re-run the offline uplift replay until the `with_skill` surface returns to green.
  - Verification command: `npm run promptfoo:run:offline:uplift:with-skill`
- [x] 2.3 Ensure the offline replay stays derived from the canonical uplift suite rather than a duplicated hand-maintained suite.
  - Verification command: `node -e "const fs=require('fs'); const YAML=require('yaml'); const source=YAML.parse(fs.readFileSync('evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml','utf8')); const generated=YAML.parse(fs.readFileSync('evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml','utf8')); console.log(JSON.stringify({sourceCases:source.length,generatedCases:generated.length,sameDescriptions:source.every((test,index)=>test.description===generated[index].description),allProviderOutputs:generated.every((test)=>typeof test.providerOutput==='string'&&test.providerOutput.length>0)}, null, 2));"`

## 3. Record focused evidence

- [x] 3.1 Validate the OpenSpec change artifacts.
  - Verification command: `openspec validate "phase-8f-fix-uplift-with-skill-offline-drift" --type change`
- [x] 3.2 Record the repaired case-specific evidence for `ambiguous-refactor-missing-target`.
  - Verification command: `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.eval.json','utf8')); const row=(j.results?.results||j.results||[]).find(r=>r.vars?.case_id==='ambiguous-refactor-missing-target'); console.log(JSON.stringify({success:row?.success,namedScores:row?.namedScores,output:(row?.response?.output||row?.output||'').slice(0,240)}, null, 2));"`

## Evidence

- **Command:** `npm run promptfoo:prepare:offline:uplift:with-skill`
  - **Result:** PASS
    - `"generatedCases": 8`
    - `"output": "evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml"`
  - **Date:** `2026-03-17`
  - **Note:** The offline replay suite is generated from the canonical uplift suite plus `case_id` keyed fixtures instead of being maintained as a duplicate hand-authored suite.

- **Command:** `npm run promptfoo:run:offline:uplift:with-skill`
  - **Result:** PASS after repair
    - `Results: ✓ 8 passed, 0 failed, 0 errors (100%)`
    - `Writing output to evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.eval.json`
  - **Date:** `2026-03-17`
  - **Note:** The `with_skill` offline uplift replay now returns to green using the generated replay suite.

- **Command:** `rg -n -C 6 "ambiguous-refactor-missing-target" evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml`
  - **Result:** PASS
    - `evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml:384:- description: ambiguous-refactor-missing-target`
    - `evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml:387:    case_id: ambiguous-refactor-missing-target`
    - `evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml:217:- description: ambiguous-refactor-missing-target`
    - `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml:392:- description: ambiguous-refactor-missing-target`
  - **Date:** `2026-03-17`
  - **Note:** The repaired offline replay keeps the same anchor case and assertion envelope as the maintained contract and live uplift suites while being generated from the canonical uplift cases.

- **Command:** `node -e "const fs=require('fs'); const YAML=require('yaml'); const source=YAML.parse(fs.readFileSync('evals/engines/promptfoo/tests/skill-contract-forge.uplift.yaml','utf8')); const generated=YAML.parse(fs.readFileSync('evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.tests.yaml','utf8')); console.log(JSON.stringify({sourceCases:source.length,generatedCases:generated.length,sameDescriptions:source.every((test,index)=>test.description===generated[index].description),allProviderOutputs:generated.every((test)=>typeof test.providerOutput==='string'&&test.providerOutput.length>0)}, null, 2));"`
  - **Result:** PASS
    - `"sourceCases": 8`
    - `"generatedCases": 8`
    - `"sameDescriptions": true`
    - `"allProviderOutputs": true`
  - **Date:** `2026-03-17`
  - **Note:** The generated replay suite preserves the canonical case list and injects replay outputs for every case.

- **Command:** `openspec validate "phase-8f-fix-uplift-with-skill-offline-drift" --type change`
  - **Result:** PASS
    - `Change 'phase-8f-fix-uplift-with-skill-offline-drift' is valid`
  - **Date:** `2026-03-17`
  - **Note:** The follow-up change workspace remains valid after the replay repair.

- **Command:** `node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('evals/engines/promptfoo/generated/skill-contract-forge.uplift.with-skill.offline.eval.json','utf8')); const row=(j.results?.results||j.results||[]).find(r=>r.vars?.case_id==='ambiguous-refactor-missing-target'); console.log(JSON.stringify({success:row?.success,namedScores:row?.namedScores,output:(row?.response?.output||row?.output||'').slice(0,240)}, null, 2));"`
  - **Result:** PASS
    - `"success": true`
    - `"stop_and_ask_behavior": 1`
    - `"classification": 1`
    - `"stop_marker": 1`
    - `"ambiguity_reason": 1`
    - `"output": "Classification: stop-and-ask\nScope clarification required.\nPlease specify which existing skill should be refactored so the contract can be clearly rewritten and frozen."`
  - **Date:** `2026-03-17`
  - **Note:** The repaired anchor regression case now replays the expected stop-and-ask behavior.
