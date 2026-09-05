import { Link } from 'react-router-dom'

export default function CalculatorCard({
  to,
  title,
  description,
  icon,
}: {
  to: string
  title: string
  description: string
  icon: string
}) {
  return (
    <Link
      to={to}
      className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
    </Link>
  )
}
