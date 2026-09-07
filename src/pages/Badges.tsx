import { getLogs, personalRecords, sessionDates } from '../lib/storage'
import { computeBadges } from '../lib/badges'
import { useSeo } from '../hooks/useSeo'

export default function Badges() {
  useSeo({
    title: 'Badges',
    description: 'Milestones unlocked from your logged training history.',
    path: '/badges',
    noindex: true,
  })

  const badges = computeBadges(getLogs(), personalRecords(), sessionDates())
  const unlockedCount = badges.filter((b) => b.unlocked).length

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Badges</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {unlockedCount} of {badges.length} unlocked, based on your logged training history.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`rounded-xl border p-4 ${
              b.unlocked
                ? 'border-orange-300 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-900/20'
                : 'border-neutral-200 bg-white opacity-50 dark:border-neutral-800 dark:bg-neutral-900'
            }`}
          >
            <p className={`font-semibold ${b.unlocked ? 'text-orange-700 dark:text-orange-300' : 'text-neutral-700 dark:text-neutral-300'}`}>
              {b.unlocked ? '🏅' : '🔒'} {b.label}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
