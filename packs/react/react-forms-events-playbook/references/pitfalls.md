# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Pitfall: setting number state from string input

**Source:** `lessons-p2/lessons-p2/forms-events-and-number-inputs.md`

```tsx
// ❌ This will bite you eventually
const [age, setAge] = useState<number>(0);

const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
  setAge(e.target.value); // Type error: string is not assignable to number
};
```

---

## React TS don'ts (event handlers + any)

**Source:** `lessons-p4/lessons-p4/typescript-react-patterns.md`

```typescript
// ❌ Don't use React.FC unnecessarily
const Component: React.FC = () => { };

// ❌ Don't use any for event handlers
onClick={(e: any) => { }}

// ❌ Don't forget display names on forwardRef
const Input = forwardRef((props, ref) => { });
// Input.displayName = 'Input'; // Don't forget this!

// ❌ Don't overuse type assertions
const element = document.getElementById('id') as HTMLInputElement; // Dangerous!

// ❌ Don't ignore TypeScript errors in components
// @ts-ignore // Never do this in components!
```

---
