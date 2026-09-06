import { useState } from 'react'
import { Link } from 'react-router-dom'
import { calcBMR, calcTDEE, calcMacros, type Sex, type ActivityLevel, type Goal } from '../lib/calculators'
import { useSeo } from '../hooks/useSeo'

const activityOptions: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
  { value: 'light', label: 'Light (1-3 days/week)' },
  { value: 'moderate', label: 'Moderate (3-5 days/week)' },
  { value: 'active', label: 'Active (6-7 days/week)' },
  { value: 'very_active', label: 'Very active (2x/day)' },
]

export default function TDEE() {
  useSeo({
    title: 'TDEE & Macro Calculator',
    description: 'Calculate your daily calorie needs (Mifflin-St Jeor) and a protein/carb/fat split for cutting, maintaining, or bulking.',
    path: '/calculators/tdee',
  })

  const [sex, setSex] = useState<Sex>('male')
  const [weight, setWeight] = useState(80)
  const [height, setHeight] = useState(178)
  const [age, setAge] = useState(28)
  const [activity, setActivity] = useState<ActivityLevel>('moderate')
  const [goal, setGoal] = useState<Goal>('maintain')

  const bmr = calcBMR(sex, weight, height, age)
  const tdee = calcTDEE(bmr, activity)
  const macros = calcMacros(tdee, goal, weight)

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <Link to="/calculators" className="text-sm text-orange-500 hover:underline">
        ← Back to calculators
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">TDEE & Macros</h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Mifflin-St Jeor formula.</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Sex</span>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <NumField label="Age" value={age} onChange={setAge} />
        <NumField label="Weight (kg)" value={weight} onChange={setWeight} />
        <NumField label="Height (cm)" value={height} onChange={setHeight} />
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Activity level</span>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityLevel)}
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        >
          {activityOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-4 flex gap-2">
        {(['cut', 'maintain', 'bulk'] as Goal[]).map((g) => (
          <button
            key={g}
            onClick={() => setGoal(g)}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
              goal === g
                ? 'bg-orange-500 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-6 text-center dark:border-orange-900/50 dark:bg-orange-900/20">
        <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Target daily calories</p>
        <p className="text-4xl font-extrabold text-orange-600 dark:text-orange-400">{macros.calories} kcal</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <MacroTile label="Protein" value={`${macros.proteinG}g`} />
        <MacroTile label="Carbs" value={`${macros.carbsG}g`} />
        <MacroTile label="Fat" value={`${macros.fatG}g`} />
      </div>
    </div>
  )
}

function NumField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:border-orange-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
      />
    </label>
  )
}

function MacroTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="text-lg font-bold text-neutral-900 dark:text-white">{value}</p>
    </div>
  )
}
