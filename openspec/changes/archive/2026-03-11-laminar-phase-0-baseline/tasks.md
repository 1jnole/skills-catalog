- [x] 1.1 Create the canonical phase 0 baseline note under `roadmap/` and record inventory, classification, baseline, coupling, and drift there.
- [x] 1.2 Inventory current runner commands, `scripts/evals/` folders, and runner-related docs that describe the present state.
- [x] 1.3 Classify inventoried runner pieces as `source of truth`, `legacy but still needed`, or `stale / safe to ignore during migration`.
- [x] 1.4 Document `skill-forge` as the only migration pilot and capture the accepted parity baseline plus artifact paths.
- [x] 1.5 Record legacy artifact coupling for `outputs/`, `timing.json`, `grading.json`, `feedback.json`, `with_skill/`, and `without_skill/`.
- [x] 1.6 Search and record naming or documentation drift for `run-iteration`, `read-evals`, `run-lmnr-eval`, and legacy artifact structures.
- [x] 1.7 Align `PLAN.md` and `roadmap/` with the real current state if phase 0 finds documented drift.
- [x] 1.8 Run `npx tsc -p scripts/evals/tsconfig.json` and record evidence here.

## Evidence

- Command: `openspec --version`
  Result: PASS
  Date: 2026-03-11
  Note: OpenSpec CLI is available for the phase 0 change workflow.

- Command: `openspec schemas --json`
  Result: PASS
  Date: 2026-03-11
  Note: The `spec-driven` schema is available for this change.

- Command: `openspec list --json`
  Result: PASS
  Date: 2026-03-11
  Note: The workspace is bootstrapped and the current open changes list is queryable.

- Command: `openspec new change "laminar-phase-0-baseline"`
  Result: PASS
  Date: 2026-03-11
  Note: The change skeleton was created before drafting proposal, specs, design, and tasks.

- Command: `rg -n "run-lmnr-eval|read-evals|run-iteration" PLAN.md roadmap/laminar-migration-phase-0-baseline.md scripts/evals/README.md -S`
  Result: PASS
  Date: 2026-03-11
  Note: Confirmed that the live source command names are `read-evals` and `run-iteration`, while `run-lmnr-eval` survives as drift or generated output.
  Output:
  `scripts/evals/README.md:47:   node scripts/evals/dist/read-evals.js --skill-name skill-forge`
  `scripts/evals/README.md:49:   node scripts/evals/dist/run-iteration.js --skill-name skill-forge --model gpt-4.1-mini`
  `roadmap/laminar-migration-phase-0-baseline.md:161:- PLAN.md previously described the current state as run-lmnr-eval / run-iteration.`
  `PLAN.md:48:    A["evals.json"] --> B["read-evals / run-iteration"]`

- Command: `rg -n "outputs/|timing.json|grading.json|feedback.json|with_skill/|without_skill/" scripts/evals/run/artifacts/read-run-artifacts.ts scripts/evals/run/artifacts/iteration-files.ts scripts/evals/run/artifacts/write-run-artifacts.ts roadmap/laminar-migration-phase-0-baseline.md -S`
  Result: PASS
  Date: 2026-03-11
  Note: Confirmed that the current runner still reads or writes the legacy artifact layout recorded in the baseline note.
  Output:
  `scripts/evals/run/artifacts/read-run-artifacts.ts:15:    timing: path.join(caseDir, 'timing.json'),`
  `scripts/evals/run/artifacts/read-run-artifacts.ts:16:    grading: path.join(caseDir, 'grading.json'),`
  `scripts/evals/run/artifacts/read-run-artifacts.ts:17:    feedback: path.join(caseDir, 'feedback.json'),`
  `scripts/evals/run/artifacts/write-run-artifacts.ts:92:  writeValidatedJsonFile(path.join(caseDir, 'timing.json'), caseTimingArtifactSchema, timingArtifact);`
  `roadmap/laminar-migration-phase-0-baseline.md:188:- active detailed artifacts: outputs/, timing.json, grading.json, feedback.json, with_skill/, without_skill/`

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-11
  Note: The shared eval runner still typechecks after the phase 0 documentation changes.
  Output:
  `(no output)`
