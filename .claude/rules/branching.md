---
protected_branches: ["archive"]
---

# Branching strategy

Personal solo project. No feature-branch/PR workflow — commits go straight to `master`.

## Deploy

After every push to `master`, run the deploy CLI directly from the terminal —
don't rely solely on Vercel's git-integration auto-deploy:

```
npx vercel --prod --yes
```

This repo is linked to the `gymthetic` Vercel project (see `.vercel/project.json`
if present). Run this from the repo root after each push.
