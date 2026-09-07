import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { exercises, muscleGroups, getExerciseBySlug, type MuscleGroup } from '../data/exercises'
import {
  addLog,
  addTemplate,
  deleteTemplate,
  getTemplates,
  logsForExercise,
  type TemplateItem,
} from '../lib/storage'
import { useSeo } from '../hooks/useSeo'
import { useToast } from '../hooks/useToast'
import Toast from '../components/Toast'
import NumberField from '../components/NumberField'

export default function Templates() {
  useSeo({
    title: 'Workout Templates',
    description: 'Save a reusable workout routine and log the whole session in one tap.',
    path: '/templates',
    noindex: true,
  })

  const [name, setName] = useState('')
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>(muscleGroups[0])
  const [slug, setSlug] = useState(exercises[0].slug)
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(8)
  const [items, setItems] = useState<TemplateItem[]>([])
  const [templates, setTemplatesState] = useState(() => getTemplates())
  const toast = useToast()

  const exercisesInGroup = useMemo(() => exercises.filter((e) => e.muscleGroup === muscleGroup), [muscleGroup])

  function handleMuscleGroupChange(group: MuscleGroup) {
    setMuscleGroup(group)
    const firstInGroup = exercises.find((e) => e.muscleGroup === group)
    if (firstInGroup) setSlug(firstInGroup.slug)
  }

  function addItem() {
    setItems((prev) => [...prev, { slug, sets, reps }])
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  function saveTemplate() {
    if (!name.trim() || items.length === 0) return
    setTemplatesState(addTemplate({ name: name.trim(), items }))
    setName('')
    setItems([])
  }

  function handleDelete(id: string) {
    setTemplatesState(deleteTemplate(id))
  }

  function logAll(itemsToLog: TemplateItem[], templateName: string) {
    const today = new Date().toISOString().slice(0, 10)
    for (const item of itemsToLog) {
      const last = logsForExercise(item.slug).at(-1)
      for (let i = 0; i < item.sets; i++) {
        addLog({
          exerciseSlug: item.slug,
          weight: last?.weight ?? 0,
          reps: item.reps,
          date: today,
          note: `${templateName} — set ${i + 1}/${item.sets}`,
        })
      }
    }
    toast.show(`Logged all ${itemsToLog.length} exercises from ${templateName}`)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Workout Templates</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Build a routine once, log every exercise in it with one tap. Weight defaults to your last logged
        set for that lift.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Build a template</h2>
        <label className="mt-4 block">
          <span className="text-xs font-medium text-neutral-500">Template name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Push Day A"
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          />
        </label>

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
          <NumberField label="Sets" value={sets} onChange={setSets} min={1} max={20} />
          <NumberField label="Reps" value={reps} onChange={setReps} min={1} max={100} />
        </div>
        <button
          onClick={addItem}
          className="mt-4 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          + Add exercise
        </button>

        {items.length > 0 && (
          <ol className="mt-4 space-y-1 text-sm text-neutral-700 dark:text-neutral-200">
            {items.map((item, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>
                  {i + 1}. {getExerciseBySlug(item.slug)?.name} — {item.sets}×{item.reps}
                </span>
                <button onClick={() => removeItem(i)} className="text-xs text-neutral-400 hover:text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ol>
        )}

        <button
          onClick={saveTemplate}
          disabled={!name.trim() || items.length === 0}
          className="mt-4 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-40"
        >
          Save template
        </button>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Saved templates</h2>
        {templates.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">No templates yet.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">{t.name}</h3>
                  <button onClick={() => handleDelete(t.id)} className="text-xs text-neutral-400 hover:text-red-500">
                    Delete
                  </button>
                </div>
                <ul className="mt-2 space-y-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {t.items.map((item, i) => (
                    <li key={i}>
                      <Link to={`/exercises/${item.slug}`} className="hover:text-orange-500">
                        {getExerciseBySlug(item.slug)?.name}
                      </Link>{' '}
                      — {item.sets}×{item.reps}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => logAll(t.items, t.name)}
                  className="mt-3 rounded-lg bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                >
                  Log entire session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast.message && <Toast message={toast.message} />}
    </div>
  )
}
