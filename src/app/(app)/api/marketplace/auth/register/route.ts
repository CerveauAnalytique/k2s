import { NextResponse } from 'next/server'

import { register } from '@/lib/marketplace/api'
import { setMarketplaceToken } from '@/lib/marketplace/auth'

export async function POST(request: Request) {
  const form = await request.formData()
  const email = String(form.get('email') || '')
  const username = String(form.get('username') || '')
  const password = String(form.get('password') || '')

  try {
    const result = await register(email, username, password)
    await setMarketplaceToken(result.access_token)
    return NextResponse.redirect(new URL('/marketplace', request.url), 303)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed'
    return NextResponse.redirect(
      new URL(`/marketplace/account/register?error=${encodeURIComponent(message)}`, request.url),
      303,
    )
  }
}
