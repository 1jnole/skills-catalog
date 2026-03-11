## 1. OpenSpec and scope

- [x] 1.1 Create the risk-hardening OpenSpec artifacts for the Batch 5 follow-up.
- [x] 1.2 Confirm the specific residual risks to harden in code and docs.

## 2. Hardening

- [x] 2.1 Add exclusive per-iteration locking with stale-lock reclamation.
- [x] 2.2 Restore compatibility shims for moved legacy helper import paths.
- [x] 2.3 Update nearby docs to reflect the historical helper layout.

## 3. Verification

- [x] 3.1 Run `npx tsc -p scripts/evals/tsconfig.json`.
- [x] 3.2 Run `openspec validate "laminar-phase-3-batch-5-risk-hardening" --type change`.
- [x] 3.3 Record evidence and outcome in this file.

## Evidence

- Command: `npx tsc -p scripts/evals/tsconfig.json`
  Result: PASS
  Date: 2026-03-11
  Note: The eval runner compiles after adding iteration locking, compatibility shims, and the nearby doc corrections.

- Command: `node --input-type=module -e "const writer = await import('./scripts/evals/dist/run/artifacts/write-run-artifacts.js'); const reader = await import('./scripts/evals/dist/run/artifacts/read-run-artifacts.js'); console.log('writeBenchmark=' + ('writeBenchmark' in writer)); console.log('writeRunManifest=' + ('writeRunManifest' in writer)); console.log('readLegacyCaseArtifactsIfComplete=' + ('readLegacyCaseArtifactsIfComplete' in reader));"`
  Result: PASS
  Date: 2026-03-11
  Note: The old artifact helper import paths still resolve through compatibility shims after Batch 5 moved the implementations into `run/historical/`.

- Command: `powershell create live iteration lock and run node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 9 --retry-errors`
  Result: PASS
  Date: 2026-03-11
  Note: The command failed fast with `Iteration is already in use` while the lock owner PID was still alive, preventing concurrent mutation of `iteration-9`.

- Command: `powershell create stale iteration lock and run node scripts/evals/dist/run-evals.js --skill-name skill-forge --model gpt-4.1-mini --iteration 9 --retry-errors`
  Result: PASS
  Date: 2026-03-11
  Note: The runner reclaimed the stale lock, completed successfully against the existing iteration, and removed the lock file on exit.

- Command: `openspec validate "laminar-phase-3-batch-5-risk-hardening" --type change`
  Result: PASS
  Date: 2026-03-11
  Note: The completed risk-hardening change validates after recording implementation and verification evidence.
