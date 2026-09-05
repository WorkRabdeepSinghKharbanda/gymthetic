import { Link } from 'react-router-dom'
import { getExerciseBySlug } from '../data/exercises'
import { personalRecords } from '../lib/storage'

export default function Records() {
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
            <Link
              key={r.slug}
              to={`/exercises/${r.slug}`}
              className="flex items-center justify-between p-4 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
            >
              <div>
                <p className="font-semibold text-neutral-900 dark:text-white">{r.exercise!.name}</p>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {r.weight}kg × {r.reps} on {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <p className="font-bold text-orange-500">{Math.round(r.est1rm)}kg</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
