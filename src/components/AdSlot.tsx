import { useEffect } from 'react'
import { ADSENSE_PUBLISHER_ID, isAdsConfigured } from '../lib/adsense'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdSlot({ slotId, className = '' }: { slotId: string; className?: string }) {
  const live = isAdsConfigured()

  useEffect(() => {
    if (!live) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // adsbygoogle script not ready yet — safe to ignore
    }
  }, [live, slotId])

  if (!live) {
    return (
      <div
        className={`flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-neutral-300 text-xs text-neutral-400 dark:border-neutral-700 dark:text-neutral-600 ${className}`}
      >
        Ad placeholder
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
