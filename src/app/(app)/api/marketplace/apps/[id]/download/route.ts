import { NextResponse } from 'next/server'

import { getMarketplaceToken } from '@/lib/marketplace/auth'
import { MARKETPLACE_API_URL } from '@/lib/marketplace/config'

type Props = { params: Promise<{ id: string }> }

export async function GET(request: Request, { params }: Props) {
  const { id } = await params
  const token = await getMarketplaceToken()
  const headers = new Headers()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const upstream = await fetch(`${MARKETPLACE_API_URL}/api/apps/${encodeURIComponent(id)}/download`, {
    headers,
    cache: 'no-store',
  })

  if (!upstream.ok) {
    let detail = 'Download failed'
    try {
      const data = await upstream.json()
      if (typeof data?.detail === 'string') detail = data.detail
    } catch {
      // ignore
    }
    return NextResponse.redirect(
      new URL(`/marketplace/apps/${id}?error=${encodeURIComponent(detail)}`, request.url),
      303,
    )
  }

  const body = await upstream.arrayBuffer()
  const responseHeaders = new Headers()
  const contentType = upstream.headers.get('content-type') || 'application/octet-stream'
  const disposition = upstream.headers.get('content-disposition')
  responseHeaders.set('Content-Type', contentType)
  if (disposition) responseHeaders.set('Content-Disposition', disposition)

  return new NextResponse(body, { status: 200, headers: responseHeaders })
}
