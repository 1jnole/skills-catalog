# Proposal: laminar-phase-3-batch-0-readiness

## Summary

Open the first implementation-facing Phase 3 change as a readiness batch. This batch does not integrate Laminar yet. It freezes the decisions that must be explicit before any Laminar code, dependency, or CLI wiring is introduced.

## Why

The revised Phase 3 contract in `PLAN.md` and `roadmap2/` already defines the target architecture and the open edge cases. What is still missing is an approved, implementation-ready readiness batch that turns those agreements into explicit defaults for:

- Laminar SDK or dependency strategy
- local retry or resume semantics after Laminar activation
- fail-fast order before `iteration-N`
- parity policy for transient operational noise

Without this readiness batch, Phase 3 implementation would still depend on implicit decisions.

## Scope

This change defines and closes Batch 0 only:

- confirm the Laminar integration mechanism
- confirm the dependency strategy
- confirm the local retry or resume contract
- confirm the fail-fast order
- confirm the parity verification policy

This change does not:

- add Laminar dependencies
- create `platforms/laminar/` modules
- route `run-evals` through Laminar
- change the supported execution path

## Affected Artifacts

- `openspec/changes/laminar-phase-3-batch-0-readiness/`
- `roadmap2/`

## Specs

- `laminar-phase-3-readiness`: Defines the explicit readiness decisions that must be closed before Phase 3 implementation starts.
