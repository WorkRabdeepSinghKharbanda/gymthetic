import { useSeo } from '../hooks/useSeo'

export default function PrivacyPolicy() {
  useSeo({
    title: 'Privacy Policy',
    description: 'What Gymthetic stores, what Google AdSense may collect, and how to opt out.',
    path: '/privacy',
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm text-neutral-600 dark:text-neutral-300">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Privacy Policy</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">Last updated: 2026</p>

      <h2 className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">What this site stores</h2>
      <p className="mt-2">
        Gymthetic has no backend and no account system. Everything you do here — logged lifts, favorites,
        theme choice, your cookie-consent choice — is stored only in your browser's <code>localStorage</code>,
        on your own device. We never see it, and it is never sent to any server we control. Clearing your
        browser's site data for this domain deletes it permanently. You can export or import your tracker data
        as a JSON file from the Progress Tracker page at any time.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">Advertising (Google AdSense)</h2>
      <p className="mt-2">
        This site may display ads served by Google AdSense. If you accept the cookie-consent banner, Google
        and its partners may use cookies or similar technologies to serve ads based on your prior visits to
        this or other websites. You can opt out of personalized advertising, or see which companies have
        opted into Google's ad personalization, by visiting Google's{' '}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noreferrer noopener"
          className="text-orange-500 hover:underline"
        >
          Ad Settings
        </a>
        . If you decline the consent banner, no ad script is loaded and no ad-related cookies are set.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-neutral-900 dark:text-white">Changing your choice</h2>
      <p className="mt-2">
        Clear this site's data in your browser (or clear <code>localStorage</code>) to reset your
        cookie-consent choice — the banner will reappear on your next visit.
      </p>
    </div>
  )
}
