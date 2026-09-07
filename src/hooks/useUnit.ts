import { useEffect, useState } from 'react'
import { getUnit, setUnit as persistUnit, type Unit } from '../lib/storage'

export function useUnit() {
  const [unit, setUnitState] = useState<Unit>(() => getUnit())

  useEffect(() => {
    function handler(e: Event) {
      setUnitState((e as CustomEvent<Unit>).detail)
    }
    window.addEventListener('gymthetic:unit', handler)
    return () => window.removeEventListener('gymthetic:unit', handler)
  }, [])

  function toggle() {
    const next: Unit = unit === 'kg' ? 'lb' : 'kg'
    persistUnit(next)
    setUnitState(next)
  }

  return { unit, toggle }
}
