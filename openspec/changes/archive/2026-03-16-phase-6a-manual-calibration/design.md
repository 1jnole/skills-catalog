## Context

The repository currently has 11 canonical `skill-contract-forge` contract cases and 7 uplift cases. The Phase 6 plan recommends a 12-20 case sample, but the current supported suite is smaller than that.

## Decision 1 - Audit the full canonical sample first

**Decision:** Use the full current canonical sample as the Phase 6A audit set instead of inventing synthetic extra prompts just to hit a target count.

**Rationale:**
- the current suite is still small enough to review manually
- auditing the whole supported sample is more honest than padding the set
- the resulting findings stay directly tied to the active gate and uplift surfaces

**Tradeoff:** The first audit sample is slightly smaller than the plan's recommended range, but it is still representative of the current production-shaped coverage.

## Decision 2 - Keep Phase 6A source-only

**Decision:** Store only tracked source artifacts for the audit sample and the audit note. Do not add new package scripts or commit generated Promptfoo outputs.

**Rationale:**
- Phase 6A is about calibration evidence, not runtime topology
- keeping generated files out of version control avoids noisy diffs
- existing `npx promptfoo eval ... --model-outputs ...` commands are enough for repeatable evidence

## Decision 3 - Separate observed results from judgment

**Decision:** The audit note should show both:
- the observed contract/uplift result per case
- the human judgment bucket: `correct`, `incorrect`, or `dudoso`

**Rationale:**
- this keeps the manual review explicit instead of hiding it behind raw scores
- it makes the Phase 6B expansion criteria easier to derive from real patterns
