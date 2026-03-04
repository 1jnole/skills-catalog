# Mental model (sets)

- A type describes a set of allowed values.
- Assignability (x = y) is a subset check: values of y must fit inside the set of x.
- Literal types are singletons (e.g. "success" is a set with one member).
- | is union (set includes members of both); & is intersection (set includes only members common to both).
- Narrowing is set reduction via control flow: a check removes impossible members for a branch.
- When writing guards/branching, ensure the check is honest: it really reduces the set (avoid “lying” to the compiler).
