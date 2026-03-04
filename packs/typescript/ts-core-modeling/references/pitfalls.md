# Pitfalls

## X-01 — Extra property checking error snippet (anti-example)
Kind: pitfall

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
