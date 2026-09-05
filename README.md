# Gymthetic

Gym knowledge site: exercise library (push/pull/legs, by muscle group), strength
calculators (1RM, TDEE/macros, plateau breaker), and a localStorage-based
personal progress tracker.

## Stack

Vite + React + TypeScript + Tailwind CSS v4 + React Router. No backend —
progress data lives in the browser's localStorage (export/import JSON to back it up).

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
