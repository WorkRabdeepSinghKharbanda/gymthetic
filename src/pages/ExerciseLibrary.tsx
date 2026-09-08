import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { exercises, muscleGroups, categories, type Category, type MuscleGroup } from '../data/exercises'
import ExerciseCard from '../components/ExerciseCard'
import { useFavorites } from '../hooks/useFavorites'
import { useSeo } from '../hooks/useSeo'
import AdSlot from '../components/AdSlot'
import { DEFAULT_AD_SLOT } from '../lib/adsense'

export default function ExerciseLibrary() {
  useSeo({
    title: 'Exercise Library',
    description: 'Browse gym exercises by muscle group and push/pull/legs split, with how-to steps and plateau-breaking tips.',
    path: '/exercises',
  })

  const [params, setParams] = useSearchParams()
  const initialMuscle = params.get('muscle') as MuscleGroup | null
  const initialCategory = params.get('category') as Category | null
  const [muscle, setMuscle] = useState<MuscleGroup | 'all'>(initialMuscle ?? 'all')
  const [category, setCategory] = useState<Category | 'all'>(initialCategory ?? 'all')
  const [query, setQuery] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const { favorites, isFavorite, toggle } = useFavorites()

  const filtered = useMemo(
    () =>
      exercises.filter(
        (e) =>
          (muscle === 'all' || e.muscleGroup === muscle) &&
          (category === 'all' || e.category === category) &&
          e.name.toLowerCase().includes(query.trim().toLowerCase()) &&
          (!favoritesOnly || favorites.includes(e.slug)),
      ),
    [muscle, category, query, favoritesOnly, favorites],
  )

  function selectMuscle(m: MuscleGroup | 'all') {
    setMuscle(m)
    if (m === 'all') params.delete('muscle')
    else params.set('muscle', m)
    setParams(params, { replace: true })
  }

  function selectCategory(c: Category | 'all') {
    setCategory(c)
    if (c === 'all') params.delete('category')
    else params.set('category', c)
    setParams(params, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Exercise Library</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">
        {filtered.length} exercise{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search exercises…"
          className="w-full max-w-xs rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-orange-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        />
        <FilterPill active={favoritesOnly} onClick={() => setFavoritesOnly((v) => !v)} label="★ Favorites" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <FilterPill active={muscle === 'all'} onClick={() => selectMuscle('all')} label="All muscles" />
        {muscleGroups.map((m) => (
          <FilterPill key={m} active={muscle === m} onClick={() => selectMuscle(m)} label={m} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <FilterPill active={category === 'all'} onClick={() => selectCategory('all')} label="All types" />
        {categories.map((c) => (
          <FilterPill key={c} active={category === c} onClick={() => selectCategory(c)} label={c} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <ExerciseCard key={e.slug} exercise={e} isFavorite={isFavorite(e.slug)} onToggleFavorite={() => toggle(e.slug)} />
        ))}
      </div>

      <AdSlot slotId={DEFAULT_AD_SLOT} className="mt-8" />
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
