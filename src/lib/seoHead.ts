export const SITE_URL = 'https://gymthetic.vercel.app'
export const SITE_NAME = 'Gymthetic'

export interface SeoOptions {
  title: string
  description: string
  path: string
  jsonLd?: object
  noindex?: boolean
}

export function fullTitle(title: string): string {
  return title === SITE_NAME ? title : `${title} — ${SITE_NAME}`
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Renders the full set of per-page <head> tags as an HTML string, for SSR/prerendering. */
export function buildHeadHtml(opts: SeoOptions): string {
  const title = fullTitle(opts.title)
  const url = `${SITE_URL}${opts.path}`
  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(opts.description)}" />`,
    `<meta name="robots" content="${opts.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(opts.description)}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(opts.description)}" />`,
  ]
  if (opts.jsonLd) {
    // Escape "</script" so a string value inside the JSON-LD payload can't prematurely close
    // this tag and inject markup — unlike DOM textContent, string-concatenated HTML has no
    // automatic escaping.
    const json = JSON.stringify(opts.jsonLd).replace(/<\/script/gi, '<\\/script')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}
