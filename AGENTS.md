# AGENTS.md — Books Repository Guide

## Project Structure

**Monorepo** with two independent services:
- `frontend/` — React 19 + Vite + Tailwind + TypeScript, built to static nginx container
- `strapi/` — Strapi v5.45.1 CMS (Node.js), connects to PostgreSQL
- `nginx/` — Reverse proxy config for HTTPS (certs must exist at `certs/server.crt` and `certs/server.key`)

Services coordinated via Docker Compose. **No shared packages or cross-imports between frontend/strapi**.

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

- **Framework:** React 19.1.0 (no class components)
- **TypeScript:** v5.8.0
- **Build:** `npm run build` runs `tsc -b && vite build` — TypeScript first, then Vite
- **Dev:** `npm run dev` starts Vite dev server (hot reload)
- **Vite:** v6.3.0
- **Style:** Tailwind v4.1.0 (via `@tailwindcss/vite` plugin)
- **Output:** `dist/` directory, served by nginx container in multi-stage Dockerfile

**No testing or linting configured** (none found in package.json or vite.config).

## Strapi Details

- **Version:** v5.45.1 (important: not v4)
- **Database:** PostgreSQL 16 (via Docker service `postgres`)
- **Node version:** 20–24.x.x (engine constraint in package.json)
- **Dev command:** `npm run develop` (builds admin panel on first run, watches for changes)
- **Build:** `npm run build` (for production only)
- **Production start:** `npm run start`
- **Dockerfile:** Multi-stage build with `base`, `development` (target for dev), and `production` targets
- **Dev target** runs on port 1337 (waits for postgres health check)
- **Prod target** builds admin panel during image build, runs production server on port 1337

**Uploads stored at** `strapi/public/uploads/` (mounted as Docker volume for persistence).

## Environment & Secrets

All env vars in `.env` at repo root. Loaded by docker-compose for strapi and deployment scripts. Includes:
- Database credentials (user `books`, port `5432`)
- JWT secrets for admin and API (`ADMIN_JWT_SECRET`, `JWT_SECRET`)
- Strapi APP_KEYS, TRANSFER_TOKEN_SALT, ENCRYPTION_KEY
- NAS deployment credentials (NAS_HOST, NAS_USER)

**Note:** `.env` is currently tracked in git (security risk if production secrets). Agents should flag this if editing deployment.

## Database

PostgreSQL runs as `postgres` service in Docker. Connection pool/options not visible (Strapi handles via env vars). Health check waits 30s on startup; strapi waits for `service_healthy` before starting.

## Nginx & HTTPS

Single nginx container proxies both frontend and strapi behind HTTPS (port 8443 exposed locally).

- Config: `nginx/nginx.conf`
- Certs: `certs/server.crt` and `certs/server.key` (required to exist; `.gitignore` excludes them)

## Common Mistakes to Avoid

1. **Frontend TypeScript:** Runs `tsc -b` before Vite. Check both `tsconfig.json` and `tsconfig.app.json`.
2. **Strapi admin builds on first run.** First dev startup is slow; subsequent runs are faster.
3. **Database must be healthy before strapi starts.** Health check failure = strapi won't run.
4. **Certs required locally.** If running `make dev` and nginx fails to start, certs are missing (not in repo).
5. **TAG environment variable.** Deployment script uses `TAG` for image tagging; defaults to `latest`. Set `TAG` in env or via `make` for versioned deploys.
6. **Production Dockerfile target:** Build script specifies `--target production` for Strapi; frontend has no target (single stage).
