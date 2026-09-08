// Replace with your real publisher ID from adsense.google.com, then update
// the matching <meta name="google-adsense-account"> tag in index.html and
// the pub- ID in public/ads.txt to match.
export const ADSENSE_PUBLISHER_ID: string = 'ca-pub-5852027898822024'

// "GymAd" ad unit from adsense.google.com — reused across every AdSlot placement site-wide.
// One ad unit is fine to reuse on many pages; AdSense reports impressions/clicks per page
// regardless of how many pages reference the same slot ID.
export const DEFAULT_AD_SLOT = '7427754753'

export function isAdsConfigured(): boolean {
  return ADSENSE_PUBLISHER_ID !== 'ca-pub-0000000000000000'
}
