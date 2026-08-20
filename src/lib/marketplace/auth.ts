import { cookies } from 'next/headers'

import { MARKETPLACE_TOKEN_COOKIE } from './config'

export async function getMarketplaceToken(): Promise<string | undefined> {
  const jar = await cookies()
  return jar.get(MARKETPLACE_TOKEN_COOKIE)?.value
}

export async function setMarketplaceToken(token: string) {
  const jar = await cookies()
  jar.set(MARKETPLACE_TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 72,
  })
}

export async function clearMarketplaceToken() {
  const jar = await cookies()
  jar.delete(MARKETPLACE_TOKEN_COOKIE)
}
