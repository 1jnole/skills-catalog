## Why

`skill-contract-forge` already teaches downstream phases to preserve durable examples, templates, and reference material through package shape, but the approved Eval Brief still has no explicit handoff surface for source-backed support material that materially sharpens routing, blockers, or eval intent. That gap creates two failure modes:
- dense example tables and edge-case catalogs get stuffed into the main brief body, making the contract noisy
- useful source-backed support material is omitted entirely, leaving downstream implementation or eval authoring to rediscover it from transient context

## What Changes

- Add optional trigger-path `supportArtifacts` to the Eval Brief contract for source-backed, high-signal support material only.
- Keep `supportArtifacts` lean and shallow: omit it by default, disallow empty arrays, and restrict artifact paths to one-level-deep `references/` or `assets/` files.
- Require `authoring.packageShape.supportFolders` to stay aligned with any declared support-artifact paths.
- Update the maintained `skill-contract-forge` contract docs, edge-case guidance, Eval Brief schema, Promptfoo coverage, and maintained fixtures to reflect the new handoff surface.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `skill-contract-forge`: trigger briefs may freeze optional source-backed support artifacts when they materially improve the contract handoff.
- `skill-contract-forge-brief-boundary-neutrality`: `supportArtifacts` stays engine-neutral and contract-only.
- `skill-contract-forge-packaging-alignment`: support artifacts stay shallow, explicit, and routed only through `references/` or `assets/`.
- `skill-contract-forge-eval-coverage-hardening`: Promptfoo coverage rejects empty, invented, decorative, or package-shape-inconsistent support artifacts.

## Impact

- Affected code: `packs/core/skill-contract-forge/`, `evals/contracts/skill-contract-forge/`, and `evals/engines/promptfoo/skill-contract-forge/`.
- Affected interface: trigger-path Eval Briefs may now emit optional top-level `supportArtifacts`.
- Out of scope: changes to `skill-implementation-forge`, `skill-eval-forge`, new runtime surfaces, or support-artifact destinations outside `references/` and `assets/`.
