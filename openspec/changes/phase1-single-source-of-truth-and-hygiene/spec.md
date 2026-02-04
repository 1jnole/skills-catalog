# Spec — phase1-single-source-of-truth-and-hygiene

## Objective
Leave the repo "clean" with a single, unequivocal source of truth for skills: no duplicate skill trees, and no versioned generated artifacts.

## Scope
- Hygiene cleanup (remove versioned noise): `evals/artifacts/`, `evals/golden-prompts.*` (if unused), editor/VCS folders if present.
- Canon decision for skills layout (pick one): **`packs/*/skills/*`**.
- Update scripts + docs so discovery and install only use the canon.
- Update `.gitignore` to prevent reintroducing generated artifacts.

## Out of scope
- No new dependencies.
- No refactors unrelated to skill discovery/hygiene.
- No changes to skill content unless needed for verification.

## Acceptance criteria
1. There is exactly **one** canonical skills root, and it is documented.
2. The non-canonical skills tree is removed from the repo.
3. `evals/artifacts/` is not versioned, and is ignored.
4. `evals/golden-prompts.*` does not exist unless a script consumes it.
5. `npm run verify` passes.

