export function estimate1RM(weight: number, reps: number): number {
  if (reps <= 1) return weight
  return weight * (1 + reps / 30) // Epley formula
}

export function percentTable(oneRm: number): { percent: number; weight: number }[] {
  return [95, 90, 85, 80, 75, 70, 65, 60].map((percent) => ({
    percent,
    weight: Math.round(oneRm * (percent / 100)),
  }))
}

export type Sex = 'male' | 'female'
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
export type Goal = 'cut' | 'maintain' | 'bulk'

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

const GOAL_ADJUSTMENT: Record<Goal, number> = {
  cut: -0.2,
  maintain: 0,
  bulk: 0.15,
}

export function calcBMR(sex: Sex, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export function calcTDEE(bmr: number, activity: ActivityLevel): number {
  return bmr * ACTIVITY_MULTIPLIERS[activity]
}

export interface MacroResult {
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
}

export function calcMacros(tdee: number, goal: Goal, weightKg: number): MacroResult {
  const calories = Math.round(tdee * (1 + GOAL_ADJUSTMENT[goal]))
  const proteinG = Math.round(weightKg * 2.0) // ~2g/kg bodyweight
  const fatG = Math.round((calories * 0.25) / 9)
  const carbsG = Math.round((calories - proteinG * 4 - fatG * 9) / 4)
  return { calories, proteinG, carbsG, fatG: Math.max(fatG, 0), }
}

const AVAILABLE_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25]

/** Plates needed per side to hit target weight on a barbell, greedy largest-first. */
export function calcPlates(targetWeight: number, barWeight: number): { plates: number[]; achieved: number } {
  const perSide = Math.max((targetWeight - barWeight) / 2, 0)
  let remaining = perSide
  const plates: number[] = []
  for (const plate of AVAILABLE_PLATES) {
    while (remaining >= plate - 0.001) {
      plates.push(plate)
      remaining -= plate
    }
  }
  const achieved = barWeight + 2 * plates.reduce((sum, p) => sum + p, 0)
  return { plates, achieved }
}
