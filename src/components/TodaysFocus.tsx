import { useState } from 'react'
import { Link } from 'react-router-dom'
import { exercises, muscleGroups, type MuscleGroup } from '../data/exercises'
import { printWorkoutSheet } from '../lib/print'

const repSchemes = ['3x5 (strength)', '4x8 (hypertrophy)', '3x12 (endurance)', '5x5 (volume)']
const WORKOUT_SIZE = 4

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const SUPERSET_LABELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function TodaysFocus() {
  const [group, setGroup] = useState<MuscleGroup>(muscleGroups[0])
  const [plan, setPlan] = useState<{ name: string; slug: string; scheme: string }[]>([])
  const [supersetMode, setSupersetMode] = useState(false)

  function randomize() {
    const pool = shuffle(exercises.filter((e) => e.muscleGroup === group)).slice(0, WORKOUT_SIZE)
    setPlan(
      pool.map((exercise) => ({
        name: exercise.name,
        slug: exercise.slug,
        scheme: repSchemes[Math.floor(Math.random() * repSchemes.length)],
      })),
    )
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Today's focus</h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Pick a muscle group, get a full suggested workout with rep schemes.
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
        <label className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" checked={supersetMode} onChange={(e) => setSupersetMode(e.target.checked)} />
          Superset mode
        </label>
      </div>
      {plan.length > 0 && (
        <>
          {supersetMode && (
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
              Pair up exercises sharing a letter — rest only after finishing both, not after each one.
            </p>
          )}
          <ol className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
            {plan.map((item, i) => (
              <li key={item.slug} className="flex items-baseline gap-2">
                <span className="text-neutral-400">{supersetMode ? SUPERSET_LABELS[i] ?? i + 1 : `${i + 1}.`}</span>
                <Link to={`/exercises/${item.slug}`} className="font-semibold text-orange-500 hover:underline">
                  {item.name}
                </Link>
                <span className="text-neutral-500 dark:text-neutral-400">— {item.scheme}</span>
              </li>
            ))}
          </ol>
          <button
            onClick={() =>
              printWorkoutSheet(
                `Today's Focus — ${group}`,
                ['#', 'Exercise', 'Scheme'],
                plan.map((item, i) => [String(i + 1), item.name, item.scheme]),
              )
            }
            className="mt-4 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Print
          </button>
        </>
      )}
    </div>
  )
}
