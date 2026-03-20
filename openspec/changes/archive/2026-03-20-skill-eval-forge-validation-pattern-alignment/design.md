## Context

`skill-eval-forge` already describes the eval-authoring phase, but its permanent spec does not yet encode the routing and authority rules that its current contract suite is already exercising. This slug is intentionally small: it updates the permanent skill boundary and the contract gate without widening into uplift or runtime work.

## Goals / Non-Goals

**Goals:**
- Make `skill-eval-forge` use the same validation rigor as the other forge skills.
- Define a deterministic precedence rule between `non-trigger` and `stop-and-ask`.
- Define inspectable authority in operational terms rather than conversational terms.
- Keep the implementation diff limited to the permanent spec, the skill, and the contract gate.

**Non-Goals:**
- Do not change `uplift.yaml` or `uplift.without-skill.yaml`.
- Do not add offline replay, provider changes, fixture changes, or generated report maintenance.
- Do not make `skill-eval-forge` adopt the output envelope of `skill-contract-forge`.

## Decisions

### Preserve the forge validation pattern without copying the contract-skill envelope
`skill-eval-forge` will inherit the same style of closure used by the forge family: explicit authority, explicit routing, explicit terminal marker, and explicit negative cases. It will not adopt `Classification:` or `Workflow:` headers because those belong to `skill-contract-forge`'s own contract.

### Route by core job first
The routing rule will be documented as:
- use `non-trigger` when the main job is no longer eval authoring for a named skill
- use `stop-and-ask` when the main job is still eval authoring but material authority is missing or the request widens in a separable way

### Define inspectable authority narrowly
An authority is inspectable only when it is concretely resolvable by the agent, such as an exact repo-local path, a `file://` reference, or a uniquely named artifact that can be opened without interpretive searching. Conversational references like "the contract we discussed" remain insufficient.

## Risks / Trade-offs

- [Risk] The contract suite could become over-specific to current wording. -> Mitigation: keep assertions semantic and focused on routing, authority, and terminal markers.
- [Risk] The skill could drift toward `skill-contract-forge`'s response shape. -> Mitigation: add an explicit no-envelope-drift guardrail in both the spec and the skill.
- [Risk] Mixed-phase cases could still route inconsistently. -> Mitigation: encode precedence directly in the permanent spec and reinforce it in the contract suite.

## Migration Plan

This is a documentation-and-tests alignment change inside an existing capability. No data migration or rollout sequencing is required. Rollback is a straightforward revert of the three product files plus this change record.

## Open Questions

None for this slug. Uplift hardening remains deferred to the next slug.
