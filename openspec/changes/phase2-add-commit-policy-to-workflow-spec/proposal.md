# Proposal — Add commit message policy to workflow spec

## Why
Commit message conventions should be part of the **stable workflow contract** so agents and humans produce consistent, traceable history without relying on ad-hoc prompting.

## What changes
- Update `openspec/specs/workflow.md` to define Conventional Commits policy.
- Update `openspec-bootstrap`'s workflow spec template so newly bootstrapped repos inherit the policy.

## Scope
- Documentation-only contract changes.
- No behavioral changes to skills besides template content.
