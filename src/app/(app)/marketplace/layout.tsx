import type { ReactNode } from 'react'
import { Source_Sans_3 } from 'next/font/google'

import { getMe } from '@/lib/marketplace/api'
import { MarketplaceShell } from '@/components/marketplace/MarketplaceShell'

import './marketplace.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-marketplace',
  display: 'swap',
})

export default async function MarketplaceLayout({ children }: { children: ReactNode }) {
  const user = await getMe()

  return (
    <div className={sourceSans.variable} style={{ fontFamily: 'var(--font-marketplace), "Source Sans 3", sans-serif' }}>
      <MarketplaceShell user={user}>{children}</MarketplaceShell>
    </div>
  )
}
