'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import type { MarketplaceUser } from '@/lib/marketplace/types'

type Props = {
  user: MarketplaceUser | null
  query?: string
  category?: string
  sort?: string
  children: React.ReactNode
  flash?: { success?: string; error?: string }
}

function isActive(pathname: string, href: string) {
  if (href === '/marketplace') return pathname === '/marketplace'
  return pathname.startsWith(href)
}

export function MarketplaceShell({ user, query = '', category = 'All Categories', sort = 'popular', children, flash }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const signedIn = Boolean(user)
  const isModerator = user?.role === 'admin' || user?.role === 'administrator'
  const initial = user?.username?.[0]?.toUpperCase() || '?'

  useEffect(() => {
    const hero = document.querySelector('.store-hero')
    if (hero) requestAnimationFrame(() => hero.classList.add('is-ready'))
  }, [pathname])

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="neuriy-marketplace">
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="brand" href="/marketplace" aria-label="Neuriy Marketplace home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marketplace/images/neuriy-logo.svg" alt="" width={36} height={36} />
            <span className="brand__text">
              <span className="brand__name">Neuriy</span>
              <span className="brand__sub">Marketplace</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            <Link className={`site-nav__link ${isActive(pathname, '/marketplace') && !pathname.includes('/pages/') ? 'is-active' : ''}`} href="/marketplace">
              Store
            </Link>
            <Link className={`site-nav__link ${isActive(pathname, '/marketplace/pages/sdk') ? 'is-active' : ''}`} href="/marketplace/pages/sdk">
              SDK
            </Link>
            <Link
              className={`site-nav__link ${isActive(pathname, '/marketplace/pages/publishers') ? 'is-active' : ''}`}
              href="/marketplace/pages/publishers"
            >
              Publish
            </Link>
            <Link
              className={`site-nav__link ${isActive(pathname, '/marketplace/pages/community') ? 'is-active' : ''}`}
              href="/marketplace/pages/community"
            >
              Community
            </Link>
          </nav>

          <form className="search" action="/marketplace" method="get" role="search">
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="sort" value={sort} />
            <span className="search__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              className="search__input"
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search apps & tools"
              aria-label="Search apps"
            />
          </form>

          <div className="site-header__actions">
            {signedIn ? (
              <>
                <Link className="header-link header-link--upload" href="/marketplace/apps/upload">
                  Upload
                </Link>
                <div className={`user-menu ${menuOpen ? 'is-open' : ''}`} ref={menuRef}>
                  <button
                    type="button"
                    className="user-menu__button"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    aria-label="Account menu"
                    onClick={(e) => {
                      e.stopPropagation()
                      setMenuOpen((open) => !open)
                    }}
                  >
                    <span className="user-avatar" aria-hidden="true">
                      {initial}
                    </span>
                    <span className="user-menu__meta">
                      <span className="user-menu__name">{user?.username}</span>
                      <span className="user-menu__role">{user?.role}</span>
                    </span>
                    <svg className="user-menu__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  {menuOpen ? (
                    <div className="user-menu__dropdown">
                      <div className="user-menu__header">
                        <span className="user-avatar user-avatar--lg" aria-hidden="true">
                          {initial}
                        </span>
                        <div>
                          <strong>{user?.username}</strong>
                          <div className="muted">{user?.email || user?.role}</div>
                        </div>
                      </div>
                      <Link href="/marketplace/account/profile">Profile</Link>
                      <Link href="/marketplace/account/settings">Settings</Link>
                      {isModerator ? <Link href="/marketplace/admin">Rules & moderation</Link> : null}
                      <Link href="/marketplace/pages/sdk">Open in Neuriy Chat</Link>
                      <form action="/api/marketplace/auth/logout" method="post">
                        <button type="submit" className="user-menu__logout">
                          Sign out
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <Link className="header-link" href="/marketplace/account/login">
                  Sign in
                </Link>
                <Link className="button button--primary button--compact" href="/marketplace/account/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="page">
        {flash?.success ? <div className="banner banner--ok">{flash.success}</div> : null}
        {flash?.error ? <div className="banner banner--warn">{flash.error}</div> : null}
        {children}
      </main>

      <footer className="site-footer">
        <div className="site-footer__grid">
          <div className="footer-brand">
            <Link className="brand" href="/marketplace">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/marketplace/images/neuriy-logo.svg" alt="" width={32} height={32} />
              <span className="brand__text">
                <span className="brand__name">Neuriy</span>
                <span className="brand__sub">Marketplace</span>
              </span>
            </Link>
            <p>Discover, download, and publish AI apps and tools for Neuriy Chat.</p>
          </div>
          <div>
            <h3>Discover</h3>
            <Link href="/marketplace">Store</Link>
            <Link href="/marketplace/pages/community">Community</Link>
            <Link href="/marketplace/pages/publishers">Publishers</Link>
            <Link href="/marketplace/pages/support">Support</Link>
          </div>
          <div>
            <h3>Developers</h3>
            <Link href="/marketplace/pages/sdk">Neuriy Chat SDK</Link>
            <Link href="/marketplace/pages/developers">Developer docs</Link>
            <Link href="/marketplace/apps/upload">Upload an app</Link>
            <a href="/api/marketplace/proxy/docs" rel="noopener">
              API reference
            </a>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/marketplace/pages/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/marketplace/pages/terms">Terms</Link>
            <Link href="/marketplace/pages/cookies">Cookies</Link>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Neuriy Marketplace</span>
          <Link href="/">Back to Cerveau Analytique</Link>
        </div>
      </footer>
    </div>
  )
}
