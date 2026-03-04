
#!/usr/bin/env python3
import argparse
import re
import sys


def validate_metadata(name: str, description: str) -> None:
    errors = []

    # 1) Name length
    if not (1 <= len(name) <= 64):
        errors.append(f"NAME ERROR: '{name}' is {len(name)} characters. Must be between 1-64.")

    # 2) Name characters
    if not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", name):
        errors.append(
            f"NAME ERROR: '{name}' contains invalid characters. "
            "Use only lowercase letters, numbers, and single hyphens. "
            "No consecutive hyphens, and cannot start/end with a hyphen."
        )

    # 3) Description length
    if len(description) > 1024:
        errors.append(
            f"DESCRIPTION ERROR: Description is {len(description)} characters. "
            "Must be 1,024 characters or fewer."
        )

    # 4) Style warning (heuristic)
    first_person_words = {"i", "me", "my", "we", "our", "you", "your"}
    desc_words = set(re.findall(r"\b\w+\b", description.lower()))
    found_forbidden = first_person_words.intersection(desc_words)
    if found_forbidden:
        errors.append(
            f"STYLE WARNING: Description contains first/second person terms: {found_forbidden}. "
            "Prefer third-person capability phrasing (e.g., 'Creates…', 'Updates…')."
        )

    if errors:
        print("\n".join(errors), file=sys.stderr)
        raise SystemExit(1)

    print("SUCCESS: Metadata is valid and optimized for discovery.")
    raise SystemExit(0)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--name", required=True)
    ap.add_argument("--description", required=True)
    args = ap.parse_args()
    validate_metadata(args.name, args.description)


if __name__ == "__main__":
    main()
