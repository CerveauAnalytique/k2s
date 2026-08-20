import React from 'react'
import { DocsLayout } from '@/components/DocsLayout'
import Link from 'next/link'

export default function DocsNotFoundPage() {
  return (
    <DocsLayout title="Page not found" description="This documentation page is coming soon.">
      <div className="docs-callout docs-callout--warning">
        <strong>Coming soon.</strong> This documentation page is not yet published.
      </div>
      <p>
        In the meantime, you might find what you need in the{' '}
        <Link href="/docs" className="inline-link">Introduction</Link> or the{' '}
        <Link href="/docs/reference" className="inline-link">API Reference</Link>.
      </p>
      <p>
        Have questions? Reach us at{' '}
        <a href="mailto:dev@prysel.com" className="inline-link">dev@prysel.com</a>.
      </p>
    </DocsLayout>
  )
}
