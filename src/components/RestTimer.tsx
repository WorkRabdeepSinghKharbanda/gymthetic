import { useEffect, useState } from 'react'

const PRESETS = [60, 90, 120, 180]

function beep() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    osc.frequency.value = 880
    osc.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  } catch {
    // audio unsupported, ignore
  }
}

export default function RestTimer() {
  const [duration, setDuration] = useState(90)
  const [remaining, setRemaining] = useState<number | null>(null)
  const running = remaining !== null

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setRemaining((r) => {
        if (r === null) return null
        if (r <= 1) {
          clearInterval(id)
          beep()
          return null
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-semibold text-neutral-900 dark:text-white">Rest timer</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setDuration(p)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              duration === p
                ? 'bg-orange-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            {p}s
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4">
        <p className="text-3xl font-extrabold tabular-nums text-neutral-900 dark:text-white">
          {remaining !== null ? remaining : duration}s
        </p>
        {!running ? (
          <button
            onClick={() => setRemaining(duration)}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Start
          </button>
        ) : (
          <button
            onClick={() => setRemaining(null)}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  )
}
