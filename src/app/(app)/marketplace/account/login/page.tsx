import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in · Neuriy Marketplace',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <section className="panel panel--narrow">
      <h1 className="page-title">Sign in</h1>
      <p className="lede">Use your email or username to access uploads and admin tools.</p>
      {params.error ? <div className="banner banner--warn">{params.error}</div> : null}
      <form action="/api/marketplace/auth/login" method="post" className="upload-form">
        <label className="field">
          <span>Email or username</span>
          <input name="login" required />
        </label>
        <label className="field">
          <span>Password</span>
          <input name="password" type="password" required minLength={8} />
        </label>
        <div className="form-actions">
          <button type="submit" className="button button--primary">
            Sign in
          </button>
          <Link className="button button--ghost" href="/marketplace/account/register">
            Register
          </Link>
        </div>
      </form>
    </section>
  )
}
