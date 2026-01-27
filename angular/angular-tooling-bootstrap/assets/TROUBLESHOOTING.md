# Angular Tooling Troubleshooting

This file supports `angular-tooling-bootstrap`.

## 1) `npm run lint` fails: "Failed to load parser" / "Cannot find module"
- Likely cause: ESLint / @angular-eslint version mismatch or partial install.
- Minimal fix:
  1) Ensure deps are installed (re-run `npm ci` after updating `package.json`).
  2) Align @angular-eslint packages to the same major.
  3) Re-run `npm run lint`.
- Then: `npm run verify`.

## 2) `npm run format:check` fails immediately
- Likely cause: Prettier sees formatting drift.
- Minimal fix:
  1) Run `npm run format` (write mode).
  2) Re-run `npm run format:check`.
- Then: `npm run verify`.

## 3) ESLint + Prettier fight (format changes reintroduce lint errors)
- Likely cause: overlapping formatting rules.
- Minimal fix:
  - Prefer: keep formatting in Prettier, and turn off conflicting ESLint formatting rules (minimal config change).
- Then: `npm run verify`.

## 4) Typecheck fails due to tsconfig/project mismatch
- Likely cause: scripts point to a tsconfig not present or wrong.
- Minimal fix:
  - Point `typecheck` to the correct `tsconfig.json` (or `tsconfig.app.json`) that exists in repo.
- Then: `npm run verify`.

## 5) Monorepo/Nx: scripts run but miss projects
- Likely cause: workspace tooling requires per-project commands.
- Minimal fix:
  - Adapt scripts to workspace commands (keep `verify` as single gate).
- Then: `npm run verify`.
