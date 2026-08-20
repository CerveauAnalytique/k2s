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
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { formatUserDisplayName } from '@/utilities/formatUserDisplayName'

interface Props {
  menu: Header['navItems']
}

export function MobileMenu({ menu }: Props) {
  const { user, logout } = useAuth()
  const username = formatUserDisplayName(user)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const closeMobileMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:bg-black dark:text-white">
        <MenuIcon className="h-4" />
      </SheetTrigger>

      <SheetContent side="left" className="px-5">
        <SheetHeader className="px-0 pt-4 pb-2">
          <SheetTitle className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/prysel-logo.png" alt="Prysel" className="h-6 w-auto object-contain" />
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <div className="py-4 border-t border-neutral-800">
          <ul className="flex w-full flex-col gap-3 font-medium text-sm">
            {menu?.length ? (
              menu.map((item) => (
                <li key={item.id}>
                  <CMSLink {...item.link} appearance="link" />
                </li>
              ))
            ) : (
              <>
                <li>
                  <Link href="/shop" onClick={closeMobileMenu} className="hover:text-white transition">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/research" onClick={closeMobileMenu} className="hover:text-white transition">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="/api" onClick={closeMobileMenu} className="hover:text-white transition">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/docs" onClick={closeMobileMenu} className="hover:text-white transition">
                    Docs
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-800">
          <Button asChild className="w-full font-medium" variant="default">
            <Link href="/chat-neuriy" onClick={closeMobileMenu}>
              Start chat →
            </Link>
          </Button>
        </div>

        {user ? (
          <div className="mt-6 pt-4 border-t border-neutral-800">
            <div className="text-sm font-semibold mb-3 text-white flex items-center justify-between">
              <span className="truncate">{username}</span>
            </div>
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
              <li className="mt-4">
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
            <h2 className="text-sm font-semibold mb-3 text-neutral-400 uppercase tracking-wider">Account</h2>
            <div className="flex flex-col gap-2">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login" onClick={closeMobileMenu}>Log in</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
