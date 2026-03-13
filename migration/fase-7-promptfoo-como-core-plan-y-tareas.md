# Fase 7 — Promptfoo como core, retirada de `scripts/` y cierre Promptfoo-first

## 1. Contexto necesario

Esta fase parte del **estado real al terminar la Fase 6**, no del estado ideal.

### 1.1 Lo que sí quedó mejor en Fase 6

- `run-evals` ya ejecuta la ruta nueva.
- la suite canónica ya vive en:
  - `evals/cases/skill-forge/suite.v1.json`
- los outputs principales ya aterrizan en:
  - `evals/engines/promptfoo/generated/`
- el camino heredado dejó de ser el camino soportado principal.

### 1.2 Lo que sigue mal respecto al objetivo real

Aunque Promptfoo quedó como motor de ejecución principal, **no quedó como core**.

Hoy el repo sigue siendo **wrapper-first** porque:

- `package.json` sigue publicando un runtime propio;
- `scripts/evals/` sigue existiendo como centro operativo;
- la config de Promptfoo se genera desde código del repo;
- `read-evals` y `run-evals` siguen siendo entrypoints propios;
- scoring y benchmark siguen teniendo ownership principal fuera de Promptfoo;
- y `scripts/evals/dist/` sigue materializando una build de runtime que no debería existir como producto.

### 1.3 Corrección de dirección

La intención final no es:

- “tener nuestro core y usar Promptfoo por debajo”.

La intención final sí es:

- **usar Promptfoo como core operativo de evals**,
- dejar `evals/` como único hogar del sistema,
- y hacer que `scripts/` deje de existir en esta parte del repo.

---

## 2. Objetivo de la fase

Pasar desde el estado wrapper-first post-Fase-6 a un estado **Promptfoo-first** donde:

1. Promptfoo sea la fuente operativa principal de ejecución y outputs.
2. `evals/` sea el único hogar del sistema de evals.
3. `scripts/` desaparezca del diseño soportado.
4. el repo deje de mantener un runner propio alrededor de Promptfoo.

---

## 3. Resultado esperado

Al cerrar esta fase debe cumplirse esto:

1. Existe un `promptfooconfig` nativo bajo `evals/engines/promptfoo/`.
2. `package.json` expone solo comandos Promptfoo-first o aliases mínimos a Promptfoo.
3. los casos y fixtures útiles siguen viviendo en `evals/`.
4. la comparación `with_skill / without_skill` queda expresada en Promptfoo.
5. los outputs oficiales pasan a ser los outputs nativos de Promptfoo y, solo si hace falta, una post-transformación mínima bajo `evals/`.
6. `scripts/evals/` desaparece.
7. `scripts/` deja de ser necesario para el sistema de evals.
8. la documentación deja de hablar de un “portable core” propio.

---

## 4. Alcance de la fase

### Incluye

- adopción Promptfoo-first;
- materialización de config nativa Promptfoo;
- migración de la suite actual a formato operativo Promptfoo;
- retirada de wrappers propios;
- retirada de `scripts/evals/` y su `dist/`;
- alineación de outputs, comandos, docs y dependencias.

### No incluye

- rediseñar las skills en sí mismas;
- cambiar el contenido funcional de `skill-forge`;
- introducir `previous-skill`;
- introducir un segundo engine;
- añadir observabilidad o CI extra fuera de la adopción Promptfoo-first.

---

## 5. Principio rector

### 5.1 Regla principal

**Promptfoo deja de ser adapter fino y pasa a ser core operativo.**

### 5.2 Regla de simplificación

Si Promptfoo ya resuelve una necesidad de forma nativa, no se mantiene una versión propia en el repo “por orden” o “por control”.

### 5.3 Regla de supervivencia

Solo sobreviven fuera de Promptfoo:

- los artefactos de autoría del repo que realmente aportan valor,
- una mínima traducción si Promptfoo no cubre algo esencial,
- y la documentación/organización bajo `evals/`.

Todo lo demás entra en:

- delete now,
- migrate into Promptfoo-native shape,
- o keep temporarily with justification explícita.

---

## 6. Arquitectura destino

La fase debe converger a algo conceptualmente cercano a esto:

```text
repo/
  evals/
    cases/
      skill-forge/
        suite.v1.json            # o equivalente de autoría si sigue aportando valor
    fixtures/
      skill-forge/
    engines/
      promptfoo/
        promptfooconfig.yaml     # o .ts solo si está justificado
        prompts/
        tests/
        generated/
    reports/
    README.md
  packs/
    core/
      skill-forge/
        SKILL.md
  package.json
```

### Nota de diseño

Se prefiere:

- `promptfooconfig.yaml`

antes que:

- un generador TypeScript propio.

Solo se permite `promptfooconfig.ts` o helpers `file://...` si son la forma más pequeña y honesta de derivar prompts/tests desde artefactos ya existentes.

---

## 7. Plan de fase

### 7.1 Congelar el destino Promptfoo-first

Antes de mover nada, hay que dejar por escrito:

- cuál será el `promptfooconfig` canónico;
- qué outputs pasan a ser oficiales;
- si `suite.v1.json` sigue como artefacto de autoría o se reemplaza;
- y qué información del benchmark local realmente debe sobrevivir fuera del JSON de Promptfoo.

### 7.2 Materializar config nativa de Promptfoo

La configuración debe pasar de:

- “generarse desde `scripts/evals/...`”

a:

- “vivir directamente en `evals/engines/promptfoo/`”.

### 7.3 Traducir la suite útil al shape operativo de Promptfoo

La suite actual ya tiene valor. Esta fase no pide inventar nuevos casos, sino:

- traducir el contenido útil actual a tests/assertions operables por Promptfoo,
- conservar `with_skill / without_skill`,
- y mantener la señal útil de los 8 casos existentes.

### 7.4 Colapsar wrappers y command surface propio

El repo no debería seguir teniendo:

- un `run-evals` implementado en TypeScript,
- un `read-evals` propio,
- ni un runtime intermedio que shell-ea a Promptfoo.

Debe quedar:

- Promptfoo como comando real,
- y solo aliases finos en `package.json` si aportan ergonomía.

### 7.5 Reducir benchmark/scoring propio a lo estrictamente necesario

No se debe arrastrar scoring/benchmark propio por inercia.

Para cada pieza actual hay que decidir:

- Promptfoo ya lo cubre,
- hace falta una post-transformación mínima,
- o se borra.

### 7.6 Retirar `scripts/evals/` y su build

Una vez viva la ruta Promptfoo-first:

- `scripts/evals/` debe desaparecer,
- `scripts/evals/dist/` debe desaparecer,
- y la build TypeScript asociada debe dejar de existir como camino soportado.

### 7.7 Cerrar docs y dependencias

El repo debe terminar esta fase hablando como repo Promptfoo-first:

- sin “portable core” propio,
- sin Laminar heredado como parte del sistema activo,
- y sin dependencias sobrantes del runtime anterior.

---

## 8. Tareas tangibles TDD

> Regla de esta fase:
> **TDD para la migración de artefactos que sobreviven. Delete-first para wrappers y runtime propio que ya no deben existir.**

### Tarea 7.1 — Declarar el destino Promptfoo-first

#### Objetivo
Congelar el contrato final de esta realineación.

#### Qué hacer

- Crear un documento corto de “Promptfoo-first target”.
- Decidir y dejar explícito:
  - config canónica,
  - outputs oficiales,
  - suite de autoría que sobrevive,
  - post-procesados mínimos que todavía tendrían valor.

#### TDD

- No requiere TDD clásico.
- Sí requiere contraste con el estado post-Fase-6 real.

#### Definition of Done

- Existe documento claro.
- Ya no hay ambigüedad entre wrapper-first y Promptfoo-first.

---

### Tarea 7.2 — Materializar `promptfooconfig` nativo

#### Objetivo
Hacer que Promptfoo deje de depender de una config generada por `scripts/evals`.

#### Qué hacer

- Crear `evals/engines/promptfoo/promptfooconfig.yaml` o `.ts`.
- Reubicar prompts/tests/providers/outputPath al artefacto nativo.
- Eliminar la idea de “config generada como fuente de verdad”.

#### TDD

- rojo: la config nativa todavía no ejecuta la suite útil;
- verde: ejecuta la suite útil con outputs deterministas;
- refactor: simplificar referencias a archivos y variables.

#### Guardrail

No introducir un generador propio más complejo que la config que intenta reemplazar.

#### Definition of Done

- Promptfoo puede ejecutarse desde config nativa bajo `evals/engines/promptfoo/`.

---

### Tarea 7.3 — Traducir `suite.v1.json` a tests/assertions nativos de Promptfoo

#### Objetivo
Conservar la señal útil de la suite actual, pero en shape operativo Promptfoo.

#### Qué hacer

- Mapear los 8 casos actuales a tests nativos.
- Mantener la comparación `with_skill / without_skill`.
- Llevar assertions al formato nativo siempre que sea posible.
- Si algo no cabe nativamente, crear solo la mínima extensión permitida bajo `evals/`.

#### TDD

- caracterización de los 8 casos útiles;
- rojo: la suite Promptfoo-first no reproduce la señal actual;
- verde: reproduce la señal necesaria;
- refactor: limpiar redundancias.

#### Guardrail

No reescribir la suite funcionalmente si el objetivo es solo cambiar de ownership/shape.

#### Definition of Done

- La suite útil actual corre en Promptfoo-native shape.

---

### Tarea 7.4 — Reemplazar la superficie de comandos por aliases finos o Promptfoo directo

#### Objetivo
Eliminar el runtime propio como command surface.

#### Qué hacer

- Revisar `package.json`.
- Eliminar scripts que apunten a `scripts/evals/dist/...`.
- Sustituirlos por:
  - comandos directos a Promptfoo,
  - o aliases npm mínimos que solo deleguen.
- Retirar `read-evals` y `run-evals` implementados en código si ya no aportan nada.

#### TDD

- smoke de comandos reales;
- rojo: el comando soportado aún necesita wrapper propio;
- verde: el comando soportado invoca Promptfoo directamente o con alias mínimo.

#### Guardrail

No dejar un alias npm que siga dependiendo de una implementación propia oculta.

#### Definition of Done

- `package.json` ya no expone wrappers runtime propios para evals.

---

### Tarea 7.5 — Reducir scoring y benchmark propio a mínimo justificable

#### Objetivo
Dejar de mantener contratos paralelos si Promptfoo ya da lo necesario.

#### Qué hacer

- Auditar `scoring.json` y `benchmark.json` actuales.
- Clasificar cada campo:
  - lo cubre Promptfoo,
  - hace falta post-proceso mínimo,
  - o se elimina.
- Si sobrevive algo, moverlo bajo `evals/` y no bajo `scripts/`.

#### TDD

- caracterización del mínimo summary realmente necesario;
- rojo: la información imprescindible se pierde;
- verde: sobrevive con una capa mínima;
- refactor: borrar campos/herramientas redundantes.

#### Guardrail

No reconstruir un benchmark-platform paralelo por nostalgia del runtime anterior.

#### Definition of Done

- El repo ya no mantiene semántica duplicada sin justificación.

---

### Tarea 7.6 — Retirar `scripts/evals/`, `dist/` y la build asociada

#### Objetivo
Eliminar el runtime casero.

#### Qué hacer

- Borrar `scripts/evals/`.
- Borrar `scripts/evals/dist/`.
- Retirar `build-evals` y cualquier tooling exclusivo de esa build.
- Verificar que no quedan imports ni docs apuntando a `scripts/evals`.

#### TDD

- delete-first por defecto;
- solo caracterización si alguna pieza aún conserva comportamiento soportado real.

#### Guardrail

No mover archivos desde `scripts/evals/` a `evals/` “por no perder trabajo” si Promptfoo ya los absorbe mejor.

#### Definition of Done

- `scripts/evals/` desaparece por completo.
- `scripts/` deja de ser necesario para evals.

---

### Tarea 7.7 — Limpiar dependencias del runtime anterior

#### Objetivo
Alinear dependencias con la arquitectura nueva.

#### Qué hacer

- Añadir `promptfoo` como dependencia o devDependency del repo si se decide fijarlo localmente.
- Revisar y retirar dependencias del runtime anterior que dejen de ser necesarias:
  - `@lmnr-ai/lmnr`,
  - `ai`,
  - `@ai-sdk/openai`,
  - `typescript` solo si ya no es necesaria para evals,
  - cualquier otra ligada al wrapper eliminado.

#### TDD

- no aplica clásico;
- sí requiere verificación ejecutable del command surface resultante.

#### Guardrail

No dejar `npx promptfoo@latest` como pseudo-core si se decide que el repo debe ser reproducible con versión fijada.

#### Definition of Done

- Las dependencias reflejan el sistema Promptfoo-first real.

---

### Tarea 7.8 — Cerrar documentación y backlog residual

#### Objetivo
Terminar la fase sin narrativa híbrida.

#### Qué hacer

- Actualizar `README.md`, `evals/README.md` y docs operativas.
- Eliminar toda referencia a:
  - “portable core”,
  - runtime propio en `scripts/`,
  - Laminar como parte activa,
  - wrappers heredados.
- Dejar explícito el backlog fuera de alcance.

#### TDD

- No aplica clásico.
- Sí requiere verificación directa de comandos y docs.

#### Definition of Done

- La documentación cuenta una sola historia: Promptfoo-first.

---

## 9. Guardrails de fase

### Guardrails de arquitectura

- Promptfoo pasa a ser el core operativo, no un adapter fino rodeado por código propio.
- `evals/` es el único hogar del sistema de evals.
- `scripts/` no puede sobrevivir por costumbre.

### Guardrails de delete-first

- borrar primero wrappers, dist y tooling muerto;
- no invertir tiempo en embellecer runtime que va a desaparecer;
- no reubicar código muerto dentro de `evals/`.

### Guardrails de migración

- conservar la señal útil de la suite actual;
- no expandir funcionalmente `skill-forge`;
- no cambiar el alcance de `with_skill / without_skill`.

### Guardrails de dependencias

- si Promptfoo es core, su versión debe gestionarse de forma explícita;
- no arrastrar dependencias de Laminar/OpenAI wrapper si ya no pertenecen al sistema final.

---

## 10. Antiobjetivos

En esta fase **no** hacemos:

- nuevas features de la skill,
- introducir `previous-skill`,
- añadir segundo engine,
- reabrir benchmark complejo “por si acaso”,
- recrear un mini-framework propio de evals dentro de `evals/`.

---

## 11. Criterios de cierre

La fase se considera cerrada solo si:

### 11.1 Promptfoo-first real

- existe config Promptfoo nativa;
- el command surface ya no depende de wrappers propios.

### 11.2 `scripts/` fuera

- `scripts/evals/` desapareció;
- no queda build runtime propia para evals.

### 11.3 `evals/` como único hogar

- casos, fixtures, config y outputs soportados viven bajo `evals/`.

### 11.4 Contratos paralelos minimizados

- scoring/benchmark propio solo sobrevive si está justificado;
- el resto se elimina o se absorbe en Promptfoo.

### 11.5 Documentación honesta

- el repo ya no habla de un core propio de evals;
- la documentación activa describe Promptfoo como centro operativo.

---

## 12. Checklist rápida

- [ ] Existe documento de destino Promptfoo-first.
- [ ] Existe `promptfooconfig` nativo bajo `evals/engines/promptfoo/`.
- [ ] La suite útil actual corre con shape operativo Promptfoo.
- [ ] `package.json` ya no expone wrappers runtime propios.
- [ ] `scripts/evals/` desapareció.
- [ ] `scripts/` dejó de ser necesario para evals.
- [ ] Outputs oficiales alineados con Promptfoo.
- [ ] Dependencias del runtime anterior retiradas o justificadas.
- [ ] Docs activas ya no describen un “portable core” propio.

---

## 13. Slicing sugerido en OpenSpec

Para no repetir el error de hacer una fase demasiado grande, esta fase debería implementarse en cambios atómicos:

1. `promptfoo-first-target`
   - congela arquitectura final, config canónica y outputs oficiales
2. `promptfoo-native-config`
   - materializa `promptfooconfig` nativo y providers/prompts/tests
3. `promptfoo-native-suite`
   - traduce `suite.v1.json` y fixtures al shape operativo Promptfoo
4. `promptfoo-command-surface`
   - reemplaza wrappers por aliases finos o comandos Promptfoo directos
5. `promptfoo-remove-scripts-runtime`
   - elimina `scripts/evals/`, `dist/`, build y tooling muerto
6. `promptfoo-closeout`
   - limpia docs, deps y backlog residual

---

## 14. Resumen ejecutivo

La Fase 7 no continúa la arquitectura actual: **la corrige**.

El estado al final de Fase 6 es útil como transición, pero sigue siendo wrapper-first.

Esta fase debe completar la intención real:

- Promptfoo como core operativo,
- `evals/` como único hogar,
- `scripts/` fuera,
- y el repo dejando de mantener un runtime propio alrededor del engine.
