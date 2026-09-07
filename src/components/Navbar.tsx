import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useUnit } from '../hooks/useUnit'

const links = [
  { to: '/', label: 'Home' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/guides', label: 'Guides' },
  { to: '/blog', label: 'Blog' },
  { to: '/calculators', label: 'Calculators' },
  { to: '/tracker', label: 'Tracker' },
  { to: '/records', label: 'Records' },
  { to: '/goals', label: 'Goals' },
  { to: '/templates', label: 'Templates' },
  { to: '/measurements', label: 'Measurements' },
  { to: '/badges', label: 'Badges' },
  { to: '/standards', label: 'Standards' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { unit, toggle: toggleUnit } = useUnit()
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-orange-500 text-white'
        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
          Gym<span className="text-orange-500">thetic</span>
        </NavLink>

        <div className="hidden flex-wrap items-center justify-end gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={toggleUnit}
            aria-label="Toggle unit"
            className="ml-1 rounded-md px-2 py-1.5 text-sm font-semibold uppercase text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {unit}
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleUnit}
            aria-label="Toggle unit"
            className="rounded-md px-2 py-1.5 text-sm font-semibold uppercase text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {unit}
          </button>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-md p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-2 md:hidden dark:border-neutral-800">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
