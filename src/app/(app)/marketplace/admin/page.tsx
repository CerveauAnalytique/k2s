import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { getMe, getModerationQueue, getRules, getUsers } from '@/lib/marketplace/api'

export const metadata: Metadata = {
  title: 'Rules & moderation · Prysel Marketplace',
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const user = await getMe()
  if (!user) redirect('/marketplace/account/login')
  if (user.role !== 'admin' && user.role !== 'administrator') redirect('/marketplace')

  const params = await searchParams
  const isAdmin = user.role === 'admin'

  let users: Awaited<ReturnType<typeof getUsers>> = []
  let rules: Awaited<ReturnType<typeof getRules>> = []
  let queue: Awaited<ReturnType<typeof getModerationQueue>> = []
  let loadError: string | null = null

  try {
    ;[rules, queue] = await Promise.all([getRules(), getModerationQueue()])
    if (isAdmin) users = await getUsers()
  } catch (error) {
    loadError = error instanceof Error ? error.message : 'Failed to load admin data'
  }

  return (
    <>
      <section className="panel">
        <h1 className="page-title">Rules & moderation</h1>
        <p className="lede">
          Administrators check and enforce marketplace standards. System AI blacklists apps that fail quality rules.
        </p>
        {params.error ? <div className="banner banner--warn">{params.error}</div> : null}
        {params.success ? <div className="banner banner--ok">{params.success}</div> : null}
        {loadError ? <div className="banner banner--warn">{loadError}</div> : null}
      </section>

      {isAdmin ? (
        <section className="panel">
          <h2 className="panel__title">Users & roles</h2>
          <p className="lede">
            Roles: <code>user</code>, <code>admin</code>, <code>administrator</code> (rules / moderation).
          </p>
          <div className="admin-table">
            {users.map((item) => (
              <div className="admin-row" key={item.id}>
                <div>
                  <strong>{item.username}</strong>
                  <div className="muted">
                    {item.email} · {item.role}
                  </div>
                </div>
                <form method="post" action="/api/marketplace/admin/set-role" className="role-form">
                  <input type="hidden" name="userId" value={item.id} />
                  <select name="role" defaultValue={item.role}>
                    <option value="user">user</option>
                    <option value="administrator">administrator</option>
                    <option value="admin">admin</option>
                  </select>
                  <button type="submit" className="button button--ghost">
                    Save
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="panel">
        <h2 className="panel__title">System AI & custom rules</h2>
        <div className="admin-table">
          {rules.map((rule) => (
            <div className="admin-row" key={rule.id}>
              <div>
                <strong>{rule.title}</strong>
                <div className="muted">
                  {rule.code} · {rule.severity} {rule.is_system ? '· system_ai' : ''}{' '}
                  {rule.enabled ? '' : '· disabled'}
                </div>
                <p>{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="subhead">Add rule</h3>
        <form action="/api/marketplace/admin/create-rule" method="post" className="upload-form">
          <label className="field">
            <span>Title</span>
            <input name="title" required />
          </label>
          <label className="field">
            <span>Description</span>
            <textarea name="description" rows={3} required />
          </label>
          <div className="field-row">
            <label className="field">
              <span>Severity</span>
              <select name="severity" defaultValue="block">
                <option value="block">block</option>
                <option value="warn">warn</option>
              </select>
            </label>
            <label className="field">
              <span>Code (optional)</span>
              <input name="code" />
            </label>
          </div>
          <label className="field">
            <span>Pattern (optional regex)</span>
            <input name="pattern" />
          </label>
          <label className="field">
            <span>Min description length (optional)</span>
            <input name="min_description_length" type="number" min={0} />
          </label>
          <div className="form-actions">
            <button type="submit" className="button button--primary">
              Add rule
            </button>
          </div>
        </form>
      </section>

      <section className="panel">
        <h2 className="panel__title">Moderation queue</h2>
        <div className="admin-table">
          {queue.map((appItem) => (
            <div className="admin-row" key={appItem.id}>
              <div>
                <strong>{appItem.name}</strong>
                <div className="muted">
                  {appItem.status} · score {appItem.moderation_score ?? '—'} · {appItem.category}
                </div>
                <p className="muted">{appItem.moderation_notes}</p>
              </div>
              <div className="admin-actions">
                <form method="post" action="/api/marketplace/admin/set-status" className="inline-form">
                  <input type="hidden" name="appId" value={appItem.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button className="button button--ghost" type="submit">
                    Approve
                  </button>
                </form>
                <form method="post" action="/api/marketplace/admin/set-status" className="inline-form">
                  <input type="hidden" name="appId" value={appItem.id} />
                  <input type="hidden" name="status" value="blacklisted" />
                  <button className="button button--ghost" type="submit">
                    Blacklist
                  </button>
                </form>
                <form method="post" action="/api/marketplace/admin/remoderate" className="inline-form">
                  <input type="hidden" name="appId" value={appItem.id} />
                  <button className="button button--primary" type="submit">
                    Run system AI
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
