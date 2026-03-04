# Patterns

## P-01 — Recursive “value domain” types (JSONValue)
Kind: pattern

```ts twoslash
// @errors: 2578
type JSONObject = any
type JSONArray = any
type JSONValue = any

////// DO NOT EDIT ANY CODE BELOW THIS LINE //////
function isJSON(arg: JSONValue) {}

// POSITIVE test cases (must pass)
isJSON("hello")
isJSON([4, 8, 15, 16, 23, 42])
isJSON({ greeting: "hello" })
isJSON(false)
isJSON(true)
isJSON(null)
isJSON({ a: { b: [2, 3, "foo"] } })

// NEGATIVE test cases (must fail)
// @ts-expect-error
isJSON(() => "")
// @ts-expect-error
isJSON(class {})
// @ts-expect-error
isJSON(undefined)
// @ts-expect-error
isJSON(BigInt(143))
// @ts-expect-error
isJSON(isJSON)
```

## P-02 — Derive types with `keyof` / `typeof` / indexed access
Kind: pattern

```ts twoslash
type DatePropertyNames = keyof Date
//     ^?
```

```ts twoslash
async function main() {
  const apiResponse = await Promise.all([
    fetch("https://example.com"),
    Promise.resolve("Titanium White"),
  ])

  type ApiResponseType = typeof apiResponse
  //    ^?
}
```

```ts twoslash
interface Car {
  make: string
  model: string
  year: number
  color: {
    red: string
    green: string
    blue: string
  }
}
/// ---cut---
let carColorRedComponent: Car["color"]["red"]
//     ^?
```

## P-03 — Type registry via module augmentation
Kind: pattern

```ts
declare module "./lib/registry" {

}
```

## P-04 — Generic helper functions (preserve types across input/output)
Kind: pattern

```ts
function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {}
  return dict
}
```

```ts twoslash
function wrapInArray<T>(arg: T): [T] {
  //       ^?
  return [arg]
}
```

## P-05 — Dictionary map/filter/reduce patterns
Kind: pattern

```ts twoslash
/////////////////////////////////////////
/////////// TESTING UTILITIES ///////////
//////// no need to modify these ////////
/////////////////////////////////////////
// @errors: 7006 7006 7006 7006 7006
console.clear()

function assertEquals<T>(
  found: T,
  expected: T,
  message: string
) {
  if (found !== expected)
    throw new Error(
      `❌ Assertion failed: ${message}\nexpected: ${expected}\nfound: ${found}`
    )
  console.log(`✅ OK ${message}`)
}

function assertOk(value: any, message: string) {
  if (!value)
    throw new Error(`❌ Assertion failed: ${message}`)
  console.log(`✅ OK ${message}`)
}
/// ---cut---

///// SAMPLE DATA FOR YOUR EXPERIMENTATION PLEASURE (do not modify)
const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
}

interface Dict<T> {
  [k: string]: T
}

// Array.prototype.map, but for Dict
function mapDict(...args: any[]): any {}
// Array.prototype.filter, but for Dict
function filterDict(...args: any[]): any {}
// Array.prototype.reduce, but for Dict
function reduceDict(...args: any[]): any {}

/////////////////////////////////////////
///////////// TEST SUITE ///////////////
//////// no need to modify these ////////
/////////////////////////////////////////

// MAP
const fruitsWithKgMass = mapDict(fruits, (fruit, name) => ({
  ...fruit,
  kg: 0.001 * fruit.mass,
  name,
}))
const lemonName: string = fruitsWithKgMass.lemon.name
// @ts-ignore-error
const failLemonName: number = fruitsWithKgMass.lemon.name
assertOk(
  fruitsWithKgMass,
  "[MAP] mapDict returns something truthy"
)
assertEquals(
  fruitsWithKgMass.cherry.name,
  "cherry",
  '[MAP] .cherry has a "name" property with value "cherry"'
)
assertEquals(
  fruitsWithKgMass.cherry.kg,
  0.005,
  '[MAP] .cherry has a "kg" property with value 0.005'
)
assertEquals(
  fruitsWithKgMass.cherry.mass,
  5,
  '[MAP] .cherry has a "mass" property with value 5'
)
assertEquals(
  Object.keys(fruitsWithKgMass).length,
  8,
  "[MAP] fruitsWithKgMass should have 8 keys"
)

// FILTER
// only red fruits
const redFruits = filterDict(
  fruits,
  (fruit) => fruit.color === "red"
)
assertOk(
  redFruits,
  "[FILTER] filterDict returns something truthy"
)
assertEquals(
  Object.keys(redFruits).length,
  4,
  "[FILTER] 4 fruits that satisfy the filter"
)
assertEquals(
  Object.keys(redFruits).sort().join(", "),
  "apple, cherry, grape, raspberry",
  '[FILTER] Keys are "apple, cherry, grape, raspberry"'
)

// REDUCE
// If we had one of each fruit, how much would the total mass be?
const oneOfEachFruitMass = reduceDict(
  fruits,
  (currentMass, fruit) => currentMass + fruit.mass,
  0
)
assertOk(
  redFruits,
  "[REDUCE] reduceDict returns something truthy"
)
assertEquals(
  typeof oneOfEachFruitMass,
  "number",
  "[REDUCE] reduceDict returns a number"
)
assertEquals(
  oneOfEachFruitMass,
  817,
  "[REDUCE] 817g mass if we had one of each fruit"
)
```
