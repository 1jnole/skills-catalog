# Fase 3 — Materialización del nuevo scaffold y encapsulación del engine

## 1. Propósito

La **Fase 3** es la fase en la que la migración deja de ser solo preparación estructural y pasa a **materializar el nuevo shape del proyecto**.

## Estado de implementación (2026-03-13)
- Slice ejecutado en este turno: scaffold nuevo visible.
- Evidencia:
  - `skills/README.md`
  - `evals/README.md`
  - `evals/engines/promptfoo/README.md`
- Alcance del slice:
  - ya existe referencia estructural visible para `skills/` y `evals/`,
  - Promptfoo ya tiene un boundary explícito de engine,
  - pero el núcleo portable todavía no se ha reubicado fuera de `scripts/evals/`.
- Slice ejecutado después: cierre del núcleo mínimo de contratos supervivientes.
- Evidencia:
  - `evals/contracts/README.md`
  - `scripts/evals/domain/run-results/run-result.schema.test.ts`
- Alcance del slice:
  - el destino visible para contracts ya existe dentro del scaffold nuevo,
  - y el baseline contractual superviviente sigue acotado al núcleo actual sin meter todavía integración de engine.
- Slice ejecutado después: fijar la semántica base `with_skill / without_skill`.
- Evidencia:
  - `scripts/evals/domain/baseline/baseline.ts`
  - `scripts/evals/domain/baseline/baseline.test.ts`
  - `evals/baseline/README.md`
- Alcance del slice:
  - el baseline actual ya no está repartido entre literals aislados,
  - el core reutiliza una única autoridad para modos y comparison intent,
  - y el scaffold nuevo ya expone ese baseline como parte explícita del núcleo portable.

La Fase 2 ya dejó resueltos los dos bloqueos que impedían mover estructura con seguridad:
- existe un **resolver/config de paths**,
- y el **core** ya no depende semánticamente de un provider concreto.

A partir de aquí, el objetivo ya no es seguir preparando el terreno, sino **hacer visible el nuevo harness de skill evals**:

> **separar skill y evals como unidades distintas, encapsular Promptfoo como engine fino y reubicar el núcleo portable dentro del scaffold objetivo.**

Esta fase **todavía no cierra toda la migración**. Tampoco exige que el runner viejo haya desaparecido por completo al principio de la fase.

Su objetivo es más concreto:

> **dejar operativo el nuevo flujo de skill evals sobre el scaffold nuevo, con Promptfoo aislado como adapter de engine y con el núcleo portable ya viviendo en su ubicación futura.**

---

## 2. Resultado esperado de la fase

Al cerrar Fase 3, el repo debe cumplir estas condiciones:

1. Existe un layout nuevo y explícito para **skills** y **evals**.
2. El núcleo portable ya vive en el área de **evals**:
   - contracts,
   - benchmark,
   - scorers,
   - cases,
   - fixtures,
   - baseline `with-skill / without-skill`.
3. **Promptfoo** queda encapsulado en un área propia de engine, sin contaminar el core.
4. El flujo nuevo ya puede ejecutarse sobre el scaffold nuevo, aunque todavía pueda coexistir compatibilidad temporal.
5. La ruta antigua deja de ser la referencia principal para authoring y ejecución.

---

## 3. Alcance de la fase

## 3.1 Entra en Fase 3

### A. Materializar el nuevo layout
Introducir el scaffold visible hacia el que apunta la migración:
- `skills/` como raíz de las skills, en vez de packs  y quitar el subdfolder de skills dentro de los dominios , ejemplo angular/skills 
- `evals/` como raíz del harness de evaluación,
- con organización explícita para:
  - contracts,
  - benchmark,
  - scorers,
  - cases,
  - fixtures,
  - reports,
  - engine.

### B. Reubicar el núcleo portable
Mover o reconstruir en su nueva ubicación las piezas que sobreviven:
- contracts,
- benchmark,
- grading/scoring,
- normalización,
- cases,
- fixtures,
- baseline actual.

### C. Encapsular Promptfoo como engine fino
Introducir una zona explícita para Promptfoo, por ejemplo:
- `evals/engines/promptfoo/`

o equivalente, donde viva:
- config de Promptfoo,
- adapters mínimos,
- assertions específicas del engine,
- scripts de ejecución del engine.

### D. Cambiar la referencia principal del flujo
Hacer que el flujo nuevo:
- lea desde el nuevo layout,
- escriba donde corresponde según el nuevo resolver,
- y deje de tratar la ruta histórica como centro del sistema.

### E. Mantener compatibilidad solo si es táctica
Si durante la fase sigue existiendo compatibilidad, debe ser:
- explícitamente temporal,
- limitada,
- y subordinada al scaffold nuevo.

---

## 3.2 No entra en Fase 3

Quedan fuera de esta fase:

- introducir `previous-skill`,
- rediseñar benchmark por razones cosméticas,
- crear una abstracción universal de engines,
- soportar múltiples engines reales a la vez,
- reabrir el debate sobre provider runtime,
- ampliar el alcance a agent tooling,
- limpiar todos los restos legacy si no bloquean el nuevo flujo.

---

## 4. Flujo que seguimos en esta fase

Seguimos el mismo marco acordado:

### Entrada táctica
- **Legacy-aware**, pero ya con el nuevo layout como dirección principal.

### Disciplina por cambio
- **TDD por slice pequeño**:
  1. rojo real,
  2. cambio mínimo,
  3. verde,
  4. refactor corto,
  5. verificación de ownership y del nuevo scaffold.

### Guía estructural
- **DDD-lite**, solo donde aporta:
  - límites claros,
  - core portable,
  - engine encapsulado,
  - compatibilidad como cuarentena temporal.

---

## 5. Guardrails de la fase

## 5.1 Guardrails estructurales

- No mezclar `skills/` y `evals/` dentro del mismo subárbol conceptual.
- No dejar Promptfoo repartido por el repo; debe quedar encapsulado.
- No convertir `compatibility/` en una segunda arquitectura estable.
- No mover ficheros por estética; cada movimiento debe responder a ownership real.
- No crear árboles profundos innecesarios ni nuevas capas vacías.

## 5.2 Guardrails de engine

- Promptfoo debe ser **adapter fino**, no Source of Truth del dominio.
- Los cases, scorers y benchmark no deben quedar secuestrados por el formato interno del engine.
- No meter lógica de benchmark local dentro de config de Promptfoo si puede vivir fuera.
- No introducir wrappers de provider propios como sustituto oculto del engine.

## 5.3 Guardrails de contratos

- El baseline sigue siendo solo:
  - `with-skill`
  - `without-skill`
- No introducir `previous-skill` en esta fase.
- No volver a acoplar contracts a provider o a campos específicos de Promptfoo.
- No mezclar metadata técnica del engine con semántica local de resultados.

## 5.4 Guardrails de TDD

- No mover layout y encapsular Promptfoo en el mismo slice si el cambio pierde foco.
- No aceptar fallos de imports/rutas como rojo válido si el comportamiento no está cubierto.
- No refactorizar nombres y estructura antes de tener el cambio en verde.
- No saltarse la red mínima heredada de Fase 1 y Fase 2.

---

## 6. Subobjetivos internos de la fase

## 6.1 Subobjetivo A — Scaffold nuevo visible

### Objetivo
Introducir la estructura estable que hará comprensible el proyecto después de la migración.

### Qué debe aparecer
Como mínimo, una estructura equivalente a:
- `skills/`
- `evals/contracts/`
- `evals/cases/`
- `evals/fixtures/`
- `evals/scorers/`
- `evals/benchmark/`
- `evals/engines/promptfoo/`
- `evals/reports/`

### Qué debe evitar
- duplicar por largo tiempo el mismo contenido en layout viejo y nuevo,
- seguir authoring nuevos casos en la ruta histórica,
- meter el engine en el centro del árbol.

### Criterio de salida
El scaffold nuevo existe y ya es reconocible como la referencia estructural del proyecto.

---

## 6.2 Subobjetivo B — Núcleo portable reubicado

### Objetivo
Que las piezas que sobreviven de verdad queden ya en la zona donde vivirán también después del engine actual.

### Núcleo esperado
- contracts,
- benchmark,
- scorers,
- normalización,
- cases,
- fixtures,
- baseline actual.

### Qué debe evitar
- mantener contracts y benchmark dependientes de rutas o imports legacy,
- dejar reglas del dominio atrapadas dentro de adapters de engine.

### Criterio de salida
El núcleo portable ya puede señalarse y mantenerse sin depender del árbol viejo.

---

## 6.3 Subobjetivo C — Promptfoo encapsulado

### Objetivo
Introducir Promptfoo como engine sin convertirlo en el centro conceptual del proyecto.

### Qué debe incluir
- configuración propia del engine,
- adapters mínimos entre cases/scorers y el engine,
- punto de ejecución del engine,
- espacio para assertions del engine si son necesarias.

### Qué debe evitar
- dispersar configuración Promptfoo por varios directorios,
- duplicar lógica de scoring entre engine y core,
- acoplar el authoring de casos al engine de forma irreversible.

### Criterio de salida
Es posible ejecutar el flujo nuevo con Promptfoo sin que Promptfoo reescriba el diseño del core.

---

## 6.4 Subobjetivo D — Compatibilidad subordinada

### Objetivo
Mantener solo la compatibilidad mínima necesaria mientras el nuevo scaffold entra en uso.

### Regla
Si `compatibility/` sigue existiendo al final de la fase, debe cumplir esto:
- no es el camino principal,
- no recibe trabajo nuevo,
- no define contracts,
- no define benchmark,
- no define el shape del engine.

### Criterio de salida
La compatibilidad, si existe, ya es claramente secundaria y decreciente.

---

## 7. Riesgos conocidos de la fase

## 7.1 Duplicación prolongada entre layout viejo y nuevo
Riesgo: mover estructura pero seguir manteniendo dos árboles vivos demasiado tiempo.

Respuesta:
- usar el nuevo scaffold como referencia principal tan pronto como sea viable,
- y limitar la duplicación a ventanas tácticas cortas.

## 7.2 Promptfoo invade el core
Riesgo: por rapidez, terminar metiendo casos, scorers o benchmark directamente en formato Promptfoo.

Respuesta:
- mantener core portable fuera de `engines/promptfoo/`,
- y usar adapters finos.

## 7.3 Cambio de layout demasiado grande de golpe
Riesgo: intentar mover skills, evals, fixtures, reports y compatibilidad en un solo cambio amplio.

Respuesta:
- mover por slices con resolver ya estable,
- y validar verde después de cada slice.

## 7.4 Compatibilidad que deja de ser temporal
Riesgo: `compatibility/` empieza a usarse como ruta cómoda y se perpetúa.

Respuesta:
- no permitir trabajo nuevo ahí,
- y marcarla como secundaria en docs y flujo.

---

## 8. Definition of Done de Fase 3

La Fase 3 se considera cerrada cuando:

1. existe un scaffold nuevo y reconocible para `skills/` y `evals/`,
2. el núcleo portable ya vive en el área de `evals/`,
3. Promptfoo está encapsulado como engine fino,
4. el flujo nuevo puede ejecutarse sobre el scaffold nuevo,
5. la ruta vieja ya no es la referencia principal,
6. y cualquier compatibilidad restante es claramente temporal y subordinada.

---

## 9. Qué habilita esta fase

Al cerrar Fase 3, quedará habilitado:

- retirar más piezas del runner local con menos riesgo,
- estabilizar el flujo nuevo como default,
- cerrar la migración de authoring hacia `skills/` y `evals/`,
- y entrar en una fase posterior de endurecimiento, limpieza final y retirada más agresiva de compatibilidad.

---

## 10. Qué no prueba esta fase todavía

Aunque Fase 3 salga bien, todavía **no** significa que:

- toda la compatibilidad haya desaparecido,
- la suite final de skill evals esté completa,
- el benchmark ya sea el definitivo para siempre,
- o que exista soporte para más de un engine o más de una baseline.

Solo significa que:
- el proyecto ya usa su scaffold futuro,
- el engine está encapsulado,
- y el core portable ya vive donde debe vivir.
