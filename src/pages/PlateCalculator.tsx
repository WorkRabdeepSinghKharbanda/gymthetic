import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calcPlates } from '../lib/calculators'
import { useSeo } from '../hooks/useSeo'
import NumberField from '../components/NumberField'

const BAR_WEIGHTS = [20, 15, 10]

export default function PlateCalculator() {
  useSeo({
    title: 'Plate Calculator',
    description: 'Work out exactly which plates to load per side of a barbell for any target weight.',
    path: '/calculators/plates',
  })

  const [target, setTarget] = useState(100)
  const [bar, setBar] = useState(20)

  const { plates, achieved } = calcPlates(target, bar)

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Link to="/calculators" className="text-sm text-orange-500 hover:underline">
        ← Back to calculators
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">Plate Calculator</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Plates per side for a target barbell weight.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <NumberField label="Target weight (kg)" value={target} onChange={setTarget} min={0} max={500} />
        <label className="block">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Bar weight (kg)</span>
          <select
            value={bar}
            onChange={(e) => setBar(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            {BAR_WEIGHTS.map((b) => (
              <option key={b} value={b}>
                {b}kg
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6 text-center dark:border-orange-900/50 dark:bg-orange-900/20">
        <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Per side</p>
        {plates.length === 0 ? (
          <p className="mt-2 text-neutral-600 dark:text-neutral-300">Just the bar</p>
        ) : (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {plates.map((p, i) => (
              <span
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white"
              >
                {p}
              </span>
            ))}
          </div>
        )}
        {achieved !== target && (
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            Closest achievable with standard plates: {achieved}kg
          </p>
        )}
      </div>
    </div>
  )
}
