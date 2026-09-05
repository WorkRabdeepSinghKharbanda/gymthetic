import { useEffect, useState } from 'react'
import { getTheme, setTheme as persistTheme, type Theme } from '../lib/storage'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    persistTheme(next)
    setThemeState(next)
  }

  return { theme, toggle }
}
