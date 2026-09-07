export type StandardLevel = 'beginner' | 'novice' | 'intermediate' | 'advanced' | 'elite'

export const STANDARD_LEVELS: StandardLevel[] = ['beginner', 'novice', 'intermediate', 'advanced', 'elite']

export interface StandardLift {
  slug: string
  label: string
  multipliers: Record<StandardLevel, number>
}

/**
 * Rough, unisex estimated-1RM-to-bodyweight multipliers per level. Approximate figures
 * commonly cited for these lifts — not a substitute for gender/age-specific tables.
 */
export const STANDARD_LIFTS: StandardLift[] = [
  {
    slug: 'back-squat',
    label: 'Squat',
    multipliers: { beginner: 0.75, novice: 1, intermediate: 1.5, advanced: 2, elite: 2.5 },
  },
  {
    slug: 'barbell-bench-press',
    label: 'Bench Press',
    multipliers: { beginner: 0.5, novice: 0.75, intermediate: 1, advanced: 1.5, elite: 2 },
  },
  {
    slug: 'deadlift',
    label: 'Deadlift',
    multipliers: { beginner: 1, novice: 1.25, intermediate: 1.75, advanced: 2.25, elite: 2.75 },
  },
  {
    slug: 'overhead-press',
    label: 'Overhead Press',
    multipliers: { beginner: 0.35, novice: 0.55, intermediate: 0.75, advanced: 1, elite: 1.3 },
  },
]

export interface StandardResult {
  ratio: number
  level: StandardLevel | 'untrained'
  nextLevel: StandardLevel | null
  progressToNext: number
}

export function classifyStandard(est1rm: number, bodyweightKg: number, multipliers: Record<StandardLevel, number>): StandardResult {
  const ratio = bodyweightKg > 0 ? est1rm / bodyweightKg : 0
  let level: StandardLevel | 'untrained' = 'untrained'
  let levelIndex = -1
  STANDARD_LEVELS.forEach((lvl, i) => {
    if (ratio >= multipliers[lvl]) {
      level = lvl
      levelIndex = i
    }
  })

  const nextLevel = levelIndex + 1 < STANDARD_LEVELS.length ? STANDARD_LEVELS[levelIndex + 1] : null
  const prevThreshold = levelIndex >= 0 ? multipliers[STANDARD_LEVELS[levelIndex]] : 0
  const nextThreshold = nextLevel ? multipliers[nextLevel] : prevThreshold
  const span = nextThreshold - prevThreshold
  const progressToNext = nextLevel && span > 0 ? Math.min(100, Math.round(((ratio - prevThreshold) / span) * 100)) : 100

  return { ratio, level, nextLevel, progressToNext }
}
