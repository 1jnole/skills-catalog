# Guideline: explicit return types (strong guideline)

## What the course acknowledges
- TypeScript can infer return types well, and explicit return types are not required everywhere for code to compile.
- The instructor does not always write explicit return types in every example.

## Why explicit return types are recommended (strong guideline)
Use explicit return types especially for **exported/public functions** and **callbacks** to:

1) Surface errors at the declaration  
   - When return types are inferred, a breaking change often shows up at call sites (ripple effects).
   - With an explicit return type, the mismatch surfaces at the function declaration.

2) Act as a design contract  
   - The return type is an explicit boundary of intent for callers.

3) Reduce “ripple effects”  
   - Inference can be permissive; accidental changes can propagate type changes silently across the codebase.
