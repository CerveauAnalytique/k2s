export type MarketplaceUser = {
  id: string
  email: string
  username: string
  role: 'user' | 'admin' | 'administrator' | string
  created_at?: string
}

export type MarketplaceApp = {
  id: string
  name: string
  description: string
  category: string
  developer: string
  price: string
  version: string
  rating: number
  downloads: number
  featured: boolean
  icon_url?: string | null
  package_filename?: string | null
  owner_id?: string | null
  status: string
  moderation_score?: number | null
  moderation_notes?: string | null
  created_at?: string
  updated_at?: string
}

export type MarketplaceRule = {
  id: string
  title: string
  description: string
  severity: string
  pattern?: string | null
  min_description_length?: number | null
  code?: string | null
  enabled: number | boolean
  is_system?: number | boolean
  created_by?: string | null
}

export type AuthResponse = {
  access_token: string
  token_type: string
  user: MarketplaceUser
}
