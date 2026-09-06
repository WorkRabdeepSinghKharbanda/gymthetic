import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      <p>Gymthetic — built for lifters who track their progress. Data stays on your device.</p>
      <Link to="/privacy" className="mt-1 inline-block text-orange-500 hover:underline">
        Privacy Policy
      </Link>
    </footer>
  )
}
