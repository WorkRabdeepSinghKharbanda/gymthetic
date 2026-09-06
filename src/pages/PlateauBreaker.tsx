import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { exercises } from '../data/exercises'
import { getPlateauAdvice } from '../data/plateauRules'
import { useSeo } from '../hooks/useSeo'

export default function PlateauBreaker() {
  useSeo({
    title: 'Plateau Breaker',
    description: 'Stuck on a lift? Get a checklist and concrete next steps scaled to how many weeks you’ve been stalled.',
    path: '/calculators/plateau-breaker',
  })

  const [params] = useSearchParams()
  const [slug, setSlug] = useState(params.get('exercise') ?? exercises[0].slug)
  const [weeks, setWeeks] = useState(4)

  const exercise = exercises.find((e) => e.slug === slug)
  const advice = getPlateauAdvice(weeks)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/calculators" className="text-sm text-orange-500 hover:underline">
        ← Back to calculators
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">Plateau Breaker</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Tell us the lift and how long you've been stuck.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Lift</span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            {exercises.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Weeks stalled</span>
          <input
            type="number"
            min={0}
            max={52}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900/50 dark:bg-orange-900/20">
        <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">
          Plateau window: {advice.weeksStalled}
        </p>
        {exercise && <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">For: {exercise.name}</p>}
      </div>

      <Section title="Checklist first" items={advice.checklist} />
      <Section title="What to try" items={advice.suggestions} highlight />

      {exercise && exercise.plateauTips.length > 0 && (
        <Section title={`${exercise.name}-specific tips`} items={exercise.plateauTips} />
      )}
    </div>
  )
}

function Section({ title, items, highlight }: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div className="mt-6">
      <h2 className={`text-lg font-semibold ${highlight ? 'text-orange-500' : 'text-neutral-900 dark:text-white'}`}>
        {title}
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
