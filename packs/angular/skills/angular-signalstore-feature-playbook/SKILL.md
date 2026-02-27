---
name: angular-signalstore-feature-playbook
description: |
  Playbook to start Angular features with NgRx SignalStore using a consistent scaffold:
  state + computed selectors + methods, request status (pending/error), and rxMethod async flows.
  Defaults: switchMap for reads and exhaustMap for writes.

  Use when:
  - You are creating a new feature store and need standard project APIs.
  - You need predictable async and concurrency handling.

  Don't use when:
  - The task is a small UI-only change with no shared state.
  - The project is not using SignalStore/rxMethod.
  - API contracts or state shape are still unknown.

  Outputs and success:
  - Feature store (and optional request-status helper) from `assets/` templates.
  - TypeScript compiles, selectors/methods are stable, and pending/error is set consistently.
---

# Angular SignalStore Feature Playbook

## Purpose
Start a new Angular feature using a consistent NgRx SignalStore format: state + computed selectors + rxMethod async flows + standardized request status.

## Operating principles (follow strictly)
- Keep scope tight to one feature store setup at a time.
- Reuse existing project conventions before introducing new patterns.
- Never invent endpoints, payloads, response shapes, or state keys.
- Choose RxJS operator semantics based on product behavior, not personal preference.
- Prefer instruction-only changes; avoid new dependencies unless already present in the repo.

## Intake (minimal questions, default-forward)
Collect only the inputs needed to scaffold a correct store. If something critical is missing, stop and ask instead of guessing.

Required:
1) Feature name and target folder.
2) Real API contracts (endpoints + request/response shapes).
3) Domain models and IDs.
4) Expected read/write behavior (replace, ignore spam, or allow parallel writes).

Optional:
- Whether optimistic updates are required.
- Whether the store should auto-hydrate on init.
- Whether store scope is feature-local or wider.

Default policy when inputs are missing:
- If endpoint or response shape is unknown: pause and request the missing contract.
- If folder convention is unclear: infer from the closest existing feature store.
- If concurrency semantics are unspecified: default to `switchMap` for reads and `exhaustMap` for writes.

## Inputs
- Feature name and target folder (per repo conventions).
- Domain types: entities, IDs, payloads.
- Backend endpoints (URLs, request/response shapes).
- Concurrency requirements:
  - Reads: cancel/replace previous request.
  - Writes: ignore repeated triggers while a request is in flight.
- Whether optimistic updates are required.

## Outputs
- `<feature>.store.ts` (or equivalent location) created from `assets/store.template.ts`.
- Optional `request-status.feature.ts` (or equivalent) created from `assets/request-status.feature.template.ts`.
- (Optional) a small usage snippet in feature docs/readme showing selectors/method calls.

## Preconditions / assumptions
- The project uses NgRx SignalStore (`@ngrx/signals`) and `rxMethod` interop.
- You will not invent endpoints, types, or folder structure: use what exists in the repo.

## Steps
1) **Locate conventions** → Identify where feature state lives in this repo.
   - Input: existing feature folders and naming.
   - Action: find a similar feature/store.
   - Output: chosen target paths for store + optional shared feature.

2) **Ensure request status capability**
   - If a reusable request-status feature already exists, reuse it.
   - Otherwise copy `assets/request-status.feature.template.ts` into the repo’s shared store-features location.
   - Output: importable `withRequestStatus`, `setPending`, `setFulfilled`, `setError`.

3) **Create the store scaffold from template**
   - Copy `assets/store.template.ts` to the feature store path.
   - Replace placeholders:
     - `<Feature>` (PascalCase), `<feature>` (kebab/camel as used), `<State>`.
     - Endpoints, types, and state mapping.
   - Output: compilable store file with `withState`, `withComputed`, `withMethods`.

4) **Implement async flows with correct concurrency**
   - Reads (`load*`): use `switchMap` (cancel/replace).
   - Writes (`create/update/delete/add*`): use `exhaustMap` (ignore spam triggers while pending).
   - Always set request status:
     - `setPending()` before request.
     - `setFulfilled()` on success.
     - `setError()` on error.
   - Output: `rxMethod` methods that encapsulate concurrency and status updates.

5) **Optional: optimistic update + rollback** (only if required)
   - Apply optimistic state patch before the write request.
   - On error, rollback exactly one occurrence if duplicates are allowed.
   - Output: responsive UI without losing consistency.

6) **Optional: auto-hydration**
   - If the feature must load on first injection, add `withHooks({ onInit(store) { store.load(); } })`.
   - Output: the store self-hydrates without components remembering to call `load()`.

7) **Verify**
   - Prefer `npm run verify` when available as the single repo gate.
   - If `verify` is unavailable, run existing checks for typecheck/tests/lint without inventing commands.
   - Fix any unresolved imports (common issue: request-status file naming mismatch).
   - Record verification evidence as command + pass/fail result.
   - Output: green checks and deterministic behavior.

## Concurrency decision matrix
- **Read flows** (`load*`): `switchMap` by default (latest request wins; stale requests cancelled).
- **Write flows (non-idempotent)** (`create/delete`): `exhaustMap` by default (drop repeated triggers while pending).
- **Write flows (idempotent)** (`update/put same payload`): `switchMap` only when explicitly intended.
- **Parallel writes required by product**: `mergeMap` only when backend semantics and UX both support concurrency.

## Guardrails
- Don’t guess endpoints, response shapes, or state keys—derive them from existing code or explicit inputs.
- Keep scope tight to “start the feature store”; avoid refactoring unrelated modules.
- Avoid adding new dependencies unless the repo already uses them.
- Never inline secrets/tokens. If a tool needs auth, use repo-approved secret mechanisms.

## Negative examples (don’t call this skill when…)
- “Change button styling / Tailwind classes” → Do a direct UI edit; no store work needed.
- “Fix a small bug in one component’s local state” → Prefer local signals/component state.
- “We haven’t defined the API endpoints yet” → First define/confirm API contracts, then apply this skill.

## Edge cases
- **Project already has a request-status pattern** → Reuse it; don’t introduce a second competing convention.
- **Store should be feature-scoped (not root)** → Adjust `providedIn`/providers according to repo patterns.
- **Write flow is idempotent** (e.g., PUT same payload) → You may choose `switchMap` instead of `exhaustMap`, but only if explicitly intended.
- **Multiple writes allowed concurrently** → Use `mergeMap` only if product requirements demand concurrency and the backend supports it.
- **Rollback with duplicates** → Remove only one occurrence (use `lastIndexOf` + `splice`).

## Templates / assets
- `assets/store.template.ts`: full SignalStore scaffold with rxMethod (read + write) and status handling.
- `assets/request-status.feature.template.ts`: reusable request-status feature + patch helpers.
- `assets/ui-pending-button.snippet.html`: UI snippet for pending/disabled patterns.
- `references/conventions.md`: placeholder rules and suggested file naming.

## Output format (when responding to the user)
Return:
1) Files created/updated (with final paths).
2) Store API summary (selectors + methods).
3) Concurrency choices made (and why).
4) Verification evidence (commands + pass/fail).
5) Deterministic invocation snippet: `Use the angular-signalstore-feature-playbook skill.`

## Invocation snippet
- Use the `angular-signalstore-feature-playbook` skill.
