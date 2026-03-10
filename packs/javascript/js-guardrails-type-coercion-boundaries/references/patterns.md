# Patterns — Explicit coercion at boundaries

## Pattern 1 — Coerce numeric inputs before math and `+`

Source: `javascript-hard-parts-v3-slides.pdf`, pages 60–63; `21 - Math Operator Type Coercion.md`

### Before
```ts
const price = 7;
let quantity; // DOM gives "3"
let donation; // DOM gives "10"

function onSubmit() {
  const total = price * quantity + donation;
  return total;
}
```

### After
```ts
const price = 7;
let quantity; // DOM gives "3"
let donation; // DOM gives "10"

function onSubmit() {
  const quantityNumber = Number(quantity);
  const donationNumber = Number(donation);
  const total = price * quantityNumber + donationNumber;
  return total;
}
```

Why: `*` coerces to number, but `+` concatenates if either side is still a string.

---

## Pattern 2 — Normalize first, then use strict equality

Source: `javascript-hard-parts-v3-slides.pdf`, pages 65–68; `23 - Coercion Rules and Operators.md`

### Before
```ts
function onSubmit(donation) {
  if (donation == 0) {
    return "0 donation, no problem";
  }

  return "Want to donate?";
}
```

### After
```ts
function onSubmit(donation) {
  const donationAmount = Number(donation);

  if (donationAmount === 0) {
    return "0 donation, no problem";
  }

  return "Want to donate?";
}
```

Why: once the intended type is explicit, `===` is predictable and `==` is no longer needed.

---

## Pattern 3 — Make conditional intent explicit when empty values matter

Source: `javascript-hard-parts-v3-slides.pdf`, pages 64, 67–68; `22 - ToBoolean Coercion.md`

### Before
```ts
function canSubmit(quantity) {
  return !!quantity;
}
```

### After
```ts
function canSubmit(quantity) {
  const hasQuantityInput = quantity !== "";
  const quantityNumber = Number(quantity);

  return hasQuantityInput && quantityNumber > 0;
}
```

Why: truthiness collapses different cases (`""`, `0`, `null`, `undefined`, `NaN`) into a single boolean result. Make the business rule explicit instead.

---

## Pattern 4 — Make string output explicit

Source: `javascript-hard-parts-v3-slides.pdf`, pages 62, 67–68

### Before
```ts
const label = count + " items";
```

### After
```ts
const label = `${count} items`;
```

Why: if the code wants a string, create one intentionally instead of depending on implicit `ToString`.

---

## Pattern 5 — Keep `string | null` boundaries explicit

Source: `javascript-hard-parts-v3-slides.pdf`, pages 62–68; browser/API string edges on page 68

### Before
```ts
const amount = searchParams.get("amount");
if (amount) {
  total += amount;
}
```

### After
```ts
const amountRaw = searchParams.get("amount");
const hasAmount = amountRaw !== null && amountRaw !== "";

if (hasAmount) {
  const amount = Number(amountRaw);
  total += amount;
}
```

Why: boundary APIs such as `URLSearchParams.get(...)` and `localStorage.getItem(...)` can return `string | null`. Decide “missing” separately from numeric coercion.


## Pattern 6 — Stop when missing-value semantics are unclear

### Before
```ts
const page = searchParams.get("page");
const nextPage = page + 1;
```

### After
```ts
const rawPage = searchParams.get("page");

if (rawPage == null) {
  // need clarification: does missing page mean 0, 1, null, or an error?
}
```

Why: for `string | null` boundaries, a small local fix must not erase the distinction between missing, empty, and zero values unless the business rule already defines it.
