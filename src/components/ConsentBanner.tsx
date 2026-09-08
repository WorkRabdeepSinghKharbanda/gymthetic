import { Link } from 'react-router-dom'
import { useConsent } from '../hooks/useConsent'

export default function ConsentBanner() {
  const { consent, accept, decline } = useConsent()

  if (consent !== null) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          This site shows ads personalized using cookies. See our{' '}
          <Link to="/privacy" className="text-orange-500 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
