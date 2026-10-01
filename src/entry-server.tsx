import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { buildHeadHtml } from './lib/seoHead'
import { getSsrHead, resetSsrHead } from './lib/ssrContext'

export { getSitemapEntries } from './routeManifest'

export interface RenderResult {
  appHtml: string
  headHtml: string
}

/** Renders one route to a static HTML string, for the build-time prerender script. */
export function render(url: string): RenderResult {
  resetSsrHead()
  const appHtml = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  const seo = getSsrHead()
  const headHtml = seo ? buildHeadHtml(seo) : ''
  return { appHtml, headHtml }
}
