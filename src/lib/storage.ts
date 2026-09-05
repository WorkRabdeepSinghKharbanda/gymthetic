export interface LogEntry {
  id: string
  exerciseSlug: string
  weight: number
  reps: number
  date: string // ISO date
}

const LOG_KEY = 'gymthetic.logs'
const THEME_KEY = 'gymthetic.theme'
const FAVORITES_KEY = 'gymthetic.favorites'

export function getLogs(): LogEntry[] {
  try {
    const raw = localStorage.getItem(LOG_KEY)
    return raw ? (JSON.parse(raw) as LogEntry[]) : []
  } catch {
    return []
  }
}

export function addLog(entry: Omit<LogEntry, 'id'>): LogEntry[] {
  const logs = getLogs()
  const newEntry: LogEntry = { ...entry, id: crypto.randomUUID() }
  const updated = [...logs, newEntry].sort((a, b) => a.date.localeCompare(b.date))
  localStorage.setItem(LOG_KEY, JSON.stringify(updated))
  return updated
}

export function deleteLog(id: string): LogEntry[] {
  const updated = getLogs().filter((l) => l.id !== id)
  localStorage.setItem(LOG_KEY, JSON.stringify(updated))
  return updated
}

export function setLogs(logs: LogEntry[]): void {
  localStorage.setItem(LOG_KEY, JSON.stringify(logs))
}

export function logsForExercise(slug: string): LogEntry[] {
  return getLogs()
    .filter((l) => l.exerciseSlug === slug)
    .sort((a, b) => a.date.localeCompare(b.date))
}

/** Distinct session dates, most recent first. */
export function sessionDates(): string[] {
  return Array.from(new Set(getLogs().map((l) => l.date))).sort((a, b) => b.localeCompare(a))
}

/** Weeks since this exercise last hit a new estimated-1RM high, using Epley. */
export function weeksSinceLastPR(slug: string): number | null {
  const logs = logsForExercise(slug)
  if (logs.length === 0) return null

  let best = 0
  let bestDate = logs[0].date
  for (const log of logs) {
    const est = log.weight * (1 + log.reps / 30)
    if (est >= best) {
      best = est
      bestDate = log.date
    }
  }
  const diffMs = Date.now() - new Date(bestDate).getTime()
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
}

/** Best estimated 1RM (Epley) ever logged per exercise slug. */
export function personalRecords(): Record<string, { est1rm: number; weight: number; reps: number; date: string }> {
  const best: Record<string, { est1rm: number; weight: number; reps: number; date: string }> = {}
  for (const log of getLogs()) {
    const est1rm = log.weight * (1 + log.reps / 30)
    const current = best[log.exerciseSlug]
    if (!current || est1rm > current.est1rm) {
      best[log.exerciseSlug] = { est1rm, weight: log.weight, reps: log.reps, date: log.date }
    }
  }
  return best
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function toggleFavorite(slug: string): string[] {
  const current = getFavorites()
  const updated = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  return updated
}

export type Theme = 'light' | 'dark'

export function getTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
