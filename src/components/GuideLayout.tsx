import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export default function GuideLayout({ title, dek, children }: { title: string; dek: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/guides" className="text-sm text-orange-500 hover:underline">
        ← All guides
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-white">{title}</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">{dek}</p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900 [&_h2]:dark:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_a]:text-orange-500 [&_a]:hover:underline [&_strong]:text-neutral-900 [&_strong]:dark:text-white">
        {children}
      </div>
    </article>
  )
}
