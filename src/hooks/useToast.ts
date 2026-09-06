import { useEffect, useState } from 'react'

export function useToast(durationMs = 2000) {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!message) return
    const id = window.setTimeout(() => setMessage(null), durationMs)
    return () => clearTimeout(id)
  }, [message, durationMs])

  return { message, show: setMessage }
}
