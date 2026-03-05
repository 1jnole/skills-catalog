# Patterns — Explicit coercion

## Pattern: Coerce once at the boundary
```js
// Before
const total = price * quantity + donation;

// After (explicit numeric intent)
const qty = Number(quantity);
const don = Number(donation);
const total = price * qty + don;
```

## Pattern: Fix '+' ambiguity
```js
// Before (can concatenate)
const total = price + quantity;

// After
const total = Number(price) + Number(quantity);
```

## Pattern: Replace ambiguous conditionals
```js
// Before (0 is falsy)
if (quantity) submit(quantity);

// After (explicit)
if (quantity !== "" && quantity != null) submit(Number(quantity));
```

## Pattern: Prefer strict equality after coercion
```js
// Before
if (donation == 0) { ... }

// After
const don = Number(donation);
if (don === 0) { ... }
```
