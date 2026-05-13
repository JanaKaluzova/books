# ── Base ─────────────────────────────────────────────────────────
FROM node:20-alpine AS base

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /opt/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# ── Development target ───────────────────────────────────────────
FROM base AS development

ENV NODE_ENV=development
EXPOSE 1337

# strapi develop builds admin panel on first run and watches for changes
CMD ["npm", "run", "develop"]

# ── Production target ────────────────────────────────────────────
FROM base AS production

ENV NODE_ENV=production

RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
