# Proposal: laminar-phase-3-batch-4-skill-forge-parity

## Why

Batch 3 closed the active Laminar reporting path and preserved the local artifact contract. The next step is to prove that the Laminar path preserves the accepted `skill-forge` benchmark behavior before any legacy retirement work begins.

Without Batch 4, Phase 3 still lacks the functional evidence required to say that Laminar is a valid supported replacement for the previous path.

## What Changes

This change defines Batch 4 of Phase 3:

- install and prepare the Laminar SDK required by the active path
- execute a fresh `skill-forge` iteration through the Laminar path
- verify `overall_passed: true`
- verify `with_skill > without_skill`
- verify trigger / non-trigger / stop-and-ask alignment
- verify local `--iteration` and `--retry-errors` on the green Laminar iteration
- apply the approved parity policy for transient `timeout` and `execution_error` noise

This change does not:

- retire legacy modules
- broaden the public CLI contract
- change benchmark semantics

## Scope

- `packs/core/skill-forge/evals/runs/`

- `openspec/changes/laminar-phase-3-batch-4-skill-forge-parity/`

## Specs

- `laminar-skill-forge-parity`: Defines the parity evidence required before legacy retirement can begin.


