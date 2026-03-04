---
name: "<skill-name>"
description: "<Third-person capability description. <=1024 chars. Include positive + negative triggers.>"
---

# <Skill Title>

## Procedures

Step 1: <Phase name>
1) <Imperative instruction (third-person), e.g. "Scan the repo for …">
2) <Just-in-time load: "Read `references/<file>.md` for …">
3) <If deterministic work is required, run a tiny CLI from `scripts/`, e.g. `python scripts/<script>.py …`>

Step 2: <Phase name>
1) <Conditional branch, e.g. "If X, do A. Otherwise, skip to Step 3.">
2) <Use an asset template, e.g. "Use `assets/<template>.md` as the output skeleton.">
3) <Produce the required artifacts with minimal diffs.>

## Error handling
- If `scripts/<script>.py` fails due to <known case>, perform <recovery step> or stop and ask for missing context.
- If <condition> occurs, read `references/<troubleshooting>.md` (one level deep) and follow remediation.
