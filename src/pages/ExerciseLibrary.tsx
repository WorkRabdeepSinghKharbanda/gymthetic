import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { exercises, muscleGroups, categories, type Category, type MuscleGroup } from '../data/exercises'
import ExerciseCard from '../components/ExerciseCard'

export default function ExerciseLibrary() {
  const [params, setParams] = useSearchParams()
  const initialMuscle = params.get('muscle') as MuscleGroup | null
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>(initialMuscle ?? 'all')
  const [category, setCategory] = useState<Category | 'all'>('all')

  const filtered = useMemo(
    () =>
      exercises.filter(
        (e) => (muscle === 'all' || e.muscleGroup === muscle) && (category === 'all' || e.category === category),
      ),
    [muscle, category],
  )

  function selectMuscle(m: MuscleGroup | 'all') {
    setMuscle(m)
    if (m === 'all') params.delete('muscle')
    else params.set('muscle', m)
    setParams(params, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Exercise Library</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">
        {filtered.length} exercise{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          <FilterPill active={muscle === 'all'} onClick={() => selectMuscle('all')} label="All muscles" />
          {muscleGroups.map((m) => (
            <FilterPill key={m} active={muscle === m} onClick={() => selectMuscle(m)} label={m} />
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <FilterPill active={category === 'all'} onClick={() => setCategory('all')} label="All types" />
        {categories.map((c) => (
          <FilterPill key={c} active={category === c} onClick={() => setCategory(c)} label={c} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <ExerciseCard key={e.slug} exercise={e} />
        ))}
      </div>
    </div>
  )
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
        active
          ? 'bg-orange-500 text-white'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
      }`}
    >
      {label}
    </button>
  )
}
