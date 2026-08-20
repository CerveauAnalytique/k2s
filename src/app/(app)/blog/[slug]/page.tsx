import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Tag, Bookmark } from 'lucide-react'
import { SAMPLE_POSTS } from '@/utilities/seedPosts'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams

  let post: any = null

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts' as any,
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (result && result.docs && result.docs.length > 0) {
      post = result.docs[0]
    }
  } catch (err) {
    // Fallback lookup
  }

  // Fallback to sample posts if DB document is not found
  if (!post) {
    const sample = SAMPLE_POSTS.find((p) => p.slug === slug)
    if (sample) {
      post = sample
    }
  }

  if (!post) {
    notFound()
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'August 2026'

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            {post.blogId && (
              <span className="bg-black text-white dark:bg-white dark:text-black font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {post.blogId}
              </span>
            )}
            <span className="flex items-center text-neutral-500">
              <Tag className="w-3.5 h-3.5 mr-1" />
              {post.category || 'Stories'}
            </span>
            <span className="flex items-center text-neutral-500">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {publishedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-neutral-900 dark:text-white">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.coverImageUrl && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none py-6 border-t border-neutral-200 dark:border-neutral-800 leading-relaxed space-y-6">
          <p className="text-base text-neutral-700 dark:text-neutral-300 leading-loose">
            Analytical intelligence transforms how modern organizations reason across continuous streams of multimodal data. By integrating real-time telemetry with autonomous agent reasoning, teams deploy scalable AI pipelines directly from intuitive interfaces.
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Key Architecture Takeaways
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>Zero-latency edge routing with localized Payload CMS schemas.</li>
            <li>Autonomous vector retrieval and deep reasoning fallback engines.</li>
            <li>Enterprise-grade compliance boundaries and token-level access control.</li>
          </ul>
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const sample = SAMPLE_POSTS.find((p) => p.slug === slug)
  return {
    title: `${sample?.title || 'Blog Post'} — Prysel`,
    description: sample?.excerpt || 'Read latest blog stories and insights.',
  }
}
