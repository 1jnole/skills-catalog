# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## Mirror DOM props (`ComponentPropsWithoutRef<'button'>`)

**Source:** `lessons-p2/lessons-p2/mirror-dom-props.md`

```tsx
import { ComponentPropsWithoutRef } from 'react';

// ✅ Good - get all button props automatically
interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = `btn ${variantClass} ${sizeClass} ${className || ''}`.trim();

  return <button className={classes} {...props} />;
}
```

---

## forwardRef + displayName (HOC hygiene)

**Source:** `lessons-p2/lessons-p2/forwardref-memo-and-displayname.md`

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...props }, ref) => (
  <button ref={ref} {...props}>
    {children}
  </button>
));

// ✅ Always set displayName for HOCs
Button.displayName = 'Button';

// With memo, it gets trickier:
const MemoizedButton = memo(Button);
MemoizedButton.displayName = 'memo(Button)';
```

---

## Polymorphic component props (`as`)

**Source:** `lessons-p3/lessons-pt3/polymorphic-components-and-as-prop.md`

```tsx
type PolymorphicComponentProps<T extends ElementType, Props = {}> = Props & {
  as?: T;
} & ComponentPropsWithoutRef<T>;

type PolymorphicRef<T extends ElementType> = React.ComponentPropsWithRef<T>['ref'];

type PolymorphicComponent<DefaultElement extends ElementType, Props = {}> = <
  T extends ElementType = DefaultElement,
>(
  props: PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> },
) => React.ReactElement | null;
```

---
