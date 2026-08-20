import type { Where } from 'payload'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type BlogPostDTO = {
  id: string
  blogId?: string
  title: string
  slug: string
  category: string
  coverImageUrl?: string
  excerpt?: string
  publishedAt?: string | null
  content?: unknown
}

export class BlogLoadError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message)
    this.name = 'BlogLoadError'
    if (options?.cause) (this as Error & { cause?: unknown }).cause = options.cause
  }
}

function publishedWhere(extra?: Where): Where {
  const now = new Date().toISOString()
  // Payload drafts: Local API returns published docs by default when versions.drafts is enabled.
  // Also require a publishedAt timestamp so scheduled content stays private until due.
  const publishedClause: Where = {
    and: [{ publishedAt: { exists: true } }, { publishedAt: { less_than_equal: now } }],
  }
  if (!extra) return publishedClause
  return { and: [publishedClause, extra] }
}

export function mapPostDoc(doc: Record<string, any>): BlogPostDTO {
  const coverFromUpload =
    doc.coverImage && typeof doc.coverImage === 'object'
      ? doc.coverImage.url || doc.coverImage?.sizes?.card?.url
      : undefined

  return {
    id: String(doc.id),
    blogId: doc.blogId || undefined,
    title: doc.title,
    slug: doc.slug,
    category: doc.category || 'Stories',
    coverImageUrl: doc.coverImageUrl || coverFromUpload || undefined,
    excerpt: doc.excerpt || undefined,
    publishedAt: doc.publishedAt || null,
    content: doc.content,
  }
}

export async function getPublishedPosts(options?: {
  category?: string
  limit?: number
}): Promise<BlogPostDTO[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const category = options?.category?.trim()
    const where = publishedWhere(
      category && category.toLowerCase() !== 'all'
        ? { category: { equals: category } }
        : undefined,
    )

    const result = await payload.find({
      collection: 'posts',
      where,
      limit: options?.limit ?? 20,
      sort: '-publishedAt',
      depth: 1,
      overrideAccess: false,
    })

    return (result.docs || []).map((doc) => mapPostDoc(doc as any))
  } catch (error) {
    console.error('[blog] failed to load posts', error)
    throw new BlogLoadError('We couldn’t load the latest articles right now. Please try again later.', {
      cause: error,
    })
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPostDTO | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      where: publishedWhere({ slug: { equals: slug } }),
      limit: 1,
      depth: 2,
      overrideAccess: false,
    })
    const doc = result.docs?.[0]
    return doc ? mapPostDoc(doc as any) : null
  } catch (error) {
    console.error('[blog] failed to load post', slug, error)
    throw new BlogLoadError('We couldn’t load this article right now. Please try again later.', {
      cause: error,
    })
  }
}
