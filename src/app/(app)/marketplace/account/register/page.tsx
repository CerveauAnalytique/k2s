import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register · Prysel Marketplace',
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <section className="panel panel--narrow">
      <h1 className="page-title">Create account</h1>
      <p className="lede">
        The first account becomes <strong>admin</strong>. Later accounts start as <strong>user</strong>.
      </p>
      {params.error ? <div className="banner banner--warn">{params.error}</div> : null}
      <form action="/api/marketplace/auth/register" method="post" className="upload-form">
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required />
        </label>
        <label className="field">
          <span>Username</span>
          <input name="username" required minLength={3} />
        </label>
        <label className="field">
          <span>Password</span>
          <input name="password" type="password" required minLength={8} />
        </label>
        <div className="form-actions">
          <button type="submit" className="button button--primary">
            Create account
          </button>
          <Link className="button button--ghost" href="/marketplace/account/login">
            Sign in
          </Link>
        </div>
      </form>
    </section>
  )
}
