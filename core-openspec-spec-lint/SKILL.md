    ---
    name: core-openspec-spec-lint
    description: Lint an OpenSpec Mini-SPEC/SPEC for completeness and no-drop coverage against the source brief (README/notes): requirement inventory, traceability statuses, atomic ACs with Verify, and determinism/state rules. Output PASS/FAIL only. No writes.
    metadata:
      short-description: core-openspec-spec-lint
    ---

    ## Goal
Catch missing/forgotten requirements (including PROCESS items) before slicing or coding.

## Inputs
- Spec markdown (Mini-SPEC or SPEC)
- Optional: source brief (recommended) to check coverage

## Outputs
- A lint report only (no file writes):
  - Status: PASS|FAIL
  - Errors: LINT-1, LINT-2...
  - Fix hints (optional, max 5 bullets)

## Checks (MUST)
### Structure
- Must contain: Summary, Data contracts (if any), Acceptance criteria, Determinism & state rules (if relevant), Traceability.
- For Mini-SPEC: must contain "README requirement inventory (R-1..R-n)".

### Acceptance criteria quality
- Every AC checkbox includes `Verify: ...`
- Atomic: one behavior per AC
- No unverifiable AC ("should be fast" without metric)

### Coverage / no-drop
- If source brief provided:
  - Every requirement-like sentence must map to some R-*
  - Every R-* must have a status: MAPPED|OUT|ASSUMED|UNKNOWN
  - If any R-* missing a status → FAIL

### Ambiguities
- If the brief contains contradictory instructions (common in PROCESS):
  - Spec must capture it as UNKNOWN + question (do not silently choose)

### Determinism/state
- If brief implies daily/session stability, ordering, caching, navigation state:
  - Spec must state explicit rules and boundaries (timezone, persistence scope)
