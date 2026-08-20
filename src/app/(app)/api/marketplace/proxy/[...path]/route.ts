import { NextResponse } from 'next/server'

import { MARKETPLACE_API_URL } from '@/lib/marketplace/config'

type Props = { params: Promise<{ path: string[] }> }

export async function GET(_request: Request, { params }: Props) {
  const { path } = await params
  const target = `${MARKETPLACE_API_URL}/${path.map(encodeURIComponent).join('/')}`
  const upstream = await fetch(target, { cache: 'no-store', redirect: 'manual' })

  if (upstream.status >= 300 && upstream.status < 400) {
    const location = upstream.headers.get('location')
    if (location) return NextResponse.redirect(location)
  }

  const body = await upstream.arrayBuffer()
  const headers = new Headers()
  const contentType = upstream.headers.get('content-type')
  if (contentType) headers.set('Content-Type', contentType)

  return new NextResponse(body, { status: upstream.status, headers })
}
