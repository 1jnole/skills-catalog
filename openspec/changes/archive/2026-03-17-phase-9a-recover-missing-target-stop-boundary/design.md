## Context

`skill-contract-forge` already contains the intended semantic rule: existing-skill refactor and rewrite requests must identify the target skill. The current bug is not a missing architecture capability; it is a wording leak between the normative skill contract and the supportive references. In particular, the routing guide currently lists phrases like `refactor this skill` and `rewrite the skill` as trigger signals even though the maintained contract says those requests should stop and ask when no target is named.

The safest repair is a minimal contract-side change that removes those misleading signals and makes the anti-inference rule explicit. This slug deliberately avoids replay fixture refresh and live/offline governance updates so the change stays atomic.

## Goals / Non-Goals

**Goals:**
- Make the missing-target rule explicit in the normative skill contract.
- Align supportive references so they reinforce the same stop-and-ask boundary.
- Preserve the current Promptfoo-native topology and existing suite structure.

**Non-Goals:**
- Refreshing `--model-outputs` fixtures
- Updating the Eval Brief schema
- Changing Promptfoo suite files or introducing new runtime layers
- Documenting live/offline authority policy repo-wide

## Decisions

### Decision 1 — Fix the contract wording before touching replay evidence

The bug source is the contract and its examples, so this slug changes `SKILL.md` and references first. Refreshing fixtures before the wording is fixed would preserve the wrong behavior instead of correcting it.

Alternative considered:
- Update Promptfoo assertions first. Rejected because the assertions already encode the intended boundary and the current drift is in the skill-side guidance.

### Decision 2 — Treat deictic references as missing target, not weak identification

Phrases like `this skill`, `the current skill`, `rewrite this`, or `tighten the contract` do not identify a specific existing skill and must not be interpreted as `skill-contract-forge` or the current folder context.

Alternative considered:
- Allow local-context inference when the prompt is obviously about the current skill. Rejected because it weakens the contract and recreates the regression risk.

### Decision 3 — Remove misleading trigger examples from supportive docs

Supportive references should only show named-target examples on the `existing-skill-refactor` and `skill-rewrite` trigger paths. Ambiguous phrasing belongs in `stop-and-ask` examples or edge cases.

Alternative considered:
- Keep the existing examples and add a note below them. Rejected because the examples themselves currently teach the wrong boundary.

## Risks / Trade-offs

- [Risk] The wording change may be insufficient on its own to recover live behavior. -> Mitigation: keep this slug scoped to contract-side repair and let the later replay/live slug verify whether additional runtime-side changes are still needed.
- [Risk] Offline replay will likely stay red until snapshots are refreshed. -> Mitigation: record that expected mismatch explicitly in tasks and avoid treating it as a regression introduced by this slug.
- [Risk] Supportive references may drift again from `SKILL.md`. -> Mitigation: keep the wording parallel and remove contradictory examples rather than layering extra prose.
