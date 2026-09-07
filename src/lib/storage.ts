export interface LogEntry {
  id: string
  exerciseSlug: string
  weight: number
  reps: number
  date: string // ISO date
  note?: string
  rpe?: number
}

const LOG_KEY = 'gymthetic.logs'
const THEME_KEY = 'gymthetic.theme'
const FAVORITES_KEY = 'gymthetic.favorites'
const CONSENT_KEY = 'gymthetic.consent'
const UNIT_KEY = 'gymthetic.unit'

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

/** Total volume (weight × reps) per muscle group for the last 7 days. */
export function weeklyVolumeByMuscleGroup(
  muscleGroupOf: (slug: string) => string | undefined,
): Record<string, number> {
  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000
  const totals: Record<string, number> = {}
  for (const log of getLogs()) {
    if (new Date(log.date).getTime() < cutoff) continue
    const group = muscleGroupOf(log.exerciseSlug)
    if (!group) continue
    totals[group] = (totals[group] ?? 0) + log.weight * log.reps
  }
  return totals
}

/** Total volume (weight × reps) per session date for exercises in a category, sorted oldest first. */
export function volumeTrendByCategory(
  category: string,
  categoryOf: (slug: string) => string | undefined,
): number[] {
  const totals = new Map<string, number>()
  for (const log of getLogs()) {
    if (categoryOf(log.exerciseSlug) !== category) continue
    totals.set(log.date, (totals.get(log.date) ?? 0) + log.weight * log.reps)
  }
  return Array.from(totals.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, volume]) => volume)
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

export type ConsentChoice = 'accepted' | 'declined'

export function getConsent(): ConsentChoice | null {
  const stored = localStorage.getItem(CONSENT_KEY)
  return stored === 'accepted' || stored === 'declined' ? stored : null
}

export function setConsent(choice: ConsentChoice): void {
  localStorage.setItem(CONSENT_KEY, choice)
}

export type Unit = 'kg' | 'lb'

export function getUnit(): Unit {
  return localStorage.getItem(UNIT_KEY) === 'lb' ? 'lb' : 'kg'
}

/** Persists the unit preference and notifies other mounted components via a custom event. */
export function setUnit(unit: Unit): void {
  localStorage.setItem(UNIT_KEY, unit)
  window.dispatchEvent(new CustomEvent('gymthetic:unit', { detail: unit }))
}

// --- Body measurements ---

export interface Measurement {
  id: string
  date: string
  weightKg?: number
  waistCm?: number
  chestCm?: number
  armsCm?: number
  thighsCm?: number
}

const MEASUREMENTS_KEY = 'gymthetic.measurements'

export function getMeasurements(): Measurement[] {
  try {
    const raw = localStorage.getItem(MEASUREMENTS_KEY)
    return raw ? (JSON.parse(raw) as Measurement[]).sort((a, b) => a.date.localeCompare(b.date)) : []
  } catch {
    return []
  }
}

export function addMeasurement(entry: Omit<Measurement, 'id'>): Measurement[] {
  const updated = [...getMeasurements(), { ...entry, id: crypto.randomUUID() }]
  localStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updated))
  return updated
}

export function deleteMeasurement(id: string): Measurement[] {
  const updated = getMeasurements().filter((m) => m.id !== id)
  localStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(updated))
  return updated
}

// --- Progress photos ---

export interface ProgressPhoto {
  id: string
  date: string
  dataUrl: string
}

const PHOTOS_KEY = 'gymthetic.photos'

export function getPhotos(): ProgressPhoto[] {
  try {
    const raw = localStorage.getItem(PHOTOS_KEY)
    return raw ? (JSON.parse(raw) as ProgressPhoto[]).sort((a, b) => a.date.localeCompare(b.date)) : []
  } catch {
    return []
  }
}

/** Throws if the browser's localStorage quota is exceeded (photos are stored as base64). */
export function addPhoto(entry: Omit<ProgressPhoto, 'id'>): ProgressPhoto[] {
  const updated = [...getPhotos(), { ...entry, id: crypto.randomUUID() }]
  localStorage.setItem(PHOTOS_KEY, JSON.stringify(updated))
  return updated
}

export function deletePhoto(id: string): ProgressPhoto[] {
  const updated = getPhotos().filter((p) => p.id !== id)
  localStorage.setItem(PHOTOS_KEY, JSON.stringify(updated))
  return updated
}

// --- Goals ---

export interface Goal {
  slug: string
  targetWeight: number
  targetReps: number
}

const GOALS_KEY = 'gymthetic.goals'

export function getGoals(): Record<string, Goal> {
  try {
    const raw = localStorage.getItem(GOALS_KEY)
    return raw ? (JSON.parse(raw) as Record<string, Goal>) : {}
  } catch {
    return {}
  }
}

export function setGoal(goal: Goal): Record<string, Goal> {
  const updated = { ...getGoals(), [goal.slug]: goal }
  localStorage.setItem(GOALS_KEY, JSON.stringify(updated))
  return updated
}

export function deleteGoal(slug: string): Record<string, Goal> {
  const updated = getGoals()
  delete updated[slug]
  localStorage.setItem(GOALS_KEY, JSON.stringify(updated))
  return updated
}

// --- Workout templates ---

export interface TemplateItem {
  slug: string
  sets: number
  reps: number
}

export interface WorkoutTemplate {
  id: string
  name: string
  items: TemplateItem[]
}

const TEMPLATES_KEY = 'gymthetic.templates'

export function getTemplates(): WorkoutTemplate[] {
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY)
    return raw ? (JSON.parse(raw) as WorkoutTemplate[]) : []
  } catch {
    return []
  }
}

export function addTemplate(template: Omit<WorkoutTemplate, 'id'>): WorkoutTemplate[] {
  const updated = [...getTemplates(), { ...template, id: crypto.randomUUID() }]
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated))
  return updated
}

export function deleteTemplate(id: string): WorkoutTemplate[] {
  const updated = getTemplates().filter((t) => t.id !== id)
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated))
  return updated
}
