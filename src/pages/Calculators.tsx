import CalculatorCard from '../components/CalculatorCard'
import { useSeo } from '../hooks/useSeo'

export default function Calculators() {
  useSeo({
    title: 'Calculators',
    description: '1RM, TDEE/macro, plateau breaker, and plate-math calculators for planning your training and nutrition.',
    path: '/calculators',
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Calculators</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">Tools to plan training and nutrition.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <CalculatorCard
          to="/calculators/one-rep-max"
          title="1RM Calculator"
          description="Estimate your one-rep max and a full percentage-based training table."
          icon="🏋️"
        />
        <CalculatorCard
          to="/calculators/tdee"
          title="TDEE & Macros"
          description="Daily calorie needs and a protein/carb/fat split for your goal."
          icon="🍽️"
        />
        <CalculatorCard
          to="/calculators/plateau-breaker"
          title="Plateau Breaker"
          description="Stuck on a lift? Get a checklist and concrete next steps."
          icon="🧗"
        />
        <CalculatorCard
          to="/calculators/plates"
          title="Plate Calculator"
          description="Work out which plates to load per side for any target weight."
          icon="⚙️"
        />
      </div>
    </div>
  )
}
