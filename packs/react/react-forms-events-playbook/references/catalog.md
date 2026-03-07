# catalog — forms & events routing

| Task | Pattern |
|---|---|
| Text input | `ChangeEventHandler<HTMLInputElement>` + `currentTarget.value` |
| Checkbox | `currentTarget.checked` |
| Number input | explicit empty/invalid policy |
| Form submit | `FormEventHandler<HTMLFormElement>` + `preventDefault()` |

## Output checklist
- [ ] handler types match elements
- [ ] uses `currentTarget`
- [ ] coercion explicit
