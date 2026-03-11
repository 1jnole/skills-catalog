## 1. OpenSpec and scope

- [x] 1.1 Create the Batch 5 OpenSpec change and proposal/design/spec artifacts.
- [x] 1.2 Identify the remaining legacy-owned modules that still touch the supported flow.

## 2. Supported flow retirement

- [x] 2.1 Create a dedicated supported `commands/run-evals.ts` implementation.
- [x] 2.2 Convert `run-iteration` source entrypoints into compatibility aliases to the supported command.
- [x] 2.3 Move historical legacy artifact helpers outside the supported `run/artifacts/` path.
- [x] 2.4 Remove the active Laminar path dependency on a `legacy-runner` manifest default.
- [x] 2.5 Add `roadmap2/phase-3-batch-5-legacy-retirement.md` with the supported-flow retirement evidence.

## 3. Verification

- [x] 3.1 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.2 Run `openspec validate "laminar-phase-3-batch-5-legacy-retirement" --type change`.
- [x] 3.3 Record evidence and outcome in this file.

## Evidence

- Command: `rg -n "write-run-artifacts|readLegacyCaseArtifactsIfComplete|legacy-runner|commands/run-iteration|commands/run-evals" scripts/evals -S`
  Result: PASS
  Date: 2026-03-11
  Note: Confirmed the remaining legacy touch points before the refactor and verified afterward that active references now resolve only to compatibility or historical locations.

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-11
  Note: The eval runner compiles after introducing `commands/run-evals.ts`, the historical folder, and the platform-explicit manifest builder.

- Command: `powershell load .env into process env and run node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 9 --retry-errors`
  Result: PASS
  Date: 2026-03-11
  Note: The supported command completed successfully against an existing iteration after the retirement refactor.

- Command: `powershell load .env into process env and run node scripts/evals/dist/run-iteration.js --skill-name skill-forge --model gpt-4.1-mini --iteration 9 --retry-errors`
  Result: PASS
  Date: 2026-03-11
  Note: The legacy-named entrypoint now works as a compatibility alias to the supported command and completed successfully on the same iteration.

- Command: `openspec validate "laminar-phase-3-batch-5-legacy-retirement" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The completed Batch 5 change validates after recording implementation and verification evidence.
