// Replace with your real publisher ID from adsense.google.com, then update
// the matching <meta name="google-adsense-account"> tag in index.html and
// the pub- ID in public/ads.txt to match.
export const ADSENSE_PUBLISHER_ID: string = 'ca-pub-5852027898822024'

export function isAdsConfigured(): boolean {
  return ADSENSE_PUBLISHER_ID !== 'ca-pub-0000000000000000'
}

let scriptLoaded = false

/** Injects the AdSense script once. Must only be called after consent. */
export function loadAdsenseScript(): void {
  if (scriptLoaded || !isAdsConfigured()) return
  if (document.querySelector('script[data-adsbygoogle]')) {
    scriptLoaded = true
    return
  }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`
  script.crossOrigin = 'anonymous'
  script.dataset.adsbygoogle = 'true'
  document.head.appendChild(script)
  scriptLoaded = true
}
