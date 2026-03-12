# Design: laminar-v1-active-path-ownership

## Decisions

- The public CLI does not change.
- The active supported owner moves to `platforms/laminar/`.
- `run/execution/` remains only for compatibility re-exports and thin shared helpers.
- Retry, resume, locking, and artifact semantics stay local and unchanged.
