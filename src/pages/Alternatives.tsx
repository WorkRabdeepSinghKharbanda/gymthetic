import { Link } from 'react-router-dom'
import { ALTERNATIVES } from '../data/alternativesData'
import { useSeo } from '../hooks/useSeo'

export default function Alternatives() {
  useSeo({
    title: 'Alternatives',
    description: 'Free, no-signup alternatives to Strong, Hevy, StrongLifts 5x5, and JEFIT — honest comparisons, not disparagement.',
    path: '/alternatives',
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Alternatives</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">
        Honest, factual comparisons against popular workout tracker apps — what they do better, and where a free,
        account-free browser tool covers the job just as well.
      </p>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
        {ALTERNATIVES.map((a) => (
          <Link key={a.slug} to={`/alternatives/${a.slug}`} className="block p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
            <h2 className="font-semibold text-neutral-900 dark:text-white">{a.title}</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{a.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
