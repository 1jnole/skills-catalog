# Phase 3 Plan Alignment

This file compares the revised Phase 3 contract against the current repo state and identifies what must be prepared before implementation.

| Phase 3 requirement from `PLAN.md` | Current repo state | Gap to close | Future batch |
|---|---|---|---|
| `platforms/laminar/` is the concrete implementation | Only a README exists under `scripts/evals/platforms/laminar/` | Create the actual Laminar boundary modules | Batch 1 |
| Keep only `dataset-adapter`, `executor`, `evaluators-adapter`, `report` | None of these modules exist | Define the shape and responsibilities of each module | Batch 1 |
| Keep AI SDK in the executor | AI SDK is still called directly from the legacy execution path | Move model execution behind the Laminar executor boundary | Batch 1-2 |
| Execute `with_skill` and `without_skill` from Laminar | Both modes still run through the legacy execution path | Route both modes through the Laminar path | Batch 2 |
| Fail early on `LMNR_PROJECT_API_KEY` and `OPENAI_API_KEY` | Only `OPENAI_API_KEY` is validated today | Add Laminar credential checks before iteration creation | Batch 2 |
| Keep only `benchmark.json` and `run.json` as supported artifacts | This already holds for new iterations | Preserve it through the Laminar path | Batch 3 |
| `run.json` stays neutral | `run.json` is neutral, but still marks `platform: legacy-runner` | Update only the platform identity without contaminating the schema | Batch 3 |
| `skill-forge` must maintain parity | Phase 2 parity is green on `iteration-7` | Re-prove parity through the Laminar path | Batch 4 |
| Legacy runner leaves the supported flow | `run-evals` still enters the legacy runner | Remove supported dependence on the old execution path | Batch 5 |
| Docs and Mermaid reflect Laminar as active path | Docs still describe Laminar as a boundary, not the active path | Update docs after the implementation and parity proof | Batch 6 |

## Coverage Check

The revised Phase 3 contract is fully covered if all of the following are true:

1. Every row in the table is assigned to a batch.
2. No batch assumes an undeclared CLI or contract change.
3. No batch delegates benchmark semantics to Laminar.
4. Legacy retirement is sequenced after parity, not before.

## Remaining Decisions Already Closed

- `--group-name` is excluded from Phase 3.
- Retry and resume stay local.
- OpenAI remains the provider in this phase.
- The parity policy allows one extra fresh run after a transient operational error.
