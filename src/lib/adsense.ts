// Replace with your real publisher ID from adsense.google.com, then update
// the matching <meta name="google-adsense-account"> tag in index.html and
// the pub- ID in public/ads.txt to match.
export const ADSENSE_PUBLISHER_ID: string = 'ca-pub-5852027898822024'

// Placeholder ad-unit slot ID — replace with a real slot ID once you've created an ad unit
// at adsense.google.com. Until then AdSlot renders its dashed placeholder box everywhere
// (isAdsConfigured() only checks the publisher ID, not per-slot IDs, so this doesn't block launch).
export const DEFAULT_AD_SLOT = '0000000000'

export function isAdsConfigured(): boolean {
  return ADSENSE_PUBLISHER_ID !== 'ca-pub-0000000000000000'
}
