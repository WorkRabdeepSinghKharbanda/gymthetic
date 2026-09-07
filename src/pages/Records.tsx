import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getExerciseBySlug } from '../data/exercises'
import { personalRecords } from '../lib/storage'
import { useSeo } from '../hooks/useSeo'
import { useUnit } from '../hooks/useUnit'
import { formatWeight } from '../lib/units'
import ShareCard from '../components/ShareCard'

export default function Records() {
  useSeo({
    title: 'Personal Records',
    description: 'Your best logged lift per exercise, ranked by estimated one-rep max.',
    path: '/records',
    noindex: true,
  })

  const { unit } = useUnit()
  const [sharingSlug, setSharingSlug] = useState<string | null>(null)
  const records = personalRecords()
  const rows = Object.entries(records)
    .map(([slug, pr]) => ({ slug, exercise: getExerciseBySlug(slug), ...pr }))
    .filter((r) => r.exercise)
    .sort((a, b) => b.est1rm - a.est1rm)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Personal Records</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Best logged set per lift, ranked by estimated 1RM.
      </p>

      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          No records yet.{' '}
          <Link to="/tracker" className="text-orange-500 hover:underline">
            Log a session
          </Link>{' '}
          to start building your PR board.
        </p>
      ) : (
        <div className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
          {rows.map((r) => (
            <div key={r.slug} className="p-4 text-sm">
              <div className="flex items-center justify-between">
                <Link to={`/exercises/${r.slug}`} className="hover:text-orange-500">
                  <p className="font-semibold text-neutral-900 dark:text-white">{r.exercise!.name}</p>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {formatWeight(r.weight, unit)} × {r.reps} on {new Date(r.date).toLocaleDateString()}
                  </p>
                </Link>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-orange-500">{formatWeight(r.est1rm, unit)}</p>
                  <button
                    onClick={() => setSharingSlug((s) => (s === r.slug ? null : r.slug))}
                    className="text-xs text-neutral-400 hover:text-orange-500"
                  >
                    {sharingSlug === r.slug ? 'Hide' : 'Share'}
                  </button>
                </div>
              </div>
              {sharingSlug === r.slug && (
                <ShareCard
                  title={r.exercise!.name}
                  value={formatWeight(r.est1rm, unit)}
                  subtitle={`est. 1RM · ${formatWeight(r.weight, unit)} × ${r.reps}`}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
