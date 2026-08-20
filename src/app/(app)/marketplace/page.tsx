import Link from 'next/link'
import type { Metadata } from 'next'

import { AppTile } from '@/components/marketplace/AppTile'
import { getApps, getCategories } from '@/lib/marketplace/api'
import { getMarketplaceToken } from '@/lib/marketplace/auth'
import type { MarketplaceApp } from '@/lib/marketplace/types'

export const metadata: Metadata = {
  title: 'Neuriy Marketplace',
  description: 'Browse, download, and publish AI apps and tools for Neuriy Chat.',
}

type SearchParams = Promise<{ q?: string; category?: string; sort?: string }>

export default async function MarketplaceHomePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const query = params.q || ''
  const category = params.category || 'All Categories'
  const sort = params.sort === 'new' ? 'new' : 'popular'
  const signedIn = Boolean(await getMarketplaceToken())

  let featuredApps: MarketplaceApp[] = []
  let catalogApps: MarketplaceApp[] = []
  let categories = await getCategories()
  let apiError: string | null = null

  try {
    ;[featuredApps, catalogApps, categories] = await Promise.all([
      getApps({ q: query || undefined, category, featured: true, sort: 'popular' }),
      getApps({ q: query || undefined, category, sort }),
      getCategories(),
    ])
  } catch {
    apiError = 'Marketplace API is unavailable. Start the Python API on port 8000 (pnpm marketplace:api).'
  }

  return (
    <>
      {apiError ? <div className="banner banner--warn">{apiError}</div> : null}

      <section className="store-hero">
        <div className="store-hero__copy">
          <p className="store-hero__brand">Neuriy Marketplace</p>
          <h1 className="store-hero__title">Apps and tools for Neuriy AI</h1>
          <p className="store-hero__lede">
            Browse featured assistants, publish your own packages, and open installs from Neuriy Chat.
          </p>
          <div className="store-hero__actions">
            <a className="button button--primary" href="#featured">
              Explore featured
            </a>
            {signedIn ? (
              <Link className="button button--ghost" href="/marketplace/apps/upload">
                Upload your app
              </Link>
            ) : (
              <Link className="button button--ghost" href="/marketplace/account/register">
                Create account
              </Link>
            )}
            <Link className="button button--ghost" href="/marketplace/pages/sdk">
              Open in Neuriy Chat
            </Link>
          </div>
        </div>
        <div className="store-hero__visual" aria-hidden="true">
          <div className="store-hero__orbit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marketplace/images/neuriy-logo.svg" alt="" width={120} height={120} />
          </div>
        </div>
      </section>

      <section className="categories-bar">
        <form method="get" action="/marketplace" className="categories-form">
          <input type="hidden" name="q" value={query} />
          <input type="hidden" name="sort" value={sort} />
          <label className="categories-trigger">
            <span className="categories-trigger__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8" />
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8" />
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8" />
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <select name="category" className="categories-select" defaultValue={category} aria-label="All Categories">
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="categories-trigger__chevron" aria-hidden="true">
              ▾
            </span>
          </label>
          <noscript>
            <button type="submit">Apply</button>
          </noscript>
        </form>
      </section>

      <section className="panel" id="featured">
        <div className="panel__header">
          <h2 className="panel__title">Featured Apps</h2>
          <Link className="panel__link" href="/marketplace?sort=popular">
            View All »
          </Link>
        </div>
        <div className="app-row">
          {featuredApps.length === 0 ? (
            <p className="empty">No featured apps yet.</p>
          ) : (
            featuredApps.slice(0, 7).map((app) => <AppTile key={app.id} app={app} />)
          )}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header panel__header--tabs">
          <div className="tabs" role="tablist">
            <Link
              className={`tab ${sort === 'popular' ? 'is-active' : ''}`}
              role="tab"
              href={`/marketplace?${new URLSearchParams({ ...(query ? { q: query } : {}), category, sort: 'popular' }).toString()}`}
            >
              Popular
            </Link>
            <Link
              className={`tab ${sort === 'new' ? 'is-active' : ''}`}
              role="tab"
              href={`/marketplace?${new URLSearchParams({ ...(query ? { q: query } : {}), category, sort: 'new' }).toString()}`}
            >
              New
            </Link>
          </div>
          <Link
            className="panel__link"
            href={`/marketplace?${new URLSearchParams({ ...(query ? { q: query } : {}), category, sort }).toString()}`}
          >
            View All »
          </Link>
        </div>
        <div className="app-grid">
          {catalogApps.length === 0 ? (
            <p className="empty">No apps match your search.</p>
          ) : (
            catalogApps.map((app) => <AppTile key={app.id} app={app} />)
          )}
        </div>
      </section>

      <section className="panel panel--cta">
        <div className="cta-row">
          <div>
            <h2 className="panel__title">Build for Neuriy Chat</h2>
            <p className="lede">
              Use the official SDK to search, install, and open marketplace apps from Neuriy Chat conversations.
            </p>
          </div>
          <Link className="button button--primary" href="/marketplace/pages/sdk">
            Get the SDK
          </Link>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `document.querySelector('.categories-select')?.addEventListener('change', (e) => e.target.form?.submit())`,
        }}
      />
    </>
  )
}
