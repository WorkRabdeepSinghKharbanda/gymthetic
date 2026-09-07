import type { MuscleGroup } from './exercises'

export interface MuscleLandingCopy {
  group: MuscleGroup
  slug: string
  title: string
  intro: string
}

export const MUSCLE_LANDING_COPY: MuscleLandingCopy[] = [
  {
    group: 'Chest',
    slug: 'best-chest-exercises',
    title: 'Best Chest Exercises for Size and Strength',
    intro: 'A well-built chest program mixes a heavy horizontal press, an incline angle to hit the upper fibers, and an isolation move for a stretch under load. These are the chest exercises worth building a program around.',
  },
  {
    group: 'Back',
    slug: 'best-back-exercises',
    title: 'Best Back Exercises for a Wider, Stronger Back',
    intro: 'Back training needs both vertical pulling (width) and horizontal pulling (thickness). Skipping either leaves an obvious gap — these exercises cover both.',
  },
  {
    group: 'Shoulders',
    slug: 'best-shoulder-exercises',
    title: 'Best Shoulder Exercises for Size and Joint Health',
    intro: "Shoulders take a beating from every push and pull exercise you already do, so dedicated shoulder work should fill the gaps — lateral raises and rear-delt work most programs neglect — rather than pile on more pressing.",
  },
  {
    group: 'Legs',
    slug: 'best-leg-exercises',
    title: 'Best Leg Exercises for Strength and Size',
    intro: 'Legs are the biggest muscle group in the body and the easiest to under-train. A solid leg day covers a squat pattern, a hip-hinge pattern, and direct quad/hamstring/calf work.',
  },
  {
    group: 'Biceps',
    slug: 'best-bicep-exercises',
    title: 'Best Bicep Exercises for Arm Size',
    intro: "Biceps respond well to a mix of grips and angles — straight bar, neutral grip, and a stretched position each hit the muscle slightly differently. Rotate between them rather than running the same curl every session.",
  },
  {
    group: 'Triceps',
    slug: 'best-tricep-exercises',
    title: 'Best Tricep Exercises for Bigger Arms',
    intro: 'Triceps make up roughly two-thirds of upper-arm size, and they get real work from every pressing movement already in your program — direct work should add volume your presses aren\'t already covering.',
  },
  {
    group: 'Core',
    slug: 'best-core-exercises',
    title: 'Best Core Exercises for a Strong, Stable Midline',
    intro: "A strong core is about resisting movement (anti-extension, anti-rotation) at least as much as creating it. These exercises build the bracing strength that carries over to every other lift.",
  },
  {
    group: 'Forearms',
    slug: 'best-forearm-exercises',
    title: 'Best Forearm Exercises for Grip Strength',
    intro: "Forearms limit how much weight you can pull before your grip gives out. A few minutes of direct wrist and grip work each week raises that ceiling for every pulling exercise you do.",
  },
]

export function getMuscleLandingCopy(group: MuscleGroup): MuscleLandingCopy | undefined {
  return MUSCLE_LANDING_COPY.find((c) => c.group === group)
}
