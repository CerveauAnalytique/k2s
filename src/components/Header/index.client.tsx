'use client'

import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import React, { Suspense, useEffect, useRef, useState } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

import { useAuth } from '@/providers/Auth'
import { User as UserIcon, Bell, Store } from 'lucide-react'
import { formatUserDisplayName } from '@/utilities/formatUserDisplayName'

import { SearchModal } from '@/components/SearchModal'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const { user } = useAuth()
  const menu = header.navItems || []
  const pathname = usePathname()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const username = formatUserDisplayName(user)
  const userAvatar = (user as any)?.avatar?.url || (user as any)?.avatar || (user as any)?.image?.url

  const rawTitle = header.siteTitle || 'Cerveau Analytique'
  const titleParts = rawTitle.split(' ')
  const firstTitlePart = titleParts[0]
  const secondTitlePart = titleParts.slice(1).join(' ')

  const searchPlaceholder = header.searchPlaceholder || 'Search docs, research, products…'
  const loginLabel = header.loginLabel || 'Log in'
  const loginURL = header.loginURL || '/login'
  const startLabel = 'Start chat'
  const startURL = '/chat-neuriy'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearchOpen(true)
  }

  return (
    <nav className="site-header">
      <Link href="/" className="nav-logo">
        {firstTitlePart} {secondTitlePart ? <span>{secondTitlePart}</span> : null}
      </Link>

      <div className="nav-links">
        {menu.length > 0 ? (
          menu.map((item) => (
            <CMSLink
              key={item.id}
              {...item.link}
              size="clear"
              className={cn('nav-link', {
                'text-white bg-white/10':
                  item.link.url && item.link.url !== '/'
                    ? pathname.includes(item.link.url)
                    : false,
              })}
              appearance="nav"
            />
          ))
        ) : (
          <>
            <Link href="/shop" className={cn('nav-link', { 'text-white bg-white/10': pathname.includes('/shop') })}>
              Shop
            </Link>
            <Link
              href="/research"
              className={cn('nav-link', { 'text-white bg-white/10': pathname.includes('/research') })}
            >
              Research
            </Link>
            <Link href="/api" className={cn('nav-link', { 'text-white bg-white/10': pathname === '/api' })}>
              API
            </Link>
            <Link href="/docs" className={cn('nav-link', { 'text-white bg-white/10': pathname.includes('/docs') })}>
              Docs
            </Link>
          </>
        )}
      </div>

      <form onSubmit={handleSearchSubmit} className="nav-search">
        <span className="nav-search-icon">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8.5 8.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => setIsSearchOpen(true)}
          placeholder={searchPlaceholder}
          readOnly
        />
        <span className="nav-search-kbd">⌘K</span>
      </form>

      <div className="nav-right">
        {/* Desktop utility icons */}
        <Link
          href="/marketplace"
          title="Marketplace & Enterprise Models"
          className="relative hidden md:flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <Store className="h-4 w-4" />
        </Link>

        <Link
          href="/notifications"
          title="Notifications & System Alerts"
          className="relative hidden md:flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </Link>

        {/* Mobile compact auth / start */}
        <div className="flex md:hidden items-center gap-2 mr-1 min-w-0">
          <Link
            href={user ? '/account' : loginURL}
            className="inline-flex items-center gap-1.5 max-w-[140px] min-w-0 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            title={user ? username : loginLabel}
          >
            {userAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userAvatar} alt="" className="h-6 w-6 rounded-full object-cover shrink-0" />
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 shrink-0">
                <UserIcon className="h-3.5 w-3.5" />
              </span>
            )}
            {user ? <span className="truncate">{username}</span> : null}
          </Link>
          <Link
            href={startURL}
            className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-black"
          >
            Start
          </Link>
        </div>

        {/* Desktop auth — no standalone logout */}
        {user ? (
          <Link href="/account" className="btn-login hidden md:inline-flex items-center gap-2">
            {userAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={userAvatar} alt={username} className="h-5 w-5 rounded-full object-cover" />
            ) : (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] font-semibold">
                <UserIcon className="h-3 w-3" />
              </span>
            )}
            <span>{username}</span>
          </Link>
        ) : (
          <Link href={loginURL} className="btn-login hidden md:inline-flex">
            {loginLabel}
          </Link>
        )}

        <Link href={startURL} className="btn-start hidden md:inline-flex">
          {startLabel}
        </Link>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Search"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8.5 8.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>

        <div className="hidden md:block">
          <Suspense fallback={<OpenCartButton />}>
            <Cart />
          </Suspense>
        </div>

        <div className="block md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchQuery}
      />
    </nav>
  )
}
