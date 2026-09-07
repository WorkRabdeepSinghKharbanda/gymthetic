import { useEffect, useState } from 'react'

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function SessionTimer({
  onStop,
  avgMinutes,
}: {
  onStop: (minutes: number) => void
  avgMinutes: number | null
}) {
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (startedAt === null) return
    const id = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 1000)
    return () => clearInterval(id)
  }, [startedAt])

  function start() {
    setStartedAt(Date.now())
    setElapsed(0)
  }

  function stop() {
    if (startedAt === null) return
    const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000))
    onStop(minutes)
    setStartedAt(null)
    setElapsed(0)
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Session timer</h3>
      {avgMinutes !== null && (
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Average session: {avgMinutes} min</p>
      )}
      <div className="mt-4 flex items-center gap-4">
        <p className="text-3xl font-extrabold tabular-nums text-neutral-900 dark:text-white">{formatElapsed(elapsed)}</p>
        {startedAt === null ? (
          <button
            onClick={start}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stop}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Stop &amp; save
          </button>
        )}
      </div>
    </div>
  )
}
