## 1. OpenSpec and scope

- [x] 1.1 Create the cleanup OpenSpec artifacts for roadmap folder removal.
- [x] 1.2 Identify the active non-archived specs and changes that still require `roadmap/` or `roadmap2/`.

## 2. Active artifact cleanup

- [x] 2.1 Update active non-archived OpenSpec specs so they no longer require `roadmap/` or `roadmap2/`.
- [x] 2.2 Update active Phase 3 change artifacts so their scope and evidence do not depend on deleted roadmap notes.
- [x] 2.3 Keep archived OpenSpec history untouched.

## 3. Verification

- [x] 3.1 Run `openspec validate "roadmap-folders-removal-cleanup" --type change`.
- [x] 3.2 Run a search check proving active docs no longer require `roadmap/` or `roadmap2/`.
- [x] 3.3 Record evidence and outcome in this file.

## Evidence

- Command: `openspec validate "roadmap-folders-removal-cleanup" --type change`
  Result: PASS
  Date: 2026-03-12
  Note: The cleanup change validates after removing active roadmap-folder requirements from non-archived specs and active Phase 3 changes.

- Command: `rg -n "roadmap/|roadmap2/" openspec/specs openspec/changes/laminar-phase-3-batch-4-skill-forge-parity openspec/changes/laminar-phase-3-batch-5-legacy-retirement openspec/changes/laminar-phase-3-batch-5-risk-hardening openspec/changes/laminar-phase-3-batch-6-docs-closeout -S`
  Result: PASS
  Date: 2026-03-12
  Note: The search returned no matches, confirming that active non-archived specs and active Phase 3 changes no longer require the deleted roadmap folders by path.
