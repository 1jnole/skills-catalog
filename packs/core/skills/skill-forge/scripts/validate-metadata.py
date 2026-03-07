#!/usr/bin/env python3
import argparse
import re
import sys


def validate_metadata(name: str, description: str) -> int:
    errors = []

    if not name:
        errors.append("NAME ERROR: name is required.")
    elif not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name):
        errors.append(
            "NAME ERROR: use lowercase kebab-case with letters, numbers, and single hyphens only."
        )

    if not description.strip():
        errors.append("DESCRIPTION ERROR: description is required.")

    if len(description) > 1024:
        errors.append(
            f"DESCRIPTION ERROR: description is {len(description)} characters; keep it at or below 1024."
        )

    lowered = description.lower()
    if "use when" not in lowered:
        errors.append("DESCRIPTION WARNING: include a 'Use when ...' clause to improve routing.")
    if "don't use when" not in lowered and "do not use when" not in lowered:
        errors.append("DESCRIPTION WARNING: include a negative trigger such as 'Don't use when ...'.")

    if errors:
        print("
".join(errors), file=sys.stderr)
        return 1

    print("SUCCESS: metadata is valid.")
    return 0


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", required=True)
    parser.add_argument("--description", required=True)
    args = parser.parse_args()
    raise SystemExit(validate_metadata(args.name, args.description))


if __name__ == "__main__":
    main()
