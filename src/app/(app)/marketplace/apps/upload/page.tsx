import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

import { getCategories } from '@/lib/marketplace/api'
import { getMarketplaceToken } from '@/lib/marketplace/auth'

export const metadata: Metadata = {
  title: 'Upload · Prysel Marketplace',
}

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>
}) {
  const token = await getMarketplaceToken()
  if (!token) redirect('/marketplace/account/login')

  const params = await searchParams
  const categories = (await getCategories()).filter((c) => c !== 'All Categories')

  return (
    <section className="panel panel--narrow">
      <h1 className="page-title">Upload your app or tool</h1>
      <p className="lede">Publish a package for Prysel AI users to discover and download.</p>
      {params.error ? <div className="banner banner--warn">{params.error}</div> : null}
      {params.success ? <div className="banner banner--ok">{params.success}</div> : null}

      <form action="/api/marketplace/apps/upload" method="post" encType="multipart/form-data" className="upload-form">
        <label className="field">
          <span>App name</span>
          <input name="name" required placeholder="My Prysel Tool" />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea name="description" rows={5} required placeholder="What does this app do for Prysel AI users?" />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Category</span>
            <select name="category" defaultValue={categories[0] || 'Utilities'}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Developer</span>
            <input name="developer" defaultValue="Community" />
          </label>
        </div>

        <div className="field-row">
          <label className="field">
            <span>Price label</span>
            <input name="price" defaultValue="Free" />
          </label>
          <label className="field">
            <span>Version</span>
            <input name="version" defaultValue="1.0.0" />
          </label>
        </div>

        <label className="field">
          <span>Package file (.neuriy, .zip, or binary)</span>
          <input name="package" type="file" required />
        </label>

        <label className="field">
          <span>Icon (optional)</span>
          <input name="icon" type="file" accept="image/*,.svg" />
        </label>

        <div className="form-actions">
          <button type="submit" className="button button--primary">
            Publish to Marketplace
          </button>
          <a className="button button--ghost" href="/marketplace">
            Cancel
          </a>
        </div>
      </form>
    </section>
  )
}
