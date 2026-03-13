# Criterios de cierre de Fase 1 y arranque de Fase 2

## Objetivo
Cerrar **Fase 1** con suficiente seguridad para empezar **Fase 2** sin mezclar todavía:

- cambio de layout,
- desacoplamiento de provider,
- y migración al engine final.

Fase 1 sigue siendo una fase de:

- saneamiento,
- decisiones bloqueantes,
- red mínima,
- y preparación del terreno.

---

## 1. Cierre de Fase 1

La Fase 1 solo puede darse por cerrada si se cumplen **todos** estos criterios.

### 1.1 Red mínima real
Debe existir una red mínima útil. No vale un smoke vacío.

#### Debe quedar cubierto al menos uno de estos caminos:
- lectura de definición (`read-evals`) con un caso controlado, o
- ejecución mínima del flujo público temporal que siga soportado, o
- validación observable del benchmark/resultado final con un caso controlado.

#### No es válido:
- `expect(true).toBe(true)`
- un test que solo compruebe que Vitest arranca
- un test que no ejerza ningún contrato público real

### 1.2 Decisión explícita sobre `--iteration`
Debe quedar documentado si:
- **sobrevive** en el nuevo harness,
- **se depreca**,
- o **se porta más adelante** como capacidad posterior.

No puede quedarse implícito.

### 1.3 Decisión explícita sobre `--retry-errors`
Debe quedar documentado si:
- **sobrevive**,
- **se depreca**,
- o **se porta más adelante**.

No puede quedarse como “ya veremos”.

### 1.4 `previous-skill` fuera de alcance inmediato
Debe quedar fijado que la primera migración trabaja solo con:
- `with-skill`
- `without-skill`

`previous-skill` queda fuera de la primera entrega y pasa a backlog/fase posterior.

### 1.5 Resolver/config de paths reconocido como prerequisito
Debe quedar aceptado explícitamente que **no** se puede mover el layout final (`skills/`, `evals/`, `reports/`, etc.) sin introducir antes un resolver/config de paths.

#### Esto incluye:
- resolución de skill,
- resolución de `evals.json` o equivalente,
- resolución de fixtures,
- resolución de output/reports,
- y cualquier path hardcodeado que hoy dependa de `packs/core/...`.

### 1.6 Matriz `keep / migrate / delete` validada
La matriz debe estar revisada con estos ajustes ya incorporados:
- borrado coordinado de `commands/*` con wrappers raíz si aplica,
- revisión específica de `run-iteration` y su cadena de compatibilidad,
- acoplamiento entre `compatibility/historical-artifacts/*` y `filesystem/eval-runs/*`,
- revisión gris de `application/run-eval-iteration/*` antes de borrado,
- revisión del acoplamiento real a provider en contracts/artifacts.

### 1.7 Lotes de borrado ajustados
Los lotes A/B/C deben estar actualizados con:
- precondiciones reales,
- verificaciones mínimas útiles,
- stop conditions,
- y alcance corregido según los corner cases detectados.

### 1.8 Núcleo superviviente identificado
Debe quedar claro qué piezas sobreviven seguro a la migración:
- contratos,
- benchmark,
- scoring/grading,
- normalización de resultados,
- casos,
- fixtures,
- baseline `with-skill / without-skill`.

---

## 2. Qué NO exige el cierre de Fase 1

Fase 1 **no** exige todavía:

- scaffold final implantado,
- Promptfoo integrado de extremo a extremo,
- layout final movido,
- core completamente desacoplado de provider,
- eliminación total de la ruta antigua,
- ni migración completa del flujo a la tool final.

Si eso ocurre, probablemente se han mezclado Fase 1 y Fase 2.

---

## 3. Gate de salida de Fase 1

La pregunta de salida es esta:

> ¿Podemos empezar a cambiar estructura y contratos sabiendo qué proteger, qué borrar y qué queda explícitamente fuera de alcance?

Si la respuesta es **sí**, Fase 1 puede cerrarse.

Si la respuesta es **no**, aún falta saneamiento y no toca entrar en Fase 2.

---

## 4. Qué habilita exactamente el arranque de Fase 2

Una vez cerrada Fase 1, Fase 2 ya puede empezar con foco en **estructura y contratos**, no solo en saneamiento.

### Fase 2 habilita:
- introducir el **resolver/config de paths**,
- empezar a desacoplar el core del provider actual,
- definir el scaffold intermedio/objetivo de trabajo,
- preparar el engine boundary,
- y seguir reduciendo la ruta antigua con más confianza.

### Fase 2 todavía NO debería hacer de golpe:
- mover todo el layout final de una vez,
- integrar Promptfoo y borrar simultáneamente todo lo viejo,
- rediseñar contratos y benchmark en el mismo cambio,
- ni mezclar cambio de paths + cambio de engine + cambio de baseline en un único slice.

---

## 5. Arranque recomendado de Fase 2

El primer slice de Fase 2 debería ser uno de estos dos:

### Opción A — Resolver/config de paths
Primero introducir una capa explícita de resolución de rutas.

#### Ventaja
Permite cambiar layout más adelante sin romper discovery ni authoring.

### Opción B — Desacoplamiento de provider en contracts
Primero eliminar del core cosas como:
- `provider: 'openai'`
- schemas literales acoplados a un proveedor concreto

#### Ventaja
Alinea el núcleo con el objetivo de “portable core + thin adapter”.

### Recomendación
Si hay hardcodes de layout más extendidos, empezar por **Opción A**.
Si el acoplamiento a provider bloquea varios contratos centrales, empezar por **Opción B**.

---

## 6. Guardrails para el arranque de Fase 2

### 6.1 Guardrails de alcance
- No reabrir `previous-skill`.
- No rediseñar el benchmark completo todavía.
- No mover `skills/` fuera del layout actual sin resolver/config previo.

### 6.2 Guardrails de TDD
- Un comportamiento por iteración.
- Rojo real antes de tocar producción.
- Verde mínimo.
- Refactor corto.
- Stop si aparece un segundo cambio de responsabilidad en la misma iteración.

### 6.3 Guardrails de migración
- No borrar más código si el smoke real deja de proteger el contrato temporal.
- No introducir abstracciones de engine “por si acaso”.
- No mover lógica de benchmark/scoring a la configuración de la tool.
- No tratar Promptfoo como Source of Truth del dominio.

---

## 7. Definition of Done de arranque de Fase 2

Fase 2 puede arrancar cuando existe evidencia de que:

- el contrato temporal protegido está claro,
- las decisiones bloqueantes ya están tomadas,
- el núcleo superviviente está identificado,
- los lotes de borrado están corregidos,
- y el primer slice estructural ya puede elegirse con un alcance pequeño y verificable.

---

## 8. Resumen operativo

### Fase 1 queda cerrada cuando:
- hay smoke real,
- `--iteration` y `--retry-errors` están decididos,
- `previous-skill` queda fuera,
- el resolver de paths está reconocido como prerequisito,
- la matriz y los lotes están corregidos,
- y el núcleo superviviente está claro.

### Fase 2 empieza con:
- resolver/config de paths, o
- desacoplamiento de provider en contracts,

pero no con una migración grande del layout final.
