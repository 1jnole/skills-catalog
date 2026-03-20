## Context

The contract gate now carries the full routing burden for `skill-eval-forge`. This second slug should not restate that whole gate. Instead, it should keep only the highest-signal comparative checks in `uplift.with-skill` and make `uplift.without-skill` more clearly baseline-shaped.

## Goals / Non-Goals

**Goals:**
- Keep `uplift.with-skill` lighter than `contract.yaml`.
- Preserve strong comparative coverage for trigger routing, stop-boundary, and terminal marker behavior.
- Make `without_skill` resistant to authority, terminal-marker, and workflow impersonation.
- Keep the diff limited to one permanent spec and two test files.

**Non-Goals:**
- Do not edit the contract gate in this slug.
- Do not add providers, fixtures, replay, generated report policy, or npm surface changes.
- Do not introduce a shared abstraction across forge families.

## Decisions

### `uplift.with-skill` is comparative, not contractual

The with-skill suite will keep a small set of cases:
- one clear trigger path
- one clear refactor path
- one non-trigger precedence case
- one stop-and-ask inspectable-authority case
- one mixed-phase stop-and-ask case
- one response-boundary case

This keeps the family useful without re-implementing the contract gate.

### `uplift.without-skill` must remain informational

The baseline will be judged on what it avoids as much as on what it says:
- it should acknowledge missing concrete references
- it should ask the user to share inspectable material
- it should avoid `Skill eval ready`
- it should avoid repo-local authority framing such as `approved contract artifact`, `existing implementation`, or `active eval context`
- it should avoid repo-shaped procedural language and paraphrased workflow framing

## Risks / Trade-offs

- [Risk] A smaller comparative suite could miss a contract regression. -> Mitigation: the contract gate remains the authoritative boundary gate after slug 1.
- [Risk] Baseline assertions could become brittle if they ban too much ordinary guidance. -> Mitigation: keep positive assertions focused on acknowledging missing inspectable references and asking for concrete material, while negative assertions target only skill-owned or repo-shaped phrasing.

## Migration Plan

This is a spec-and-suite hardening change only. No runtime migration or generated artifact migration is required for this slug.
