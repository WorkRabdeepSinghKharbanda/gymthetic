import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calcWarmup } from '../lib/calculators'
import { useSeo } from '../hooks/useSeo'
import NumberField from '../components/NumberField'

export default function WarmupCalculator() {
  useSeo({
    title: 'Warm-up Calculator',
    description: 'Generate a warm-up ramp toward your work weight — bar, then 40/60/80/90% steps.',
    path: '/calculators/warmup',
  })

  const [workWeight, setWorkWeight] = useState(100)
  const [barWeight, setBarWeight] = useState(20)

  const ramp = calcWarmup(workWeight, barWeight)

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Link to="/calculators" className="text-sm text-orange-500 hover:underline">
        ← Back to calculators
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">Warm-up Calculator</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        Ramp up to your work weight without burning energy on warm-up sets.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <NumberField label="Work weight (kg)" value={workWeight} onChange={setWorkWeight} max={500} />
        <NumberField label="Bar weight (kg)" value={barWeight} onChange={setBarWeight} max={50} />
      </div>

      <table className="mt-8 w-full text-sm">
        <thead>
          <tr className="text-left text-neutral-500 dark:text-neutral-400">
            <th className="pb-2">Step</th>
            <th className="pb-2 text-right">Weight</th>
            <th className="pb-2 text-right">Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-neutral-200 dark:border-neutral-800">
            <td className="py-2 text-neutral-700 dark:text-neutral-300">Bar only</td>
            <td className="py-2 text-right font-semibold text-neutral-900 dark:text-white">{barWeight} kg</td>
            <td className="py-2 text-right text-neutral-700 dark:text-neutral-300">10</td>
          </tr>
          {ramp.map((step) => (
            <tr key={step.percent} className="border-t border-neutral-200 dark:border-neutral-800">
              <td className="py-2 text-neutral-700 dark:text-neutral-300">{step.percent}%</td>
              <td className="py-2 text-right font-semibold text-neutral-900 dark:text-white">{step.weight} kg</td>
              <td className="py-2 text-right text-neutral-700 dark:text-neutral-300">{step.reps}</td>
            </tr>
          ))}
          <tr className="border-t border-neutral-200 bg-orange-50 dark:border-neutral-800 dark:bg-orange-900/20">
            <td className="py-2 font-semibold text-orange-700 dark:text-orange-300">Work set</td>
            <td className="py-2 text-right font-bold text-orange-600 dark:text-orange-400">{workWeight} kg</td>
            <td className="py-2 text-right text-orange-700 dark:text-orange-300">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
