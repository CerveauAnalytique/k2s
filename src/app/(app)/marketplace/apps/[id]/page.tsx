import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { getApp, resolveIconUrl } from '@/lib/marketplace/api'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ error?: string; ok?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const app = await getApp(id)
  return {
    title: app ? `${app.name} · Neuriy Marketplace` : 'App · Neuriy Marketplace',
  }
}

export default async function AppDetailsPage({ params, searchParams }: Props) {
  const { id } = await params
  const query = await searchParams
  const app = await getApp(id)
  if (!app) notFound()

  const filled = Math.round(Math.min(5, Math.max(0, app.rating || 0)))
  const icon = resolveIconUrl(app.icon_url)
  const canDownload = app.status?.toLowerCase() === 'approved'

  return (
    <section className="panel panel--detail">
      {query.ok ? <div className="banner banner--ok">{query.ok}</div> : null}
      {query.error ? <div className="banner banner--warn">{query.error}</div> : null}
      <div className="detail">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="detail__icon" src={icon} alt="" width={112} height={112} />
        <div className="detail__body">
          <h1 className="detail__title">{app.name}</h1>
          <p className="detail__meta">
            {app.developer} · {app.category} · v{app.version}
          </p>
          <p className="detail__price">{app.price}</p>
          <p className={`status-pill status-pill--${app.status?.toLowerCase()}`}>Status: {app.status}</p>
          {typeof app.moderation_score === 'number' ? (
            <p className="muted">System AI score: {app.moderation_score.toFixed(1)}</p>
          ) : null}
          <div className="detail__stars" aria-label={`${(app.rating || 0).toFixed(1)} stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`star ${i < filled ? 'is-filled' : ''}`}>
                ★
              </span>
            ))}
            <span className="detail__downloads">{(app.downloads || 0).toLocaleString()} downloads</span>
          </div>
          <div className="detail__actions">
            {canDownload ? (
              <a className="button button--primary" href={`/api/marketplace/apps/${app.id}/download`}>
                Download for Neuriy AI
              </a>
            ) : (
              <span className="button button--ghost" aria-disabled="true">
                Download unavailable
              </span>
            )}
            <Link className="button button--ghost" href="/marketplace">
              Back to store
            </Link>
          </div>
        </div>
      </div>
      <div className="detail__description">
        <h2>About this app</h2>
        <p>{app.description}</p>
        {app.moderation_notes ? (
          <>
            <h2>Moderation notes</h2>
            <p className="muted">{app.moderation_notes}</p>
          </>
        ) : null}
      </div>
    </section>
  )
}
