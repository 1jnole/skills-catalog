# Design: laminar-phase-3-batch-5-legacy-retirement

## Context

The supported eval flow already executes through the Laminar boundary and Batch 4 proved parity on `skill-forge`. Even so, a few legacy-shaped source paths still remain near the supported flow:

- `scripts/evals/run-evals.ts` still imports the legacy-named command file
- `scripts/evals/run-iteration.ts` still looks like an active source entrypoint instead of explicit compatibility
- `run/artifacts/read-run-artifacts.ts` still exports a historical legacy reader beside the supported benchmark reader
- `run/artifacts/write-run-artifacts.ts` still owns an unused legacy artifact writer in the supported artifact folder
- `buildRunManifestArtifact()` still defaults to `platform: legacy-runner`, forcing Laminar reporting to override that legacy value after the fact

## Goals / Non-Goals

**Goals:**
- make `run-evals` the concrete supported command implementation in source
- keep `run-iteration` available only as compatibility routing to the supported implementation
- move historical legacy artifact helpers into an explicitly historical location
- make the active Laminar reporting path construct manifests without inheriting a legacy platform default
- preserve current external behavior for successful eval execution and retry semantics

**Non-Goals:**
- remove historical compatibility code entirely
- update public docs or Mermaid diagrams beyond Batch 5 evidence notes
- change benchmark scoring, retry rules, or provider behavior

## Decisions

### Decision: supported command ownership moves to `commands/run-evals.ts`
The repo should stop treating the legacy command filename as the source implementation for the supported command. A dedicated `commands/run-evals.ts` file becomes the supported owner, while `commands/run-iteration.ts` becomes a compatibility alias.

Alternative considered: rename files in place. Rejected because it would create a larger diff and unnecessary churn while compatibility still exists.

### Decision: historical helpers move under `run/historical/`
Legacy artifact readers or writers that are no longer used by the supported flow should live in an explicitly historical folder. This keeps historical compatibility available without implying those helpers belong to the active artifact path.

Alternative considered: leave helpers in `run/artifacts/` with comments. Rejected because the location would still imply active ownership.

### Decision: run manifest construction becomes platform-explicit
`buildRunManifestArtifact()` should require the caller to provide the platform instead of defaulting to `legacy-runner`. This removes the last legacy default from the active Laminar path and makes historical compatibility declare its own platform explicitly.

Alternative considered: keep the legacy default and continue overriding it in Laminar reporting. Rejected because the active path would still depend on legacy assumptions.

## Risks / Trade-offs

- Compatibility alias drift -> Keep `run-iteration` as a thin import-only shim to the supported command.
- Historical helper movement could break hidden imports -> Verify with `rg` before and after refactor, then run TypeScript.
- Stale generated `dist/` outputs may still contain old files -> Accept as generated residue for now; Batch 6 can decide whether to clean documentation and generated outputs more aggressively.

## Migration Plan

1. Add the supported `commands/run-evals.ts` implementation.
2. Turn `commands/run-iteration.ts` into a compatibility alias.
3. Move historical helpers into `run/historical/` and update callers.
4. Make run manifest building platform-explicit.
5. Run `npx tsc -p scripts/evals/tsconfig.json` and `openspec validate`.

## Open Questions

- None for Batch 5. Batch 4 parity evidence is already green, so this batch can stay implementation-focused.
