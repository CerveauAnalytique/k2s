import Link from 'next/link'

import { resolveIconUrl } from '@/lib/marketplace/api'
import type { MarketplaceApp } from '@/lib/marketplace/types'

export function AppTile({ app }: { app: MarketplaceApp }) {
  const filled = Math.round(Math.min(5, Math.max(0, app.rating || 0)))
  const icon = resolveIconUrl(app.icon_url)

  return (
    <Link className="app-tile" href={`/marketplace/apps/${app.id}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="app-tile__icon" src={icon} alt="" width={64} height={64} loading="lazy" />
      <span className="app-tile__name">{app.name}</span>
      <span className="app-tile__price">{app.price}</span>
      <span className="app-tile__stars" aria-label={`${(app.rating || 0).toFixed(1)} stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`star ${i < filled ? 'is-filled' : ''}`}>
            ★
          </span>
        ))}
      </span>
    </Link>
  )
}
