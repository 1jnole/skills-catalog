# patterns — source-backed recipes (Before/After when available)

All code blocks below are copied verbatim from the provided course sources.

---

## Number input handling (coerce string → number)

**Source:** `lessons-p2/lessons-p2/forms-events-and-number-inputs.md`

```tsx
const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value === '' ? 0 : Number(e.target.value);
  setAge(value);
};
```

---

## Generic form handler factory (typed events)

**Source:** `lessons-p5/lessons-p5/typing-dom-and-react-events.md`

```ts
import { ChangeEvent } from 'react';

// ✅ Generic handler that works with any form element
function createFormHandler<T extends HTMLElement>(
  callback: (name: string, value: string) => void
) {
  return (event: ChangeEvent<T>) => {
    const target = event.currentTarget;
    const name = target.getAttribute('name') || '';

    // Handle different element types
    let value = '';
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      value = target.value;
    } else if (target instanceof HTMLSelectElement) {
      value = target.value;
    }

    callback(name, value);
  };
}

## Typed Event Helpers and Overloads

Sometimes you want ergonomic handlers that accept either raw events or pre-extracted values. You can model this with function overloads while keeping call sites clean.
```

---

## Typed login form handlers (ChangeEvent/FormEvent)

**Source:** `lessons-p5/lessons-p5/typing-dom-and-react-events.md`

```ts
import { FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';

interface FormData {
  username: string;
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    console.log('Focused:', event.currentTarget.name);
    // Maybe clear validation errors for this field
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    console.log('Blurred:', event.currentTarget.name);
    // Maybe validate this field
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

---
