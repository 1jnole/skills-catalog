# Pitfalls

## X-01 — Fake generics that smuggle `any` as `T` (anti-example)
Kind: pitfall

```ts twoslash
function returnAs<T>(arg: any): T {
  return arg // 🚨 an `any` that will _seem_ like a `T`
  //      ^?
}

// 🚨 DANGER! 🚨
const first = returnAs<number>(window)
//     ^?
const sameAs = window as any as number
//     ^?
```

## X-02 — Snippet annotated with // @errors (anti-example)
Kind: pitfall

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
