# catalog — component contract routing

| Scenario | Pattern |
|---|---|
| Fixed DOM wrapper | `ComponentPropsWithoutRef<"element">` + custom props |
| Invalid combinations | union-of-shapes + `never` |
| Mode-driven API | discriminated union (`mode`/`kind`) |
| Variants | literal union + default |
| Needs ref passthrough | `forwardRef<ElementRef<...>, Props>` |

## Output checklist
- [ ] correct DOM prop base type
- [ ] invalid combos encoded
- [ ] defaults explicit
- [ ] correct ref type
