import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { RichText } from '@/components/RichText'
import { BlogLoadError, getPublishedPostBySlug } from '@/lib/blog/posts'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPublishedPostBySlug(slug)
    if (!post) return { title: 'Article not found' }
    return {
      title: `${post.title} — Cerveau Analytique`,
      description: post.excerpt || undefined,
    }
  } catch {
    return { title: 'Blog — Cerveau Analytique' }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  let post: Awaited<ReturnType<typeof getPublishedPostBySlug>> = null
  let loadError: string | null = null

  try {
    post = await getPublishedPostBySlug(slug)
  } catch (err) {
    loadError =
      err instanceof BlogLoadError
        ? err.message
        : 'We couldn’t load this article right now. Please try again later.'
  }

  if (!loadError && !post) {
    notFound()
  }

  if (loadError || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 py-16 px-6">
        <div className="max-w-2xl mx-auto rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900/40 dark:bg-amber-950/30">
          <h1 className="text-2xl font-bold mb-2">Unable to load article</h1>
          <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-6">{loadError}</p>
          <Link href="/blog" className="text-sm font-semibold underline">
            Back to blog
          </Link>
        </div>
      </div>
    )
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  const hasRichContent =
    post.content &&
    typeof post.content === 'object' &&
    Array.isArray((post.content as SerializedEditorState).root?.children) &&
    (post.content as SerializedEditorState).root.children.length > 0

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-6 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-semibold text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {post.blogId ? (
              <span className="bg-black text-white dark:bg-white dark:text-black font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {post.blogId}
              </span>
            ) : null}
            <span className="flex items-center text-neutral-500">
              <Tag className="w-3.5 h-3.5 mr-1" />
              {post.category || 'Stories'}
            </span>
            {publishedDate ? (
              <span className="flex items-center text-neutral-500">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {publishedDate}
              </span>
            ) : null}
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-neutral-900 dark:text-white">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          ) : null}
        </div>

        {post.coverImageUrl ? (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ) : null}

        <div className="py-6 border-t border-neutral-200 dark:border-neutral-800">
          {hasRichContent ? (
            <RichText data={post.content as SerializedEditorState} enableGutter={false} />
          ) : post.excerpt ? (
            <p className="text-base text-neutral-700 dark:text-neutral-300 leading-loose">{post.excerpt}</p>
          ) : (
            <p className="text-neutral-500">This article has no body content yet.</p>
          )}
        </div>
      </div>
    </article>
  )
}
