import { Link } from 'react-router-dom'
import type { Exercise } from '../data/exercises'

const categoryColor: Record<Exercise['category'], string> = {
  push: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  pull: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  legs: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
}

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      to={`/exercises/${exercise.slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
          {exercise.muscleGroup}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${categoryColor[exercise.category]}`}>
          {exercise.category}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-neutral-900 group-hover:text-orange-500 dark:text-white">
        {exercise.name}
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {exercise.primaryMuscles.join(', ')}
      </p>
    </Link>
  )
}
