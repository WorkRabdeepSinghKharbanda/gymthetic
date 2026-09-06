import { useEffect, useState } from 'react'
import { getConsent, setConsent as persistConsent, type ConsentChoice } from '../lib/storage'
import { loadAdsenseScript } from '../lib/adsense'

export function useConsent() {
  const [consent, setConsentState] = useState<ConsentChoice | null>(() => getConsent())

  useEffect(() => {
    if (consent === 'accepted') loadAdsenseScript()
  }, [consent])

  function accept() {
    persistConsent('accepted')
    setConsentState('accepted')
  }

  function decline() {
    persistConsent('declined')
    setConsentState('declined')
  }

  return { consent, accept, decline }
}
