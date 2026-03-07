# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Bad polymorphic typing with `any`

**Source:** `lessons-p3/lessons-pt3/polymorphic-components-and-as-prop.md`

```tsx
// ❌ Don't do this
interface BadButtonProps {
  as?: string | React.ComponentType<any>; // Ugh, `any`
  children: React.ReactNode;
  onClick?: () => void;
  href?: string; // What if we're rendering a button?
  to?: string; // What if we're not using React Router?
  [key: string]: any; // More `any` sadness
}

const BadButton = ({ as: Component = 'button', children, ...props }: BadButtonProps) => {
  return <Component {...props}>{children}</Component>;
};
```

---

## React TS don'ts (FC/any/assertions/displayName)

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
