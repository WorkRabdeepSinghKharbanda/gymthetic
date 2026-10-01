import { useEffect } from 'react'
import { fullTitle, SITE_URL, type SeoOptions } from '../lib/seoHead'
import { setSsrHead } from '../lib/ssrContext'

export type { SeoOptions }

function setMeta(selector: string, attr: string, content: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, content)
}

export function useSeo(opts: SeoOptions) {
  const { title, description, path, jsonLd, noindex } = opts

  // Runs during the synchronous server render (no `document` yet) — captures this page's
  // head data for the prerender script to inject. See src/lib/ssrContext.ts.
  if (typeof document === 'undefined') {
    setSsrHead(opts)
  }

  useEffect(() => {
    // No-op during SSR (effects never actually fire inside renderToString, but guarding
    // keeps this hook's shape identical in both environments — see Rules of Hooks).
    if (typeof document === 'undefined') return

    const title_ = fullTitle(title)
    const url = `${SITE_URL}${path}`

    document.title = title_
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title_)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', title_)
    setMeta('meta[name="twitter:description"]', 'content', description)

    const scriptId = 'page-json-ld'
    document.getElementById(scriptId)?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, jsonLd, noindex])
}
