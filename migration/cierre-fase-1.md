# Cierre de Fase 1

## Objetivo
Cerrar **Fase 1** sin mezclar todavía trabajo de **Fase 2**.

Fase 1 queda completada cuando el proyecto ha dejado de depender de supuestos débiles para empezar la migración y ya existe una base mínima segura para seguir avanzando.

## Estado de cumplimiento (2026-03-13)
- `1. Red mínima real`: **cumplido**. El smoke trivial fue sustituido por `scripts/evals/smoke.test.ts`, que protege `read-evals` y una ejecución controlada con `benchmark` + `run manifest`.
- `2. Contrato temporal actual explicitado`: **cumplido**. `--iteration` y `--retry-errors` sobreviven temporalmente dentro de `run-evals` y quedaron documentados en `migration/09-tabla-entrypoints-temporales-v1.md`.
- `3. previous-skill fuera de alcance`: **cumplido**. Sigue fuera del alcance inmediato y el baseline inicial permanece en `with-skill / without-skill`.
- `4. Matriz keep / migrate / delete validada`: **cumplido**. La matriz actualizada identifica núcleo superviviente, revisión gris y piezas ya eliminadas, incluyendo coordinación entre entrypoints, cadena `run-iteration`, revisión de `application/run-eval-iteration/*` y tratamiento específico del provider.
- `5. Lotes de borrado ajustados`: **cumplido**. Los lotes A/B/C quedaron revisados y ejecutados sin depender del smoke trivial ni borrar a ciegas piezas del flujo soportado.
- `6. Acoplamiento a provider reconocido como trabajo previo`: **cumplido**. El contrato canónico dejó de fijar `openai`, pero el engine actual todavía usa wiring OpenAI dentro de `laminar/executor.ts`; el desacoplamiento completo sigue fuera del cierre mínimo de Fase 1.
- `7. Cambio de layout bloqueado por resolver/config`: **cumplido**. Se introdujo `scripts/evals/infrastructure/filesystem/eval-paths.ts` y no se movió físicamente `skills/`, `evals/` ni `runs/`.
- `8. Núcleo superviviente identificado`: **cumplido**. Quedan identificados contratos, benchmark, grading, normalización de resultados, casos, fixtures y baseline inicial.

## Veredicto
**Fase 1 puede darse por cerrada** según estos criterios.

Lo ya ejecutado de más respecto al mínimo de cierre no invalida la fase:
- se implementó el resolver/config de paths,
- se retiraron wrappers legacy y aliases CLI,
- y se absorbió el wrapper provider-specific al adapter Laminar.

---

## Qué cubre Fase 1

Fase 1 solo cubre:

- saneamiento inicial,
- validación del plan de borrado,
- fortalecimiento de la red mínima,
- decisiones bloqueantes de alcance y contrato,
- identificación del núcleo que sobrevive.

Fase 1 **no** cubre todavía:

- cambio de scaffold final,
- migración a Promptfoo,
- desacoplamiento completo de provider,
- cambio de layout físico,
- implantación de la nueva arquitectura objetivo.

---

## Criterios de cierre

### 1. Existe una red mínima real
El proyecto ya no depende de un smoke vacío.

Debe existir al menos una protección útil del comportamiento visible temporalmente soportado.

### Debe cumplirse
- El smoke actual ha sido sustituido o endurecido.
- La validación mínima protege algo real del flujo actual.
- La red mínima falla si desaparece el comportamiento público temporalmente soportado.

### No vale como cierre
- Un test tipo `expect(true).toBe(true)`.
- Un test que solo comprueba que Vitest arranca.
- Un test que no toca ningún contrato observable.

---

### 2. El contrato temporal actual está explicitado
Las capacidades actuales del runner viejo que todavía importan deben estar decididas, no asumidas.

### Debe cumplirse
Se ha tomado una decisión explícita sobre:
- `--iteration`
- `--retry-errors`

Y cada una está clasificada como una de estas opciones:
- **sobrevive temporalmente**,
- **se depreca**,
- **se porta más adelante**,
- **sale del alcance inmediato**.

### No vale como cierre
- Dejarlo implícito en el código.
- Dar por hecho que “ya se verá luego”.
- Borrar piezas relacionadas sin decidir antes el contrato.

---

### 3. `previous-skill` queda fuera del alcance inmediato
La primera migración no intenta ampliar el contrato funcional más allá del modelo actual.

### Debe cumplirse
- `previous-skill` queda explícitamente marcado como **fuera de alcance en esta primera migración**.
- El baseline inicial sigue limitado a:
  - `with-skill`
  - `without-skill`

### No vale como cierre
- Mantener `previous-skill` en el plan inmediato como si fuera gratis.
- Tratarlo como simple detalle de adapter o config.

---

### 4. Existe una matriz `keep / migrate / delete` validada
Ya no se trabaja “por intuición archivo a archivo”.

### Debe cumplirse
La matriz distingue con claridad:
- lo que **se conserva**,
- lo que **migra o requiere revisión gris**,
- lo que **se elimina sin invertir upgrade**.

### Además
La matriz ya incorpora los ajustes detectados durante la revisión:
- coordinación entre `commands/*` y wrappers raíz,
- revisión explícita de `run-iteration.ts` y su cadena de compatibilidad,
- dependencia entre `compatibility/historical-artifacts/*` y `filesystem/eval-runs/*`,
- revisión gris de `application/run-eval-iteration/*`,
- tratamiento específico del acoplamiento a provider.

---

### 5. Los lotes de borrado están ajustados
Los lotes de borrado ya no asumen una red mínima insuficiente ni ignoran dependencias reales.

### Debe cumplirse
- Los lotes A/B/C reflejan los corner cases detectados.
- No se propone borrar `commands/*` sin resolver wrappers raíz.
- No se propone borrar piezas acopladas sin aclarar dependencias.
- No se propone borrar el corazón del flujo actual sin revisión gris previa si contiene lógica reutilizable.

### No vale como cierre
- Mantener lotes basados en el smoke trivial.
- Mantener lotes que rompan `typecheck` o entrypoints conocidos.

---

### 6. El acoplamiento a provider está reconocido como trabajo previo
No se da por hecho que el core ya es agnóstico al proveedor.

### Debe cumplirse
- Está reconocido explícitamente que el core actual todavía arrastra acoplamiento a provider.
- Ese acoplamiento no se intenta resolver borrando solo `infrastructure/providers/openai/*`.
- El plan ya trata este punto como trabajo previo y separado.

### No vale como cierre
- Declarar el sistema “agnóstico” sin tocar contratos, artifacts y resultados.

---

### 7. El cambio de layout queda bloqueado por resolver/config de paths
No se mueve todavía `skills/`, `evals/` o `runs/` por estructura deseada.

### Debe cumplirse
- Se reconoce que el layout actual está hardcodeado.
- Se ha decidido que el movimiento de layout queda bloqueado hasta introducir un resolver/config de paths.
- No se planifica mover físicamente skill/evals/runs antes de ese prerequisito.

### No vale como cierre
- Mover carpetas solo por estética.
- Confiar en que Promptfoo “ya absorberá” el problema.

---

### 8. El núcleo superviviente está identificado
Ya está claro qué piezas justifican TDD y migración posterior.

### Debe cumplirse
Queda identificado como núcleo que sobrevive, al menos conceptualmente:
- contratos,
- benchmark,
- grading/scoring útil,
- normalización de resultados,
- casos,
- fixtures,
- baseline inicial `with-skill / without-skill`.

### No vale como cierre
- Seguir tratando todo `scripts/evals/` como si tuviera el mismo valor.
- Aplicar TDD indiscriminado a código que claramente va a morir.

---

## Definición de terminado de Fase 1

Fase 1 está cerrada cuando se cumplen **todas** estas condiciones:

- hay red mínima real,
- el contrato temporal crítico está decidido,
- `previous-skill` ha salido del alcance inmediato,
- la matriz `keep / migrate / delete` está validada,
- los lotes de borrado están ajustados,
- el acoplamiento a provider está reconocido como trabajo previo,
- el cambio de layout queda bloqueado hasta tener resolver/config,
- y el núcleo superviviente está identificado.

---

## Qué no debe pasar todavía al cerrar Fase 1

Al cerrar Fase 1 todavía **no** debería haberse hecho necesariamente:

- el scaffold final,
- la migración a Promptfoo,
- el desacoplamiento completo de provider,
- el resolver/config de paths implementado,
- el movimiento físico de `skills/` y `evals/`,
- la sustitución completa del runner viejo.

Si alguna de esas cosas ya ocurrió, no invalida Fase 1, pero **no forma parte del criterio mínimo de cierre**.

---

## Salida de Fase 1

La salida correcta de Fase 1 es esta:

> El proyecto ya tiene una base mínima segura para seguir con la migración, sin humo en los tests, sin ambigüedad sobre el contrato temporal y sin borrar a ciegas piezas que todavía condicionan el comportamiento observable.
