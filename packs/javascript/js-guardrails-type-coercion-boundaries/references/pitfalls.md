# Pitfalls — Type coercion boundaries

## Anti-pattern 1 — Let `+` switch from math to concatenation mid-expression

Source: `javascript-hard-parts-v3-slides.pdf`, pages 60–63; `21 - Math Operator Type Coercion.md`

```ts
const total = price * quantity + donation;
```

Why it fails: `*` can coerce `"3"` to `3`, but `+` will concatenate if `donation` is still a string.

Preferred direction: normalize the boundary values first.

---

## Anti-pattern 2 — Use `==` to paper over ambiguous inputs

Source: `javascript-hard-parts-v3-slides.pdf`, pages 65–68; `23 - Coercion Rules and Operators.md`

```ts
if (donation == 0) {
  // ...
}
```

Why it fails: loose equality performs hidden coercions and makes the branch depend on JS conversion rules instead of the intended data type.

Preferred direction: coerce once, then compare with `===`.

---

## Anti-pattern 3 — Rely on truthiness when `0` and `""` mean different things

Source: `javascript-hard-parts-v3-slides.pdf`, pages 64, 67–68; `22 - ToBoolean Coercion.md`

```ts
if (quantity) {
  submit();
}
```

Why it fails: `0`, `""`, `null`, `undefined`, and `NaN` can all collapse into `false`, even when the business rule needs to distinguish them.

Preferred direction: write the condition in terms of the actual rule.

---

## Anti-pattern 4 — Collapse missing `string | null` inputs into a fake numeric default without checking semantics

Source: browser/API string edges on page 68; coercion control on pages 62–68

```ts
const amount = Number(searchParams.get("amount") || 0);
```

Why it fails: this silently treats `null`, `""`, and an absent parameter as the same thing, which may not match the business rule.

Preferred direction: separate “missing” from numeric coercion, then normalize explicitly.

---

## Anti-pattern 5 — Solve object comparison with coercion tricks in this skill

Source: `javascript-hard-parts-v3-slides.pdf`, pages 69–92

```ts
if (+userStored === +userSubmitted) {
  // ...
}
```

or

```ts
userStored[Symbol.toPrimitive] = coerce;
```

Why it fails: once the issue is object identity, object-to-primitive coercion, or `Symbol.toPrimitive`, the task is no longer a local primitive-boundary hardening pass.

Preferred direction: route to a separate equality/metaprogramming workflow or keep it in vault/reference material.


## Anti-pattern 6 — Implement schema validation inside this skill just because the request mentions Zod

```ts
import { z } from "zod";
const PayloadSchema = z.object({ age: z.coerce.number() });
```

Why it fails: when the main job is validating or parsing `unknown` input, this is no longer a local coercion-boundary cleanup.

Preferred direction: route to validation/parsing work and stop instead of implementing the schema here.
