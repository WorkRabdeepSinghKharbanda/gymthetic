# Gymthetic

Gym knowledge site: exercise library, strength calculators, and a
localStorage-based personal progress tracker. Live at
[gymthetic.vercel.app](https://gymthetic.vercel.app).

## Stack

Vite + React + TypeScript + Tailwind CSS v4 + React Router. No backend —
all progress data lives in the browser's localStorage (export/import JSON
to back it up or move devices).

## Features

- **Exercise library** (`/exercises`) — 30 common gym lifts across 7 muscle
  groups, tagged push/pull/legs, with search and a favorites filter.
- **Exercise detail pages** — how-to steps, common mistakes, muscle-specific
  plateau-breaking tips, your logged PR for that lift, favorite toggle.
- **Calculators** (`/calculators`):
  - 1RM estimator (Epley formula) + a full %1RM training table
  - TDEE / macro calculator (Mifflin-St Jeor)
  - Plateau breaker — checklist and next steps scaled to how many weeks
    you've been stuck, plus lift-specific tips
  - Plate calculator — plates per side for a target barbell weight
- **Progress tracker** (`/tracker`) — log weight/reps/date/notes per lift,
  per-exercise 1RM trend chart, auto plateau detection, weekly training
  volume by muscle group, a consistency streak heatmap, a rest timer, and
  JSON export/import.
- **Personal records** (`/records`) — every lift ranked by best estimated 1RM.
- **Today's focus** (home page) — random exercise + rep scheme suggestion
  by muscle group.
- Dark/light theme toggle (persisted).

## Develop

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Deploy (Vercel)

```
npx vercel --prod
```

`vercel.json` rewrites all routes to `index.html` for client-side routing.

## Project structure

```
src/
  data/         static exercise DB + plateau rule data
  lib/          pure calculator functions, localStorage helpers
  hooks/        useTheme, useFavorites
  components/   shared UI (cards, nav, charts, timers)
  pages/        one file per route
```
