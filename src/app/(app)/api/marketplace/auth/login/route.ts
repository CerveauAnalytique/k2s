import { NextResponse } from 'next/server'

import { login } from '@/lib/marketplace/api'
import { setMarketplaceToken } from '@/lib/marketplace/auth'

export async function POST(request: Request) {
  const form = await request.formData()
  const loginValue = String(form.get('login') || '')
  const password = String(form.get('password') || '')

  try {
    const result = await login(loginValue, password)
    await setMarketplaceToken(result.access_token)
    return NextResponse.redirect(new URL('/marketplace', request.url), 303)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed'
    return NextResponse.redirect(
      new URL(`/marketplace/account/login?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}
