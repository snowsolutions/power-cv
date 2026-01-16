# Server Dockerfile for Power CV
# Node.js 24 Alpine with pnpm 9.x

FROM node:24-alpine AS base

# Install OpenSSL libraries for Prisma (Alpine uses OpenSSL 3)
RUN apk add --no-cache openssl openssl-dev libc6-compat

# Install pnpm 9.x to match lockfile version
RUN corepack enable && corepack prepare pnpm@9 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies stage
FROM base AS dependencies

# Install all dependencies (including dev dependencies for Prisma)
RUN pnpm install --frozen-lockfile

# Build stage (for Prisma generation)
FROM base AS build

# Copy dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application code
COPY . .

# Generate Prisma Client
RUN pnpm prisma:generate

# Production stage
FROM node:24-alpine AS production

# Install OpenSSL libraries for Prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat

# Install pnpm 9.x
RUN corepack enable && corepack prepare pnpm@9 --activate

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy application code
COPY --from=build /app/src ./src
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["pnpm", "start"]
