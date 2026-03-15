# Design: phase-3-provider-decoupling

## Design intent

Keep the split minimal and mechanical:

- suites and prompts stay exactly where they are;
- provider choice moves into one dedicated file under `providers/`;
- every current Promptfoo config references the same provider adapter file.

## Key decisions

### Decision 1 — One default provider adapter

**Decision:** The repo SHALL ship a single default adapter file, `default.openai.yaml`.

**Rationale:** The goal is provider decoupling, not vendor expansion.

### Decision 2 — Contract and uplift stay unchanged semantically

**Decision:** The three current suite configs SHALL keep the same prompt and test relationships.

**Rationale:** This phase should not alter evaluation meaning, only provider placement.

### Decision 3 — Promptfoo-native file references only

**Decision:** Provider reuse SHALL use documented Promptfoo `file://...` references inside `providers:`.

**Rationale:** This avoids inventing wrappers or custom config-merging behavior.

## Minimal-diff constraints

- do not change models or vendor defaults;
- do not touch tests, prompts, cases, fixtures, or generated outputs;
- do not introduce additional providers "for later".
