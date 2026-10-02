import { Link } from 'react-router-dom'
import { sortedBlogPosts } from '../data/blogPosts'

const COUNT = 3

/** Same-category posts first, then next posts in the sorted list (wrapping) to fill any remaining slots. */
export default function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const posts = sortedBlogPosts()
  const current = posts.find((p) => p.slug === currentSlug)
  const index = posts.findIndex((p) => p.slug === currentSlug)

  const sameCategory = current ? posts.filter((p) => p.slug !== currentSlug && p.category === current.category) : []
  const fallback =
    index === -1
      ? posts.slice(0, COUNT)
      : Array.from({ length: posts.length - 1 }, (_, i) => posts[(index + i + 1) % posts.length]).filter((p) => p.slug !== currentSlug)

  const sameCategorySlugs = new Set(sameCategory.map((p) => p.slug))
  const related = [...sameCategory, ...fallback.filter((p) => !sameCategorySlugs.has(p.slug))].slice(0, COUNT)

  if (related.length === 0) return null

  return (
    <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-white">More posts</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="rounded-lg border border-neutral-200 bg-white p-3 text-sm font-medium text-neutral-700 hover:border-orange-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
