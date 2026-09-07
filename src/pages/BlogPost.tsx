import { Link, useParams } from 'react-router-dom'
import { getBlogPostBySlug } from '../data/blogPosts'
import { useSeo } from '../hooks/useSeo'

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  useSeo({
    title: post ? post.title : 'Post not found',
    description: post ? post.description : 'Post not found.',
    path: `/blog/${slug ?? ''}`,
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Organization', name: 'Gymthetic' },
          mainEntityOfPage: `https://gymthetic.vercel.app/blog/${post.slug}`,
        }
      : undefined,
  })

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">Post not found.</p>
        <Link to="/blog" className="mt-4 inline-block text-orange-500 hover:underline">
          Back to blog
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/blog" className="text-sm text-orange-500 hover:underline">
        ← Back to blog
      </Link>
      <p className="mt-3 text-xs text-neutral-400">
        {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <h1 className="mt-1 text-3xl font-bold text-neutral-900 dark:text-white">{post.title}</h1>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {post.body.map((line, i) =>
          line.startsWith('## ') ? (
            <h2 key={i} className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">
              {line.slice(3)}
            </h2>
          ) : (
            <p key={i}>{line}</p>
          ),
        )}
      </div>
    </article>
  )
}
