import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import AdSlot from '../components/AdSlot'
import { DEFAULT_AD_SLOT } from '../lib/adsense'
import { GUIDES } from '../data/guidesList'

export default function Guides() {
  useSeo({
    title: 'Guides',
    description: 'In-depth training guides: push/pull/legs programming, calculating your 1RM, and breaking through plateaus.',
    path: '/guides',
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Guides</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">In-depth training guides to go with the tools.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {GUIDES.map((g) => (
          <Link
            key={g.to}
            to={g.to}
            className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="text-3xl">{g.icon}</span>
            <h3 className="mt-3 text-lg font-semibold text-neutral-900 dark:text-white">{g.title}</h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{g.description}</p>
          </Link>
        ))}
      </div>

      <AdSlot slotId={DEFAULT_AD_SLOT} className="mt-8" />
    </div>
  )
}
