# Conventions for this skill

## Naming
- `<Feature>`: PascalCase feature name (e.g. `Tickets`, `Cart`, `Orders`).
- `<feature>`: feature folder name (prefer kebab-case).
- `<Feature>Store`: stable export name for the store.
- `<Feature>State`: state type name.
- Prefer literal union types over enums in `domain/`; use enums only when necessary.

## Feature-first layout (default)
Use this structure unless the repo has an explicit approved variant:

```txt
src/app/features/<feature>/
  domain/
    types/
    interfaces/
    enums/        # avoid when possible
  data-access/
    api/
    store/
    services/
    resolvers/
  pages/
  ui/
  utils/
  index.ts
```

## File placement
- Store file: `src/app/features/<feature>/data-access/store/<feature>.store.ts`
- API clients/adapters: `src/app/features/<feature>/data-access/api/*`
- Feature orchestration/services: `src/app/features/<feature>/data-access/services/*`
- Route resolvers: `src/app/features/<feature>/data-access/resolvers/*`
- Request-status feature should live in a shared location (e.g. `src/app/shared/store-features/request-status.feature.ts`).
- If the project uses Nx/libs, map the same layers to the equivalent library paths.

## Imports
- Ensure the import path used in `assets/store.template.ts` matches the actual file name.
- `domain/` stays pure TS (no Angular/Http/Router/store side-effects).
- `pages/` should call `data-access/services`, not `api/` or `store/` directly.
- `ui/` must not import `data-access/`.
- Cross-feature imports must use the feature public barrel (`features/<feature>/index.ts`), not deep internal paths.

## Concurrency defaults
- Reads: `switchMap` (cancel/replace on re-trigger).
- Writes: `exhaustMap` (ignore repeated triggers while a request is in flight).

Only deviate when requirements explicitly demand it.
