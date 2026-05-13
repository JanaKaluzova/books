# AGENTS.md — Books Repository Guide

## Project Structure

**Monorepo** with two independent services:
- `FE/` — React 19 + Vite + Tailwind v4 + TypeScript, built to static nginx container
- `Strapi/` — Strapi v5 CMS (Node.js), connects to PostgreSQL
- `nginx/` — Reverse proxy config for HTTPS (certs must exist at `certs/server.crt` and `certs/server.key`)

Services coordinated via Docker Compose. **No shared packages or cross-imports between FE/Strapi**.

## Local Development

**Start everything:**
```bash
make dev
```

Accessible at `https://localhost:8443/` (frontend) and `https://localhost:8443/admin` (Strapi admin).

**Logs:**
```bash
make dev-logs              # all services
make dev-logs-strapi       # Strapi only
```

**Stop:**
```bash
make dev-down
```

## Key Build & Deploy Commands

| Command | Does |
|---------|------|
| `make build` | Build production Docker images locally (no deploy) |
| `make deploy TAG=v1.0.0` | Build + deploy to Synology NAS via SSH (default mode) |
| `make deploy-registry TAG=v1.0.0` | Build + deploy to NAS via private Docker registry |
| `make nas-setup` | First-time NAS setup (copies config, certs, nginx.conf) |
| `make clean` | Remove all local containers, images, volumes |

**Deployment script** (`deploy.sh`) is executable source of truth. Build commands in Makefile map to it. Supports environment variable overrides:
- `TAG` — image tag (default: `latest`)
- `NAS_HOST` — hostname/IP (default: `192.168.0.98`)
- `NAS_USER` — SSH user (default: `azul`)
- `NAS_SSH_PORT` — SSH port (default: `22`)
- `NAS_PROJECT_DIR` — project directory on NAS (default: `/volume1/docker/books`)

## Frontend Details

- **Framework:** React 19
- **TypeScript:** v5
- **Build:** `npm run build` runs `tsc -b && vite build` — TypeScript first, then Vite
- **Dev:** `npm run dev` starts Vite dev server (hot reload)
- **Style:** Tailwind v4 (via `@tailwindcss/vite` plugin, config in `src/index.css` `@theme` block)
- **GraphQL:** Apollo Client v4, codegen via `@graphql-codegen`
- **Output:** `dist/` directory, served by nginx container in multi-stage Dockerfile

## Strapi Details

- **Version:** v5 (not v4)
- **Database:** PostgreSQL 16 (via Docker service `postgres`)
- **Dev command:** `npm run develop` (builds admin panel on first run, watches for changes)
- **Build:** `npm run build` (for production only)
- **Production start:** `npm run start`
- **Dockerfile:** Multi-stage build with `base`, `development` (target for dev), and `production` targets
- **Dev target** runs on port 1337 (waits for postgres health check)
- **Prod target** builds admin panel during image build, runs production server on port 1337

**Uploads stored at** `Strapi/public/uploads/` (mounted as Docker volume for persistence).

## Environment & Secrets

`.env` at repo root is **gitignored** — never commit it. Copy from a secure location or create from scratch. Includes:
- Database credentials
- JWT secrets for admin and API (`ADMIN_JWT_SECRET`, `JWT_SECRET`)
- Strapi `APP_KEYS`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`
- NAS deployment credentials (`NAS_HOST`, `NAS_USER`)

## Database

PostgreSQL runs as `postgres` service in Docker. Health check waits 30s on startup; Strapi waits for `service_healthy` before starting.

## Nginx & HTTPS

Single nginx container proxies both frontend and Strapi behind HTTPS (port 8443 exposed locally).

- Config: `nginx/nginx.conf`
- Certs: `certs/server.crt` and `certs/server.key` (required; gitignored — generate locally with openssl or copy from NAS)

## Common Mistakes to Avoid

1. **Certs required locally.** If nginx fails to start, certs are missing — generate self-signed ones with openssl.
2. **Strapi admin builds on first run.** First dev startup is slow; subsequent runs are faster.
3. **Database must be healthy before Strapi starts.** Health check failure = Strapi won't run.
4. **TAG environment variable.** Deployment script uses `TAG` for image tagging; defaults to `latest`.
5. **Tailwind config is in `FE/src/index.css`** (`@theme` block) — `tailwind.config.js` does not exist, Tailwind v4 ignores it.
6. **VITE_STRAPI_URL must be empty** in Docker builds — nginx proxies `/graphql` to Strapi, so the frontend uses same-origin requests.
