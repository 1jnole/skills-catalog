# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## Don'ts in tests (any, implementation details, etc.)

**Source:** `lessons-p5/lessons-p5/typescript-react-testing.md`

```typescript
// ❌ Don't use any in tests
const mockFn = jest.fn<any, any>();

// ❌ Don't test implementation details
expect(component.state.isOpen).toBe(true);

// ❌ Don't use container queries when better options exist
container.querySelector('.btn-primary');

// ❌ Don't forget to cleanup
// Always use cleanup or let Testing Library handle it

// ❌ Don't ignore TypeScript errors in tests
// @ts-ignore
expect(invalidCall()).toBe(true);
```

---
