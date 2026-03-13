# Eval Runtime -- Scaffold and Placement Rules

> Complements: `08-v3-context-map.md`, `10-v3-service-boundaries-audit.md`, `11-v3-refactor-roadmap.md`

## Purpose

This document defines the target scaffold for `scripts/evals/` and the placement rules that future refactors MUST follow.

Use it when deciding:
- where a new file belongs
- whether a type or schema should become shared
- whether a module is domain, application, infrastructure, or compatibility
- whether a new folder name expresses real ownership clearly enough

## Main rule

The eval runtime MUST be readable through explicit architectural ownership.

That means:
- `commands/` for CLI entrypoints
- `application/` for supported use cases and coordination
- `domain/<subdomain>/` for business concepts, contracts, and pure behavior
- `infrastructure/` for Laminar, providers, and filesystem
- `compatibility/` for shims and historical support only
- `shared/` only for tiny technical helpers that are genuinely cross-cutting

## Target scaffold

```text
scripts/evals/
  commands/
  application/
    load-eval-definition/
    run-eval-iteration/
  domain/
    eval-case/
    eval-definition/
    grading/
    benchmark/
    run-results/
  infrastructure/
    filesystem/
      eval-runs/
    laminar/
    providers/
      openai/
  compatibility/
    commands/
    run-execution/
    historical-artifacts/
  shared/
    cli/
    json/
```

## Naming rules

- Folder names must describe ownership, not implementation style.
- Prefer `application`, `domain`, `infrastructure`, and `compatibility` over vague technical buckets.
- Inside `domain/`, use subdomain names such as `eval-case`, `eval-definition`, `grading`, `benchmark`, and `run-results`.
- File names should describe either a domain concept or a concrete action.
- Use verbs for actions: `execute-*`, `load-*`, `read-*`, `write-*`, `resolve-*`, `normalize-*`.
- Use nouns for stable concepts: `eval-case`, `eval-definition`, `benchmark`, `run-result`.
- Do not create `utils`, `helpers`, or `misc` folders.
- Do not create `index.ts` barrels.
- Keep imports direct to the file that owns the symbol.

## Domain placement rules

`domain/` is not only for `types` and `schemas`.

`domain/` owns:
- domain contracts and invariants
- Zod schemas that define runtime domain contracts
- shared domain types derived from those contracts
- pure business behavior such as grading, benchmark aggregation, and result normalization

`domain/` must not own:
- CLI parsing
- filesystem paths, locks, or file writes
- Laminar SDK concerns
- provider SDK concerns
- logging/orchestration loops
- compatibility aliases

### Subdomain-local contracts

Global folders such as `domain/types/`, `domain/schemas/`, and `domain/services/` are not the target shape.

Instead, each subdomain owns its own files:
- `domain/eval-case/eval-case.schema.ts`
- `domain/eval-case/eval-case.types.ts`
- `domain/benchmark/benchmark.ts`
- `domain/benchmark/benchmark.types.ts`

### Types rule

- A `*.types.ts` file should exist only when the types are shared by more than one file or more than one context.
- If a type is private to a single module, keep it local to that module.
- If a type can be inferred from a canonical Zod schema, prefer the inferred type over a separate handwritten duplicate.

### Schemas rule

- A `*.schema.ts` file belongs in the subdomain that owns the runtime contract.
- Schemas that only validate CLI or technical adapter input do not belong in `domain/`; they belong next to the application or infrastructure concern they validate.

## Application placement rules

`application/` owns supported use cases and sequencing.

`application/` may:
- coordinate domain behavior
- load eval definitions into the supported flow
- orchestrate one full eval run
- decide which infrastructure adapter to call

`application/` must not:
- define grading semantics
- define benchmark semantics
- define provider-specific behavior
- redefine Laminar translation rules

The initial target modules are:
- `application/load-eval-definition/`
- `application/run-eval-iteration/`

## Infrastructure placement rules

`infrastructure/` owns technical integration details.

`infrastructure/laminar/` owns:
- execution against Laminar
- prompt and dataset translation for Laminar
- Laminar readiness and reporting glue

`infrastructure/providers/` owns:
- model-provider integration details
- provider-specific prompt or SDK access

`infrastructure/filesystem/eval-runs/` owns:
- iteration workspace resolution
- supported artifact reads and writes
- lock files and progress persistence

Infrastructure may depend on application and domain contracts, but it must not redefine domain semantics.

## Compatibility placement rules

`compatibility/` is the only allowed home for:
- historical helpers
- import-path shims
- command aliases kept only to avoid abrupt breakage
- wrappers that exist solely during migration

Anything under `compatibility/` must be clearly non-authoritative for the supported path.

## Root-level rules

At the end of the scaffold migration, the root of `scripts/evals/` should contain only:
- stable docs such as `README.md`
- `tsconfig.json`
- build or command wrappers that are still required as entrypoints

No new domain, application, infrastructure, or compatibility module should be added directly at the first level.

## Tangible implementation tasks

1. Create this scaffold document and make it the naming and placement reference for all future refactors.
2. Update `scripts/evals/README.md` so it describes the target scaffold rather than the transitional tree.
3. Update `plans/README.md` so the scaffold document becomes part of the architectural reading order.
4. Move domain code from global `types/`, `schemas/`, and `services/` buckets into explicit subdomains in the next slug.
5. Move `run/` responsibilities into `application/`, `infrastructure/filesystem/`, or `compatibility/` in later slugs.
6. Rename `platforms/` to `infrastructure/laminar/` and `providers/` to `infrastructure/providers/` in later slugs.
7. Remove remaining ambiguous folders only after supported-path ownership is already explicit.

## Adoption rule

Future non-trivial refactors in `scripts/evals/` should follow this order:
1. characterize behavior
2. move ownership to the correct scaffold location
3. keep imports direct and explicit
4. remove transitional aliases only after callers are updated

## Success criteria

The scaffold is considered established when all of this is true:
- a new contributor can place a new module without guessing
- the folder name itself explains the responsibility
- no new file needs a generic `service`, `helper`, or `utils` bucket
- `domain/` reads as business language, not as a storage area for detached types
