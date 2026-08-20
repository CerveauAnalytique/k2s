# Neuriy Marketplace (vendored)

Source: https://github.com/neuriy/Neuriy-Marketplace

This folder holds the official Neuriy Marketplace **Python FastAPI** backend, SDK, and docs.
The ASP.NET MVC storefront is replaced in this monorepo by Next.js pages under `/marketplace`.

## Run with this project

```bash
pnpm marketplace:install
pnpm marketplace:api          # FastAPI on :8000
pnpm dev                      # Next.js on :3000 — open /marketplace
```

Environment (see root `.env.example`):

- `MARKETPLACE_API_URL` (default `http://127.0.0.1:8000`)
- `JWT_SECRET`
- optional `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` (falls back to local SQLite)

## Routes

| Path | Purpose |
| --- | --- |
| `/marketplace` | Store home (featured / popular / new) |
| `/marketplace/apps/[id]` | App details + download |
| `/marketplace/apps/upload` | Publish package (auth) |
| `/marketplace/account/*` | Login, register, profile, settings |
| `/marketplace/admin` | Rules & moderation |
| `/marketplace/pages/*` | About, SDK, community, … |
| `/api/marketplace/*` | Auth/upload/admin proxies to FastAPI |
