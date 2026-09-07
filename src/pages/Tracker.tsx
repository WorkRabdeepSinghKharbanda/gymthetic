import { useEffect, useMemo, useState } from 'react'
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
import { currentStreak } from '../lib/badges'
import ProgressChart from '../components/ProgressChart'
import LineChart from '../components/LineChart'
import StreakHeatmap from '../components/StreakHeatmap'
import RestTimer from '../components/RestTimer'
import HistoryList from '../components/HistoryList'
import Toast from '../components/Toast'
import NumberField from '../components/NumberField'
import WeightField from '../components/WeightField'
import ShareCard from '../components/ShareCard'
import { useSeo } from '../hooks/useSeo'
import { useToast } from '../hooks/useToast'
import { useUnit } from '../hooks/useUnit'
import { formatWeight } from '../lib/units'

const PLATEAU_THRESHOLD_WEEKS = 3
const COMPOUND_GROUPS: MuscleGroup[] = ['Legs', 'Back', 'Chest']
const RPE_OPTIONS = [6, 7, 8, 9, 10]

export default function Tracker() {
  useSeo({
    title: 'Progress Tracker',
    description: 'Log your lifts, track your estimated 1RM trend, and get plateau alerts — stored locally on your device.',
    path: '/tracker',
    noindex: true,
  })

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
  const [rpe, setRpe] = useState<number | ''>('')
  const [logs, setLogsState] = useState<LogEntry[]>(() => getLogs())
  const [sharingStreak, setSharingStreak] = useState(false)
  const toast = useToast()
  const { unit } = useUnit()

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
  const lastLog = history.at(-1)
  const plateauWeeks = weeksSinceLastPR(slug)
  const isPlateaued = plateauWeeks !== null && plateauWeeks >= PLATEAU_THRESHOLD_WEEKS
  const dates = useMemo(() => sessionDates(), [logs])
  const streak = useMemo(() => currentStreak(dates), [dates])
  const restDuration = exercise && COMPOUND_GROUPS.includes(exercise.muscleGroup) ? 180 : 90

  // Suggested next weight: bump 2.5kg if the last session hit target reps, otherwise repeat it.
  const suggestedWeight = lastLog ? (lastLog.reps >= reps ? lastLog.weight + 2.5 : lastLog.weight) : null

  useEffect(() => {
    if (suggestedWeight !== null) setWeight(suggestedWeight)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])
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
    const updated = addLog({
      exerciseSlug: slug,
      weight,
      reps,
      date,
      note: note.trim() || undefined,
      rpe: rpe === '' ? undefined : rpe,
    })
    setLogsState(updated)
    setNote('')
    toast.show(`Logged ${exercise?.name ?? 'lift'} — ${formatWeight(weight, unit)} × ${reps}`)
  }

  function handleFormKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'SELECT') {
      e.preventDefault()
      handleAdd()
    }
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

      <div
        onKeyDown={handleFormKeyDown}
        className="mt-8 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
      >
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
          <WeightField label="Weight" valueKg={weight} onChangeKg={setWeight} min={0} max={500} />
          <NumberField label="Reps" value={reps} onChange={setReps} min={1} max={100} />
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

        {suggestedWeight !== null && Math.abs(suggestedWeight - weight) > 0.01 && (
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            Suggested: {formatWeight(suggestedWeight, unit)} ({lastLog && lastLog.reps >= reps ? 'hit target reps last time' : 'repeat last weight'}) —{' '}
            <button onClick={() => setWeight(suggestedWeight)} className="text-orange-500 hover:underline">
              Use it
            </button>
          </p>
        )}
        {lastLog?.rpe !== undefined && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Last RPE was {lastLog.rpe} —{' '}
            {lastLog.rpe <= 7 ? 'you likely have room to add weight.' : lastLog.rpe >= 9 ? 'consider holding or backing off.' : 'about right, hold steady.'}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <label className="block">
            <span className="text-xs font-medium text-neutral-500">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-neutral-500">RPE (optional)</span>
            <select
              value={rpe}
              onChange={(e) => setRpe(e.target.value === '' ? '' : Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            >
              <option value="">—</option>
              {RPE_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="text-xs font-medium text-neutral-500">Notes (optional)</span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. felt strong"
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
          <p className="mt-1 text-red-600 dark:text-red-400">
            Consider a deload week first: cut volume ~40-50% at the same intensity, then resume normal
            programming.
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
        <RestTimer initialDuration={restDuration} />
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
        <div className="mt-3">
          <HistoryList logs={history} onDelete={handleDelete} />
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
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900 dark:text-white">Consistency streak</h2>
          {streak > 0 && (
            <button onClick={() => setSharingStreak((v) => !v)} className="text-xs text-neutral-400 hover:text-orange-500">
              {sharingStreak ? 'Hide' : 'Share'}
            </button>
          )}
        </div>
        <div className="mt-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Current streak: {streak} day{streak === 1 ? '' : 's'}</p>
          <div className="mt-2">
            <StreakHeatmap dates={dates} />
          </div>
          {sharingStreak && (
            <ShareCard title="Training streak" value={`${streak} day${streak === 1 ? '' : 's'}`} subtitle="consecutive days trained" />
          )}
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

      {toast.message && <Toast message={toast.message} />}
    </div>
  )
}

