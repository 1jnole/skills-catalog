    ---
    name: core-openspec-tasks-lint
    description: Lint `openspec/changes/<slug>/tasks.md` against the spec: Iteration 0 baseline/gates, every AC scheduled exactly once, PROCESS constraints satisfied or explicitly deferred, and reviewable iteration objectives. Output PASS/FAIL only. No writes.
    metadata:
      short-description: core-openspec-tasks-lint
    ---

    ## Goal
Ensure the plan is complete and enforceable before implementation.

## Inputs
- tasks.md
- Spec (Mini-SPEC or SPEC) for AC list + PROCESS requirements
- Optional: preferred gate command (default: `npm run verify`)

## Outputs
- Status: PASS|FAIL
- Errors: TLINT-1, TLINT-2...
- Fix hints (optional, max 5 bullets)
- No file writes.

## Checks (MUST)
- Iteration 0 exists and includes baseline + gate command.
- Every AC appears in exactly one iteration's "Done when".
- Every PROCESS requirement is satisfied by an iteration or explicitly deferred with rationale.
- Each iteration has a single objective and minimal file scope (PR-sized).
