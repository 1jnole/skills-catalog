# Proposal: laminar-v1-skill-forge-parity-recovery

## Why

The active Laminar path was close to parity, but `skill-forge` still failed the v1 gate on `runtime-harness-implementation` and then exposed wording instability on a trigger case.

## What Changes

- diagnose the failing skill outputs without adding new supported artifacts
- harden `skill-forge` wording for runtime-only non-trigger responses
- harden trigger wording so the contract-first golden cases remain stable
- re-run the fresh parity gate and the local retry contract

## Impact

- `packs/core/skill-forge/SKILL.md`
- `packs/core/skill-forge/evals/runs/`
