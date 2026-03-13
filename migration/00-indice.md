# Índice — migración skills evals (v4)

## Contenido
1. `01-plan-maestro-migracion-v4.md` — plan maestro actualizado con decisiones de alcance y gates previos.
2. `02-decisions-gates-previos.md` — decisiones que deben cerrarse antes del delete-first fuerte.
3. `03-fase-1-operativa-v3.md` — Fase 1 actualizada con preflight real.
4. `04-matriz-keep-migrate-delete-v2.md` — matriz revisada con notas de provider-neutrality y layout.
5. `05-validacion-corner-cases-v2.md` — corner cases incorporando la revisión adicional.
6. `06-lote-a-checklist-borrado-v3.md` — Lote A con precondiciones reforzadas.
7. `07-lote-b-checklist-borrado-v3.md` — Lote B ajustado al contrato público actual.
8. `08-lote-c-checklist-borrado-v3.md` — Lote C ajustado para revisión gris + desacoplamientos previos.
9. `09-tabla-entrypoints-temporales-v1.md` — tabla de contrato temporal para coordinar borrados.

## Cambios respecto a v3
- `previous-skill` sale del alcance inmediato y pasa a fase posterior.
- se introduce un **gate explícito** para decidir el destino de `--iteration` y `--retry-errors`.
- se introduce un **gate explícito** para desacoplar `openai` del core antes del borrado fuerte.
- se introduce un **resolver/config de paths** como prerequisito antes de mover `skills/`, `evals/` y `runs/`.
- el smoke real deja de ser recomendación y pasa a ser **precondición bloqueante**.
