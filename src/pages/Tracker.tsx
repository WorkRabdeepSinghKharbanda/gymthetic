import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { exercises, muscleGroups, categories, getExerciseBySlug, type MuscleGroup } from '../data/exercises'
import {
  addLog,
  deleteLog,
  getLogs,
  logsForExercise,
  sessionDates,
  setLogs,
  weeksSinceLastPR,
  weeklyVolumeByMuscleGroup,
  volumeTrendByCategory,
  type LogEntry,
} from '../lib/storage'
import ProgressChart from '../components/ProgressChart'
import LineChart from '../components/LineChart'
import StreakHeatmap from '../components/StreakHeatmap'
import RestTimer from '../components/RestTimer'

const PLATEAU_THRESHOLD_WEEKS = 3

export default function Tracker() {
  const [params] = useSearchParams()
  const initialSlug = params.get('exercise') ?? exercises[0].slug
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>(
    getExerciseBySlug(initialSlug)?.muscleGroup ?? muscleGroups[0],
  )
  const [slug, setSlug] = useState(initialSlug)
  const [weight, setWeight] = useState(60)
  const [reps, setReps] = useState(8)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [note, setNote] = useState('')
  const [logs, setLogsState] = useState<LogEntry[]>(() => getLogs())

  const exercisesInGroup = useMemo(
    () => exercises.filter((e) => e.muscleGroup === muscleGroup),
    [muscleGroup],
  )

  function handleMuscleGroupChange(group: MuscleGroup) {
    setMuscleGroup(group)
    const firstInGroup = exercises.find((e) => e.muscleGroup === group)
    if (firstInGroup) setSlug(firstInGroup.slug)
  }

  const exercise = getExerciseBySlug(slug)
  const history = useMemo(() => logsForExercise(slug), [slug, logs])
  const plateauWeeks = weeksSinceLastPR(slug)
  const isPlateaued = plateauWeeks !== null && plateauWeeks >= PLATEAU_THRESHOLD_WEEKS
  const dates = useMemo(() => sessionDates(), [logs])
  const weeklyVolume = useMemo(
    () => weeklyVolumeByMuscleGroup((s) => getExerciseBySlug(s)?.muscleGroup),
    [logs],
  )
  const exercisesWithHistory = useMemo(
    () => exercises.filter((e) => logsForExercise(e.slug).length >= 2),
    [logs],
  )
  const categoryTrends = useMemo(
    () =>
      categories.map((c) => ({
        category: c,
        points: volumeTrendByCategory(c, (s) => getExerciseBySlug(s)?.category),
      })),
    [logs],
  )

  function handleAdd() {
    const updated = addLog({ exerciseSlug: slug, weight, reps, date, note: note.trim() || undefined })
    setLogsState(updated)
    setNote('')
  }

  function handleDelete(id: string) {
    setLogsState(deleteLog(id))
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gymthetic-progress.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then((text) => {
      try {
        const imported = JSON.parse(text) as LogEntry[]
        setLogs(imported)
        setLogsState(imported)
      } catch {
        alert('Invalid file — expected exported Gymthetic JSON.')
      }
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Progress Tracker</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Stored locally in your browser — nothing leaves your device.
      </p>

      <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Log a session</h2>
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
          <NumField label="Weight (kg)" value={weight} onChange={setWeight} />
          <NumField label="Reps" value={reps} onChange={setReps} />
          <label className="block">
            <span className="text-xs font-medium text-neutral-500">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-medium text-neutral-500">Notes / RPE (optional)</span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. RPE 8, felt strong"
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          />
        </label>
        <button
          onClick={handleAdd}
          className="mt-4 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Log it
        </button>
      </div>

      {isPlateaued && exercise && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm dark:border-red-900/50 dark:bg-red-900/20">
          <p className="font-semibold text-red-700 dark:text-red-300">
            No new estimated 1RM on {exercise.name} in {plateauWeeks}+ weeks — looks like a plateau.
          </p>
          <Link
            to={`/calculators/plateau-breaker?exercise=${slug}`}
            className="mt-1 inline-block text-red-600 underline dark:text-red-400"
          >
            Get plateau-breaking suggestions →
          </Link>
        </div>
      )}

      <div className="mt-8">
        <RestTimer />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Trends</h2>

        <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">{exercise?.name}</h3>
          <div className="mt-2">
            <ProgressChart logs={history} />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">Push / Pull / Legs volume</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {categoryTrends.map(({ category, points }) => (
              <div key={category}>
                <p className="text-xs font-medium capitalize text-neutral-500 dark:text-neutral-400">{category}</p>
                <div className="mt-1">
                  <LineChart points={points} height={90} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {exercisesWithHistory.length > 0 && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">All exercises</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {exercisesWithHistory.map((e) => (
                <div key={e.slug}>
                  <Link to={`/exercises/${e.slug}`} className="text-xs font-medium text-neutral-500 hover:text-orange-500 dark:text-neutral-400">
                    {e.name}
                  </Link>
                  <div className="mt-1">
                    <ProgressChart logs={logsForExercise(e.slug)} height={80} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-white">History</h2>
        <div className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
          {history.length === 0 && (
            <p className="p-4 text-sm text-neutral-500 dark:text-neutral-400">No sessions logged yet.</p>
          )}
          {history
            .slice()
            .reverse()
            .map((log) => (
              <div key={log.id} className="flex items-center justify-between gap-2 p-3 text-sm">
                <span className="shrink-0 text-neutral-600 dark:text-neutral-300">{log.date}</span>
                <span className="shrink-0 font-medium text-neutral-900 dark:text-white">
                  {log.weight}kg × {log.reps}
                </span>
                {log.note && (
                  <span className="flex-1 truncate text-xs italic text-neutral-400" title={log.note}>
                    {log.note}
                  </span>
                )}
                <button
                  onClick={() => handleDelete(log.id)}
                  className="shrink-0 text-xs text-neutral-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-white">This week's volume by muscle group</h2>
        <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          {Object.keys(weeklyVolume).length === 0 ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No sessions in the last 7 days.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.entries(weeklyVolume)
                .sort((a, b) => b[1] - a[1])
                .map(([group, volume]) => (
                  <div key={group} className="rounded-lg bg-neutral-50 p-3 text-center dark:bg-neutral-800/60">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{group}</p>
                    <p className="font-bold text-neutral-900 dark:text-white">{Math.round(volume)} kg</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Consistency streak</h2>
        <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <StreakHeatmap dates={dates} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={handleExport}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Export data
        </button>
        <label className="cursor-pointer rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800">
          Import data
          <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
        </label>
      </div>
    </div>
  )
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
      />
    </label>
  )
}
