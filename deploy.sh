#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────
# deploy.sh — Build production images and deploy to Synology NAS
#
# Supports two modes:
#   ssh      (default)  docker save | ssh | docker load — zero setup
#   registry            docker push to a private registry on the NAS
#
# Usage:
#   ./deploy.sh                          # build + deploy via SSH
#   ./deploy.sh --build-only             # build images, skip deploy
#   ./deploy.sh --mode registry          # push to NAS Docker registry
#   NAS_HOST=10.0.0.5 ./deploy.sh       # override NAS address
# ─────────────────────────────────────────────────────────────────

# ── Configuration (override via env vars) ────────────────────────
NAS_HOST="${NAS_HOST:-192.168.0.98}"
NAS_USER="${NAS_USER:-azul}"
NAS_PROJECT_DIR="${NAS_PROJECT_DIR:-/volume1/docker/books}"
NAS_SSH_PORT="${NAS_SSH_PORT:-22}"

REGISTRY_HOST="${REGISTRY_HOST:-${NAS_HOST}:5000}"
TAG="${TAG:-latest}"
MODE="${MODE:-ssh}"
BUILD_ONLY="${BUILD_ONLY:-false}"
HTTPS_PORT="${HTTPS_PORT:-9443}"
VITE_GOOGLE_BOOKS_API_KEY="${VITE_GOOGLE_BOOKS_API_KEY:-$(grep '^VITE_GOOGLE_BOOKS_API_KEY=' FE/.env 2>/dev/null | cut -d= -f2-)}"
VITE_STRAPI_URL="${VITE_STRAPI_URL:-$(grep '^VITE_STRAPI_URL=' FE/.env 2>/dev/null | cut -d= -f2-)}"

# Synology DSM does not add docker to PATH for SSH sessions
NAS_DOCKER="${NAS_DOCKER:-/var/packages/ContainerManager/target/usr/bin/docker}"

STRAPI_IMAGE="books/strapi:${TAG}"
FRONTEND_IMAGE="books/frontend:${TAG}"

# ── Parse arguments ──────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case $1 in
    --mode)        MODE="$2"; shift 2 ;;
    --tag)         TAG="$2"; shift 2 ;;
    --build-only)  BUILD_ONLY=true; shift ;;
    --help|-h)
      echo "Usage: $0 [--mode ssh|registry] [--tag <tag>] [--build-only]"
      echo ""
      echo "Environment variables:"
      echo "  NAS_HOST          NAS hostname/IP       (default: 192.168.0.98)"
      echo "  NAS_USER          SSH user              (default: azul)"
      echo "  NAS_PROJECT_DIR   Project dir on NAS    (default: /volume1/docker/books)"
      echo "  NAS_SSH_PORT      SSH port              (default: 22)"
      echo "  REGISTRY_HOST     Registry host:port    (default: \$NAS_HOST:5000)"
      echo "  TAG               Image tag             (default: latest)"
      exit 0
      ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# Update image names with potentially new TAG
STRAPI_IMAGE="books/strapi:${TAG}"
FRONTEND_IMAGE="books/frontend:${TAG}"

# ── Helpers ──────────────────────────────────────────────────────
info()  { echo -e "\033[1;34m==>\033[0m $*"; }
ok()    { echo -e "\033[1;32m==>\033[0m $*"; }
err()   { echo -e "\033[1;31m==>\033[0m $*" >&2; }

nas_ssh() {
  ssh -p "${NAS_SSH_PORT}" "${NAS_USER}@${NAS_HOST}" "$@"
}

# Target platform for NAS (override with NAS_PLATFORM env var)
NAS_PLATFORM="${NAS_PLATFORM:-linux/amd64}"

# ── Step 1: Build production images ─────────────────────────────
info "Building production images for ${NAS_PLATFORM}..."

docker build \
  --platform "${NAS_PLATFORM}" \
  --target production \
  --tag "${STRAPI_IMAGE}" \
  ./Strapi

docker build \
  --platform "${NAS_PLATFORM}" \
  --build-arg VITE_GOOGLE_BOOKS_API_KEY="${VITE_GOOGLE_BOOKS_API_KEY}" \
  --build-arg VITE_STRAPI_URL="${VITE_STRAPI_URL}" \
  --tag "${FRONTEND_IMAGE}" \
  ./FE

ok "Images built: ${STRAPI_IMAGE}, ${FRONTEND_IMAGE}"

if [[ "${BUILD_ONLY}" == "true" ]]; then
  ok "Build-only mode. Done."
  exit 0
fi

# ── Helper: sync config files to NAS ─────────────────────────────
# Always push the latest compose, nginx, and .env so the NAS never
# runs stale config. Uses scp -O for Synology compatibility.
nas_sync_config() {
  info "Syncing config files to ${NAS_HOST}..."
  nas_ssh "mkdir -p ${NAS_PROJECT_DIR}/{certs,nginx}"
  scp -O -P "${NAS_SSH_PORT}" \
    docker-compose.prod.yml \
    .env \
    "${NAS_USER}@${NAS_HOST}:${NAS_PROJECT_DIR}/"
  scp -O -P "${NAS_SSH_PORT}" \
    nginx/nginx.conf \
    "${NAS_USER}@${NAS_HOST}:${NAS_PROJECT_DIR}/nginx/"
}

# ── Helper: write deploy vars into .env on the NAS ───────────────
# Docker compose reads .env automatically — avoids sudo env issues.
nas_set_deploy_vars() {
  local registry="$1"
  local tag="$2"
  nas_ssh "cd ${NAS_PROJECT_DIR} && \
    sed -i '/^REGISTRY=/d; /^TAG=/d; /^HTTPS_PORT=/d' .env 2>/dev/null; \
    echo 'REGISTRY=${registry}' >> .env && \
    echo 'TAG=${tag}' >> .env && \
    echo 'HTTPS_PORT=${HTTPS_PORT}' >> .env"
}

# ── Step 2: Deploy ───────────────────────────────────────────────

# Always sync config before deploying
nas_sync_config

# Stop existing containers cleanly to avoid stale references
info "Stopping existing containers on NAS..."
nas_ssh "cd ${NAS_PROJECT_DIR} && \
  sudo ${NAS_DOCKER} compose -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true"

if [[ "${MODE}" == "registry" ]]; then
  # ── Registry mode ──────────────────────────────────────────────
  info "Pushing to registry at ${REGISTRY_HOST}..."

  REMOTE_STRAPI="${REGISTRY_HOST}/books/strapi:${TAG}"
  REMOTE_FRONTEND="${REGISTRY_HOST}/books/frontend:${TAG}"

  docker tag "${STRAPI_IMAGE}" "${REMOTE_STRAPI}"
  docker tag "${FRONTEND_IMAGE}" "${REMOTE_FRONTEND}"

  docker push "${REMOTE_STRAPI}"
  docker push "${REMOTE_FRONTEND}"

  ok "Pushed to registry."

  info "Pulling and starting on NAS..."
  nas_set_deploy_vars "${REGISTRY_HOST}/books" "${TAG}"
  nas_ssh "cd ${NAS_PROJECT_DIR} && \
    sudo ${NAS_DOCKER} compose -f docker-compose.prod.yml pull && \
    sudo ${NAS_DOCKER} compose -f docker-compose.prod.yml up -d"

elif [[ "${MODE}" == "ssh" ]]; then
  # ── SSH mode (docker save | ssh docker load) ───────────────────
  info "Transferring images to ${NAS_HOST} via SSH..."

  docker save "${STRAPI_IMAGE}" "${FRONTEND_IMAGE}" | \
    gzip | \
    nas_ssh "gunzip | sudo ${NAS_DOCKER} load"

  ok "Images loaded on NAS."

  info "Starting containers on NAS..."
  nas_set_deploy_vars "books" "${TAG}"
  nas_ssh "cd ${NAS_PROJECT_DIR} && \
    sudo ${NAS_DOCKER} compose -f docker-compose.prod.yml up -d"

else
  err "Unknown mode: ${MODE}. Use 'ssh' or 'registry'."
  exit 1
fi

ok "Deployment complete!"
echo ""
echo "  Strapi admin:  https://${NAS_HOST}:${HTTPS_PORT}/admin"
echo "  Frontend:      https://${NAS_HOST}:${HTTPS_PORT}/"
echo ""
