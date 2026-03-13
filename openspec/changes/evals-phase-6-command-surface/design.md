# Design: evals-phase-6-command-surface

## Context

The current repo has two conflicting public command stories. The inherited `run-evals` and `read-evals` surface still points at `packs/core/<skill>/evals/evals.json`, while the actual supported `skill-forge` flow runs through the Promptfoo adapter and `evals/cases/<skill>/suite.v1.json`. Fase 6 should collapse that split without reopening benchmark or scorer design.

## Goals / Non-Goals

**Goals:**
- make `run-evals` the final supported command for the new scaffold
- make `read-evals --skill-name` default to the canonical new-scaffold suite
- remove the transitional `run-promptfoo-pilot` name from `package.json`
- rename user-facing generated artifact filenames so they describe the final flow instead of the Phase 4 pilot

**Non-Goals:**
- removing all historical Laminar source files in this change
- redesigning the Promptfoo adapter internals beyond what the new command surface requires
- adding a second engine or changing benchmark semantics

## Decisions

### Decision: keep `run-evals` as the final public command

The repository already has `run-evals` as the familiar public command. Instead of inventing a third public name, Phase 6 will make `run-evals` execute the Promptfoo-based supported flow and retire `run-promptfoo-pilot` from the public script surface.

Alternative considered: keep `run-promptfoo-pilot` as the supported command.
Rejected because the command name is explicitly historical and leaks a migration phase into the final operational surface.

### Decision: keep `run-promptfoo-pilot` as a deprecated alias at source level

The alias can remain in source temporarily with a deprecation warning so direct invocations fail less abruptly, but it will no longer appear in `package.json` or active docs.

Alternative considered: delete the alias immediately.
Rejected because a small compatibility shim is lower-risk and still satisfies the phase goal once it stops being publicly supported.

### Decision: resolve supported suites through dedicated new-scaffold defaults

The final command surface should not depend on the inherited `packs/core/<skill>/evals/evals.json` defaults. Instead, the new supported resolver defaults will point to `evals/cases/<skill>/suite.v1.json`, while skill prompt resolution can continue to use the skill source-of-truth location.

Alternative considered: globally change every eval-path helper to use the new scaffold for all historical code.
Rejected because it would expand the blast radius into historical Laminar internals that are no longer part of the supported path.

## Risks / Trade-offs

- [Risk] Historical users may still call `run-promptfoo-pilot`. → Mitigation: keep a deprecation alias in source with a clear warning.
- [Risk] Retired flags like `--iteration` or `--retry-errors` may still be used by habit. → Mitigation: reject them explicitly with a deprecation error in the new parser.
- [Risk] Mixed output filenames could confuse maintainers. → Mitigation: remove `pilot` from the default generated artifact names as part of the same change.

## Migration Plan

1. Add the final `run-evals` argument surface for the Promptfoo flow.
2. Refactor the shared Promptfoo execution path so both `run-evals` and the deprecated alias use the same implementation.
3. Update default suite resolution and generated output filenames.
4. Remove the alias from `package.json` and update tests.

## Open Questions

- None. The supported suite path and command direction are already established by Fase 5.
