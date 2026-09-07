import { getLastReminderDate, getRemindersEnabled, sessionDates, setLastReminderDate } from './storage'

/**
 * Fires a "log today's session" browser notification at most once per day, only while the
 * app is open (no push server — this is a local-only, no-backend project, so it's a nudge
 * on visit, not true background push).
 */
export function maybeShowReminder(): void {
  if (!getRemindersEnabled()) return
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return

  const today = new Date().toISOString().slice(0, 10)
  if (getLastReminderDate() === today) return
  if (sessionDates().includes(today)) return

  setLastReminderDate(today)
  new Notification('Gymthetic', { body: "Haven't logged a session today — keep the streak alive!" })
}
