import { NextResponse } from 'next/server'

import { clearMarketplaceToken } from '@/lib/marketplace/auth'

export async function POST(request: Request) {
  await clearMarketplaceToken()
  return NextResponse.redirect(new URL('/marketplace', request.url), 303)
}
