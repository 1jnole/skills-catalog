# Fase 6 — Cierre de migración, retirada de legacy y estabilización final

## 1. Contexto necesario

Esta fase asume que:

- **Fase 1** ya cerró saneamiento inicial, red mínima útil y decisiones bloqueantes.
- **Fase 2** ya introdujo la base estructural necesaria para dejar de depender del layout y de los acoplamientos más fuertes del sistema anterior.
- **Fase 3** ya consolidó el núcleo portable que sí sobrevive a la migración.
- **Fase 4** ya dejó el **engine** encapsulado como adapter fino, sin convertirlo en Source of Truth del sistema.
- **Fase 5** ya migró el contenido útil al nuevo scaffold:
  - casos,
  - fixtures,
  - baselines,
  - scorers,
  - benchmark,
  - flujo principal funcional sobre el nuevo camino.

A estas alturas, el **nuevo scaffold ya debe ser el camino principal real**.

Por tanto, esta fase **no** trata de diseñar ni de abrir nuevas piezas de producto. Trata de:

1. retirar lo viejo que aún quede vivo,
2. cerrar compatibilidad temporal,
3. confirmar que la documentación y los comandos soportados reflejan el sistema real,
4. dejar el repo listo para operar y evolucionar sin arrastrar el runner local histórico.

---

## 2. Objetivo de la fase

Cerrar la migración de forma explícita y verificable, de manera que:

- el **layout nuevo** sea el único camino soportado,
- el **legacy** deje de competir con él,
- la documentación no describa contratos que ya no existen,
- y el repo quede estabilizado como **skill eval harness** con **engine encapsulado**.

---

## 3. Resultado esperado al cerrar la fase

Al final de esta fase debe cumplirse esto:

1. El flujo principal ya corre sobre el **nuevo scaffold**.
2. Los entrypoints y wrappers del runner local histórico han sido eliminados o deprecados explícitamente.
3. `compatibility/` ha desaparecido o ha quedado reducida a una mínima zona claramente marcada.
4. La documentación describe **solo** el camino soportado actual.
5. No quedan referencias activas a:
   - runner local general,
   - layout viejo como fuente principal,
   - provider histórico acoplado,
   - contratos que ya no forman parte del alcance inmediato.
6. La suite mínima de validación protege el sistema final y no el histórico.

---

## 4. Alcance de la fase

### Incluye

- retirada de restos legacy,
- limpieza de compatibilidad,
- limpieza de entrypoints/documentación/scripts,
- verificación del flujo soportado final,
- cierre explícito de contratos de transición,
- estabilización final del repo.

### No incluye

- nuevas features de producto,
- introducir `previous-skill` en esta iteración,
- crear un segundo engine,
- observabilidad extra o tooling nuevo,
- rediseñar benchmark/scoring salvo corrección puntual.

---

## 5. Plan de fase

### 5.1 Confirmar el camino soportado final

Antes de borrar lo que quede, hay que fijar por escrito:

- cuál es el **entrypoint soportado**,
- qué layout es el válido,
- qué comandos siguen vivos,
- qué outputs/reports se consideran oficiales,
- qué queda explícitamente fuera.

Esta confirmación evita que el cierre sea solo “borrado”, y convierte la fase en un cierre verificable.

### 5.2 Retirar el legacy que todavía compite

Todo lo que siga apuntando al flujo viejo debe entrar en una de estas cajas:

- **delete now**,
- **deprecate explicitly and remove next**,
- **keep temporarily with justification**.

La carga de prueba está en el “keep temporarily”.

### 5.3 Reducir o cerrar `compatibility/`

`compatibility/` no es parte del diseño final. En esta fase debe:

- desaparecer, o
- quedar reducida a un mínimo absolutamente justificado y marcado como transitorio.

### 5.4 Limpiar documentación y comandos soportados

El README y cualquier documentación operativa deben dejar de hablar del sistema como si siguiera siendo:

- un runner local general,
- un paquete con comandos históricos aún soportados,
- o un flujo centrado en paths/layout previos.

### 5.5 Estabilizar la validación final

La red mínima al final de la migración debe proteger:

- el flujo soportado actual,
- el benchmark/report final,
- la carga de casos/fixtures,
- el engine encapsulado,
- y la ausencia de dependencias activas del runner viejo.

---

## 6. Tareas tangibles TDD

> En esta fase sigue aplicando TDD, pero con una regla importante:
> **TDD para lo que se conserva o se toca en el camino final. Delete-first para lo que muere claramente.**

## Estado de ejecución

- **Tarea 6.1 ejecutada**
  - evidencia: `evals/final-supported-path.md`
  - resultado: existe una definición explícita del camino soportado final con comandos válidos, layout válido, outputs oficiales y piezas históricas/deprecadas
- **Tarea 6.2 ejecutada**
  - evidencia: `package.json`, `scripts/evals/cli/run-evals.ts`, `scripts/evals/cli/run-promptfoo-pilot.ts`
  - resultado: `run-evals` pasa a ser el entrypoint soportado sobre el flujo Promptfoo y `run-promptfoo-pilot` queda fuera de la superficie pública como alias deprecated explícito
- **Tarea 6.3 ejecutada**
  - evidencia: ausencia de `compatibility/`, `scripts/evals/infrastructure/laminar/README.md`
  - resultado: no queda carpeta `compatibility/` activa; la compatibilidad histórica restante queda reducida y marcada en la zona Laminar
- **Tarea 6.4 ejecutada**
  - evidencia: `scripts/evals/README.md`, `evals/README.md`, `evals/engines/promptfoo/README.md`, `evals/cases/skill-forge/README.md`, `evals/baseline/README.md`
  - resultado: la documentación operativa y la superficie de scripts describen solo el camino soportado real y dejan el histórico como compatibilidad
- **Tarea 6.5 ejecutada**
  - evidencia: `scripts/evals/smoke.test.ts`, `scripts/evals/cli/run-evals.args.test.ts`, `scripts/evals/application/load-eval-definition/load-eval-definition.test.ts`
  - resultado: la red mínima protege la carga de la suite canónica, el command surface final y los outputs finales del engine encapsulado
- **Tarea 6.6 ejecutada**
  - evidencia: `evals/deferred-migration-debt.md`, `evals/final-supported-path.md`
  - resultado: queda explícito lo que no forma parte de este cierre, incluyendo `previous-skill`, segundo engine, observabilidad adicional y automatización más amplia

### Veredicto

Con esta evidencia, **Fase 6 puede considerarse cerrada**:
- `run-evals` ya es el entrypoint soportado del flujo final
- la suite canónica se resuelve desde `evals/cases/skill-forge/suite.v1.json`
- la documentación activa dejó de presentar el runner heredado como camino soportado
- la validación mínima protege el sistema nuevo y no el histórico

### Tarea 6.1 — Declarar el sistema final soportado

#### Objetivo
Crear una definición explícita del camino soportado final.

#### Qué hacer
- Añadir o actualizar un documento corto de “camino soportado final”.
- Dejar claro:
  - entrypoints válidos,
  - layout válido,
  - outputs válidos,
  - qué queda deprecated/removed.

#### TDD
- No requiere TDD clásico.
- Sí requiere verificación contra la implementación real.

#### Definition of Done
- Existe documento o sección clara y actualizada.
- No hay ambigüedad entre flujo nuevo y flujo viejo.

---

### Tarea 6.2 — Retirar entrypoints y wrappers legacy restantes

#### Objetivo
Eliminar los últimos puntos de entrada que mantengan vivo el runner histórico o la ruta antigua.

#### Qué hacer
- Revisar entrypoints restantes.
- Borrar los que ya no pertenezcan al sistema final.
- Si alguno se mantiene temporalmente, marcarlo deprecado explícitamente.

#### TDD
- Si el entrypoint muere claramente: delete-first.
- Si aún redirige al flujo nuevo: añadir o ajustar una verificación mínima antes de tocarlo.

#### Guardrail
No puede quedar ningún wrapper viejo que aparente seguir soportado si ya no forma parte del flujo real.

#### Definition of Done
- Los entrypoints históricos ya no compiten con el flujo actual.
- Typecheck/build siguen verdes.

---

### Tarea 6.3 — Reducir o eliminar `compatibility/`

#### Objetivo
Cerrar la cuarentena temporal.

#### Qué hacer
- Revisar cada resto de `compatibility/`.
- Clasificar:
  - borrar,
  - mantener con justificación temporal,
  - o mover al lugar correcto si sigue teniendo valor real.

#### TDD
- Delete-first por defecto.
- Solo caracterización/TDD si el comportamiento todavía se conserva en el flujo final.

#### Guardrail
`compatibility/` no puede mantenerse por inercia.

#### Definition of Done
- `compatibility/` desaparece, o
- queda mínima, marcada y justificada.

---

### Tarea 6.4 — Limpiar scripts, package.json y documentación operativa

#### Objetivo
Alinear la superficie operativa del repo con el sistema final.

#### Qué hacer
- Revisar `package.json`:
  - scripts,
  - bins,
  - comandos legacy.
- Revisar README:
  - comandos,
  - layout descrito,
  - pasos de ejecución,
  - expectativas de benchmark/reports.
- Eliminar referencias a flujos viejos no soportados.

#### TDD
- No requiere TDD clásico.
- Sí requiere verificación directa de que lo documentado funciona.

#### Guardrail
No documentar comandos que ya no están soportados solo “por no romper costumbre”.

#### Definition of Done
- README y scripts reflejan solo el camino real.
- No hay divergencia entre docs y repo.

---

### Tarea 6.5 — Fortalecer la validación final del flujo soportado

#### Objetivo
Asegurar que la red mínima final protege el sistema nuevo y no el histórico.

#### Qué hacer
- Revisar la suite mínima:
  - smoke útil,
  - tests mínimos del core final,
  - validación de carga de casos/fixtures,
  - validación del engine encapsulado.
- Retirar checks que ya solo protegían rutas históricas muertas.

#### TDD
- Sí, cuando se añadan o ajusten checks del sistema final.
- Cada test debe proteger comportamiento soportado real.

#### Guardrail
No dejar tests “verdes” que solo confirmen que una ruta ya muerta sigue compilandose.

#### Definition of Done
- La red mínima protege el flujo final.
- La suite ya no depende de la existencia del runner histórico.

---

### Tarea 6.6 — Cerrar el inventario de deuda diferida

#### Objetivo
Dejar explícito lo que queda fuera de esta migración.

#### Qué hacer
- Crear una lista breve de “no incluido en esta migración”.
- Ejemplos típicos:
  - `previous-skill`,
  - segundo engine,
  - observabilidad adicional,
  - automatizaciones de CI más amplias.

#### TDD
- No aplica directamente.

#### Definition of Done
- Queda claro qué no forma parte del cierre y por qué.

---

## 7. Guardrails de fase

### Guardrails de alcance
- No reabrir discusiones de arquitectura base en esta fase.
- No introducir nuevos conceptos de baseline o contratos fuera del alcance inmediato.
- No usar la fase de cierre para colar features nuevas.

### Guardrails de TDD
- TDD solo para piezas que sobreviven o se ajustan dentro del flujo final.
- No gastar TDD fino en wrappers que ya van a morir.
- Ningún test nuevo debe proteger una ruta histórica que ya no esté soportada.

### Guardrails de limpieza
- No dejar alias o compatibilidades “por si acaso” sin dueño explícito.
- No dejar documentación híbrida entre sistema viejo y nuevo.
- No aceptar referencias activas al provider histórico si el core ya es portable.

### Guardrails de verificación
- Todo borrado importante va seguido de build/typecheck y validación mínima.
- Todo cambio documental debe contrastarse con el repo real.
- El criterio de cierre es operativo, no cosmético.

---

## 8. Antiobjetivos

En esta fase **no** hacemos:

- nuevo diseño del benchmark,
- nueva abstracción de engine,
- cambio del alcance funcional,
- reintroducción del runner local,
- expansión a `previous-skill`,
- migración a una segunda herramienta.

---

## 9. Criterios de cierre de la fase

La Fase 6 se considera cerrada solo si se cumplen todos estos puntos:

### 9.1 Camino soportado final claro
- Existe una definición explícita del flujo soportado final.
- No hay ambigüedad con el flujo histórico.

### 9.2 Legacy fuera del camino principal
- Los entrypoints históricos ya no compiten con el flujo nuevo.
- Los restos de compatibilidad están eliminados o minimizados y justificados.

### 9.3 Documentación alineada
- README y scripts describen el sistema real.
- No quedan comandos/documentación de flujos no soportados.

### 9.4 Validación final útil
- La red mínima protege el sistema nuevo.
- Build/typecheck y checks mínimos pasan.

### 9.5 Deuda diferida cerrada explícitamente
- Lo que no entra en esta migración queda listado de forma clara.

---

## 10. Checklist rápida de cierre

- [x] Existe documento o sección de “camino soportado final”.
- [x] Los entrypoints legacy restantes fueron eliminados o deprecados explícitamente.
- [x] `compatibility/` desapareció o quedó reducida al mínimo justificado.
- [x] `package.json` no expone comandos históricos no soportados.
- [x] README ya no describe el runner local histórico como flujo principal.
- [x] La validación mínima protege el sistema final.
- [x] No quedan referencias activas al provider histórico dentro del core portable.
- [x] `previous-skill` sigue explícitamente fuera del alcance inmediato.
- [x] La deuda diferida quedó listada y cerrada como backlog posterior.

---

## 11. Resumen ejecutivo

La Fase 6 no construye el sistema: **lo cierra**.

Su función es convertir el resultado de las fases anteriores en un estado operativo y honesto:

- el nuevo scaffold ya es el único principal,
- el legacy deja de competir,
- Promptfoo queda encapsulado como engine,
- el repo deja de hablar como si siguiera siendo un runner local general,
- y la documentación, scripts y validaciones reflejan el sistema que realmente queda.
