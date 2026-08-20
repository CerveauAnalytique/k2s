import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { getMe } from '@/lib/marketplace/api'

export const metadata: Metadata = {
  title: 'Profile · Neuriy Marketplace',
}

export default async function ProfilePage() {
  const user = await getMe()
  if (!user) redirect('/marketplace/account/login')
  const initial = user.username?.[0]?.toUpperCase() || '?'

  return (
    <section className="panel panel--narrow content-page">
      <div className="profile-header">
        <span className="user-avatar user-avatar--xl" aria-hidden="true">
          {initial}
        </span>
        <div>
          <h1 className="page-title">{user.username}</h1>
          <p className="lede">
            {user.email} · role <strong>{user.role}</strong>
          </p>
        </div>
      </div>
      <div className="form-actions">
        <Link className="button button--ghost" href="/marketplace/account/settings">
          Settings
        </Link>
        <Link className="button button--primary" href="/marketplace/apps/upload">
          Upload app
        </Link>
      </div>
    </section>
  )
}
