# Gates previos obligatorios

## Objetivo
Cerrar las cuatro decisiones bloqueantes antes de seguir con delete-first fuerte.

## Estado de implementación (2026-03-13)
- Gate A: **cerrado** con smoke real en `scripts/evals/smoke.test.ts` cubriendo lectura de definición (`read-evals`) y ejecución controlada con validación de `benchmark` + `run manifest`.
- Gate B: **cerrado**. `--iteration` y `--retry-errors` sobreviven en v1 como contrato de `run-evals`; `run-iteration` ya fue retirado y el contrato canónico quedó concentrado en `run-evals`.
- Gate C: **cerrado**. El core dejó de fijar `openai` como contrato canónico: provider pasó a metadata opcional y los schemas aceptan provider neutral.
- Gate D: **cerrado** con resolver/config de paths en `scripts/evals/infrastructure/filesystem/eval-paths.ts` y adopción en carga de evals, files y prompt de skill.

## Gate A — Smoke real
### Problema
El smoke actual no protege el contrato público real.

### Decisión requerida
Sustituir el smoke trivial por un smoke que valide al menos:
- `read-evals` sobre una skill controlada,
- y un flujo controlado de ejecución o benchmark equivalente.

### Resultado esperado
Se puede borrar sabiendo que el contrato público documentado no desaparece sin aviso.

---

## Gate B — Contrato de `--iteration` y `--retry-errors`
### Problema
Hoy ese contrato vive parcialmente en:
- `application/run-eval-iteration/*`,
- `infrastructure/filesystem/eval-runs/*`,
- locking,
- recuperación de locks muertos,
- reseteo de estado `running`.

### Decisión requerida
Elegir una de estas tres rutas:
1. **Portar** el contrato al nuevo harness.
2. **Deprecar** el contrato en la primera migración.
3. Mantenerlo en **compatibilidad temporal** con salida explícita posterior.

### Resultado esperado
`filesystem/eval-runs/*` deja de estar en tierra de nadie.

---

## Gate C — Provider-neutrality del core
### Problema
El core sigue acoplado a OpenAI en contratos y artifacts.

### Evidencia típica
- `z.literal('openai')`
- persistencia de `provider: 'openai'`
- shapes de resultado dependientes del provider actual

### Decisión requerida
Antes del delete-first fuerte:
- neutralizar contratos respecto a provider,
- o encapsular el provider como metadata opcional no canónica.

### Resultado esperado
Borrar `infrastructure/providers/openai/*` no rompe el objetivo de núcleo portable.

---

## Gate D — Resolver/config de paths
### Problema
Discovery y runs están hardcodeados a `packs/core/<skill>/...`.

### Decisión requerida
Introducir un resolver/config de paths **antes** de mover:
- `skills/`
- `evals/`
- `files/`
- `runs/`

### Resultado esperado
El cambio de layout deja de ser una ruptura transversal y pasa a ser una migración controlada.

---

## Orden recomendado
1. Gate A — smoke real
2. Gate B — decisión de contrato de iteración/reintento
3. Gate C — provider-neutrality
4. Gate D — resolver/config de paths

## Regla operativa
Mientras estos gates no estén cerrados:
- no ejecutar delete-first fuerte sobre `commands/`,
- no borrar `filesystem/eval-runs/*`,
- no borrar provider wrappers antiguos,
- no mover `skills/` fuera del layout actual.
