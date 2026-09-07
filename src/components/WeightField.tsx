import NumberField from './NumberField'
import { useUnit } from '../hooks/useUnit'
import { kgToLb, lbToKg } from '../lib/units'

/** A NumberField for weight that displays/accepts the user's preferred unit while storing kg internally. */
export default function WeightField({
  label,
  valueKg,
  onChangeKg,
  min = 0,
  max = 500,
}: {
  label: string
  valueKg: number
  onChangeKg: (kg: number) => void
  min?: number
  max?: number
}) {
  const { unit } = useUnit()
  const displayValue = unit === 'lb' ? Math.round(kgToLb(valueKg) * 10) / 10 : valueKg
  const displayMax = unit === 'lb' ? Math.round(kgToLb(max)) : max

  function handleChange(v: number) {
    onChangeKg(unit === 'lb' ? lbToKg(v) : v)
  }

  return (
    <NumberField
      label={`${label} (${unit})`}
      value={displayValue}
      onChange={handleChange}
      min={min}
      max={displayMax}
      step={unit === 'lb' ? 5 : 2.5}
    />
  )
}
