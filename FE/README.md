# Bookshelf — Frontend

Personal book tracking app with a warm, editorial design aesthetic.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — dev server & build
- **Tailwind CSS v4** — styling (config via `@theme` in `src/index.css`)
- **Apollo Client** — GraphQL queries & mutations
- **React Hook Form** + **Zod** — forms & validation
- **Radix UI** — accessible UI primitives
- **Lucide React** — icons
- **Biome** — linting & formatting

## Getting Started

```bash
npm install
npm run dev
```

The dev server connects to Strapi at `http://localhost:1337` by default. To run the full stack in Docker instead, see the root `AGENTS.md`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |
| `npm run check` | Lint + format in one pass |
| `npm run codegen` | Regenerate GraphQL types from Strapi schema |

## Design

Uses the **Editorial Float** theme — warm ivory backgrounds, DM Serif Display headings, terracotta accents, and floating card shadows.
