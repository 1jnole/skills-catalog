# Patterns

## P-01 — Object shape contracts (optional props + extra property checking)
Kind: pattern

```ts twoslash
function printCar(car: {
  make: string
  model: string
  year: number
  chargeVoltage?: number
}) {
  let str = `${car.make} ${car.model} (${car.year})`
  car.chargeVoltage
  //    ^?
  if (typeof car.chargeVoltage !== "undefined")
    str += `// ${car.chargeVoltage}v`
  //                 ^?
  console.log(str)
}
```

```ts twoslash
// @errors: 2345 2353
function printCar(car: {
  make: string
  model: string
  year: number
  chargeVoltage?: number
}) {
  // implementation removed for simplicity
}

printCar({
  make: "Tesla",
  model: "Model 3",
  year: 2020,
  color: "RED", // <0------ EXTRA PROPERTY
})
```

## P-02 — Dictionary/map objects (index signatures)
Kind: pattern

```ts twoslash
const phones: {
  [k: string]: {
    country: string
    area: string
    number: string
  }
} = {}

phones.fax
//     ^?
```

## P-03 — Fixed-position arrays (tuples)
Kind: pattern

```ts twoslash
// Source
const numPair: [number, number] = [4, 5];
```

## P-04 — Structural typing / assignability
Kind: pattern

```ts twoslash
// @strictPropertyInitialization: false
class Car {
  make: string
  model: string
  year: number
  isElectric: boolean
}

class Truck {
  make: string
  model: string
  year: number
  towingCapacity: number
}

const vehicle = {
  make: "Honda",
  model: "Accord",
  year: 2017,
}

function printCar(car: {
  make: string
  model: string
  year: number
}) {
  console.log(`${car.make} ${car.model} (${car.year})`)
}

printCar(new Car()) // Fine
printCar(new Truck()) // Fine
printCar(vehicle) // Fine
```

## P-05 — Interfaces vs type aliases (extends vs intersections)
Kind: pattern

```ts twoslash
interface Animal {
  isAlive(): boolean
}
interface Mammal extends Animal {
  getFurOrHairColor(): string
}
interface Hamster extends Mammal {
  squeak(): string
}
function careForHamster(h: Hamster) {
  h.getFurOrHairColor()
  //   ^?
  h.squeak()
  //   ^?
}
```

```ts twoslash
// @noErrors
type SpecialDate = Date & { getDescription(): string }

const newYearsEve: SpecialDate = Object.assign(
    new Date(),
    { getDescription: () => "Last day of the year" }
  )
newYearsEve.getD
//              ^|
```

## P-06 — Callable shapes (call signatures, this parameter, void callbacks)
Kind: pattern

```ts twoslash
interface TwoNumberCalculation {
  (x: number, y: number): number
}

type TwoNumberCalc = (x: number, y: number) => number

const add: TwoNumberCalculation = (a, b) => a + b
//                                 ^?
const subtract: TwoNumberCalc = (x, y) => x - y
//                               ^?
```

```ts twoslash
// @errors: 2684 2684
function myClickHandler(
  this: HTMLButtonElement,
  event: Event
) {
  this.disabled = true
  //   ^?
}

myClickHandler(new Event("click")) // seems no longer ok
```

```ts twoslash
// @errors: 2322
function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000)
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000)
}

const values: number[] = []
invokeInFourSeconds(() => values.push(4))
invokeInFiveSeconds(() => values.push(4))
```

## P-07 — Type validation via `satisfies` without losing inference
Kind: pattern

```ts twoslash
type DateLike = Date | number | string;

type Holidays = {
  [k: string]: DateLike
}

const usHolidays = {
  independenceDay: "July 4, 2024",
  memorialDay: new Date("May 27, 2024"),
  laborDay: 1725260400000, // September 2, 2024
} satisfies Holidays

usHolidays
// ^?

```
