import { FALLBACK_CATEGORIES, MARKETPLACE_API_URL } from './config'
import { getMarketplaceToken } from './auth'
import type { AuthResponse, MarketplaceApp, MarketplaceRule, MarketplaceUser } from './types'

type RequestOptions = {
  method?: string
  body?: BodyInit | null
  token?: string | null
  headers?: HeadersInit
  cache?: RequestCache
}

async function marketplaceFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = options.token === undefined ? await getMarketplaceToken() : options.token
  const headers = new Headers(options.headers)

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${MARKETPLACE_API_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body,
    cache: options.cache ?? 'no-store',
  })

  if (!response.ok) {
    let detail = `Marketplace API error (${response.status})`
    try {
      const data = await response.json()
      if (typeof data?.detail === 'string') detail = data.detail
      else if (data?.detail) detail = JSON.stringify(data.detail)
    } catch {
      // ignore
    }
    throw new Error(detail)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function resolveIconUrl(iconUrl?: string | null): string {
  if (!iconUrl) return '/marketplace/images/neuriy-mark.svg'
  if (iconUrl.startsWith('http://') || iconUrl.startsWith('https://')) return iconUrl
  // Browser-reachable rewrite to the FastAPI process (see next.config.ts)
  return `/marketplace-api${iconUrl.startsWith('/') ? '' : '/'}${iconUrl}`
}

export async function getCategories(): Promise<string[]> {
  try {
    const data = await marketplaceFetch<{ categories: string[] }>('/api/categories')
    return data.categories?.length ? data.categories : FALLBACK_CATEGORIES
  } catch {
    return FALLBACK_CATEGORIES
  }
}

export async function getApps(params: {
  q?: string
  category?: string
  featured?: boolean
  sort?: 'popular' | 'new'
  status?: string
} = {}): Promise<MarketplaceApp[]> {
  const search = new URLSearchParams()
  search.set('sort', params.sort || 'popular')
  if (params.q) search.set('q', params.q)
  if (params.category && params.category !== 'All Categories' && params.category !== 'All') {
    search.set('category', params.category)
  }
  if (typeof params.featured === 'boolean') search.set('featured', String(params.featured))
  if (params.status) search.set('status', params.status)

  return marketplaceFetch<MarketplaceApp[]>(`/api/apps?${search.toString()}`)
}

export async function getApp(id: string): Promise<MarketplaceApp | null> {
  try {
    return await marketplaceFetch<MarketplaceApp>(`/api/apps/${encodeURIComponent(id)}`)
  } catch {
    return null
  }
}

export async function getMe(): Promise<MarketplaceUser | null> {
  try {
    return await marketplaceFetch<MarketplaceUser>('/api/auth/me')
  } catch {
    return null
  }
}

export async function login(login: string, password: string): Promise<AuthResponse> {
  return marketplaceFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
    token: null,
  })
}

export async function register(email: string, username: string, password: string): Promise<AuthResponse> {
  return marketplaceFetch<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
    token: null,
  })
}

export async function uploadApp(formData: FormData): Promise<MarketplaceApp> {
  return marketplaceFetch<MarketplaceApp>('/api/apps', {
    method: 'POST',
    body: formData,
  })
}

export async function getUsers(): Promise<MarketplaceUser[]> {
  return marketplaceFetch<MarketplaceUser[]>('/api/users')
}

export async function setUserRole(userId: string, role: string): Promise<MarketplaceUser> {
  return marketplaceFetch<MarketplaceUser>(`/api/users/${encodeURIComponent(userId)}/role`, {
    method: 'POST',
    body: JSON.stringify({ role }),
  })
}

export async function getRules(): Promise<MarketplaceRule[]> {
  return marketplaceFetch<MarketplaceRule[]>('/api/rules')
}

export async function createRule(payload: {
  title: string
  description: string
  severity: string
  pattern?: string | null
  min_description_length?: number | null
  code?: string | null
}): Promise<MarketplaceRule> {
  return marketplaceFetch<MarketplaceRule>('/api/rules', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getModerationQueue(): Promise<MarketplaceApp[]> {
  return marketplaceFetch<MarketplaceApp[]>('/api/apps/moderation/queue')
}

export async function setAppStatus(appId: string, status: string, notes?: string): Promise<MarketplaceApp> {
  return marketplaceFetch<MarketplaceApp>(`/api/apps/${encodeURIComponent(appId)}/status`, {
    method: 'POST',
    body: JSON.stringify({ status, notes }),
  })
}

export async function remoderateApp(appId: string): Promise<MarketplaceApp> {
  return marketplaceFetch<MarketplaceApp>(`/api/apps/${encodeURIComponent(appId)}/remoderate`, {
    method: 'POST',
  })
}

export function getApiBaseUrl() {
  return MARKETPLACE_API_URL
}

export { marketplaceFetch }
