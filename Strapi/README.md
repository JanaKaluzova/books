# Bookshelf — Strapi Backend

Strapi v5 CMS providing the GraphQL API for the Bookshelf app.

## Tech Stack

- **Strapi v5**
- **PostgreSQL 16** — database
- **GraphQL** — API (via Strapi GraphQL plugin)
- **TypeScript**

## Getting Started

```bash
npm install
npm run develop
```

Strapi admin panel available at `http://localhost:1337/admin`. On first run it will build the admin panel — this takes a minute.

Requires a running PostgreSQL instance. Set connection details in `.env`:

```
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=books
DATABASE_USERNAME=books
DATABASE_PASSWORD=yourpassword
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run develop` | Start with auto-reload (development) |
| `npm run start` | Start without auto-reload (production) |
| `npm run build` | Build admin panel for production |

## Running with Docker

See the root `AGENTS.md` for full Docker Compose setup. The Strapi Dockerfile has two targets:
- `development` — used locally via `docker-compse.yml`
- `production` — used for NAS deployment via `docker-compose.prod.yml`
