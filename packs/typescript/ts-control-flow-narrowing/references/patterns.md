# Patterns

## P-01 — Tagged/discriminated union branching (success/error tuple tag)
Kind: pattern

```ts twoslash
function maybeGetUserInfo():
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (Math.random() > 0.5) {
    return [
      "success",
      { name: "Mike North", email: "mike@example.com" },
    ]
  } else {
    return [
      "error",
      new Error("The coin landed on TAILS :("),
    ]
  }
}
/// ---cut---
const outcome = maybeGetUserInfo()
//       ^?
if (outcome[0] === "error") {
  outcome
  // ^?
} else {
  outcome
  // ^?
}
```

## P-02 — Control-flow narrowing toolbox (typeof/instanceof/in/Array.isArray)
Kind: pattern

```ts twoslash
let value:
  | Date
  | null
  | undefined
  | "pineapple"
  | [number]
  | { dateRange: [Date, Date] }

// instanceof
if (value instanceof Date) {
  value
  // ^?
}
// typeof
else if (typeof value === "string") {
  value
  // ^?
}
// Specific value check
else if (value === null) {
  value
  // ^?
}
// Truthy/falsy check
else if (!value) {
  value
  // ^?
}
// Some built-in functions
else if (Array.isArray(value)) {
  value
  // ^?
}
// Property presence check
else if ("dateRange" in value) {
  value
  // ^?
} else {
  value
  // ^?
}
```

## P-03 — User-defined type guard with type predicate
Kind: pattern

```ts twoslash
interface CarLike {
  make: string
  model: string
  year: number
}

let maybeCar: any

// the guard
function isCarLike(
  valueToTest: any
): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  )
}

// using the guard
if (isCarLike(maybeCar)) {
  maybeCar
  // ^?
}
```

## P-04 — Assertion function (asserts) for narrowing after throwing
Kind: pattern

```ts twoslash
interface CarLike {
  make: string
  model: string
  year: number
}

let maybeCar: any

// the guard
function assertsIsCarLike(
  valueToTest: any
): asserts valueToTest is CarLike {
  if (
    !(
      valueToTest &&
      typeof valueToTest === "object" &&
      "make" in valueToTest &&
      typeof valueToTest["make"] === "string" &&
      "model" in valueToTest &&
      typeof valueToTest["model"] === "string" &&
      "year" in valueToTest &&
      typeof valueToTest["year"] === "number"
    )
  )
    throw new Error(
      `Value does not appear to be a CarLike${valueToTest}`
    )
}

// using the guard
maybeCar
// ^?
assertsIsCarLike(maybeCar)
maybeCar
// ^?
```

## P-05 — Brand check using private #field in class
Kind: pattern

```ts{7-16,21-23} twoslash
class Car {
  static #nextSerialNumber: number = 100
  static #generateSerialNumber() { return this.#nextSerialNumber++ }

  #serialNumber = Car.#generateSerialNumber()

  static isCar(other: any): other is Car {
    if (other && // is it truthy
      typeof other === "object" && // and an object
      #serialNumber in other) { // and we can find a private field that we can access from here
      // then it *must* be a car
      other
      // ^?
      return true
    }
    return false
  }
}

let val: any

if (Car.isCar(val)) {
  val
// ^?
}
```
