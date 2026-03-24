## 1. Endurecer la autoridad portable en contract authoring

- [x] 1.1 Actualizar `skill-contract-forge` para que el brief aprobado siga siendo portable y no arrastre refs auxiliares de authoring.
- [x] 1.2 Actualizar ejemplos, edge cases y assets de `skill-contract-forge` para enseñar destilación de autoridad y materialización en `references/` o `assets/`.
- [x] 1.3 Endurecer la suite Promptfoo de `skill-contract-forge` con regresiones que rechacen refs auxiliares locales en el brief.

## 2. Alinear implementation y eval con el mismo handoff

- [x] 2.1 Actualizar `skill-implementation-forge` para consumir el brief aprobado como única autoridad contractual inspeccionable requerida y materializar ejemplos/templates cuando el contrato lo pida.
- [x] 2.2 Endurecer la familia Promptfoo de `skill-implementation-forge` para cubrir el modelo “brief path sí, refs auxiliares no”.
- [x] 2.3 Actualizar `skill-eval-forge` para alinear la autoridad downstream con brief aprobado + implementación existente, sin depender de refs auxiliares del workspace original.
- [x] 2.4 Endurecer la familia Promptfoo de `skill-eval-forge` para cubrir el mismo modelo de authority handoff.

## 3. Verificar, revisar y archivar

- [x] 3.1 Run `openspec validate "stabilize-forge-portable-brief-authority" --type change`.
- [x] 3.2 Run `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml`.
- [x] 3.3 Run `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml`.
- [x] 3.4 Run `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml`.
- [x] 3.5 Run `npm run promptfoo:run:offline`.
- [x] 3.6 Run `npm run promptfoo:run`.
- [x] 3.7 Review the diff for corner cases / edge cases, fix any findings, record evidence, and archive the slug.

## Evidence

- `openspec validate "stabilize-forge-portable-brief-authority" --type change` -> valid
- `promptfoo validate -c evals/engines/promptfoo/skill-contract-forge/promptfooconfig.yaml` -> valid
- `promptfoo validate -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml` -> valid
- `promptfoo validate -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml` -> valid
- `promptfoo eval -c evals/engines/promptfoo/skill-implementation-forge/promptfooconfig.yaml --no-progress-bar --table-cell-max-length 80` -> 23 passed, 0 failed
- `promptfoo eval -c evals/engines/promptfoo/skill-eval-forge/promptfooconfig.yaml --no-progress-bar --table-cell-max-length 80` -> 19 passed, 0 failed
- `npm run promptfoo:run:offline` -> 16 passed, 0 failed
- `npm run promptfoo:run` -> 16 passed, 0 failed
- `git diff --check` -> no whitespace errors; only LF->CRLF warnings from Git working-copy normalization
