# catalog — data fetching routes

- Effect-driven: `useEffect` + `Loadable<T>`
- Suspense-driven: pass `Promise<T>` and consume with `use()`

## Race safety
- cleanup flag for stale updates
- `AbortController` for true cancellation
