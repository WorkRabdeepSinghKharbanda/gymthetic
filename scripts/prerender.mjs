#!/usr/bin/env node
// Run after the client build (reads dist/index.html as the template). For every public,
// indexable route, renders it to static HTML via dist-server/entry-server.js and writes it
// into dist/ so non-JS crawlers (and anyone with JS disabled) see real content, not an empty
// shell. dist/index.html itself gets overwritten with the homepage's render — the pristine
// empty-#root shell used as the SPA fallback for every other route (tracker, records, etc.,
// and any path outside the prerendered set) is preserved first as dist/shell.html — see
// vercel.json's rewrite destination.
import fs from 'node:fs'
import path from 'node:path'
import { render, getSitemapEntries } from '../dist-server/entry-server.js'

const template = fs.readFileSync('dist/index.html', 'utf-8')
fs.writeFileSync('dist/shell.html', template)

const entries = getSitemapEntries()
let count = 0

for (const { path: routePath } of entries) {
  const { appHtml, headHtml } = render(routePath)

  let html = template.replace(
    /<!--ssr-head-start-->[\s\S]*?<!--ssr-head-end-->/,
    `<!--ssr-head-start-->\n    ${headHtml}\n    <!--ssr-head-end-->`,
  )
  html = html.replace('<!--ssr-html-->', appHtml)

  const outPath = routePath === '/' ? 'dist/index.html' : `dist${routePath}.html`
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html)
  count++
}

console.log(`prerender: wrote ${count} static pages into dist/`)
