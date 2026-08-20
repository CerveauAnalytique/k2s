import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const PAGES: Record<
  string,
  {
    title: string
    body: ReactNode
  }
> = {
  about: {
    title: 'About Neuriy Marketplace',
    body: (
      <>
        <p className="lede">
          Neuriy Marketplace is the store for AI apps and tools that run with Neuriy Chat and the Neuriy AI platform.
        </p>
        <p>
          Publishers upload packages, system AI rules score quality, and users download approved apps for Neuriy AI. The
          first account on a new deployment becomes admin; administrators can enforce marketplace rules.
        </p>
        <p>
          <a href="/marketplace/pages/sdk">Learn how to open the store from Neuriy Chat →</a>
        </p>
      </>
    ),
  },
  developers: {
    title: 'Developer docs',
    body: (
      <>
        <p className="lede">Build and publish packages that Neuriy Chat can discover and open.</p>
        <ol>
          <li>Create an account and sign in.</li>
          <li>Upload a package with name, description, category, and optional icon.</li>
          <li>System AI moderation scores the listing against quality rules.</li>
          <li>Once approved, users can download and open the app from the store or Neuriy Chat.</li>
        </ol>
        <p>
          API base URL defaults to <code>http://127.0.0.1:8000</code>. See{' '}
          <a href="/api/marketplace/proxy/docs">OpenAPI docs</a>.
        </p>
      </>
    ),
  },
  support: {
    title: 'Support',
    body: (
      <>
        <p className="lede">Need help with installs, uploads, or moderation?</p>
        <ul>
          <li>Check app status and moderation notes on the app detail page.</li>
          <li>Confirm the Python marketplace API is running (`pnpm marketplace:api`).</li>
          <li>
            Visit <a href="/marketplace/pages/community">Community</a> for publisher tips.
          </li>
        </ul>
      </>
    ),
  },
  terms: {
    title: 'Terms of use',
    body: (
      <>
        <p className="lede">By using Neuriy Marketplace you agree to publish accurate listings and respect moderation.</p>
        <p>Blacklisted or abusive packages may be removed. Admins may assign roles and enforce quality rules.</p>
      </>
    ),
  },
  cookies: {
    title: 'Cookies',
    body: (
      <>
        <p className="lede">Neuriy Marketplace uses an httpOnly session cookie to keep you signed in.</p>
        <p>
          Cookie name: <code>neuriy_marketplace_token</code>. It stores a JWT issued by the marketplace API and is not
          shared with third parties.
        </p>
      </>
    ),
  },
  community: {
    title: 'Community',
    body: (
      <>
        <p className="lede">Share assistants, tools, and research utilities with other Neuriy Chat users.</p>
        <p>
          Browse the <a href="/marketplace">store</a>, publish from the Upload page, and open installs from Neuriy Chat
          with the SDK.
        </p>
      </>
    ),
  },
  publishers: {
    title: 'Publishers',
    body: (
      <>
        <p className="lede">Ship packages that Neuriy AI users can find, rate, and download.</p>
        <ol>
          <li>
            <a href="/marketplace/account/register">Create an account</a>
          </li>
          <li>
            <a href="/marketplace/apps/upload">Upload your app</a>
          </li>
          <li>Wait for system AI scoring / administrator approval</li>
        </ol>
      </>
    ),
  },
  sdk: {
    title: 'Open Marketplace in Neuriy Chat',
    body: (
      <>
        <p className="lede">
          Use the official Python SDK and chat tool manifest so Neuriy Chat can search, inspect, and open marketplace
          apps.
        </p>
        <h2>1. Install</h2>
        <pre className="code-block">
          <code>pip install -e ./neuriy-marketplace/sdk/python</code>
        </pre>
        <h2>2. Point at your API</h2>
        <pre className="code-block">
          <code>{`export NEURIY_MARKETPLACE_URL=http://127.0.0.1:8000
# optional when calling authenticated endpoints
export NEURIY_MARKETPLACE_TOKEN=your-jwt`}</code>
        </pre>
        <h2>3. Use from Python / Neuriy Chat tools</h2>
        <pre className="code-block">
          <code>{`from neuriy_marketplace import MarketplaceClient, chat_tools

client = MarketplaceClient()
apps = client.search_apps("assistant")
tools = chat_tools()  # OpenAI-compatible tool schemas for Neuriy Chat`}</code>
        </pre>
        <h2>4. Register the chat plugin</h2>
        <p>Load the Neuriy Chat manifest to expose marketplace actions:</p>
        <ul>
          <li>
            <code>marketplace_search</code>
          </li>
          <li>
            <code>marketplace_get_app</code>
          </li>
          <li>
            <code>marketplace_list_categories</code>
          </li>
          <li>
            <code>marketplace_open_app</code> — returns a deep link / install payload for Neuriy Chat
          </li>
        </ul>
        <p>
          <a className="button button--primary" href="/marketplace/sdk/neuriy-chat/manifest.json">
            Download manifest
          </a>{' '}
          <a className="button button--ghost" href="/marketplace/pages/developers">
            Developer docs
          </a>
        </p>
      </>
    ),
  },
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = PAGES[slug]
  return { title: page ? `${page.title} · Neuriy Marketplace` : 'Neuriy Marketplace' }
}

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }))
}

export default async function MarketplaceContentPage({ params }: Props) {
  const { slug } = await params
  const page = PAGES[slug]
  if (!page) {
    return (
      <section className="panel panel--narrow content-page">
        <h1 className="page-title">Page not found</h1>
      </section>
    )
  }

  return (
    <section className="panel panel--narrow content-page">
      <h1 className="page-title">{page.title}</h1>
      {page.body}
    </section>
  )
}
