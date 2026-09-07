import { Link } from 'react-router-dom'
import { getExerciseBySlug } from '../data/exercises'
import { getMeasurements, personalRecords } from '../lib/storage'
import { STANDARD_LIFTS, classifyStandard } from '../lib/strengthStandards'
import { useSeo } from '../hooks/useSeo'
import { useUnit } from '../hooks/useUnit'
import { formatWeight } from '../lib/units'

export default function Standards() {
  useSeo({
    title: 'Strength Standards',
    description: 'Compare your estimated 1RM on squat, bench, deadlift, and overhead press against approximate bodyweight-based strength levels.',
    path: '/standards',
    noindex: true,
  })

  const { unit } = useUnit()
  const bodyweightKg = getMeasurements().at(-1)?.weightKg
  const records = personalRecords()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Strength Standards</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Approximate, unisex bodyweight-ratio standards — not a medical or gender-specific reference, just a
        rough sense of where you stand.
      </p>

      {!bodyweightKg ? (
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          Log a bodyweight check-in on the{' '}
          <Link to="/measurements" className="text-orange-500 hover:underline">
            Measurements
          </Link>{' '}
          page first — standards are calculated relative to bodyweight.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Using latest logged bodyweight: {formatWeight(bodyweightKg, unit)}
          </p>
          {STANDARD_LIFTS.map((lift) => {
            const pr = records[lift.slug]
            const exercise = getExerciseBySlug(lift.slug)
            if (!pr) {
              return (
                <div key={lift.slug} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <p className="font-semibold text-neutral-900 dark:text-white">{lift.label}</p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    No logged sets yet.{' '}
                    <Link to={`/tracker?exercise=${lift.slug}`} className="text-orange-500 hover:underline">
                      Log one
                    </Link>
                  </p>
                </div>
              )
            }
            const result = classifyStandard(pr.est1rm, bodyweightKg, lift.multipliers)
            return (
              <div key={lift.slug} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between">
                  <Link to={`/exercises/${lift.slug}`} className="font-semibold text-neutral-900 hover:text-orange-500 dark:text-white">
                    {exercise?.name ?? lift.label}
                  </Link>
                  <p className="text-sm font-bold capitalize text-orange-500">{result.level}</p>
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Est. 1RM {formatWeight(pr.est1rm, unit)} — {result.ratio.toFixed(2)}× bodyweight
                  {result.nextLevel && ` — ${result.progressToNext}% to ${result.nextLevel}`}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${result.progressToNext}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
