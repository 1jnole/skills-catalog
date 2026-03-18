## Context

The repository already exposes three distinct Promptfoo-native surfaces: config validation, offline replay via fixtures, and live evaluation against the active provider. The runtime shape is correct, but the operational meaning of each surface is spread across multiple docs, and `openspec/AGENTS.override.md` still names `promptfoo:run:offline` as the preferred gate without an explicit tie-break rule when it diverges from live behavior.

## Goals / Non-Goals

**Goals:**
- Make the runtime authority rule explicit and consistent in all touched docs.
- Keep the policy Promptfoo-native and repo-light.
- Preserve the existing command surface and workflow split.

**Non-Goals:**
- Changing Promptfoo configuration, scripts, providers, fixtures, or suite topology.
- Reframing offline replay as a stronger identity or correlation mechanism than the documented Promptfoo surface provides.
- Refreshing snapshots or changing semantic boundaries covered by slug `9a`.

## Decisions

### Document `validate`, `offline replay`, and `live` as separate roles

The docs will distinguish:
- `validate` as structural/config validation
- `offline replay` as preferred low-cost smoke/replay
- `live` as semantic authority on disagreement

Rationale:
- This matches the current runtime shape without introducing new mechanisms.
- It prevents teams from treating replay snapshots as the source of truth for current behavior.

Alternative considered:
- Leaving `promptfoo:run:offline` as the only documented gate. Rejected because it hides the conflict-resolution rule that already matters operationally.

### Keep `without_skill` explicitly informational

The docs will continue to describe `without_skill` as a baseline for comparison rather than a contractual gate.

Rationale:
- The existing suites and assertions are already split that way.
- Repeating the rule in all touched docs reduces future drift.

Alternative considered:
- Describing `without_skill` as a fallback authority surface. Rejected because it contradicts current suite intent.

## Risks / Trade-offs

- [Risk] Readers may misread “preferred offline path” as “authoritative path” if the wording is too compressed. -> Mitigation: state the tie-break rule in each touched doc.
- [Risk] Updating `openspec/AGENTS.override.md` could appear to weaken the preferred gate. -> Mitigation: keep offline as the preferred cheap gate and add only the explicit live-on-conflict rule.
- [Risk] This slug could drift into fixture or runtime changes. -> Mitigation: keep all edits documentation-only and leave replay alignment to slug `9c`.

## Migration Plan

1. Add OpenSpec artifacts and runtime spec delta for the authority rule.
2. Update the three docs to use the same operational language.
3. Validate the change artifacts and Promptfoo configs.
4. Record evidence and note that no runtime or fixture behavior changed in this slug.

## Open Questions

- None for this slug. The authority rule is a documentation alignment change built on the existing runtime shape.
