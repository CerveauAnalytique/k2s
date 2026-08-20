'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'

type Props = {
  children: ReactNode
  header: ReactNode
  footer: ReactNode
}

export function SiteChrome({ children, header, footer }: Props) {
  const pathname = usePathname()
  const isMarketplace = pathname === '/marketplace' || Boolean(pathname?.startsWith('/marketplace/'))

  return (
    <>
      <LivePreviewListener />
      {isMarketplace ? (
        <div data-marketplace-root="true">{children}</div>
      ) : (
        <>
          {header}
          <main className="pt-[56px]">{children}</main>
          {footer}
        </>
      )}
    </>
  )
}
