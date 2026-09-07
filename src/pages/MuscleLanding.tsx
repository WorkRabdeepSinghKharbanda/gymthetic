import { Link } from 'react-router-dom'
import { exercises, type MuscleGroup } from '../data/exercises'
import { getMuscleLandingCopy } from '../data/muscleLandingCopy'
import { useSeo } from '../hooks/useSeo'

export default function MuscleLanding({ group }: { group: MuscleGroup }) {
  const copy = getMuscleLandingCopy(group)
  const list = exercises.filter((e) => e.muscleGroup === group)

  useSeo({
    title: copy?.title ?? `Best ${group} Exercises`,
    description: copy?.intro ?? `Top ${group} exercises with how-to steps and plateau-breaking tips.`,
    path: `/${copy?.slug ?? ''}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: copy?.title ?? `Best ${group} Exercises`,
      itemListElement: list.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://gymthetic.vercel.app/exercises/${e.slug}`,
        name: e.name,
      })),
    },
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{copy?.title ?? `Best ${group} Exercises`}</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">{copy?.intro}</p>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
        {list.map((e, i) => (
          <Link key={e.slug} to={`/exercises/${e.slug}`} className="flex items-center justify-between gap-4 p-4 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white">
                {i + 1}. {e.name}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">{e.primaryMuscles.join(', ')}</p>
            </div>
            <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold uppercase text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              {e.category}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to={`/exercises?muscle=${group}`} className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
          Browse &amp; filter in the library
        </Link>
        <Link to="/tracker" className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800">
          Log a session
        </Link>
      </div>
    </div>
  )
}
