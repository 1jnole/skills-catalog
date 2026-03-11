- [x] 1.1 Create the phase 2 closeout change artifacts and validate the change before code edits.
- [x] 1.2 Remove supported writes of `outputs/`, `timing.json`, `grading.json`, `feedback.json`, `with_skill/`, and `without_skill/` from new iterations.
- [x] 1.3 Remove `output_path` from the active mode artifact contract and update dependent types or schemas.
- [x] 1.4 Make `--iteration` and `--retry-errors` use `benchmark.json` and `run.json` for new iterations without requiring the detailed legacy layout.
- [x] 1.5 Isolate any retained legacy detailed-artifact reader as historical compatibility only.
- [x] 1.6 Update `README.md` and `scripts/evals/README.md` so the supported output layout for new iterations is only `benchmark.json` and `run.json`.
- [x] 1.7 Remediate any stable `skill-forge` contract drift discovered during the new functional verification.
- [x] 1.8 Run `skill-forge` to verify a new iteration writes only the supported artifacts and preserves benchmark semantics.
- [x] 1.9 Run `npx tsc -p scripts/evals/tsconfig.json --noEmit` and record evidence here.

## Evidence

- Command: `openspec validate "laminar-phase-2-artifact-decoupling" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The phase 2 closeout change artifacts were completed and validated before code edits.
  Output:
  `Change 'laminar-phase-2-artifact-decoupling' is valid`

- Command: `openspec status --change "laminar-phase-2-artifact-decoupling" --json`
  Result: PASS
  Date: 2026-03-11
  Note: The new change reached `isComplete: true` before apply.
  Output:
  `"changeName": "laminar-phase-2-artifact-decoupling"`
  `"isComplete": true`

- Command: `Get-ChildItem -Path packs/core/skill-forge/evals/runs/iteration-5 -Recurse | Select-Object FullName`
  Result: PASS
  Date: 2026-03-11
  Note: A new supported iteration now persists only the hybrid artifacts.
  Output:
  `packs/core/skill-forge/evals/runs/iteration-5/benchmark.json`
  `packs/core/skill-forge/evals/runs/iteration-5/run.json`

- Command: `rg -n "readLegacyCaseArtifactsIfComplete|writeCaseArtifacts|writeCaseSummaryArtifacts|ensureCaseArtifactsFolder|output_path" scripts/evals -g '!scripts/evals/dist/**'`
  Result: PASS
  Date: 2026-03-11
  Note: The active path no longer writes detailed per-case artifacts or carries `output_path`; only the isolated historical compatibility reader remains.
  Output:
  `scripts/evals/run/artifacts/read-run-artifacts.ts:76:export function readLegacyCaseArtifactsIfComplete(caseDir: string, caseDefinition: EvalCase): CaseArtifacts | null {`

- Command: `rg -n "<case-id>/with_skill|<case-id>/without_skill|outputs/|timing.json|grading.json|feedback.json" README.md scripts/evals/README.md`
  Result: PASS
  Date: 2026-03-11
  Note: The active docs no longer advertise the legacy detailed per-case output layout as supported.
  Output:
  `(no output)`

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --iteration 5 --retry-errors --model gpt-4.1-mini`
  Result: PASS
  Date: 2026-03-11
  Note: Retry on a new iteration reuses benchmark-derived case state without requiring detailed per-case artifacts.
  Output:
  `[1/8] new-skill-one-clear-job`
  `  skipped: existing artifacts reused`
  `[8/8] ambiguous-multi-workflow-request`
  `  skipped: existing artifacts reused`

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --iteration 4 --retry-errors --model gpt-4.1-mini`
  Result: PASS
  Date: 2026-03-11
  Note: Historical compatibility remains intact for an older iteration while the supported output layout has been simplified for new runs.
  Output:
  `[1/8] new-skill-one-clear-job`
  `  skipped: existing artifacts reused`
  `[8/8] ambiguous-multi-workflow-request`
  `  skipped: existing artifacts reused`

- Command: `npx tsc -p scripts/evals/tsconfig.json --noEmit`
  Result: PASS
  Date: 2026-03-11
  Note: The runner still typechecks after removing supported detailed artifact writes and cleaning the active contract.
  Output:
  `(no output)`

- Command: `node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini`
  Result: FAIL
  Date: 2026-03-11
  Note: The new supported layout was verified, but the generated benchmark for `iteration-5` did not preserve the frozen green baseline, so the functional closeout task remains open.
  Output:
  `Iteration 5 finished.`
  `iteration complete: C:\Users\Jorge\WebstormProjects\skills-catalog\packs\core\skill-forge\evals\runs\iteration-5`

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-5/benchmark.json`
  Result: FAIL
  Date: 2026-03-11
  Note: The new supported iteration wrote only the expected files, but benchmark semantics did not stay green.
  Output:
  `"golden_gate_passed": false`
  `"overall_passed": false`
  `"with_skill": {`
  `"pass_rate": 0.88`
  `"without_skill": {`
  `"pass_rate": 0`

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-5/run.json`
  Result: PASS
  Date: 2026-03-11
  Note: The run manifest remains neutral after the closeout refactor.
  Output:
  `"platform": "legacy-runner"`
  `"run_ref": "iteration-5"`
  `"group_ref": "skill-forge/evals/v1"`
  `"provider": "openai"`
  `"model": "gpt-4.1-mini"`

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-6/benchmark.json`
  Result: FAIL
  Date: 2026-03-11
  Note: A second fresh iteration also failed the frozen baseline, which keeps the functional verification task open and suggests model variance or an unresolved behavioral issue outside the structural closeout itself.
  Output:
  `"status": "completed_with_errors"`
  `"golden_gate_passed": false`
  `"overall_passed": false`
  `"error_case_count": 1`

- Command: `node --input-type=module -e "...mixed-authoring-and-eval-request..."`
  Result: PASS
  Date: 2026-03-11
  Note: After reinforcing the `skill-forge` routing contract, the previously unstable mixed trigger case returned `Classification: trigger` and passed in isolated verification.
  Output:
  `"score": 1`
  `"passed": true`
  `"text": "Classification: trigger`

- Command: `& { $env:EVAL_RUN_TIMEOUT_MS='60000'; node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini }`
  Result: PASS
  Date: 2026-03-11
  Note: With the remediated skill contract and an explicit timeout for verification, a fresh supported iteration (`iteration-7`) restored the frozen green baseline.
  Output:
  `Iteration 7 finished.`
  `iteration complete: C:\Users\Jorge\WebstormProjects\skills-catalog\packs\core\skill-forge\evals\runs\iteration-7`

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-7/benchmark.json`
  Result: PASS
  Date: 2026-03-11
  Note: The new supported iteration preserved the expected phase 0 semantics and passed all gates.
  Output:
  `"golden_gate_passed": true`
  `"negative_gate_passed": true`
  `"overall_passed": true`
  `"with_skill": {`
  `"pass_rate": 1`
  `"without_skill": {`
  `"pass_rate": 0`

- Command: `Get-Content packs/core/skill-forge/evals/runs/iteration-7/run.json`
  Result: PASS
  Date: 2026-03-11
  Note: The run manifest remains neutral in the green verification iteration.
  Output:
  `"platform": "legacy-runner"`
  `"run_ref": "iteration-7"`
  `"group_ref": "skill-forge/evals/v1"`
  `"provider": "openai"`
  `"model": "gpt-4.1-mini"`

- Command: `& { $env:EVAL_RUN_TIMEOUT_MS='60000'; node scripts/evals/dist/run-evals.js --skill-name skill-forge --iteration 7 --retry-errors --model gpt-4.1-mini }`
  Result: PASS
  Date: 2026-03-11
  Note: Retry on the green verification iteration still reuses benchmark-derived case state without requiring detailed per-case artifacts.
  Output:
  `[1/8] new-skill-one-clear-job`
  `  skipped: existing artifacts reused`
  `[8/8] ambiguous-multi-workflow-request`
  `  skipped: existing artifacts reused`
