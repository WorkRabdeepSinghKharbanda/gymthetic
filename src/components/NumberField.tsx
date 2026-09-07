import { useEffect, useRef, useState } from 'react'

export default function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  className = '',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}) {
  const [text, setText] = useState(String(value))
  const lastEmitted = useRef(value)

  // Sync from parent only when the value changed externally (not from our own onChange).
  useEffect(() => {
    if (value !== lastEmitted.current) {
      setText(String(value))
      lastEmitted.current = value
    }
  }, [value])

  function clamp(n: number) {
    let result = n
    if (result < min) result = min
    if (max !== undefined && result > max) result = max
    return result
  }

  function handleChange(raw: string) {
    setText(raw)
    if (raw === '' || raw === '-') return
    const parsed = Number(raw)
    if (Number.isNaN(parsed)) return
    const clamped = clamp(parsed)
    lastEmitted.current = clamped
    onChange(clamped)
  }

  function handleBlur() {
    const parsed = Number(text)
    const clamped = clamp(Number.isNaN(parsed) ? min : parsed)
    setText(String(clamped))
    lastEmitted.current = clamped
    onChange(clamped)
  }

  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-orange-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
      />
    </label>
  )
}
