import { Link, useParams } from 'react-router-dom'
import { ALTERNATIVES, getAlternativeBySlug } from '../data/alternativesData'
import { useSeo } from '../hooks/useSeo'
import AdSlot from '../components/AdSlot'
import { DEFAULT_AD_SLOT } from '../lib/adsense'

export default function AlternativePage() {
  const { slug } = useParams()
  const entry = slug ? getAlternativeBySlug(slug) : undefined
  const related = entry ? ALTERNATIVES.filter((a) => a.slug !== entry.slug).slice(0, 3) : []

  useSeo({
    title: entry ? entry.title : 'Alternative not found',
    description: entry ? entry.description : 'Page not found.',
    path: `/alternatives/${slug ?? ''}`,
    jsonLd: entry
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: entry.title,
              description: entry.description,
              author: { '@type': 'Organization', name: 'Gymthetic' },
              mainEntityOfPage: `https://gymthetic.vercel.app/alternatives/${entry.slug}`,
              datePublished: '2026-10-01',
              dateModified: '2026-10-01',
            },
            ...(entry.faqs.length > 0
              ? [
                  {
                    '@type': 'FAQPage',
                    mainEntity: entry.faqs.map((f) => ({
                      '@type': 'Question',
                      name: f.q,
                      acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                  },
                ]
              : []),
          ],
        }
      : undefined,
  })

  if (!entry) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">Page not found.</p>
        <Link to="/alternatives" className="mt-4 inline-block text-orange-500 hover:underline">
          Back to alternatives
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/alternatives" className="text-sm text-orange-500 hover:underline">
        ← All alternatives
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">{entry.title}</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">{entry.intro}</p>

      <h2 className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">Side by side</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/60">
              <th className="p-3 font-semibold text-neutral-900 dark:text-white"></th>
              <th className="p-3 font-semibold text-neutral-900 dark:text-white">{entry.competitor}</th>
              <th className="p-3 font-semibold text-orange-500">Gymthetic</th>
            </tr>
          </thead>
          <tbody>
            {entry.comparison.map((row) => (
              <tr key={row.dimension} className="border-b border-neutral-200 last:border-0 dark:border-neutral-800">
                <td className="p-3 font-medium text-neutral-700 dark:text-neutral-200">{row.dimension}</td>
                <td className="p-3 text-neutral-500 dark:text-neutral-400">{row.competitor}</td>
                <td className="p-3 text-neutral-700 dark:text-neutral-200">{row.gymthetic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">
        When {entry.competitor} is still the better choice
      </h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
        {entry.whenCompetitorBetter.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">How to switch</h2>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
        {entry.howToSwitch.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/tracker" className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
          Start logging — free, no account
        </Link>
        <Link to="/exercises" className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800">
          Browse the exercise library
        </Link>
      </div>

      <h2 className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">FAQ</h2>
      <div className="mt-3 space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
        {entry.faqs.map((f) => (
          <div key={f.q}>
            <p className="font-semibold text-neutral-900 dark:text-white">{f.q}</p>
            <p>{f.a}</p>
          </div>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">More alternatives</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                to={`/alternatives/${a.slug}`}
                className="rounded-lg border border-neutral-200 bg-white p-3 text-sm font-medium text-neutral-700 hover:border-orange-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <AdSlot slotId={DEFAULT_AD_SLOT} className="mt-10" />
    </article>
  )
}
