export const FRC_URL = (process.env.FRC_URL || 'http://127.0.0.1:3100').replace(/\/$/, '')
export const FRC_API_KEY =
  process.env.FRC_API_KEY || process.env.AYITI_API_KEY || 'ayiti_gov_test_key'
export const ELLOFIVE_API_URL = (process.env.ELLOFIVE_API_URL || 'http://127.0.0.1:3101').replace(
  /\/$/,
  '',
)
export const NEURIY_CHAT_MODEL = process.env.NEURIY_CHAT_MODEL || 'neuriy.chat'
