# Catalog — js-guardrails-non-mutating-array-updates

Use this skill for a **pre-flight guardrail pass** when JS/TS code is about to change array contents or ordering and the same array value may be reused elsewhere.

## Route here when
- the bug comes from `sort`, `reverse`, `splice`, `push`, `pop`, `shift`, `unshift`, or direct index writes on arrays used for display or derived data;
- a selector, reducer, prop, or helper should preserve the original array;
- the correct fix is a small local non-mutating rewrite.

## Route elsewhere when
- mutation is part of an explicit local contract;
- the main decision is runtime compatibility strategy or polyfills for modern array-copying methods;
- the work is broader state architecture or performance design.
