# Design: harden-skill-contract-forge-eval-coverage

## Design intent

Keep the hardened suite reviewable and deterministic:

- Trigger cases prove structural readiness, not just visible markers.
- Classification outputs cannot pass in contradictory combinations.
- Coverage expansion targets routing regressions that matter.
- Offline fixtures and docs match the hardened runtime truth.

## Key decisions

### Decision 1 — Trigger payloads use schema-backed JSON validation

**Decision:** Trigger cases SHALL use `contains-json` with a file-backed schema, not JSON presence alone.

**Rationale:** Visible markers and bare JSON validity are insufficient to prove a trigger response contains a usable Eval Brief.

**Alternative considered:** Keep trigger checks text-only or use `contains-json` without a schema.

**Why rejected:** It would still allow malformed or incomplete trigger payloads to pass.

---

### Decision 2 — Contradiction guards are mandatory

**Decision:** Each classification family SHALL include guards that reject incompatible classifications and trigger markers.

**Rationale:** Routing regressions often present as mixed outputs rather than fully missing outputs. Guards make those failures explicit.

**Alternative considered:** Rely on positive markers only.

**Why rejected:** Positive-only checks can allow incoherent outputs through.

---

### Decision 3 — Coverage stays small and high-signal

**Decision:** Add only a narrow set of boundary cases with clear regression value.

**Rationale:** The goal is to harden the suite, not maximize test count. High-signal cases improve reliability without inflating maintenance.

**Alternative considered:** Add many variants across all wording permutations.

**Why rejected:** It would increase brittleness and review noise with limited additional protection.

---

### Decision 4 — Offline fixtures are part of the runtime contract

**Decision:** Offline fixtures SHALL be regenerated or aligned as part of hardening, not deferred casually.

**Rationale:** The preferred repo gate is offline. If fixtures do not reflect hardened expectations, the primary gate becomes misleading.

**Alternative considered:** Leave fixtures for a later cleanup.

**Why rejected:** It would keep the preferred gate untrustworthy.

---

### Decision 5 — Documentation completion is explicit but bounded

**Decision:** Update only the docs that define or describe the supported hardened runtime path.

**Rationale:** The hardened contract must be visible to maintainers, but broad documentation cleanup would over-expand the slug.

**Alternative considered:** Rewrite all eval docs after hardening.

**Why rejected:** It adds scope without improving the immediate runtime contract.

## Implementation outline

1. Confirm dependency on migration closure and validate OpenSpec artifacts.
2. Stop for approval checkpoint before mutating runtime files because this slug changes tooling behavior.
3. Add a minimal Eval Brief schema file and wire it into trigger assertions.
4. Add contradiction guards and small high-signal boundary cases.
5. Regenerate or align fixtures with the hardened suite.
6. Update affected docs to describe the hardened runtime contract.
7. Run preferred gate and record evidence in `tasks.md`.

## Risks, trade-offs, and mitigation

### Risk: schema too narrow

**Trade-off:** stronger structure checks improve trust but can reduce future flexibility.

**Mitigation:** require only essential sections and basic types in this slug; reserve stricter constraints for later only if evidence shows they are needed.

### Risk: fixture regeneration blocked by environment

**Trade-off:** hardening is not complete if the preferred offline gate depends on stale fixtures.

**Mitigation:** if live regeneration is blocked, record the blockage explicitly and treat fixture alignment as an incomplete task rather than silently passing.

### Risk: too many negative assertions create noisy maintenance

**Trade-off:** contradiction guards add safety but can become repetitive.

**Mitigation:** add guards only for classification contradictions and trigger markers that materially affect routing semantics.

## Minimal-diff constraints

- No dependency changes.
- No CI workflow changes.
- No generator introduction.
- No rubric or model-graded evaluation.
- No broad repo refactor.

## Approval checkpoint summary template

Before `/prompts:openspec-apply` mutates runtime files, summarize:

- scope: schema-backed hardening, contradiction guards, boundary coverage, fixtures, affected docs;
- files expected to change;
- risks: schema rigidity, fixture drift, documentation mismatch;
- verification commands:
  - `openspec validate "harden-skill-contract-forge-eval-coverage" --type change`
  - `npm run promptfoo:validate`
  - `npm run promptfoo:run:offline`
  - `npm run promptfoo:run` (if allowed)
