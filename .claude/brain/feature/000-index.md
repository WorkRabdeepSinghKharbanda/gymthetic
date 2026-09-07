# Feature Inventory

Living index of every route/feature in Gymthetic. **Source of truth: `src/App.tsx`**
(the `<Routes>` list). If this index ever disagrees with `src/App.tsx`, regenerate
these files from `src/App.tsx` — it wins.

| # | Feature | Route | Category |
|---|---------|-------|----------|
| 001 | [Home](001-home.md) | `/` | Content |
| 002 | [Exercise Library](002-exercise-library.md) | `/exercises` | Content |
| 003 | [Exercise Detail](003-exercise-detail.md) | `/exercises/:slug` | Content |
| 004 | [Calculators Hub](004-calculators-hub.md) | `/calculators` | Calculators |
| 005 | [1RM Calculator](005-one-rep-max-calculator.md) | `/calculators/one-rep-max` | Calculators |
| 006 | [TDEE & Macro Calculator](006-tdee-calculator.md) | `/calculators/tdee` | Calculators |
| 007 | [Plateau Breaker](007-plateau-breaker.md) | `/calculators/plateau-breaker` | Calculators |
| 008 | [Plate Calculator](008-plate-calculator.md) | `/calculators/plates` | Calculators |
| 009 | [Progress Tracker](009-progress-tracker.md) | `/tracker` | Tracking |
| 010 | [Personal Records](010-personal-records.md) | `/records` | Tracking |
| 011 | [Privacy Policy](011-privacy-policy.md) | `/privacy` | Content |
| 012 | [Warm-up Calculator](012-warmup-calculator.md) | `/calculators/warmup` | Calculators |
| 013 | [Body Measurements](013-body-measurements.md) | `/measurements` | Tracking |
| 014 | [Goals](014-goals.md) | `/goals` | Tracking |
| 015 | [Workout Templates](015-workout-templates.md) | `/templates` | Tracking |
| 016 | [Badges](016-badges.md) | `/badges` | Tracking |
| 017 | [Strength Standards](017-strength-standards.md) | `/standards` | Tracking |
| 018 | [Guides Hub](018-guides-hub.md) | `/guides` | Content |
| 019 | [Guide: Push Pull Legs](019-guide-ppl.md) | `/guides/push-pull-legs-split` | Content |
| 020 | [Guide: How to Calculate 1RM](020-guide-1rm.md) | `/guides/how-to-calculate-your-1rm` | Content |
| 021 | [Guide: Breaking a Plateau](021-guide-plateau.md) | `/guides/breaking-a-strength-plateau` | Content |

## Regenerating

1. Read `src/App.tsx` for the current route list.
2. For any route missing a file here, add `NNN-{kebab-name}.md` with route,
   category, one-line description.
3. For any file here whose route no longer exists in `src/App.tsx`, delete it
   and remove its row above.
4. Renumber only if you're rebuilding the whole set — otherwise keep existing
   numbers stable so links elsewhere don't rot.

## Keeping this in sync

Whenever a new feature/route ships, add its brain file and index row in the
**same change** — see `.claude/rules/brain-sync.md`. Don't let this index lag
behind `src/App.tsx`.
