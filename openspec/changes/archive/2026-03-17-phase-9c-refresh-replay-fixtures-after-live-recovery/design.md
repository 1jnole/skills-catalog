## Context

The repository already documents that offline replay is replay evidence rather than the source of truth for current behavior. After slug `9a`, the live contract and uplift-with-skill runs classify the ambiguous refactor and rewrite cases correctly, but the offline fixtures still contain older captured outputs. The remaining work is therefore evidence alignment, not semantic repair.

## Goals / Non-Goals

**Goals:**
- Refresh the two affected Promptfoo-native replay fixtures from confirmed live outputs.
- Keep fixture ordering aligned with the existing contract and uplift-with-skill suites.
- Verify that offline replay turns green after fixture refresh.

**Non-Goals:**
- Changing Promptfoo assertions, configs, prompts, or test case ordering.
- Editing the without-skill baseline fixtures in this slug.
- Treating offline replay as authority over live behavior.

## Decisions

### Refresh fixtures from generated live eval outputs

The fixture refresh will use the `response.output` values captured in the generated live eval JSON files for the contract and uplift-with-skill surfaces.

Rationale:
- This preserves the exact Promptfoo-native replay shape already supported by `--model-outputs`.
- It avoids hand-authoring or paraphrasing outputs.

Alternative considered:
- Editing only the failing array entries manually. Rejected because it is easier to drift ordering or formatting.

### Keep without-skill unchanged

This slug updates only the contract and uplift-with-skill fixtures.

Rationale:
- The confirmed drift is tied to the recovered skill-enabled behavior.
- Changing unrelated baseline fixtures would widen scope without need.

## Risks / Trade-offs

- [Risk] Fixture ordering could diverge from suite ordering. -> Mitigation: regenerate arrays from `results.results.map(r => r.response.output)` in the existing live eval order.
- [Risk] Live confirmation could be stale or unavailable. -> Mitigation: re-run the live commands before refreshing fixtures and block the refresh if live is not green.
- [Risk] Offline replay could still fail after fixture refresh due to suite or assertion drift. -> Mitigation: re-run both offline surfaces immediately and stop if replay still disagrees.

## Migration Plan

1. Create the OpenSpec artifacts for the fixture-refresh slug.
2. Re-run the live contract and uplift-with-skill commands.
3. If both are green, replace the two `model-outputs` fixture arrays with the captured live outputs.
4. Re-run the two offline replay commands.
5. Record evidence and note that this slug updates replay evidence, not semantics.

## Open Questions

- None for this slug. If live cannot be confirmed, the slug should stop without refreshing fixtures.
