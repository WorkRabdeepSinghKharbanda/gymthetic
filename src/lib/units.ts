import type { Unit } from './storage'

const KG_PER_LB = 0.453592

export function kgToLb(kg: number): number {
  return kg / KG_PER_LB
}

export function lbToKg(lb: number): number {
  return lb * KG_PER_LB
}

export function formatWeight(kg: number, unit: Unit): string {
  const value = unit === 'lb' ? kgToLb(kg) : kg
  return `${Math.round(value * 10) / 10}${unit}`
}
