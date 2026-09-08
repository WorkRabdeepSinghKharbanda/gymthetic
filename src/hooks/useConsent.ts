import { useState } from 'react'
import { getConsent, setConsent as persistConsent, type ConsentChoice } from '../lib/storage'

/**
 * The AdSense script now loads unconditionally on app start (see main.tsx) regardless of
 * the choice recorded here — this hook only drives the banner UI and the recorded choice.
 */
export function useConsent() {
  const [consent, setConsentState] = useState<ConsentChoice | null>(() => getConsent())

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
