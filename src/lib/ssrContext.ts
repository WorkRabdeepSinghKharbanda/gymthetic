import type { SeoOptions } from './seoHead'

/**
 * Module-level box the active page's useSeo() call writes into during a server render
 * (renderToString runs component bodies synchronously, so this is populated by the time
 * render() returns). Reset before each route's render — this module is only ever used from
 * a single-threaded, one-route-at-a-time prerender script, never a concurrent request server.
 */
let current: SeoOptions | null = null

export function setSsrHead(opts: SeoOptions): void {
  current = opts
}

export function getSsrHead(): SeoOptions | null {
  return current
}

export function resetSsrHead(): void {
  current = null
}
