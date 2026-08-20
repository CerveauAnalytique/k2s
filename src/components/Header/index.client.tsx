'use client'

import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import React, { Suspense, useEffect, useRef, useState } from 'react'

import { MobileMenu } from './MobileMenu'
import type { Header } from 'src/payload-types'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/utilities/cn'

import { useAuth } from '@/providers/Auth'
import { User as UserIcon, LogOut, Bell, Store } from 'lucide-react'
import { formatUserDisplayName } from '@/utilities/formatUserDisplayName'

import { SearchModal } from '@/components/SearchModal'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const { user, logout } = useAuth()
  const menu = header.navItems || []
  const pathname = usePathname()
  const router = useRouter()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const username = formatUserDisplayName(user)
  const userAvatar = (user as any)?.avatar?.url || (user as any)?.avatar || (user as any)?.image?.url

  // Dynamically formatted title from Payload CMS
  const rawTitle = header.siteTitle || 'Prysel'
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
      {/* Prysel Brand Logo */}
      <Link href="/" className="nav-logo flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/prysel-logo.png"
          alt="Prysel"
          className="h-7 w-auto object-contain"
        />
      </Link>

      {/* Dynamic Nav Links connected to Payload CMS header.navItems */}
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
            <Link
              href="/shop"
              className={cn('nav-link', {
                'text-white bg-white/10': pathname.includes('/shop'),
              })}
            >
              Shop
            </Link>
            <Link
              href="/research"
              className={cn('nav-link', {
                'text-white bg-white/10': pathname.includes('/research'),
              })}
            >
              Research
            </Link>
            <Link
              href="/api"
              className={cn('nav-link', {
                'text-white bg-white/10': pathname === '/api',
              })}
            >
              API
            </Link>
            <Link
              href="/docs"
              className={cn('nav-link', {
                'text-white bg-white/10': pathname.includes('/docs'),
              })}
            >
              Docs
            </Link>
          </>
        )}
      </div>

      {/* Searchbar connected to Payload CMS searchPlaceholder & ⌘K shortcut */}
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

      {/* Right action items */}
      <div className="nav-right">
        {/* Marketplace Store Icon Button */}
        <Link
          href="/marketplace"
          title="Marketplace & Enterprise Models"
          className="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <Store className="h-4 w-4" />
        </Link>

        {/* Notification Bell Icon Button */}
        <Link
          href="/notifications"
          title="Notifications & System Alerts"
          className="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </Link>

        {/* Mobile text-only links for Chat, Login/Account, & Log out */}
        <div className="flex md:hidden items-center gap-2 mr-1">
          <Link
            href="/chat-neuriy"
            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            Chat
          </Link>
          <Link
            href={user ? '/account' : loginURL}
            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors truncate max-w-[120px]"
            title={username}
          >
            {user ? username : 'Login'}
          </Link>
          {user && (
            <button
              onClick={() => logout()}
              className="text-xs font-semibold text-neutral-400 hover:text-red-400 transition-colors ml-1"
            >
              Log out
            </button>
          )}
        </div>

        {/* Desktop-only User Badge (u***@ca.com) & Log out close together */}
        {user ? (
          <div className="hidden md:flex items-center gap-1.5">
            <Link href="/account" className="btn-login inline-flex items-center gap-2">
              {userAvatar ? (
                <img src={userAvatar} alt={username} className="h-5 w-5 rounded-full object-cover" />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] font-semibold">
                  <UserIcon className="h-3 w-3" />
                </span>
              )}
              <span>{username}</span>
            </Link>
            <button
              onClick={() => logout()}
              className="btn-login inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-400 border-neutral-800 hover:border-red-500/30 transition-colors"
              title="Log out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log out</span>
            </button>
          </div>
        ) : (
          <Link href={loginURL} className="btn-login hidden md:inline-flex">
            {loginLabel}
          </Link>
        )}

        <Link href={startURL} className="btn-start hidden md:inline-flex">
          {startLabel}
        </Link>

        {/* Mobile Search Trigger Button */}
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

        <Suspense fallback={<OpenCartButton />}>
          <Cart />
        </Suspense>

        {/* Right-aligned Mobile Sidebar Drawer Button */}
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
