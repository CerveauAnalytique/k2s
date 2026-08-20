'use client'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import { MenuIcon, ShoppingCart, Store, Bell } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { formatUserDisplayName } from '@/utilities/formatUserDisplayName'

interface Props {
  menu: Header['navItems']
}

const FALLBACK_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/research', label: 'Research' },
  { href: '/api', label: 'API' },
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
  { href: '/marketplace', label: 'Marketplace' },
]

export function MobileMenu({ menu }: Props) {
  const { user, logout } = useAuth()
  const username = formatUserDisplayName(user)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger
        className="relative flex h-9 w-9 items-center justify-center rounded-md border border-neutral-700 text-neutral-200 transition-colors hover:text-white"
        aria-label="Open menu"
      >
        <MenuIcon className="h-4 w-4" />
      </SheetTrigger>

      <SheetContent side="right" className="px-5 w-[min(100vw,320px)]">
        <SheetHeader className="px-0 pt-4 pb-2 text-left">
          <SheetTitle className="text-lg font-serif tracking-tight">Cerveau Analytique</SheetTitle>
          <SheetDescription className="text-xs text-neutral-500">Navigate the platform</SheetDescription>
        </SheetHeader>

        <div className="py-4 border-t border-neutral-800">
          <ul className="flex w-full flex-col gap-1 font-medium text-sm">
            {menu?.length ? (
              menu.map((item) => (
                <li key={item.id} className="rounded-lg px-2 py-2 hover:bg-neutral-900">
                  <CMSLink {...item.link} appearance="link" />
                </li>
              ))
            ) : (
              FALLBACK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-2 py-2.5 hover:bg-neutral-900 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))
            )}
            <li>
              <Link
                href="/shop"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-neutral-900"
              >
                <ShoppingCart className="h-4 w-4" /> Cart / Shop
              </Link>
            </li>
            <li>
              <Link
                href="/marketplace"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-neutral-900"
              >
                <Store className="h-4 w-4" /> Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="/notifications"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-neutral-900"
              >
                <Bell className="h-4 w-4" /> Notifications
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-2 pt-4 border-t border-neutral-800">
          <Button asChild className="w-full font-medium" variant="default">
            <Link href="/chat-neuriy" onClick={closeMobileMenu}>
              Start chat →
            </Link>
          </Button>
        </div>

        {user ? (
          <div className="mt-6 pt-4 border-t border-neutral-800 space-y-3">
            <div className="text-sm font-semibold text-white truncate">{username}</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/account" onClick={closeMobileMenu} className="hover:text-white">
                  Manage Account
                </Link>
              </li>
              <li>
                <Link href="/orders" onClick={closeMobileMenu} className="hover:text-white">
                  Orders
                </Link>
              </li>
              <li className="mt-3">
                <Button
                  variant="outline"
                  className="w-full text-red-400 hover:text-red-300 border-neutral-800 hover:bg-neutral-900"
                  onClick={() => {
                    closeMobileMenu()
                    logout()
                  }}
                >
                  Log out
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <Button asChild className="w-full" variant="outline">
              <Link href="/login" onClick={closeMobileMenu}>
                Log in
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
