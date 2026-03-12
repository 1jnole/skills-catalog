# Design: laminar-v1-skill-forge-parity-recovery

## Decisions

- Fix `skill-forge` before touching the grader.
- Do not change `evals.json` or benchmark thresholds.
- Use one-off diagnostic execution only; do not persist raw model outputs as supported artifacts.
- Accept parity only on a fresh green run plus a green local retry on the accepted iteration.
