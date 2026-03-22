## Design

This change is an implementation refinement, not a contract rewrite.

The existing `low-token-execution` contract already says to:
- keep one substantial unit active
- avoid renegotiating `done`
- prefer narrow verification first
- close or archive the current unit before opening the next

Dogfooding showed one high-value clarification that belongs in the implementation:
- when a closeout command fails because the target state is already applied or already clean, recover with the smallest deterministic reconciliation step and revalidate that closure, rather than reopening the plan or widening the task

The refinement stays within the approved contract because it does not:
- broaden trigger scope
- change `non-trigger` or `stop-and-ask` routing
- add new outputs or markers
- change eval/runtime behavior

It only sharpens the execution guidance for a concrete closeout edge case.
