import { Link } from 'react-router-dom'
import { muscleGroups } from '../data/exercises'

const emoji: Record<string, string> = {
  Chest: '🎯',
  Back: '🦍',
  Shoulders: '🏔️',
  Legs: '🦵',
  Biceps: '💪',
  Triceps: '🔱',
  Core: '🧱',
  Forearms: '✊',
}

export default function MuscleGroupNav() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {muscleGroups.map((group) => (
        <Link
          key={group}
          to={`/exercises?muscle=${group}`}
          className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <span className="text-2xl">{emoji[group]}</span>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{group}</span>
        </Link>
      ))}
    </div>
  )
}
