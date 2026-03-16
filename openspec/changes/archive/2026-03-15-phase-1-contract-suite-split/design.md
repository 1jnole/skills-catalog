# Design: phase-1-contract-suite-split

## Design intent

Keep the change structural and minimal:

- duplicate the existing mixed suite into a new file with contractual naming;
- narrow the canonical config so it exercises only the contract path;
- remove the previous suite file to avoid two canonical-looking entrypoints.

## Key decisions

### Decision 1 — The canonical gate is `with_skill` only

**Decision:** `promptfooconfig.yaml` SHALL retain only the `with_skill` prompt path.

**Rationale:** The canonical gate must answer a single contract question, not compare uplift.

### Decision 2 — Contractual suite gets its own explicit filename

**Decision:** The active suite SHALL live at `evals/engines/promptfoo/tests/skill-contract-forge.contract.yaml`.

**Rationale:** The filename makes its semantics explicit and leaves room for later comparison-focused suites.

### Decision 3 — Remove the previous suite file

**Decision:** `evals/engines/promptfoo/tests/skill-contract-forge.yaml` SHALL be removed in this phase.

**Rationale:** Keeping two identical suites would create ambiguity about the canonical source of truth.

## Minimal-diff constraints

- Do not modify suite contents beyond filename relocation.
- Do not change providers.
- Do not change prompts.
- Do not touch schemas, cases, fixtures, or generated outputs.
