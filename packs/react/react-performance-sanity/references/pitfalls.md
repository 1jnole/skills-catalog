# pitfalls — source-backed failure modes

All code blocks below are copied verbatim from the provided course sources.

---

## ❌ Hidden perf issue: unstable values/props

**Source:** `lessons-p3/lessons-pt3/react-performance-with-typescript.md`

```tsx
// ❌ This looks fine but has hidden performance issues
interface UserProfileProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    preferences: {
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  onUpdate: (user: any) => void;
}

const UserProfile = React.memo(({ user, onUpdate }: UserProfileProps) => {
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <button onClick={() => onUpdate({ ...user, lastSeen: Date.now() })}>Update Last Seen</button>
    </div>
  );
});
```

---

## ❌ Pitfall: memoizing everything without measuring

**Source:** `lessons-p3/lessons-pt3/react-performance-with-typescript.md`

```tsx
// ❌ Bad: Memoizing everything without measuring
function SimpleComponent({ name }: { name: string }) {
  const memoizedName = useMemo(() => name.toUpperCase(), [name]);
  const memoizedStyle = useMemo(() => ({ color: 'blue' }), []);
  const memoizedCallback = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div style={memoizedStyle}>
      {memoizedName}
      <button onClick={memoizedCallback}>Click</button>
    </div>
  );
}

// ✅ Good: Only memoize when it provides value
function SimpleComponent({ name }: { name: string }) {
  // Simple transformations don't need memoization
  const displayName = name.toUpperCase();

  return (
    <div style={{ color: 'blue' }}>
      {displayName}
      <button onClick={() => console.log('clicked')}>Click</button>
    </div>
  );
}
```

---
