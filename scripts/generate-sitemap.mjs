#!/usr/bin/env node
// Run after `vite build --ssr` (reads dist-server/entry-server.js) and before the client
// build (writes public/sitemap.xml so the client build's public/* copy picks it up fresh).
import fs from 'node:fs'
import { getSitemapEntries } from '../dist-server/entry-server.js'

const SITE_URL = 'https://gymthetic.vercel.app'
const today = new Date().toISOString().slice(0, 10)

const entries = getSitemapEntries()

const urls = entries
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

fs.writeFileSync('public/sitemap.xml', xml)
console.log(`generate-sitemap: wrote public/sitemap.xml with ${entries.length} URLs`)
