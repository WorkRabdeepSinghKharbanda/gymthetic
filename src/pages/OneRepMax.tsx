import { useState } from 'react'
import { Link } from 'react-router-dom'
import { estimate1RM, percentTable } from '../lib/calculators'
import { useSeo } from '../hooks/useSeo'

export default function OneRepMax() {
  useSeo({
    title: '1RM Calculator',
    description: 'Estimate your one-rep max using the Epley formula, plus a full percentage-based training table.',
    path: '/calculators/one-rep-max',
  })

  const [weight, setWeight] = useState(100)
  const [reps, setReps] = useState(5)

  const oneRm = estimate1RM(weight, reps)
  const table = percentTable(oneRm)

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Link to="/calculators" className="text-sm text-orange-500 hover:underline">
        ← Back to calculators
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">1RM Calculator</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Estimated using the Epley formula.</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Field label="Weight lifted (kg)" value={weight} onChange={setWeight} />
        <Field label="Reps performed" value={reps} onChange={setReps} max={15} />
      </div>

      <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6 text-center dark:border-orange-900/50 dark:bg-orange-900/20">
        <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Estimated 1RM</p>
        <p className="text-4xl font-extrabold text-orange-600 dark:text-orange-400">{Math.round(oneRm)} kg</p>
      </div>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500 dark:text-neutral-400">
            <th className="pb-2">% of 1RM</th>
            <th className="pb-2 text-right">Weight</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row) => (
            <tr key={row.percent} className="border-t border-neutral-200 dark:border-neutral-800">
              <td className="py-2 text-neutral-700 dark:text-neutral-300">{row.percent}%</td>
              <td className="py-2 text-right font-semibold text-neutral-900 dark:text-white">{row.weight} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  max = 500,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  max?: number
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{label}</span>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-orange-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
      />
    </label>
  )
}
