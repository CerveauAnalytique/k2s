import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export interface BlogPostItem {
  id: string
  blogId?: string
  title: string
  slug: string
  category: string
  coverImageUrl?: string
  excerpt?: string
  publishedAt?: string
}

interface BlogCardsProps {
  stories?: BlogPostItem[]
  business?: BlogPostItem[]
  allPosts?: BlogPostItem[]
}

const DEFAULT_EXPLORE = [
  {
    title: 'Enterprise',
    category: 'Business',
    color: 'from-amber-400 via-orange-400 to-rose-400',
    icon: (
      <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'SMB',
    category: 'Stories',
    color: 'from-sky-400 via-blue-400 to-indigo-400',
    icon: (
      <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 20s2-4 6-4 4 4 8 4 6-4 6-4V4s-2 4-6 4-4-4-8-4-6 4-6 4z" />
      </svg>
    ),
  },
  {
    title: 'Startups',
    category: 'Business',
    color: 'from-emerald-400 via-teal-400 to-cyan-400',
    icon: (
      <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Developers',
    category: 'Explore',
    color: 'from-fuchsia-400 via-pink-400 to-rose-400',
    icon: (
      <svg className="w-12 h-12 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
]

const DEFAULT_FEATURE_TRIO = [
  {
    title: 'Build',
    desc: 'Create agent workflows with the Agents SDK and Responses API, and add voice with the Realtime API.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Ground',
    desc: 'Give agents relevant context through built-in tools like web search, file search, and remote MCP servers.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Act',
    desc: 'Connect agents securely to business systems so they can take action across workflows.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
]

export function BlogCards({ stories, business }: BlogCardsProps) {
  const displayStories = stories && stories.length > 0 ? stories : []
  const displayBusiness = business && business.length > 0 ? business : []

  return (
    <section className="w-full py-12 md:py-20 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 space-y-16">
        {/* Section 1: Explore More */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight">Explore more</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DEFAULT_EXPLORE.map((item) => (
              <Link
                key={item.title}
                href={`/blog?category=${encodeURIComponent(item.category)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-95 group-hover:scale-105 transition-transform duration-500`} />
                <div className="relative z-10 flex justify-end">{item.icon}</div>
                <div className="relative z-10 font-bold text-white text-lg tracking-tight">
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: Stories (Payload CMS Posts with Stories category) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Stories</h3>
            <Link
              href="/blog?category=Stories"
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition flex items-center"
            >
              View all <ArrowUpRight size={13} className="ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayStories.slice(0, 3).map((story) => (
              <Link
                key={story.id}
                href={`/blog/${story.slug}`}
                className="group flex flex-col space-y-3 cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <img
                    src={story.coverImageUrl || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800'}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {story.blogId && (
                    <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {story.blogId}
                    </span>
                  )}
                </div>
                <h4 className="text-base font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {story.title}
                </h4>
                <div className="text-xs font-medium text-neutral-400">
                  {story.category ? `${story.category} • ` : ''}
                  {story.publishedAt || 'Aug 2026'}
                </div>
              </Link>
            ))}
          </div>

          {/* Sub-Feature Cards: Build / Ground / Act */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {DEFAULT_FEATURE_TRIO.map((feat) => (
              <div key={feat.title} className="group space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                </div>
                <h5 className="text-lg font-bold">{feat.title}</h5>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Prysel for Business (Payload CMS Posts with Business category) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Prysel for business</h3>
            <Link
              href="/blog?category=Business"
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition flex items-center"
            >
              View all <ArrowUpRight size={13} className="ml-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayBusiness.slice(0, 3).map((biz) => (
              <Link
                key={biz.id}
                href={`/blog/${biz.slug}`}
                className="group flex flex-col space-y-3 cursor-pointer"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center p-6 text-center">
                  <img
                    src={biz.coverImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'}
                    alt={biz.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative z-10 font-bold text-white text-xl tracking-tight bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                    {biz.title.split(' ')[0]} {biz.title.split(' ')[1] || ''}
                  </div>
                </div>
                <h4 className="text-base font-bold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {biz.title}
                </h4>
                <div className="text-xs font-medium text-neutral-400">
                  {biz.category} • {biz.publishedAt || 'Aug 2026'}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
