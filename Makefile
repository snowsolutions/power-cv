# Power CV - Docker Management Makefile
# Convenient commands for Docker operations

.PHONY: help build up down restart logs clean install test backup restore health

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
RED := \033[0;31m
YELLOW := \033[0;33m
NC := \033[0m # No Color

##@ General

help: ## Display this help message
	@echo "$(BLUE)Power CV - Docker Management$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make $(GREEN)<target>$(NC)\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(BLUE)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Docker Operations (Production)

build: ## Build all Docker images
	@echo "$(BLUE)Building Docker images...$(NC)"
	docker compose build

build-nc: ## Build all Docker images without cache
	@echo "$(BLUE)Building Docker images (no cache)...$(NC)"
	docker compose build --no-cache

up: ## Start all services
	@echo "$(GREEN)Starting all services...$(NC)"
	docker compose up -d
	@echo "$(GREEN)Services started!$(NC)"
	@make --no-print-directory health

down: ## Stop all services
	@echo "$(YELLOW)Stopping all services...$(NC)"
	docker compose down
	@echo "$(YELLOW)Services stopped!$(NC)"

down-v: ## Stop all services and remove volumes (WARNING: deletes data)
	@echo "$(RED)Stopping services and removing volumes...$(NC)"
	docker compose down -v
	@echo "$(RED)Services stopped and volumes removed!$(NC)"

restart: ## Restart all services
	@echo "$(YELLOW)Restarting all services...$(NC)"
	@make --no-print-directory down
	@make --no-print-directory up

rebuild: ## Rebuild and restart all services
	@echo "$(BLUE)Rebuilding and restarting...$(NC)"
	@make --no-print-directory down
	@make --no-print-directory build
	@make --no-print-directory up

##@ Service Management

start-db: ## Start only database services (postgres + pgadmin)
	@echo "$(GREEN)Starting database services...$(NC)"
	docker compose up -d postgres pgadmin

start-server: ## Start only server service
	@echo "$(GREEN)Starting server...$(NC)"
	docker compose up -d server

start-client: ## Start only client service
	@echo "$(GREEN)Starting client...$(NC)"
	docker compose up -d client

stop-server: ## Stop server service
	docker compose stop server

stop-client: ## Stop client service
	docker compose stop client

restart-server: ## Restart server service
	docker compose restart server

restart-client: ## Restart client service
	docker compose restart client

##@ Docker Operations (Development)

dev-build: ## Build development images
	@echo "$(BLUE)Building development images...$(NC)"
	docker compose -f docker-compose.dev.yml build

dev-up: ## Start development services with hot-reloading
	@echo "$(GREEN)Starting development services...$(NC)"
	docker compose -f docker-compose.dev.yml up -d
	@echo "$(GREEN)Development services started with hot-reloading!$(NC)"
	@make --no-print-directory dev-health

dev-down: ## Stop development services
	@echo "$(YELLOW)Stopping development services...$(NC)"
	docker compose -f docker-compose.dev.yml down

dev-down-v: ## Stop development services and remove volumes
	@echo "$(RED)Stopping development services and removing volumes...$(NC)"
	docker compose -f docker-compose.dev.yml down -v

dev-restart: ## Restart development services
	@echo "$(YELLOW)Restarting development services...$(NC)"
	@make --no-print-directory dev-down
	@make --no-print-directory dev-up

dev-logs: ## View development logs
	docker compose -f docker-compose.dev.yml logs -f

dev-logs-server: ## View development server logs
	docker compose -f docker-compose.dev.yml logs -f server

dev-logs-client: ## View development client logs
	docker compose -f docker-compose.dev.yml logs -f client

dev-health: ## Check development services health
	@echo "$(BLUE)Development services status:$(NC)"
	@docker compose -f docker-compose.dev.yml ps
	@echo ""
	@echo "$(BLUE)Development URLs:$(NC)"
	@echo "  Frontend (Vite HMR): http://localhost:5173"
	@echo "  Backend (nodemon):   http://localhost:5001/api"
	@echo "  pgAdmin:             http://localhost:5050"

##@ Logs and Monitoring

logs: ## View logs from all services
	docker compose logs -f

logs-server: ## View server logs
	docker compose logs -f server

logs-client: ## View client logs
	docker compose logs -f client

logs-db: ## View database logs
	docker compose logs -f postgres

ps: ## List all running containers
	docker compose ps

stats: ## Show container resource usage
	docker stats

health: ## Check health status of all services
	@echo "$(BLUE)Checking service health...$(NC)"
	@docker compose ps
	@echo ""
	@echo "$(BLUE)Health endpoints:$(NC)"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Backend:  http://localhost:5001/api/health"
	@echo "  pgAdmin:  http://localhost:5050"

##@ Database Operations

db-migrate: ## Run database migrations (production)
	@echo "$(BLUE)Running database migrations...$(NC)"
	docker compose exec -T server pnpm prisma migrate deploy

dev-db-migrate: ## Run database migrations (development)
	@echo "$(BLUE)Running database migrations...$(NC)"
	docker compose -f docker-compose.dev.yml exec -T server pnpm prisma migrate deploy

db-generate: ## Generate Prisma Client
	@echo "$(BLUE)Generating Prisma Client...$(NC)"
	docker compose exec server pnpm prisma:generate

db-studio: ## Open Prisma Studio
	@echo "$(BLUE)Opening Prisma Studio...$(NC)"
	docker compose exec server pnpm prisma:studio

db-seed: ## Seed database with sample data
	@echo "$(BLUE)Seeding database...$(NC)"
	docker compose exec server pnpm db:seed

db-shell: ## Access PostgreSQL shell
	@echo "$(BLUE)Connecting to PostgreSQL...$(NC)"
	docker compose exec postgres psql -U power_cv_user -d power_cv

db-backup: ## Backup database to backup.sql
	@echo "$(BLUE)Creating database backup...$(NC)"
	docker compose exec postgres pg_dump -U power_cv_user power_cv > backup.sql
	@echo "$(GREEN)Backup saved to backup.sql$(NC)"

db-restore: ## Restore database from backup.sql
	@echo "$(YELLOW)Restoring database from backup.sql...$(NC)"
	docker compose exec -T postgres psql -U power_cv_user power_cv < backup.sql
	@echo "$(GREEN)Database restored!$(NC)"

##@ Development

dev-setup: ## Initial setup for development (with hot-reload)
	@echo "$(BLUE)Setting up development environment with hot-reloading...$(NC)"
	@make --no-print-directory dev-build
	@make --no-print-directory dev-up
	@echo "$(BLUE)Waiting for database to be ready...$(NC)"
	@sleep 10
	@echo "$(BLUE)Running database migrations...$(NC)"
	@docker compose -f docker-compose.dev.yml exec -T server pnpm prisma migrate deploy
	@echo "$(GREEN)Development environment ready with hot-reloading!$(NC)"
	@make --no-print-directory dev-health

prod-setup: ## Initial setup for production
	@echo "$(BLUE)Setting up production environment...$(NC)"
	@make --no-print-directory build
	@make --no-print-directory up
	@echo "$(BLUE)Waiting for database to be ready...$(NC)"
	@sleep 10
	@make --no-print-directory db-generate
	@make --no-print-directory db-migrate
	@echo "$(GREEN)Production environment ready!$(NC)"
	@make --no-print-directory health

shell-server: ## Open shell in server container (production)
	docker compose exec server sh

shell-client: ## Open shell in client container (production)
	docker compose exec client sh

dev-shell-server: ## Open shell in development server container
	docker compose -f docker-compose.dev.yml exec server sh

dev-shell-client: ## Open shell in development client container
	docker compose -f docker-compose.dev.yml exec client sh

install-server: ## Install server dependencies
	@echo "$(BLUE)Installing server dependencies...$(NC)"
	docker compose exec server pnpm install

install-client: ## Install client dependencies (inside container)
	@echo "$(BLUE)Installing client dependencies...$(NC)"
	docker compose exec client sh -c "cd /app && pnpm install"

##@ Testing

test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	docker compose exec server pnpm test

test-server: ## Run server tests
	@echo "$(BLUE)Running server tests...$(NC)"
	docker compose exec server pnpm test

##@ Cleanup

clean: ## Remove stopped containers and unused images
	@echo "$(YELLOW)Cleaning up Docker resources...$(NC)"
	docker compose down
	docker system prune -f
	@echo "$(GREEN)Cleanup complete!$(NC)"

clean-all: ## Remove all Docker resources (containers, images, volumes)
	@echo "$(RED)WARNING: This will remove ALL Docker resources!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		docker system prune -a -f --volumes; \
		echo "$(GREEN)All Docker resources removed!$(NC)"; \
	fi

clean-volumes: ## Remove Docker volumes only
	@echo "$(RED)WARNING: This will delete all database data!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		echo "$(GREEN)Volumes removed!$(NC)"; \
	fi

##@ Production

prod-build: ## Build production images
	@echo "$(BLUE)Building production images...$(NC)"
	docker compose -f docker-compose.yml build --no-cache
	@echo "$(GREEN)Production images built!$(NC)"

prod-up: ## Start production services
	@echo "$(GREEN)Starting production services...$(NC)"
	docker compose -f docker-compose.yml up -d
	@echo "$(GREEN)Production services started!$(NC)"

prod-deploy: ## Full production deployment
	@echo "$(BLUE)Starting production deployment...$(NC)"
	@make --no-print-directory prod-build
	@make --no-print-directory down
	@make --no-print-directory prod-up
	@sleep 10
	@make --no-print-directory db-migrate
	@echo "$(GREEN)Production deployment complete!$(NC)"
	@make --no-print-directory health

##@ Quick Commands

quick-start: build up ## Build and start all services (production)
	@echo "$(GREEN)Quick start complete!$(NC)"

quick-restart: down build up ## Stop, rebuild, and start (production)
	@echo "$(GREEN)Quick restart complete!$(NC)"

quick-dev: dev-build dev-up ## Build and start development services
	@echo "$(GREEN)Quick development start complete with hot-reloading!$(NC)"

quick-dev-restart: dev-down dev-build dev-up ## Restart development services
	@echo "$(GREEN)Quick development restart complete!$(NC)"

open: ## Open application in browser
	@echo "$(BLUE)Opening Power CV...$(NC)"
	@which xdg-open > /dev/null && xdg-open http://localhost:5173 || \
	which open > /dev/null && open http://localhost:5173 || \
	echo "Please open http://localhost:5173 in your browser"
