# Validación de coherencia y corner cases (v2)

## Veredicto general
La dirección sigue siendo correcta, pero ahora quedan cuatro decisiones elevadas a gates previos. Sin ellas, el plan no está listo para delete-first fuerte.

## Corner case 1 — smoke trivial
### Hallazgo
El `smoke.test.ts` actual no protege el contrato público real.

### Estado en v4
Pasa a **gate previo bloqueante**.

---

## Corner case 2 — `commands/` y wrappers raíz
### Hallazgo
`run-evals.ts` y `read-evals.ts` importan `commands/*`.

### Estado en v4
Se mantiene el borrado coordinado, pero ya no se ejecuta hasta cerrar el gate del smoke real y la tabla de entrypoints temporales.

---

## Corner case 3 — contrato `--iteration` / `--retry-errors`
### Hallazgo
`filesystem/eval-runs/*` no es solo “infra legacy”; contiene locking, reclaim de locks y parte del contrato operativo actual.

### Estado en v4
Pasa a **gate previo bloqueante**. Ya no puede clasificarse automáticamente como delete.

---

## Corner case 4 — provider acoplado al core
### Hallazgo
El core actual aún fija OpenAI en contracts/artifacts.

### Estado en v4
Pasa a **gate previo bloqueante**. No basta con borrar `infrastructure/providers/openai/*`.

---

## Corner case 5 — `previous-skill`
### Hallazgo
El plan previo lo metía como baseline objetivo, pero el modelo actual solo conoce `with_skill / without_skill`.

### Estado en v4
Sale del alcance inmediato. Se tratará después como cambio de contrato independiente.

---

## Corner case 6 — cambio de layout
### Hallazgo
Discovery y runs siguen hardcodeados a `packs/core/<skill>/...`.

### Estado en v4
Pasa a **gate previo bloqueante** mediante resolver/config de paths.

---

## Corner case 7 — `application/run-eval-iteration/*`
### Hallazgo
Puede contener lógica reusable de baseline, manifest o secuencia por caso.

### Estado en v4
Se mantiene la revisión gris previa antes del borrado.

---

## Ajuste de orden recomendado
1. cerrar gates A/B/C/D,
2. fortalecer red mínima real,
3. Lote A,
4. Lote B coordinado,
5. decisión `compatibility ↔ filesystem` según Gate B,
6. Lote C con revisión gris,
7. fijar núcleo portable.
