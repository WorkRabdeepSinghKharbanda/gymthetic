import { useEffect } from 'react'

const SITE_URL = 'https://gymthetic.vercel.app'
const SITE_NAME = 'Gymthetic'

function setMeta(selector: string, attr: string, content: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, content)
}

export interface SeoOptions {
  title: string
  description: string
  path: string
  jsonLd?: object
  noindex?: boolean
}

export function useSeo({ title, description, path, jsonLd, noindex }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
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
  }, [title, description, path, jsonLd])
}
