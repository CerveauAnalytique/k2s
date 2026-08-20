'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchModal } from '@/components/SearchModal'

type NavItem = {
  title: string
  href: string
  children?: { title: string; href: string }[]
}

export const DOCS_NAV: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs',
    children: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quickstart', href: '/docs/quickstart' },
      { title: 'Authentication', href: '/docs/authentication' },
      { title: 'Your First Request', href: '/docs/first-request' },
      { title: 'Error Handling', href: '/docs/errors' },
    ],
  },
  {
    title: 'Carbon API',
    href: '/docs/carbon',
    children: [
      { title: 'Overview', href: '/docs/carbon' },
      { title: 'Calculate Footprint', href: '/docs/carbon/calculate' },
      { title: 'Country Averages', href: '/docs/carbon/averages' },
      { title: 'Emission Factors', href: '/docs/carbon/factors' },
      { title: 'CNN Model Details', href: '/docs/carbon/model' },
    ],
  },
  {
    title: 'Search API',
    href: '/docs/search',
    children: [
      { title: 'Overview', href: '/docs/search' },
      { title: 'Semantic Search', href: '/docs/search/semantic' },
      { title: 'Filtering', href: '/docs/search/filtering' },
    ],
  },
  {
    title: 'Predictive API',
    href: '/docs/predict',
    children: [
      { title: 'Overview', href: '/docs/predict' },
      { title: 'Time-Series Forecasting', href: '/docs/predict/timeseries' },
      { title: 'Anomaly Detection', href: '/docs/predict/anomaly' },
    ],
  },
  {
    title: 'SDKs',
    href: '/docs/sdks',
    children: [
      { title: 'JavaScript / TypeScript', href: '/docs/sdks/js' },
      { title: 'Python', href: '/docs/sdks/python' },
      { title: 'Go', href: '/docs/sdks/go' },
    ],
  },
  {
    title: 'Reference',
    href: '/docs/reference',
    children: [
      { title: 'API Reference', href: '/docs/reference' },
      { title: 'Rate Limits', href: '/docs/reference/rate-limits' },
      { title: 'Changelog', href: '/docs/reference/changelog' },
      { title: 'FAQ', href: '/docs/reference/faq' },
    ],
  },
]

type Props = {
  children: React.ReactNode
  title: string
  description?: string
  prevPage?: { title: string; href: string }
  nextPage?: { title: string; href: string }
  toc?: { id: string; title: string; level: number }[]
}

export function DocsLayout({ children, title, description, prevPage, nextPage, toc }: Props) {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="docs-layout">
      {/* Docs Sidebar */}
      <aside className={`docs-sidebar ${mobileNavOpen ? 'docs-sidebar--open' : ''}`}>
        <div className="docs-sidebar-header">
          <Link href="/docs" className="docs-brand">
            <span className="docs-brand-icon">📚</span>
            <span>CA Docs</span>
          </Link>
          <button className="docs-mobile-close" onClick={() => setMobileNavOpen(false)}>✕</button>
        </div>

        <div className="docs-search-wrap">
          <input
            className="docs-search-input cursor-pointer"
            placeholder="Search docs… (⌘K)"
            onClick={() => setIsSearchOpen(true)}
            readOnly
          />
        </div>

        <nav className="docs-nav">
          {DOCS_NAV.map((section) => {
            const isActive = section.children?.some((c) => c.href === pathname) || pathname === section.href
            return (
              <div key={section.title} className="docs-nav-section">
                <span className="docs-nav-group-title">{section.title}</span>
                {section.children && (
                  <ul className="docs-nav-list">
                    {section.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`docs-nav-link ${pathname === child.href ? 'docs-nav-link--active' : ''}`}
                          onClick={() => setMobileNavOpen(false)}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>

        <div className="docs-sidebar-footer">
          <a href="https://github.com/prysel" className="docs-sidebar-ext-link">GitHub ↗</a>
          <Link href="/api" className="docs-sidebar-ext-link">API →</Link>
        </div>
      </aside>

      {/* Main docs content */}
      <div className="docs-main-wrap">
        {/* Topbar */}
        <div className="docs-topbar">
          <button className="docs-mobile-menu-btn" onClick={() => setMobileNavOpen(true)}>
            ☰ Menu
          </button>
          <div className="docs-breadcrumb">
            <Link href="/docs" className="docs-breadcrumb-link">Docs</Link>
            <span className="docs-breadcrumb-sep">/</span>
            <span className="docs-breadcrumb-current">{title}</span>
          </div>
          <div className="docs-topbar-right">
            <Link href="/dashboard" className="docs-topbar-link">Dashboard</Link>
          </div>
        </div>

        <div className="docs-body">
          {/* Article */}
          <article className="docs-article">
            <header className="docs-article-header">
              {description && <p className="docs-article-lead">{description}</p>}
              <h1 className="docs-article-title">{title}</h1>
            </header>
            <div className="docs-content prose">
              {children}
            </div>

            {/* Prev / Next navigation */}
            {(prevPage || nextPage) && (
              <nav className="docs-pager">
                {prevPage && (
                  <Link href={prevPage.href} className="docs-pager-prev">
                    <span className="docs-pager-dir">← Previous</span>
                    <span className="docs-pager-title">{prevPage.title}</span>
                  </Link>
                )}
                {nextPage && (
                  <Link href={nextPage.href} className="docs-pager-next">
                    <span className="docs-pager-dir">Next →</span>
                    <span className="docs-pager-title">{nextPage.title}</span>
                  </Link>
                )}
              </nav>
            )}
          </article>

          {/* TOC */}
          {toc && toc.length > 0 && (
            <aside className="docs-toc">
              <div className="docs-toc-title">On this page</div>
              <ul className="docs-toc-list">
                {toc.map((item) => (
                  <li key={item.id} className={`docs-toc-item docs-toc-item--h${item.level}`}>
                    <a href={`#${item.id}`} className="docs-toc-link">{item.title}</a>
                  </li>
                ))}
              </ul>
              <div className="docs-toc-actions">
                <a href="https://github.com/prysel/docs" className="docs-toc-action">Edit on GitHub ↗</a>
              </div>
            </aside>
          )}
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  )
}
