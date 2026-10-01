import { exercises } from './data/exercises'
import { blogPosts } from './data/blogPosts'

export interface SitemapEntry {
  path: string
  priority: number
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

/**
 * Every public, indexable page that isn't parameterized by content data (exercises/posts,
 * appended below). This list mirrors the <Route> entries in App.tsx for anything NOT already
 * covered by the enumerated exercise/post slugs — keep it in sync when adding a route there.
 * Deliberately excludes noindex personal-data pages (tracker, records, goals, templates,
 * measurements, badges, standards) — their content is per-visitor localStorage and would be
 * empty/misleading if prerendered or listed for crawling.
 */
const STATIC_PAGES: SitemapEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/exercises', priority: 0.9, changefreq: 'weekly' },
  { path: '/calculators', priority: 0.8, changefreq: 'monthly' },
  { path: '/calculators/one-rep-max', priority: 0.7, changefreq: 'monthly' },
  { path: '/calculators/tdee', priority: 0.7, changefreq: 'monthly' },
  { path: '/calculators/plateau-breaker', priority: 0.7, changefreq: 'monthly' },
  { path: '/calculators/plates', priority: 0.7, changefreq: 'monthly' },
  { path: '/calculators/warmup', priority: 0.7, changefreq: 'monthly' },
  { path: '/guides', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/push-pull-legs-split', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/how-to-calculate-your-1rm', priority: 0.8, changefreq: 'monthly' },
  { path: '/guides/breaking-a-strength-plateau', priority: 0.8, changefreq: 'monthly' },
  { path: '/beginner-workout-plan', priority: 0.8, changefreq: 'monthly' },
  { path: '/home-gym-workout-plan', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/best-chest-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-back-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-shoulder-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-leg-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-bicep-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-tricep-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-core-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/best-forearm-exercises', priority: 0.7, changefreq: 'monthly' },
  { path: '/alternatives', priority: 0.7, changefreq: 'monthly' },
  { path: '/alternatives/strong-app-alternative', priority: 0.7, changefreq: 'monthly' },
  { path: '/alternatives/hevy-alternative', priority: 0.7, changefreq: 'monthly' },
  { path: '/alternatives/stronglifts-alternative', priority: 0.7, changefreq: 'monthly' },
  { path: '/alternatives/jefit-alternative', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
]

export function getSitemapEntries(): SitemapEntry[] {
  return [
    ...STATIC_PAGES,
    ...exercises.map((e): SitemapEntry => ({ path: `/exercises/${e.slug}`, priority: 0.6, changefreq: 'monthly' })),
    ...blogPosts.map((p): SitemapEntry => ({ path: `/blog/${p.slug}`, priority: 0.6, changefreq: 'yearly' })),
  ]
}
