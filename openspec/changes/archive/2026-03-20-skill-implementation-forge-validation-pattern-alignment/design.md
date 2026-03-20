## Design

This change is a boundary-hardening pass for the implementation phase only.

### Scope

- Clarify the permanent `skill-implementation-forge` spec.
- Align the skill instructions to the same validation pattern.
- Tighten only the Promptfoo contract suite for this phase.

### Non-goals

- No changes to `uplift.yaml` or `uplift.without-skill.yaml`
- No changes to providers, fixtures, generated outputs, or package scripts
- No runtime or shared-infrastructure work

### Implementation notes

- Keep the package semantics implementation-from-contract only.
- Treat inspectable authority as exact repo-local path, `file://` reference, or another uniquely resolvable artifact.
- Preserve the rule that `Skill implementation ready` is exclusive to valid trigger-path completion.
- Keep `non-trigger` for requests whose primary job is not implementation-from-contract.
- Use `stop-and-ask` only when the core job is still implementation but a material precondition is missing or the request widens inseparably.
