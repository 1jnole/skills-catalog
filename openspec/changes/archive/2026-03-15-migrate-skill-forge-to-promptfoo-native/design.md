# Design: migrate-skill-forge-to-promptfoo-native

## Design intent

Keep the diff minimal while closing the migration cleanly:

- Promptfoo becomes the only supported pass/fail authority.
- The legacy central grader is removed from the supported runtime path.
- Runtime expectations become visible in Promptfoo test files.
- Documentation is cleaned only where it materially affects runtime authority.

## Key decisions

### Decision 1 — Promptfoo is the only pass/fail authority

**Decision:** The supported runtime SHALL derive pass/fail directly from Promptfoo-native assertions.

**Rationale:** The current central grader returns `pass: true` and masks real failures. Pass/fail must be auditable from Promptfoo config and test files.

**Alternative considered:** Keep a thin adapter grader above Promptfoo.

**Why rejected:** It preserves the split-authority problem and recreates the same maintenance risk.

---

### Decision 2 — `evals/engines/promptfoo/tests/skill-forge.yaml` is the runtime suite authority

**Decision:** This slug SHALL treat `evals/engines/promptfoo/tests/skill-forge.yaml` as the canonical runtime suite.

**Rationale:** The migration target is Promptfoo-native execution. Runtime truth should therefore live in the runtime test file, not in a duplicated authoring artifact.

**Alternative considered:** Maintain parity manually between YAML and `suite.v1.json`.

**Why rejected:** It keeps two sources of truth during a migration slug and raises drift risk.

---

### Decision 3 — Deterministic assertions first

**Decision:** Use documented deterministic Promptfoo assertions (`starts-with`, `icontains`, `icontains-any`, `not-icontains`, `regex`) before any `javascript` assertion.

**Rationale:** Deterministic assertions are transparent, easier to review, and explicitly recommended by Promptfoo for agent-authored evals when sufficient.

**Alternative considered:** Recreate the legacy grader logic in `javascript` assertions.

**Why rejected:** It preserves opaque grading behavior and fails the minimal-diff migration goal.

---

### Decision 4 — Documentation cleanup stays minimal

**Decision:** Update only docs that actively misstate supported runtime truth.

**Rationale:** The slug should remain atomic. Broad doc cleanup creates review noise and scope creep.

**Alternative considered:** Rewrite all eval documentation now.

**Why rejected:** It mixes migration closure with documentation normalization and delays the runtime fix.

## Implementation outline

1. Complete OpenSpec artifacts and validate the change.
2. Stop for approval checkpoint before mutating runtime files because this slug changes tooling behavior.
3. Remove legacy central grader wiring from Promptfoo config.
4. Move case expectations into Promptfoo-native per-case assertions.
5. Apply minimum documentation cleanup.
6. Run the preferred gate and record evidence in `tasks.md`.

## Risks, trade-offs, and mitigation

### Risk: deterministic assertions are less precise than the old helper logic

**Trade-off:** Simpler and more transparent runtime vs. some loss of helper precision.

**Mitigation:** use `starts-with` for classification, full-phrase checks for frozen markers, and defer schema hardening to the next slug.

### Risk: migration reveals fixture weaknesses and fails offline gate

**Trade-off:** truthful failures now vs. smoother but misleading transition.

**Mitigation:** record the mismatch as evidence and defer fixture hardening to the follow-up slug rather than weakening assertions.

### Risk: docs and runtime drift during apply

**Trade-off:** minimal doc changes vs. perfect documentation synchronization.

**Mitigation:** only touch docs named in this change; stop and reconcile if implementation requires broader doc changes.

## Minimal-diff constraints

- Do not introduce new dependencies.
- Do not change CI or build configuration.
- Do not redesign fixture layout.
- Do not add model grading.
- Do not rename capability folders unless strictly required by existing conventions.

## Approval checkpoint for apply phase

Because this slug changes eval tooling behavior, `/prompts:openspec-apply` SHALL pause before mutating runtime files and summarize:

- scope,
- files to change,
- risks,
- verification commands.

Apply work MAY continue only after explicit human approval.
