export const MARKETPLACE_API_URL =
  process.env.MARKETPLACE_API_URL?.replace(/\/$/, '') || 'http://127.0.0.1:8000'

export const MARKETPLACE_TOKEN_COOKIE = 'neuriy_marketplace_token'

export const FALLBACK_CATEGORIES = [
  'All Categories',
  'Assistants',
  'Productivity',
  'Creative',
  'Developer Tools',
  'Research',
  'Education',
  'Utilities',
]
