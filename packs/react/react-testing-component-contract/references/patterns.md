# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## Testing Library `render` wrapper (test-utils)

**Source:** `lessons-p5/lessons-p5/typescript-react-testing.md`

```typescript
// test-utils.tsx
import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from './theme';
import { AuthProvider } from './auth';

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark';
  user?: User | null;
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
): RenderResult {
  const { theme = 'light', user = null, ...renderOptions } = options ?? {};

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider user={user}>
          {children}
        </AuthProvider>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Type-safe queries
export function getByTestId<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  testId: string
): T {
  const element = container.querySelector<T>(`[data-testid="${testId}"]`);
  if (!element) {
    throw new Error(`Element with testId "${testId}" not found`);
  }
  return element;
}
```

---

## Type-level tests with `expectTypeOf`

**Source:** `lessons-p4/lessons-p4/type-level-testing-in-practice.md`

```ts
// vitest + expectTypeOf
import { expectTypeOf, describe, it } from 'vitest';

type Foo<T> = { value: T };

describe('Foo', () => {
  it('preserves generic', () => {
    const x: Foo<number> = { value: 42 };
    expectTypeOf(x.value).toEqualTypeOf<number>();
  });
});
```

---
