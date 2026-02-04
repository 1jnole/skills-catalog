# Brief: Quick Notes (feature)

We want to add a small "Quick Notes" feature to a web app.

## Requirements (v1)

- Users can create a note with: title (required) and body (optional).
- Users can edit an existing note.
- Users can delete a note.
- Notes are listed newest-first.
- Notes persist locally in the browser (localStorage). No backend.
- There is a simple search box to filter notes by title substring.
- Export: user can export all notes to a CSV file named `notes.csv`.
- Import: user can import notes from a CSV with columns `title` and `body`.
- Offline: when offline, creating/editing/deleting still works (because local).

## Non-requirements

- No user accounts.
- No sync.
- No new dependencies.
