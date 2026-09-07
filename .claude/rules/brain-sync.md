# Brain sync

Every time a feature/route ships (new page, new route in `src/App.tsx`), update
`.claude/brain/feature/` in the same change:

1. Add `NNN-{kebab-name}.md` (next number after the current highest) with
   `route`, `entry_point`, `category` frontmatter and a one-line description.
2. Add its row to the table in `.claude/brain/feature/000-index.md`.
3. If a route was removed, delete its brain file and index row instead.

Do this before committing — don't ship a route the brain doesn't know about.
