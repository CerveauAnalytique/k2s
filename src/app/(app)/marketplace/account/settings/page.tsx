import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { getMe } from '@/lib/marketplace/api'

export const metadata: Metadata = {
  title: 'Settings · Neuriy Marketplace',
}

export default async function SettingsPage() {
  const user = await getMe()
  if (!user) redirect('/marketplace/account/login')

  return (
    <section className="panel panel--narrow content-page">
      <h1 className="page-title">Settings</h1>
      <p className="lede">Account preferences for {user.username}.</p>
      <p>
        Signed in as <strong>{user.email}</strong> with role <code>{user.role}</code>.
      </p>
      <div className="form-actions">
        <Link className="button button--ghost" href="/marketplace/account/profile">
          Back to profile
        </Link>
        <form action="/api/marketplace/auth/logout" method="post">
          <button type="submit" className="button button--primary">
            Sign out
          </button>
        </form>
      </div>
    </section>
  )
}
