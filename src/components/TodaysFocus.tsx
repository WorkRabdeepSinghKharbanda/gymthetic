import { useState } from 'react'
import { Link } from 'react-router-dom'
import { exercises, muscleGroups, type MuscleGroup } from '../data/exercises'

const repSchemes = ['3x5 (strength)', '4x8 (hypertrophy)', '3x12 (endurance)', '5x5 (volume)']

export default function TodaysFocus() {
  const [group, setGroup] = useState<MuscleGroup>(muscleGroups[0])
  const [pick, setPick] = useState<{ name: string; slug: string; scheme: string } | null>(null)

  function randomize() {
    const pool = exercises.filter((e) => e.muscleGroup === group)
    const exercise = pool[Math.floor(Math.random() * pool.length)]
    const scheme = repSchemes[Math.floor(Math.random() * repSchemes.length)]
    setPick({ name: exercise.name, slug: exercise.slug, scheme })
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Today's focus</h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Pick a muscle group, get a quick suggested exercise + rep scheme.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value as MuscleGroup)}
          className="rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        >
          {muscleGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button
          onClick={randomize}
          className="rounded-lg bg-orange-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Surprise me
        </button>
      </div>
      {pick && (
        <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-200">
          <Link to={`/exercises/${pick.slug}`} className="font-semibold text-orange-500 hover:underline">
            {pick.name}
          </Link>{' '}
          — {pick.scheme}
        </p>
      )}
    </div>
  )
}
