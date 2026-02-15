# Architecture (Angular) — Feature-first + DDD-lite

<!-- ANGULAR_ARCH:START -->
## Purpose
Make work deterministic for agents: clear boundaries, small changes, no invented contracts.

## Folder layout
```txt
src/app/
  core/                 # cross-cutting infra + app shell (layout, interceptors, config/tokens)
  shared/               # reusable UI + utils (must not depend on features)
  features/
    <feature>/
      domain/
        types/          # TS pure domain aliases/value types
        interfaces/     # TS contracts for domain entities/ports
        enums/          # avoid whenever possible; prefer union literal types
      data-access/
        api/            # HTTP clients/adapters
        store/          # feature state (signals/store)
        services/       # orchestration/use-cases for pages
        resolvers/      # route data preload resolvers
      pages/            # smart routed containers (router + data-access services). NO direct HTTP
      ui/               # presentational components (inputs/outputs). NO store/api
      utils/            # feature helpers
```

## Dependency rules (hard)
- `domain/` is **pure TS**: no Angular/Http/Router/store side-effects.
- `ui/` must **not** import `data-access/` (presentational only).
- `pages/` must call **data-access services**, not `api/` or `store/` directly.
- `shared/` must **not** import from `features/`.

## State
- Store per feature + Services per feature.
- Pages consume Services only.
- Minimum state shape:
  - `status` (`idle|loading|success|error`)
  - `error`
  - `data`
  - explicit methods (`load`, `refresh`, etc.)

## Signals-first
Prefer `signals/computed` for UI state & view-models. Use RxJS only for real stream/cancellation needs.

## External contracts (API)
Never invent endpoints/headers/payloads.
- Source: README + OpenSpec specs/deltas.
- Where to document:
  - `openspec/specs/**` (current)
  - `openspec/changes/**/specs/**` (delta)

## Zoneless
Only enable if required by README/project decision. If enabled, document exact setup in `openspec/project.md` and keep tests consistent.

## Styling
Tokens + BEM rules live in `docs/STYLING.md` (this file stays short by design).

## Placement rules
- Pages: `src/app/features/<feature>/pages/*`
- UI: `src/app/features/<feature>/ui/*`
- Data-access API: `src/app/features/<feature>/data-access/api/*`
- Data-access store: `src/app/features/<feature>/data-access/store/*`
- Data-access services: `src/app/features/<feature>/data-access/services/*`
- Data-access resolvers: `src/app/features/<feature>/data-access/resolvers/*`
- Domain types: `src/app/features/<feature>/domain/types/*`
- Domain interfaces: `src/app/features/<feature>/domain/interfaces/*`
- Domain enums: `src/app/features/<feature>/domain/enums/*` (avoid when possible)
- Shared UI: `src/app/shared/ui/*`
- Shared utils: `src/app/shared/utils/*`
- Core infra: `src/app/core/*`
<!-- ANGULAR_ARCH:END -->

## Project-specific notes
- (Add any repo-specific deviations here, explicitly justified.)
