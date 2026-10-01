import { Link, useParams } from 'react-router-dom'
import { getBlogPostBySlug } from '../data/blogPosts'
import { useSeo } from '../hooks/useSeo'
import AdSlot from '../components/AdSlot'
import RelatedPosts from '../components/RelatedPosts'
import MarkdownBody from '../components/MarkdownBody'
import { getDiagramForSlug } from '../components/blogDiagrams'
import { DEFAULT_AD_SLOT } from '../lib/adsense'

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
          '@graph': [
            {
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              keywords: post.keywords.join(', '),
              datePublished: post.date,
              dateModified: post.updated,
              author: { '@type': 'Organization', name: 'Gymthetic' },
              mainEntityOfPage: `https://gymthetic.vercel.app/blog/${post.slug}`,
            },
            {
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
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
        {post.updated !== post.date &&
          ` · updated ${new Date(post.updated).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`}
      </p>
      <h1 className="mt-1 text-3xl font-bold text-neutral-900 dark:text-white">{post.title}</h1>

      {getDiagramForSlug(post.slug)}

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        <MarkdownBody lines={post.body} />
      </div>

      {post.faqs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">FAQ</h2>
          <div className="mt-3 space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
            {post.faqs.map((f) => (
              <div key={f.q}>
                <p className="font-semibold text-neutral-900 dark:text-white">{f.q}</p>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {post.relatedFeatures.length > 0 && (
        <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Tools used in this post</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.relatedFeatures.map((f) => (
              <Link
                key={f.to}
                to={f.to}
                className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-orange-100 hover:text-orange-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-orange-900/40 dark:hover:text-orange-300"
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <RelatedPosts currentSlug={post.slug} />

      <AdSlot slotId={DEFAULT_AD_SLOT} className="mt-10" />
    </article>
  )
}
