import type { LogEntry } from './storage'

export interface Badge {
  id: string
  label: string
  description: string
  unlocked: boolean
}

/** Consecutive days trained, counting back from today (or yesterday, if today has no session yet). */
export function currentStreak(sessionDatesDesc: string[]): number {
  if (sessionDatesDesc.length === 0) return 0
  const dayMs = 24 * 60 * 60 * 1000
  const set = new Set(sessionDatesDesc)
  let cursor = new Date(new Date().toISOString().slice(0, 10)).getTime()
  if (!set.has(new Date(cursor).toISOString().slice(0, 10))) cursor -= dayMs

  let streak = 0
  while (set.has(new Date(cursor).toISOString().slice(0, 10))) {
    streak++
    cursor -= dayMs
  }
  return streak
}

export function computeBadges(
  logs: LogEntry[],
  records: Record<string, { est1rm: number; weight: number }>,
  sessionDatesDesc: string[],
): Badge[] {
  const sessionCount = sessionDatesDesc.length
  const prCount = Object.keys(records).length
  const streak = currentStreak(sessionDatesDesc)
  const centuryLift = Object.values(records).some((r) => r.weight >= 100)

  return [
    { id: 'first-log', label: 'First Log', description: 'Log your first set.', unlocked: logs.length >= 1 },
    { id: 'ten-sessions', label: '10 Sessions', description: 'Log 10 distinct training days.', unlocked: sessionCount >= 10 },
    { id: 'fifty-sessions', label: '50 Sessions', description: 'Log 50 distinct training days.', unlocked: sessionCount >= 50 },
    { id: 'first-pr', label: 'First PR', description: 'Set your first personal record.', unlocked: prCount >= 1 },
    { id: 'five-prs', label: '5 PRs', description: 'Set personal records on 5 different lifts.', unlocked: prCount >= 5 },
    { id: 'century-club', label: 'Century Club', description: 'Log 100kg or more on any single lift.', unlocked: centuryLift },
    { id: 'week-streak', label: '7-Day Streak', description: 'Train 7 days in a row.', unlocked: streak >= 7 },
    { id: 'month-streak', label: '30-Day Streak', description: 'Train 30 days in a row.', unlocked: streak >= 30 },
  ]
}
