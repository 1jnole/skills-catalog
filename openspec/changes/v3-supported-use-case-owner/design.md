# Design

The supported use case remains Laminar-backed, but Laminar should provide platform behavior rather than own the orchestration loop. The implementation introduces an application-owned run use case in `scripts/evals/run/` with injected dependencies so characterization tests can cover skip/retry/persistence behavior without live Laminar or filesystem state.
