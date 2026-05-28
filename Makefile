# ─────────────────────────────────────────────────────────────────
# Books — Development & Deployment
# ─────────────────────────────────────────────────────────────────

TAG          ?= latest
NAS_HOST     ?= 192.168.0.98
NAS_USER     ?= azul
NAS_SSH_PORT ?= 22
NAS_PROJECT_DIR ?= /volume1/docker/books

.PHONY: help dev dev-down dev-logs build deploy deploy-registry nas-stop nas-restart clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'

# ── Local Development ────────────────────────────────────────────

dev: ## Start local dev environment (hot-reload)
	docker compose up --build -d
	@echo ""
	@echo "  Frontend:  https://localhost:8443/"
	@echo "  Admin:     https://localhost:8443/admin"
	@echo ""

dev-down: ## Stop local dev environment
	docker compose down

dev-logs: ## Tail logs from all services
	docker compose logs -f

dev-logs-strapi: ## Tail Strapi logs only
	docker compose logs -f strapi

# ── Production Build ─────────────────────────────────────────────

build: ## Build production images locally
	./deploy.sh --build-only

# ── NAS Deployment ───────────────────────────────────────────────

deploy: ## Build + deploy to NAS via SSH (docker save/load)
	NAS_HOST=$(NAS_HOST) NAS_USER=$(NAS_USER) NAS_SSH_PORT=$(NAS_SSH_PORT) \
		NAS_PROJECT_DIR=$(NAS_PROJECT_DIR) TAG=$(TAG) ./deploy.sh --mode ssh

deploy-registry: ## Build + deploy to NAS via private Docker registry
	NAS_HOST=$(NAS_HOST) NAS_USER=$(NAS_USER) NAS_SSH_PORT=$(NAS_SSH_PORT) \
		NAS_PROJECT_DIR=$(NAS_PROJECT_DIR) TAG=$(TAG) ./deploy.sh --mode registry

# ── NAS Control ─────────────────────────────────────────────────

nas-stop: ## Stop all containers on NAS
	ssh -p $(NAS_SSH_PORT) $(NAS_USER)@$(NAS_HOST) \
		"cd $(NAS_PROJECT_DIR) && /var/packages/ContainerManager/target/usr/bin/docker compose down"

nas-restart: ## Stop containers on NAS, then redeploy
	$(MAKE) nas-stop
	$(MAKE) deploy

# ── NAS First-Time Setup ────────────────────────────────────────

nas-setup: ## Copy project config files to NAS (first-time setup)
	@echo "Copying deployment files to $(NAS_HOST)..."
	ssh -p $(NAS_SSH_PORT) $(NAS_USER)@$(NAS_HOST) \
		"mkdir -p $(NAS_PROJECT_DIR)/{certs,nginx}"
	scp -O -P $(NAS_SSH_PORT) docker-compose.prod.yml \
		$(NAS_USER)@$(NAS_HOST):$(NAS_PROJECT_DIR)/
	scp -O -P $(NAS_SSH_PORT) .env \
		$(NAS_USER)@$(NAS_HOST):$(NAS_PROJECT_DIR)/
	scp -O -P $(NAS_SSH_PORT) nginx/nginx.conf \
		$(NAS_USER)@$(NAS_HOST):$(NAS_PROJECT_DIR)/nginx/
	scp -O -P $(NAS_SSH_PORT) certs/server.crt certs/server.key \
		$(NAS_USER)@$(NAS_HOST):$(NAS_PROJECT_DIR)/certs/
	@echo ""
	@echo "Done. Now run 'make deploy' to build and push images."

# ── Utilities ────────────────────────────────────────────────────

clean: ## Remove all books containers, images, and volumes
	docker compose down -v --rmi local 2>/dev/null || true
	docker rmi books/strapi:$(TAG) books/frontend:$(TAG) 2>/dev/null || true
	@echo "Cleaned."
