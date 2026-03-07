# catalog — state shape routing

| Scenario | Pattern |
|---|---|
| Async data | `loading | error | ready` union |
| Mutually exclusive modes | tagged union with payload |
| Complex transitions | `useReducer` + action union |

## Output checklist
- [ ] single tag drives UI
- [ ] transitions explicit
- [ ] exhaustive branching
