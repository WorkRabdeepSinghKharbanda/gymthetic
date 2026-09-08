import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AdSlot from './AdSlot'
import { DEFAULT_AD_SLOT } from '../lib/adsense'
import { GUIDES } from '../data/guidesList'

const RELATED_COUNT = 3

export default function GuideLayout({
  title,
  dek,
  currentPath,
  children,
}: {
  title: string
  dek: string
  currentPath: string
  children: ReactNode
}) {
  const related = GUIDES.filter((g) => g.to !== currentPath).slice(0, RELATED_COUNT)

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/guides" className="text-sm text-orange-500 hover:underline">
        ← All guides
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">{dek}</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:dark:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_a]:text-orange-500 [&_a]:hover:underline [&_strong]:text-neutral-900 [&_strong]:dark:text-white">
        {children}
      </div>

      {related.length > 0 && (
        <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">More guides</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className="rounded-lg border border-neutral-200 bg-white p-3 text-sm font-medium text-neutral-700 hover:border-orange-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {g.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdSlot slotId={DEFAULT_AD_SLOT} className="mt-10" />
    </article>
  )
}
