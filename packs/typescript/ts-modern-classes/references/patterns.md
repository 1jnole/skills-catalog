# Patterns

## P-01 — Static members and class-level state
Kind: pattern

```ts{2-4,10,19-21,23-27} twoslash
class Car {
  // Static stuff
  static nextSerialNumber = 100
  static generateSerialNumber() { return this.nextSerialNumber++ }

  // Instance stuff
  make: string
  model: string
  year: number
  serialNumber = Car.generateSerialNumber()
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
  getLabel() {
    return `${this.make} ${this.model} ${this.year} - #${this.serialNumber}`
  }
}
console.log( new Car("Honda", "Accord", 2017))
// > "Honda Accord 2017 - #100
console.log( new Car("Toyota", "Camry", 2022))
// > "Toyota Camry 2022 - #101
```

## P-02 — Static initialization blocks
Kind: pattern

```ts{5-12} twoslash
class Car {
  // Static stuff
  static nextSerialNumber: number
  static generateSerialNumber() { return this.nextSerialNumber++ }
  static {
      // `this` is the static scope
      fetch("https://api.example.com/vin_number_data")
          .then(response => response.json())
          .then(data => {
              this.nextSerialNumber = data.mostRecentInvoiceId + 1;
          })
  }
  // Instance stuff
  make: string
  model: string
  year: number
  serialNumber = Car.generateSerialNumber()
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
}
```

## P-03 — True privacy with `#` private fields
Kind: pattern

```ts{8,17} twoslash
// @errors: 18013 2564
class Car {
  private static nextSerialNumber: number
  private static generateSerialNumber() { return this.nextSerialNumber++ }

  make: string
  model: string
  year: number
  #serialNumber = Car.generateSerialNumber()

  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    this.year = year
  }
}
const c = new Car("Honda", "Accord", 2017)
c.#serialNumber
```

## P-04 — Constructor patterns in inheritance (`super`) + parameter properties
Kind: pattern

```ts twoslash
class Base {}

class Car extends Base {
  foo = console.log("class field initializer")
  constructor(public make: string) {
    super()
    console.log("custom constructor stuff")
  }
}

const c = new Car("honda")
```

## P-05 — Override discipline (`override` keyword)
Kind: pattern

```ts twoslash
// @errors: 4117
class Car {
  honk() {
    console.log("beep")
  }
}

class Truck extends Car {
  override hoonk() { // OOPS!
    console.log("BEEP")
  }
}

const t = new Truck();
t.honk(); // "beep"
```

## P-06 — Override enforcement (`@noImplicitOverride`)
Kind: pattern

```ts twoslash
// @errors: 4114
// @noImplicitOverride
class Car {
  honk() {
    console.log("beep")
  }
}

class Truck extends Car {
  honk() {
    console.log("BEEP")
  }
}

const t = new Truck();
t.honk(); // "BEEP"
```
