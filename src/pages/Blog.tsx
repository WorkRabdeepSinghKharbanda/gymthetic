import { Link } from 'react-router-dom'
import { sortedBlogPosts } from '../data/blogPosts'
import { useSeo } from '../hooks/useSeo'
import AdSlot from '../components/AdSlot'
import { DEFAULT_AD_SLOT } from '../lib/adsense'

export default function Blog() {
  useSeo({
    title: 'Blog',
    description: 'Short, practical posts on training, recovery, and nutrition — deload signs, beginner mistakes, protein targets, and more.',
    path: '/blog',
  })

  const posts = sortedBlogPosts()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Blog</h1>
      <p className="mt-1 text-neutral-500 dark:text-neutral-400">Short, practical posts on training, recovery, and nutrition.</p>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="block p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/60">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-semibold uppercase text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                {post.category}
              </span>
            </div>
            <h2 className="mt-1 font-semibold text-neutral-900 dark:text-white">{post.title}</h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{post.description}</p>
          </Link>
        ))}
      </div>

      <AdSlot slotId={DEFAULT_AD_SLOT} className="mt-8" />
    </div>
  )
}
