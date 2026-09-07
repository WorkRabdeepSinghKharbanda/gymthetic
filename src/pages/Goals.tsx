import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { exercises, muscleGroups, getExerciseBySlug, type MuscleGroup } from '../data/exercises'
import { deleteGoal, getGoals, personalRecords, setGoal } from '../lib/storage'
import { estimate1RM } from '../lib/calculators'
import { useSeo } from '../hooks/useSeo'
import NumberField from '../components/NumberField'

export default function Goals() {
  useSeo({
    title: 'Goals',
    description: 'Set a target weight and reps per lift, and track your progress toward it.',
    path: '/goals',
    noindex: true,
  })

  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>(muscleGroups[0])
  const [slug, setSlug] = useState(exercises[0].slug)
  const [targetWeight, setTargetWeight] = useState(100)
  const [targetReps, setTargetReps] = useState(5)
  const [goals, setGoalsState] = useState(() => getGoals())
  const records = useMemo(() => personalRecords(), [goals])

  const exercisesInGroup = useMemo(() => exercises.filter((e) => e.muscleGroup === muscleGroup), [muscleGroup])

  function handleMuscleGroupChange(group: MuscleGroup) {
    setMuscleGroup(group)
    const firstInGroup = exercises.find((e) => e.muscleGroup === group)
    if (firstInGroup) setSlug(firstInGroup.slug)
  }

  function handleSave() {
    setGoalsState(setGoal({ slug, targetWeight, targetReps }))
  }

  function handleDelete(goalSlug: string) {
    setGoalsState(deleteGoal(goalSlug))
  }

  const rows = Object.values(goals)
    .map((goal) => {
      const exercise = getExerciseBySlug(goal.slug)
      const targetEst1rm = estimate1RM(goal.targetWeight, goal.targetReps)
      const currentEst1rm = records[goal.slug]?.est1rm ?? 0
      const progress = Math.min(100, Math.round((currentEst1rm / targetEst1rm) * 100))
      return { goal, exercise, progress }
    })
    .filter((r) => r.exercise)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Goals</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Set a target for any lift, tracked against your best estimated 1RM.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Set a goal</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <label className="block">
            <span className="text-xs font-medium text-neutral-500">Muscle group</span>
            <select
              value={muscleGroup}
              onChange={(e) => handleMuscleGroupChange(e.target.value as MuscleGroup)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              {muscleGroups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-neutral-500">Exercise</span>
            <select
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              {exercisesInGroup.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
          </label>
          <NumberField label="Target weight (kg)" value={targetWeight} onChange={setTargetWeight} min={0} max={500} />
          <NumberField label="Target reps" value={targetReps} onChange={setTargetReps} min={1} max={100} />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Save goal
        </button>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Your goals</h2>
        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">No goals set yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {rows.map(({ goal, exercise, progress }) => (
              <div key={goal.slug} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between">
                  <Link to={`/exercises/${goal.slug}`} className="font-semibold text-neutral-900 hover:text-orange-500 dark:text-white">
                    {exercise!.name}
                  </Link>
                  <button onClick={() => handleDelete(goal.slug)} className="text-xs text-neutral-400 hover:text-red-500">
                    Remove
                  </button>
                </div>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Target: {goal.targetWeight}kg × {goal.targetReps} — {progress}% there
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
