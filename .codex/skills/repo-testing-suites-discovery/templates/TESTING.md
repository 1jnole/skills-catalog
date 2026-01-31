# Testing

<!-- TESTING:START -->
## Overview
This doc lists the available test suites and how to run them without guessing.

## Suites

### Unit
- Command: `<UNIT_COMMAND>`
- Status: `<UNIT_STATUS>`

### Integration (optional)
- Command: `<INTEGRATION_COMMAND>`
- Status: `<INTEGRATION_STATUS>`

### E2E (optional)
- Command: `<E2E_COMMAND>`
- Status: `<E2E_STATUS>`

## Gate policy
- Single required gate: `npm run verify`
- E2E is optional unless included in `verify`.

## Evidence (recommended)
When running a suite, capture short evidence:

```text
Command: <command>
Result: PASS | FAIL | UNVERIFIED
Output (2–10 lines):
<line>
<line>
```
<!-- TESTING:END -->

## Notes
- Add runner-specific details here if needed (only if verified from repo scripts/config).
