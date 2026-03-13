# Fase 2: Core Inventory

## Purpose
This document makes the surviving core of `scripts/evals/` explicit, so the repo can distinguish between:
- portable core,
- structural seams introduced during migration,
- transitional engine-specific pieces,
- and the still-inherited physical layout.

It is an inventory document, not a target architecture.

## Portable core

These areas are the local source of truth that should survive engine and layout changes:

### Eval contracts
- `domain/eval-case/`
- `domain/eval-definition/`

These define the current eval case contract, stop conditions, trigger semantics, and the baseline shape the repo already relies on.

### Run-result semantics
- `domain/run-results/`

This area owns the canonical local result semantics:
- normalized mode results,
- run manifest shape,
- benchmark artifact shape,
- artifact status and error semantics.

### Benchmark
- `domain/benchmark/`

This is portable domain logic:
- comparison,
- deltas,
- pass-rate semantics,
- improvement summary,
- benchmark artifact construction.

### Grading
- `domain/grading/`

This is also part of the portable core:
- case scoring,
- deterministic assertion evaluation,
- errored-case grading semantics.

### Baseline
The supported baseline remains:
- `with_skill`
- `without_skill`

`previous-skill` is still outside the immediate migration scope and is not part of the current surviving core.

## Structural seams introduced by the migration

These pieces are important and should survive, even if their final location may later change:

### Path authority
- `infrastructure/filesystem/eval-paths.ts`
- `infrastructure/filesystem/read-skill-prompt.ts`

These are structural seams, not business logic. They decouple runtime-critical resolution from scattered hardcodes.

### Supported CLI surface
- `cli/read-evals.ts`
- `cli/run-evals.ts`
- `cli/run-evals.args.ts`

These are the supported local command surface, but they are not the portable business core.

## Supported but transitional orchestration

These pieces still matter and should be preserved for now, but they are not the deepest portable core:

### Iteration orchestration
- `application/run-eval-iteration/`
- `application/load-eval-definition/`

They survive because they coordinate the supported local flow:
- definition loading,
- iteration retry behavior,
- progress persistence,
- manifest and benchmark writes.

They may later be split further once the final scaffold and engine boundary are clearer.

### Filesystem iteration support
- `infrastructure/filesystem/eval-runs/`

This remains supported while `--iteration` and `--retry-errors` remain part of the local contract.

### Current Laminar adapter
- `infrastructure/laminar/execute-mode.ts`
- `infrastructure/laminar/executor.ts`
- `infrastructure/laminar/prompt-builder.ts`
- `infrastructure/laminar/evaluators-adapter.ts`
- `infrastructure/laminar/report.ts`

These are intentionally treated as the current engine adapter:
- they are important,
- they are still supported,
- but they are more replaceable than the domain core.

## Transitional or inherited concerns

These are still real parts of the repo, but they should not be confused with the portable core:

### Inherited physical layout
The repo still physically uses:

```text
packs/core/<skill-name>/
  SKILL.md
  evals/
    evals.json
    files/
    runs/
```

That layout is still inherited and supported, but it is no longer supposed to be the only authority for resolution.

### Live engine metadata
Provider and model metadata may still appear in execution artifacts as optional technical metadata.

That metadata is not the semantic core of:
- benchmark meaning,
- grading meaning,
- normalized result meaning,
- or eval contract meaning.

## Already retired from the active core

These are no longer part of the supported or surviving structure:
- legacy CLI aliases
- `commands/*`
- root source entrypoints like old `run-evals.ts` / `read-evals.ts`
- compatibility wrappers
- standalone provider wrapper under `infrastructure/providers/openai/`
- Laminar modules that had no real consumption, such as the removed dataset adapter

## Practical reading of the inventory

If a future change touches:

### Portable core
Expect stronger protection and higher migration value:
- `domain/eval-case/`
- `domain/eval-definition/`
- `domain/run-results/`
- `domain/benchmark/`
- `domain/grading/`

### Structural seams
Expect careful review because these enable future layout and engine changes:
- `infrastructure/filesystem/eval-paths.ts`
- `infrastructure/filesystem/read-skill-prompt.ts`

### Transitional supported flow
Expect support to remain, but not necessarily in the same final shape:
- `application/*`
- `infrastructure/filesystem/eval-runs/*`
- `infrastructure/laminar/*`
- `cli/*`

## Phase 2 outcome

This inventory closes the "surviving core" part of Phase 2 by making it explicit that the repo now has:
- a portable domain core,
- a path seam,
- a supported local orchestration path,
- a replaceable engine adapter,
- and an inherited layout that remains current but no longer defines the system by itself.
