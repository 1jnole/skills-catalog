# Pitfalls

## X-01 — Misspelled override (anti-example, produces TS error)
Kind: pitfall

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

## X-02 — Snippet annotated with // @errors (anti-example)
Kind: pitfall

```ts{2-5,13-14} twoslash
// @errors: 2339 2345
// @noImplicitAny: true
class Car {
  make: string
  model: string
  year: number
  constructor(make: string, model: string, year: number) {
    this.make = make
    this.model = model
    //     ^?
    this.year = year
  }
}

let sedan = new Car("Honda", "Accord", 2017)
sedan.activateTurnSignal("left") // not safe!
new Car(2017, "Honda", "Accord") // not safe!
```
