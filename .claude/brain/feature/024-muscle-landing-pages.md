---
route: /best-chest-exercises, /best-back-exercises, /best-shoulder-exercises, /best-leg-exercises, /best-bicep-exercises, /best-tricep-exercises, /best-core-exercises, /best-forearm-exercises
entry_point: src/pages/MuscleLanding.tsx
category: Content
---

One shared component (`<MuscleLanding group="Chest" />` etc.) rendering an SEO landing page per
muscle group — intro copy from src/data/muscleLandingCopy.ts, full exercise list for that group,
ItemList JSON-LD. To add a 9th muscle group: add a copy entry + one `<Route>` in App.tsx, no new component.
